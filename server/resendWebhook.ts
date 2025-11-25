import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { trackEngagement } from "./leadScoringService";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Resend Webhook Integration
 * 
 * Automatically tracks email opens and clicks to update lead scores in real-time.
 * 
 * Webhook Events:
 * - email.opened: User opened the email (+5 engagement points)
 * - email.clicked: User clicked a link in the email (+10 engagement points)
 * 
 * Setup Instructions:
 * 1. Go to Resend Dashboard → Webhooks
 * 2. Add webhook URL: https://your-domain.com/api/trpc/resendWebhook.handleEvent
 * 3. Select events: email.opened, email.clicked
 * 4. Copy webhook signing secret to RESEND_WEBHOOK_SECRET env var
 * 
 * Email Metadata Format:
 * When sending emails, include lead ID in metadata:
 * {
 *   to: "lead@example.com",
 *   subject: "...",
 *   html: "...",
 *   tags: [{ name: "lead_id", value: "123" }]
 * }
 */

// Resend webhook event types
const ResendWebhookEventSchema = z.object({
  type: z.enum([
    "email.sent",
    "email.delivered",
    "email.delivery_delayed",
    "email.complained",
    "email.bounced",
    "email.opened",
    "email.clicked",
  ]),
  created_at: z.string(),
  data: z.object({
    email_id: z.string().optional(),
    from: z.string().optional(),
    to: z.array(z.string()).optional(),
    subject: z.string().optional(),
    tags: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional(),
    click: z.object({
      link: z.string(),
      timestamp: z.string(),
    }).optional(),
  }),
});

type ResendWebhookEvent = z.infer<typeof ResendWebhookEventSchema>;

/**
 * Extract lead ID from email tags
 */
function extractLeadId(event: ResendWebhookEvent): number | null {
  const tags = event.data.tags || [];
  const leadIdTag = tags.find(tag => tag.name === "lead_id");
  
  if (!leadIdTag) {
    return null;
  }

  const leadId = parseInt(leadIdTag.value, 10);
  return isNaN(leadId) ? null : leadId;
}

/**
 * Extract lead ID from email address by looking up in database
 */
async function findLeadByEmail(email: string): Promise<number | null> {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const leads = await db
    .select({ id: calculatorLeads.id })
    .from(calculatorLeads)
    .where(eq(calculatorLeads.email, email))
    .limit(1);

  return leads.length > 0 ? leads[0].id : null;
}

/**
 * Process webhook event and update lead engagement
 */
async function processWebhookEvent(event: ResendWebhookEvent): Promise<void> {
  console.log(`[ResendWebhook] Processing event: ${event.type}`);

  // Only process open and click events
  if (event.type !== "email.opened" && event.type !== "email.clicked") {
    console.log(`[ResendWebhook] Ignoring event type: ${event.type}`);
    return;
  }

  // Try to get lead ID from tags first
  let leadId = extractLeadId(event);

  // If no lead ID in tags, try to find by email address
  if (!leadId && event.data.to && event.data.to.length > 0) {
    const email = event.data.to[0];
    leadId = await findLeadByEmail(email);
  }

  if (!leadId) {
    console.warn(`[ResendWebhook] Could not find lead ID for event:`, event);
    return;
  }

  // Track engagement based on event type
  try {
    if (event.type === "email.opened") {
      await trackEngagement(leadId, "email_open");
      console.log(`[ResendWebhook] ✅ Tracked email open for lead ${leadId}`);
    } else if (event.type === "email.clicked") {
      const clickedLink = event.data.click?.link || "unknown";
      await trackEngagement(leadId, "email_click");
      console.log(`[ResendWebhook] ✅ Tracked email click for lead ${leadId} (link: ${clickedLink})`);
    }
  } catch (error) {
    console.error(`[ResendWebhook] Error tracking engagement for lead ${leadId}:`, error);
    throw error;
  }
}

/**
 * Verify webhook signature (optional but recommended for production)
 * Resend signs webhooks with HMAC SHA256
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // For now, we'll skip signature verification in development
  // In production, implement HMAC SHA256 verification
  // See: https://resend.com/docs/dashboard/webhooks/verify-signature
  
  if (!secret) {
    console.warn("[ResendWebhook] No webhook secret configured, skipping signature verification");
    return true;
  }

  // TODO: Implement HMAC SHA256 signature verification
  // const crypto = require('crypto');
  // const expectedSignature = crypto
  //   .createHmac('sha256', secret)
  //   .update(payload)
  //   .digest('hex');
  // return signature === expectedSignature;

  return true;
}

export const resendWebhookRouter = router({
  /**
   * Handle incoming Resend webhook events
   * 
   * This endpoint receives webhook events from Resend and processes them
   * to track email opens and clicks for lead scoring.
   */
  handleEvent: publicProcedure
    .input(
      z.object({
        type: z.string(),
        created_at: z.string(),
        data: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate event schema
        const event = ResendWebhookEventSchema.parse(input);

        // Process the event
        await processWebhookEvent(event);

        return {
          success: true,
          message: `Event ${event.type} processed successfully`,
        };
      } catch (error) {
        console.error("[ResendWebhook] Error processing webhook:", error);
        
        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid webhook payload",
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process webhook event",
        });
      }
    }),

  /**
   * Get webhook statistics
   * Shows how many email opens and clicks have been tracked
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    // Get leads with engagement
    const leadsWithEngagement = await db
      .select()
      .from(calculatorLeads)
      .where(eq(calculatorLeads.engagementScore, 0));

    const totalLeads = await db.select().from(calculatorLeads);
    const engagedLeads = totalLeads.filter(lead => lead.engagementScore > 0);

    return {
      totalLeads: totalLeads.length,
      engagedLeads: engagedLeads.length,
      engagementRate: totalLeads.length > 0 
        ? Math.round((engagedLeads.length / totalLeads.length) * 100) 
        : 0,
      totalEngagementPoints: totalLeads.reduce(
        (sum, lead) => sum + lead.engagementScore,
        0
      ),
    };
  }),
});
