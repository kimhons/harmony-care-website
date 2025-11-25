#!/usr/bin/env tsx

/**
 * Manual script to run the email drip campaign
 * Usage: pnpm tsx server/run-campaign.ts
 */

import { runEmailCampaign, getCampaignStats } from './emailCampaign';

async function main() {
  console.log('='.repeat(60));
  console.log('HarmonyCare Email Drip Campaign');
  console.log('='.repeat(60));
  console.log('');
  
  // Show stats before running
  console.log('📊 Campaign Statistics (Before):');
  const statsBefore = await getCampaignStats();
  console.log(JSON.stringify(statsBefore, null, 2));
  console.log('');
  
  // Run the campaign
  console.log('🚀 Running email campaign...');
  console.log('');
  await runEmailCampaign();
  console.log('');
  
  // Show stats after running
  console.log('📊 Campaign Statistics (After):');
  const statsAfter = await getCampaignStats();
  console.log(JSON.stringify(statsAfter, null, 2));
  console.log('');
  
  console.log('✅ Campaign run complete!');
  console.log('='.repeat(60));
  
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Campaign failed:', error);
  process.exit(1);
});
