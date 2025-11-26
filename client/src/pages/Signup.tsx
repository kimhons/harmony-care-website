import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getCurrentUTMParams, initUTMTracking } from "@/lib/utm";

export default function Signup() {
  return (
    <>
      <SEOHead
        title="Join HarmonyCare - Founding Member Signup for Q1 2026 Launch"
        description="Secure your spot as a founding member of HarmonyCare. Lock in exclusive pricing, priority onboarding, and lifetime benefits. Limited slots available for Q1 2026 launch. Join 500+ facilities transforming care with AI."
      />
      <SignupContent />
    </>
  );
}

function SignupContent() {
  // Initialize UTM tracking on mount
  useEffect(() => {
    initUTMTracking();
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    facilityName: "",
    facilityType: "",
    residentCount: "",
    tier: "",
    interestedFeatures: [] as string[],
    additionalNeeds: "",
    referralCode: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralValidation, setReferralValidation] = useState<{
    status: "idle" | "checking" | "valid" | "invalid";
    message: string;
  }>({ status: "idle", message: "" });

  const signupMutation = trpc.signup.create.useMutation();

  // Debounced referral code validation
  useEffect(() => {
    if (!formData.referralCode || formData.referralCode.length < 8) {
      setReferralValidation({ status: "idle", message: "" });
      return;
    }

    setReferralValidation({ status: "checking", message: "" });

    const timer = setTimeout(async () => {
      try {
        const result = await fetch(
          `/api/trpc/referral.validate?input=${encodeURIComponent(JSON.stringify({ code: formData.referralCode }))}`
        );
        const data = await result.json();

        if (data.result?.data?.valid) {
          setReferralValidation({
            status: "valid",
            message: data.result.data.message,
          });
        } else {
          setReferralValidation({
            status: "invalid",
            message: data.result?.data?.message || "Invalid referral code",
          });
        }
      } catch (error) {
        console.error("Referral validation error:", error);
        setReferralValidation({
          status: "invalid",
          message: "Unable to validate code. Please try again.",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.referralCode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.facilityName.trim())
      newErrors.facilityName = "Facility name is required";
    if (!formData.facilityType)
      newErrors.facilityType = "Please select facility type";
    if (!formData.residentCount) {
      newErrors.residentCount = "Resident count is required";
    } else if (
      isNaN(Number(formData.residentCount)) ||
      Number(formData.residentCount) < 1
    ) {
      newErrors.residentCount = "Please enter a valid number";
    }
    if (!formData.tier) newErrors.tier = "Please select a tier";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Capture UTM parameters
      const utmParams = getCurrentUTMParams();

      await signupMutation.mutateAsync({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        facilityName: formData.facilityName,
        facilityType: formData.facilityType,
        residentCount: Number(formData.residentCount),
        tier: formData.tier,
        interestedFeatures:
          formData.interestedFeatures.length > 0
            ? formData.interestedFeatures
            : undefined,
        additionalNeeds: formData.additionalNeeds || undefined,
        referralCode: formData.referralCode || undefined,
        ...utmParams, // Include UTM tracking data
      });

      setSubmitted(true);
      toast.success(
        "Welcome to HarmonyCare! Check your email for confirmation."
      );

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(
        error.message || "Failed to submit signup. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />

        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              You're on the List! 🎉
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Welcome to the HarmonyCare founding member community,{" "}
              <strong>{formData.firstName}</strong>!
            </p>

            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-3">What happens next:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>
                    Check your email (<strong>{formData.email}</strong>) for
                    your founding member confirmation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>
                    We'll send you exclusive updates on development progress and
                    beta access
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>
                    You'll be invited to provide input on features and roadmap
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Your founding member pricing is locked in forever</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                onClick={() => (window.location.href = "/")}
              >
                Return to Homepage
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                onClick={() => (window.location.href = "/pricing")}
              >
                View Pricing Details
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>🔥 Only 23 Founding Member Spots Remaining</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Founding Member
            </span>{" "}
            Status
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join the exclusive group of forward-thinking care facilities locking
            in <strong>56-65% off</strong> regular pricing forever. Launch: Q1
            2026.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Information</h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={e =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "border-destructive" : ""}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={e =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "border-destructive" : ""}
                      placeholder="Smith"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                      placeholder="john@facility.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => handleInputChange("phone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                  <Input
                    id="referralCode"
                    value={formData.referralCode}
                    onChange={e =>
                      handleInputChange(
                        "referralCode",
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="HARMONY-XXXX"
                    className={
                      referralValidation.status === "invalid"
                        ? "border-destructive"
                        : referralValidation.status === "valid"
                          ? "border-green-500"
                          : ""
                    }
                  />
                  {referralValidation.status === "checking" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Validating code...
                    </p>
                  )}
                  {referralValidation.status === "valid" && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {referralValidation.message}
                    </p>
                  )}
                  {referralValidation.status === "invalid" && (
                    <p className="text-sm text-destructive mt-1">
                      {referralValidation.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Have a referral code from a founding member? Enter it here
                    for exclusive rewards.
                  </p>
                </div>
              </div>

              {/* Facility Information */}
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-6">Facility Details</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="facilityName">Facility Name *</Label>
                    <Input
                      id="facilityName"
                      value={formData.facilityName}
                      onChange={e =>
                        handleInputChange("facilityName", e.target.value)
                      }
                      className={
                        errors.facilityName ? "border-destructive" : ""
                      }
                      placeholder="Sunshine Care Home"
                    />
                    {errors.facilityName && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.facilityName}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facilityType">Facility Type *</Label>
                      <Select
                        value={formData.facilityType}
                        onValueChange={value =>
                          handleInputChange("facilityType", value)
                        }
                      >
                        <SelectTrigger
                          id="facilityType"
                          className={
                            errors.facilityType ? "border-destructive" : ""
                          }
                        >
                          <SelectValue placeholder="Select facility type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="group-home">
                            Group Home (1-10 residents)
                          </SelectItem>
                          <SelectItem value="icf-id">
                            ICF-ID (11-50 residents)
                          </SelectItem>
                          <SelectItem value="assisted-living">
                            Assisted Living (50+ residents)
                          </SelectItem>
                          <SelectItem value="nursing-home">
                            Nursing Home
                          </SelectItem>
                          <SelectItem value="memory-care">
                            Memory Care
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.facilityType && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.facilityType}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="residentCount">
                        Number of Residents *
                      </Label>
                      <Input
                        id="residentCount"
                        type="number"
                        min="1"
                        value={formData.residentCount}
                        onChange={e =>
                          handleInputChange("residentCount", e.target.value)
                        }
                        className={
                          errors.residentCount ? "border-destructive" : ""
                        }
                        placeholder="6"
                      />
                      {errors.residentCount && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.residentCount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-4">Select Your Tier</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Choose the plan that best fits your facility size. You can
                  change this later.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      formData.tier === "starter"
                        ? "border-primary border-2 bg-primary/5"
                        : ""
                    }`}
                    onClick={() => handleInputChange("tier", "starter")}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">Starter</h3>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-primary">
                          $52
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /resident/mo
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        <span className="line-through">$118</span> regular price
                      </p>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                        Save 56%
                      </p>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all hover:border-primary relative ${
                      formData.tier === "professional"
                        ? "border-primary border-2 bg-primary/5"
                        : ""
                    }`}
                    onClick={() => handleInputChange("tier", "professional")}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">Professional</h3>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-primary">
                          $62
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /resident/mo
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        <span className="line-through">$158</span> regular price
                      </p>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                        Save 61%
                      </p>
                    </div>
                  </Card>

                  <Card
                    className={`p-4 cursor-pointer transition-all hover:border-primary ${
                      formData.tier === "enterprise"
                        ? "border-primary border-2 bg-primary/5"
                        : ""
                    }`}
                    onClick={() => handleInputChange("tier", "enterprise")}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">Enterprise</h3>
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-primary">
                          $69
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /resident/mo
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        <span className="line-through">$198</span> regular price
                      </p>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                        Save 65%
                      </p>
                    </div>
                  </Card>
                </div>
                {errors.tier && (
                  <p className="text-sm text-destructive mt-2">{errors.tier}</p>
                )}
              </div>

              {/* Feature Questionnaire */}
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-4">
                  What features are you most interested in?
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Select all that apply. This helps us prioritize development
                  and customize your onboarding.
                </p>

                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {[
                    {
                      id: "documentation",
                      label: "Automated Documentation (DocuBot)",
                    },
                    {
                      id: "compliance",
                      label: "Compliance Monitoring (Guardian)",
                    },
                    { id: "scheduling", label: "Staff Scheduling (Nexus)" },
                    {
                      id: "medication",
                      label: "Medication Management (MedBot)",
                    },
                    { id: "billing", label: "Billing & Invoicing (FinBot)" },
                    {
                      id: "health-monitoring",
                      label: "Health Monitoring (Sentinel)",
                    },
                    {
                      id: "family-communication",
                      label: "Family Communication (Relay)",
                    },
                    { id: "hr-management", label: "HR Management" },
                    { id: "maintenance", label: "Facility Maintenance" },
                    { id: "nutrition", label: "Nutrition & Meal Planning" },
                  ].map(feature => (
                    <label
                      key={feature.id}
                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/5 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interestedFeatures.includes(
                          feature.id
                        )}
                        onChange={e => {
                          const newFeatures = e.target.checked
                            ? [...formData.interestedFeatures, feature.id]
                            : formData.interestedFeatures.filter(
                                f => f !== feature.id
                              );
                          setFormData(prev => ({
                            ...prev,
                            interestedFeatures: newFeatures,
                          }));
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{feature.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <Label htmlFor="additionalNeeds">
                    Additional Needs or Custom Requirements
                  </Label>
                  <textarea
                    id="additionalNeeds"
                    value={formData.additionalNeeds}
                    onChange={e =>
                      handleInputChange("additionalNeeds", e.target.value)
                    }
                    className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Tell us about any specific features, integrations, or workflows you need...\n\nExamples:\n- Integration with our current EHR system (Epic)\n- Custom reporting for state surveys\n- Bilingual support (Spanish)\n- Specific compliance requirements"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    The more details you provide, the better we can tailor the
                    platform to your needs.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full text-lg"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Secure My Founding Member Spot"}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By signing up, you agree to receive updates about HarmonyCare.
                  No payment required now.
                </p>
              </div>
            </form>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by forward-thinking care facilities
            </p>
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ No credit card required</span>
              <span>✓ Lifetime pricing lock</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
