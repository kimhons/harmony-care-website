#!/usr/bin/env tsx
/**
 * Newsletter nurture sequence cron job
 * Run this script daily to send scheduled nurture emails
 *
 * Usage: tsx server/run-newsletter-nurture.ts
 * Or schedule with cron: 0 9 * * * cd /path/to/project && tsx server/run-newsletter-nurture.ts
 */

import { runNurtureSequence } from "./newsletterNurtureService";

async function main() {
  console.log("=".repeat(60));
  console.log("Newsletter Nurture Sequence - Starting");
  console.log(new Date().toISOString());
  console.log("=".repeat(60));

  try {
    const results = await runNurtureSequence();

    console.log("\n" + "=".repeat(60));
    console.log("Newsletter Nurture Sequence - Complete");
    console.log("Results:", JSON.stringify(results, null, 2));
    console.log("=".repeat(60));

    process.exit(0);
  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("Newsletter Nurture Sequence - Error");
    console.error(error);
    console.error("=".repeat(60));

    process.exit(1);
  }
}

main();
