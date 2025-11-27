import { getDb } from "../server/db.js";
import { leadMagnets } from "../drizzle/schema.js";

async function addResources() {
  try {
    console.log("Adding three new resource guides...");
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed");
    }

    const resources = [
      {
        title: "Medication Management Excellence Guide",
        description:
          "Eliminate medication errors and ensure regulatory compliance. Learn the proven framework to achieve zero preventable errors, protect residents, and avoid costly legal issues.",
        type: "guide" as const,
        category: "medication" as const,
        fileUrl: "/medication-management-guide.pdf",
        thumbnailUrl: "/medication-management-thumbnail.png",
        downloadCount: 0,
      },
      {
        title: "Financial Optimization Playbook",
        description:
          "Find $100K+ in hidden revenue and cost savings. Systematic approach to capture unclaimed reimbursements, reduce waste, and improve your bottom line by 15-25% within 12 months.",
        type: "guide" as const,
        category: "roi" as const,
        fileUrl: "/financial-optimization-playbook.pdf",
        thumbnailUrl: "/financial-optimization-thumbnail.png",
        downloadCount: 0,
      },
      {
        title: "Family Communication Mastery Guide",
        description:
          "Build trust, reduce complaints by 60%, and turn families into advocates. Transform family relationships from adversarial to collaborative with proven communication strategies.",
        type: "guide" as const,
        category: "roi" as const,
        fileUrl: "/family-communication-guide.pdf",
        thumbnailUrl: "/family-communication-thumbnail.png",
        downloadCount: 0,
      },
    ];

    for (const resource of resources) {
      await db.insert(leadMagnets).values(resource);
      console.log(`✓ Added: ${resource.title}`);
    }

    console.log("\n✅ Successfully added all 3 resources!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding resources:", error);
    process.exit(1);
  }
}

addResources();
