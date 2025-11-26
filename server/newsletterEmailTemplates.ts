/**
 * Email templates for newsletter nurture sequence
 * 5-email sequence to engage blog subscribers and guide them toward demo
 */

interface EmailTemplateData {
  email: string;
  name?: string;
}

/**
 * Day 0: Welcome email with best content overview
 */
export function getWelcomeEmail(data: EmailTemplateData) {
  return {
    subject: "Welcome to HarmonyCare Insights 👋",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0;">
                Welcome to HarmonyCare Insights!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi${data.name ? ` ${data.name}` : ""},
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for subscribing to our newsletter! You've joined 2,000+ care facility administrators who are transforming their operations with AI-powered technology.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Here's what you can expect from us:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 10px;">
                    <p style="color: #333333; font-size: 15px; margin: 0; font-weight: 600;">📊 Data-Driven Insights</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">Real operational metrics from 500+ facilities</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="color: #333333; font-size: 15px; margin: 0; font-weight: 600;">✅ Compliance Updates</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">Stay ahead of regulatory changes</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                    <p style="color: #333333; font-size: 15px; margin: 0; font-weight: 600;">💡 Practical Strategies</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">Actionable tactics you can implement today</p>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                Start with our most popular articles:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
                <tr>
                  <td style="padding: 20px; background-color: #fafafa; border-left: 4px solid #667eea; border-radius: 4px;">
                    <p style="color: #667eea; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">MOST READ</p>
                    <p style="color: #333333; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
                      <a href="https://harmonycare.ai/blog/residential-care-management-software-2025" style="color: #333333; text-decoration: none;">
                        Residential Care Management Software: 2025 Buyer's Guide
                      </a>
                    </p>
                    <p style="color: #666666; font-size: 14px; margin: 0;">
                      How to reduce turnover 40% and cut costs 30% with the right technology platform.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #fafafa; border-left: 4px solid #764ba2; border-radius: 4px;">
                    <p style="color: #764ba2; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">TRENDING</p>
                    <p style="color: #333333; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
                      <a href="https://harmonycare.ai/blog/ai-residential-care-facilities-guide" style="color: #333333; text-decoration: none;">
                        AI for Residential Care: Practical Applications Beyond the Hype
                      </a>
                    </p>
                    <p style="color: #666666; font-size: 14px; margin: 0;">
                      Real-world AI use cases that are transforming care delivery today.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://harmonycare.ai/blog" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      Explore All Articles
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                Questions? Just reply to this email—we read every message.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                © 2025 HarmonyCare. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 11px; margin: 0;">
                <a href="https://harmonycare.ai/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #999999; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

/**
 * Day 2: Top blog article + case study
 */
export function getDay2Email(data: EmailTemplateData) {
  return {
    subject: "The staffing crisis myth: How to do more with less",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi${data.name ? ` ${data.name}` : ""},
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Everyone talks about the staffing crisis. But what if the real problem isn't finding more staff—it's giving your current team the tools to succeed?
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Our latest deep-dive article reveals how facilities are reducing turnover by 40% without increasing headcount:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 8px; border: 1px solid #667eea30;">
                    <h2 style="color: #333333; font-size: 22px; margin: 0 0 15px 0; font-weight: 700;">
                      The Staffing Crisis Myth: How to Do More with Less (Without Burning Out)
                    </h2>
                    <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                      Discover the proven strategies 500+ facilities use to reduce documentation burden, improve staff satisfaction, and maintain quality care—all with existing teams.
                    </p>
                    <a href="https://harmonycare.ai/resources#staffing-crisis" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 600;">
                      Read the Full Article →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                Real Results: Sunrise Group Homes
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #fafafa; border-radius: 8px;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="color: #667eea; font-size: 48px; font-weight: 700; margin: 0; line-height: 1;">40%</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 20px 0;">Reduction in staff turnover</p>
                    
                    <p style="color: #764ba2; font-size: 48px; font-weight: 700; margin: 0; line-height: 1;">3.2hrs</p>
                    <p style="color: #666666; font-size: 14px; margin: 5px 0 20px 0;">Daily time saved per staff member</p>
                    
                    <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">
                      "Our staff finally have time to actually care for residents instead of drowning in paperwork. Morale has completely transformed."
                    </p>
                    <p style="color: #999999; font-size: 13px; margin: 10px 0 0 0;">
                      — Sarah Chen, Administrator
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                Next email: How to calculate your facility's true savings potential
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                © 2025 HarmonyCare. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 11px; margin: 0;">
                <a href="https://harmonycare.ai/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #999999; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

/**
 * Day 5: Industry insights + ROI calculator
 */
export function getDay5Email(data: EmailTemplateData) {
  return {
    subject: "Calculate your facility's savings potential (free tool)",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi${data.name ? ` ${data.name}` : ""},
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Most administrators underestimate their facility's savings potential by 40-60%. Here's why:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                    <p style="color: #856404; font-size: 15px; line-height: 1.6; margin: 0;">
                      <strong>Hidden costs you're probably missing:</strong><br>
                      • Overtime from inefficient scheduling<br>
                      • Turnover replacement costs ($3-5K per employee)<br>
                      • Compliance deficiency investigations<br>
                      • Medication error liability<br>
                      • Lost revenue from preventable hospitalizations
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                Get your personalized savings estimate in 60 seconds:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center;">
                    <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 15px 0; font-weight: 700;">
                      Free ROI Calculator
                    </h2>
                    <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; opacity: 0.95;">
                      Answer 4 simple questions to see your facility's potential annual savings
                    </p>
                    <a href="https://harmonycare.ai/#calculator" style="display: inline-block; background-color: #ffffff; color: #667eea; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      Calculate My Savings →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                What you'll discover:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 15px 0;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Your exact annual savings potential
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Breakdown by category (staffing, compliance, errors, retention)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Comparison to similar facilities
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Detailed PDF report you can share with stakeholders
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                No credit card required. Results in 60 seconds.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                © 2025 HarmonyCare. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 11px; margin: 0;">
                <a href="https://harmonycare.ai/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #999999; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

/**
 * Day 8: Customer success story
 */
export function getDay8Email(data: EmailTemplateData) {
  return {
    subject: "How Meadowbrook saved $180K in year one",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi${data.name ? ` ${data.name}` : ""},
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                I want to share a story that might sound familiar...
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px; background-color: #fafafa; border-radius: 8px;">
                    <h2 style="color: #333333; font-size: 20px; margin: 0 0 15px 0; font-weight: 700;">
                      Meadowbrook ICF-ID Facility
                    </h2>
                    <p style="color: #666666; font-size: 14px; margin: 0 0 5px 0;">
                      <strong>Location:</strong> Oregon<br>
                      <strong>Residents:</strong> 42<br>
                      <strong>Challenge:</strong> 68% staff turnover, -22% operating margin
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; font-weight: 600;">
                The Breaking Point
              </p>

              <p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                Director Maria Rodriguez was spending 15+ hours weekly on survey prep. Staff were quitting because they "became caregivers to help people, not to do paperwork." The facility was 6 months from closure.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                The Transformation
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td width="50%" style="padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 8px 0 0 8px; text-align: center;">
                    <p style="color: #667eea; font-size: 42px; font-weight: 700; margin: 0; line-height: 1;">$180K</p>
                    <p style="color: #666666; font-size: 13px; margin: 5px 0 0 0;">Year 1 Savings</p>
                  </td>
                  <td width="50%" style="padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 0 8px 8px 0; text-align: center; border-left: 2px solid #ffffff;">
                    <p style="color: #764ba2; font-size: 42px; font-weight: 700; margin: 0; line-height: 1;">52%</p>
                    <p style="color: #666666; font-size: 13px; margin: 5px 0 0 0;">Turnover Reduction</p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="padding: 25px;">
                    <p style="color: #333333; font-size: 15px; line-height: 1.8; margin: 0; font-style: italic;">
                      "The AI documentation assistant gave us 3 hours back per staff member, per day. Our team can finally do what they love—caring for residents. We went from crisis mode to thriving in 8 months."
                    </p>
                    <p style="color: #999999; font-size: 14px; margin: 15px 0 0 0;">
                      — Maria Rodriguez, Facility Director
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                Key Results After 12 Months:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Zero survey deficiencies (down from 4.2 average)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ 92% family satisfaction score (up from 67%)
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ 78% reduction in medication errors
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Operating margin improved to +12%
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px;">
                <tr>
                  <td align="center">
                    <p style="color: #333333; font-size: 16px; margin: 0 0 20px 0; font-weight: 600;">
                      Ready to write your own success story?
                    </p>
                    <a href="https://harmonycare.ai/#demo" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      Schedule a Demo
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                © 2025 HarmonyCare. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 11px; margin: 0;">
                <a href="https://harmonycare.ai/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #999999; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}

/**
 * Day 12: Product demo invitation
 */
export function getDay12Email(data: EmailTemplateData) {
  return {
    subject: "See how it works (personalized demo for your facility)",
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi${data.name ? ` ${data.name}` : ""},
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Over the past two weeks, you've learned how facilities like yours are transforming operations with AI-powered care management.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Now I'd like to show you exactly how it would work for <strong>your</strong> facility.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; text-align: center;">
                    <h2 style="color: #ffffff; font-size: 26px; margin: 0 0 15px 0; font-weight: 700;">
                      See HarmonyCare in Action
                    </h2>
                    <p style="color: #ffffff; font-size: 15px; line-height: 1.6; margin: 0 0 25px 0; opacity: 0.95;">
                      30-minute personalized demo tailored to your facility's needs
                    </p>
                    <a href="https://harmonycare.ai/#demo" style="display: inline-block; background-color: #ffffff; color: #667eea; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 600;">
                      Schedule Your Demo →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                What you'll see in your demo:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #fafafa; border-radius: 8px;">
                    <p style="color: #333333; font-size: 15px; margin: 0 0 15px 0;">
                      <strong>1. AI Documentation Assistant</strong><br>
                      <span style="color: #666666; font-size: 14px;">Watch how voice-to-text and smart templates reduce documentation time by 60%</span>
                    </p>
                    <p style="color: #333333; font-size: 15px; margin: 0 0 15px 0;">
                      <strong>2. Predictive Analytics Dashboard</strong><br>
                      <span style="color: #666666; font-size: 14px;">See how AI identifies staffing gaps, incident patterns, and health changes before they become problems</span>
                    </p>
                    <p style="color: #333333; font-size: 15px; margin: 0 0 15px 0;">
                      <strong>3. Automated Compliance Monitoring</strong><br>
                      <span style="color: #666666; font-size: 14px;">Real-time validation that catches issues before surveys, not during them</span>
                    </p>
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      <strong>4. Family Engagement Portal</strong><br>
                      <span style="color: #666666; font-size: 14px;">Reduce phone calls 80% while improving family satisfaction</span>
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #fff3cd; border-radius: 8px; border: 1px solid #ffc107;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="color: #856404; font-size: 15px; line-height: 1.6; margin: 0;">
                      <strong>💡 Founding Member Pricing Ends Soon</strong><br>
                      Lock in 40% lifetime discount by scheduling your demo this month. After that, standard pricing applies.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0; font-weight: 600;">
                Common questions we'll answer:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ How long does implementation take?
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ What training is required for staff?
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ How does pricing work for my facility size?
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-top: 1px solid #e9ecef;">
                    <p style="color: #333333; font-size: 15px; margin: 0;">
                      ✓ Can we integrate with our existing systems?
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                No pressure, no sales pitch—just a genuine conversation about how we can help your facility thrive.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #666666; font-size: 12px; margin: 0 0 10px 0;">
                © 2025 HarmonyCare. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 11px; margin: 0;">
                <a href="https://harmonycare.ai/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #999999; text-decoration: underline;">
                  Unsubscribe
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  };
}
