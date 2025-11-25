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
});

export type Signup = typeof signups.$inferSelect;
export type InsertSignup = typeof signups.$inferInsert;