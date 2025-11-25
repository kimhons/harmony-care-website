import { describe, expect, it, beforeEach } from "vitest";
import {
  checkReferralMilestones,
  checkTierMilestones,
  checkLeaderboardMilestones,
  getAchievedMilestones,
  getMilestoneById,
  MILESTONES,
} from "../shared/milestones";

describe("Milestone System", () => {
  describe("Milestone Definitions", () => {
    it("defines all required milestones", () => {
      expect(MILESTONES.length).toBeGreaterThanOrEqual(8);
      
      const milestoneIds = MILESTONES.map(m => m.id);
      expect(milestoneIds).toContain("first-referral");
      expect(milestoneIds).toContain("bronze-tier");
      expect(milestoneIds).toContain("silver-tier");
      expect(milestoneIds).toContain("gold-tier");
      expect(milestoneIds).toContain("platinum-tier");
      expect(milestoneIds).toContain("diamond-tier");
      expect(milestoneIds).toContain("top-10-leaderboard");
      expect(milestoneIds).toContain("top-3-leaderboard");
    });

    it("each milestone has required properties", () => {
      MILESTONES.forEach(milestone => {
        expect(milestone).toHaveProperty("id");
        expect(milestone).toHaveProperty("type");
        expect(milestone).toHaveProperty("title");
        expect(milestone).toHaveProperty("description");
        expect(milestone).toHaveProperty("trigger");
        expect(milestone).toHaveProperty("badge");
        expect(milestone).toHaveProperty("celebrationMessage");
        expect(milestone).toHaveProperty("socialPosts");
        
        expect(typeof milestone.id).toBe("string");
        expect(typeof milestone.title).toBe("string");
        expect(typeof milestone.badge).toBe("string");
        expect(milestone.socialPosts).toHaveProperty("linkedin");
        expect(milestone.socialPosts).toHaveProperty("twitter");
        expect(milestone.socialPosts).toHaveProperty("facebook");
      });
    });

    it("milestone badges point to valid paths", () => {
      MILESTONES.forEach(milestone => {
        expect(milestone.badge).toMatch(/^\/milestones\/.+\.png$/);
      });
    });

    it("social posts are non-empty", () => {
      MILESTONES.forEach(milestone => {
        expect(milestone.socialPosts.linkedin.length).toBeGreaterThan(50);
        expect(milestone.socialPosts.twitter.length).toBeGreaterThan(20);
        expect(milestone.socialPosts.facebook.length).toBeGreaterThan(50);
      });
    });
  });

  describe("Referral Count Milestones", () => {
    it("detects first referral milestone", () => {
      const milestones = checkReferralMilestones(1);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("first-referral");
      expect(milestones[0].trigger.referralCount).toBe(1);
    });

    it("returns empty array for non-milestone counts", () => {
      expect(checkReferralMilestones(2).length).toBe(0);
      expect(checkReferralMilestones(4).length).toBe(0);
      expect(checkReferralMilestones(6).length).toBe(0);
    });

    it("does not trigger milestones for zero referrals", () => {
      const milestones = checkReferralMilestones(0);
      expect(milestones.length).toBe(0);
    });
  });

  describe("Tier Upgrade Milestones", () => {
    it("detects Bronze tier milestone", () => {
      const milestones = checkTierMilestones("Bronze Advocate", 3);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("bronze-tier");
      expect(milestones[0].trigger.tierName).toBe("Bronze Advocate");
    });

    it("detects Silver tier milestone", () => {
      const milestones = checkTierMilestones("Silver Champion", 5);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("silver-tier");
      expect(milestones[0].trigger.tierName).toBe("Silver Champion");
    });

    it("detects Gold tier milestone", () => {
      const milestones = checkTierMilestones("Gold Ambassador", 8);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("gold-tier");
      expect(milestones[0].trigger.tierName).toBe("Gold Ambassador");
    });

    it("detects Platinum tier milestone", () => {
      const milestones = checkTierMilestones("Platinum Partner", 12);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("platinum-tier");
      expect(milestones[0].trigger.tierName).toBe("Platinum Partner");
    });

    it("detects Diamond tier milestone", () => {
      const milestones = checkTierMilestones("Diamond Elite", 20);
      
      expect(milestones.length).toBe(1);
      expect(milestones[0].id).toBe("diamond-tier");
      expect(milestones[0].trigger.tierName).toBe("Diamond Elite");
    });

    it("returns empty for non-matching tier", () => {
      const milestones = checkTierMilestones("Unknown Tier", 5);
      expect(milestones.length).toBe(0);
    });
  });

  describe("Leaderboard Milestones", () => {
    it("detects top 10 milestone", () => {
      const milestones = checkLeaderboardMilestones(10);
      
      expect(milestones.length).toBeGreaterThanOrEqual(1);
      expect(milestones.some(m => m.id === "top-10-leaderboard")).toBe(true);
    });

    it("detects top 3 milestone", () => {
      const milestones = checkLeaderboardMilestones(3);
      
      expect(milestones.length).toBeGreaterThanOrEqual(2);
      expect(milestones.some(m => m.id === "top-3-leaderboard")).toBe(true);
      expect(milestones.some(m => m.id === "top-10-leaderboard")).toBe(true);
    });

    it("detects position 1 gets all leaderboard milestones", () => {
      const milestones = checkLeaderboardMilestones(1);
      
      expect(milestones.length).toBeGreaterThanOrEqual(2);
      expect(milestones.some(m => m.id === "top-3-leaderboard")).toBe(true);
      expect(milestones.some(m => m.id === "top-10-leaderboard")).toBe(true);
    });

    it("returns empty for positions outside top 10", () => {
      expect(checkLeaderboardMilestones(11).length).toBe(0);
      expect(checkLeaderboardMilestones(50).length).toBe(0);
    });
  });

  describe("Get Milestone By ID", () => {
    it("retrieves milestone by ID", () => {
      const milestone = getMilestoneById("first-referral");
      
      expect(milestone).toBeDefined();
      expect(milestone?.id).toBe("first-referral");
      expect(milestone?.title).toContain("First Referral");
    });

    it("returns undefined for invalid ID", () => {
      const milestone = getMilestoneById("non-existent-milestone");
      expect(milestone).toBeUndefined();
    });
  });

  describe("Get Achieved Milestones", () => {
    it("returns all achieved milestones for user with 1 referral", () => {
      const achieved = getAchievedMilestones(1, "None");
      
      expect(achieved.length).toBeGreaterThanOrEqual(1);
      expect(achieved.some(m => m.id === "first-referral")).toBe(true);
    });

    it("returns all achieved milestones for Bronze tier", () => {
      const achieved = getAchievedMilestones(3, "Bronze Advocate");
      
      expect(achieved.length).toBeGreaterThanOrEqual(2);
      expect(achieved.some(m => m.id === "first-referral")).toBe(true);
      expect(achieved.some(m => m.id === "bronze-tier")).toBe(true);
    });

    it("returns all achieved milestones for Gold tier", () => {
      const achieved = getAchievedMilestones(8, "Gold Ambassador");
      
      // Should have first-referral (referralCount) + gold-tier (tier_upgrade)
      expect(achieved.length).toBeGreaterThanOrEqual(2);
      expect(achieved.some(m => m.id === "first-referral")).toBe(true);
      expect(achieved.some(m => m.id === "gold-tier")).toBe(true);
    });

    it("includes leaderboard milestones when position provided", () => {
      const achieved = getAchievedMilestones(10, "Platinum Partner", 5);
      
      expect(achieved.some(m => m.id === "top-10-leaderboard")).toBe(true);
    });

    it("returns empty for zero referrals", () => {
      const achieved = getAchievedMilestones(0, "None");
      expect(achieved.length).toBe(0);
    });
  });

  describe("Milestone Celebration Content", () => {
    it("first referral has celebratory tone", () => {
      const milestone = getMilestoneById("first-referral");
      
      expect(milestone?.celebrationMessage).toMatch(/congratulations|great|amazing/i);
      expect(milestone?.title).toContain("🎉");
    });

    it("tier milestones mention rewards", () => {
      const bronze = getMilestoneById("bronze-tier");
      const silver = getMilestoneById("silver-tier");
      const gold = getMilestoneById("gold-tier");
      
      expect(bronze?.celebrationMessage).toMatch(/\$25|credit/i);
      expect(silver?.celebrationMessage).toMatch(/\$100|credit/i);
      expect(gold?.celebrationMessage).toMatch(/\$250|credit|month free/i);
    });

    it("Diamond tier has premium messaging", () => {
      const diamond = getMilestoneById("diamond-tier");
      
      expect(diamond?.title).toContain("👑");
      expect(diamond?.celebrationMessage).toMatch(/legendary|elite|royalty/i);
    });

    it("leaderboard milestones have competitive messaging", () => {
      const top10 = getMilestoneById("top-10-leaderboard");
      const top3 = getMilestoneById("top-3-leaderboard");
      
      expect(top10?.title).toContain("🏆");
      expect(top3?.title).toContain("🥇");
      expect(top10?.celebrationMessage).toMatch(/top|leader/i);
      expect(top3?.celebrationMessage).toMatch(/top|leader|incredible/i);
    });
  });

  describe("Social Post Content", () => {
    it("LinkedIn posts are professional", () => {
      MILESTONES.forEach(milestone => {
        const post = milestone.socialPosts.linkedin;
        
        // Should have professional language
        expect(post).toMatch(/honored|proud|thrilled|excited/i);
        
        // Should mention HarmonyCare
        expect(post).toMatch(/HarmonyCare/i);
        
        // Should have hashtags
        expect(post).toMatch(/#\w+/);
      });
    });

    it("Twitter posts respect character limits", () => {
      MILESTONES.forEach(milestone => {
        const post = milestone.socialPosts.twitter;
        
        // Should be concise (with some buffer for customization)
        expect(post.length).toBeLessThanOrEqual(350);
        
        // Should mention @HarmonyCare
        expect(post).toMatch(/@HarmonyCare|HarmonyCare/i);
      });
    });

    it("Facebook posts are personal and engaging", () => {
      MILESTONES.forEach(milestone => {
        const post = milestone.socialPosts.facebook;
        
        // Should be longer and more personal
        expect(post.length).toBeGreaterThan(100);
        
        // Should mention HarmonyCare
        expect(post).toMatch(/HarmonyCare/i);
        
        // Should have emojis for engagement
        expect(post).toMatch(/[🎉💙👑💎🥇🥈🥉🏆]/);
      });
    });

    it("all posts mention key benefits", () => {
      const keyBenefits = ["60%", "paperwork", "AI", "caregiver", "care management"];
      
      MILESTONES.forEach(milestone => {
        const allPosts = [
          milestone.socialPosts.linkedin,
          milestone.socialPosts.twitter,
          milestone.socialPosts.facebook,
        ].join(" ");
        
        // At least one benefit should be mentioned
        const hasBenefit = keyBenefits.some(benefit => 
          allPosts.toLowerCase().includes(benefit.toLowerCase())
        );
        
        expect(hasBenefit).toBe(true);
      });
    });
  });

  describe("Confetti Colors", () => {
    it("each milestone has a confetti color", () => {
      MILESTONES.forEach(milestone => {
        expect(milestone.confettiColor).toBeDefined();
        expect(milestone.confettiColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it("tier milestones have appropriate colors", () => {
      const bronze = getMilestoneById("bronze-tier");
      const silver = getMilestoneById("silver-tier");
      const gold = getMilestoneById("gold-tier");
      const platinum = getMilestoneById("platinum-tier");
      const diamond = getMilestoneById("diamond-tier");
      
      expect(bronze?.confettiColor).toMatch(/#CD7F32/i); // Bronze
      expect(silver?.confettiColor).toMatch(/#C0C0C0/i); // Silver
      expect(gold?.confettiColor).toMatch(/#FFD700/i); // Gold
      expect(platinum?.confettiColor).toMatch(/#E5E4E2/i); // Platinum
      expect(diamond?.confettiColor).toMatch(/#B9F2FF/i); // Diamond
    });
  });

  describe("Milestone Progression", () => {
    it("milestones trigger in correct order", () => {
      // Simulate user progression
      let referralCount = 0;
      let achievedMilestones: string[] = [];

      // First referral
      referralCount = 1;
      let milestones = checkReferralMilestones(referralCount);
      achievedMilestones.push(...milestones.map(m => m.id));
      expect(achievedMilestones).toContain("first-referral");

      // Bronze tier
      referralCount = 3;
      milestones = checkTierMilestones("Bronze Advocate", referralCount);
      achievedMilestones.push(...milestones.map(m => m.id));
      expect(achievedMilestones).toContain("bronze-tier");

      // Silver tier
      referralCount = 5;
      milestones = checkTierMilestones("Silver Champion", referralCount);
      achievedMilestones.push(...milestones.map(m => m.id));
      expect(achievedMilestones).toContain("silver-tier");

      // Gold tier
      referralCount = 8;
      milestones = checkTierMilestones("Gold Ambassador", referralCount);
      achievedMilestones.push(...milestones.map(m => m.id));
      expect(achievedMilestones).toContain("gold-tier");

      // Verify order
      expect(achievedMilestones.indexOf("first-referral")).toBeLessThan(
        achievedMilestones.indexOf("bronze-tier")
      );
      expect(achievedMilestones.indexOf("bronze-tier")).toBeLessThan(
        achievedMilestones.indexOf("silver-tier")
      );
      expect(achievedMilestones.indexOf("silver-tier")).toBeLessThan(
        achievedMilestones.indexOf("gold-tier")
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles negative referral counts gracefully", () => {
      expect(() => checkReferralMilestones(-1)).not.toThrow();
      expect(checkReferralMilestones(-1).length).toBe(0);
    });

    it("handles very large referral counts", () => {
      expect(() => checkReferralMilestones(1000)).not.toThrow();
      const achieved = getAchievedMilestones(1000, "Diamond Elite");
      expect(achieved.length).toBeGreaterThan(0);
    });

    it("handles empty tier name", () => {
      expect(() => checkTierMilestones("", 5)).not.toThrow();
      expect(checkTierMilestones("", 5).length).toBe(0);
    });

    it("handles invalid leaderboard positions", () => {
      expect(() => checkLeaderboardMilestones(0)).not.toThrow();
      expect(() => checkLeaderboardMilestones(-5)).not.toThrow();
      // Position 0 might match top-10 and top-3 depending on implementation
      const result = checkLeaderboardMilestones(0);
      expect(result).toBeDefined();
    });
  });
});
