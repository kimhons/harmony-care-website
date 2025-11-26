/**
 * Resource Nurture Email Service
 *
 * Automatically sends follow-up emails to users who download resources
 * to nurture them toward booking a demo.
 *
 * Sequence:
 * - Day 1: Resource delivery confirmation (sent immediately)
 * - Day 3: Related insights and case study
 * - Day 7: Demo invitation with urgency and founding member pricing
 */

import { getDb } from "./db";
import { leadMagnetDownloads, leadMagnets } from "../drizzle/schema";
import { eq, and, or, isNull, sql } from "drizzle-orm";
import { sendEmail } from "./email";
import {
  getDay1Email,
  getDay3Email,
  getDay7Email,
} from "./resourceNurtureEmailTemplates";

interface NurtureSequenceEntry {
  type: "day1" | "day3" | "day7";
  sentAt: string;
}

/**
 * Send Day 1 email immediately after resource download
 */
export async function sendDay1Email(downloadId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.error("[ResourceNurture] Database not available");
    return false;
  }

  try {
    // Get download details
    const downloads = await db
      .select({
        download: leadMagnetDownloads,
        magnet: leadMagnets,
      })
      .from(leadMagnetDownloads)
      .leftJoin(
        leadMagnets,
        eq(leadMagnetDownloads.leadMagnetId, leadMagnets.id)
      )
      .where(eq(leadMagnetDownloads.id, downloadId))
      .limit(1);

    if (downloads.length === 0 || !downloads[0]?.magnet) {
      console.error(`[ResourceNurture] Download ${downloadId} not found`);
      return false;
    }

    const { download, magnet } = downloads[0];

    // Generate email
    const { subject, html } = getDay1Email({
      name: download.name || "",
      email: download.email,
      resourceTitle: magnet.title,
      resourceUrl: magnet.fileUrl,
      facilityName: download.facilityName || undefined,
      facilityType: download.facilityType || undefined,
    });

    // Send email
    await sendEmail({
      to: download.email,
      subject,
      html,
      tags: [
        { name: "download_id", value: String(downloadId) },
        { name: "email_type", value: "resource_day1" },
        { name: "campaign", value: "resource_nurture" },
      ],
    });

    // Update nurture sequence tracking
    const sequence: NurtureSequenceEntry[] = [
      {
        type: "day1",
        sentAt: new Date().toISOString(),
      },
    ];

    await db
      .update(leadMagnetDownloads)
      .set({
        nurtureSequence: JSON.stringify(sequence),
        lastNurtureEmail: "day1",
        lastNurtureEmailSentAt: new Date(),
      })
      .where(eq(leadMagnetDownloads.id, downloadId));

    console.log(`[ResourceNurture] Day 1 email sent to ${download.email}`);
    return true;
  } catch (error) {
    console.error("[ResourceNurture] Error sending Day 1 email:", error);
    return false;
  }
}

/**
 * Process all downloads eligible for Day 3 emails
 * Run this daily via cron job
 */
