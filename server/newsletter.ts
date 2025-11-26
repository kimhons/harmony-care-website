import { z } from "zod";
import { getDb } from "./db";
import { newsletterSubscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "./_core/trpc";
import { sendWelcomeEmail } from "./newsletterNurtureService";

/**
 * Newsletter subscription management
 * Handles blog newsletter signups and nurture sequence tracking
 */

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string(), // blog article slug or "homepage"
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const newsletterRouter = router({
  /**
   * Subscribe to newsletter
   * Creates new subscriber or updates existing one if already subscribed
   */
  subscribe: publicProcedure
    .input(subscribeSchema)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Check if email already exists
        const existing = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, input.email))
          .limit(1);

        if (existing.length > 0) {
          const subscriber = existing[0];

          // If previously unsubscribed, reactivate
          if (subscriber.status === "unsubscribed") {
            await db
              .update(newsletterSubscribers)
              .set({
                status: "active",
                source: input.source,
                utmSource: input.utmSource,
                utmMedium: input.utmMedium,
                utmCampaign: input.utmCampaign,
                subscribedAt: new Date(),
                unsubscribedAt: null,
              })
              .where(eq(newsletterSubscribers.id, subscriber.id));

            console.log(`[Newsletter] Reactivated subscriber: ${input.email}`);
            return {
              success: true,
              message: "Welcome back! You've been resubscribed.",
            };
          }

          console.log(`[Newsletter] Already subscribed: ${input.email}`);
          return { success: true, message: "You're already subscribed!" };
        }

        // Create new subscriber
        const result = await db.insert(newsletterSubscribers).values({
          email: input.email,
          name: input.name,
          source: input.source,
          status: "active",
          utmSource: input.utmSource,
          utmMedium: input.utmMedium,
          utmCampaign: input.utmCampaign,
        });

        const subscriberId = Number(result[0].insertId);
        console.log(
          `[Newsletter] New subscriber: ${input.email} from ${input.source}`
        );

        // Trigger welcome email in nurture sequence
        try {
          await sendWelcomeEmail(subscriberId);
        } catch (emailError) {
          console.error(
            "[Newsletter] Failed to send welcome email:",
            emailError
          );
          // Don't fail the subscription if email fails
        }

        return {
          success: true,
          message:
            "Thanks for subscribing! Check your email for a welcome message.",
        };
      } catch (error) {
        console.error("[Newsletter] Subscription error:", error);
        throw new Error("Failed to subscribe. Please try again.");
      }
    }),

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }
        await db
          .update(newsletterSubscribers)
          .set({
            status: "unsubscribed",
            unsubscribedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.email, input.email));

        console.log(`[Newsletter] Unsubscribed: ${input.email}`);

        return { success: true, message: "You've been unsubscribed." };
      } catch (error) {
        console.error("[Newsletter] Unsubscribe error:", error);
        throw new Error("Failed to unsubscribe. Please try again.");
      }
    }),

  /**
   * Get subscriber count (for display on website)
   */
  getSubscriberCount: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) {
        return { count: 2000 }; // Fallback
      }
      const subscribers = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.status, "active"));

      return { count: subscribers.length };
    } catch (error) {
      console.error("[Newsletter] Error getting subscriber count:", error);
      return { count: 2000 }; // Fallback to displayed number
    }
  }),
});
