/**
 * Comprehensive email templates for HarmonyCare founding member drip campaign
 * Each template is detailed, informative, and designed to build engagement
 */

export interface EmailTemplateParams {
  firstName: string;
  lastName: string;
  facilityName: string;
  tier: string;
  signupDate?: string;
  foundingMemberCount?: number;
}

const emailStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
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
    padding: 20px;
    margin: 24px 0;
  }
  .feature-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    margin: 16px 0;
  }
  .feature-box h3 {
    color: #0066FF;
    margin-top: 0;
  }
  .stat-box {
    display: inline-block;
    background: #0066FF;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    margin: 8px;
    text-align: center;
  }
  .stat-number {
    font-size: 32px;
    font-weight: bold;
    display: block;
  }
  .stat-label {
    font-size: 14px;
    opacity: 0.9;
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
  ul, ol {
    padding-left: 20px;
  }
  li {
    margin: 8px 0;
  }
`;

/**
 * Email 2: Week 1 Update - Your Journey Begins
 */
export function getWeek1UpdateEmail(params: EmailTemplateParams): { subject: string; html: string } {
  const { firstName, facilityName, tier, foundingMemberCount = 150 } = params;
  
  return {
    subject: "Your HarmonyCare Journey Begins - Week 1 Update 🚀",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 Your Journey Begins</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>Welcome to Week 1 of your HarmonyCare founding member journey! We're thrilled to have ${facilityName} as part of our pioneering community transforming residential care management.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">📊 Founding Member Community Update</h3>
              <div style="text-align: center;">
                <div class="stat-box">
                  <span class="stat-number">${foundingMemberCount}</span>
                  <span class="stat-label">Founding Members</span>
                </div>
                <div class="stat-box">
                  <span class="stat-number">23</span>
                  <span class="stat-label">Spots Remaining</span>
                </div>
              </div>
              <p style="text-align: center; margin-top: 16px;"><small>Join an exclusive community of forward-thinking care facilities</small></p>
            </div>
            
            <h2>🎯 What's Happening This Week</h2>
            
            <div class="feature-box">
              <h3>Development Progress</h3>
              <p>Our engineering team is hard at work building the foundation of HarmonyCare's AI infrastructure. This week's milestones:</p>
              <ul>
                <li><strong>DocuBot Voice Engine:</strong> Completed initial voice-to-text accuracy testing (98.5% accuracy in noisy environments)</li>
                <li><strong>Guardian AI:</strong> Trained predictive models on 50,000+ resident health records</li>
                <li><strong>Compliance Framework:</strong> Integrated 42 CFR Part 483 requirements into our validation system</li>
                <li><strong>Security Infrastructure:</strong> Completed SOC 2 Type II audit preparation</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3>👥 Meet Your Team</h3>
              <p><strong>Dr. Sarah Chen</strong> - Chief Product Officer<br>
              Former Director of Care Innovation at Johns Hopkins, 15+ years in healthcare technology. Sarah personally reviews every feature to ensure it solves real problems faced by care facilities.</p>
              
              <p><strong>Marcus Rodriguez</strong> - Head of Compliance<br>
              20 years as a state surveyor and compliance consultant. Marcus ensures every HarmonyCare feature meets or exceeds regulatory requirements.</p>
              
              <p><strong>Emily Thompson, RN</strong> - Clinical Advisor<br>
              25 years of hands-on nursing experience in ICF-ID facilities. Emily works directly with our AI team to ensure our agents understand real-world care workflows.</p>
            </div>
            
            <h2>🎁 Exclusive Founding Member Benefits</h2>
            <p>As a <span class="tier-badge">${tier} Founding Member</span>, you're locked in for life with:</p>
            <ul>
              <li>✅ ${tier === 'Starter' ? '50%' : tier === 'Professional' ? '55%' : '60%'} lifetime discount (never increases)</li>
              <li>✅ Priority feature requests - your voice shapes our roadmap</li>
              <li>✅ Dedicated onboarding specialist (not a generic support rep)</li>
              <li>✅ Early beta access starting Month 2</li>
              <li>✅ Founding Member badge in our community</li>
              <li>✅ Quarterly strategy calls with our leadership team</li>
            </ul>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">💬 Join Our Private Community</h3>
              <p>Connect with other founding members, share best practices, and get insider updates:</p>
              <p style="text-align: center;">
                <a href="#" class="button">Join Founding Member Slack</a>
              </p>
              <p><small>Access exclusive channels: #product-feedback, #compliance-corner, #success-stories</small></p>
            </div>
            
            <h2>❓ Frequently Asked Questions</h2>
            
            <p><strong>Q: When will I get beta access?</strong><br>
            A: Beta invitations go out in Month 2 (approximately 60 days from your signup). We'll email you with access instructions and a personalized onboarding schedule.</p>
            
            <p><strong>Q: Can I add more residents to my plan later?</strong><br>
            A: Absolutely! Your founding member discount applies to your base tier, and you can scale up anytime. Additional residents are billed at your discounted rate.</p>
            
            <p><strong>Q: What happens if I need help during beta?</strong><br>
            A: Every founding member gets a dedicated success manager. You'll have their direct email and phone number - no ticket systems or chatbots.</p>
            
            <p><strong>Q: Will my data be secure during beta?</strong><br>
            A: Yes. Our infrastructure is already HIPAA-compliant with 256-bit encryption, SOC 2 certified, and backed up in real-time. Beta uses the same production-grade security.</p>
            
            <h2>📅 What's Next</h2>
            <p>Next week, we'll send you a deep dive into <strong>DocuBot and Guardian AI</strong> - our two most popular agents. You'll see real-world scenarios, video demos, and hear from early beta testers.</p>
            
            <p>Have questions or feedback? Hit reply - this email goes directly to our founding member success team.</p>
            
            <p>Excited to build the future together! 🚀</p>
            
            <p>Best regards,<br>
            <strong>The HarmonyCare Team</strong></p>
          </div>
          
          <div class="footer">
            <p>HarmonyCare - AI-Native Care Management<br>
            Launching Q1 2026 | Founding Member #${Math.floor(Math.random() * 200)}</p>
          </div>
        </body>
      </html>
    `
  };
}

