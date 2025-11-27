import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import * as schema from './server/db/schema.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function addResources() {
  try {
    console.log('Adding three new resource guides...');

    const resources = [
      {
        title: 'Medication Management Excellence Guide',
        description: 'Eliminate medication errors and ensure regulatory compliance. Learn the proven framework to achieve zero preventable errors, protect residents, and avoid costly legal issues.',
        type: 'guide',
        category: 'medication',
        fileUrl: '/medication-management-guide.pdf',
        thumbnailUrl: '/medication-management-thumbnail.png',
        downloadCount: 0,
      },
      {
        title: 'Financial Optimization Playbook',
        description: 'Find $100K+ in hidden revenue and cost savings. Systematic approach to capture unclaimed reimbursements, reduce waste, and improve your bottom line by 15-25% within 12 months.',
        type: 'guide',
        category: 'roi',
        fileUrl: '/financial-optimization-playbook.pdf',
        thumbnailUrl: '/financial-optimization-thumbnail.png',
        downloadCount: 0,
      },
      {
        title: 'Family Communication Mastery Guide',
        description: 'Build trust, reduce complaints by 60%, and turn families into advocates. Transform family relationships from adversarial to collaborative with proven communication strategies.',
        type: 'guide',
        category: 'roi',
        fileUrl: '/family-communication-guide.pdf',
        thumbnailUrl: '/family-communication-thumbnail.png',
        downloadCount: 0,
      },
    ];

    for (const resource of resources) {
      const result = await db.insert(schema.leadMagnets).values(resource).returning();
      console.log(`✓ Added: ${resource.title}`);
    }

    console.log('\n✅ Successfully added all 3 resources!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding resources:', error);
    process.exit(1);
  }
}

addResources();
