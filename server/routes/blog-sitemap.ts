import { Router } from "express";
import { blogArticles } from "../../shared/blogData";
import { PRODUCTION_URL } from "../../shared/domain";

const router = Router();

/**
 * Blog sitemap route - generates XML sitemap for blog articles
 * Submit this to Google Search Console for faster indexing
 */
router.get("/blog-sitemap.xml", (req, res) => {
  const baseUrl = PRODUCTION_URL;

  const urls = blogArticles
    .map(article => {
      return `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

export default router;
