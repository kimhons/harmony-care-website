/**
 * Seed Lead Magnets Database
 * 
 * Populates the leadMagnets table with initial downloadable resources.
 * Run with: node scripts/seed-lead-magnets.mjs
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function seedLeadMagnets() {
  console.log('🌱 Seeding lead magnets...\n');

  // Create database connection
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  const leadMagnets = [
    {
      title: 'ROI Calculator & Implementation Guide',
      description: 'Comprehensive 15-page guide showing how HarmonyCare delivers 40% cost savings through AI-powered medication management. Includes detailed ROI calculations, implementation timeline, and real facility case studies with before/after metrics.',
      type: 'pdf',
      category: 'roi',
      fileUrl: 'https://example.com/resources/harmonycare-roi-guide.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      fileSize: 2400,
      sortOrder: 1,
    },
    {
      title: 'Medication Compliance Checklist (2024)',
      description: 'Essential 8-page checklist covering all federal and state medication management requirements for group homes and ICF-IDs. Includes audit-ready documentation templates, common violation examples, and corrective action plans.',
      type: 'pdf',
      category: 'compliance',
      fileUrl: 'https://example.com/resources/medication-compliance-checklist.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
      fileSize: 1200,
      sortOrder: 2,
    },
    {
      title: 'Staffing Optimization Playbook',
      description: '20-page strategic guide to reducing overtime costs by 35% while improving care quality. Covers shift scheduling best practices, cross-training strategies, AI-assisted task allocation, and retention tactics proven across 200+ facilities.',
      type: 'pdf',
      category: 'staffing',
      fileUrl: 'https://example.com/resources/staffing-optimization-playbook.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
      fileSize: 3200,
      sortOrder: 3,
    },
    {
      title: 'Medication Error Prevention Guide',
      description: '12-page guide revealing the 7 most common medication errors in residential care and proven prevention strategies. Includes AI-powered double-check workflows, staff training templates, and incident response protocols.',
      type: 'pdf',
      category: 'operations',
      fileUrl: 'https://example.com/resources/error-prevention-guide.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      fileSize: 1800,
      sortOrder: 4,
    },
    {
      title: 'Family Communication Templates',
      description: 'Ready-to-use email and letter templates for communicating medication changes, health updates, and care plans to families. Includes HIPAA-compliant language, tone guidelines, and crisis communication scripts.',
      type: 'template',
      category: 'operations',
      fileUrl: 'https://example.com/resources/family-communication-templates.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
      fileSize: 800,
      sortOrder: 5,
    },
    {
      title: 'State Licensing Requirements Matrix',
      description: 'State-by-state comparison of medication management licensing requirements for group homes and ICF-IDs. Covers training hours, supervision ratios, documentation standards, and renewal timelines for all 50 states.',
      type: 'checklist',
      category: 'compliance',
      fileUrl: 'https://example.com/resources/state-licensing-matrix.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      fileSize: 1500,
      sortOrder: 6,
    },
  ];

  // Insert lead magnets
  for (const magnet of leadMagnets) {
    try {
      await connection.execute(
        `INSERT INTO leadMagnets 
        (title, description, type, category, fileUrl, thumbnailUrl, fileSize, sortOrder, isActive, downloadCount) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 0)`,
        [
          magnet.title,
          magnet.description,
          magnet.type,
          magnet.category,
          magnet.fileUrl,
          magnet.thumbnailUrl,
          magnet.fileSize,
          magnet.sortOrder,
        ]
      );
      console.log(`✅ Added: ${magnet.title}`);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`⏭️  Skipped (already exists): ${magnet.title}`);
      } else {
        console.error(`❌ Error adding ${magnet.title}:`, error.message);
      }
    }
  }

  await connection.end();
  console.log('\n✨ Lead magnets seeding complete!');
}

seedLeadMagnets().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
