import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import {
  Download,
  FileText,
  CheckSquare,
  BookOpen,
  Loader2,
} from "lucide-react";

/**
 * Resources Page - Lead Magnet Library
 *
 * Displays downloadable resources with gated access.
 * Captures lead information and tracks downloads for engagement scoring.
 */

interface DownloadFormData {
  email: string;
  name: string;
  facilityName: string;
  facilityType: string;
  residentCount: string;
  jobTitle: string;
  phoneNumber: string;
}

export default function Resources() {
  return (
    <>
      <SEOHead
        title="Free Resources - ROI Guides, Compliance Checklists & Care Playbooks"
        description="Download free resources for residential care facilities: ROI calculators, compliance checklists, staffing optimization guides, and care management playbooks. Expert insights to transform your facility operations."
      />
      <ResourcesContent />
    </>
  );
}

function ResourcesContent() {
  const [selectedMagnet, setSelectedMagnet] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState<DownloadFormData>({
    email: "",
    name: "",
    facilityName: "",
    facilityType: "",
    residentCount: "",
    jobTitle: "",
    phoneNumber: "",
  });

  const { data: magnets, isLoading } = trpc.leadMagnets.getAll.useQuery();
  const downloadMutation = trpc.leadMagnets.download.useMutation();

  const handleDownloadClick = (magnetId: number) => {
    setSelectedMagnet(magnetId);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMagnet) return;

    setIsDownloading(true);

    try {
      const result = await downloadMutation.mutateAsync({
        leadMagnetId: selectedMagnet,
        email: formData.email,
        name: formData.name || undefined,
        facilityName: formData.facilityName || undefined,
        facilityType: formData.facilityType || undefined,
        residentCount: formData.residentCount
          ? parseInt(formData.residentCount)
          : undefined,
        jobTitle: formData.jobTitle || undefined,
        phoneNumber: formData.phoneNumber || undefined,
      });

      // Open file in new tab
      window.open(result.fileUrl, "_blank");

      toast.success("Download started!", {
        description: `${result.title} is now downloading.`,
      });

      // Reset form and close dialog
      setFormData({
        email: "",
        name: "",
        facilityName: "",
        facilityType: "",
        residentCount: "",
        jobTitle: "",
        phoneNumber: "",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error("Download failed", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "checklist":
        return <CheckSquare className="h-8 w-8 text-primary" />;
      case "guide":
      case "playbook":
        return <BookOpen className="h-8 w-8 text-primary" />;
      default:
        return <FileText className="h-8 w-8 text-primary" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      roi: "bg-green-100 text-green-800",
      compliance: "bg-blue-100 text-blue-800",
      staffing: "bg-purple-100 text-purple-800",
      operations: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[category] || "bg-gray-100 text-gray-800"}`}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Resources for Care Facilities
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Download expert guides, checklists, and tools to optimize your
              facility's medication management, compliance, and operations.
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="container py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : magnets && magnets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {magnets.map(magnet => (
              <Card
                key={magnet.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Thumbnail */}
                {magnet.thumbnailUrl && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={magnet.thumbnailUrl}
                      alt={magnet.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-shrink-0">{getIcon(magnet.type)}</div>
                    <div className="flex-1">
                      {getCategoryBadge(magnet.category)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {magnet.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {magnet.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {magnet.fileSize
                        ? `${Math.round(magnet.fileSize / 1024)} MB`
                        : "PDF"}
                    </span>
                    <span>{magnet.downloadCount} downloads</span>
                  </div>

                  <Button
                    onClick={() => handleDownloadClick(magnet.id)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Free
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No resources available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Download Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Download Resource</DialogTitle>
            <DialogDescription>
              Please provide your information to access this free resource.
              We'll use this to send you relevant updates and insights.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@facility.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facilityName">Facility Name</Label>
              <Input
                id="facilityName"
                value={formData.facilityName}
                onChange={e =>
                  setFormData({ ...formData, facilityName: e.target.value })
                }
                placeholder="Sunrise Care Home"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facilityType">Facility Type</Label>
                <Select
                  value={formData.facilityType}
                  onValueChange={value =>
                    setFormData({ ...formData, facilityType: value })
                  }
                >
                  <SelectTrigger id="facilityType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group_home">Group Home</SelectItem>
                    <SelectItem value="icf_id">ICF-ID</SelectItem>
                    <SelectItem value="assisted_living">
                      Assisted Living
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="residentCount">Resident Count</Label>
                <Input
                  id="residentCount"
                  type="number"
                  value={formData.residentCount}
                  onChange={e =>
                    setFormData({ ...formData, residentCount: e.target.value })
                  }
                  placeholder="6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={e =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                placeholder="Administrator"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={e =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1"
                disabled={isDownloading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isDownloading}>
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
