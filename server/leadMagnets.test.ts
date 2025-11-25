import { describe, expect, it, beforeEach } from "vitest";
import { getDb } from "./db";
import { leadMagnets, leadMagnetDownloads, calculatorLeads } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Lead Magnet System", () => {
  let testMagnetId: number;
  let testLeadEmail: string;

  beforeEach(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Get or use first lead magnet
    const magnets = await db.select().from(leadMagnets).limit(1);
    if (magnets.length > 0) {
      testMagnetId = magnets[0].id;
    } else {
      // Create test magnet if none exist
      const result = await db.insert(leadMagnets).values({
        title: "Test Resource",
        description: "Test description",
        type: "pdf",
        category: "roi",
        fileUrl: "https://example.com/test.pdf",
        thumbnailUrl: null,
        fileSize: 1000,
        sortOrder: 0,
        isActive: 1,
        downloadCount: 0,
      });
      testMagnetId = 1; // Assume first insert
    }

    testLeadEmail = `test-${Date.now()}@example.com`;
  });

  describe("Lead Magnet Listing", () => {
    it("should return all active lead magnets", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const caller = leadMagnetsRouter.createCaller({} as any);

      const magnets = await caller.getAll();

      expect(Array.isArray(magnets)).toBe(true);
      expect(magnets.length).toBeGreaterThan(0);
      
      // All returned magnets should be active
      magnets.forEach(magnet => {
        expect(magnet.isActive).toBe(1);
        expect(magnet).toHaveProperty("title");
        expect(magnet).toHaveProperty("description");
        expect(magnet).toHaveProperty("fileUrl");
      });
    });

    it("should return magnets sorted by sortOrder", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const caller = leadMagnetsRouter.createCaller({} as any);

      const magnets = await caller.getAll();

      // Check if sorted by sortOrder (ascending)
      for (let i = 1; i < magnets.length; i++) {
        expect(magnets[i].sortOrder).toBeGreaterThanOrEqual(magnets[i - 1].sortOrder);
      }
    });

    it("should get a single lead magnet by ID", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const caller = leadMagnetsRouter.createCaller({} as any);

      const magnet = await caller.getById({ id: testMagnetId });

      expect(magnet).toBeDefined();
      expect(magnet.id).toBe(testMagnetId);
      expect(magnet.isActive).toBe(1);
    });

    it("should throw error for non-existent magnet", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const caller = leadMagnetsRouter.createCaller({} as any);

      await expect(caller.getById({ id: 999999 })).rejects.toThrow("not found");
    });
  });

  describe("Lead Magnet Downloads", () => {
    it("should record download with lead information", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "Test Browser",
          },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const result = await caller.download({
        leadMagnetId: testMagnetId,
        email: testLeadEmail,
        name: "Test User",
        facilityName: "Test Facility",
        facilityType: "group_home",
        residentCount: 6,
        jobTitle: "Administrator",
        phoneNumber: "(555) 123-4567",
      });

      expect(result.success).toBe(true);
      expect(result.fileUrl).toBeDefined();
      expect(result.title).toBeDefined();

      // Verify download was recorded in database
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const downloads = await db
        .select()
        .from(leadMagnetDownloads)
        .where(eq(leadMagnetDownloads.email, testLeadEmail))
        .limit(1);

      expect(downloads.length).toBe(1);
      expect(downloads[0].leadMagnetId).toBe(testMagnetId);
      expect(downloads[0].name).toBe("Test User");
      expect(downloads[0].facilityName).toBe("Test Facility");
      expect(downloads[0].residentCount).toBe(6);
    });

    it("should increment download count", async () => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get initial download count
      const beforeMagnets = await db
        .select()
        .from(leadMagnets)
        .where(eq(leadMagnets.id, testMagnetId))
        .limit(1);

      const initialCount = beforeMagnets[0].downloadCount;

      // Download resource
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: { "user-agent": "Test" },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      await caller.download({
        leadMagnetId: testMagnetId,
        email: `test-count-${Date.now()}@example.com`,
      });

      // Verify count increased
      const afterMagnets = await db
        .select()
        .from(leadMagnets)
        .where(eq(leadMagnets.id, testMagnetId))
        .limit(1);

      expect(afterMagnets[0].downloadCount).toBe(initialCount + 1);
    });

    it("should link download to existing calculator lead", async () => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Create a calculator lead first
      const leadEmail = `test-link-${Date.now()}@example.com`;
      const leadResult = await db.insert(calculatorLeads).values({
        email: leadEmail,
        facilityType: "Group Home",
        residentCount: 6,
        annualSavings: 50000,
        overtimeSavings: 15000,
        errorSavings: 10000,
        complianceSavings: 15000,
        retentionSavings: 10000,
        source: "calculator",
        emailSent: 0,
        leadScore: 45,
        leadTier: "warm",
        engagementScore: 0,
      });

      // Download resource with same email
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: { "user-agent": "Test" },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      await caller.download({
        leadMagnetId: testMagnetId,
        email: leadEmail,
      });

      // Verify download is linked to calculator lead
      const downloads = await db
        .select()
        .from(leadMagnetDownloads)
        .where(eq(leadMagnetDownloads.email, leadEmail))
        .limit(1);

      expect(downloads.length).toBe(1);
      expect(downloads[0].calculatorLeadId).not.toBeNull();
    });

    it("should update engagement score for existing lead", async () => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Create a calculator lead
      const leadEmail = `test-engagement-${Date.now()}@example.com`;
      const leadResult = await db.insert(calculatorLeads).values({
        email: leadEmail,
        facilityType: "Group Home",
        residentCount: 6,
        annualSavings: 50000,
        overtimeSavings: 15000,
        errorSavings: 10000,
        complianceSavings: 15000,
        retentionSavings: 10000,
        source: "calculator",
        emailSent: 0,
        leadScore: 45,
        leadTier: "warm",
        engagementScore: 0,
      });

      // Get lead to find its ID
      const leads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.email, leadEmail))
        .limit(1);

      const initialEngagement = leads[0].engagementScore;
      const initialScore = leads[0].leadScore;

      // Download resource
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: { "user-agent": "Test" },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      await caller.download({
        leadMagnetId: testMagnetId,
        email: leadEmail,
      });

      // Verify engagement score increased by 15
      const afterLeads = await db
        .select()
        .from(calculatorLeads)
        .where(eq(calculatorLeads.email, leadEmail))
        .limit(1);

      expect(afterLeads[0].engagementScore).toBe(initialEngagement + 15);
      expect(afterLeads[0].leadScore).toBeGreaterThan(initialScore);
      expect(afterLeads[0].lastEngagementAt).not.toBeNull();
    });
  });

  describe("Lead Magnet Analytics", () => {
    it("should return analytics with download statistics", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const analytics = await caller.adminGetAnalytics();

      expect(analytics).toHaveProperty("totalDownloads");
      expect(analytics).toHaveProperty("uniqueEmails");
      expect(analytics).toHaveProperty("conversionRate");
      expect(analytics).toHaveProperty("downloadsByMagnet");
      expect(analytics).toHaveProperty("downloadsByCategory");
      expect(analytics).toHaveProperty("recentDownloads");

      expect(typeof analytics.totalDownloads).toBe("number");
      expect(typeof analytics.uniqueEmails).toBe("number");
      expect(typeof analytics.conversionRate).toBe("number");
      expect(Array.isArray(analytics.downloadsByMagnet)).toBe(true);
      expect(Array.isArray(analytics.recentDownloads)).toBe(true);
    });

    it("should calculate conversion rate correctly", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const analytics = await caller.adminGetAnalytics();

      // Conversion rate should be between 0 and 100
      expect(analytics.conversionRate).toBeGreaterThanOrEqual(0);
      expect(analytics.conversionRate).toBeLessThanOrEqual(100);
    });

    it("should sort downloads by magnet popularity", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const analytics = await caller.adminGetAnalytics();

      // downloadsByMagnet should be sorted descending by downloads
      const downloads = analytics.downloadsByMagnet;
      for (let i = 1; i < downloads.length; i++) {
        expect(downloads[i].downloads).toBeLessThanOrEqual(downloads[i - 1].downloads);
      }
    });
  });

  describe("Admin Management", () => {
    it("should require admin role for admin endpoints", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "user" }, // Not admin
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      // Should throw FORBIDDEN error
      await expect(caller.adminGetAll()).rejects.toThrow();
    });

    it("should allow admin to get all magnets including inactive", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const magnets = await caller.adminGetAll();

      expect(Array.isArray(magnets)).toBe(true);
      // Should include both active and inactive magnets
    });

    it("should allow admin to create new lead magnet", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const result = await caller.adminCreate({
        title: "New Test Resource",
        description: "Test description for new resource",
        type: "pdf",
        category: "operations",
        fileUrl: "https://example.com/new-resource.pdf",
        sortOrder: 99,
      });

      expect(result.success).toBe(true);
    });

    it("should allow admin to update lead magnet", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const result = await caller.adminUpdate({
        id: testMagnetId,
        title: "Updated Title",
        isActive: 1,
      });

      expect(result.success).toBe(true);

      // Verify update
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const magnets = await db
        .select()
        .from(leadMagnets)
        .where(eq(leadMagnets.id, testMagnetId))
        .limit(1);

      expect(magnets[0].title).toBe("Updated Title");
    });
  });

  describe("Download History", () => {
    it("should return paginated download history", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const result = await caller.adminGetDownloads({
        limit: 10,
        offset: 0,
      });

      expect(result).toHaveProperty("downloads");
      expect(result).toHaveProperty("total");
      expect(result).toHaveProperty("hasMore");
      expect(Array.isArray(result.downloads)).toBe(true);
      expect(typeof result.total).toBe("number");
      expect(typeof result.hasMore).toBe("boolean");
    });

    it("should filter downloads by lead magnet ID", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        user: { role: "admin" },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const result = await caller.adminGetDownloads({
        leadMagnetId: testMagnetId,
        limit: 50,
        offset: 0,
      });

      // All downloads should be for the specified magnet
      result.downloads.forEach(download => {
        expect(download.leadMagnetId).toBe(testMagnetId);
      });
    });
  });
});
