import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getDb } from "./db";
import { calculatorLeads } from "../drizzle/schema";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const adminUser: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@harmonycare.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: adminUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function createNonAdminContext(): TrpcContext {
  const regularUser: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user: regularUser,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("adminCalculatorLeads.getLeads", () => {
  it("should return leads data with pagination for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    expect(result).toHaveProperty("leads");
    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("page");
    expect(result).toHaveProperty("pageSize");
    expect(result).toHaveProperty("totalPages");
    expect(Array.isArray(result.leads)).toBe(true);
    expect(typeof result.total).toBe("number");
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(50);
  });

  it("should throw FORBIDDEN error for non-admin users", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.adminCalculatorLeads.getLeads({})
    ).rejects.toThrow("Admin access required");
  });

  it("should respect pagination parameters", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({
      page: 2,
      pageSize: 10,
    });

    expect(result.page).toBe(2);
    expect(result.pageSize).toBe(10);
    expect(result.leads.length).toBeLessThanOrEqual(10);
  });

  it("should filter by facility type", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({
      facilityType: "Group Home",
    });

    result.leads.forEach((lead) => {
      expect(lead.facilityType).toBe("Group Home");
    });
  });

  it("should filter by source", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({
      source: "calculator",
    });

    result.leads.forEach((lead) => {
      expect(lead.source).toBe("calculator");
    });
  });

  it("should search by email", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // First, let's get all leads to find a valid email
    const allLeads = await caller.adminCalculatorLeads.getLeads({});
    
    if (allLeads.leads.length > 0) {
      const searchEmail = allLeads.leads[0].email.substring(0, 5);
      
      const result = await caller.adminCalculatorLeads.getLeads({
        search: searchEmail,
      });

      result.leads.forEach((lead) => {
        expect(
          lead.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
          (lead.name && lead.name.toLowerCase().includes(searchEmail.toLowerCase())) ||
          (lead.facilityName && lead.facilityName.toLowerCase().includes(searchEmail.toLowerCase()))
        ).toBe(true);
      });
    }
  });

  it("should sort by createdAt in descending order by default", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    if (result.leads.length > 1) {
      for (let i = 0; i < result.leads.length - 1; i++) {
        const current = new Date(result.leads[i].createdAt).getTime();
        const next = new Date(result.leads[i + 1].createdAt).getTime();
        expect(current).toBeGreaterThanOrEqual(next);
      }
    }
  });

  it("should sort by annualSavings when specified", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({
      sortBy: "annualSavings",
      sortOrder: "desc",
    });

    if (result.leads.length > 1) {
      for (let i = 0; i < result.leads.length - 1; i++) {
        expect(result.leads[i].annualSavings).toBeGreaterThanOrEqual(
          result.leads[i + 1].annualSavings
        );
      }
    }
  });
});

describe("adminCalculatorLeads.getStats", () => {
  it("should return statistics for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    expect(result).toHaveProperty("total");
    expect(result).toHaveProperty("bySource");
    expect(result).toHaveProperty("byFacilityType");
    expect(result).toHaveProperty("avgSavings");
    expect(result).toHaveProperty("byUtmSource");
    expect(result).toHaveProperty("leadsOverTime");
    
    expect(typeof result.total).toBe("number");
    expect(Array.isArray(result.bySource)).toBe(true);
    expect(Array.isArray(result.byFacilityType)).toBe(true);
    expect(typeof result.avgSavings).toBe("number");
    expect(Array.isArray(result.byUtmSource)).toBe(true);
    expect(Array.isArray(result.leadsOverTime)).toBe(true);
  });

  it("should throw FORBIDDEN error for non-admin users", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.adminCalculatorLeads.getStats()
    ).rejects.toThrow("Admin access required");
  });

  it("should have valid bySource structure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    result.bySource.forEach((item) => {
      expect(item).toHaveProperty("source");
      expect(item).toHaveProperty("count");
      expect(typeof item.source).toBe("string");
      expect(typeof item.count).toBe("number");
    });
  });

  it("should have valid byFacilityType structure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    result.byFacilityType.forEach((item) => {
      expect(item).toHaveProperty("facilityType");
      expect(item).toHaveProperty("count");
      expect(typeof item.facilityType).toBe("string");
      expect(typeof item.count).toBe("number");
    });
  });

  it("should have valid byUtmSource structure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    result.byUtmSource.forEach((item) => {
      expect(item).toHaveProperty("utmSource");
      expect(item).toHaveProperty("count");
      expect(typeof item.utmSource).toBe("string");
      expect(typeof item.count).toBe("number");
    });
  });

  it("should have valid leadsOverTime structure", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    result.leadsOverTime.forEach((item) => {
      expect(item).toHaveProperty("date");
      expect(item).toHaveProperty("count");
      expect(typeof item.date).toBe("string");
      expect(typeof item.count).toBe("number");
    });
  });

  it("should calculate average savings correctly", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.adminCalculatorLeads.getStats();
    const leads = await caller.adminCalculatorLeads.getLeads({});

    if (leads.total > 0) {
      const manualAvg = Math.round(
        leads.leads.reduce((sum, lead) => sum + lead.annualSavings, 0) / leads.leads.length
      );
      
      // Allow for small rounding differences
      expect(Math.abs(stats.avgSavings - manualAvg)).toBeLessThan(1000);
    }
  });

  it("should sum source counts to total", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getStats();

    const sumOfSources = result.bySource.reduce((sum, item) => sum + item.count, 0);
    expect(sumOfSources).toBe(result.total);
  });
});

