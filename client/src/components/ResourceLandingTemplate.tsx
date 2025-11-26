import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import { ResourceExitIntentPopup } from "@/components/ResourceExitIntentPopup";

interface KeyStat {
  value: string;
  label: string;
  color?: "blue" | "coral";
}

interface ContentCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
}

interface Testimonial {
  rating: number;
  quote: string;
  author: string;
  role: string;
  bgColor?: string;
}

interface RelatedResource {
  title: string;
  description: string;
  href: string;
}

interface ResourceLandingProps {
  // Resource metadata
  leadMagnetId: number;
  exitIntentLeadMagnetId: number; // ID for the quick wins checklist
  category: "compliance" | "staffing" | "financial" | "medication" | "care";
  title: string;
  subtitle: string;
  badge: string;
  thumbnailUrl?: string;

  // Key statistics
  keyStats: KeyStat[];
  downloadCount: string;

  // SEO
  seoDescription: string;
  seoImage: string;

  // Content sections
  whatInside: ContentCard[];
  testimonials: Testimonial[];
  relatedResources: RelatedResource[];

  // CTA
  finalCtaHeadline: string;
  finalCtaSubtext: string;
}

export default function ResourceLandingTemplate({
  leadMagnetId,
  exitIntentLeadMagnetId,
  category,
  title,
  subtitle,
  badge,
  thumbnailUrl,
  keyStats,
  downloadCount,
  seoDescription,
  seoImage,
  whatInside,
  testimonials,
  relatedResources,
  finalCtaHeadline,
  finalCtaSubtext,
}: ResourceLandingProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    facilityName: "",
    facilityType: "",
    residentCount: "",
    jobTitle: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const downloadMutation = trpc.leadMagnets.download.useMutation({
    onSuccess: data => {
      toast.success("Download started! Check your email for the confirmation.");

      // Open download in new tab
      window.open(data.fileUrl, "_blank");

      // Reset form
      setFormData({
        email: "",
        name: "",
        facilityName: "",
        facilityType: "",
        residentCount: "",
        jobTitle: "",
      });

      setIsSubmitting(false);
    },
    onError: error => {
      toast.error(error.message || "Failed to download resource");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    downloadMutation.mutate({
      leadMagnetId,
      email: formData.email,
      name: formData.name,
      facilityName: formData.facilityName || undefined,
      facilityType: formData.facilityType || undefined,
      residentCount: formData.residentCount
        ? parseInt(formData.residentCount)
        : undefined,
      jobTitle: formData.jobTitle || undefined,
    });
  };

  return (
    <>
      {/* Exit-Intent Popup */}
      <ResourceExitIntentPopup
        category={category}
        leadMagnetId={exitIntentLeadMagnetId}
        resourceTitle={title}
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-coral-50">
        <Navigation />

        {/* SEO-optimized structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: seoDescription,
            author: {
              "@type": "Organization",
              name: "HarmonyCare",
            },
            publisher: {
              "@type": "Organization",
              name: "HarmonyCare",
              logo: {
                "@type": "ImageObject",
                url: "https://www.harmonycare.ai/logo.png",
              },
            },
            datePublished: "2025-01-15",
            image: seoImage,
          })}
        </script>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  {badge}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {title}
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {subtitle}
                </p>

                {/* Key Stats */}
                <div className={`grid grid-cols-${keyStats.length} gap-4 mb-8`}>
                  {keyStats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div
                        className={`text-3xl font-bold ${stat.color === "coral" ? "text-coral-600" : "text-blue-600"}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-coral-200 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                  </div>
                  <span>
                    Downloaded by <strong>{downloadCount}</strong> facility
                    administrators
                  </span>
                </div>
              </div>

              {/* Right: Download Form */}
              <Card className="shadow-2xl border-2 border-blue-100">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Download Your Free Guide
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Get instant access to the complete guide
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@facility.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="facilityName">Facility Name</Label>
                      <Input
                        id="facilityName"
                        type="text"
                        value={formData.facilityName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            facilityName: e.target.value,
                          })
                        }
                        placeholder="Sunrise Care Home"
                      />
                    </div>

                    <div>
                      <Label htmlFor="facilityType">Facility Type</Label>
                      <Select
                        value={formData.facilityType}
                        onValueChange={value =>
                          setFormData({ ...formData, facilityType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select facility type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="icf-id">ICF-ID</SelectItem>
                          <SelectItem value="group-home">Group Home</SelectItem>
                          <SelectItem value="assisted-living">
                            Assisted Living
                          </SelectItem>
                          <SelectItem value="nursing-home">
                            Nursing Home
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        type="text"
                        value={formData.jobTitle}
                        onChange={e =>
                          setFormData({ ...formData, jobTitle: e.target.value })
                        }
                        placeholder="Administrator, Director, etc."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-coral-600 hover:from-blue-700 hover:to-coral-700 text-white font-semibold py-6 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Download className="mr-2" size={20} />
                          Download Free Guide
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What's Inside */}
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                What's Inside This Guide
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                A comprehensive resource packed with actionable strategies,
                real-world case studies, and proven frameworks.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {whatInside.map((card, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 ${card.bgColor || "bg-blue-100"} rounded-lg flex items-center justify-center mb-4`}
                      >
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-gradient-to-br from-blue-50 to-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                What Facility Administrators Are Saying
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={index}
                    className={`border-2 ${testimonial.bgColor || "border-blue-100"}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${testimonial.bgColor?.replace("border-", "bg-").replace("100", "200") || "bg-blue-200"} rounded-full`}
                        ></div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                You Might Also Like
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Explore more resources to transform your facility operations
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedResources.map((resource, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {resource.description}
                      </p>
                      <Link href={resource.href}>
                        <Button variant="outline" className="w-full">
                          Learn More →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-coral-600 py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {finalCtaHeadline}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {finalCtaSubtext}
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Download className="mr-2" size={20} />
                Download Free Guide Now
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2025 HarmonyCare. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
