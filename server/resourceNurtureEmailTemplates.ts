/**
 * Email templates for resource download nurture sequence
 *
 * Sequence:
 * - Day 1: Resource delivery confirmation + value reinforcement
 * - Day 3: Related insights and case study
 * - Day 7: Demo invitation with urgency and founding member pricing
 */

interface EmailTemplateParams {
  name: string;
  email: string;
  resourceTitle: string;
  resourceUrl: string;
  facilityName?: string;
  facilityType?: string;
}

/**
 * Day 1: Resource Delivery Confirmation
 * Sent immediately after download
 */
export function getDay1Email(params: EmailTemplateParams): {
  subject: string;
  html: string;
} {
  const { name, resourceTitle, resourceUrl } = params;
  const firstName = name?.split(" ")[0] || "there";

  return {
    subject: `Your ${resourceTitle} is ready`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <!-- Header -->
        <div style="background: white; border-radius: 12px 12px 0 0; padding: 40px; text-align: center;">
          <h1 style="margin: 0; color: #0066FF; font-size: 28px; font-weight: 700;">HarmonyCare</h1>
          <p style="margin: 10px 0 0; color: #666; font-size: 14px;">AI-Native Care Management</p>
        </div>

        <!-- Main Content -->
        <div style="background: white; padding: 40px;">
          <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
            Hi ${firstName},
          </h2>
          
          <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.6;">
            Thank you for downloading <strong>${resourceTitle}</strong>! We're excited to share these insights with you.
          </p>

          <p style="margin: 0 0 30px; color: #333; font-size: 16px; line-height: 1.6;">
            This guide is packed with practical strategies that residential care facilities are using right now to improve operations, reduce costs, and deliver better care.
          </p>

          <!-- Download Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resourceUrl}" style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #FF6B6B 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);">
              Download Your Guide
            </a>
          </div>

          <!-- What's Inside -->
          <div style="background: #f8f9fa; border-left: 4px solid #0066FF; padding: 20px; margin: 30px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 15px; color: #1a1a1a; font-size: 18px; font-weight: 600;">
              What's Inside:
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
              <li>Real-world case studies from facilities like yours</li>
              <li>Step-by-step implementation frameworks</li>
              <li>Common pitfalls and how to avoid them</li>
              <li>Metrics to track your success</li>
            </ul>
          </div>

          <p style="margin: 30px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Over the next week, I'll share additional insights and resources to help you get the most value from this guide.
          </p>

          <p style="margin: 20px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Have questions? Just reply to this email—I read every message.
          </p>

          <p style="margin: 30px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The HarmonyCare Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; border-radius: 0 0 12px 12px; padding: 30px; text-align: center;">
          <p style="margin: 0 0 15px; color: #666; font-size: 14px;">
            <strong>HarmonyCare</strong> | AI-Native Care Management<br>
            San Francisco, CA
          </p>
          <p style="margin: 0; color: #999; font-size: 12px;">
            You're receiving this because you downloaded a resource from HarmonyCare.<br>
            <a href="#" style="color: #0066FF; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

/**
 * Day 3: Related Insights and Case Study
 * Provides additional value and builds trust
 */
export function getDay3Email(params: EmailTemplateParams): {
  subject: string;
  html: string;
} {
  const { name, resourceTitle, facilityType } = params;
  const firstName = name?.split(" ")[0] || "there";

  // Customize case study based on facility type
  const isGroupHome = facilityType?.toLowerCase().includes("group");
  const caseStudy = isGroupHome
    ? {
        facilityName: "Sunrise Care Home",
        size: "8 residents",
        challenge: "Spending 15+ hours per week on paperwork",
        solution: "Implemented AI-powered documentation",
        result:
          "70% reduction in documentation time, staff can focus on direct care",
      }
    : {
        facilityName: "Meadowbrook ICF-ID",
        size: "32 residents",
        challenge:
          "Struggling with active treatment documentation and federal compliance",
        solution:
          "Deployed AI agents for ISP development and compliance tracking",
        result:
          "Zero deficiencies in last state survey, 85% faster ISP creation",
      };

  return {
    subject: `How ${caseStudy.facilityName} transformed their operations`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <!-- Header -->
        <div style="background: white; border-radius: 12px 12px 0 0; padding: 40px; text-align: center;">
          <h1 style="margin: 0; color: #0066FF; font-size: 28px; font-weight: 700;">HarmonyCare</h1>
          <p style="margin: 10px 0 0; color: #666; font-size: 14px;">AI-Native Care Management</p>
        </div>

        <!-- Main Content -->
        <div style="background: white; padding: 40px;">
          <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
            Hi ${firstName},
          </h2>
          
          <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.6;">
            I hope you've had a chance to review <strong>${resourceTitle}</strong>. Today, I wanted to share a real-world example of how these strategies work in practice.
          </p>

          <!-- Case Study Card -->
          <div style="background: linear-gradient(135deg, #0066FF 0%, #FF6B6B 100%); border-radius: 12px; padding: 30px; margin: 30px 0; color: white;">
            <h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 700;">
              Case Study: ${caseStudy.facilityName}
            </h3>
            <p style="margin: 0 0 20px; font-size: 14px; opacity: 0.9;">
              ${caseStudy.size} | ${isGroupHome ? "Group Home" : "ICF-ID Facility"}
            </p>
            
            <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;">
                The Challenge
              </p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">
                ${caseStudy.challenge}
              </p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;">
                The Solution
              </p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">
                ${caseStudy.solution}
              </p>
            </div>

            <div style="background: rgba(255, 255, 255, 0.25); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.8;">
                The Result
              </p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">
                ${caseStudy.result}
              </p>
            </div>
          </div>

          <!-- Key Takeaways -->
          <h3 style="margin: 30px 0 15px; color: #1a1a1a; font-size: 20px; font-weight: 600;">
            Key Takeaways:
          </h3>
          <ul style="margin: 0 0 30px; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
            <li>Start with your biggest pain point (for them, it was documentation)</li>
            <li>Implement incrementally—they rolled out one AI agent at a time</li>
            <li>Measure everything—tracking metrics proved ROI to stakeholders</li>
            <li>Get staff buy-in early—they involved caregivers in the selection process</li>
          </ul>

          <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.6;">
            Want to see how HarmonyCare could work for your facility? I'll share more details in my next email.
          </p>

          <p style="margin: 30px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The HarmonyCare Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; border-radius: 0 0 12px 12px; padding: 30px; text-align: center;">
          <p style="margin: 0 0 15px; color: #666; font-size: 14px;">
            <strong>HarmonyCare</strong> | AI-Native Care Management<br>
            San Francisco, CA
          </p>
          <p style="margin: 0; color: #999; font-size: 12px;">
            You're receiving this because you downloaded a resource from HarmonyCare.<br>
            <a href="#" style="color: #0066FF; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}

/**
 * Day 7: Demo Invitation with Urgency
 * Final push to convert lead to demo booking
 */
export function getDay7Email(params: EmailTemplateParams): {
  subject: string;
  html: string;
} {
  const { name, facilityType } = params;
  const firstName = name?.split(" ")[0] || "there";

  const isGroupHome = facilityType?.toLowerCase().includes("group");
  const pricing = isGroupHome
    ? {
        tier: "Starter",
        regularPrice: "$118",
        foundingPrice: "$52",
        discount: "56%",
        example: "6-resident home",
        savings: "$4,752/year",
      }
    : {
        tier: "Professional",
        regularPrice: "$158",
        foundingPrice: "$62",
        discount: "61%",
        example: "30-resident facility",
        savings: "$34,560/year",
      };

  return {
    subject: `${firstName}, ready to transform your facility? (Founding member spots closing)`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <tr>
      <td>
        <!-- Header -->
        <div style="background: white; border-radius: 12px 12px 0 0; padding: 40px; text-align: center;">
          <h1 style="margin: 0; color: #0066FF; font-size: 28px; font-weight: 700;">HarmonyCare</h1>
          <p style="margin: 10px 0 0; color: #666; font-size: 14px;">AI-Native Care Management</p>
        </div>

        <!-- Urgency Banner -->
        <div style="background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); padding: 20px; text-align: center;">
          <p style="margin: 0; color: white; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
            ⏰ Only 23 Founding Member Spots Remaining
          </p>
        </div>

        <!-- Main Content -->
        <div style="background: white; padding: 40px;">
          <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
            Hi ${firstName},
          </h2>
          
          <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.6;">
            Over the past week, you've learned how residential care facilities are using AI to reduce paperwork, ensure compliance, and deliver better care.
          </p>

          <p style="margin: 0 0 30px; color: #333; font-size: 16px; line-height: 1.6;">
            <strong>Now it's time to see how HarmonyCare can transform YOUR facility.</strong>
          </p>

          <!-- Founding Member Pricing Card -->
          <div style="background: linear-gradient(135deg, #0066FF 0%, #FF6B6B 100%); border-radius: 12px; padding: 30px; margin: 30px 0; color: white; text-align: center;">
            <div style="background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 8px 16px; display: inline-block; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                🔥 Founding Member Exclusive
              </p>
            </div>

            <h3 style="margin: 0 0 10px; font-size: 32px; font-weight: 700;">
              ${pricing.tier} Plan
            </h3>
            
            <p style="margin: 0 0 20px; font-size: 18px; opacity: 0.9; text-decoration: line-through;">
              ${pricing.regularPrice}/resident/month
            </p>

            <p style="margin: 0 0 10px; font-size: 48px; font-weight: 700;">
              ${pricing.foundingPrice}
            </p>
            <p style="margin: 0 0 30px; font-size: 16px; opacity: 0.9;">
              per resident/month
            </p>

            <div style="background: rgba(255, 255, 255, 0.25); border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 5px; font-size: 14px; opacity: 0.9;">
                Save ${pricing.discount} off forever
              </p>
              <p style="margin: 0; font-size: 20px; font-weight: 700;">
                ${pricing.example}: ${pricing.savings}
              </p>
            </div>

            <div style="text-align: left; margin: 20px 0;">
              <p style="margin: 0 0 10px; font-size: 15px;">
                ✓ Lock in founding member pricing for life
              </p>
              <p style="margin: 0 0 10px; font-size: 15px;">
                ✓ 40% off onboarding & yearly maintenance
              </p>
              <p style="margin: 0 0 10px; font-size: 15px;">
                ✓ Early access to new features
              </p>
              <p style="margin: 0; font-size: 15px;">
                ✓ Priority support & feature requests
              </p>
            </div>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.harmonycare.ai/demo" style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #FF6B6B 100%); color: white; text-decoration: none; padding: 18px 50px; border-radius: 8px; font-size: 18px; font-weight: 700; box-shadow: 0 6px 16px rgba(0, 102, 255, 0.4);">
              Reserve Your Founding Member Spot
            </a>
          </div>

          <p style="margin: 30px 0 0; color: #666; font-size: 14px; text-align: center; line-height: 1.6;">
            <strong>Deadline: March 31, 2025</strong><br>
            After that, pricing returns to standard rates.
          </p>

          <!-- What Happens Next -->
          <div style="background: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0;">
            <h4 style="margin: 0 0 15px; color: #1a1a1a; font-size: 18px; font-weight: 600;">
              What happens next:
            </h4>
            <ol style="margin: 0; padding-left: 20px; color: #333; font-size: 15px; line-height: 1.8;">
              <li>Schedule a 30-minute personalized demo</li>
              <li>See HarmonyCare in action with your facility's data</li>
              <li>Get a custom ROI projection for your specific needs</li>
              <li>Lock in founding member pricing (if it's a fit)</li>
            </ol>
          </div>

          <p style="margin: 30px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Questions? Just reply to this email—I'm here to help.
          </p>

          <p style="margin: 30px 0 0; color: #333; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The HarmonyCare Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; border-radius: 0 0 12px 12px; padding: 30px; text-align: center;">
          <p style="margin: 0 0 15px; color: #666; font-size: 14px;">
            <strong>HarmonyCare</strong> | AI-Native Care Management<br>
            San Francisco, CA
          </p>
          <p style="margin: 0; color: #999; font-size: 12px;">
            You're receiving this because you downloaded a resource from HarmonyCare.<br>
            <a href="#" style="color: #0066FF; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
}
