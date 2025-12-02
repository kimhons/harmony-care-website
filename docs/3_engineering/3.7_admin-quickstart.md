# HarmonyCare Admin & Email System Quick Start Guide

## 🔐 How to Access the Admin Dashboard

### Step 1: Sign Up as Admin

1. **Go to the signup page**: https://harmonycare.ai/signup (or https://harmonycare.io/signup)
2. **Fill out the form** with your email and details
3. **The first user to sign up is automatically set as admin** (role: 'admin')
4. Submit the form

### Step 2: Access Admin Dashboard

Once logged in, navigate to:

```
https://harmonycare.ai/admin
```

The admin dashboard shows:

- **Total signups** and breakdown by tier (Starter/Professional/Enterprise)
- **Facility type distribution** (Group Homes, ICF-ID, etc.)
- **Email campaign statistics** (sent, pending, opt-outs)
- **UTM tracking analytics** (source, medium, campaign performance)
- **Referral program analytics** (top referrers, conversion rates)
- **Complete signups table** with search and filters
- **CSV export** functionality

### Step 3: View Leads

The admin dashboard displays all leads in a searchable table with:

- Name, Email, Facility Name
- Facility Type, Resident Count
- Founding Member Tier
- Interested Features
- UTM Attribution (source, medium, campaign)
- Referral Code (if they were referred)
- Signup Date

**Export to CSV**: Click the "Export to CSV" button to download all lead data.

---

## 📧 How the Resend Email System Works

### Overview

