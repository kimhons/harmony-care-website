import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield, Brain, Calendar, Users, FileText, TrendingUp, Award, CheckCircle2, Play, ArrowRight, Star, Briefcase, UserCheck, Wrench, UtensilsCrossed, Truck } from "lucide-react";
import { APP_TITLE } from "@/const";
import VideoModal from "@/components/VideoModal";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const agents = [
    {
      name: "DocuBot",
      icon: FileText,
      description: "Voice-to-text documentation",
      impact: "70% time savings",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Sentinel",
      icon: Shield,
      description: "Predicts health crises before they happen",
      impact: "30% fewer hospitalizations",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Guardian",
      icon: Award,
      description: "Continuous compliance monitoring",
      impact: "100% audit ready",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Compass",
      icon: Brain,
      description: "Personalized care plans with AI",
      impact: "Dynamic adaptation",
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Nexus",
      icon: Calendar,
      description: "Intelligent scheduling optimizer",
      impact: "75% faster scheduling",
      color: "from-indigo-500 to-blue-500"
    },
    {
      name: "Executive Assistant",
      icon: Briefcase,
      description: "Strategic planning & board reporting",
      impact: "Executive insights",
      color: "from-violet-500 to-purple-500"
    },
    {
      name: "HR Manager",
      icon: UserCheck,
      description: "Recruitment & employee relations",
      impact: "60% faster hiring",
      color: "from-rose-500 to-pink-500"
    },
    {
      name: "Maintenance Coordinator",
      icon: Wrench,
      description: "Facility maintenance & safety",
      impact: "Proactive repairs",
      color: "from-amber-500 to-yellow-500"
    },
    {
      name: "Nutrition Specialist",
      icon: UtensilsCrossed,
      description: "Menu planning & dietary tracking",
      impact: "100% diet compliance",
      color: "from-lime-500 to-green-500"
    },
    {
      name: "Transportation Manager",
      icon: Truck,
      description: "Vehicle scheduling & appointments",
      impact: "Zero missed rides",
      color: "from-sky-500 to-blue-500"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "Voice-to-Text Documentation",
      description: "Speak naturally, get compliant notes instantly. No more typing for hours."
    },
    {
      icon: Shield,
      title: "Predictive Health Monitoring",
      description: "AI detects subtle patterns and alerts you before crises occur."
    },
    {
      icon: CheckCircle2,
      title: "Automated Compliance Reporting",
      description: "Always inspection-ready with continuous monitoring and one-click reports."
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "Solve staffing crises in seconds with AI-powered optimization."
    },
    {
      icon: Users,
      title: "Family Engagement Portal",
      description: "Keep families connected with daily updates, photos, and two-way messaging."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Data-driven insights to improve care quality and operational efficiency."
    }
  ];

  const outcomes = [
    { metric: "70%", label: "Reduction in documentation time" },
    { metric: "30%", label: "Fewer preventable hospitalizations" },
    { metric: "95%", label: "Staff satisfaction improvement" },
    { metric: "100%", label: "Compliance audit pass rate" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section - Happy Medical Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-blue-100/20 pt-14">
        {/* Animated Background Gradient - Soft Medical Colors */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[80px] animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-5 py-2 mb-8 animate-fade-in">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">20 AI Agents • Available Now</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-fade-in-up text-foreground">
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Resident Care Facility
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
              20 autonomous AI agents working 24/7 to reduce paperwork by 70%, ensure 100% compliance, and let caregivers focus on what matters most: caring.
            </p>

            {/* Video Container */}
            <div className="relative max-w-4xl mx-auto mb-12 animate-fade-in-up delay-200">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl shadow-primary/20 border border-primary/20">
                {/* Video Thumbnail/Placeholder */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-100/60 to-accent/15 flex items-center justify-center group cursor-pointer"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-foreground font-semibold text-lg">See Harmony Care in Action</p>
                    <p className="text-muted-foreground text-sm">2-minute product overview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
              <Link href="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-base font-semibold">
                  Schedule Your Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-white/20 hover:bg-white/10">
                Start Free Trial
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Caregivers Shouldn't Spend
              <br />
              <span className="text-destructive">60% of Their Time on Paperwork</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              While you're drowning in documentation, compliance violations, and staffing crises, your residents need care—not administrators buried in forms.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-6 rounded-xl bg-background border border-border">
                <div className="text-4xl font-bold text-destructive mb-2">60%</div>
                <p className="text-muted-foreground">Time spent on paperwork instead of caring</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-border">
                <div className="text-4xl font-bold text-destructive mb-2">$50K+</div>
                <p className="text-muted-foreground">Average cost per compliance violation</p>
              </div>
              <div className="p-6 rounded-xl bg-background border border-border">
                <div className="text-4xl font-bold text-destructive mb-2">50%+</div>
                <p className="text-muted-foreground">Annual staff turnover from burnout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Showcase */}
      <section className="py-24 bg-background" id="product">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Meet Your Digital Care Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              20 AI Agents Working
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">24/7 For Your Facility</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Autonomous AI agents that observe, reason, act, and learn—transforming every aspect of care management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                  <p className="text-muted-foreground mb-4">{agent.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{agent.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/agents">
              <Button variant="outline" size="lg" className="rounded-full">
                Explore All 20 Agents
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything You Need,
                <br />
                <span className="text-primary">Nothing You Don't</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                200+ features across 20 categories, all designed for residential care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Real Results from
                <br />
                <span className="text-primary">Real Facilities</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {outcomes.map((outcome, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-card border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">{outcome.metric}</div>
                  <p className="text-muted-foreground">{outcome.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-card" id="pricing">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>🔥 Founding Member Pricing - Limited Time</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Lock In{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Founding Member Rates
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              <span className="text-muted-foreground line-through">$118-$198/resident</span>{" "}
              <span className="text-primary font-bold">$52-$69/resident/month</span>
            </p>
            <p className="text-lg text-muted-foreground mb-2">
              <strong className="text-foreground">Save 56-65% off</strong> regular pricing forever + <strong className="text-foreground">40% off onboarding & maintenance</strong>
            </p>
            <p className="text-sm text-destructive font-semibold mb-12">
              ⏰ Only 23 founding member spots remaining
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              View Pricing Details
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Facility?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join the future of residential care management. Schedule a personalized demo today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                  Schedule Personalized Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Start 30-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoId="dQw4w9WgXcQ"
        title="Harmony Care Product Demo"
      />

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-native care management for residential facilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Overview</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">20 AI Agents</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">For Group Homes</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For ICF-ID</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For Administrators</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For Families</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 {APP_TITLE}. All rights reserved. | HIPAA Compliant | SOC 2 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
