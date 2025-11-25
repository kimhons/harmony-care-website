import { mysqlTable, varchar, int, datetime, text, boolean } from "drizzle-orm/mysql-core";

export const calculatorLeads = mysqlTable("calculator_leads", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  facilityName: varchar("facility_name", { length: 255 }),
  facilityType: varchar("facility_type", { length: 50 }).notNull(), // "group_home" or "icf_id"
  residentCount: int("resident_count").notNull(),
  
  // Calculated savings data
  annualSavings: int("annual_savings").notNull(),
  overtimeSavings: int("overtime_savings").notNull(),
  errorSavings: int("error_savings").notNull(),
  complianceSavings: int("compliance_savings").notNull(),
  retentionSavings: int("retention_savings").notNull(),
  
  // Lead source tracking
  source: varchar("source", { length: 50 }).default("calculator"), // "calculator" or "exit_intent"
  
  // UTM parameters
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  
  // Email status
  emailSent: boolean("email_sent").default(false),
  emailSentAt: datetime("email_sent_at"),
  
  // Metadata
  createdAt: datetime("created_at").notNull().default(new Date()),
});

export type CalculatorLead = typeof calculatorLeads.$inferSelect;
export type NewCalculatorLead = typeof calculatorLeads.$inferInsert;