HarmonyCare uses **Resend** (https://resend.com) for transactional emails and automated drip campaigns.

### Email API Key

Your Resend API key is already configured in the environment variables:

- `RESEND_API_KEY` - Automatically injected by the platform

### What Emails Are Sent?

#### 1. **Immediate Confirmation Email** (sent on signup)

When someone signs up at `/signup`, they immediately receive:

**Subject**: "Welcome to HarmonyCare - Your Founding Member Spot is Reserved!"

**Content**:

- Confirmation of their founding member tier
- Pricing details and savings breakdown
- Expected launch timeline (Q1 2026)
- Next steps and what to expect
- Personal referral code for rewards program

#### 2. **Automated Drip Campaign** (5 emails over 2 months)

After signup, users are enrolled in an automated email sequence:

| Email       | Timing               | Subject                                         | Purpose                                             |
| ----------- | -------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **Week 1**  | 7 days after signup  | "The Real Cost of Doing Nothing"                | Pain amplification - show cost of status quo        |
| **Week 2**  | 14 days after signup | "How 20 AI Agents Will Transform Your Facility" | Feature education - explain the platform            |
| **Week 3**  | 21 days after signup | "Behind the Scenes: Building HarmonyCare"       | Transparency - build trust with development updates |
| **Month 1** | 30 days after signup | "Early Access Preview: See What's Coming"       | Engagement - share sneak peeks and beta features    |
| **Month 2** | 60 days after signup | "Final Countdown to Launch"                     | Urgency - prepare for launch and onboarding         |

#### 3. **Referral Program Emails**

When users refer others:

- **Welcome email** with their unique referral code
- **Milestone celebration emails** (first referral, tier upgrades, top 10 leaderboard)
- **Monthly summary** of referral stats and rewards earned

---

## 🔄 How the Email Campaign System Works

### Automatic Campaign Scheduling

The system uses **campaign stages** to track where each user is in the drip sequence:

```typescript
// Campaign stages in database
campaignStage: "welcome" |
  "week1" |
  "week2" |
  "week3" |
  "month1" |
  "month2" |
  "completed";
```

### Daily Email Processing

A **cron job runs daily at 9am EST** to:

1. Check all signups for their campaign stage
2. Calculate days since signup
3. Send the next email if they've reached the timing threshold
4. Update their campaign stage
5. Track email sent status

### Manual Campaign Trigger (For Testing)

You can manually trigger the campaign processing:

```bash
cd /home/ubuntu/harmony-website
node server/scripts/run-email-campaign.mjs
```

This script:

- Processes all pending campaign emails
- Sends emails via Resend API
- Updates campaign stages in database
- Logs all activity

---

## 📊 Email Campaign Tracking

### What's Tracked

For each signup, the system tracks:

- `campaignStage` - Current position in drip sequence
- `lastEmailSent` - Timestamp of last email
- `emailOptOut` - Whether they unsubscribed
- `emailsSent` - Total count of emails sent

### Viewing Email Stats in Admin Dashboard

The admin dashboard shows:

- **Total emails sent** across all campaigns
- **Pending emails** (users waiting for next stage)
- **Opt-out rate** (users who unsubscribed)
- **Campaign performance** by stage

---

## 🎯 Resend Dashboard

### Accessing Resend

1. Go to https://resend.com
2. Log in with your Resend account
3. View detailed email analytics:
   - Delivery rates
   - Open rates
   - Click rates
   - Bounce rates
   - Individual email logs

### Resend Features Used

- **Transactional emails** - Instant confirmation emails
- **Email templates** - HTML email designs
- **Email tracking** - Opens, clicks, bounces
- **Webhook support** - Real-time delivery notifications

---

## 🔧 Configuration & Customization

### Email Templates Location

All email templates are in:

```
/home/ubuntu/harmony-website/server/emailTemplates/
```

Templates:

- `welcomeEmail.ts` - Immediate confirmation email
- `week1Email.ts` - Week 1 drip campaign
- `week2Email.ts` - Week 2 drip campaign
- `week3Email.ts` - Week 3 drip campaign
- `month1Email.ts` - Month 1 drip campaign
- `month2Email.ts` - Month 2 drip campaign
- `referralWelcome.ts` - Referral program welcome
- `referralMilestone.ts` - Referral milestone celebrations
- `referralMonthlySummary.ts` - Monthly referral stats

### Customizing Email Content

To update email content:

1. Edit the template file in `server/emailTemplates/`
2. Modify the HTML and text content
3. Save the file
4. Restart the server (changes apply immediately)

### Changing Email Timing

To adjust when emails are sent, edit:

```
/home/ubuntu/harmony-website/server/routes/emailCampaign.ts
```

Change the day thresholds:

```typescript
// Current timing
if (daysSinceSignup >= 7 && campaignStage === "welcome") {
  // Send week 1 email
}

// Adjust to your preference
if (daysSinceSignup >= 3 && campaignStage === "welcome") {
  // Send week 1 email after 3 days instead
}
```

---

## 🚀 Quick Start Checklist

### For Viewing Leads:

- [ ] Sign up at `/signup` to create your admin account
- [ ] Navigate to `/admin` to access dashboard
- [ ] View all leads in the signups table
- [ ] Export to CSV for external analysis

### For Email System:

- [ ] Verify `RESEND_API_KEY` is configured (already done automatically)
- [ ] Test signup flow to receive confirmation email
- [ ] Check Resend dashboard for email delivery
- [ ] Monitor campaign stages in admin dashboard
- [ ] (Optional) Manually run campaign script for testing

---

## 🐛 Troubleshooting

### "I'm not receiving emails"

1. Check spam/junk folder
2. Verify email address is correct in signup
3. Check Resend dashboard for delivery status
4. Ensure `RESEND_API_KEY` is valid

### "Campaign emails not sending"

1. Check if cron job is running (Vercel Cron)
2. Manually run: `node server/scripts/run-email-campaign.mjs`
3. Check database `campaignStage` values
4. Verify `emailOptOut` is false

### "Can't access admin dashboard"

1. Ensure you're logged in
2. Check that your user has `role: 'admin'` in database
3. First signup is automatically admin
4. Navigate to `/admin` (not `/dashboard`)

---

## 📞 Support

For issues with:

- **Resend API**: https://resend.com/docs
- **Email deliverability**: Check Resend dashboard logs
- **Database queries**: Use Management UI → Database panel
- **Admin access**: Verify user role in database

---

_Last updated: November 26, 2025_
