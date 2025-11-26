import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface NewsletterSignupProps {
  source?: string; // Track where the signup came from (e.g., "blog-article")
}

/**
 * Newsletter signup component for capturing subscriber emails
 * Displays in blog article footers and other strategic locations
 */
export function NewsletterSignup({ source = "blog" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeMutation.mutateAsync({
        email,
        source,
      });

      if (result.success) {
        setIsSubscribed(true);
        toast.success(result.message);
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-8 border border-primary/20">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              You're all set!
            </h3>
            <p className="text-muted-foreground">
              Check your inbox for a confirmation email.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-2xl p-8 border border-primary/20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Get More Insights Like This
            </h3>
            <p className="text-muted-foreground">
              Join 2,000+ care facility administrators receiving our weekly
              newsletter with practical strategies, compliance updates, and
              technology insights.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
          No spam, ever. Unsubscribe anytime. By subscribing, you agree to our
          Privacy Policy.
        </p>
      </div>
    </div>
  );
}
