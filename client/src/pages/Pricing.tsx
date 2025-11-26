import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Check,
  X,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Sparkles,
  ChevronDown,
  Lock,
  Zap,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { APP_TITLE } from "@/const";
import Navigation from "@/components/Navigation";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { Link } from "wouter";

export default function Pricing() {
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the pricing work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing is based on the number of residents in your facility. You pay a simple per-resident monthly fee with no hidden costs. All features within your tier are included.",
        },
      },
      {
        "@type": "Question",
        name: "Can I switch plans later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a long-term contract?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All plans are month-to-month with no long-term commitment. You can cancel anytime with 30 days notice.",
        },
      },
      {
        "@type": "Question",
        name: "What's included in the free trial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 30-day free trial includes full access to all features in the Professional tier, including all 20 AI agents, integrations, and priority support.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer discounts for multiple facilities?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Enterprise customers with multiple facilities receive volume discounts. Contact our sales team for custom pricing.",
        },
      },
      {
        "@type": "Question",
        name: "What happens to our data if we cancel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can export all your data at any time. After cancellation, we retain your data for 90 days in case you want to return, then permanently delete it.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Pricing - Transparent Per-Resident Pricing for Care Facilities"
        description="Simple, transparent pricing starting at $59/resident/month. Calculate your ROI with 70% time savings and 100% compliance. Founding member discounts available for Q1 2026 launch."
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PricingContent />
    </>
  );
}

