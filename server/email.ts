import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  tags?: Array<{ name: string; value: string }>;
}

/**
 * Generic email sending function
 */
export async function sendEmail(params: SendEmailParams) {
  const { to, subject, html, tags } = params;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'HarmonyCare <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
      tags: tags || [],
    });
    
    if (error) {
      console.error('[Email] Failed to send:', error);
      throw error;
    }
    
    console.log('[Email] Sent successfully:', data);
    return data;
  } catch (error) {
    console.error('[Email] Error:', error);
    throw error;
  }
}

export interface SendWelcomeEmailParams {
  email: string;
  firstName: string;
  lastName: string;
  facilityName: string;
  tier: string;
}

/**
 * Send welcome/confirmation email to founding member signup
 */
export async function sendWelcomeEmail(params: SendWelcomeEmailParams) {
  const { email, firstName, lastName, facilityName, tier } = params;

  try {
    const { data, error } = await resend.emails.send({
      from: 'HarmonyCare <onboarding@resend.dev>', // Replace with your verified domain
      to: [email],
      subject: '🎉 Welcome to HarmonyCare Founding Members!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #0066FF 0%, #FF6B6B 100%);
                padding: 40px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .header h1 {
                color: white;
                margin: 0;
                font-size: 28px;
              }
              .content {
                background: #ffffff;
                padding: 40px 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .highlight {
                background: #f0f9ff;
                border-left: 4px solid #0066FF;
                padding: 16px;
                margin: 24px 0;
              }
              .tier-badge {
                display: inline-block;
                background: #0066FF;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 14px;
              }
              .footer {
                text-align: center;
                padding: 20px;
                color: #6b7280;
                font-size: 14px;
              }
              .button {
                display: inline-block;
                background: #0066FF;
                color: white !important;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 Welcome to HarmonyCare!</h1>
            </div>
            
            <div class="content">
              <p>Hi ${firstName},</p>
              
              <p>Thank you for joining HarmonyCare as a <span class="tier-badge">${tier} Founding Member</span>!</p>
              
              <p>We're thrilled to have ${facilityName} as part of our founding member community. You're among the first to secure exclusive early access to our revolutionary AI-powered care management platform.</p>
              
              <div class="highlight">
                <strong>🎁 Your Founding Member Benefits:</strong>
                <ul>
                  <li>Exclusive ${tier === 'Starter' ? '50%' : tier === 'Professional' ? '55%' : '60%'} lifetime discount</li>
                  <li>40% off onboarding fees</li>
                  <li>40% off yearly maintenance</li>
                  <li>Priority access to new features</li>
                  <li>Dedicated onboarding specialist</li>
                  <li>Lifetime price lock guarantee</li>
                </ul>
              </div>
              
              <p><strong>What's Next?</strong></p>
              <ol>
                <li>Our team will review your signup and reach out within 48 hours</li>
                <li>We'll schedule a personalized demo tailored to ${facilityName}</li>
                <li>You'll get early beta access before our Q1 2026 launch</li>
              </ol>
              
              <p>Have questions? Simply reply to this email - we're here to help!</p>
              
              <p>Welcome aboard! 🚀</p>
              
              <p>Best regards,<br>
              <strong>The HarmonyCare Team</strong></p>
            </div>
            
            <div class="footer">
              <p>HarmonyCare - AI-Native Care Management<br>
              Launching Q1 2026</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('[Email] Failed to send welcome email:', error);
      throw error;
    }

    console.log('[Email] Welcome email sent successfully:', data?.id);
    return data;
  } catch (error) {
    console.error('[Email] Error sending welcome email:', error);
    throw error;
  }
}