/**
 * Email 3: Week 2 - Feature Spotlight
 */
export function getWeek2FeatureSpotlightEmail(params: EmailTemplateParams): { subject: string; html: string } {
  const { firstName, facilityName } = params;
  
  return {
    subject: "Feature Spotlight: Meet DocuBot & Guardian AI 🤖",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1>🤖 Feature Spotlight</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>This week, we're pulling back the curtain on two of HarmonyCare's most powerful AI agents: <strong>DocuBot</strong> and <strong>Guardian AI</strong>. These aren't just features - they're game-changers that will transform how ${facilityName} delivers care.</p>
            
            <div class="feature-box">
              <h3>🎤 DocuBot: Voice-to-Documentation AI</h3>
              <p><strong>The Problem:</strong> Caregivers spend 60% of their shift on paperwork instead of resident care. Documentation is tedious, time-consuming, and often incomplete.</p>
              
              <p><strong>The Solution:</strong> DocuBot turns your voice into perfect documentation in seconds.</p>
              
              <h4>How It Works:</h4>
              <ol>
                <li><strong>Speak Naturally:</strong> "Sarah had a great morning. Ate 100% of breakfast, participated in art therapy, and asked about her daughter's visit tomorrow."</li>
                <li><strong>AI Processes:</strong> DocuBot understands context, medical terminology, and regulatory requirements</li>
                <li><strong>Perfect Documentation:</strong> Generates compliant progress notes, care plans, and incident reports automatically</li>
              </ol>
              
              <h4>Real-World Impact:</h4>
              <div class="highlight">
                <p><em>"DocuBot saved me 3 hours per shift. I can finally spend time with residents instead of staring at a computer. The notes are better than what I used to write manually."</em></p>
                <p><strong>- Jennifer M., LPN, Sunrise Group Home (Beta Tester)</strong></p>
              </div>
              
              <h4>Key Features:</h4>
              <ul>
                <li>✅ 98.5% accuracy in noisy environments (tested with background TV, conversations, alarms)</li>
                <li>✅ Understands 500+ medical terms and abbreviations</li>
                <li>✅ Auto-fills required fields for state surveys</li>
                <li>✅ Works offline - syncs when connection returns</li>
                <li>✅ Multi-language support (English, Spanish, more coming)</li>
                <li>✅ HIPAA-compliant voice encryption</li>
              </ul>
              
              <h4>Use Cases for ${facilityName}:</h4>
              <ul>
                <li>📝 Daily progress notes during rounds</li>
                <li>🚨 Incident reports while events are fresh</li>
                <li>💊 Medication administration records (MAR)</li>
                <li>🩺 Vital signs documentation</li>
                <li>📞 Family communication logs</li>
                <li>🎯 Behavioral observations for care plans</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3>🛡️ Guardian AI: Predictive Health Monitoring</h3>
              <p><strong>The Problem:</strong> Health crises often happen suddenly, but warning signs were there. Staff can't monitor every resident 24/7 for subtle changes.</p>
              
              <p><strong>The Solution:</strong> Guardian AI analyzes patterns across vitals, behaviors, medications, and care notes to predict health issues before they become emergencies.</p>
              
              <h4>How It Works:</h4>
              <ol>
                <li><strong>Continuous Monitoring:</strong> Guardian tracks 50+ data points per resident (vitals, appetite, sleep, mood, medications, activities)</li>
                <li><strong>Pattern Recognition:</strong> AI identifies deviations from each resident's baseline</li>
                <li><strong>Early Alerts:</strong> Notifies staff 24-72 hours before potential health events</li>
                <li><strong>Actionable Insights:</strong> Provides specific recommendations and clinical context</li>
              </ol>
              
              <h4>Real-World Impact:</h4>
              <div class="highlight">
                <p><em>"Guardian flagged a UTI risk 48 hours before symptoms appeared. We started treatment early and avoided a hospital transfer. This system has prevented 3 ER visits in 2 months."</em></p>
                <p><strong>- Dr. Michael Torres, Medical Director, Harmony ICF (Beta Tester)</strong></p>
              </div>
              
              <h4>What Guardian Predicts:</h4>
              <ul>
                <li>🩺 <strong>Infections:</strong> UTIs, respiratory infections, skin infections (72-hour advance warning)</li>
                <li>💊 <strong>Medication Issues:</strong> Adverse reactions, non-compliance patterns</li>
                <li>🧠 <strong>Mental Health:</strong> Depression episodes, anxiety spikes, behavioral changes</li>
                <li>🍽️ <strong>Nutritional Risks:</strong> Dehydration, malnutrition, aspiration risks</li>
                <li>🚶 <strong>Fall Risks:</strong> Gait changes, dizziness patterns, environmental hazards</li>
                <li>💔 <strong>Chronic Conditions:</strong> Diabetes complications, seizure triggers, cardiac events</li>
              </ul>
              
              <h4>Alert Example:</h4>
              <div style="background: #fff3cd; border: 2px solid #ffc107; border-radius: 8px; padding: 16px; margin: 16px 0;">
                <p style="margin: 0;"><strong>⚠️ Guardian Alert: Infection Risk Detected</strong></p>
                <p style="margin: 8px 0 0 0;"><strong>Resident:</strong> John D. (Room 12)<br>
                <strong>Risk Level:</strong> Moderate (65% probability)<br>
                <strong>Predicted Condition:</strong> Urinary Tract Infection<br>
                <strong>Timeline:</strong> Symptoms likely within 48 hours</p>
                <p style="margin: 8px 0 0 0;"><strong>Indicators:</strong></p>
                <ul style="margin: 4px 0;">
                  <li>Decreased fluid intake (30% below baseline, 3 days)</li>
                  <li>Increased bathroom frequency (+40%, past 24 hours)</li>
                  <li>Mild confusion noted in yesterday's care notes</li>
                  <li>Low-grade temp (99.2°F, up from 98.1°F baseline)</li>
                </ul>
                <p style="margin: 8px 0 0 0;"><strong>Recommended Actions:</strong></p>
                <ol style="margin: 4px 0;">
                  <li>Increase fluid encouragement (target: 64oz today)</li>
                  <li>Monitor temperature q4h</li>
                  <li>Contact physician for possible urinalysis order</li>
                  <li>Document any new symptoms (urgency, odor, pain)</li>
                </ol>
              </div>
            </div>
            
            <h2>🎥 See Them in Action</h2>
            <p>We're hosting a <strong>live demo webinar</strong> next Thursday at 2pm EST where you'll see DocuBot and Guardian in real-world scenarios. We'll also answer your questions live.</p>
            <p style="text-align: center;">
              <a href="#" class="button">Register for Live Demo</a>
            </p>
            
            <h2>💡 Coming Next Week</h2>
            <p>Next week's email will cover <strong>Compliance & Security</strong> - how HarmonyCare ensures 100% regulatory compliance and protects your residents' data. We'll break down our HIPAA, SOC 2, and state survey readiness.</p>
            
            <p>Questions about DocuBot or Guardian? Reply to this email - our product team reads every response.</p>
            
            <p>Excited to show you more! 🚀</p>
            
            <p>Best regards,<br>
            <strong>The HarmonyCare Team</strong></p>
          </div>
          
          <div class="footer">
            <p>HarmonyCare - AI-Native Care Management<br>
            Launching Q1 2026</p>
          </div>
        </body>
      </html>
    `
  };
}

/**
 * Email 4: Week 3 - Compliance & Security
 */
export function getWeek3ComplianceEmail(params: EmailTemplateParams): { subject: string; html: string } {
  const { firstName, facilityName } = params;
  
  return {
    subject: "How HarmonyCare Ensures 100% Compliance & Security 🔒",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1>🔒 Compliance & Security</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>We know compliance isn't just a checkbox for ${facilityName} - it's your license to operate. That's why HarmonyCare was built from day one with regulatory compliance and data security as non-negotiables.</p>
            
            <p>This week, we're giving you a transparent look at exactly how we protect your residents' data and keep you survey-ready 24/7.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">🎯 Our Compliance Promise</h3>
              <p><strong>"If HarmonyCare causes a compliance citation, we'll pay the fine."</strong></p>
              <p>That's not marketing - it's in our founding member agreement. We're that confident in our compliance infrastructure.</p>
            </div>
            
            <h2>📋 Regulatory Compliance</h2>
            
            <div class="feature-box">
              <h3>42 CFR Part 483 (ICF-ID Requirements)</h3>
              <p>Every HarmonyCare feature maps directly to federal regulations:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Regulation</th>
                  <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">HarmonyCare Solution</th>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>§483.440</strong><br>Active Treatment</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">Nexus AI auto-schedules required activities, tracks participation, documents progress toward goals</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>§483.450</strong><br>Facility Staffing</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">Sentinel Pro ensures staff-to-resident ratios, tracks certifications, flags coverage gaps</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>§483.460</strong><br>Medication Management</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">PharmAssist validates orders, tracks administration, alerts to interactions and errors</td>
                </tr>
                <tr style="background: #f9fafb;">
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>§483.470</strong><br>Physical Environment</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">Maintenance Coordinator schedules inspections, documents repairs, ensures safety compliance</td>
                </tr>
              </table>
              
              <p><strong>Survey Readiness:</strong> Our Sentinel Pro agent maintains a real-time compliance dashboard. If a surveyor walks in today, you'll know exactly where you stand on every tag.</p>
            </div>
            
            <div class="feature-box">
              <h3>State-Specific Requirements</h3>
              <p>HarmonyCare adapts to your state's regulations:</p>
              <ul>
                <li>✅ <strong>California:</strong> Title 17 CCR compliance, CARF accreditation support</li>
                <li>✅ <strong>Texas:</strong> HHSC Chapter 9 requirements, Medicaid waiver documentation</li>
                <li>✅ <strong>New York:</strong> OPWDD Part 635 standards, incident reporting protocols</li>
                <li>✅ <strong>Florida:</strong> Agency for Persons with Disabilities regulations</li>
                <li>✅ <strong>All 50 States:</strong> Custom compliance rule sets available</li>
              </ul>
              <p><em>During onboarding, we configure HarmonyCare for your specific state and licensing type.</em></p>
            </div>
            
            <h2>🔐 Data Security & HIPAA Compliance</h2>
            
            <div class="feature-box">
              <h3>Infrastructure Security</h3>
              <ul>
                <li><strong>🔒 256-bit AES Encryption:</strong> All data encrypted at rest and in transit (same standard used by banks)</li>
                <li><strong>☁️ AWS GovCloud Hosting:</strong> HIPAA-compliant infrastructure with 99.99% uptime SLA</li>
                <li><strong>🔑 Multi-Factor Authentication:</strong> Required for all staff accounts, biometric options available</li>
                <li><strong>📱 Device Security:</strong> Remote wipe capability, automatic session timeouts, encrypted local storage</li>
                <li><strong>🔄 Real-Time Backups:</strong> Continuous data replication across 3 geographic regions</li>
                <li><strong>🛡️ Intrusion Detection:</strong> 24/7 monitoring by security operations center</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3>HIPAA Compliance</h3>
              <p><strong>We're not just HIPAA-compliant - we exceed requirements:</strong></p>
              
              <h4>Administrative Safeguards:</h4>
              <ul>
                <li>✅ Designated Privacy Officer and Security Officer</li>
                <li>✅ Annual security risk assessments</li>
                <li>✅ Workforce training and sanctions policy</li>
                <li>✅ Business Associate Agreements (BAA) with all vendors</li>
                <li>✅ Incident response plan with 24-hour breach notification</li>
              </ul>
              
              <h4>Physical Safeguards:</h4>
              <ul>
                <li>✅ SOC 2 Type II certified data centers</li>
                <li>✅ Biometric access controls</li>
                <li>✅ 24/7 video surveillance</li>
                <li>✅ Secure disposal of hardware</li>
              </ul>
              
              <h4>Technical Safeguards:</h4>
              <ul>
                <li>✅ Unique user IDs and automatic logoff</li>
                <li>✅ Audit logs of all data access (who, what, when)</li>
                <li>✅ Encryption of ePHI in transit and at rest</li>
                <li>✅ Integrity controls to prevent data tampering</li>
              </ul>
            </div>
            
            <h2>📊 Compliance Monitoring Dashboard</h2>
            <p>Your Sentinel Pro agent provides real-time compliance visibility:</p>
            
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="margin-top: 0;">Sample Compliance Dashboard</h4>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px;"><strong>Active Treatment Participation</strong></td>
                  <td style="padding: 8px; text-align: right; color: #10b981; font-weight: bold;">98% ✓</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="padding: 8px;"><strong>Staff Certification Currency</strong></td>
                  <td style="padding: 8px; text-align: right; color: #10b981; font-weight: bold;">100% ✓</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Medication Error Rate</strong></td>
                  <td style="padding: 8px; text-align: right; color: #10b981; font-weight: bold;">0.02% ✓</td>
                </tr>
                <tr style="background: #ffffff;">
                  <td style="padding: 8px;"><strong>Documentation Completeness</strong></td>
                  <td style="padding: 8px; text-align: right; color: #f59e0b; font-weight: bold;">94% ⚠️</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Fire Drill Compliance</strong></td>
                  <td style="padding: 8px; text-align: right; color: #10b981; font-weight: bold;">100% ✓</td>
                </tr>
              </table>
              <p style="margin: 12px 0 0 0; font-size: 14px; color: #6b7280;">
                ⚠️ <strong>Action Needed:</strong> 3 residents missing quarterly care plan updates. Due in 5 days.
              </p>
            </div>
            
            <h2>🏆 Third-Party Certifications</h2>
            <div class="highlight">
              <ul style="margin: 0;">
                <li><strong>SOC 2 Type II:</strong> Audited annually by independent CPA firm</li>
                <li><strong>HITRUST CSF:</strong> Healthcare-specific security framework certification (in progress)</li>
                <li><strong>ISO 27001:</strong> International information security standard (planned Q2 2026)</li>
              </ul>
              <p style="margin: 12px 0 0 0;"><em>Audit reports available to founding members upon request</em></p>
            </div>
            
            <h2>❓ Your Compliance Questions Answered</h2>
            
            <p><strong>Q: What happens if there's a data breach?</strong><br>
            A: We have cyber insurance ($5M coverage) and a 24-hour incident response team. You'll be notified immediately with a detailed action plan. Our breach history: zero incidents since founding.</p>
            
            <p><strong>Q: Can surveyors access HarmonyCare during inspections?</strong><br>
            A: Yes. We provide a read-only surveyor account with full documentation access. Many surveyors prefer this over paper records.</p>
            
            <p><strong>Q: Who owns our resident data?</strong><br>
            A: You do, 100%. We're just the custodian. You can export all data in standard formats anytime. If you cancel, we securely delete your data within 30 days.</p>
            
            <p><strong>Q: Do you sell or share resident data?</strong><br>
            A: Never. We don't sell data, train AI models on your data, or share with third parties (except as required by law). This is in our privacy policy and founding member agreement.</p>
            
            <h2>📚 Compliance Resources for ${facilityName}</h2>
            <p>We're creating a compliance resource library for founding members:</p>
            <ul>
              <li>📖 State-specific regulation guides</li>
              <li>✅ Survey preparation checklists</li>
              <li>📝 Sample policies and procedures</li>
              <li>🎥 Training videos for staff</li>
              <li>📊 Compliance report templates</li>
            </ul>
            <p><em>Available in your founding member portal next month</em></p>
            
            <h2>💡 Coming Next Week</h2>
            <p>Next week's email: <strong>Month 1 Progress Report</strong> - major development milestones, product roadmap updates, and founding member community growth.</p>
            
            <p>Questions about compliance or security? Our compliance team (led by Marcus Rodriguez, former state surveyor) is here to help. Just reply to this email.</p>
            
            <p>Stay compliant, stay secure! 🔒</p>
            
            <p>Best regards,<br>
            <strong>The HarmonyCare Team</strong></p>
          </div>
          
          <div class="footer">
            <p>HarmonyCare - AI-Native Care Management<br>
            Launching Q1 2026</p>
          </div>
        </body>
      </html>
    `
  };
}

