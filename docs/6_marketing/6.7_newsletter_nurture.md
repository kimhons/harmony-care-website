# Newsletter Nurture Sequence

Automated 5-email nurture sequence for blog subscribers to deliver best content, build trust, and guide them toward scheduling a demo.

## Overview

When someone subscribes to the blog newsletter, they automatically enter a 12-day email sequence:

1. **Day 0 (Immediate)**: Welcome email with best content overview
2. **Day 2**: Top blog article + case study on staffing crisis
3. **Day 5**: Industry insights + ROI calculator invitation
4. **Day 8**: Customer success story (Meadowbrook case study)
5. **Day 12**: Product demo invitation (final email)

## Database Schema

The `newsletterSubscribers` table tracks:

- Subscriber email and metadata
- Nurture sequence progress (`nurtureSequence` JSON field)
- Last email sent (`lastNurtureEmail`, `lastNurtureEmailSentAt`)
- Completion status (`nurtureCompleted`)

## Files

- **`server/newsletter.ts`**: API endpoints for subscription management
- **`server/newsletterEmailTemplates.ts`**: HTML email templates for each nurture email
- **`server/newsletterNurtureService.ts`**: Service to send nurture emails
- **`server/run-newsletter-nurture.ts`**: Cron script to run daily
- **`client/src/components/NewsletterSignup.tsx`**: Blog newsletter signup form

## How It Works

### 1. User Subscribes

When a user submits the newsletter signup form on a blog article:

```typescript
// client/src/components/NewsletterSignup.tsx
const result = await subscribeMutation.mutateAsync({
  email,
  source, // blog article slug
});
```

### 2. Welcome Email Sent Immediately

The subscription endpoint triggers the welcome email:

```typescript
// server/newsletter.ts
const subscriberId = Number(result[0].insertId);
await sendWelcomeEmail(subscriberId);
```

### 3. Subsequent Emails Sent by Cron Job

Run the nurture script daily (recommended: 9am):

```bash
# Manual run
tsx server/run-newsletter-nurture.ts

# Or add to crontab
0 9 * * * cd /path/to/harmony-website && tsx server/run-newsletter-nurture.ts
```

The script checks for subscribers ready for each email:

- Day 2: Subscribers whose last email was "welcome" sent 2+ days ago
- Day 5: Subscribers whose last email was "day2" sent 5+ days ago
- Day 8: Subscribers whose last email was "day5" sent 8+ days ago
- Day 12: Subscribers whose last email was "day8" sent 12+ days ago

## Email Templates

All templates are in `server/newsletterEmailTemplates.ts`:

- `getWelcomeEmail()`: Welcome + best content overview
- `getDay2Email()`: Staffing crisis article + Sunrise case study
- `getDay5Email()`: ROI calculator invitation
- `getDay8Email()`: Meadowbrook success story
- `getDay12Email()`: Demo invitation with founding member pricing

Each template includes:

- Responsive HTML design
- Gradient branding matching HarmonyCare style
- Personalization (name if provided)
- Unsubscribe link
- Resend email tags for tracking

## Testing

### Test Newsletter Signup

1. Navigate to any blog article (e.g., `/blog/icf-id-compliance-software-guide`)
2. Scroll to the newsletter signup form at the bottom
3. Enter your email and submit
4. Check your inbox for the welcome email

### Test Nurture Sequence Manually

```bash
# Send Day 2 emails to eligible subscribers
tsx -e "import { sendDay2Emails } from './server/newsletterNurtureService'; sendDay2Emails().then(console.log)"

# Send Day 5 emails
tsx -e "import { sendDay5Emails } from './server/newsletterNurtureService'; sendDay5Emails().then(console.log)"

# Run full sequence
tsx server/run-newsletter-nurture.ts
```

### Check Subscriber Status

Query the database to see subscriber progress:

```sql
SELECT
  email,
  source,
  lastNurtureEmail,
  lastNurtureEmailSentAt,
  nurtureCompleted,
  status
FROM newsletterSubscribers
ORDER BY subscribedAt DESC
LIMIT 10;
```

## Monitoring

### Resend Dashboard

View email delivery, opens, and clicks in the Resend dashboard:

- Campaign: `newsletter_nurture`
- Email types: `welcome`, `day2`, `day5`, `day8`, `day12`

### Server Logs

The nurture service logs all email sends:

```
[NewsletterNurture] Running nurture sequence...
[NewsletterNurture] Sending Day 2 emails to 5 subscribers
[NewsletterNurture] Day 2 email sent to user@example.com
[NewsletterNurture] Nurture sequence complete: { day2: { sent: 5 }, ... }
```

## Unsubscribe

Users can unsubscribe via:

1. Link in email footer
2. API endpoint: `POST /api/trpc/newsletter.unsubscribe`

Unsubscribed users:

- Status set to "unsubscribed"
- No longer receive nurture emails
- Can resubscribe (reactivates their account)

## Customization

### Modify Email Timing

Edit the date calculations in `newsletterNurtureService.ts`:

```typescript
// Change Day 2 to Day 3
const threeDaysAgo = new Date();
threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
```

### Add New Emails

1. Create template in `newsletterEmailTemplates.ts`
2. Add send function in `newsletterNurtureService.ts`
3. Update `runNurtureSequence()` to include new email
4. Update database schema if needed

### Change Email Content

Edit the HTML templates in `newsletterEmailTemplates.ts`. Each template is a function that returns `{ subject, html }`.

## Production Deployment

### Set Up Cron Job

On your production server:

```bash
# Edit crontab
crontab -e

# Add daily run at 9am
0 9 * * * cd /path/to/harmony-website && /usr/bin/tsx server/run-newsletter-nurture.ts >> /var/log/newsletter-nurture.log 2>&1
```

### Environment Variables

Ensure `RESEND_API_KEY` is set in production environment.

### Monitoring

Set up alerts for:

- Cron job failures
- High email bounce rates
- Unsubscribe spikes

## Metrics to Track

- Subscription rate (signups per blog visitor)
- Email open rates by sequence position
- Click-through rates to demo page
- Conversion rate (subscriber → demo request)
- Unsubscribe rate by email type

## Future Enhancements

- [ ] A/B test subject lines
- [ ] Personalize content based on subscriber source (article topic)
- [ ] Add behavioral triggers (e.g., clicked ROI calculator → send case study)
- [ ] Segment by facility type (group home vs ICF-ID)
- [ ] Add re-engagement campaign for inactive subscribers
