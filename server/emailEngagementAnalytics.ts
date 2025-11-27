/**
 * Email Engagement Analytics Service
 * Provides metrics and insights for newsletter email performance
 */

import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { sql, eq, and, gte, lte, isNotNull } from "drizzle-orm";

export interface EmailEngagementMetrics {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribed: number;

  // Overall engagement
  totalEmailsSent: number;
  totalOpens: number;
  totalClicks: number;
  overallOpenRate: number;
  overallClickRate: number;
  clickToOpenRate: number;

  // Nurture sequence metrics
  nurtureInProgress: number;
  nurtureCompleted: number;
  completionRate: number;

  // By email type
  emailTypeBreakdown: Array<{
    emailType: string;
    sent: number;
    opens: number;
    clicks: number;
    openRate: number;
    clickRate: number;
  }>;

  // Engagement over time (last 30 days)
  engagementTimeline: Array<{
    date: string;
    opens: number;
    clicks: number;
    newSubscribers: number;
  }>;

  // Top engaged subscribers
  topEngagedSubscribers: Array<{
    email: string;
    name: string | null;
    opens: number;
    clicks: number;
    lastEngagement: Date | null;
    nurtureStage: string | null;
  }>;
}

/**
 * Get comprehensive email engagement metrics
 */
export async function getEmailEngagementMetrics(
  startDate?: Date,
  endDate?: Date
): Promise<EmailEngagementMetrics> {
  // Build date filter
  const dateFilter =
    startDate && endDate
      ? and(
          gte(newsletterSubscribers.subscribedAt, startDate),
          lte(newsletterSubscribers.subscribedAt, endDate)
        )
      : undefined;

  // Get overall subscriber stats
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const subscriberStats = await db
    .select({
      total: sql<number>`COUNT(*)`,
      active: sql<number>`SUM(CASE WHEN ${newsletterSubscribers.status} = 'active' THEN 1 ELSE 0 END)`,
      unsubscribed: sql<number>`SUM(CASE WHEN ${newsletterSubscribers.status} = 'unsubscribed' THEN 1 ELSE 0 END)`,
      nurtureInProgress: sql<number>`SUM(CASE WHEN ${newsletterSubscribers.nurtureCompleted} = 0 THEN 1 ELSE 0 END)`,
      nurtureCompleted: sql<number>`SUM(CASE WHEN ${newsletterSubscribers.nurtureCompleted} = 1 THEN 1 ELSE 0 END)`,
      totalOpens: sql<number>`SUM(${newsletterSubscribers.emailOpens})`,
      totalClicks: sql<number>`SUM(${newsletterSubscribers.emailClicks})`,
    })
    .from(newsletterSubscribers)
    .where(dateFilter);

  const stats = subscriberStats[0];
  const totalSubscribers = Number(stats.total) || 0;
  const activeSubscribers = Number(stats.active) || 0;
  const unsubscribed = Number(stats.unsubscribed) || 0;
  const nurtureInProgress = Number(stats.nurtureInProgress) || 0;
  const nurtureCompleted = Number(stats.nurtureCompleted) || 0;
  const totalOpens = Number(stats.totalOpens) || 0;
  const totalClicks = Number(stats.totalClicks) || 0;

  // Calculate total emails sent (estimate based on nurture sequence)
  // Each subscriber gets: welcome (1) + day2 (1) + day5 (1) + day8 (1) + day12 (1) = up to 5 emails
  const subscribersWithNurture = await db
    .select({
      email: newsletterSubscribers.email,
      nurtureSequence: newsletterSubscribers.nurtureSequence,
    })
    .from(newsletterSubscribers)
    .where(isNotNull(newsletterSubscribers.nurtureSequence));

  let totalEmailsSent = 0;
  const emailTypeCounts: Record<
    string,
    { sent: number; opens: number; clicks: number }
  > = {
    welcome: { sent: 0, opens: 0, clicks: 0 },
    day2: { sent: 0, opens: 0, clicks: 0 },
    day5: { sent: 0, opens: 0, clicks: 0 },
    day8: { sent: 0, opens: 0, clicks: 0 },
    day12: { sent: 0, opens: 0, clicks: 0 },
  };

  for (const subscriber of subscribersWithNurture) {
    if (subscriber.nurtureSequence) {
      try {
        const sequence = JSON.parse(subscriber.nurtureSequence);
        totalEmailsSent += sequence.length;

        // Count by email type
        for (const email of sequence) {
          if (emailTypeCounts[email.type]) {
            emailTypeCounts[email.type].sent++;
          }
        }
      } catch (e) {
        // Invalid JSON, skip
      }
    }
  }

  // Distribute opens/clicks proportionally across email types
  // This is an approximation since we don't track per-email engagement yet
  const emailTypeBreakdown = Object.entries(emailTypeCounts).map(
    ([type, counts]) => {
      const proportion =
        totalEmailsSent > 0 ? counts.sent / totalEmailsSent : 0;
      const estimatedOpens = Math.round(totalOpens * proportion);
      const estimatedClicks = Math.round(totalClicks * proportion);

      return {
        emailType: type,
        sent: counts.sent,
        opens: estimatedOpens,
        clicks: estimatedClicks,
        openRate: counts.sent > 0 ? (estimatedOpens / counts.sent) * 100 : 0,
        clickRate: counts.sent > 0 ? (estimatedClicks / counts.sent) * 100 : 0,
      };
    }
  );

  // Calculate overall rates
  const overallOpenRate =
    totalEmailsSent > 0 ? (totalOpens / totalEmailsSent) * 100 : 0;
  const overallClickRate =
    totalEmailsSent > 0 ? (totalClicks / totalEmailsSent) * 100 : 0;
  const clickToOpenRate = totalOpens > 0 ? (totalClicks / totalOpens) * 100 : 0;
  const completionRate =
    totalSubscribers > 0 ? (nurtureCompleted / totalSubscribers) * 100 : 0;

  // Get engagement timeline (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const timeline = await db
    .select({
      date: sql<string>`DATE(${newsletterSubscribers.subscribedAt})`.as("date"),
      newSubscribers: sql<number>`COUNT(*)`.as("newSubscribers"),
    })
    .from(newsletterSubscribers)
    .where(gte(newsletterSubscribers.subscribedAt, thirtyDaysAgo))
    .groupBy(sql`date`)
    .orderBy(sql`date`);

  const engagementTimeline = timeline.map((row: any) => ({
    date: row.date,
    opens: 0, // Would need per-day tracking
    clicks: 0, // Would need per-day tracking
    newSubscribers: Number(row.newSubscribers),
  }));

  // Get top engaged subscribers
  const topEngaged = await db
    .select({
      email: newsletterSubscribers.email,
      name: newsletterSubscribers.name,
      opens: newsletterSubscribers.emailOpens,
      clicks: newsletterSubscribers.emailClicks,
      lastEngagement: newsletterSubscribers.lastEngagementAt,
      nurtureStage: newsletterSubscribers.lastNurtureEmail,
    })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.status, "active"))
    .orderBy(
      sql`${newsletterSubscribers.emailOpens} + ${newsletterSubscribers.emailClicks} DESC`
    )
    .limit(10);

  const topEngagedSubscribers = topEngaged.map((sub: any) => ({
    email: sub.email,
    name: sub.name,
    opens: sub.opens,
    clicks: sub.clicks,
    lastEngagement: sub.lastEngagement,
    nurtureStage: sub.nurtureStage,
  }));

  return {
    totalSubscribers,
    activeSubscribers,
    unsubscribed,
    totalEmailsSent,
    totalOpens,
    totalClicks,
    overallOpenRate,
    overallClickRate,
    clickToOpenRate,
    nurtureInProgress,
    nurtureCompleted,
    completionRate,
    emailTypeBreakdown,
    engagementTimeline,
    topEngagedSubscribers,
  };
}

