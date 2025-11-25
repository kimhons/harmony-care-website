/**
 * Milestone Detection and Notification Service
 * Automatically detects when users achieve milestones and creates notifications
 */

import { eq, and, desc } from "drizzle-orm";
import { getDb } from "./db";
import { milestoneNotifications, signups, referrals } from "../drizzle/schema";
import type { InsertMilestoneNotification } from "../drizzle/schema";
import {
  checkReferralMilestones,
  checkTierMilestones,
  checkLeaderboardMilestones,
  type Milestone,
} from "../shared/milestones";
import { REWARD_TIERS } from "../shared/referralRewards";
// import { sendMilestoneEmail } from "./referralEmails"; // TODO: Add milestone email template

/**
 * Check if a milestone notification already exists for a user
 */
async function milestoneExists(signupId: number, milestoneId: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const existing = await db
    .select()
    .from(milestoneNotifications)
    .where(
      and(
        eq(milestoneNotifications.signupId, signupId),
        eq(milestoneNotifications.milestoneId, milestoneId)
      )
    )
    .limit(1);

  return existing.length > 0;
}

/**
 * Create a milestone notification in the database
 */
async function createMilestoneNotification(
  signupId: number,
  milestone: Milestone
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Milestone] Cannot create notification: database not available");
    return;
  }

  // Check if milestone already exists
  const exists = await milestoneExists(signupId, milestone.id);
  if (exists) {
    return; // Don't create duplicate notifications
  }

  const notification: InsertMilestoneNotification = {
    signupId,
    milestoneId: milestone.id,
    milestoneType: milestone.type,
    title: milestone.title,
    description: milestone.celebrationMessage,
    badgePath: milestone.badge,
    isViewed: 0,
    isShared: 0,
  };

  await db.insert(milestoneNotifications).values(notification);
  
  console.log(`[Milestone] Created notification for signup ${signupId}: ${milestone.title}`);
}

/**
 * Get the current tier name for a referral count
 */
function getTierForReferralCount(referralCount: number): string {
  for (let i = REWARD_TIERS.length - 1; i >= 0; i--) {
    if (referralCount >= REWARD_TIERS[i].referralsRequired) {
      return REWARD_TIERS[i].name;
    }
  }
  return "None";
}

/**
 * Get referral count for a signup
 */
async function getReferralCount(signupId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const referralList = await db
    .select()
    .from(referrals)
    .where(eq(referrals.referrerSignupId, signupId));

  return referralList.length;
}

/**
 * Get leaderboard position for a signup
 */
async function getLeaderboardPosition(signupId: number): Promise<number | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  // Get all signups with their referral counts
  const allSignups = await db.select().from(signups);
  
  const signupsWithCounts = await Promise.all(
    allSignups.map(async (signup) => ({
      id: signup.id,
      referralCount: await getReferralCount(signup.id),
    }))
  );

  // Sort by referral count descending
  signupsWithCounts.sort((a, b) => b.referralCount - a.referralCount);

  // Find position (1-indexed)
  const position = signupsWithCounts.findIndex((s) => s.id === signupId) + 1;
  
  return position > 0 ? position : undefined;
}

/**
 * Check and create milestone notifications for a signup after a referral
 */
export async function checkAndCreateMilestones(signupId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Milestone] Cannot check milestones: database not available");
    return;
  }

  try {
    // Get signup details
    const signup = await db
      .select()
      .from(signups)
      .where(eq(signups.id, signupId))
      .limit(1);

    if (signup.length === 0) {
      console.warn(`[Milestone] Signup ${signupId} not found`);
      return;
    }

    const signupData = signup[0];
    const referralCount = await getReferralCount(signupId);
    const tierName = getTierForReferralCount(referralCount);
    const leaderboardPosition = await getLeaderboardPosition(signupId);

    // Check referral count milestones
    const referralMilestones = checkReferralMilestones(referralCount);
    for (const milestone of referralMilestones) {
      await createMilestoneNotification(signupId, milestone);
      
      // TODO: Send milestone email when email template is ready
    }

    // Check tier upgrade milestones
    const tierMilestones = checkTierMilestones(tierName, referralCount);
    for (const milestone of tierMilestones) {
      await createMilestoneNotification(signupId, milestone);
      
      // TODO: Send milestone email when email template is ready
    }

    // Check leaderboard milestones
    if (leaderboardPosition !== undefined) {
      const leaderboardMilestones = checkLeaderboardMilestones(leaderboardPosition);
      for (const milestone of leaderboardMilestones) {
        await createMilestoneNotification(signupId, milestone);
        
        // TODO: Send milestone email when email template is ready
      }
    }
  } catch (error) {
    console.error("[Milestone] Error checking milestones:", error);
  }
}

/**
 * Get unviewed milestone notifications for a signup
 */
export async function getUnviewedMilestones(signupId: number) {
  const db = await getDb();
  if (!db) return [];

  const notifications = await db
    .select()
    .from(milestoneNotifications)
    .where(
      and(
        eq(milestoneNotifications.signupId, signupId),
        eq(milestoneNotifications.isViewed, 0)
      )
    )
    .orderBy(desc(milestoneNotifications.createdAt));

  return notifications;
}

/**
 * Mark milestone notification as viewed
 */
export async function markMilestoneAsViewed(notificationId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(milestoneNotifications)
    .set({ isViewed: 1 })
    .where(eq(milestoneNotifications.id, notificationId));
}

/**
 * Mark milestone notification as shared
 */
export async function markMilestoneAsShared(notificationId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db
    .update(milestoneNotifications)
    .set({ isShared: 1 })
    .where(eq(milestoneNotifications.id, notificationId));
}

/**
 * Get all milestone notifications for a signup
 */
export async function getAllMilestones(signupId: number) {
  const db = await getDb();
  if (!db) return [];

  const notifications = await db
    .select()
    .from(milestoneNotifications)
    .where(eq(milestoneNotifications.signupId, signupId))
    .orderBy(desc(milestoneNotifications.createdAt));

  return notifications;
}
