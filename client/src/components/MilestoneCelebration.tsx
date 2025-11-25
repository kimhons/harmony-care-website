/**
 * Milestone Celebration Component
 * Displays achievement notifications with confetti animations and shareable social posts
 */

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Share2, Copy, Download, X } from "lucide-react";
import { getMilestoneById } from "@shared/milestones";
import { generatePlatformShareUrl } from "@shared/shareTemplates";

interface MilestoneNotification {
  id: number;
  signupId: number;
  milestoneId: string;
  milestoneType: string;
  title: string;
  description: string;
  badgePath: string;
  isViewed: number;
  isShared: number;
  createdAt: Date;
}

interface MilestoneCelebrationProps {
  milestone: MilestoneNotification | null;
  onClose: () => void;
  onMarkViewed: (id: number) => void;
  onMarkShared: (id: number) => void;
  userInfo: {
    name: string;
    facilityName: string;
    referralCode: string;
    totalReferrals: number;
  };
}

export function MilestoneCelebration({
  milestone,
  onClose,
  onMarkViewed,
  onMarkShared,
  userInfo,
}: MilestoneCelebrationProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"linkedin" | "twitter" | "facebook">("linkedin");
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    if (milestone) {
      // Trigger confetti animation
      triggerConfetti(milestone.milestoneId);
      
      // Mark as viewed
      onMarkViewed(milestone.id);
      
      // Load social post content
      const milestoneData = getMilestoneById(milestone.milestoneId);
      if (milestoneData) {
        setCustomMessage(milestoneData.socialPosts.linkedin);
      }
    }
  }, [milestone]);

  const triggerConfetti = (milestoneId: string) => {
    const milestone = getMilestoneById(milestoneId);
    const confettiColor = milestone?.confettiColor || "#667eea";

    // Multiple confetti bursts for celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Burst from left
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: [confettiColor, "#ffffff", "#ffd700"],
      });
      
      // Burst from right
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: [confettiColor, "#ffffff", "#ffd700"],
      });
    }, 250);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(customMessage);
    toast.success("Message copied to clipboard!");
  };

  const handleShare = (platform: "linkedin" | "twitter" | "facebook") => {
    const milestoneData = getMilestoneById(milestone?.milestoneId || "");
    if (!milestoneData) return;

    const referralLink = `${window.location.origin}/signup?ref=${userInfo.referralCode}`;
    const shareUrl = generatePlatformShareUrl(platform, customMessage, referralLink);

    window.open(shareUrl, "_blank", "width=600,height=400");
    
    // Mark as shared
    if (milestone) {
      onMarkShared(milestone.id);
    }
    
    toast.success("Opened share dialog!");
  };

  const handleDownloadBadge = () => {
    if (!milestone) return;

    const link = document.createElement("a");
    link.href = milestone.badgePath;
    link.download = `${milestone.milestoneId}-badge.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Badge downloaded!");
  };

  const handlePlatformChange = (platform: string) => {
    const p = platform as "linkedin" | "twitter" | "facebook";
    setSelectedPlatform(p);

    const milestoneData = getMilestoneById(milestone?.milestoneId || "");
    if (milestoneData) {
      setCustomMessage(milestoneData.socialPosts[p]);
    }
  };

  if (!milestone) return null;

  const milestoneData = getMilestoneById(milestone.milestoneId);

  return (
    <Dialog open={!!milestone} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {milestone.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badge Display */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={milestone.badgePath}
              alt={milestone.title}
              className="w-48 h-48 object-contain"
            />
            <p className="text-center text-lg text-muted-foreground max-w-md">
              {milestone.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadBadge}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download Badge
            </Button>
          </div>

          {/* Share Section */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Share Your Achievement</h3>
            </div>

            <Tabs value={selectedPlatform} onValueChange={handlePlatformChange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedPlatform} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customize your message:</label>
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {selectedPlatform === "twitter" && milestoneData?.socialPosts.twitter
                        ? `${customMessage.length}/${milestoneData.socialPosts.twitter.length + 50} characters`
                        : "Edit as needed"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleShare(selectedPlatform)}
                    className="flex-1 gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share on {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCopyMessage}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
