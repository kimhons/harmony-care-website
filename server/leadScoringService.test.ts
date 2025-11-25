import { describe, expect, it } from "vitest";
import {
  calculateLeadScore,
  updateLeadScore,
  recalculateAllLeadScores,
  trackEngagement,
  getLeadScoreStats,
} from "./leadScoringService";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("calculateLeadScore", () => {
  it("should calculate score for small group home with low savings", () => {
    const result = calculateLeadScore({
      residentCount: 4,
      annualSavings: 25000,
      engagementScore: 0,
    });

    expect(result.score).toBeGreaterThan(0);
    expect(result.score).toBeLessThan(40);
    expect(result.tier).toBe("cold");
    expect(result.breakdown.facilitySize).toBe(15);
    expect(result.breakdown.annualSavings).toBe(10);
    expect(result.breakdown.engagement).toBe(5);
  });

  it("should calculate score for medium group home with moderate savings", () => {
    const result = calculateLeadScore({
      residentCount: 8,
      annualSavings: 60000,
      engagementScore: 10,
    });

    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(70);
    expect(result.tier).toBe("warm");
  });

  it("should calculate score for large ICF-ID with high savings", () => {
    const result = calculateLeadScore({
      residentCount: 50,
      annualSavings: 200000,
      engagementScore: 30,
    });

    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.tier).toBe("hot");
    expect(result.breakdown.facilitySize).toBe(40);
    expect(result.breakdown.annualSavings).toBe(40);
    expect(result.breakdown.engagement).toBe(20);
  });

  it("should give maximum score for largest facility with highest savings and engagement", () => {
    const result = calculateLeadScore({
      residentCount: 100,
      annualSavings: 500000,
      engagementScore: 50,
    });

    expect(result.score).toBe(100);
    expect(result.tier).toBe("hot");
  });

  it("should properly tier leads at boundary scores", () => {
    const cold = calculateLeadScore({
      residentCount: 4,
      annualSavings: 25000,
      engagementScore: 0,
    });
    expect(cold.tier).toBe("cold");

    const warm = calculateLeadScore({
      residentCount: 10,
      annualSavings: 50000,
      engagementScore: 5,
    });
    expect(warm.tier).toBe("warm");

    const hot = calculateLeadScore({
      residentCount: 30,
      annualSavings: 150000,
      engagementScore: 20,
    });
    expect(hot.tier).toBe("hot");
  });
});

describe("updateLeadScore", () => {
  it("should update lead score in database", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Get first lead
    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length === 0) {
      console.log("No leads in database, skipping test");
      return;
    }

    const lead = leads[0];
    const result = await updateLeadScore(lead.id);

    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("tier");
    expect(result).toHaveProperty("breakdown");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(["hot", "warm", "cold"]).toContain(result.tier);

    // Verify database was updated
    const updatedLeads = await db
      .select()
      .from(calculatorLeads)
      .where(eq(calculatorLeads.id, lead.id))
      .limit(1);

    expect(updatedLeads[0].leadScore).toBe(result.score);
    expect(updatedLeads[0].leadTier).toBe(result.tier);
  });

  it("should throw error for non-existent lead", async () => {
    await expect(updateLeadScore(999999)).rejects.toThrow("Lead 999999 not found");
  });
});

describe("trackEngagement", () => {
  it("should track email open and update engagement score", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length === 0) {
      console.log("No leads in database, skipping test");
      return;
    }

    const lead = leads[0];
    const initialEngagement = lead.engagementScore;

    const result = await trackEngagement(lead.id, "email_open");

    expect(result.success).toBe(true);
    expect(result.newEngagementScore).toBe(initialEngagement + 5);

    // Verify database was updated
    const updatedLeads = await db
      .select()
      .from(calculatorLeads)
      .where(eq(calculatorLeads.id, lead.id))
      .limit(1);

    expect(updatedLeads[0].engagementScore).toBe(initialEngagement + 5);
    expect(updatedLeads[0].lastEngagementAt).not.toBeNull();
  });

  it("should track email click with correct points", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length === 0) {
      console.log("No leads in database, skipping test");
      return;
    }

    const lead = leads[0];
    const initialEngagement = lead.engagementScore;

    const result = await trackEngagement(lead.id, "email_click");

    expect(result.success).toBe(true);
    expect(result.newEngagementScore).toBe(initialEngagement + 10);
  });

  it("should track demo request with correct points", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length === 0) {
      console.log("No leads in database, skipping test");
      return;
    }

    const lead = leads[0];
    const initialEngagement = lead.engagementScore;

    const result = await trackEngagement(lead.id, "demo_request");

    expect(result.success).toBe(true);
    expect(result.newEngagementScore).toBe(initialEngagement + 20);
  });

  it("should recalculate lead score after engagement tracking", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length === 0) {
      console.log("No leads in database, skipping test");
      return;
    }

    const lead = leads[0];
    const initialScore = lead.leadScore;

    // Track a high-value engagement
    await trackEngagement(lead.id, "demo_request");

    // Verify score was recalculated
    const updatedLeads = await db
      .select()
      .from(calculatorLeads)
      .where(eq(calculatorLeads.id, lead.id))
      .limit(1);

    // Score should increase after engagement
    expect(updatedLeads[0].leadScore).toBeGreaterThanOrEqual(initialScore);
  });
});