export async function sendDay3Emails(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.error("[ResourceNurture] Database not available");
    return 0;
  }

  try {
    // Find downloads that:
    // 1. Had Day 1 email sent 3 days ago
    // 2. Haven't received Day 3 email yet
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const eligibleDownloads = await db
      .select({
        download: leadMagnetDownloads,
        magnet: leadMagnets,
      })
      .from(leadMagnetDownloads)
      .leftJoin(
        leadMagnets,
        eq(leadMagnetDownloads.leadMagnetId, leadMagnets.id)
      )
      .where(
        and(
          eq(leadMagnetDownloads.lastNurtureEmail, "day1"),
          sql`${leadMagnetDownloads.lastNurtureEmailSentAt} <= ${threeDaysAgo}`
        )
      );

    console.log(
      `[ResourceNurture] Found ${eligibleDownloads.length} downloads eligible for Day 3 email`
    );

    let sentCount = 0;

    for (const { download, magnet } of eligibleDownloads) {
      if (!magnet) continue;

      try {
        // Generate email
        const { subject, html } = getDay3Email({
          name: download.name || "",
          email: download.email,
          resourceTitle: magnet.title,
          resourceUrl: magnet.fileUrl,
          facilityName: download.facilityName || undefined,
          facilityType: download.facilityType || undefined,
        });

        // Send email
        await sendEmail({
          to: download.email,
          subject,
          html,
          tags: [
            { name: "download_id", value: String(download.id) },
            { name: "email_type", value: "resource_day3" },
            { name: "campaign", value: "resource_nurture" },
          ],
        });

        // Update nurture sequence
        const existingSequence: NurtureSequenceEntry[] =
          download.nurtureSequence
            ? JSON.parse(download.nurtureSequence as string)
            : [];

        existingSequence.push({
          type: "day3",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(leadMagnetDownloads)
          .set({
            nurtureSequence: JSON.stringify(existingSequence),
            lastNurtureEmail: "day3",
            lastNurtureEmailSentAt: new Date(),
          })
          .where(eq(leadMagnetDownloads.id, download.id));

        sentCount++;
        console.log(`[ResourceNurture] Day 3 email sent to ${download.email}`);
      } catch (error) {
        console.error(
          `[ResourceNurture] Error sending Day 3 email to ${download.email}:`,
          error
        );
      }
    }

    return sentCount;
  } catch (error) {
    console.error("[ResourceNurture] Error processing Day 3 emails:", error);
    return 0;
  }
}

/**
 * Process all downloads eligible for Day 7 emails
 * Run this daily via cron job
 */
export async function sendDay7Emails(): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.error("[ResourceNurture] Database not available");
    return 0;
  }

  try {
    // Find downloads that:
    // 1. Had Day 3 email sent 4 days ago (3 + 4 = 7 total)
    // 2. Haven't received Day 7 email yet
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    const eligibleDownloads = await db
      .select({
        download: leadMagnetDownloads,
        magnet: leadMagnets,
      })
      .from(leadMagnetDownloads)
      .leftJoin(
        leadMagnets,
        eq(leadMagnetDownloads.leadMagnetId, leadMagnets.id)
      )
      .where(
        and(
          eq(leadMagnetDownloads.lastNurtureEmail, "day3"),
          sql`${leadMagnetDownloads.lastNurtureEmailSentAt} <= ${fourDaysAgo}`
        )
      );

    console.log(
      `[ResourceNurture] Found ${eligibleDownloads.length} downloads eligible for Day 7 email`
    );

    let sentCount = 0;

    for (const { download, magnet } of eligibleDownloads) {
      if (!magnet) continue;

      try {
        // Generate email
        const { subject, html } = getDay7Email({
          name: download.name || "",
          email: download.email,
          resourceTitle: magnet.title,
          resourceUrl: magnet.fileUrl,
          facilityName: download.facilityName || undefined,
          facilityType: download.facilityType || undefined,
        });

        // Send email
        await sendEmail({
          to: download.email,
          subject,
          html,
          tags: [
            { name: "download_id", value: String(download.id) },
            { name: "email_type", value: "resource_day7" },
            { name: "campaign", value: "resource_nurture" },
          ],
        });

        // Update nurture sequence
        const existingSequence: NurtureSequenceEntry[] =
          download.nurtureSequence
            ? JSON.parse(download.nurtureSequence as string)
            : [];

        existingSequence.push({
          type: "day7",
          sentAt: new Date().toISOString(),
        });

        await db
          .update(leadMagnetDownloads)
          .set({
            nurtureSequence: JSON.stringify(existingSequence),
            lastNurtureEmail: "day7",
            lastNurtureEmailSentAt: new Date(),
            nurtureCompleted: 1,
          })
          .where(eq(leadMagnetDownloads.id, download.id));

        sentCount++;
        console.log(`[ResourceNurture] Day 7 email sent to ${download.email}`);
      } catch (error) {
        console.error(
          `[ResourceNurture] Error sending Day 7 email to ${download.email}:`,
          error
        );
      }
    }

    return sentCount;
  } catch (error) {
    console.error("[ResourceNurture] Error processing Day 7 emails:", error);
    return 0;
  }
}

/**
 * Process all nurture emails (Day 3 and Day 7)
 * Call this from a daily cron job
 */
export async function processResourceNurtureEmails(): Promise<{
  day3: number;
  day7: number;
}> {
  console.log("[ResourceNurture] Starting daily nurture email processing...");

  const day3Count = await sendDay3Emails();
  const day7Count = await sendDay7Emails();

  console.log(
    `[ResourceNurture] Processing complete: ${day3Count} Day 3 emails, ${day7Count} Day 7 emails sent`
  );

  return { day3: day3Count, day7: day7Count };
}
