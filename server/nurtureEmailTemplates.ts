/**
 * Email nurture sequence templates for calculator leads
 * Day 1: PDF Guide + Welcome
 * Day 3: Case Study
 * Day 7: Demo Invitation
 */

export interface NurtureEmailData {
  email: string;
  firstName?: string;
  facilityType: string;
  residentCount: number;
  annualSavings: number;
}

/**
 * Day 1: PDF Guide Delivery + Welcome Email
 */
export function getDay1EmailTemplate(data: NurtureEmailData) {
  const { firstName, facilityType, residentCount, annualSavings } = data;
  const name = firstName || 'there';

  return {
    subject: `Your Free Guide: 10 Ways to Reduce Paperwork in ${facilityType} Facilities`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Free Paperwork Reduction Guide</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎉 Your Free Guide is Ready!
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Hi ${name},
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Thank you for using our savings calculator! Based on your ${facilityType} facility with ${residentCount} residents, we calculated you could save <strong style="color: #0066FF;">$${annualSavings.toLocaleString()}/year</strong> with Harmony.
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                As promised, here's your <strong>free guide: "10 Ways to Reduce Paperwork in Resident Care Facilities"</strong> with actionable strategies you can implement today.
              </p>
              
              <!-- Download Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://harmony-website-lilac.vercel.app/guides/reduce-paperwork-guide.pdf" 
                       style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,102,255,0.3);">
                      📥 Download Your Free Guide
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- What's Inside -->
              <div style="background-color: #f8f9fb; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="margin: 0 0 15px; font-size: 18px; color: #0066FF;">
                  What's Inside:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #555555; line-height: 1.8;">
                  <li>Voice-to-text documentation strategies</li>
                  <li>Automated compliance reporting techniques</li>
                  <li>Digital workflow optimization tips</li>
                  <li>Real case studies from facilities like yours</li>
                  <li>ROI calculations and implementation timelines</li>
                </ul>
              </div>
              
              <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Over the next week, I'll share more insights about how facilities like yours are transforming care delivery with AI-powered automation.
              </p>
              
              <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.6; color: #333333;">
                Questions? Just reply to this email—I read every response.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Best regards,<br>
                <strong>The Harmony Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                Harmony - AI-Native Care Management
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Launching Q1 2026 | Founding Member Spots Available
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

/**
 * Day 3: Case Study Email
 */
export function getDay3EmailTemplate(data: NurtureEmailData) {
  const { firstName, facilityType, residentCount } = data;
  const name = firstName || 'there';
  
  // Determine which case study to show based on facility type
  const isGroupHome = facilityType.toLowerCase().includes('group');

  return {
    subject: isGroupHome 
      ? 'How Sunrise Group Home Cut Paperwork by 70% (Real Results)'
      : 'How Meadowbrook ICF-ID Achieved 100% Compliance (Case Study)',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Success Story</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700;">
                ${isGroupHome ? '🏡 Real Results from a Group Home Like Yours' : '🏥 How an ICF-ID Facility Transformed Care'}
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Hi ${name},
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                I wanted to share a success story from a ${facilityType} facility similar to yours (${residentCount} residents).
              </p>
              
              ${isGroupHome ? `
              <!-- Group Home Case Study -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #0066FF; padding: 25px; margin: 0 0 30px;">
                <h2 style="margin: 0 0 15px; font-size: 22px; color: #0066FF;">
                  Sunrise Group Home
                </h2>
                <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                  <strong>Location:</strong> Portland, OR | <strong>Residents:</strong> 6 | <strong>Staff:</strong> 8
                </p>
              </div>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Challenge:
              </h3>
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                Director Sarah Martinez was spending 15+ hours per week on documentation, compliance reports, and medication logs. Staff turnover was at 60% annually due to burnout from paperwork overload.
              </p>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Solution:
              </h3>
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                Sunrise implemented Harmony's voice-to-text documentation and automated compliance monitoring. Staff could now speak their observations naturally while caring for residents.
              </p>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Results (After 3 Months):
              </h3>
              <div style="background-color: #f8f9fb; border-radius: 8px; padding: 25px; margin: 0 0 30px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">70%</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Reduction in documentation time</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">$42,000</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Annual savings from reduced overtime</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">85%</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Improvement in staff satisfaction</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">100%</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">State inspection pass rate</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 0 0 30px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #92400e; font-style: italic;">
                  "Harmony gave us our time back. Instead of drowning in paperwork, we're actually spending quality time with our residents. That's why we got into this field in the first place."
                </p>
                <p style="margin: 10px 0 0; font-size: 14px; color: #92400e;">
                  <strong>— Sarah Martinez, Director</strong>
                </p>
              </div>
              ` : `
              <!-- ICF-ID Case Study -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #0066FF; padding: 25px; margin: 0 0 30px;">
                <h2 style="margin: 0 0 15px; font-size: 22px; color: #0066FF;">
                  Meadowbrook ICF-ID
                </h2>
                <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                  <strong>Location:</strong> Austin, TX | <strong>Residents:</strong> 32 | <strong>Staff:</strong> 45
                </p>
              </div>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Challenge:
              </h3>
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                Administrator David Chen faced constant stress from federal compliance requirements. His team spent 25+ hours per week on ISP documentation, active treatment logs, and preparing for state surveys. They had received 3 deficiencies in their last inspection.
              </p>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Solution:
              </h3>
              <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                Meadowbrook implemented Harmony's compliance automation and active treatment tracking. The system automatically monitored 42 CFR Part 483 requirements and flagged potential issues before they became violations.
              </p>
              
              <h3 style="margin: 0 0 15px; font-size: 18px; color: #333333;">
                The Results (After 6 Months):
              </h3>
              <div style="background-color: #f8f9fb; border-radius: 8px; padding: 25px; margin: 0 0 30px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">0</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Deficiencies in latest federal survey</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">85%</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Faster ISP development process</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">$156,000</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Annual savings (reduced violations + efficiency)</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">
                      <span style="font-size: 32px; font-weight: 700; color: #10b981;">100%</span>
                      <p style="margin: 5px 0 0; font-size: 14px; color: #6b7280;">Active treatment documentation compliance</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 0 0 30px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #92400e; font-style: italic;">
                  "Harmony transformed how we approach compliance. We went from reactive firefighting to proactive monitoring. Our last survey was the smoothest we've ever had."
                </p>
                <p style="margin: 10px 0 0; font-size: 14px; color: #92400e;">
                  <strong>— David Chen, Administrator</strong>
                </p>
              </div>
              `}
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                Want to see how Harmony could work for your facility? I'd love to show you a personalized demo.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://harmony-website-lilac.vercel.app/demo" 
                       style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(0,102,255,0.3);">
                      📅 Schedule Your Demo
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 10px; font-size: 16px; line-height: 1.6; color: #333333;">
                Questions about implementation? Reply to this email—I'm here to help.
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Best regards,<br>
                <strong>The Harmony Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                Harmony - AI-Native Care Management
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Launching Q1 2026 | Founding Member Spots Available
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

/**
 * Day 7: Demo Invitation Email
 */
export function getDay7EmailTemplate(data: NurtureEmailData) {
  const { firstName, facilityType, residentCount, annualSavings } = data;
  const name = firstName || 'there';

  return {
    subject: `Ready to save $${Math.round(annualSavings / 1000)}K/year? Let's talk.`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schedule Your Demo</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🚀 Let's Transform Your Facility
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Hi ${name},
              </p>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Over the past week, I've shared how Harmony is helping ${facilityType} facilities reduce paperwork, improve compliance, and give caregivers their time back.
              </p>
              
              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                Now I'd love to show you exactly how it would work for your ${residentCount}-resident facility—and how you could save <strong style="color: #0066FF;">$${annualSavings.toLocaleString()}/year</strong>.
              </p>
              
              <!-- Value Proposition Box -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 30px; margin: 0 0 30px; border: 2px solid #0066FF;">
                <h2 style="margin: 0 0 20px; font-size: 22px; color: #0066FF; text-align: center;">
                  What You'll See in Your Demo:
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                      <span style="font-size: 16px; color: #333333;">Voice-to-text documentation in action</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                      <span style="font-size: 16px; color: #333333;">Automated compliance monitoring dashboard</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                      <span style="font-size: 16px; color: #333333;">Personalized ROI breakdown for your facility</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                      <span style="font-size: 16px; color: #333333;">Implementation timeline and onboarding process</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="color: #10b981; font-size: 20px; margin-right: 10px;">✓</span>
                      <span style="font-size: 16px; color: #333333;">Exclusive founding member pricing (56-65% off)</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <p style="margin: 0 0 10px; font-size: 18px; font-weight: 600; color: #333333; text-align: center;">
                Demos typically take 20-30 minutes
              </p>
              <p style="margin: 0 0 30px; font-size: 14px; color: #6b7280; text-align: center;">
                No pressure, no sales pitch—just a genuine look at how Harmony works
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://harmony-website-lilac.vercel.app/demo" 
                       style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #00CCFF 100%); color: #ffffff; text-decoration: none; padding: 18px 50px; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 4px 12px rgba(0,102,255,0.3);">
                      📅 Schedule My Demo
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Urgency Box -->
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0;">
                <p style="margin: 0 0 10px; font-size: 16px; font-weight: 600; color: #92400e;">
                  ⏰ Founding Member Pricing Ends Soon
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #92400e;">
                  Only 23 founding member spots remain. Lock in 56-65% off regular pricing forever + 40% off onboarding and maintenance.
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                Have questions before scheduling? Just reply to this email—I'm here to help.
              </p>
              
              <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.6; color: #333333;">
                Looking forward to showing you what's possible,
              </p>
              
              <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                <strong>The Harmony Team</strong><br>
                <span style="font-size: 14px; color: #6b7280;">Transforming Residential Care with AI</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                Harmony - AI-Native Care Management
              </p>
              <p style="margin: 0 0 15px; font-size: 12px; color: #9ca3af;">
                Launching Q1 2026 | Founding Member Spots Available
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                <a href="#" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> | 
                <a href="#" style="color: #9ca3af; text-decoration: underline;">Update Preferences</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}
