import { Resend } from "resend";
import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq, and, lt } from "drizzle-orm";
import {
  getWelcomeEmail,
  getDay2Email,
  getDay5Email,
  getDay8Email,
  getDay12Email,
} from "./newsletterEmailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "HarmonyCare <insights@harmonycare.ai>";

/**
 * Newsletter nurture sequence service
 * Automatically sends 5-email sequence to new blog subscribers
 */

interface NurtureEmail {
  type: string;
  sentAt: string;
}

/**
 * Send welcome email (Day 0) to new subscriber
 */
export async function sendWelcomeEmail(subscriberId: number) {
  try {
    const db = await getDb();
    if (!db) {
      console.error("[NewsletterNurture] Database not available");
      return;
    }

    const subscriber = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, subscriberId))
      .limit(1);

    if (!subscriber.length) {
      console.error(`[NewsletterNurture] Subscriber ${subscriberId} not found`);
      return;
    }

    const sub = subscriber[0];
    const emailTemplate = getWelcomeEmail({
      email: sub.email,
      name: sub.name || undefined,
    });

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: sub.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      tags: [
        { name: "campaign", value: "newsletter_nurture" },
        { name: "email_type", value: "welcome" },
        { name: "subscriber_id", value: subscriberId.toString() },
      ],
    });

    // Update nurture sequence tracking
    const nurtureSequence: NurtureEmail[] = [
      {
        type: "welcome",
        sentAt: new Date().toISOString(),
      },
    ];

    await db
      .update(newsletterSubscribers)
      .set({
        nurtureSequence: JSON.stringify(nurtureSequence),
        lastNurtureEmail: "welcome",
        lastNurtureEmailSentAt: new Date(),
      })
      .where(eq(newsletterSubscribers.id, subscriberId));

    console.log(`[NewsletterNurture] Welcome email sent to ${sub.email}`);
    return result;
  } catch (error) {
    console.error("[NewsletterNurture] Error sending welcome email:", error);
    throw error;
  }
}

/**
 * Send Day 2 email (staffing crisis article + case study)
 */
export async function sendDay2Emails() {
  try {
    const db = await getDb();
    if (!db) return;

    // Find subscribers who:
    // 1. Are active
    // 2. Last email was "welcome"
    // 3. Last email was sent 2+ days ago
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(
        and(
          eq(newsletterSubscribers.status, "active"),
          eq(newsletterSubscribers.lastNurtureEmail, "welcome"),
          lt(newsletterSubscribers.lastNurtureEmailSentAt, twoDaysAgo)
        )
      );

    console.log(
      `[NewsletterNurture] Sending Day 2 emails to ${subscribers.length} subscribers`
    );

    for (const sub of subscribers) {
      try {
        const emailTemplate = getDay2Email({
          email: sub.email,
          name: sub.name || undefined,
        });

        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          tags: [
            { name: "campaign", value: "newsletter_nurture" },
            { name: "email_type", value: "day2" },
            { name: "subscriber_id", value: sub.id.toString() },
          ],
        });

        // Update nurture sequence
        const currentSequence: NurtureEmail[] = sub.nurtureSequence
          ? JSON.parse(sub.nurtureSequence)
          : [];
        currentSequence.push({
          type: "day2",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(newsletterSubscribers)
          .set({
            nurtureSequence: JSON.stringify(currentSequence),
            lastNurtureEmail: "day2",
            lastNurtureEmailSentAt: new Date(),
          })
          .where(eq(newsletterSubscribers.id, sub.id));

        console.log(`[NewsletterNurture] Day 2 email sent to ${sub.email}`);
      } catch (error) {
        console.error(
          `[NewsletterNurture] Error sending Day 2 to ${sub.email}:`,
          error
        );
      }
    }

    return { sent: subscribers.length };
  } catch (error) {
    console.error("[NewsletterNurture] Error in sendDay2Emails:", error);
    throw error;
  }
}

/**
 * Send Day 5 email (ROI calculator)
 */
export async function sendDay5Emails() {
  try {
    const db = await getDb();
    if (!db) return;

    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(
        and(
          eq(newsletterSubscribers.status, "active"),
          eq(newsletterSubscribers.lastNurtureEmail, "day2"),
          lt(newsletterSubscribers.lastNurtureEmailSentAt, fiveDaysAgo)
        )
      );

    console.log(
      `[NewsletterNurture] Sending Day 5 emails to ${subscribers.length} subscribers`
    );

    for (const sub of subscribers) {
      try {
        const emailTemplate = getDay5Email({
          email: sub.email,
          name: sub.name || undefined,
        });

        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          tags: [
            { name: "campaign", value: "newsletter_nurture" },
            { name: "email_type", value: "day5" },
            { name: "subscriber_id", value: sub.id.toString() },
          ],
        });

        const currentSequence: NurtureEmail[] = sub.nurtureSequence
          ? JSON.parse(sub.nurtureSequence)
          : [];
        currentSequence.push({
          type: "day5",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(newsletterSubscribers)
          .set({
            nurtureSequence: JSON.stringify(currentSequence),
            lastNurtureEmail: "day5",
            lastNurtureEmailSentAt: new Date(),
          })
          .where(eq(newsletterSubscribers.id, sub.id));

        console.log(`[NewsletterNurture] Day 5 email sent to ${sub.email}`);
      } catch (error) {
        console.error(
          `[NewsletterNurture] Error sending Day 5 to ${sub.email}:`,
          error
        );
      }
    }

    return { sent: subscribers.length };
  } catch (error) {
    console.error("[NewsletterNurture] Error in sendDay5Emails:", error);
    throw error;
  }
}

