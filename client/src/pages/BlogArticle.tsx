import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogArticleBySlug, blogArticles } from "@/../../shared/blogData";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { Streamdown } from "streamdown";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const [article, setArticle] = useState(
    params?.slug ? getBlogArticleBySlug(params.slug) : undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadContent() {
      if (!params?.slug) return;

      const foundArticle = getBlogArticleBySlug(params.slug);
      if (!foundArticle) {
        setArticle(undefined);
        return;
      }

      // If content is empty, try to load from markdown file
      if (!foundArticle.content) {
        setIsLoading(true);
        try {
          const response = await fetch(`/content/blog/${foundArticle.slug}.md`);
          if (response.ok) {
            const markdown = await response.text();
            setArticle({ ...foundArticle, content: markdown });
          } else {
            setArticle(foundArticle);
          }
        } catch (error) {
          console.error("Failed to load article content:", error);
          setArticle(foundArticle);
        } finally {
          setIsLoading(false);
        }
      } else {
        setArticle(foundArticle);
      }
    }

    loadContent();
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist.
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = blogArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article.title;

  const handleShare = (platform: "twitter" | "linkedin" | "email" | "copy") => {
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        break;
    }
  };

  const ogImage = article.featuredImage
    ? `https://harmonycare.ai${article.featuredImage}`
    : undefined;
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        image={ogImage}
        type="article"
        article={{
          publishedTime: article.publishedAt,
          author: article.author.name,
          tags: article.tags,
        }}
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
        <Navigation />

        {/* Article Header */}
        <article className="pt-32 pb-16">
          <div className="container max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {article.category}
              </span>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Author and Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {article.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {article.author.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm font-medium text-muted-foreground">
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("email")}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("copy")}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <Streamdown>{article.content}</Streamdown>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Bio */}
            <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary">
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      About {article.author.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {article.author.role} at HarmonyCare. Passionate about
                      transforming residential care through innovative
                      technology and human-centered design.
                    </p>
                    <Link href="/about#team">
                      <Button variant="outline" size="sm">
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedArticles.map(related => (
                    <Card
                      key={related.id}
                      className="flex flex-col hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6 flex flex-col flex-1">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 self-start">
                          {related.category}
                        </span>
                        <h3 className="text-lg font-bold mb-3 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                          <Clock className="w-3 h-3" />
                          {related.readTime} min read
                        </div>
                        <Link href={`/blog/${related.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Read Article
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-accent/10">
          <div className="container max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Transform Your Facility?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  See how HarmonyCare's AI-powered platform can reduce
                  administrative burden and give your caregivers more time for
                  what matters most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Become a Founding Member
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Schedule a Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
