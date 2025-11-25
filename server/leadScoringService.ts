import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

/**
 * Lead Scoring System
 * Scores leads from 0-100 based on:
 * - Facility size (resident count)
 * - Projected annual savings
 * - Engagement (email opens, clicks, demo requests)
 * 
 * Tiers:
 * - Hot: 70-100 (high priority, immediate follow-up)
 * - Warm: 40-69 (medium priority, nurture sequence)
 * - Cold: 0-39 (low priority, long-term nurture)
 */

interface LeadScoreWeights {
  facilitySize: number; // 0-40 points
  annualSavings: number; // 0-40 points
  engagement: number; // 0-20 points
}

const SCORE_WEIGHTS: LeadScoreWeights = {
  facilitySize: 40,
  annualSavings: 40,
  engagement: 20,
};

/**
 * Calculate facility size score (0-40 points)
 * Based on resident count - larger facilities = higher scores
 */
function calculateFacilitySizeScore(residentCount: number): number {
  if (residentCount >= 50) return 40; // Large ICF-ID
  if (residentCount >= 30) return 35; // Medium ICF-ID
  if (residentCount >= 20) return 30; // Small ICF-ID
  if (residentCount >= 10) return 25; // Large group home
  if (residentCount >= 6) return 20; // Medium group home
  if (residentCount >= 4) return 15; // Small group home
  return 10; // Very small facility
}

/**
 * Calculate savings score (0-40 points)
 * Based on projected annual savings - higher savings = higher scores
 */
function calculateSavingsScore(annualSavings: number): number {
  if (annualSavings >= 200000) return 40; // $200K+ savings
  if (annualSavings >= 150000) return 35; // $150K-200K
  if (annualSavings >= 100000) return 30; // $100K-150K
  if (annualSavings >= 75000) return 25; // $75K-100K
  if (annualSavings >= 50000) return 20; // $50K-75K
  if (annualSavings >= 30000) return 15; // $30K-50K
  return 10; // Under $30K
}

/**
 * Calculate engagement score (0-20 points)
 * Based on email interactions and demo requests
 */
function calculateEngagementScore(engagementScore: number): number {
  // engagementScore is cumulative:
  // +5 for each email open
  // +10 for each email click
  // +15 for each resource download
  // +20 for demo request
  
  if (engagementScore >= 30) return 20; // Highly engaged (demo + clicks)
  if (engagementScore >= 20) return 18; // Very engaged (demo or multiple clicks)
  if (engagementScore >= 15) return 15; // Engaged (multiple opens + click)
  if (engagementScore >= 10) return 12; // Moderately engaged (clicks)
  if (engagementScore >= 5) return 8; // Some engagement (opens)
  return 5; // Minimal engagement
}

/**
 * Determine lead tier based on total score
 */
function getLeadTier(totalScore: number): "hot" | "warm" | "cold" {
  if (totalScore >= 70) return "hot";
  if (totalScore >= 40) return "warm";
  return "cold";
}

/**
 * Calculate lead score for a single lead
 */
export function calculateLeadScore(lead: {
  residentCount: number;
  annualSavings: number;
  engagementScore: number;
}): { score: number; tier: "hot" | "warm" | "cold"; breakdown: LeadScoreWeights } {
  const facilitySizeScore = calculateFacilitySizeScore(lead.residentCount);
  const savingsScore = calculateSavingsScore(lead.annualSavings);
  const engagementScore = calculateEngagementScore(lead.engagementScore);

  const totalScore = facilitySizeScore + savingsScore + engagementScore;
  const tier = getLeadTier(totalScore);

  return {
    score: totalScore,
    tier,
    breakdown: {
      facilitySize: facilitySizeScore,
      annualSavings: savingsScore,
      engagement: engagementScore,
    },
  };
}

/**
 * Update lead score for a specific lead
 */