/**
 * Get email performance by source (blog article)
 */
export async function getEmailPerformanceBySource() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const results = await db
    .select({
      source: newsletterSubscribers.source,
      subscribers: sql<number>`COUNT(*)`,
      totalOpens: sql<number>`SUM(${newsletterSubscribers.emailOpens})`,
      totalClicks: sql<number>`SUM(${newsletterSubscribers.emailClicks})`,
      avgOpens: sql<number>`AVG(${newsletterSubscribers.emailOpens})`,
      avgClicks: sql<number>`AVG(${newsletterSubscribers.emailClicks})`,
    })
    .from(newsletterSubscribers)
    .groupBy(newsletterSubscribers.source)
    .orderBy(sql`COUNT(*) DESC`);

  return results.map((row: any) => ({
    source: row.source,
    subscribers: Number(row.subscribers),
    totalOpens: Number(row.totalOpens),
    totalClicks: Number(row.totalClicks),
    avgOpens: Number(row.avgOpens),
    avgClicks: Number(row.avgClicks),
    openRate:
      row.subscribers > 0
        ? (Number(row.totalOpens) / Number(row.subscribers)) * 100
        : 0,
    clickRate:
      row.subscribers > 0
        ? (Number(row.totalClicks) / Number(row.subscribers)) * 100
        : 0,
  }));
}