/**
 * Send Day 8 email (customer success story)
 */
export async function sendDay8Emails() {
  try {
    const db = await getDb();
    if (!db) return;

    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(
        and(
          eq(newsletterSubscribers.status, "active"),
          eq(newsletterSubscribers.lastNurtureEmail, "day5"),
          lt(newsletterSubscribers.lastNurtureEmailSentAt, eightDaysAgo)
        )
      );

    console.log(
      `[NewsletterNurture] Sending Day 8 emails to ${subscribers.length} subscribers`
    );

    for (const sub of subscribers) {
      try {
        const emailTemplate = getDay8Email({
          email: sub.email,
          name: sub.name || undefined,
        });

        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          tags: [
            { name: "campaign", value: "newsletter_nurture" },
            { name: "email_type", value: "day8" },
            { name: "subscriber_id", value: sub.id.toString() },
          ],
        });

        const currentSequence: NurtureEmail[] = sub.nurtureSequence
          ? JSON.parse(sub.nurtureSequence)
          : [];
        currentSequence.push({
          type: "day8",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(newsletterSubscribers)
          .set({
            nurtureSequence: JSON.stringify(currentSequence),
            lastNurtureEmail: "day8",
            lastNurtureEmailSentAt: new Date(),
          })
          .where(eq(newsletterSubscribers.id, sub.id));

        console.log(`[NewsletterNurture] Day 8 email sent to ${sub.email}`);
      } catch (error) {
        console.error(
          `[NewsletterNurture] Error sending Day 8 to ${sub.email}:`,
          error
        );
      }
    }

    return { sent: subscribers.length };
  } catch (error) {
    console.error("[NewsletterNurture] Error in sendDay8Emails:", error);
    throw error;
  }
}

/**
 * Send Day 12 email (demo invitation - final email)
 */
export async function sendDay12Emails() {
  try {
    const db = await getDb();
    if (!db) return;

    const twelveDaysAgo = new Date();
    twelveDaysAgo.setDate(twelveDaysAgo.getDate() - 12);

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(
        and(
          eq(newsletterSubscribers.status, "active"),
          eq(newsletterSubscribers.lastNurtureEmail, "day8"),
          lt(newsletterSubscribers.lastNurtureEmailSentAt, twelveDaysAgo)
        )
      );

    console.log(
      `[NewsletterNurture] Sending Day 12 emails to ${subscribers.length} subscribers`
    );

    for (const sub of subscribers) {
      try {
        const emailTemplate = getDay12Email({
          email: sub.email,
          name: sub.name || undefined,
        });

        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          tags: [
            { name: "campaign", value: "newsletter_nurture" },
            { name: "email_type", value: "day12" },
            { name: "subscriber_id", value: sub.id.toString() },
          ],
        });

        const currentSequence: NurtureEmail[] = sub.nurtureSequence
          ? JSON.parse(sub.nurtureSequence)
          : [];
        currentSequence.push({
          type: "day12",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(newsletterSubscribers)
          .set({
            nurtureSequence: JSON.stringify(currentSequence),
            lastNurtureEmail: "day12",
            lastNurtureEmailSentAt: new Date(),
            nurtureCompleted: 1, // Mark sequence as complete
          })
          .where(eq(newsletterSubscribers.id, sub.id));

        console.log(
          `[NewsletterNurture] Day 12 email sent to ${sub.email} - sequence complete`
        );
      } catch (error) {
        console.error(
          `[NewsletterNurture] Error sending Day 12 to ${sub.email}:`,
          error
        );
      }
    }

    return { sent: subscribers.length };
  } catch (error) {
    console.error("[NewsletterNurture] Error in sendDay12Emails:", error);
    throw error;
  }
}

/**
 * Run all pending nurture emails
 * Call this function from a cron job or scheduled task
 */
export async function runNurtureSequence() {
  console.log("[NewsletterNurture] Running nurture sequence...");

  const results = {
    day2: await sendDay2Emails(),
    day5: await sendDay5Emails(),
    day8: await sendDay8Emails(),
    day12: await sendDay12Emails(),
  };

  console.log("[NewsletterNurture] Nurture sequence complete:", results);
  return results;
}
