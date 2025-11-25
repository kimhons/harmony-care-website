/**
 * Email Drip Campaign Scheduler
 * Automatically sends scheduled emails to founding members based on signup date
 */

import { getDb } from "./db";
import { signups, Signup } from "../drizzle/schema";
import { sendEmail } from "./email";
import { emailTemplates } from "./emailTemplates";
import { eq, and, isNull, or, lt } from "drizzle-orm";

interface EmailSchedule {
  type: string;
  daysAfterSignup: number;
  templateFunction: (params: any) => { subject: string; html: string };
}

/**
 * Email campaign schedule
 * Each email is triggered X days after signup
 */
const CAMPAIGN_SCHEDULE: EmailSchedule[] = [
  // Week 1 - already sent as confirmation email at signup (day 0)
  {
    type: "week1_update",
    daysAfterSignup: 7,
    templateFunction: emailTemplates.week1Update,
  },
  {
    type: "week2_feature_spotlight",
    daysAfterSignup: 14,
    templateFunction: emailTemplates.week2FeatureSpotlight,
  },
  {
    type: "week3_compliance",
    daysAfterSignup: 21,
    templateFunction: emailTemplates.week3Compliance,
  },
  {
    type: "month1_progress",
    daysAfterSignup: 30,
    templateFunction: emailTemplates.month1Progress,
  },
  {
    type: "month2_beta_invite",
    daysAfterSignup: 60,
    templateFunction: emailTemplates.month2BetaInvite,
  },
  // Add more as templates are created
];

/**
 * Get signups that are due for a specific email
 */
async function getSignupsDueForEmail(emailType: string, daysAfterSignup: number) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - daysAfterSignup);
  
  // Get signups created around the target date that haven't received this email yet
  const db = await getDb();
  if (!db) return [];
  
  const signupsToEmail = await db
    .select()
    .from(signups)
    .where(
      and(
        eq(signups.campaignStatus, "active"),
        eq(signups.emailOptOut, 0),
        // Signup was created daysAfterSignup days ago (with 1-day window)
        lt(signups.createdAt, new Date(targetDate.getTime() + 24 * 60 * 60 * 1000)),
      )
    )
    .execute();
  
  // Filter out signups that already received this email
  return signupsToEmail.filter((signup: Signup) => {
    if (!signup.emailsSent) return true;
    try {
      const sentEmails = JSON.parse(signup.emailsSent);
      return !sentEmails.some((e: any) => e.type === emailType);
    } catch {
      return true;
    }
  });
}

/**
 * Mark email as sent for a signup
 */
async function markEmailAsSent(signupId: number, emailType: string) {
  const db = await getDb();
  if (!db) return;
  
  const signup = await db
    .select()
    .from(signups)
    .where(eq(signups.id, signupId))
    .limit(1)
    .execute()
    .then((rows: Signup[]) => rows[0]);
  
  if (!signup) return;
  
  let emailsSent: any[] = [];
  try {
    emailsSent = signup.emailsSent ? JSON.parse(signup.emailsSent) : [];
  } catch {
    emailsSent = [];
  }
  
  emailsSent.push({
    type: emailType,
    sentAt: new Date().toISOString(),
  });
  
  const dbUpdate = await getDb();
  if (!dbUpdate) return;
  
  await dbUpdate
    .update(signups)
    .set({
      emailsSent: JSON.stringify(emailsSent),
      lastEmailSent: new Date(),
    })
    .where(eq(signups.id, signupId))
    .execute();
}

/**
 * Process a single email in the campaign
 */
async function processEmail(schedule: EmailSchedule) {
  console.log(`[Campaign] Processing ${schedule.type} (${schedule.daysAfterSignup} days after signup)`);
  
  const signupsDue = await getSignupsDueForEmail(schedule.type, schedule.daysAfterSignup);
  
  console.log(`[Campaign] Found ${signupsDue.length} signups due for ${schedule.type}`);
  
  for (const signup of signupsDue) {
    try {
      const emailContent = schedule.templateFunction({
        firstName: signup.firstName,
        lastName: signup.lastName,
        facilityName: signup.facilityName,
        tier: signup.tier,
        signupDate: signup.createdAt.toISOString(),
      });
      
      await sendEmail({
        to: signup.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
      
      await markEmailAsSent(signup.id, schedule.type);
      
      console.log(`[Campaign] Sent ${schedule.type} to ${signup.email}`);
    } catch (error) {
      console.error(`[Campaign] Failed to send ${schedule.type} to ${signup.email}:`, error);
    }
  }
}

/**
 * Run the email campaign scheduler
 * This should be called periodically (e.g., daily via cron job)
 */
export async function runEmailCampaign() {
  console.log("[Campaign] Starting email campaign run");
  
  for (const schedule of CAMPAIGN_SCHEDULE) {
    await processEmail(schedule);
  }
  
  console.log("[Campaign] Email campaign run complete");
}

/**
 * Opt out a signup from the email campaign
 */
export async function optOutFromCampaign(email: string) {
  const db = await getDb();
  if (!db) return;
  
  await db
    .update(signups)
    .set({
      emailOptOut: 1,
      campaignStatus: "paused",
    })
    .where(eq(signups.email, email))
    .execute();
  
  console.log(`[Campaign] Opted out ${email} from campaign`);
}

/**
 * Get campaign statistics
 */
export async function getCampaignStats() {
  const db = await getDb();
  if (!db) return { totalSignups: 0, activeInCampaign: 0, optedOut: 0, emailsSentByType: {} };
  
  const allSignups = await db.select().from(signups).execute();
  
  const stats = {
    totalSignups: allSignups.length,
    activeInCampaign: allSignups.filter((s: Signup) => s.campaignStatus === "active" && s.emailOptOut === 0).length,
    optedOut: allSignups.filter((s: Signup) => s.emailOptOut === 1).length,
    emailsSentByType: {} as Record<string, number>,
  };
  
  // Count emails sent by type
  for (const signup of allSignups) {
    if (!signup.emailsSent) continue;
    try {
      const sentEmails = JSON.parse(signup.emailsSent);
      for (const email of sentEmails) {
        stats.emailsSentByType[email.type] = (stats.emailsSentByType[email.type] || 0) + 1;
      }
    } catch {
      // Skip invalid JSON
    }
  }
  
  return stats;
}
