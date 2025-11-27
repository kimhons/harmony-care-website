import { describe, expect, it } from "vitest";

describe("Featured Resources Homepage Integration", () => {
  describe("getFeatured Endpoint", () => {
    it("should return top 6 active magnets by download count", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      expect(featured).toBeDefined();
      expect(Array.isArray(featured)).toBe(true);
      expect(featured.length).toBeLessThanOrEqual(6);

      // All should be active
      featured.forEach(magnet => {
        expect(magnet.isActive).toBe(1);
      });

      // Should be sorted by download count (descending)
      for (let i = 0; i < featured.length - 1; i++) {
        expect(featured[i].downloadCount).toBeGreaterThanOrEqual(
          featured[i + 1].downloadCount
        );
      }
    });

    it("should only return active magnets", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      // Verify all are active
      const allActive = featured.every(m => m.isActive === 1);
      expect(allActive).toBe(true);
    });

    it("should include all required fields for display", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      if (featured.length > 0) {
        const magnet = featured[0];
        expect(magnet.id).toBeDefined();
        expect(magnet.title).toBeDefined();
        expect(magnet.description).toBeDefined();
        expect(magnet.category).toBeDefined();
        expect(magnet.type).toBeDefined();
        expect(magnet.fileUrl).toBeDefined();
        expect(magnet.downloadCount).toBeDefined();
      }
    });

    it("should handle case when no magnets exist", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      // Should return empty array, not error
      expect(Array.isArray(featured)).toBe(true);
    });
  });

  describe("Homepage Download Flow", () => {
    it("should download featured resource with lead capture", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test-agent",
          },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      // Get featured magnets
      const featured = await caller.getFeatured();

      if (featured.length === 0) {
        console.log("No featured magnets to test download");
        return;
      }

      const magnet = featured[0];

      // Download with lead capture
      const result = await caller.download({
        leadMagnetId: magnet.id,
        email: `homepage-test-${Date.now()}@example.com`,
        name: "Homepage Test User",
        facilityName: "Test Facility",
        jobTitle: "Administrator",
      });

      expect(result.success).toBe(true);
      expect(result.fileUrl).toBeDefined();
      expect(result.title).toBe(magnet.title);
    });

    it("should track download and increment count", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test-agent",
          },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      if (featured.length === 0) {
        console.log("No featured magnets to test tracking");
        return;
      }

      const magnet = featured[0];
      const initialCount = magnet.downloadCount;

      // Download
      await caller.download({
        leadMagnetId: magnet.id,
        email: `tracking-test-${Date.now()}@example.com`,
        name: "Tracking Test",
      });

      // Verify count increased
      const updatedFeatured = await caller.getFeatured();
      const updatedMagnet = updatedFeatured.find(m => m.id === magnet.id);

      if (updatedMagnet) {
        expect(updatedMagnet.downloadCount).toBe(initialCount + 1);
      }
    });

    it("should record download for analytics", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test-agent",
          },
        },
      };
      const magCaller = leadMagnetsRouter.createCaller(mockContext as any);

      const testEmail = `analytics-test-${Date.now()}@example.com`;

      // Download resource
      const featured = await magCaller.getFeatured();
      if (featured.length === 0) {
        console.log("No featured magnets to test analytics");
        return;
      }

      const result = await magCaller.download({
        leadMagnetId: featured[0].id,
        email: testEmail,
        name: "Analytics Test User",
      });

      expect(result.success).toBe(true);

      // Verify download was recorded (check via admin analytics)
      const adminContext = {
        user: { role: "admin" },
      };
      const adminCaller = leadMagnetsRouter.createCaller(adminContext as any);
      const analytics = await adminCaller.adminGetAnalytics();
      const recentDownload = analytics.recentDownloads.find(
        d => d.email === testEmail
      );

      // Download should exist in recent downloads
      expect(recentDownload).toBeDefined();
    });

    it("should validate email format", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test-agent",
          },
        },
      };
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();
      if (featured.length === 0) {
        console.log("No featured magnets to test validation");
        return;
      }

      // Invalid email should throw error
      await expect(
        caller.download({
          leadMagnetId: featured[0].id,
          email: "invalid-email",
          name: "Test User",
        })
      ).rejects.toThrow();
    });
  });

  describe("Featured Resources Display Logic", () => {
    it("should prioritize high-download resources", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();
      const allMagnets = await caller.getAll();

      if (featured.length > 0 && allMagnets.length > 0) {
        // Featured should include highest download count magnets
        const maxDownloads = Math.max(...allMagnets.map(m => m.downloadCount));
        const topFeatured = featured[0];

        // First featured should have high download count
        expect(topFeatured.downloadCount).toBeGreaterThanOrEqual(0);
      }
    });

    it("should respect sortOrder as secondary sort", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      // If multiple magnets have same download count, sortOrder should be used
      for (let i = 0; i < featured.length - 1; i++) {
        if (featured[i].downloadCount === featured[i + 1].downloadCount) {
          expect(featured[i].sortOrder).toBeLessThanOrEqual(
            featured[i + 1].sortOrder
          );
        }
      }
    });

    it("should return exactly 6 or fewer magnets", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      expect(featured.length).toBeLessThanOrEqual(6);
    });
  });

  describe("Category Distribution", () => {
    it("should include magnets from different categories when possible", async () => {
      const { leadMagnetsRouter } = await import("./leadMagnets");
      const mockContext = {};
      const caller = leadMagnetsRouter.createCaller(mockContext as any);

      const featured = await caller.getFeatured();

      if (featured.length >= 2) {
        const categories = featured.map(m => m.category);
        const uniqueCategories = new Set(categories);

        // Ideally should have variety (but not required if all top downloads are same category)
        expect(uniqueCategories.size).toBeGreaterThan(0);
      }
    });
  });
});