function PricingContent() {
  // ROI Calculator State
  const [residents, setResidents] = useState(20);
  const [staffCount, setStaffCount] = useState(15);
  const [currentSoftwareCost, setCurrentSoftwareCost] = useState(3000);
  const [avgHourlyWage, setAvgHourlyWage] = useState(18);

  // ROI Calculations
  const monthlyPrice =
    residents * (residents <= 10 ? 59 : residents <= 50 ? 79 : 99);
  const timeSavingsHoursPerMonth = staffCount * 80; // 80 hours saved per staff member per month
  const laborCostSavings = timeSavingsHoursPerMonth * avgHourlyWage;
  const softwareSavings = currentSoftwareCost - monthlyPrice;
  const totalMonthlySavings = laborCostSavings + softwareSavings;
  const annualSavings = totalMonthlySavings * 12;
  const roi = ((annualSavings - monthlyPrice * 12) / (monthlyPrice * 12)) * 100;

  const pricingTiers = [
    {
      name: "Starter",
      price: "$52",
      regularPrice: "$118",
      discount: "56%",
      period: "per resident/month",
      description:
        "Perfect for small group homes getting started with AI-powered care management",
      residents: "Up to 10 residents",
      features: [
        "5 Core AI Agents (DocuBot, Sentinel, Guardian, Compass, Nexus)",
        "Basic care planning & documentation",
        "Medication administration tracking",
        "Incident reporting & alerts",
        "Mobile app for staff",
        "Email support",
        "Basic analytics dashboard",
        "HIPAA-compliant data storage",
      ],
      notIncluded: [
        "Advanced AI agents",
        "Custom integrations",
        "Dedicated account manager",
        "White-glove migration",
      ],
      cta: "Reserve Spot",
      popular: false,
    },
    {
      name: "Professional",
      price: "$62",
      regularPrice: "$158",
      discount: "61%",
      period: "per resident/month",
      description:
        "Most popular for mid-sized facilities needing comprehensive automation",
      residents: "11-50 residents",
      features: [
        "All 20 AI Agents (complete suite)",
        "Advanced care planning with AI suggestions",
        "Predictive health monitoring",
        "Family engagement portal",
        "Gamification & staff recognition",
        "Priority support (24/7)",
        "Advanced analytics & reporting",
        "API access for integrations",
        "Microsoft 365 & QuickBooks integration",
        "Staff training & onboarding",
      ],
      notIncluded: ["Custom AI agent development", "White-label options"],
      cta: "Join Waitlist",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$69",
      regularPrice: "$198",
      discount: "65%",
      period: "per resident/month",
      description:
        "For large facilities and multi-site organizations requiring enterprise features",
      residents: "50+ residents",
      features: [
        "Everything in Professional",
        "Custom AI agent development",
        "White-label options",
        "Multi-site management dashboard",
        "Dedicated account manager",
        "White-glove migration service",
        "Custom integrations (EHR, payroll, etc.)",
        "Advanced security & compliance",
        "SLA guarantees (99.9% uptime)",
        "Quarterly business reviews",
        "Priority feature requests",
        "Unlimited API calls",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "How does the pricing work?",
      answer:
        "Pricing is based on the number of residents in your facility. You pay a simple per-resident monthly fee with no hidden costs. All features within your tier are included.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a long-term contract?",
      answer:
        "No. All plans are month-to-month with no long-term commitment. You can cancel anytime with 30 days notice.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "The 30-day free trial includes full access to all features in the Professional tier, including all 20 AI agents, integrations, and priority support.",
    },
    {
      question: "Do you offer discounts for multiple facilities?",
      answer:
        "Yes! Enterprise customers with multiple facilities receive volume discounts. Contact our sales team for custom pricing.",
    },
    {
      question: "What happens to our data if we cancel?",
      answer:
        "You can export all your data at any time. After cancellation, we retain your data for 90 days in case you want to return, then permanently delete it.",
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>🔥 Founding Member Early Access - Launching Q1 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Lock In{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Founding Member Rates
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Save <strong className="text-foreground">56-65% off</strong> regular
            pricing forever as a founding member. Plus get{" "}
            <strong className="text-foreground">40% off onboarding</strong> and{" "}
            <strong className="text-foreground">
              40% off yearly maintenance
            </strong>{" "}
            fees.
          </p>
          <p className="text-lg text-destructive font-semibold mb-8">
            ⏰ Only 50 founding member spots available - 23 remaining
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative p-8 ${
                  tier.popular
                    ? "border-2 border-primary shadow-2xl shadow-primary/20 scale-105"
                    : "border border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>{tier.discount} OFF - Founding Member</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl text-muted-foreground line-through">
                        {tier.regularPrice}
                      </span>
                      <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">
                        -{tier.discount}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-primary">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground">
                        {tier.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {tier.residents}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    ✓ Price locked in forever
                  </p>
                </div>

                <Button
                  className={`w-full mb-6 rounded-full ${
                    tier.popular
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-3">
                      What's included:
                    </p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold mb-3 text-muted-foreground">
                        Not included:
                      </p>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Founding Member Exclusive Benefits */}
          <Card className="mt-16 p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-amber-500/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Founding Member Exclusive Benefits</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Lock In These Bonuses Forever
              </h3>
              <p className="text-muted-foreground">
                Available only to the first 50 customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">56-65% Off Forever</h4>
                  <p className="text-sm text-muted-foreground">
                    Your founding member rate is locked in permanently. Never
                    pay full price, even as we add new features.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    40% Off Onboarding Fees
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    White-glove migration, data import, and staff training at
                    40% discount (value disclosed at launch).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    40% Off Yearly Maintenance
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Annual system maintenance, updates, and optimization at 40%
                    discount forever (value disclosed at launch).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Early Access to New Features
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Be the first to test and use new AI agents and features
                    before general release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Founding Member Badge</h4>
                  <p className="text-sm text-muted-foreground">
                    Exclusive badge in the app and recognition in our founding
                    member community.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Priority Feature Requests
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your feedback shapes our roadmap. Founding members get first
                    priority on feature requests.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-destructive font-semibold mb-4">
                ⚠️ Founding member pricing ends when we reach 50 customers or
                March 31, 2025—whichever comes first
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Claim Your Founding Member Spot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>99.9% uptime SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section
        id="calculator"
        className="py-20 px-4 bg-gradient-to-b from-background to-accent/5"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Calculate Your Savings</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                ROI in Real-Time
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your facility details to see how much you'll save with
              Harmony Care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">Your Facility Details</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="residents">Number of Residents</Label>
                    <span className="text-2xl font-bold text-primary">
                      {residents}
                    </span>
                  </div>
                  <Slider
                    id="residents"
                    min={5}
                    max={200}
                    step={5}
                    value={[residents]}
                    onValueChange={value => setResidents(value[0])}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjust to match your facility size
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="staff">Number of Staff Members</Label>
                    <span className="text-2xl font-bold text-primary">
                      {staffCount}
                    </span>
                  </div>
                  <Slider
                    id="staff"
                    min={5}
                    max={150}
                    step={5}
                    value={[staffCount]}
                    onValueChange={value => setStaffCount(value[0])}
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Total direct care and administrative staff
                  </p>
                </div>

                <div>
                  <Label htmlFor="current-cost">
                    Current Software Cost (Monthly)
                  </Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="current-cost"
                      type="number"
                      value={currentSoftwareCost}
                      onChange={e =>
                        setCurrentSoftwareCost(Number(e.target.value))
                      }
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total spent on current software solutions
                  </p>
                </div>

                <div>
                  <Label htmlFor="hourly-wage">Average Staff Hourly Wage</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="hourly-wage"
                      type="number"
                      value={avgHourlyWage}
                      onChange={e => setAvgHourlyWage(Number(e.target.value))}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Average hourly rate including benefits
                  </p>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-xl font-bold mb-6">Your Estimated Savings</h3>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Harmony Care Monthly Cost
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ${monthlyPrice.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${residents <= 10 ? 59 : residents <= 50 ? 79 : 99} per
                    resident × {residents} residents
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm">Time Savings (Labor Cost)</span>
                    <span className="text-lg font-bold text-green-500">
                      +${laborCostSavings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm">Software Cost Savings</span>
                    <span className="text-lg font-bold text-green-500">
                      +${softwareSavings.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border-2 border-green-500/20">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Monthly Savings
                  </p>
                  <p className="text-4xl font-bold text-green-500">
                    ${totalMonthlySavings.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">
                    Annual Savings
                  </p>
                  <p className="text-4xl font-bold text-primary">
                    ${annualSavings.toLocaleString()}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">
                    Return on Investment (ROI)
                  </p>
                  <p className="text-3xl font-bold">{roi.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {timeSavingsHoursPerMonth.toLocaleString()} staff hours
                    saved per month
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                >
                  Start Saving Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* ROI Explanation */}
          <div className="mt-12 p-6 rounded-xl bg-accent/5 border border-border">
            <h4 className="font-semibold mb-3">
              How We Calculate Your Savings:
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Time Savings:</strong> Our AI agents save each staff
                  member an average of 80 hours per month on documentation,
                  scheduling, and administrative tasks. This translates to $
                  {laborCostSavings.toLocaleString()}/month in labor cost
                  savings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Software Consolidation:</strong> Harmony Care replaces
                  multiple point solutions (EHR, scheduling, compliance,
                  communication) saving you ${softwareSavings.toLocaleString()}
                  /month in software costs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Additional Benefits:</strong> These calculations don't
                  include reduced hospitalizations (20-30% fewer), improved
                  staff retention (25% reduction in turnover), and better
                  compliance outcomes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about pricing and plans
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the perfect plan for your
              facility
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Schedule a Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-border hover:bg-accent/10"
              >
                Email Sales Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="text-muted-foreground">
              Your data is protected with industry-leading standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg border">
              <Shield className="w-12 h-12 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-sm">HIPAA</p>
                <p className="text-xs text-muted-foreground">Compliant</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg border">
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-sm">SOC 2</p>
                <p className="text-xs text-muted-foreground">Type II</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg border">
              <Lock className="w-12 h-12 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-sm">256-bit</p>
                <p className="text-xs text-muted-foreground">Encryption</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg border">
              <Zap className="w-12 h-12 text-primary" />
              <div className="text-center">
                <p className="font-semibold text-sm">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure Your Founding Member Status
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lock in exclusive early access pricing and be among the first to
            transform your facility when we launch in Q1 2026
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
            >
              Reserve Founding Member Spot
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-border hover:bg-accent/10"
            >
              Join Early Access Waitlist
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Full access to all features • Cancel
            anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-Native Care Management for Residential Facilities
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    20 AI Agents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    For Group Homes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    For ICF-ID
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    For Families
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2
              Certified
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
