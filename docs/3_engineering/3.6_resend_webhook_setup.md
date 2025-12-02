# Resend Webhook Setup Guide

This guide explains how to configure Resend webhooks to automatically track email opens and clicks for real-time lead score updates.

## Overview

The Resend webhook integration enables automatic tracking of email engagement:
- **Email Opens**: +5 engagement points per open
- **Email Clicks**: +10 engagement points per click
- **Real-Time Updates**: Lead scores recalculate immediately after each event
- **Tier Upgrades**: Leads automatically move from Cold → Warm → Hot as engagement increases

---

## Setup Instructions

### 1. Get Your Webhook URL

Your webhook endpoint is:
```
https://your-domain.com/api/trpc/resendWebhook.handleEvent
```

Replace `your-domain.com` with your actual domain (e.g., `harmony.manus.space`).

### 2. Configure Webhook in Resend Dashboard

1. Log in to [Resend Dashboard](https://resend.com/dashboard)
2. Navigate to **Webhooks** in the left sidebar
3. Click **Add Webhook**
4. Enter your webhook URL from step 1
5. Select the following events:
   - ✅ `email.opened`
   - ✅ `email.clicked`
6. (Optional) Select additional events for monitoring:
   - `email.delivered`
   - `email.bounced`
   - `email.complained`
7. Click **Create Webhook**

### 3. Copy Webhook Signing Secret (Optional but Recommended)

1. After creating the webhook, copy the **Signing Secret**
2. Add it to your environment variables:
   ```bash
   RESEND_WEBHOOK_SECRET=your_signing_secret_here
   ```
3. This enables signature verification for security (prevents spoofed webhook calls)

---

## How It Works

### Email Tagging

When sending nurture emails, the system automatically includes metadata tags:

```typescript
{
  to: "lead@example.com",
  subject: "Day 1: Your Exclusive HarmonyCare Guide",
  html: "...",
  tags: [
    { name: "lead_id", value: "123" },
    { name: "email_type", value: "day1" },
    { name: "campaign", value: "nurture_sequence" }
  ]
}
```

### Webhook Processing

1. **Resend sends webhook event** when user opens/clicks email
2. **Webhook handler extracts lead ID** from tags or email address
3. **Engagement is tracked** via `trackEngagement()` function
4. **Lead score is recalculated** automatically
5. **Tier is updated** if score crosses threshold (40 or 70)

### Event Flow

```
User Opens Email
    ↓
Resend Webhook Event → /api/trpc/resendWebhook.handleEvent
    ↓
Extract lead_id from tags
    ↓
trackEngagement(leadId, "email_open")
    ↓
engagementScore += 5
    ↓
Recalculate leadScore (0-100)
    ↓
Update leadTier (hot/warm/cold)
    ↓
Database Updated ✅
```

---

## Testing the Webhook

### Option 1: Resend Webhook Simulator

1. Go to Resend Dashboard → Webhooks
2. Click on your webhook
3. Click **Send Test Event**
4. Select `email.opened` or `email.clicked`
5. Modify payload to include valid lead_id:
   ```json
   {
     "type": "email.opened",
     "created_at": "2024-01-15T10:30:00Z",
     "data": {
       "email_id": "test-123",
       "to": ["lead@example.com"],
       "tags": [
         { "name": "lead_id", "value": "1" }
       ]
     }
   }
   ```
6. Click **Send**
7. Check your database to verify engagement score increased

### Option 2: Manual Testing with cURL

```bash
curl -X POST https://your-domain.com/api/trpc/resendWebhook.handleEvent \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email.opened",
    "created_at": "2024-01-15T10:30:00Z",
    "data": {
      "email_id": "test-123",
      "to": ["lead@example.com"],
      "tags": [
        { "name": "lead_id", "value": "1" }
      ]
    }
  }'
```

### Option 3: Run Automated Tests

```bash
pnpm test resendWebhook.test.ts
```

All 9 tests should pass ✅

---

## Monitoring Webhook Activity

### View Webhook Statistics

Access webhook stats via the admin dashboard or API:

```typescript
const stats = await trpc.resendWebhook.getStats.query();
// Returns:
// {
//   totalLeads: 150,
//   engagedLeads: 87,
//   engagementRate: 58,
//   totalEngagementPoints: 1245
// }
```

### Check Logs

Webhook events are logged to console:

```
[ResendWebhook] Processing event: email.opened
[ResendWebhook] ✅ Tracked email open for lead 123
[LeadScoring] Updated lead 123: 65 points (warm)
```

### Database Verification

Check lead engagement in database:

```sql
SELECT 
  id, 
  email, 
  engagementScore, 
  leadScore, 
  leadTier, 
  lastEngagementAt
FROM calculatorLeads
WHERE engagementScore > 0
ORDER BY lastEngagementAt DESC;
```

---

## Troubleshooting

### Webhook Not Receiving Events

1. **Verify webhook URL is correct**
   - Must be publicly accessible (not localhost)
   - Must use HTTPS in production
   - Must end with `/api/trpc/resendWebhook.handleEvent`

2. **Check Resend webhook status**
   - Go to Resend Dashboard → Webhooks
   - Check for error messages or failed deliveries
   - Verify events are selected: `email.opened`, `email.clicked`

3. **Test with webhook simulator**
   - Use Resend's built-in test feature
   - Check server logs for incoming requests

### Events Not Updating Lead Scores

1. **Verify lead_id is in email tags**
   - Check email sending code includes `tags` parameter
   - Ensure lead_id value is valid integer

2. **Check database for lead**
   - Verify lead exists with matching ID or email
   - Check `engagementScore` and `lastEngagementAt` fields

3. **Review server logs**
   - Look for errors in webhook processing
   - Check `trackEngagement()` function output

### Signature Verification Failing

1. **Ensure RESEND_WEBHOOK_SECRET is set**
   - Add to environment variables
   - Restart server after adding

2. **Verify secret matches Resend dashboard**
   - Copy exact value from webhook settings
   - No extra spaces or quotes

---

## Security Best Practices

1. **Enable Signature Verification**
   - Set `RESEND_WEBHOOK_SECRET` environment variable
   - Implement HMAC SHA256 verification (TODO in code)

2. **Use HTTPS Only**
   - Never use HTTP in production
   - Resend requires HTTPS for webhooks

3. **Validate Event Data**
   - All events are validated with Zod schema
   - Invalid payloads return 400 Bad Request

4. **Rate Limiting** (Recommended)
   - Add rate limiting to webhook endpoint
   - Prevent abuse from malicious actors

---

## Advanced Configuration

### Custom Event Handling

Extend webhook handler to process additional events:

```typescript
// In resendWebhook.ts
if (event.type === "email.bounced") {
  // Mark lead as invalid email
  await markLeadAsBounced(leadId);
}

if (event.type === "email.complained") {
  // Unsubscribe lead from future emails
  await unsubscribeLead(leadId);
}
```

### Webhook Retry Logic

Resend automatically retries failed webhooks:
- 3 retries with exponential backoff
- 1 minute, 5 minutes, 30 minutes
- After 3 failures, webhook is marked as failed

Ensure your endpoint:
- Returns 200 OK for successful processing
- Returns 4xx for invalid data (no retry)
- Returns 5xx for temporary errors (will retry)

---

## Support

For issues with:
- **Resend Webhook Configuration**: [Resend Support](https://resend.com/support)
- **HarmonyCare Integration**: Check server logs and test suite
- **Lead Scoring Logic**: See `leadScoringService.ts` documentation

---

## Summary

✅ Webhook URL: `https://your-domain.com/api/trpc/resendWebhook.handleEvent`  
✅ Events to Enable: `email.opened`, `email.clicked`  
✅ Tags Required: `lead_id` (integer)  
✅ Security: Set `RESEND_WEBHOOK_SECRET` environment variable  
✅ Testing: Run `pnpm test resendWebhook.test.ts`  

**Result**: Automatic real-time lead score updates based on email engagement! 🎉
