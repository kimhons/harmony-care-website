#!/usr/bin/env node
/**
 * Manual script to run nurture email processing
 * Usage: node scripts/run-nurture-emails.mjs
 * 
 * This script should be run daily via cron job:
 * 0 9 * * * cd /home/ubuntu/harmony-website && node scripts/run-nurture-emails.mjs
 */

import { processNurtureEmails } from "../server/nurtureEmailService.ts";

console.log("[NurtureEmails] Starting processing...");
console.log("[NurtureEmails] Time:", new Date().toISOString());

try {
  const result = await processNurtureEmails();
  
  if (result.success) {
    console.log("[NurtureEmails] ✅ Processing complete");
    console.log("[NurtureEmails] Results:", result.results);
    
    if (result.results.errors.length > 0) {
      console.log("[NurtureEmails] ⚠️  Errors encountered:");
      result.results.errors.forEach(err => console.log("  -", err));
    }
    
    process.exit(0);
  } else {
    console.error("[NurtureEmails] ❌ Processing failed:", result.error);
    process.exit(1);
  }
} catch (error) {
  console.error("[NurtureEmails] ❌ Fatal error:", error);
  process.exit(1);
}
