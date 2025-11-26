import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Check,
} from "lucide-react";
import { APP_TITLE } from "@/const";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { Link } from "wouter";

export default function Demo() {
  return (
    <>
      <SEOHead
        title="Book a Demo - See HarmonyCare's 20 AI Agents in Action"
        description="Schedule a personalized demo to see how HarmonyCare's AI agents automate documentation, ensure compliance, and enhance resident care. Get a custom ROI analysis for your facility. Book your 30-minute demo today."
      />
      <DemoContent />
    </>
  );
}

function DemoContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Facility Info
    facilityName: "",
    facilityType: "",
    numberOfResidents: "",
    location: "",
    contactName: "",
    email: "",
    phone: "",
    // Step 2: Challenges
    challenges: [] as string[],
    // Step 3: Scheduling
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const facilityTypes = [
    "Group Home",
    "ICF-ID",
    "Residential Care Facility",
    "Assisted Living",
    "Memory Care",
    "Other",
  ];

  const residentRanges = [
    "1-5 residents",
    "6-10 residents",
    "11-20 residents",
    "21-50 residents",
    "51+ residents",
  ];

  const challengeOptions = [
    "Excessive paperwork and documentation burden",
    "Staff turnover and retention issues",
    "Compliance violations and inspection stress",
    "Medication administration errors",
    "Difficulty tracking resident health changes",
    "Inefficient scheduling and staffing",
    "Poor family communication",
    "Lack of real-time data and analytics",
    "Manual incident reporting",
    "Training and certification tracking",
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge],
    }));
  };

  const canProceedStep1 =
    formData.facilityName &&
    formData.facilityType &&
    formData.numberOfResidents &&
    formData.contactName &&
    formData.email &&
    formData.phone;

  const canProceedStep2 = formData.challenges.length > 0;

  const canSubmit = formData.preferredDate && formData.preferredTime;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In production, this would send data to backend
    console.log("Demo request submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">{APP_TITLE}</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <Card className="max-w-2xl w-full p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Demo Request Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you, {formData.contactName}! We've received your demo
              request for {formData.facilityName}.
            </p>
            <div className="bg-accent/30 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Scheduled Date
                  </p>
                  <p className="font-semibold">
                    {new Date(formData.preferredDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Time</p>
                  <p className="font-semibold">{formData.preferredTime}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground mb-8">
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Confirmation email sent to {formData.email}
              </p>
              <p className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar invite sent with meeting link
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="rounded-full">
                  Back to Home
                </Button>
              </Link>
              <Link href="/agents">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  Explore AI Agents
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">{APP_TITLE}</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/agents"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                AI Agents
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Personalized Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            See Harmony Care{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              In Action
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a personalized walkthrough of how our 20 AI agents can transform
            your facility operations. No commitment required.
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="pb-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step
                        ? "bg-primary text-white"
                        : "bg-accent text-muted-foreground"
                    }`}
                  >
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                    {step === 1
                      ? "Facility Info"
                      : step === 2
                        ? "Challenges"
                        : "Schedule"}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step ? "bg-primary" : "bg-accent"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8">
            {/* Step 1: Facility Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Tell Us About Your Facility
                  </h2>
                  <p className="text-muted-foreground">
                    Help us understand your needs so we can personalize the
                    demo.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="facilityName"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Building2 className="w-4 h-4" />
                      Facility Name *
                    </Label>
                    <Input
                      id="facilityName"
                      placeholder="e.g., Sunshine Group Home"
                      value={formData.facilityName}
                      onChange={e =>
                        handleInputChange("facilityName", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facilityType" className="mb-2 block">
                        Facility Type *
                      </Label>
                      <select
                        id="facilityType"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        value={formData.facilityType}
                        onChange={e =>
                          handleInputChange("facilityType", e.target.value)
                        }
                      >
                        <option value="">Select type...</option>
                        {facilityTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label
                        htmlFor="numberOfResidents"
                        className="flex items-center gap-2 mb-2"
                      >
                        <Users className="w-4 h-4" />
                        Number of Residents *
                      </Label>
                      <select
                        id="numberOfResidents"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        value={formData.numberOfResidents}
                        onChange={e =>
                          handleInputChange("numberOfResidents", e.target.value)
                        }
                      >
                        <option value="">Select range...</option>
                        {residentRanges.map(range => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="location"
                      className="flex items-center gap-2 mb-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Location (City, State/Province)
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={e =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>

                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contactName" className="mb-2 block">
                          Your Name *
                        </Label>
                        <Input
                          id="contactName"
                          placeholder="John Smith"
                          value={formData.contactName}
                          onChange={e =>
                            handleInputChange("contactName", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="email"
                            className="flex items-center gap-2 mb-2"
                          >
                            <Mail className="w-4 h-4" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@facility.com"
                            value={formData.email}
                            onChange={e =>
                              handleInputChange("email", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="phone"
                            className="flex items-center gap-2 mb-2"
                          >
                            <Phone className="w-4 h-4" />
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={e =>
                              handleInputChange("phone", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleNext}
                    disabled={!canProceedStep1}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Challenges */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    What Challenges Are You Facing?
                  </h2>
                  <p className="text-muted-foreground">
                    Select all that apply so we can focus the demo on your
                    needs.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {challengeOptions.map(challenge => (
                    <button
                      key={challenge}
                      onClick={() => handleChallengeToggle(challenge)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.challenges.includes(challenge)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            formData.challenges.includes(challenge)
                              ? "border-primary bg-primary"
                              : "border-border"
                          }`}
                        >
                          {formData.challenges.includes(challenge) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm">{challenge}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {formData.challenges.length > 0 && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm font-medium mb-2">
                      Selected challenges ({formData.challenges.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.challenges.map(challenge => (
                        <Badge
                          key={challenge}
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {challenge.length > 40
                            ? challenge.substring(0, 40) + "..."
                            : challenge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceedStep2}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Pick Your Preferred Time
                  </h2>
                  <p className="text-muted-foreground">
                    Choose a date and time that works best for you. The demo
                    typically takes 30-45 minutes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="preferredDate"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferredDate}
                      onChange={e =>
                        handleInputChange("preferredDate", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="preferredTime"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Clock className="w-4 h-4" />
                      Preferred Time (EST) *
                    </Label>
                    <select
                      id="preferredTime"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={formData.preferredTime}
                      onChange={e =>
                        handleInputChange("preferredTime", e.target.value)
                      }
                    >
                      <option value="">Select time...</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes" className="mb-2 block">
                      Additional Notes (Optional)
                    </Label>
                    <textarea
                      id="additionalNotes"
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                      placeholder="Any specific questions or areas you'd like us to focus on during the demo?"
                      value={formData.additionalNotes}
                      onChange={e =>
                        handleInputChange("additionalNotes", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-accent/30">
                  <h3 className="font-semibold mb-3">What to Expect:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        30-45 minute personalized demo tailored to your
                        challenges
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>
                        Live walkthrough of the 20 AI agents in action
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Q&A session with our product experts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Custom ROI analysis for your facility</span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="rounded-full px-8"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  >
                    Confirm Demo Request
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>HIPAA compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2
            Certified
          </p>
        </div>
      </footer>
    </div>
  );
}
