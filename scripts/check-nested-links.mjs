#!/usr/bin/env node

/**
 * Custom script to detect nested Link components containing anchor tags
 * This catches patterns like: <Link href="/"><a>text</a></Link>
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';

const files = await glob('client/src/**/*.{tsx,jsx}', { cwd: '/home/ubuntu/harmony-website' });

let foundIssues = false;

for (const file of files) {
  const content = readFileSync(`/home/ubuntu/harmony-website/${file}`, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for <Link> containing <a> tag
    if (line.includes('<Link') && line.includes('href=')) {
      // Look ahead for nested <a> tags
      let checkLines = 5; // Check next 5 lines
      for (let j = i; j < Math.min(i + checkLines, lines.length); j++) {
        if (lines[j].includes('<a ') || lines[j].includes('<a>')) {
          console.error(`❌ Nested link found in ${file}:${i + 1}`);
          console.error(`   ${lines[i].trim()}`);
          console.error(`   ${lines[j].trim()}`);
          console.error('');
          foundIssues = true;
          break;
        }
        // Stop if we hit the closing Link tag
        if (lines[j].includes('</Link>')) break;
      }
    }
    
    // Check for <Link> containing <Button>
    if (line.includes('<Link') && line.includes('href=')) {
      let checkLines = 5;
      for (let j = i; j < Math.min(i + checkLines, lines.length); j++) {
        if (lines[j].includes('<Button') && !lines[j].includes('variant="link"')) {
          console.warn(`⚠️  Link wrapping Button in ${file}:${i + 1}`);
          console.warn(`   Consider using Button with asChild prop or Link with className`);
          console.warn('');
        }
        if (lines[j].includes('</Link>')) break;
      }
    }
  }
}

if (foundIssues) {
  console.error('❌ Found nested link issues. Please fix them.');
  process.exit(1);
} else {
  console.log('✅ No nested link issues found!');
  process.exit(0);
}
