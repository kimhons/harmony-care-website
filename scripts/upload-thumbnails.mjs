import { storagePut } from '../server/storage.ts';
import { getDb } from '../server/db.ts';
import { leadMagnets } from '../drizzle/schema.ts';
import { eq } from 'drizzle-orm';
import { readFileSync } from 'fs';

const thumbnails = [
  {
    id: 1,
    localPath: '/home/ubuntu/harmony-website/client/public/thumbnails/compliance-paradox-thumbnail.png',
    s3Key: 'resources/compliance-paradox-thumbnail.png'
  },
  {
    id: 2,
    localPath: '/home/ubuntu/harmony-website/client/public/thumbnails/staffing-optimization-thumbnail.png',
    s3Key: 'resources/staffing-optimization-thumbnail.png'
  },
  {
    id: 3,
    localPath: '/home/ubuntu/harmony-website/client/public/thumbnails/financial-optimization-thumbnail.png',
    s3Key: 'resources/financial-optimization-thumbnail.png'
  },
  {
    id: 4,
    localPath: '/home/ubuntu/harmony-website/client/public/thumbnails/medication-management-thumbnail.png',
    s3Key: 'resources/medication-management-thumbnail.png'
  },
  {
    id: 5,
    localPath: '/home/ubuntu/harmony-website/client/public/thumbnails/person-centered-care-thumbnail.png',
    s3Key: 'resources/person-centered-care-thumbnail.png'
  }
];

async function uploadThumbnails() {
  console.log('Starting thumbnail upload process...\n');
  
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  for (const thumbnail of thumbnails) {
    try {
      console.log(`Processing thumbnail ${thumbnail.id}...`);
      
      // Read file
      const fileBuffer = readFileSync(thumbnail.localPath);
      console.log(`  Read file: ${fileBuffer.length} bytes`);
      
      // Upload to S3
      const { url } = await storagePut(thumbnail.s3Key, fileBuffer, 'image/png');
      console.log(`  Uploaded to S3: ${url}`);
      
      // Update database
      await db.update(leadMagnets)
        .set({ thumbnailUrl: url })
        .where(eq(leadMagnets.id, thumbnail.id));
      console.log(`  Updated database record ${thumbnail.id}\n`);
      
    } catch (error) {
      console.error(`Error processing thumbnail ${thumbnail.id}:`, error);
    }
  }
  
  console.log('Thumbnail upload complete!');
  process.exit(0);
}

uploadThumbnails();
