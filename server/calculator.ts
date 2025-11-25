import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { calculateLeadScore } from "./leadScoringService";

// HubSpot API integration
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY || '';
const HUBSPOT_API_URL = 'https://api.hubapi.com';

// Resend email service
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

interface HubSpotContact {
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
    [key: string]: string | undefined;
  };
}

interface EmailData {
  to: string;
  subject: string;
  html: string;
  tags?: Array<{ name: string; value: string }>;
}

/**
 * Create or update contact in HubSpot
 */
async function createHubSpotContact(data: {
  email: string;
  residents: number;
  facilityType: string;
  annualSavings: number;
}): Promise<{ id: string }> {
  if (!HUBSPOT_API_KEY) {
    console.warn('HubSpot API key not configured');
    return { id: 'demo-mode' };
  }

  const contactData: HubSpotContact = {
    properties: {
      email: data.email,
      // Custom properties for calculator data
      calculator_residents: data.residents.toString(),
      calculator_facility_type: data.facilityType,
      calculator_annual_savings: data.annualSavings.toString(),
      calculator_submission_date: new Date().toISOString(),
      lifecyclestage: 'lead',
    },
  };

  try {
    const response = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      // If contact already exists, update it
      if (response.status === 409) {
        // Search for existing contact
        const searchResponse = await fetch(
          `${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filterGroups: [{
                filters: [{
                  propertyName: 'email',
                  operator: 'EQ',
                  value: data.email,
                }],
              }],
            }),
          }
        );

        const searchData = await searchResponse.json();
        if (searchData.results && searchData.results.length > 0) {
          const contactId = searchData.results[0].id;
          
          // Update existing contact
          const updateResponse = await fetch(
            `${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`,
            {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contactData),
            }
          );

          if (updateResponse.ok) {
            return { id: contactId };
          }
        }
      }

      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const result = await response.json();
    return { id: result.id };
  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    throw error;
  }
}

/**
 * Generate HTML email template for ROI report
 */
function generateROIEmailTemplate(data: {
  email: string;
  residents: number;
  facilityType: string;
  annualSavings: number;
  monthlySavings: number;
  breakdowns: {
    reducedOvertime: number;
    fewerErrors: number;
    complianceSavings: number;
    improvedRetention: number;
  };
}): string {
  const facilityTypeName = data.facilityType === 'group-home' ? 'Group Home' : 'ICF-ID Facility';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Personalized ROI Report - Harmony</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Your Personalized ROI Report</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Harmony AI-Native Care Management</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for using our savings calculator! Based on your ${facilityTypeName} with ${data.residents} residents, here's your personalized ROI projection:
              </p>

              <!-- Annual Savings Highlight -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 8px; padding: 30px; margin: 20px 0;">
                <tr>
                  <td align="center">
                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Estimated Annual Savings</p>
                    <h2 style="color: #667eea; font-size: 48px; margin: 0; font-weight: 700;">$${data.annualSavings.toLocaleString()}</h2>
                    <p style="color: #666666; font-size: 16px; margin: 10px 0 0 0;">$${data.monthlySavings.toLocaleString()}/month</p>
                  </td>
                </tr>
              </table>

              <!-- Breakdown -->
              <h3 style="color: #333333; font-size: 20px; margin: 30px 0 20px 0;">Savings Breakdown</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="color: #666666; font-size: 14px; margin: 0;">💼 Reduced Overtime</p>
                          <p style="color: #333333; font-size: 24px; font-weight: 700; margin: 5px 0 0 0;">$${data.breakdowns.reducedOvertime.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="color: #666666; font-size: 14px; margin: 0;">✅ Fewer Errors & Corrections</p>
                          <p style="color: #333333; font-size: 24px; font-weight: 700; margin: 5px 0 0 0;">$${data.breakdowns.fewerErrors.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="color: #666666; font-size: 14px; margin: 0;">🛡️ Compliance & Audit Savings</p>
                          <p style="color: #333333; font-size: 24px; font-weight: 700; margin: 5px 0 0 0;">$${data.breakdowns.complianceSavings.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                    <table width="100%">
                      <tr>
                        <td>
                          <p style="color: #666666; font-size: 14px; margin: 0;">👥 Improved Staff Retention</p>
                          <p style="color: #333333; font-size: 24px; font-weight: 700; margin: 5px 0 0 0;">$${data.breakdowns.improvedRetention.toLocaleString()}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://harmony-website-lilac.vercel.app/demo" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">Schedule Your Demo</a>
                  </td>
                </tr>
              </table>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                Ready to start saving? Lock in founding member pricing and transform your facility today.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0;">
                © 2025 Harmony. All rights reserved.<br>
                AI-Native Care Management Platform
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send email using Resend
 */
async function sendROIEmail(data: EmailData): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('Resend API key not configured');
    return;
  }

  try {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'HarmonyCare <noreply@updates.manus.space>',
      to: data.to,
      subject: data.subject,
      html: data.html,
      tags: data.tags || [],
    }),
  });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${error}`);
    }

    console.log('ROI email sent successfully to:', data.to);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export const calculatorRouter = router({
  submitLead: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        facilityName: z.string().optional(),
        residents: z.number().min(1).max(100),
        facilityType: z.enum(['group-home', 'icf-id']),
        annualSavings: z.number(),
        breakdowns: z.object({
          reducedOvertime: z.number(),
          fewerErrors: z.number(),
          complianceSavings: z.number(),
          improvedRetention: z.number(),
        }),
        source: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
        utmTerm: z.string().optional(),
        utmContent: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Calculate monthly savings
        const monthlySavings = Math.round(input.annualSavings / 12);

        // Store lead in database
        const db = await getDb();
        if (!db) {
          console.warn("Database not available, skipping lead storage");
        } else {
          // Calculate initial lead score
          const scoreResult = calculateLeadScore({
            residentCount: input.residents,
            annualSavings: input.annualSavings,
            engagementScore: 0, // Initial score, will increase with engagement
          });

          await db.insert(calculatorLeads).values({
          email: input.email,
          name: input.name || null,
          facilityName: input.facilityName || null,
          facilityType: input.facilityType,
          residentCount: input.residents,
          annualSavings: input.annualSavings,
          overtimeSavings: input.breakdowns.reducedOvertime,
          errorSavings: input.breakdowns.fewerErrors,
          complianceSavings: input.breakdowns.complianceSavings,
          retentionSavings: input.breakdowns.improvedRetention,
          source: input.source || "calculator",
          utmSource: input.utmSource || null,
          utmMedium: input.utmMedium || null,
          utmCampaign: input.utmCampaign || null,
          utmTerm: input.utmTerm || null,
          utmContent: input.utmContent || null,
          emailSent: 0,
          leadScore: scoreResult.score,
          leadTier: scoreResult.tier,
          engagementScore: 0,
          });
          
          console.log("Calculator lead stored in database");
        }

        // Create/update contact in HubSpot
        const hubspotContact = await createHubSpotContact({
          email: input.email,
          residents: input.residents,
          facilityType: input.facilityType,
          annualSavings: input.annualSavings,
        });

        // Generate email template
        const emailHtml = generateROIEmailTemplate({
          email: input.email,
          residents: input.residents,
          facilityType: input.facilityType,
          annualSavings: input.annualSavings,
          monthlySavings,
          breakdowns: input.breakdowns,
        });

        // Send ROI report email
        await sendROIEmail({
          to: input.email,
          subject: `Your Personalized ROI Report: $${input.annualSavings.toLocaleString()} Annual Savings`,
          html: emailHtml,
        });

        return {
          success: true,
          hubspotContactId: hubspotContact.id,
          message: 'Lead captured and email sent successfully',
        };
      } catch (error) {
        console.error('Error in submitLead:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to process lead submission',
        });
      }
    }),
});
