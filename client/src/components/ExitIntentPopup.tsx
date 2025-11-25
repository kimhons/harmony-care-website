import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Mutation for capturing lead
  const captureLeadMutation = trpc.calculator.submitLead.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Success! Check your email for the guide.');
      // Store in localStorage that user has seen the popup
      localStorage.setItem('exitIntentShown', 'true');
      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        onClose?.();
      }, 3000);
    },
    onError: (error) => {
      console.error('Error capturing lead:', error);
      toast.error('Failed to send guide. Please try again.');
    },
  });

  useEffect(() => {
    // Check if user has already seen the popup
    const alreadyShown = localStorage.getItem('exitIntentShown');
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

    // Add a small delay before activating exit intent
    // to avoid triggering immediately on page load
    timeoutId = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Submit with minimal data for guide download
    captureLeadMutation.mutate({
      email,
      residents: 0, // Not from calculator
      facilityType: 'group-home',
      annualSavings: 0,
      breakdowns: {
        reducedOvertime: 0,
        fewerErrors: 0,
        complianceSavings: 0,
        improvedRetention: 0,
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    // Mark as shown even if they close without submitting
    localStorage.setItem('exitIntentShown', 'true');
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {!submitted ? (
          <>
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Download className="w-8 h-8" />
                </div>
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-white">
                  Wait! Before You Go...
                </DialogTitle>
                <DialogDescription className="text-white/90 text-center text-base mt-2">
                  Get your free guide and discover proven strategies to reduce paperwork
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Guide preview */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
                <h3 className="font-bold text-lg mb-3 text-purple-900">
                  📘 Free Guide: "10 Ways to Reduce Paperwork in Your Care Facility"
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Proven strategies from 50+ successful facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Reduce documentation time by up to 70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Ensure 100% compliance while saving time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Actionable tips you can implement today</span>
                  </li>
                </ul>
              </div>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6"
                  disabled={captureLeadMutation.isPending}
                >
                  {captureLeadMutation.isPending ? (
                    'Sending...'
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Send Me the Free Guide
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
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
              We've sent the free guide to <strong>{email}</strong>
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
