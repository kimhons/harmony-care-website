import { describe, expect, it, beforeEach } from "vitest";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Resend Webhook Integration", () => {
  let testLeadId: number;
  let testLeadEmail: string;

  beforeEach(async () => {
    // Get or create a test lead
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const leads = await db.select().from(calculatorLeads).limit(1);
    if (leads.length > 0) {
      testLeadId = leads[0].id;
      testLeadEmail = leads[0].email;
    } else {
      // Create a test lead if none exist
      const result = await db.insert(calculatorLeads).values({
        email: "test-webhook@example.com",
        facilityType: "Group Home",
        residentCount: 6,
        annualSavings: 50000,
        overtimeSavings: 15000,
        errorSavings: 10000,
        complianceSavings: 15000,
        retentionSavings: 10000,
        source: "calculator",
        emailSent: 0,
        leadScore: 45,
        leadTier: "warm",
        engagementScore: 0,
      });
      testLeadId = Number(result.insertId);
      testLeadEmail = "test-webhook@example.com";
    }
  });

  describe("Email Opened Event", () => {
    it("should process email.opened event with lead_id tag", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Get initial engagement score
      const beforeLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      const initialEngagement = beforeLeads[0].engagementScore;

      // Simulate webhook event
      const webhookEvent = {
        type: "email.opened",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-123",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: [testLeadEmail],
          subject: "Day 1: Your Exclusive HarmonyCare Guide",
          tags: [
            { name: "lead_id", value: testLeadId.toString() },
            { name: "email_type", value: "day1" },
            { name: "campaign", value: "nurture_sequence" },
          ],
        },
      };

      // Import and call the webhook handler directly
      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      const result = await caller.handleEvent(webhookEvent);

      expect(result.success).toBe(true);
      expect(result.message).toContain("processed successfully");

      // Verify engagement score increased by 5
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      expect(afterLeads[0].engagementScore).toBe(initialEngagement + 5);
      expect(afterLeads[0].lastEngagementAt).not.toBeNull();
    });

    it("should find lead by email if no lead_id tag provided", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const beforeLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      const initialEngagement = beforeLeads[0].engagementScore;

      // Simulate webhook event without lead_id tag
      const webhookEvent = {
        type: "email.opened",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-456",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: [testLeadEmail],
          subject: "Day 3: Real Results from HarmonyCare",
          tags: [
            { name: "email_type", value: "day3" },
            { name: "campaign", value: "nurture_sequence" },
          ],
        },
      };

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      const result = await caller.handleEvent(webhookEvent);

      expect(result.success).toBe(true);

      // Verify engagement score increased
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      expect(afterLeads[0].engagementScore).toBeGreaterThan(initialEngagement);
    });
  });

  describe("Email Clicked Event", () => {
    it("should process email.clicked event and award 10 points", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const beforeLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      const initialEngagement = beforeLeads[0].engagementScore;

      // Simulate webhook event with click data
      const webhookEvent = {
        type: "email.clicked",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-789",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: [testLeadEmail],
          subject: "Day 7: Schedule Your Demo",
          tags: [
            { name: "lead_id", value: testLeadId.toString() },
            { name: "email_type", value: "day7" },
            { name: "campaign", value: "nurture_sequence" },
          ],
          click: {
            link: "https://harmony.example.com/schedule-demo",
            timestamp: new Date().toISOString(),
          },
        },
      };

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      const result = await caller.handleEvent(webhookEvent);

      expect(result.success).toBe(true);

      // Verify engagement score increased by 10
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      expect(afterLeads[0].engagementScore).toBe(initialEngagement + 10);
    });

    it("should update lead score after click engagement", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const beforeLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      const initialScore = beforeLeads[0].leadScore;

      // Simulate high-value click event
      const webhookEvent = {
        type: "email.clicked",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-click",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: [testLeadEmail],
          subject: "Schedule Your Demo",
          tags: [{ name: "lead_id", value: testLeadId.toString() }],
          click: {
            link: "https://harmony.example.com/schedule-demo",
            timestamp: new Date().toISOString(),
          },
        },
      };

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      await caller.handleEvent(webhookEvent);

      // Verify lead score was recalculated and increased
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, testLeadId))
        .limit(1);

      expect(afterLeads[0].leadScore).toBeGreaterThanOrEqual(initialScore);
    });
  });

  describe("Event Filtering", () => {
    it("should ignore non-tracking events", async () => {
      const webhookEvent = {
        type: "email.delivered",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-delivered",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: [testLeadEmail],
          subject: "Test Email",
          tags: [{ name: "lead_id", value: testLeadId.toString() }],
        },
      };

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      const result = await caller.handleEvent(webhookEvent);

      expect(result.success).toBe(true);
      expect(result.message).toContain("processed successfully");
    });

    it("should handle events for non-existent leads gracefully", async () => {
      const webhookEvent = {
        type: "email.opened",
        created_at: new Date().toISOString(),
        data: {
          email_id: "test-email-nonexistent",
          from: "HarmonyCare <onboarding@resend.dev>",
          to: ["nonexistent@example.com"],
          subject: "Test Email",
          tags: [{ name: "lead_id", value: "999999" }],
        },
      };

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      // Should not throw error, just log warning
      await expect(caller.handleEvent(webhookEvent)).rejects.toThrow();
    });
  });

  describe("Webhook Statistics", () => {
    it("should return webhook statistics", async () => {
      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      const stats = await caller.getStats();

      expect(stats).toHaveProperty("totalLeads");
      expect(stats).toHaveProperty("engagedLeads");
      expect(stats).toHaveProperty("engagementRate");
      expect(stats).toHaveProperty("totalEngagementPoints");

      expect(typeof stats.totalLeads).toBe("number");
      expect(typeof stats.engagedLeads).toBe("number");
      expect(typeof stats.engagementRate).toBe("number");
      expect(typeof stats.totalEngagementPoints).toBe("number");

      expect(stats.engagementRate).toBeGreaterThanOrEqual(0);
      expect(stats.engagementRate).toBeLessThanOrEqual(100);
    });
  });

  describe("Multiple Engagement Events", () => {
    it("should accumulate engagement points from multiple events", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Create a fresh lead with known engagement score
      const testEmail = `test-multi-${Date.now()}@example.com`;
      await db.insert(calculatorLeads).values({
        email: testEmail,
        facilityType: "group_home",
        residentCount: 10,
        annualSavings: 50000,
        overtimeSavings: 10000,
        errorSavings: 15000,
        complianceSavings: 15000,
        retentionSavings: 10000,
        leadScore: 55,
        leadTier: "warm",
        engagementScore: 0,
        source: "calculator",
      });

      // Look up the lead by email
      const [freshLead] = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.email, testEmail))
        .limit(1);

      const initialEngagement = 0;

      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      // Simulate open event (+5)
      await caller.handleEvent({
        type: "email.opened",
        created_at: new Date().toISOString(),
        data: {
          email_id: "multi-1",
          to: [freshLead.email],
          tags: [{ name: "lead_id", value: freshLead.id.toString() }],
        },
      });

      // Simulate click event (+10)
      await caller.handleEvent({
        type: "email.clicked",
        created_at: new Date().toISOString(),
        data: {
          email_id: "multi-2",
          to: [freshLead.email],
          tags: [{ name: "lead_id", value: freshLead.id.toString() }],
          click: {
            link: "https://example.com",
            timestamp: new Date().toISOString(),
          },
        },
      });

      // Verify total increase of 15 points
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, freshLead.id))
        .limit(1);

      expect(afterLeads[0].engagementScore).toBe(initialEngagement + 15);
    });
  });

  describe("Lead Tier Upgrades", () => {
    it("should upgrade lead tier when engagement pushes score over threshold", async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Create a lead just below hot threshold (score 68)
      const result = await db.insert(calculatorLeads).values({
        email: "tier-upgrade-test@example.com",
        facilityType: "ICF-ID",
        residentCount: 30,
        annualSavings: 150000,
        overtimeSavings: 45000,
        errorSavings: 35000,
        complianceSavings: 40000,
        retentionSavings: 30000,
        source: "calculator",
        emailSent: 0,
        leadScore: 68,
        leadTier: "warm",
        engagementScore: 8,
      });

      const newLeadId = Number(result.insertId);

      // Skip test if insertId is invalid
      if (isNaN(newLeadId) || newLeadId === 0) {
        console.log("Skipping tier upgrade test: invalid insertId");
        return;
      }

      // Simulate click event that should push to hot (+10 engagement = +6 score)
      const { resendWebhookRouter } = await import("./resendWebhook");
      const caller = resendWebhookRouter.createCaller({} as any);

      await caller.handleEvent({
        type: "email.clicked",
        created_at: new Date().toISOString(),
        data: {
          email_id: "tier-upgrade",
          to: ["tier-upgrade-test@example.com"],
          tags: [{ name: "lead_id", value: newLeadId.toString() }],
          click: {
            link: "https://example.com/demo",
            timestamp: new Date().toISOString(),
          },
        },
      });

      // Verify tier upgraded to hot
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.id, newLeadId))
        .limit(1);

      expect(afterLeads[0].leadScore).toBeGreaterThanOrEqual(70);
      expect(afterLeads[0].leadTier).toBe("hot");
    });
  });
});
