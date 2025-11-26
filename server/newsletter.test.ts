import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Newsletter Subscription System", () => {
  let testEmail: string;

  beforeAll(() => {
    testEmail = `test-${Date.now()}@example.com`;
  });

  it("should create newsletterSubscribers table", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    // Verify table exists by querying it
    const subscribers = await db!.select().from(newsletterSubscribers).limit(1);

    expect(Array.isArray(subscribers)).toBe(true);
  });

  it("should insert a new subscriber", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    const result = await db!.insert(newsletterSubscribers).values({
      email: testEmail,
      name: "Test User",
      source: "blog-test",
      status: "active",
    });

    expect(result).toBeTruthy();
    expect(result[0].insertId).toBeTruthy();
  });

  it("should retrieve subscriber by email", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    const subscribers = await db!
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, testEmail))
      .limit(1);

    expect(subscribers.length).toBe(1);
    expect(subscribers[0].email).toBe(testEmail);
    expect(subscribers[0].name).toBe("Test User");
    expect(subscribers[0].source).toBe("blog-test");
    expect(subscribers[0].status).toBe("active");
  });

  it("should track nurture sequence progress", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    // Simulate sending welcome email
    const nurtureSequence = [
      {
        type: "welcome",
        sentAt: new Date().toISOString(),
      },
    ];

    await db!
      .update(newsletterSubscribers)
      .set({
        nurtureSequence: JSON.stringify(nurtureSequence),
        lastNurtureEmail: "welcome",
        lastNurtureEmailSentAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, testEmail));

    // Verify update
    const subscribers = await db!
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, testEmail))
      .limit(1);

    expect(subscribers[0].lastNurtureEmail).toBe("welcome");
    expect(subscribers[0].nurtureSequence).toBeTruthy();

    const sequence = JSON.parse(subscribers[0].nurtureSequence!);
    expect(sequence.length).toBe(1);
    expect(sequence[0].type).toBe("welcome");
  });

  it("should handle unsubscribe", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    await db!
      .update(newsletterSubscribers)
      .set({
        status: "unsubscribed",
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, testEmail));

    const subscribers = await db!
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, testEmail))
      .limit(1);

    expect(subscribers[0].status).toBe("unsubscribed");
    expect(subscribers[0].unsubscribedAt).toBeTruthy();
  });

  it("should prevent duplicate email subscriptions", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    const duplicateEmail = `duplicate-${Date.now()}@example.com`;

    // First subscription should succeed
    await db!.insert(newsletterSubscribers).values({
      email: duplicateEmail,
      source: "blog-test",
      status: "active",
    });

    // Second subscription with same email should fail
    await expect(
      db!.insert(newsletterSubscribers).values({
        email: duplicateEmail,
        source: "blog-test-2",
        status: "active",
      })
    ).rejects.toThrow();
  });

  it("should track UTM parameters", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    const utmEmail = `utm-test-${Date.now()}@example.com`;

    await db!.insert(newsletterSubscribers).values({
      email: utmEmail,
      source: "blog-article",
      status: "active",
      utmSource: "google",
      utmMedium: "organic",
      utmCampaign: "blog-seo",
    });

    const subscribers = await db!
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, utmEmail))
      .limit(1);

    expect(subscribers[0].utmSource).toBe("google");
    expect(subscribers[0].utmMedium).toBe("organic");
    expect(subscribers[0].utmCampaign).toBe("blog-seo");
  });

  it("should mark nurture sequence as completed", async () => {
    const db = await getDb();
    expect(db).toBeTruthy();

    const completeEmail = `complete-${Date.now()}@example.com`;

    await db!.insert(newsletterSubscribers).values({
      email: completeEmail,
      source: "blog-test",
      status: "active",
    });

    // Simulate completing all nurture emails
    const fullSequence = [
      { type: "welcome", sentAt: new Date().toISOString() },
      { type: "day2", sentAt: new Date().toISOString() },
      { type: "day5", sentAt: new Date().toISOString() },
      { type: "day8", sentAt: new Date().toISOString() },
      { type: "day12", sentAt: new Date().toISOString() },
    ];

    await db!
      .update(newsletterSubscribers)
      .set({
        nurtureSequence: JSON.stringify(fullSequence),
        lastNurtureEmail: "day12",
        lastNurtureEmailSentAt: new Date(),
        nurtureCompleted: 1,
      })
      .where(eq(newsletterSubscribers.email, completeEmail));

    const subscribers = await db!
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, completeEmail))
      .limit(1);

    expect(subscribers[0].nurtureCompleted).toBe(1);
    expect(subscribers[0].lastNurtureEmail).toBe("day12");

    const sequence = JSON.parse(subscribers[0].nurtureSequence!);
    expect(sequence.length).toBe(5);
  });
});