export async function updateLeadScore(leadId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get lead data
  const leads = await db
    .select()
    .from(calculatorLeads)
    .where(eq(calculatorLeads.id, leadId))
    .limit(1);

  if (leads.length === 0) {
    throw new Error(`Lead ${leadId} not found`);
  }

  const lead = leads[0];
  const scoreResult = calculateLeadScore({
    residentCount: lead.residentCount,
    annualSavings: lead.annualSavings,
    engagementScore: lead.engagementScore,
  });

  // Update database
  await db
    .update(calculatorLeads)
    .set({
      leadScore: scoreResult.score,
      leadTier: scoreResult.tier,
    })
    .where(eq(calculatorLeads.id, leadId));

  console.log(`[LeadScoring] Updated lead ${leadId}: ${scoreResult.score} points (${scoreResult.tier})`);
  return scoreResult;
}

/**
 * Recalculate scores for all leads
 * Should be run periodically (daily or weekly)
 */
export async function recalculateAllLeadScores() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const allLeads = await db.select().from(calculatorLeads);

  let updated = 0;
  const errors: string[] = [];

  for (const lead of allLeads) {
    try {
      const scoreResult = calculateLeadScore({
        residentCount: lead.residentCount,
        annualSavings: lead.annualSavings,
        engagementScore: lead.engagementScore,
      });

      await db
        .update(calculatorLeads)
        .set({
          leadScore: scoreResult.score,
          leadTier: scoreResult.tier,
        })
        .where(eq(calculatorLeads.id, lead.id));

      updated++;
    } catch (error) {
      errors.push(
        `Failed to update lead ${lead.id}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  console.log(`[LeadScoring] Recalculated ${updated} lead scores`);
  if (errors.length > 0) {
    console.error(`[LeadScoring] Errors:`, errors);
  }

  return { updated, errors };
}

/**
 * Track engagement event and update lead score
 */
export async function trackEngagement(
  leadId: number,
  eventType: "email_open" | "email_click" | "demo_request" | "resource_download"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Get current lead
  const leads = await db
    .select()
    .from(calculatorLeads)
    .where(eq(calculatorLeads.id, leadId))
    .limit(1);

  if (leads.length === 0) {
    throw new Error(`Lead ${leadId} not found`);
  }

  const lead = leads[0];

  // Calculate engagement points
  let points = 0;
  switch (eventType) {
    case "email_open":
      points = 5;
      break;
    case "email_click":
      points = 10;
      break;
    case "resource_download":
      points = 15;
      break;
    case "demo_request":
      points = 20;
      break;
  }

  const newEngagementScore = lead.engagementScore + points;

  // Update engagement score and last engagement timestamp
  await db
    .update(calculatorLeads)
    .set({
      engagementScore: newEngagementScore,
      lastEngagementAt: new Date(),
    })
    .where(eq(calculatorLeads.id, leadId));

  // Recalculate lead score with new engagement
  await updateLeadScore(leadId);

  console.log(`[LeadScoring] Tracked ${eventType} for lead ${leadId} (+${points} points)`);
  return { success: true, newEngagementScore };
}

/**
 * Get lead score distribution statistics
 */
export async function getLeadScoreStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Count by tier
  const byTier = await db
    .select({
      tier: calculatorLeads.leadTier,
      count: sql<number>`count(*)`,
    })
    .from(calculatorLeads)
    .groupBy(calculatorLeads.leadTier);

  // Average score
  const avgScoreResult = await db
    .select({
      avgScore: sql<number>`AVG(${calculatorLeads.leadScore})`,
    })
    .from(calculatorLeads);

  const avgScore = Math.round(Number(avgScoreResult[0]?.avgScore || 0));

  // Score ranges
  const scoreRanges = await db
    .select({
      range: sql<string>`
        CASE
          WHEN leadScore >= 80 THEN '80-100'
          WHEN leadScore >= 60 THEN '60-79'
          WHEN leadScore >= 40 THEN '40-59'
          WHEN leadScore >= 20 THEN '20-39'
          ELSE '0-19'
        END as score_range
      `,
      count: sql<number>`count(*)`,
    })
    .from(calculatorLeads)
    .groupBy(sql`score_range`);

  return {
    byTier: byTier.map((t) => ({ tier: t.tier, count: Number(t.count) })),
    avgScore,
    scoreRanges: scoreRanges.map((r) => ({
      range: r.range,
      count: Number(r.count),
    })),
  };
}