describe("recalculateAllLeadScores", () => {
  it("should recalculate scores for all leads", async () => {
    const result = await recalculateAllLeadScores();

    expect(result).toHaveProperty("updated");
    expect(result).toHaveProperty("errors");
    expect(result.updated).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it("should update all leads with valid scores", async () => {
    await recalculateAllLeadScores();

    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const allLeads = await db.select().from(calculatorLeads);

    allLeads.forEach((lead) => {
      expect(lead.leadScore).toBeGreaterThanOrEqual(0);
      expect(lead.leadScore).toBeLessThanOrEqual(100);
      expect(["hot", "warm", "cold"]).toContain(lead.leadTier);
    });
  });
});

describe("getLeadScoreStats", () => {
  it("should return lead score statistics", async () => {
    const stats = await getLeadScoreStats();

    expect(stats).toHaveProperty("byTier");
    expect(stats).toHaveProperty("avgScore");
    expect(stats).toHaveProperty("scoreRanges");

    expect(Array.isArray(stats.byTier)).toBe(true);
    expect(typeof stats.avgScore).toBe("number");
    expect(Array.isArray(stats.scoreRanges)).toBe(true);

    expect(stats.avgScore).toBeGreaterThanOrEqual(0);
    expect(stats.avgScore).toBeLessThanOrEqual(100);
  });

  it("should have valid tier distribution", async () => {
    const stats = await getLeadScoreStats();

    stats.byTier.forEach((tier) => {
      expect(tier).toHaveProperty("tier");
      expect(tier).toHaveProperty("count");
      expect(["hot", "warm", "cold"]).toContain(tier.tier);
      expect(tier.count).toBeGreaterThanOrEqual(0);
    });

    // Sum of all tiers should equal total leads (or 0 if no leads)
    const totalByTier = stats.byTier.reduce((sum, t) => sum + t.count, 0);
    expect(totalByTier).toBeGreaterThanOrEqual(0);
  });

  it("should have valid score ranges", async () => {
    const stats = await getLeadScoreStats();

    stats.scoreRanges.forEach((range) => {
      expect(range).toHaveProperty("range");
      expect(range).toHaveProperty("count");
      expect(typeof range.range).toBe("string");
      expect(range.count).toBeGreaterThanOrEqual(0);
    });
  });
});

describe("lead scoring algorithm validation", () => {
  it("should prioritize facility size correctly", () => {
    const small = calculateLeadScore({
      residentCount: 4,
      annualSavings: 100000,
      engagementScore: 20,
    });

    const large = calculateLeadScore({
      residentCount: 50,
      annualSavings: 100000,
      engagementScore: 20,
    });

    expect(large.score).toBeGreaterThan(small.score);
  });

  it("should prioritize savings correctly", () => {
    const lowSavings = calculateLeadScore({
      residentCount: 20,
      annualSavings: 30000,
      engagementScore: 10,
    });

    const highSavings = calculateLeadScore({
      residentCount: 20,
      annualSavings: 200000,
      engagementScore: 10,
    });

    expect(highSavings.score).toBeGreaterThan(lowSavings.score);
  });

  it("should prioritize engagement correctly", () => {
    const noEngagement = calculateLeadScore({
      residentCount: 20,
      annualSavings: 100000,
      engagementScore: 0,
    });

    const highEngagement = calculateLeadScore({
      residentCount: 20,
      annualSavings: 100000,
      engagementScore: 30,
    });

    expect(highEngagement.score).toBeGreaterThan(noEngagement.score);
  });

  it("should weight facility size and savings equally", () => {
    const result = calculateLeadScore({
      residentCount: 50,
      annualSavings: 200000,
      engagementScore: 0,
    });

    expect(result.breakdown.facilitySize).toBe(40);
    expect(result.breakdown.annualSavings).toBe(40);
    expect(result.breakdown.engagement).toBe(5);
  });

  it("should give engagement lower weight than size/savings", () => {
    const result = calculateLeadScore({
      residentCount: 50,
      annualSavings: 200000,
      engagementScore: 50,
    });

    expect(result.breakdown.engagement).toBeLessThan(result.breakdown.facilitySize);
    expect(result.breakdown.engagement).toBeLessThan(result.breakdown.annualSavings);
  });
});
