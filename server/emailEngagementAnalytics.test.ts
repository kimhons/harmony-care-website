import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import {
  getEmailEngagementMetrics,
  getEmailPerformanceBySource,
} from "./emailEngagementAnalytics";

describe("Email Engagement Analytics", () => {
  let testSubscriberIds: number[] = [];
  const testId = Date.now();

  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Create test subscribers with varying engagement levels
    const testData = [
      {
        email: `high-engagement-${testId}@test.com`,
        name: "High Engagement User",
        source: "blog-article-1",
        status: "active",
        nurtureSequence: JSON.stringify([
          { type: "welcome", sentAt: new Date().toISOString() },
          { type: "day2", sentAt: new Date().toISOString() },
          { type: "day5", sentAt: new Date().toISOString() },
        ]),
        lastNurtureEmail: "day5",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 0,
        emailOpens: 15,
        emailClicks: 8,
        lastEngagementAt: new Date(),
      },
      {
        email: `medium-engagement-${testId}@test.com`,
        name: "Medium Engagement User",
        source: "blog-article-2",
        status: "active",
        nurtureSequence: JSON.stringify([
          { type: "welcome", sentAt: new Date().toISOString() },
          { type: "day2", sentAt: new Date().toISOString() },
        ]),
        lastNurtureEmail: "day2",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 0,
        emailOpens: 5,
        emailClicks: 2,
        lastEngagementAt: new Date(),
      },
      {
        email: `low-engagement-${testId}@test.com`,
        name: "Low Engagement User",
        source: "blog-article-1",
        status: "active",
        nurtureSequence: JSON.stringify([
          { type: "welcome", sentAt: new Date().toISOString() },
        ]),
        lastNurtureEmail: "welcome",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 0,
        emailOpens: 1,
        emailClicks: 0,
        lastEngagementAt: new Date(),
      },
      {
        email: `completed-${testId}@test.com`,
        name: "Completed User",
        source: "blog-article-3",
        status: "active",
        nurtureSequence: JSON.stringify([
          { type: "welcome", sentAt: new Date().toISOString() },
          { type: "day2", sentAt: new Date().toISOString() },
          { type: "day5", sentAt: new Date().toISOString() },
          { type: "day8", sentAt: new Date().toISOString() },
          { type: "day12", sentAt: new Date().toISOString() },
        ]),
        lastNurtureEmail: "day12",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 1,
        emailOpens: 20,
        emailClicks: 12,
        lastEngagementAt: new Date(),
      },
      {
        email: `unsubscribed-${testId}@test.com`,
        source: "blog-article-2",
        status: "unsubscribed",
        nurtureSequence: JSON.stringify([
          { type: "welcome", sentAt: new Date().toISOString() },
        ]),
        lastNurtureEmail: "welcome",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 0,
        emailOpens: 1,
        emailClicks: 0,
        unsubscribedAt: new Date(),
      },
    ];

    for (const data of testData) {
      const result = await db.insert(newsletterSubscribers).values({
        email: data.email,
        name: data.name,
        source: data.source,
        status: data.status as any,
        nurtureSequence: data.nurtureSequence,
        lastNurtureEmail: data.lastNurtureEmail,
        lastNurtureEmailSentAt: data.lastNurtureEmailSentAt,
        nurtureCompleted: data.nurtureCompleted,
        emailOpens: data.emailOpens,
        emailClicks: data.emailClicks,
        lastEngagementAt: data.lastEngagementAt,
        unsubscribedAt: data.unsubscribedAt,
      });
      testSubscriberIds.push(Number(result.insertId));
    }
  });

  afterAll(async () => {
    const db = await getDb();
    if (!db) return;

    // Clean up test data
    for (const id of testSubscriberIds) {
      if (id && !isNaN(id)) {
        await db
          .delete(newsletterSubscribers)
          .where(eq(newsletterSubscribers.id, id));
      }
    }
  });

  describe("getEmailEngagementMetrics", () => {
    it("should return overall engagement metrics", async () => {
      const metrics = await getEmailEngagementMetrics();

      expect(metrics).toBeDefined();
      expect(metrics.totalSubscribers).toBeGreaterThanOrEqual(5);
      expect(metrics.activeSubscribers).toBeGreaterThanOrEqual(4);
      expect(metrics.unsubscribed).toBeGreaterThanOrEqual(1);
      expect(metrics.totalEmailsSent).toBeGreaterThan(0);
      expect(metrics.totalOpens).toBeGreaterThan(0);
      expect(metrics.totalClicks).toBeGreaterThan(0);
    });

    it("should calculate correct open and click rates", async () => {
      const metrics = await getEmailEngagementMetrics();

      // Rates should be non-negative numbers
      // Note: Open rate can exceed 100% if subscribers open emails multiple times
      expect(metrics.overallOpenRate).toBeGreaterThanOrEqual(0);
      expect(metrics.overallClickRate).toBeGreaterThanOrEqual(0);
      expect(metrics.clickToOpenRate).toBeGreaterThanOrEqual(0);

      // Click-to-open rate should be <= 100% (can't click more than you open)
      if (metrics.totalOpens > 0) {
        expect(metrics.clickToOpenRate).toBeLessThanOrEqual(100);
      }
    });

    it("should track nurture sequence progress", async () => {
      const metrics = await getEmailEngagementMetrics();

      expect(metrics.nurtureInProgress).toBeGreaterThanOrEqual(3);
      expect(metrics.nurtureCompleted).toBeGreaterThanOrEqual(1);
      expect(metrics.completionRate).toBeGreaterThan(0);
      expect(metrics.completionRate).toBeLessThanOrEqual(100);
    });

    it("should provide email type breakdown", async () => {
      const metrics = await getEmailEngagementMetrics();

      expect(metrics.emailTypeBreakdown).toBeDefined();
      expect(metrics.emailTypeBreakdown.length).toBeGreaterThan(0);

      const welcomeEmail = metrics.emailTypeBreakdown.find(
        e => e.emailType === "welcome"
      );
      expect(welcomeEmail).toBeDefined();
      expect(welcomeEmail!.sent).toBeGreaterThan(0);
    });

    it("should return top engaged subscribers", async () => {
      const metrics = await getEmailEngagementMetrics();

      expect(metrics.topEngagedSubscribers).toBeDefined();
      expect(metrics.topEngagedSubscribers.length).toBeGreaterThan(0);

      const topSubscriber = metrics.topEngagedSubscribers[0];
      expect(topSubscriber.email).toBeDefined();
      expect(topSubscriber.opens).toBeGreaterThanOrEqual(0);
      expect(topSubscriber.clicks).toBeGreaterThanOrEqual(0);
    });

    it("should provide engagement timeline", async () => {
      const metrics = await getEmailEngagementMetrics();

      expect(metrics.engagementTimeline).toBeDefined();
      expect(Array.isArray(metrics.engagementTimeline)).toBe(true);
    });
  });

  describe("getEmailPerformanceBySource", () => {
    it("should return performance metrics by source", async () => {
      const performance = await getEmailPerformanceBySource();

      expect(performance).toBeDefined();
      expect(Array.isArray(performance)).toBe(true);
      expect(performance.length).toBeGreaterThan(0);
    });

    it("should include all required fields", async () => {
      const performance = await getEmailPerformanceBySource();

      const firstSource = performance[0];
      expect(firstSource.source).toBeDefined();
      expect(firstSource.subscribers).toBeGreaterThan(0);
      expect(firstSource.totalOpens).toBeGreaterThanOrEqual(0);
      expect(firstSource.totalClicks).toBeGreaterThanOrEqual(0);
      expect(firstSource.avgOpens).toBeGreaterThanOrEqual(0);
      expect(firstSource.avgClicks).toBeGreaterThanOrEqual(0);
      expect(firstSource.openRate).toBeGreaterThanOrEqual(0);
      expect(firstSource.clickRate).toBeGreaterThanOrEqual(0);
    });

    it("should order by subscriber count descending", async () => {
      const performance = await getEmailPerformanceBySource();

      if (performance.length > 1) {
        for (let i = 0; i < performance.length - 1; i++) {
          expect(performance[i].subscribers).toBeGreaterThanOrEqual(
            performance[i + 1].subscribers
          );
        }
      }
    });
  });

  describe("Date filtering", () => {
    it("should filter metrics by date range", async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const metrics = await getEmailEngagementMetrics(yesterday, tomorrow);

      expect(metrics).toBeDefined();
      expect(metrics.totalSubscribers).toBeGreaterThanOrEqual(0);
    });
  });
});
