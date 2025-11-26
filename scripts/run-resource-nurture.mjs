/**
 * Manual script to run resource nurture email processing
 * 
 * This script processes Day 3 and Day 7 emails for all eligible downloads.
 * Run this daily via cron job or manually for testing.
 * 
 * Usage:
 *   tsx scripts/run-resource-nurture.mjs
 */

import { processResourceNurtureEmails } from '../server/resourceNurtureService.ts';

async function main() {
  console.log('========================================');
  console.log('Resource Nurture Email Processing');
  console.log('========================================\n');
  
  const startTime = Date.now();
  
  try {
    const results = await processResourceNurtureEmails();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n========================================');
    console.log('Processing Complete');
    console.log('========================================');
    console.log(`Day 3 emails sent: ${results.day3}`);
    console.log(`Day 7 emails sent: ${results.day7}`);
    console.log(`Total emails sent: ${results.day3 + results.day7}`);
    console.log(`Duration: ${duration}s`);
    console.log('========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error processing nurture emails:', error);
    process.exit(1);
  }
}

main();
