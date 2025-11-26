import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  PRODUCTION_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  ORGANIZATION_SCHEMA,
} from "@/../../shared/domain";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

/**
 * SEO Head component that manages meta tags for each page
 * Automatically updates document title and meta tags based on props
 */
export function SEOHead({
  title,
  description = SITE_DESCRIPTION,
  image = `${PRODUCTION_URL}/og-image.png`,
  type = "website",
  article,
}: SEOHeadProps) {
  const [location] = useLocation();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${PRODUCTION_URL}${location}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    updateMetaTag("description", description);
    updateMetaTag("og:title", fullTitle);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", canonicalUrl);
    updateMetaTag("og:type", type);
    updateMetaTag("og:site_name", SITE_NAME);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", TWITTER_HANDLE);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Article-specific tags
    if (type === "article" && article) {
      if (article.publishedTime) {
        updateMetaTag("article:published_time", article.publishedTime);
      }
      if (article.modifiedTime) {
        updateMetaTag("article:modified_time", article.modifiedTime);
      }
      if (article.author) {
        updateMetaTag("article:author", article.author);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          updateMetaTag("article:tag", tag, true);
        });
      }
    }

    // Update canonical link
    updateCanonicalLink(canonicalUrl);

    // Add JSON-LD structured data
    updateStructuredData();
  }, [fullTitle, description, image, canonicalUrl, type, article]);

  return null; // This component doesn't render anything
}

function updateMetaTag(
  property: string,
  content: string,
  allowMultiple = false
) {
  const isOgTag = property.startsWith("og:");
  const isTwitterTag = property.startsWith("twitter:");
  const isArticleTag = property.startsWith("article:");
  const attribute =
    isOgTag || isTwitterTag || isArticleTag ? "property" : "name";

  if (allowMultiple) {
    // For tags that can have multiple values (like article:tag)
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, property);
    meta.content = content;
    document.head.appendChild(meta);
  } else {
    let meta = document.querySelector(
      `meta[${attribute}="${property}"]`
    ) as HTMLMetaElement;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, property);
      document.head.appendChild(meta);
    }

    meta.content = content;
  }
}

function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function updateStructuredData() {
  let script = document.querySelector(
    'script[type="application/ld+json"]'
  ) as HTMLScriptElement;

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(ORGANIZATION_SCHEMA);
}