describe("adminCalculatorLeads.exportToCSV", () => {
  it("should return CSV data for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.exportToCSV();

    expect(result).toHaveProperty("csv");
    expect(result).toHaveProperty("filename");
    expect(typeof result.csv).toBe("string");
    expect(typeof result.filename).toBe("string");
    expect(result.filename).toMatch(/calculator-leads-.*\.csv/);
  });

  it("should throw FORBIDDEN error for non-admin users", async () => {
    const ctx = createNonAdminContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.adminCalculatorLeads.exportToCSV()
    ).rejects.toThrow("Admin access required");
  });

  it("should have valid CSV headers", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.exportToCSV();
    const lines = result.csv.split("\n");
    const headers = lines[0];

    expect(headers).toContain("ID");
    expect(headers).toContain("Email");
    expect(headers).toContain("Facility Type");
    expect(headers).toContain("Resident Count");
    expect(headers).toContain("Annual Savings");
    expect(headers).toContain("Source");
    expect(headers).toContain("UTM Source");
  });

  it("should include all leads in CSV", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const leads = await caller.adminCalculatorLeads.getLeads({ pageSize: 100 });
    const csv = await caller.adminCalculatorLeads.exportToCSV();
    
    const csvLines = csv.csv.split("\n").filter(line => line.trim());
    // Subtract 1 for header row
    const csvRowCount = csvLines.length - 1;
    
    // CSV should have at least as many rows as we have leads (might have more if there are more than 100)
    expect(csvRowCount).toBeGreaterThanOrEqual(Math.min(leads.leads.length, leads.total));
  });
});

describe("adminCalculatorLeads - data integrity", () => {
  it("should have consistent total counts between getLeads and getStats", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const leads = await caller.adminCalculatorLeads.getLeads({});
    const stats = await caller.adminCalculatorLeads.getStats();

    expect(leads.total).toBe(stats.total);
  });

  it("should have all required fields in lead records", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    result.leads.forEach((lead) => {
      expect(lead).toHaveProperty("id");
      expect(lead).toHaveProperty("email");
      expect(lead).toHaveProperty("facilityType");
      expect(lead).toHaveProperty("residentCount");
      expect(lead).toHaveProperty("annualSavings");
      expect(lead).toHaveProperty("source");
      expect(lead).toHaveProperty("createdAt");
      
      expect(typeof lead.id).toBe("number");
      expect(typeof lead.email).toBe("string");
      expect(typeof lead.facilityType).toBe("string");
      expect(typeof lead.residentCount).toBe("number");
      expect(typeof lead.annualSavings).toBe("number");
      expect(typeof lead.source).toBe("string");
      expect(lead.createdAt instanceof Date).toBe(true);
    });
  });

  it("should have valid source values", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    result.leads.forEach((lead) => {
      expect(["calculator", "exit-intent"]).toContain(lead.source);
    });
  });

  it("should have non-negative savings values", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    result.leads.forEach((lead) => {
      expect(lead.annualSavings).toBeGreaterThanOrEqual(0);
      expect(lead.overtimeSavings).toBeGreaterThanOrEqual(0);
      expect(lead.errorSavings).toBeGreaterThanOrEqual(0);
      expect(lead.complianceSavings).toBeGreaterThanOrEqual(0);
      expect(lead.retentionSavings).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have valid email format", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.adminCalculatorLeads.getLeads({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    result.leads.forEach((lead) => {
      expect(emailRegex.test(lead.email)).toBe(true);
    });
  });
});
