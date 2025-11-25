import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { eq, and, or, isNull, lt, sql } from "drizzle-orm";
import { sendEmail } from "./email";
import {
  getDay1EmailTemplate,
  getDay3EmailTemplate,
  getDay7EmailTemplate,
  type NurtureEmailData,
} from "./nurtureEmailTemplates";

/**
 * Nurture email automation service for calculator leads
 * Sends automated email sequences: Day 1, Day 3, Day 7
 */

interface NurtureEmail {
  type: "day1" | "day3" | "day7";
  sentAt: string;
}

/**
 * Process nurture email sequence for all eligible leads
 * Should be run daily via cron job or scheduled task
 */
export async function processNurtureEmails() {
  const db = await getDb();
  if (!db) {
    console.error("[NurtureEmail] Database not available");
    return { success: false, error: "Database not available" };
  }

  const results = {
    day1Sent: 0,
    day3Sent: 0,
    day7Sent: 0,
    errors: [] as string[],
  };

  try {
    // Get current time
    const now = new Date();

    // Day 1: Send immediately to new leads (within 1 hour of creation)
    const day1Leads = await db
      .select()
      .from(calculatorLeads)
      .where(
        and(
          or(
            isNull(calculatorLeads.lastNurtureEmail),
            eq(calculatorLeads.lastNurtureEmail, "")
          ),
          lt(
            calculatorLeads.createdAt,
            new Date(now.getTime() - 60 * 60 * 1000)
          ) // Created more than 1 hour ago
        )
      )
      .limit(50); // Process in batches

    for (const lead of day1Leads) {
      try {
        await sendNurtureEmail(lead, "day1");
        results.day1Sent++;
      } catch (error) {
        results.errors.push(
          `Day 1 failed for ${lead.email}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    // Day 3: Send to leads who received Day 1 email 3 days ago
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const day3Leads = await db
      .select()
      .from(calculatorLeads)
      .where(
        and(
          eq(calculatorLeads.lastNurtureEmail, "day1"),
          lt(calculatorLeads.lastNurtureEmailSentAt, threeDaysAgo)
        )
      )
      .limit(50);

    for (const lead of day3Leads) {
      try {
        await sendNurtureEmail(lead, "day3");
        results.day3Sent++;
      } catch (error) {
        results.errors.push(
          `Day 3 failed for ${lead.email}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    // Day 7: Send to leads who received Day 3 email 4 days ago (7 days total from Day 1)
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
    const day7Leads = await db
      .select()
      .from(calculatorLeads)
      .where(
        and(
          eq(calculatorLeads.lastNurtureEmail, "day3"),
          lt(calculatorLeads.lastNurtureEmailSentAt, fourDaysAgo)
        )
      )
      .limit(50);

    for (const lead of day7Leads) {
      try {
        await sendNurtureEmail(lead, "day7");
        results.day7Sent++;
      } catch (error) {
        results.errors.push(
          `Day 7 failed for ${lead.email}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }

    console.log("[NurtureEmail] Processing complete:", results);
    return { success: true, results };
  } catch (error) {
    console.error("[NurtureEmail] Processing error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Send a specific nurture email to a lead
 */
async function sendNurtureEmail(
  lead: any,
  emailType: "day1" | "day3" | "day7"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Prepare email data
  const emailData: NurtureEmailData = {
    email: lead.email,
    firstName: lead.name?.split(" ")[0],
    facilityType: lead.facilityType,
    residentCount: lead.residentCount,
    annualSavings: lead.annualSavings,
  };

  // Get email template
  let template;
  switch (emailType) {
    case "day1":
      template = getDay1EmailTemplate(emailData);
      break;
    case "day3":
      template = getDay3EmailTemplate(emailData);
      break;
    case "day7":
      template = getDay7EmailTemplate(emailData);
      break;
  }

  // Send email via Resend with lead ID in tags for webhook tracking
  await sendEmail({
    to: lead.email,
    subject: template.subject,
    html: template.html,
    tags: [
      { name: "lead_id", value: lead.id.toString() },
      { name: "email_type", value: emailType },
      { name: "campaign", value: "nurture_sequence" },
    ],
  });

  // Update lead record
  const currentSequence: NurtureEmail[] = lead.nurtureSequence
    ? JSON.parse(lead.nurtureSequence)
    : [];

  currentSequence.push({
    type: emailType,
    sentAt: new Date().toISOString(),
  });

  const isCompleted = emailType === "day7";

  await db
    .update(calculatorLeads)
    .set({
      nurtureSequence: JSON.stringify(currentSequence),
      lastNurtureEmail: emailType,
      lastNurtureEmailSentAt: new Date(),
      nurtureCompleted: isCompleted ? 1 : 0,
    })
    .where(eq(calculatorLeads.id, lead.id));

  console.log(`[NurtureEmail] Sent ${emailType} to ${lead.email}`);
}

/**
 * Manually send a specific nurture email to a lead (for testing or manual triggers)
 */
export async function sendManualNurtureEmail(
  leadId: number,
  emailType: "day1" | "day3" | "day7"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const leads = await db
    .select()
    .from(calculatorLeads)
    .where(eq(calculatorLeads.id, leadId))
    .limit(1);

  if (leads.length === 0) {
    throw new Error(`Lead ${leadId} not found`);
  }

  await sendNurtureEmail(leads[0], emailType);
  return { success: true, message: `${emailType} email sent to ${leads[0].email}` };
}

/**
 * Get nurture email statistics
 */
export async function getNurtureEmailStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Total leads in nurture sequence
  const totalInNurture = await db
    .select({ count: sql<number>`count(*)` })
    .from(calculatorLeads)
    .where(eq(calculatorLeads.nurtureCompleted, 0));

  // Completed nurture sequences
  const totalCompleted = await db
    .select({ count: sql<number>`count(*)` })
    .from(calculatorLeads)
    .where(eq(calculatorLeads.nurtureCompleted, 1));

  // By stage
  const byStage = await db
    .select({
      stage: calculatorLeads.lastNurtureEmail,
      count: sql<number>`count(*)`,
    })
    .from(calculatorLeads)
    .groupBy(calculatorLeads.lastNurtureEmail);

  return {
    totalInNurture: Number(totalInNurture[0]?.count || 0),
    totalCompleted: Number(totalCompleted[0]?.count || 0),
    byStage: byStage.map((s) => ({
      stage: s.stage || "not_started",
      count: Number(s.count),
    })),
  };
}
