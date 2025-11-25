import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Waitlist signups table for founding member early access
 */
export const signups = mysqlTable("signups", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  facilityName: varchar("facilityName", { length: 200 }).notNull(),
  facilityType: varchar("facilityType", { length: 100 }).notNull(),
  residentCount: int("residentCount").notNull(),
  tier: varchar("tier", { length: 50 }).notNull(),
  interestedFeatures: text("interestedFeatures"), // JSON array of selected features
  additionalNeeds: text("additionalNeeds"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  
  // Email campaign tracking
  emailsSent: text("emailsSent"), // JSON array of sent email types and timestamps
  lastEmailSent: timestamp("lastEmailSent"),
  emailOptOut: int("emailOptOut").default(0).notNull(), // 0 = opted in, 1 = opted out
  campaignStatus: varchar("campaignStatus", { length: 50 }).default("active").notNull(), // active, paused, completed
  
  // UTM tracking for marketing attribution
  utmSource: varchar("utmSource", { length: 100 }), // e.g., google, facebook, newsletter
  utmMedium: varchar("utmMedium", { length: 100 }), // e.g., cpc, email, social
  utmCampaign: varchar("utmCampaign", { length: 100 }), // e.g., founding_member_launch
  utmTerm: varchar("utmTerm", { length: 100 }), // e.g., care+management+software
  utmContent: varchar("utmContent", { length: 100 }), // e.g., hero_cta, pricing_button
  
  // Referral tracking
  referralCode: varchar("referralCode", { length: 20 }), // Referral code used during signup
  ownReferralCode: varchar("ownReferralCode", { length: 20 }).unique(), // Unique code for this user to share
});

export type Signup = typeof signups.$inferSelect;
export type InsertSignup = typeof signups.$inferInsert;

/**
 * Referrals table to track referral relationships and rewards
 */
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerSignupId: int("referrerSignupId").notNull(), // ID of the person who referred
  referredSignupId: int("referredSignupId").notNull(), // ID of the person who was referred
  referralCode: varchar("referralCode", { length: 20 }).notNull(), // Code that was used
  rewardStatus: varchar("rewardStatus", { length: 50 }).default("pending").notNull(), // pending, applied, claimed
  rewardType: varchar("rewardType", { length: 50 }), // discount, credit, upgrade
  rewardValue: varchar("rewardValue", { length: 100 }), // e.g., "10%", "$50", "free_month"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

/**
 * Milestone notifications table to track achievement celebrations
 */
export const milestoneNotifications = mysqlTable("milestoneNotifications", {
  id: int("id").autoincrement().primaryKey(),
  signupId: int("signupId").notNull(), // ID of the signup who achieved the milestone
  milestoneId: varchar("milestoneId", { length: 50 }).notNull(), // e.g., 'first-referral', 'bronze-tier'
  milestoneType: varchar("milestoneType", { length: 50 }).notNull(), // referral_count, tier_upgrade, leaderboard
  title: varchar("title", { length: 200 }).notNull(), // e.g., '🎉 First Referral!'
  description: text("description").notNull(), // Celebration message
  badgePath: varchar("badgePath", { length: 500 }).notNull(), // Path to badge graphic
  isViewed: int("isViewed").default(0).notNull(), // 0 = not viewed, 1 = viewed
  isShared: int("isShared").default(0).notNull(), // 0 = not shared, 1 = shared
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MilestoneNotification = typeof milestoneNotifications.$inferSelect;
export type InsertMilestoneNotification = typeof milestoneNotifications.$inferInsert;

/**
 * Calculator leads table for ROI calculator submissions
 */
export const calculatorLeads = mysqlTable("calculatorLeads", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 200 }),
  facilityName: varchar("facilityName", { length: 200 }),
  facilityType: varchar("facilityType", { length: 50 }).notNull(), // "group_home" or "icf_id"
  residentCount: int("residentCount").notNull(),
  
  // Calculated savings data
  annualSavings: int("annualSavings").notNull(),
  overtimeSavings: int("overtimeSavings").notNull(),
  errorSavings: int("errorSavings").notNull(),
  complianceSavings: int("complianceSavings").notNull(),
  retentionSavings: int("retentionSavings").notNull(),
  
  // Lead source tracking
  source: varchar("source", { length: 50 }).default("calculator").notNull(), // "calculator" or "exit_intent"
  
  // UTM parameters
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
  utmTerm: varchar("utmTerm", { length: 100 }),
  utmContent: varchar("utmContent", { length: 100 }),
  
  // Email status
  emailSent: int("emailSent").default(0).notNull(), // 0 = not sent, 1 = sent
  emailSentAt: timestamp("emailSentAt"),
  
  // Email nurture sequence tracking
  nurtureSequence: text("nurtureSequence"), // JSON array of sent emails: [{type: 'day1', sentAt: timestamp}, ...]
  lastNurtureEmail: varchar("lastNurtureEmail", { length: 50 }), // 'day1', 'day3', 'day7'
  lastNurtureEmailSentAt: timestamp("lastNurtureEmailSentAt"),
  nurtureCompleted: int("nurtureCompleted").default(0).notNull(), // 0 = in progress, 1 = completed
  
  // Lead scoring
  leadScore: int("leadScore").default(0).notNull(), // 0-100 score based on facility size, savings, engagement
  leadTier: varchar("leadTier", { length: 20 }).default("cold").notNull(), // 'hot', 'warm', 'cold'
  engagementScore: int("engagementScore").default(0).notNull(), // Email opens, clicks, demo requests
  lastEngagementAt: timestamp("lastEngagementAt"),
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CalculatorLead = typeof calculatorLeads.$inferSelect;
export type InsertCalculatorLead = typeof calculatorLeads.$inferInsert;

/**
 * Lead magnets table - downloadable resources for lead generation
 */
export const leadMagnets = mysqlTable("leadMagnets", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "pdf", "checklist", "guide", "calculator", "template"
  category: varchar("category", { length: 50 }).notNull(), // "roi", "compliance", "staffing", "operations"
  fileUrl: varchar("fileUrl", { length: 500 }).notNull(), // S3 URL or external link
  thumbnailUrl: varchar("thumbnailUrl", { length: 500 }), // Preview image
  fileSize: int("fileSize"), // File size in KB
  downloadCount: int("downloadCount").default(0).notNull(),
  isActive: int("isActive").default(1).notNull(), // 0 = hidden, 1 = visible
  sortOrder: int("sortOrder").default(0).notNull(), // For manual ordering
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LeadMagnet = typeof leadMagnets.$inferSelect;
export type InsertLeadMagnet = typeof leadMagnets.$inferInsert;

/**
 * Lead magnet downloads table - tracks who downloaded what
 */
export const leadMagnetDownloads = mysqlTable("leadMagnetDownloads", {
  id: int("id").autoincrement().primaryKey(),
  leadMagnetId: int("leadMagnetId").notNull(),
  
  // Lead information captured at download
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 200 }),
  facilityName: varchar("facilityName", { length: 200 }),
  facilityType: varchar("facilityType", { length: 50 }),
  residentCount: int("residentCount"),
  jobTitle: varchar("jobTitle", { length: 100 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  
  // Link to calculator lead if exists
  calculatorLeadId: int("calculatorLeadId"),
  
  // UTM parameters
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
  
  // Metadata
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
});

export type LeadMagnetDownload = typeof leadMagnetDownloads.$inferSelect;
export type InsertLeadMagnetDownload = typeof leadMagnetDownloads.$inferInsert;