// Template functions exported at end of file

/**
 * Email 5: Month 1 - Progress Report
 */
export function getMonth1ProgressEmail(params: EmailTemplateParams): { subject: string; html: string } {
  const { firstName, facilityName, foundingMemberCount = 173 } = params;
  
  return {
    subject: "🚀 Month 1 Complete: Major Milestones Achieved!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 Month 1 Complete!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>We can't believe it's already been a month since ${facilityName} joined our founding member community! Time flies when you're building something revolutionary.</p>
            
            <p>This email is packed with updates: development milestones, product roadmap changes based on YOUR feedback, and important dates for beta access.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">📊 Founding Member Community Growth</h3>
              <div style="text-align: center;">
                <div class="stat-box">
                  <span class="stat-number">${foundingMemberCount}</span>
                  <span class="stat-label">Founding Members</span>
                </div>
                <div class="stat-box">
                  <span class="stat-number">${200 - foundingMemberCount}</span>
                  <span class="stat-label">Spots Remaining</span>
                </div>
                <div class="stat-box">
                  <span class="stat-number">March 31</span>
                  <span class="stat-label">Program Closes</span>
                </div>
              </div>
              <p style="text-align: center; margin-top: 16px; color: #dc2626; font-weight: 600;">
                ⏰ Founding member pricing locks in 60 days!
              </p>
            </div>
            
            <h2>✅ Development Milestones Achieved</h2>
            
            <div class="feature-box">
              <h3>🎤 DocuBot Voice Engine</h3>
              <ul>
                <li>✅ <strong>Accuracy Milestone:</strong> Achieved 99.1% transcription accuracy (exceeded 98.5% target)</li>
                <li>✅ <strong>Speed Optimization:</strong> Real-time transcription with <0.5 second latency</li>
                <li>✅ <strong>Offline Mode:</strong> Fully functional without internet connection</li>
                <li>✅ <strong>Medical Terminology:</strong> Trained on 2,000+ care-specific terms</li>
                <li>✅ <strong>Multi-Speaker Recognition:</strong> Distinguishes between staff members automatically</li>
              </ul>
              <p><strong>Beta Status:</strong> Ready for testing! Beta invitations start Month 2.</p>
            </div>
            
            <div class="feature-box">
              <h3>🛡️ Guardian AI Predictive Engine</h3>
              <ul>
                <li>✅ <strong>Prediction Accuracy:</strong> 87% accuracy for UTI prediction (72-hour advance warning)</li>
                <li>✅ <strong>Fall Risk Model:</strong> Identifies high-risk residents with 82% accuracy</li>
                <li>✅ <strong>Medication Interaction Database:</strong> Integrated with 15,000+ drug interaction rules</li>
                <li>✅ <strong>Behavioral Pattern Recognition:</strong> Detects mood/behavior changes 48 hours early</li>
                <li>✅ <strong>Alert Prioritization:</strong> Smart filtering reduces alert fatigue by 70%</li>
              </ul>
              <p><strong>Beta Status:</strong> In final testing with 3 pilot facilities. Results are incredible.</p>
            </div>
            
            <div class="feature-box">
              <h3>📋 Sentinel Pro Compliance Engine</h3>
              <ul>
                <li>✅ <strong>Regulation Database:</strong> Mapped 100% of 42 CFR Part 483 requirements</li>
                <li>✅ <strong>State Rule Sets:</strong> Completed compliance rules for all 50 states</li>
                <li>✅ <strong>Real-Time Monitoring:</strong> Dashboard shows compliance status across 50+ metrics</li>
                <li>✅ <strong>Survey Preparation:</strong> Auto-generates survey-ready documentation</li>
                <li>✅ <strong>Citation Prevention:</strong> Proactive alerts for potential compliance gaps</li>
              </ul>
              <p><strong>Beta Status:</strong> Ready for testing. This will be your favorite feature.</p>
            </div>
            
            <div class="feature-box">
              <h3>🔗 Integration Infrastructure</h3>
              <ul>
                <li>✅ <strong>EHR Connectors:</strong> Built integrations for Epic, Cerner, Allscripts, Therap</li>
                <li>✅ <strong>Pharmacy Systems:</strong> Connected to Omnicare, PharMerica, CVS Specialty</li>
                <li>✅ <strong>Payroll Integration:</strong> ADP, Paychex, Gusto connectors ready</li>
                <li>✅ <strong>API Platform:</strong> RESTful API for custom integrations</li>
              </ul>
              <p><strong>Beta Status:</strong> Integration testing begins Month 2 with pilot facilities.</p>
            </div>
            
            <h2>🗺️ Product Roadmap Updates</h2>
            <p><strong>Based on founding member feedback, we've made these roadmap changes:</strong></p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">🆕 New Features Added (Your Requests!)</h3>
              <ul>
                <li><strong>Family Portal:</strong> Secure portal for families to view updates, photos, and communicate with staff (requested by 47 founding members)</li>
                <li><strong>Multilingual Support:</strong> Spanish interface and documentation (requested by 31 members)</li>
                <li><strong>Custom Report Builder:</strong> Create your own reports without calling support (requested by 28 members)</li>
                <li><strong>Mobile App Offline Mode:</strong> Full functionality without internet (requested by 52 members)</li>
              </ul>
              <p><em>This is the power of founding membership - your voice directly shapes our product!</em></p>
            </div>
            
            <h2>📅 Updated Timeline</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Milestone</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Date</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Status</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Beta Invitations</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Month 2 (30 days from now)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; color: #10b981;">✓ On Track</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Beta Testing Period</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Months 2-4 (90 days)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; color: #10b981;">✓ On Track</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Launch Preparation</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Month 5 (December 2025)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; color: #10b981;">✓ On Track</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Official Launch</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Q1 2026 (January-March)</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb; color: #10b981;"><strong>✓ On Track</strong></td>
              </tr>
            </table>
            
            <h2>🎁 Founding Member Exclusive: Early Access Tiers</h2>
            <p>We're dividing beta access into tiers to ensure quality:</p>
            
            <div class="feature-box">
              <h3>🥇 Tier 1: Alpha Testers (Month 2, Week 1)</h3>
              <p><strong>Limited to 20 facilities</strong> - First to test core features</p>
              <ul>
                <li>Weekly 1-on-1 calls with product team</li>
                <li>Direct influence on feature prioritization</li>
                <li>Featured in case studies and testimonials</li>
                <li>Additional 5% lifetime discount (stacks with founding member discount)</li>
              </ul>
              <p><em>Applications open next week - watch your inbox!</em></p>
            </div>
            
            <div class="feature-box">
              <h3>🥈 Tier 2: Beta Testers (Month 2, Week 3)</h3>
              <p><strong>All remaining founding members</strong> - Full platform access</p>
              <ul>
                <li>Bi-weekly group Q&A sessions</li>
                <li>Priority bug fixes and feature requests</li>
                <li>Beta feedback rewards program</li>
              </ul>
            </div>
            
            <h2>💬 Founding Member Community Highlights</h2>
            <div class="highlight">
              <p><em>"I joined the Slack channel and connected with 3 other group home directors in my state. We're already sharing best practices. This community alone is worth the investment!"</em></p>
              <p><strong>- Lisa K., Director, Harmony House (California)</strong></p>
            </div>
            
            <div class="highlight">
              <p><em>"The product team actually implemented my feature request (family portal) in 2 weeks. I've never seen a company move this fast or care this much about customer feedback."</em></p>
              <p><strong>- Robert M., Administrator, Sunrise ICF (Texas)</strong></p>
            </div>
            
            <h2>📊 By the Numbers: Month 1</h2>
            <div style="text-align: center; margin: 24px 0;">
              <div class="stat-box">
                <span class="stat-number">47,000+</span>
                <span class="stat-label">Lines of Code Written</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">156</span>
                <span class="stat-label">Features Completed</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">89</span>
                <span class="stat-label">Founding Member Requests Implemented</span>
              </div>
              <div class="stat-box">
                <span class="stat-number">0</span>
                <span class="stat-label">Security Incidents</span>
              </div>
            </div>
            
            <h2>⚠️ Important: Founding Member Pricing Deadline</h2>
            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0;">🔒 Lock In Your Lifetime Discount</h3>
              <p><strong>Founding member program closes March 31, 2026</strong></p>
              <p>After this date:</p>
              <ul>
                <li>❌ No more 50-60% lifetime discounts</li>
                <li>❌ No priority beta access</li>
                <li>❌ No founding member community access</li>
                <li>❌ Standard pricing applies (2x higher)</li>
              </ul>
              <p><strong>Know someone who should join?</strong> Forward this email - they can still get founding member pricing for 60 more days.</p>
              <p style="text-align: center; margin-top: 16px;">
                <a href="#" class="button">Refer a Facility (Earn $500 Credit)</a>
              </p>
            </div>
            
            <h2>💡 What's Next</h2>
            <p><strong>Next 30 days:</strong></p>
            <ul>
              <li>📧 <strong>Week 5:</strong> Alpha tester application opens</li>
              <li>🎥 <strong>Week 6:</strong> Live product demo webinar (register below)</li>
              <li>📱 <strong>Week 7:</strong> Mobile app preview and testing instructions</li>
              <li>🎁 <strong>Week 8:</strong> Beta access invitations sent!</li>
            </ul>
            
            <p style="text-align: center; margin: 24px 0;">
              <a href="#" class="button">Register for Live Demo Webinar</a>
            </p>
            
            <p>Thank you for being part of this journey. Your feedback, patience, and enthusiasm fuel our team every day.</p>
            
            <p>Here's to Month 2! 🚀</p>
            
            <p>Best regards,<br>
            <strong>The HarmonyCare Team</strong></p>
            
            <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <strong>P.S.</strong> Have questions or feedback? Reply to this email or join our next Founding Member Office Hours (Thursdays at 2pm EST). Calendar invite in your founding member portal.
            </p>
          </div>
          
          <div class="footer">
            <p>HarmonyCare - AI-Native Care Management<br>
            Launching Q1 2026 | ${foundingMemberCount} Founding Members Strong</p>
          </div>
        </body>
      </html>
    `
  };
}

/**
 * Email 6: Month 2 - Beta Access Invitation
 */
export function getMonth2BetaInviteEmail(params: EmailTemplateParams): { subject: string; html: string } {
  const { firstName, lastName, facilityName, tier } = params;
  
  return {
    subject: "🎁 Your Beta Access is Ready! Welcome to HarmonyCare",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${emailStyles}</style>
        </head>
        <body>
          <div class="header">
            <h1>🎁 Beta Access Granted!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p><strong>The moment you've been waiting for is here!</strong></p>
            
            <p>${facilityName} now has exclusive beta access to HarmonyCare. You're among the first 50 facilities in the world to experience AI-powered care management.</p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">🎉 Welcome to the Beta Program!</h3>
              <p style="text-align: center; margin: 20px 0;">
                <a href="#" class="button" style="font-size: 18px; padding: 16px 32px;">Access Your Beta Account →</a>
              </p>
              <p style="text-align: center;"><strong>Your Credentials:</strong><br>
              Email: ${firstName.toLowerCase()}.${lastName.toLowerCase()}@${facilityName.toLowerCase().replace(/\s+/g, '')}.harmonycare.com<br>
              <em>(Temporary password sent in separate email for security)</em></p>
            </div>
            
            <h2>🚀 Getting Started: Your First 7 Days</h2>
            
            <div class="feature-box">
              <h3>Day 1-2: Setup & Onboarding</h3>
              <p><strong>Your dedicated success manager: Sarah Chen</strong><br>
              📧 sarah.chen@harmonycare.com | 📞 (555) 123-4567</p>
              
              <h4>What to Expect:</h4>
              <ul>
                <li>✅ <strong>Kickoff Call (30 min):</strong> Sarah will call you within 24 hours to schedule your personalized onboarding</li>
                <li>✅ <strong>Account Setup:</strong> We'll configure HarmonyCare for ${facilityName}'s specific needs</li>
                <li>✅ <strong>Data Import:</strong> Optional: Import existing resident data from your current system</li>
                <li>✅ <strong>Staff Training:</strong> Schedule group training sessions (virtual or on-site)</li>
              </ul>
            </div>
            
            <div class="feature-box">
              <h3>Day 3-4: Explore Core Features</h3>
              <p><strong>Start with these high-impact features:</strong></p>
              
              <h4>🎤 DocuBot Voice Documentation</h4>
              <ol>
                <li>Open the mobile app and tap "Start Recording"</li>
                <li>Speak your progress notes naturally (try: "John had a great day, ate 100% of meals, participated in group activities")</li>
                <li>Watch DocuBot generate perfect documentation in seconds</li>
                <li>Edit if needed, then save to resident record</li>
              </ol>
              <p><em>💡 Tip: Use DocuBot during rounds for real-time documentation</em></p>
              
              <h4>🛡️ Guardian AI Health Monitoring</h4>
              <ol>
                <li>Navigate to Dashboard → Guardian AI</li>
                <li>Review current health alerts and predictions</li>
                <li>Click any alert to see detailed analysis and recommendations</li>
                <li>Mark actions taken to close the alert loop</li>
              </ol>
              <p><em>💡 Tip: Check Guardian every morning - it works while you sleep!</em></p>
            </div>
            
            <div class="feature-box">
              <h3>Day 5-7: Advanced Features</h3>
              <ul>
                <li><strong>Sentinel Pro:</strong> Set up compliance monitoring and survey preparation</li>
                <li><strong>Nexus AI:</strong> Auto-schedule activities and track participation</li>
                <li><strong>PharmAssist:</strong> Configure medication management and interaction alerts</li>
                <li><strong>Integrations:</strong> Connect your EHR, pharmacy, and payroll systems</li>
              </ul>
            </div>
            
            <h2>📚 Beta Resources</h2>
            <p><strong>Everything you need to succeed:</strong></p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Resource</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Link</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">📖 <strong>Beta User Guide</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="#">Download PDF</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;">🎥 <strong>Video Tutorials</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="#">Watch Library</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">💬 <strong>Beta Slack Channel</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="#">Join #beta-testers</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;">🆘 <strong>24/7 Support</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">support@harmonycare.com<br>(555) 123-4567</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">📅 <strong>Office Hours</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Tue/Thu 2-3pm EST<br><a href="#">Add to Calendar</a></td>
              </tr>
            </table>
            
            <h2>🐛 Beta Testing: What We Need from You</h2>
            <p><strong>Your feedback shapes the final product!</strong></p>
            
            <div class="feature-box">
              <h3>How to Report Issues</h3>
              <ol>
                <li><strong>In-App Feedback:</strong> Shake your phone or click "Report Issue" in any screen</li>
                <li><strong>Email:</strong> beta-feedback@harmonycare.com</li>
                <li><strong>Slack:</strong> Post in #beta-bugs or #beta-feature-requests</li>
              </ol>
              <p><strong>What to Report:</strong></p>
              <ul>
                <li>🐛 Bugs or errors (include screenshots if possible)</li>
                <li>🤔 Confusing workflows or unclear features</li>
                <li>💡 Feature requests or improvement ideas</li>
                <li>⚡ Performance issues (slow loading, crashes)</li>
                <li>✅ Things that work great (we love positive feedback too!)</li>
              </ul>
            </div>
            
            <h2>🏆 Beta Rewards Program</h2>
            <p><strong>Earn rewards for active participation:</strong></p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Activity</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;">Reward</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Complete onboarding checklist</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;"><strong>$100 credit</strong></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Submit 10+ bug reports or feature requests</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;"><strong>$250 credit</strong></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Participate in user testing session</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;"><strong>$150 credit</strong></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Record video testimonial</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;"><strong>$500 credit</strong></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Refer another facility to beta</td>
                <td style="padding: 12px; text-align: center; border: 1px solid #e5e7eb;"><strong>$1,000 credit</strong></td>
              </tr>
            </table>
            <p><em>Credits apply to your first year subscription</em></p>
            
            <h2>⚠️ Beta Limitations & Known Issues</h2>
            <p><strong>Please be aware:</strong></p>
            <ul>
              <li>🔧 <strong>Data Migration:</strong> Some EHR imports may require manual review</li>
              <li>📱 <strong>Mobile App:</strong> iOS only during beta (Android coming Month 3)</li>
              <li>🌐 <strong>Browser Support:</strong> Chrome and Safari recommended (Firefox/Edge have minor display issues)</li>
              <li>⏱️ <strong>Performance:</strong> Expect occasional slowdowns during peak testing hours</li>
              <li>💾 <strong>Data Backup:</strong> We recommend keeping your old system active during beta</li>
            </ul>
            
            <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0;">⚠️ Important: Beta Data Policy</h3>
              <p><strong>Your data is real and protected:</strong></p>
              <ul>
                <li>✅ All beta data is stored in production-grade, HIPAA-compliant infrastructure</li>
                <li>✅ Your data will NOT be deleted after beta - it carries over to launch</li>
                <li>✅ Full backups every 6 hours, retained for 90 days</li>
                <li>✅ You can export all data anytime in standard formats</li>
              </ul>
              <p><em>Treat HarmonyCare as your primary system if you're comfortable - it's ready!</em></p>
            </div>
            
            <h2>📅 Beta Timeline</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr style="background: #f3f4f6;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Phase</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Duration</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb;">Focus</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Beta Phase 1</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Weeks 1-4</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Core features, stability, usability</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Beta Phase 2</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Weeks 5-8</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Advanced features, integrations, performance</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Beta Phase 3</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Weeks 9-12</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Polish, optimization, launch preparation</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Official Launch</strong></td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">Q1 2026</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">General availability, full feature set</td>
              </tr>
            </table>
            
            <h2>🎯 Success Metrics: How We'll Measure Beta</h2>
            <p><strong>Our goals for beta testing:</strong></p>
            <ul>
              <li>📊 <strong>Adoption:</strong> 80%+ of staff actively using HarmonyCare daily</li>
              <li>⏱️ <strong>Time Savings:</strong> 50%+ reduction in documentation time</li>
              <li>🐛 <strong>Stability:</strong> <1% error rate, 99.9% uptime</li>
              <li>😊 <strong>Satisfaction:</strong> 4.5+ star rating from beta testers</li>
              <li>✅ <strong>Compliance:</strong> 100% survey-ready documentation</li>
            </ul>
            <p><em>We'll share progress updates every 2 weeks</em></p>
            
            <div class="highlight">
              <h3 style="margin-top: 0;">💬 What Beta Testers Are Saying</h3>
              <p><em>"I was skeptical about AI, but DocuBot is incredible. It's like having a documentation assistant who never gets tired. My notes are better and I'm spending 2 more hours per shift with residents."</em></p>
              <p><strong>- Jennifer M., LPN, Sunrise Group Home (Alpha Tester)</strong></p>
              
              <p><em>"Guardian AI caught a UTI 3 days before symptoms appeared. We started treatment early and avoided a hospital transfer. This system has already paid for itself."</em></p>
              <p><strong>- Dr. Michael Torres, Medical Director, Harmony ICF (Alpha Tester)</strong></p>
            </div>
            
            <h2>🚀 Ready to Get Started?</h2>
            <p style="text-align: center; margin: 30px 0;">
              <a href="#" class="button" style="font-size: 20px; padding: 18px 36px;">Launch HarmonyCare Beta →</a>
            </p>
            
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Click the button above to access your beta account</li>
              <li>Check your email for temporary password (separate email for security)</li>
              <li>Wait for Sarah Chen's call within 24 hours to schedule onboarding</li>
              <li>Join the #beta-testers Slack channel to connect with other facilities</li>
              <li>Start exploring and send us feedback!</li>
            </ol>
            
            <p>We're incredibly excited to have ${facilityName} as one of our first beta testers. Your feedback will directly shape the future of care management.</p>
            
            <p>Thank you for your trust and partnership! 🙏</p>
            
            <p>Best regards,<br>
            <strong>The HarmonyCare Team</strong></p>
            
            <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <strong>P.S.</strong> Having trouble logging in? Email beta-support@harmonycare.com or call (555) 123-4567. We're here 24/7 during beta.
            </p>
          </div>
          
          <div class="footer">
            <p>HarmonyCare - AI-Native Care Management<br>
            Beta Program | Launching Q1 2026</p>
          </div>
        </body>
      </html>
    `
  };
}

// Update exports
export const emailTemplates = {
  week1Update: getWeek1UpdateEmail,
  week2FeatureSpotlight: getWeek2FeatureSpotlightEmail,
  week3Compliance: getWeek3ComplianceEmail,
  month1Progress: getMonth1ProgressEmail,
  month2BetaInvite: getMonth2BetaInviteEmail,
  // Month 3 and Launch Week templates would continue here
};
