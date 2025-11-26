import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export function loadBlogContent(slug: string): string {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
  }
  return "";
}

export function getAllBlogContent(): Record<string, string> {
  const content: Record<string, string> = {};

  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return content;
    }

    const files = fs.readdirSync(CONTENT_DIR);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const slug = file.replace(".md", "");
        content[slug] = loadBlogContent(slug);
      }
    }
  } catch (error) {
    console.error("Failed to load blog content:", error);
  }

  return content;
}
