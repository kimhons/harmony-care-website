import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { BlogArticle, blogArticles } from "@/../../shared/blogData";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Blog() {
  return (
    <>
      <SEOHead
        title="Blog - AI Healthcare Insights, Best Practices & Industry Trends"
        description="Expert insights on AI in residential care, compliance best practices, care facility management strategies, and product updates from HarmonyCare. Stay informed about the future of healthcare automation."
      />
      <BlogContent />
    </>
  );
}

function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState<
    BlogArticle["category"] | "All"
  >("All");

  const categories: Array<BlogArticle["category"] | "All"> = [
    "All",
    "AI in Healthcare",
    "Industry Trends",
    "Best Practices",
    "Product Updates",
    "Case Studies",
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? blogArticles
      : blogArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = blogArticles[0];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              HarmonyCare <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert perspectives on AI in healthcare, industry trends, and best
              practices for residential care facilities
            </p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 overflow-hidden border-primary/20 hover:border-primary/40 transition-colors">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                    Featured Article
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    {featuredArticle.title}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredArticle.publishedAt).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime} min read
                    </span>
                  </div>
                </div>
              </div>
              <CardContent className="p-12 flex flex-col justify-center">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <p className="font-semibold">
                      {featuredArticle.author.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {featuredArticle.author.role}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
                <Link href={`/blog/${featuredArticle.slug}`}>
                  <Button className="w-full">
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map(article => (
              <Card
                key={article.id}
                className="flex flex-col hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {article.author.role}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${article.slug}`}>
                    <Button variant="outline" className="w-full">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found in this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-accent/10">
        <div className="container max-w-4xl">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest insights on AI in
                healthcare, industry trends, and best practices delivered to
                your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
