import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

/**
 * Featured Resources Section
 * 
 * Displays top 3 lead magnets on homepage to drive early-funnel lead capture.
 * Features:
 * - Eye-catching card layout with thumbnails
 * - Download modal with lead capture form
 * - Smooth animations and hover effects
 * - Responsive design
 */

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  magnet: {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string | null;
  } | null;
}

function DownloadModal({ isOpen, onClose, magnet }: DownloadModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    facilityName: "",
    jobTitle: "",
  });

  const downloadMutation = trpc.leadMagnets.download.useMutation();

  const handleDownload = async () => {
    if (!magnet) return;

    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const result = await downloadMutation.mutateAsync({
        leadMagnetId: magnet.id,
        email: formData.email,
        name: formData.name || undefined,
        facilityName: formData.facilityName || undefined,
        jobTitle: formData.jobTitle || undefined,
      });

      // Open file in new tab
      window.open(result.fileUrl, "_blank");

      toast.success("Resource downloaded successfully!", {
        description: "Check your downloads folder",
      });

      onClose();
      setFormData({ email: "", name: "", facilityName: "", jobTitle: "" });
    } catch (error: any) {
      toast.error("Failed to download resource", {
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Download {magnet?.title}</DialogTitle>
          <DialogDescription>
            Enter your information to access this free resource
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@facility.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input
              id="facilityName"
              value={formData.facilityName}
              onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
              placeholder="Sunrise Senior Living"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="Administrator"
            />
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            className="w-full"
            size="lg"
          >
            {downloadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Resource
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By downloading, you agree to receive occasional emails about HarmonyCare.
            Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturedResources() {
  const { data: magnets, isLoading } = trpc.leadMagnets.getFeatured.useQuery();
  const [selectedMagnet, setSelectedMagnet] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownloadClick = (magnet: any) => {
    setSelectedMagnet(magnet);
    setModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      roi: "from-green-500 to-emerald-500",
      compliance: "from-blue-500 to-cyan-500",
      staffing: "from-purple-500 to-pink-500",
      operations: "from-orange-500 to-red-500",
    };
    return colors[category] || "from-gray-500 to-slate-500";
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (!magnets || magnets.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Free Resources</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Transformation Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Download our most popular guides to see how HarmonyCare can revolutionize your facility—no commitment required.
            </p>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {magnets.map((magnet, index) => (
              <Card
                key={magnet.id}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border"
              >
                {/* Gradient Overlay */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getCategoryColor(magnet.category)}`}></div>

                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {magnet.thumbnailUrl ? (
                    <img
                      src={magnet.thumbnailUrl}
                      alt={magnet.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Download Count Badge */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <Download className="w-3 h-3" />
                    {magnet.downloadCount}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category Badge */}
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {magnet.category.charAt(0).toUpperCase() + magnet.category.slice(1)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {magnet.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {magnet.description}
                  </p>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleDownloadClick(magnet)}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Free {magnet.type.toUpperCase()}
                  </Button>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-colors pointer-events-none"></div>
              </Card>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link href="/resources">
              <Button size="lg" variant="outline" className="group">
                View All Resources
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      <DownloadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        magnet={selectedMagnet}
      />
    </>
  );
}
