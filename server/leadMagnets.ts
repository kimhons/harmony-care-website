import { publicProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { leadMagnets, leadMagnetDownloads, calculatorLeads } from "../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { trackEngagement } from "./leadScoringService";

/**
 * Lead Magnet Library System
 * 
 * Provides downloadable resources (PDFs, checklists, guides) to capture
 * detailed lead information and boost engagement scores.
 * 
 * Features:
 * - Public library of lead magnets
 * - Gated downloads with lead capture form
 * - Download tracking and analytics
 * - Integration with lead scoring (+15 points per download)
 * - Admin management interface
 */

export const leadMagnetsRouter = router({
  /**
   * Get featured lead magnets for homepage
   * Returns top 3 active magnets by download count
   */
  getFeatured: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const magnets = await db
      .select()
      .from(leadMagnets)
      .where(eq(leadMagnets.isActive, 1))
      .orderBy(desc(leadMagnets.downloadCount), leadMagnets.sortOrder)
      .limit(3);

    return magnets;
  }),

  /**
   * Get all active lead magnets for public display
   */
  getAll: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const magnets = await db
      .select()
      .from(leadMagnets)
      .where(eq(leadMagnets.isActive, 1))
      .orderBy(leadMagnets.sortOrder, leadMagnets.createdAt);

    return magnets;
  }),

  /**
   * Get a single lead magnet by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const magnets = await db
        .select()
        .from(leadMagnets)
        .where(and(
          eq(leadMagnets.id, input.id),
          eq(leadMagnets.isActive, 1)
        ))
        .limit(1);

      if (magnets.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lead magnet not found",
        });
      }

      return magnets[0];
    }),

  /**
   * Download a lead magnet (with lead capture)
   * 
   * This endpoint:
   * 1. Validates and stores lead information
   * 2. Links to existing calculator lead if email matches
   * 3. Tracks download in leadMagnetDownloads table
   * 4. Updates engagement score (+15 points)
   * 5. Increments download count
   * 6. Returns file URL for download
   */
  download: publicProcedure
    .input(
      z.object({
        leadMagnetId: z.number(),
        email: z.string().email(),
        name: z.string().optional(),
        facilityName: z.string().optional(),
        facilityType: z.string().optional(),
        residentCount: z.number().optional(),
        jobTitle: z.string().optional(),
        phoneNumber: z.string().optional(),
        utmSource: z.string().optional(),
        utmMedium: z.string().optional(),
        utmCampaign: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      // Get lead magnet
      const magnets = await db
        .select()
        .from(leadMagnets)
        .where(eq(leadMagnets.id, input.leadMagnetId))
        .limit(1);

      if (magnets.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lead magnet not found",
        });
      }

      const magnet = magnets[0];

      // Check if email matches existing calculator lead
      let calculatorLeadId: number | null = null;
      const existingLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.email, input.email))
        .limit(1);

      if (existingLeads.length > 0) {
        calculatorLeadId = existingLeads[0].id;

        // Track engagement for existing lead (+15 points for download)
        try {
          await trackEngagement(calculatorLeadId, "resource_download");
          console.log(`[LeadMagnet] Tracked download for calculator lead ${calculatorLeadId}`);
        } catch (error) {
          console.error(`[LeadMagnet] Error tracking engagement:`, error);
          // Don't fail download if engagement tracking fails
        }
      }

      // Get IP address and user agent from request
      const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
      const userAgent = ctx.req.headers["user-agent"] || "unknown";

      // Record download
      await db.insert(leadMagnetDownloads).values({
        leadMagnetId: input.leadMagnetId,
        email: input.email,
        name: input.name || null,
        facilityName: input.facilityName || null,
        facilityType: input.facilityType || null,
        residentCount: input.residentCount || null,
        jobTitle: input.jobTitle || null,
        phoneNumber: input.phoneNumber || null,
        calculatorLeadId: calculatorLeadId,
        utmSource: input.utmSource || null,
        utmMedium: input.utmMedium || null,
        utmCampaign: input.utmCampaign || null,
        ipAddress: typeof ipAddress === "string" ? ipAddress : ipAddress?.[0] || "unknown",
        userAgent: typeof userAgent === "string" ? userAgent : "unknown",
      });

      // Increment download count
      await db
        .update(leadMagnets)
        .set({
          downloadCount: sql`${leadMagnets.downloadCount} + 1`,
        })
        .where(eq(leadMagnets.id, input.leadMagnetId));

      console.log(`[LeadMagnet] Download recorded: ${magnet.title} by ${input.email}`);

      return {
        success: true,
        fileUrl: magnet.fileUrl,
        title: magnet.title,
      };
    }),

  /**
   * Admin: Get all lead magnets (including inactive)
   */
  adminGetAll: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    const magnets = await db
      .select()
      .from(leadMagnets)
      .orderBy(leadMagnets.sortOrder, leadMagnets.createdAt);

    return magnets;
  }),

  /**
   * Admin: Create new lead magnet
   */
  adminCreate: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        type: z.string(),
        category: z.string(),
        fileUrl: z.string().url(),
        thumbnailUrl: z.string().url().optional(),
        fileSize: z.number().optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      await db.insert(leadMagnets).values({
        title: input.title,
        description: input.description,
        type: input.type,
        category: input.category,
        fileUrl: input.fileUrl,
        thumbnailUrl: input.thumbnailUrl || null,
        fileSize: input.fileSize || null,
        sortOrder: input.sortOrder,
        isActive: 1,
        downloadCount: 0,
      });

      return {
        success: true,
      };
    }),

  /**
   * Admin: Update lead magnet
   */
  adminUpdate: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        type: z.string().optional(),
        category: z.string().optional(),
        fileUrl: z.string().url().optional(),
        thumbnailUrl: z.string().url().optional(),
        fileSize: z.number().optional(),
        isActive: z.number().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      const { id, ...updates } = input;

      await db
        .update(leadMagnets)
        .set(updates)
        .where(eq(leadMagnets.id, id));

      return {
        success: true,
      };
    }),

  /**
   * Admin: Delete lead magnet
   */
  adminDelete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      await db.delete(leadMagnets).where(eq(leadMagnets.id, input.id));

      return {
        success: true,
      };
    }),

  /**
   * Admin: Get download analytics
   */
  adminGetAnalytics: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not available",
      });
    }

    // Get all downloads
    const downloads = await db
      .select()
      .from(leadMagnetDownloads)
      .orderBy(desc(leadMagnetDownloads.downloadedAt));

    // Get all magnets with download counts
    const magnets = await db.select().from(leadMagnets);

    // Calculate statistics
    const totalDownloads = downloads.length;
    const uniqueEmails = new Set(downloads.map(d => d.email)).size;
    
    // Downloads by magnet
    const downloadsByMagnet = magnets.map(magnet => ({
      id: magnet.id,
      title: magnet.title,
      downloads: downloads.filter(d => d.leadMagnetId === magnet.id).length,
    })).sort((a, b) => b.downloads - a.downloads);

    // Downloads by category
    const downloadsByCategory: Record<string, number> = {};
    magnets.forEach(magnet => {
      const count = downloads.filter(d => d.leadMagnetId === magnet.id).length;
      downloadsByCategory[magnet.category] = (downloadsByCategory[magnet.category] || 0) + count;
    });

    // Recent downloads
    const recentDownloads = downloads.slice(0, 10).map(d => {
      const magnet = magnets.find(m => m.id === d.leadMagnetId);
      return {
        id: d.id,
        email: d.email,
        name: d.name,
        facilityName: d.facilityName,
        magnetTitle: magnet?.title || "Unknown",
        downloadedAt: d.downloadedAt,
      };
    });

    // Conversion rate (downloads with calculator lead link)
    const downloadsWithLead = downloads.filter(d => d.calculatorLeadId !== null).length;
    const conversionRate = totalDownloads > 0 
      ? Math.round((downloadsWithLead / totalDownloads) * 100) 
      : 0;

    return {
      totalDownloads,
      uniqueEmails,
      conversionRate,
      downloadsByMagnet,
      downloadsByCategory,
      recentDownloads,
    };
  }),

  /**
   * Admin: Get downloads for a specific lead magnet
   */
  adminGetDownloads: adminProcedure
    .input(
      z.object({
        leadMagnetId: z.number().optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database not available",
        });
      }

      let query = db
        .select()
        .from(leadMagnetDownloads)
        .orderBy(desc(leadMagnetDownloads.downloadedAt))
        .limit(input.limit)
        .offset(input.offset);

      if (input.leadMagnetId) {
        query = query.where(eq(leadMagnetDownloads.leadMagnetId, input.leadMagnetId)) as any;
      }

      const downloads = await query;

      // Get total count
      const countQuery = input.leadMagnetId
        ? db.select({ count: sql<number>`count(*)` })
            .from(leadMagnetDownloads)
            .where(eq(leadMagnetDownloads.leadMagnetId, input.leadMagnetId))
        : db.select({ count: sql<number>`count(*)` })
            .from(leadMagnetDownloads);

      const countResult = await countQuery;
      const total = Number(countResult[0]?.count || 0);

      return {
        downloads,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),
});
