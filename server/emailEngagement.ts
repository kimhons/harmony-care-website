/**
 * Email Engagement TRPC Router
 * API endpoints for email engagement analytics dashboard
 */

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  getEmailEngagementMetrics,
  getEmailPerformanceBySource,
} from "./emailEngagementAnalytics";

export const emailEngagementRouter = router({
  /**
   * Get comprehensive email engagement metrics
   */
  getMetrics: publicProcedure
    .input(
      z
        .object({
          startDate: z.string().optional(),
          endDate: z.string().optional(),
        })
        .optional()
    )
    .query(
      async ({
        input,
      }: {
        input?: { startDate?: string; endDate?: string };
      }) => {
        const startDate = input?.startDate
          ? new Date(input.startDate)
          : undefined;
        const endDate = input?.endDate ? new Date(input.endDate) : undefined;

        return await getEmailEngagementMetrics(startDate, endDate);
      }
    ),

  /**
   * Get email performance breakdown by source (blog article)
   */
  getPerformanceBySource: publicProcedure.query(async () => {
    return await getEmailPerformanceBySource();
  }),
});
