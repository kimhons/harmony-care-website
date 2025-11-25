# Email Drip Campaign Setup

## Overview

The HarmonyCare email drip campaign automatically sends scheduled emails to founding members based on their signup date. The campaign includes:

1. **Week 1 Update** (7 days after signup) - Journey begins, team introduction
2. **Week 2 Feature Spotlight** (14 days) - DocuBot & Guardian AI deep dive
3. **Week 3 Compliance** (21 days) - Security, HIPAA, regulations
4. **Month 1 Progress** (30 days) - Development milestones, roadmap updates
5. **Month 2 Beta Invite** (60 days) - Beta access credentials and onboarding

## How It Works

### Database Tracking

Each signup has campaign tracking fields:
- `emailsSent`: JSON array of sent emails with timestamps
- `lastEmailSent`: Timestamp of most recent email
- `emailOptOut`: 0 = opted in, 1 = opted out
- `campaignStatus`: "active", "paused", or "completed"

### Scheduling Logic

The `runEmailCampaign()` function:
1. Checks all signups in the database
2. Calculates which emails are due based on signup date
3. Filters out signups that already received each email
4. Sends emails and marks them as sent
5. Logs all activity for monitoring

## Running the Campaign

### Option 1: Manual Execution (Testing)

```bash
# Run the campaign once
cd /home/ubuntu/harmony-website
pnpm tsx server/run-campaign.ts
```

### Option 2: Cron Job (Production)

Add to your server's crontab to run daily at 9am:

```bash
0 9 * * * cd /home/ubuntu/harmony-website && pnpm tsx server/run-campaign.ts >> /var/log/harmony-campaign.log 2>&1
```

### Option 3: Vercel Cron (Recommended for Vercel Hosting)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/email-campaign",
    "schedule": "0 9 * * *"
  }]
}
```

Then create `/server/routes/cron.ts`:

```typescript
import { runEmailCampaign } from '../emailCampaign';

export async function handleCronEmailCampaign(req: any, res: any) {
  // Verify cron secret to prevent unauthorized access
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    await runEmailCampaign();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Cron] Email campaign failed:', error);
    res.status(500).json({ error: 'Campaign failed' });
  }
}
```

## Monitoring

### Check Campaign Statistics

```typescript
import { getCampaignStats } from './server/emailCampaign';

const stats = await getCampaignStats();
console.log(stats);
// {
//   totalSignups: 173,
//   activeInCampaign: 165,
//   optedOut: 8,
//   emailsSentByType: {
//     week1_update: 150,
//     week2_feature_spotlight: 130,
//     week3_compliance: 110,
//     month1_progress: 85,
//     month2_beta_invite: 40
//   }
// }
```

### Logs

All campaign activity is logged with `[Campaign]` prefix:
- `[Campaign] Starting email campaign run`
- `[Campaign] Processing week1_update (7 days after signup)`
- `[Campaign] Found 15 signups due for week1_update`
- `[Campaign] Sent week1_update to user@example.com`
- `[Campaign] Email campaign run complete`

## Opt-Out Handling

Users can opt out by:
1. Clicking "Unsubscribe" link in any email (you need to add this link)
2. Calling the opt-out function:

```typescript
import { optOutFromCampaign } from './server/emailCampaign';

await optOutFromCampaign('user@example.com');
```

## Testing

### Test with a Single Signup

```typescript
// Create a test signup with a past signup date
import { getDb } from './server/db';
import { signups } from './drizzle/schema';

const db = await getDb();
if (db) {
  await db.insert(signups).values({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    facilityName: 'Test Facility',
    facilityType: 'Group Home',
    residentCount: 6,
    tier: 'Starter',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
  });
}

// Run campaign - should send week1_update email
await runEmailCampaign();
```

## Customization

### Add More Emails

1. Create template function in `server/emailTemplates.ts`
2. Add to `CAMPAIGN_SCHEDULE` in `server/emailCampaign.ts`:

```typescript
{
  type: "month3_launch_countdown",
  daysAfterSignup: 90,
  templateFunction: emailTemplates.month3LaunchCountdown,
}
```

### Change Schedule

Edit `daysAfterSignup` values in `CAMPAIGN_SCHEDULE`:

```typescript
const CAMPAIGN_SCHEDULE: EmailSchedule[] = [
  { type: "week1_update", daysAfterSignup: 3 }, // Send after 3 days instead of 7
  // ...
];
```

### Pause Campaign for Specific Signup

```typescript
import { getDb } from './server/db';
import { signups } from './drizzle/schema';
import { eq } from 'drizzle-orm';

const db = await getDb();
if (db) {
  await db.update(signups)
    .set({ campaignStatus: 'paused' })
    .where(eq(signups.email, 'user@example.com'));
}
```

## Troubleshooting

### Emails Not Sending

1. Check Resend API key: `echo $RESEND_API_KEY`
2. Check database connection: `pnpm db:push`
3. Check logs for errors
4. Verify signup has `campaignStatus: "active"` and `emailOptOut: 0`

### Duplicate Emails

The system prevents duplicates by checking `emailsSent` field. If a signup receives duplicate emails:
1. Check database for corrupted `emailsSent` JSON
2. Verify campaign is not running multiple times simultaneously

### Wrong Email Timing

1. Check signup `createdAt` timestamp
2. Verify `daysAfterSignup` values in `CAMPAIGN_SCHEDULE`
3. Account for timezone differences (all times are UTC)

## Production Checklist

- [ ] Verify Resend API key is set in production environment
- [ ] Set up cron job or Vercel Cron
- [ ] Add unsubscribe links to all email templates
- [ ] Monitor campaign logs for first week
- [ ] Set up alerts for campaign failures
- [ ] Test opt-out flow
- [ ] Verify email deliverability (check spam folders)
- [ ] Set up email analytics tracking (opens, clicks)
