import { useEffect } from "react";
import { PRODUCTION_URL, SITE_NAME } from "@/../../shared/domain";

interface ArticleSchemaProps {
  title: string;
  description: string;
  image?: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  modifiedAt?: string;
  tags: string[];
  slug: string;
  readTime: number;
}

/**
 * Article Schema component that adds JSON-LD structured data for blog posts
 * Enables rich snippets in Google search results with author, date, image, etc.
 */
export function ArticleSchema({
  title,
  description,
  image,
  author,
  publishedAt,
  modifiedAt,
  tags,
  slug,
  readTime,
}: ArticleSchemaProps) {
  useEffect(() => {
    const articleUrl = `${PRODUCTION_URL}/blog/${slug}`;
    const imageUrl = image
      ? `${PRODUCTION_URL}${image}`
      : `${PRODUCTION_URL}/og-image.png`;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: imageUrl,
      author: {
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${PRODUCTION_URL}/logo.png`,
        },
      },
      datePublished: publishedAt,
      dateModified: modifiedAt || publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      keywords: tags.join(", "),
      articleSection: tags[0] || "Healthcare",
      wordCount: readTime * 250, // Approximate word count based on read time
      url: articleUrl,
    };

    // Create or update the schema script tag
    let schemaScript = document.querySelector(
      'script[type="application/ld+json"][data-schema="article"]'
    ) as HTMLScriptElement;

    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-schema", "article");
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(schema);

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [
    title,
    description,
    image,
    author,
    publishedAt,
    modifiedAt,
    tags,
    slug,
    readTime,
  ]);

  return null; // This component doesn't render anything
}
