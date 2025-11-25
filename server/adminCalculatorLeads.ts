import { protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";
import { desc, asc, like, and, gte, lte, eq, sql } from "drizzle-orm";

export const adminCalculatorLeadsRouter = router({
  /**
   * Get all calculator leads with filtering and pagination
   */
  getLeads: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(50),
        search: z.string().optional(),
        facilityType: z.string().optional(),
        source: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        sortBy: z.enum(['createdAt', 'annualSavings', 'residentCount']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ input, ctx }) => {
      // Check if user is admin
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Admin access required',
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Database not available',
        });
      }

      // Build where conditions
      const conditions = [];
      
      if (input.search) {
        conditions.push(
          sql`(${calculatorLeads.email} LIKE ${`%${input.search}%`} OR ${calculatorLeads.name} LIKE ${`%${input.search}%`} OR ${calculatorLeads.facilityName} LIKE ${`%${input.search}%`})`
        );
      }
      
      if (input.facilityType) {
        conditions.push(eq(calculatorLeads.facilityType, input.facilityType));
      }
      
      if (input.source) {
        conditions.push(eq(calculatorLeads.source, input.source));
      }
      
      if (input.dateFrom) {
        conditions.push(gte(calculatorLeads.createdAt, new Date(input.dateFrom)));
      }
      
      if (input.dateTo) {
        conditions.push(lte(calculatorLeads.createdAt, new Date(input.dateTo)));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Get total count
      const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(calculatorLeads)
        .where(whereClause);
      
      const total = Number(countResult[0]?.count || 0);

      // Get paginated results
      const offset = (input.page - 1) * input.pageSize;
      const orderByColumn = calculatorLeads[input.sortBy];
      const orderFn = input.sortOrder === 'asc' ? asc : desc;

      const leads = await db
        .select()
        .from(calculatorLeads)
        .where(whereClause)
        .orderBy(orderFn(orderByColumn))
        .limit(input.pageSize)
        .offset(offset);

      return {
        leads,
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize),
      };
    }),

  /**
   * Get calculator leads statistics
   */
  getStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Admin access required',
      });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database not available',
      });
    }

    // Total leads
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(calculatorLeads);
    const total = Number(totalResult[0]?.count || 0);

    // Leads by source
    const sourceResult = await db
      .select({
        source: calculatorLeads.source,
        count: sql<number>`count(*)`,
      })
      .from(calculatorLeads)
      .groupBy(calculatorLeads.source);

    // Leads by facility type
    const facilityTypeResult = await db
      .select({
        facilityType: calculatorLeads.facilityType,
        count: sql<number>`count(*)`,
      })
      .from(calculatorLeads)
      .groupBy(calculatorLeads.facilityType);

    // Average savings
    const avgSavingsResult = await db
      .select({
        avgSavings: sql<number>`AVG(${calculatorLeads.annualSavings})`,
      })
      .from(calculatorLeads);
    const avgSavings = Math.round(Number(avgSavingsResult[0]?.avgSavings || 0));

    // Leads by UTM source
    const utmSourceResult = await db
      .select({
        utmSource: calculatorLeads.utmSource,
        count: sql<number>`count(*)`,
      })
      .from(calculatorLeads)
      .where(sql`${calculatorLeads.utmSource} IS NOT NULL`)
      .groupBy(calculatorLeads.utmSource);

    // Leads over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const leadsOverTimeResult = await db
      .select({
        date: sql<string>`DATE(${calculatorLeads.createdAt}) as date`,
        count: sql<number>`count(*) as count`,
      })
      .from(calculatorLeads)
      .where(gte(calculatorLeads.createdAt, thirtyDaysAgo))
      .groupBy(sql`date`)
      .orderBy(sql`date`);

    return {
      total,
      bySource: sourceResult.map(r => ({ source: r.source || 'unknown', count: Number(r.count) })),
      byFacilityType: facilityTypeResult.map(r => ({ facilityType: r.facilityType, count: Number(r.count) })),
      avgSavings,
      byUtmSource: utmSourceResult.map(r => ({ utmSource: r.utmSource || 'unknown', count: Number(r.count) })),
      leadsOverTime: leadsOverTimeResult.map(r => ({ date: r.date, count: Number(r.count) })),
    };
  }),

  /**
   * Export calculator leads to CSV
   */
  exportToCSV: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Admin access required',
      });
    }

    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database not available',
      });
    }

    const leads = await db
      .select()
      .from(calculatorLeads)
      .orderBy(desc(calculatorLeads.createdAt));

    // Convert to CSV format
    const headers = [
      'ID', 'Email', 'Name', 'Facility Name', 'Facility Type', 'Resident Count',
      'Annual Savings', 'Overtime Savings', 'Error Savings', 'Compliance Savings', 'Retention Savings',
      'Source', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
      'Email Sent', 'Email Sent At', 'Created At'
    ];

    const rows = leads.map(lead => [
      lead.id,
      lead.email,
      lead.name || '',
      lead.facilityName || '',
      lead.facilityType,
      lead.residentCount,
      lead.annualSavings,
      lead.overtimeSavings,
      lead.errorSavings,
      lead.complianceSavings,
      lead.retentionSavings,
      lead.source,
      lead.utmSource || '',
      lead.utmMedium || '',
      lead.utmCampaign || '',
      lead.utmTerm || '',
      lead.utmContent || '',
      lead.emailSent ? 'Yes' : 'No',
      lead.emailSentAt?.toISOString() || '',
      lead.createdAt.toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return {
      csv: csvContent,
      filename: `calculator-leads-${new Date().toISOString().split('T')[0]}.csv`,
    };
  }),
});
