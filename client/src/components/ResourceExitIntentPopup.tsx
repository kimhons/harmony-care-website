import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface ResourceExitIntentPopupProps {
  category: "compliance" | "staffing" | "financial" | "medication" | "care";
  leadMagnetId: number;
  resourceTitle: string;
}

const CATEGORY_CONFIG = {
  compliance: {
    title: "Wait! Get Your Free Compliance Quick Wins Checklist",
    subtitle: "5 immediate actions to reduce violations by 20% in 30 days",
    benefits: [
      "Reduce survey deficiencies in 30 days",
      "Streamline documentation workflows",
      "Improve staff compliance training",
      "Pass your next survey with confidence",
    ],
    ctaText: "Send Me the Quick Wins Checklist",
    gradient: "from-blue-600 to-indigo-600",
  },
  staffing: {
    title: "Before You Go... Grab Your Staffing Quick Wins!",
    subtitle: "3 proven tactics to reduce overtime costs this month",
    benefits: [
      "Cut overtime by 15% in 30 days",
      "Improve schedule efficiency immediately",
      "Boost staff satisfaction scores",
      "Reduce call-ins and no-shows",
    ],
    ctaText: "Get My Staffing Quick Wins",
    gradient: "from-coral-600 to-orange-600",
  },
  financial: {
    title: "Don't Miss This! Free Cost-Cutting Quick Wins",
    subtitle: "Find $10K+ in hidden savings in the next 30 days",
    benefits: [
      "Identify immediate cost savings",
      "Reduce operational waste by 15%",
      "Improve profit margins fast",
      "Get ROI in the first month",
    ],
    ctaText: "Show Me the Quick Wins",
    gradient: "from-green-600 to-emerald-600",
  },
  medication: {
    title: "Wait! Free Medication Safety Quick Wins Inside",
    subtitle: "Eliminate common medication errors in 30 days",
    benefits: [
      "Prevent medication errors immediately",
      "Reduce liability exposure",
      "Streamline MAR documentation",
      "Improve resident safety scores",
    ],
    ctaText: "Get the Safety Checklist",
    gradient: "from-purple-600 to-pink-600",
  },
  care: {
    title: "Before You Leave... Person-Centered Care Quick Wins",
    subtitle: "Boost family satisfaction scores in 30 days",
    benefits: [
      "Improve resident engagement today",
      "Increase family satisfaction by 20%",
      "Enhance quality of life metrics",
      "Create meaningful daily activities",
    ],
    ctaText: "Send Me the Quick Wins",
    gradient: "from-teal-600 to-cyan-600",
  },
};

export function ResourceExitIntentPopup({
  category,
  leadMagnetId,
  resourceTitle,
}: ResourceExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const config = CATEGORY_CONFIG[category];

  // Mutation for downloading lead magnet
  const downloadMutation = trpc.leadMagnets.download.useMutation({
    onSuccess: result => {
      setSubmitted(true);
      toast.success("Success! Check your email for the quick wins checklist.");

      // Download the file
      if (result.fileUrl) {
        window.open(result.fileUrl, "_blank");
      }

      // Store in localStorage that user has seen the popup
      localStorage.setItem(`exitIntent_${category}`, "true");

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    },
    onError: error => {
      console.error("Error downloading:", error);
      toast.error("Failed to send checklist. Please try again.");
    },
  });

  useEffect(() => {
    // Check if user has already seen the popup for this category
    const alreadyShown = localStorage.getItem(`exitIntent_${category}`);
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      // and user hasn't seen the popup yet
      if (e.clientY <= 0 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    // Add a delay before activating exit intent
    // to avoid triggering immediately on page load (5 seconds)
    timeoutId = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, isOpen, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    downloadMutation.mutate({
      leadMagnetId,
      email,
      name: name || undefined,
      utmSource: "exit_intent_popup",
      utmMedium: "popup",
      utmCampaign: `${category}_quick_wins`,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown even if they close without submitting
    localStorage.setItem(`exitIntent_${category}`, "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 text-white"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        {!submitted ? (
          <>
            {/* Header with gradient background */}
            <div
              className={`bg-gradient-to-r ${config.gradient} p-8 text-white`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <Download className="w-8 h-8" />
                </div>
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-white">
                  {config.title}
                </DialogTitle>
                <DialogDescription className="text-white/90 text-center text-base mt-2">
                  {config.subtitle}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Benefits preview */}
              <div
                className={`bg-gradient-to-br ${config.gradient.replace("from-", "from-").replace("to-", "to-").replace("-600", "-50")} p-6 rounded-lg border-2 ${config.gradient.replace("from-", "border-").replace(" to-", "").replace("-600", "-200")}`}
              >
                <h3 className="font-bold text-lg mb-3">
                  📋 Quick Wins Checklist Includes:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {config.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${config.gradient.replace("from-", "text-").replace(" to-", "").replace("-600", "-600")} mt-0.5 flex-shrink-0`}
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white font-semibold py-6`}
                  disabled={downloadMutation.isPending}
                >
                  {downloadMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      {config.ctaText}
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                🔒 We respect your privacy. Unsubscribe anytime. No spam, ever.
              </p>
            </div>
          </>
        ) : (
          // Success state
          <div className="p-8 text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Check Your Email!
            </h3>
            <p className="text-gray-600">
              We've sent the quick wins checklist to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Don't see it? Check your spam folder.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
