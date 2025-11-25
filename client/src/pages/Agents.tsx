import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Heart, 
  Shield, 
  Brain, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award, 
  GraduationCap,
  DollarSign,
  Target,
  Activity,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  Briefcase,
  UserCheck,
  Wrench,
  UtensilsCrossed,
  Truck
} from "lucide-react";
import { APP_TITLE } from "@/const";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { Link } from "wouter";

export default function Agents() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Agents", count: 20 },
    { id: "clinical", name: "Clinical Care", count: 6 },
    { id: "operations", name: "Operations", count: 7 },
    { id: "compliance", name: "Compliance & Quality", count: 3 },
    { id: "engagement", name: "Engagement", count: 4 },
  ];

  const agents = [
    {
      id: 1,
      name: "DocuBot",
      tagline: "Your AI Documentation Assistant",
      category: "clinical",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      description: "DocuBot transforms voice notes into compliant clinical documentation in seconds. Simply speak naturally about resident care, and DocuBot generates properly formatted, regulation-compliant notes with all required elements.",
      useCases: [
        "Convert voice notes to clinical documentation during care delivery",
        "Auto-complete shift reports with proper medical terminology",
        "Generate incident reports from verbal descriptions",
        "Create family communication summaries from staff observations"
      ],
      impact: {
        metric: "70% time savings",
        detail: "Reduces documentation time from 2 hours to 30 minutes per shift"
      },
      features: [
        "Voice-to-text with medical terminology recognition",
        "Auto-formatting to state-specific templates",
        "Real-time compliance checking",
        "Multi-language support"
      ]
    },
    {
      id: 2,
      name: "Sentinel",
      tagline: "Predictive Health Monitoring",
      category: "clinical",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      description: "Sentinel continuously monitors resident health data to predict potential crises before they happen. Using advanced ML models, it detects subtle patterns that indicate UTIs, falls, medication issues, or behavioral changes 24-48 hours in advance.",
      useCases: [
        "Predict UTI onset from sleep patterns and fluid intake changes",
        "Identify fall risk from gait analysis and activity levels",
        "Detect early signs of behavioral escalation",
        "Alert staff to medication side effects before they become serious"
      ],
      impact: {
        metric: "30% fewer hospitalizations",
        detail: "Prevents 3-5 emergency room visits per facility per month"
      },
      features: [
        "Real-time vital signs monitoring",
        "Pattern recognition across 50+ health indicators",
        "Predictive alerts with recommended interventions",
        "Integration with wearable devices"
      ]
    },
    {
      id: 3,
      name: "Guardian",
      tagline: "Continuous Compliance Monitoring",
      category: "compliance",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
      description: "Guardian ensures 100% regulatory compliance 24/7 by continuously monitoring all operations against federal, state, and provincial requirements. It automatically flags gaps, suggests corrections, and generates inspection-ready reports.",
      useCases: [
        "Monitor medication administration for compliance violations",
        "Track staff certification expiration dates",
        "Ensure care plan updates meet regulatory timelines",
        "Generate pre-inspection audit reports"
      ],
      impact: {
        metric: "100% compliance rate",
        detail: "Zero compliance violations in facilities using Guardian for 6+ months"
      },
      features: [
        "Real-time regulation tracking (U.S., Canada, Quebec)",
        "Automated gap identification",
        "Corrective action plan generation",
        "One-click inspection reports"
      ]
    },
    {
      id: 4,
      name: "Compass",
      tagline: "Personalized Care Planning",
      category: "clinical",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
      description: "Compass creates dynamic, person-centered care plans that evolve with each resident's changing needs. It analyzes resident preferences, health data, and outcomes to suggest evidence-based interventions tailored to individual goals.",
      useCases: [
        "Generate initial care plans from admission assessments",
        "Suggest interventions based on similar resident outcomes",
        "Auto-update care plans when health status changes",
        "Align activities with resident preferences and goals"
      ],
      impact: {
        metric: "95% goal achievement",
        detail: "Residents reach care plan goals 40% faster than traditional methods"
      },
      features: [
        "AI-powered intervention suggestions",
        "Evidence-based practice library",
        "Quarterly review automation",
        "Family collaboration portal"
      ]
    },
    {
      id: 5,
      name: "Nexus",
      tagline: "Intelligent Scheduling Optimizer",
      category: "operations",
      icon: Calendar,
      color: "from-orange-500 to-amber-600",
      description: "Nexus solves staffing crises in seconds by optimizing schedules based on certifications, resident acuity, overtime rules, and staff preferences. When someone calls out sick, Nexus instantly finds the best replacement and sends notifications.",
      useCases: [
        "Auto-generate monthly schedules optimized for cost and coverage",
        "Find coverage for call-outs in under 60 seconds",
        "Balance workload based on resident acuity levels",
        "Predict staffing shortages 2 weeks in advance"
      ],
      impact: {
        metric: "75% faster scheduling",
        detail: "Reduces scheduling time from 8 hours to 2 hours per week"
      },
      features: [
        "Constraint-based optimization algorithm",
        "Real-time availability tracking",
        "Automated shift swap approvals",
        "Labor cost forecasting"
      ]
    },
    {
      id: 6,
      name: "Connect",
      tagline: "Family Engagement Hub",
      category: "engagement",
      icon: Users,
      color: "from-cyan-500 to-blue-600",
      description: "Connect strengthens family relationships by automating personalized updates, scheduling visits, and facilitating communication. Families receive photo updates, care summaries, and can message staff directly through a secure portal.",
      useCases: [
        "Send weekly personalized updates with photos and activities",
        "Schedule family visits and care plan meetings",
        "Enable secure messaging between families and care teams",
        "Share milestone achievements and positive moments"
      ],
      impact: {
        metric: "95% family satisfaction",
        detail: "Families report feeling 3x more connected to their loved ones"
      },
      features: [
        "Automated photo and video sharing",
        "Secure family portal with mobile app",
        "Visit scheduling with calendar integration",
        "Translation support for 20+ languages"
      ]
    },
    {
      id: 7,
      name: "Insight",
      tagline: "Advanced Analytics Engine",
      category: "operations",
      icon: TrendingUp,
      color: "from-teal-500 to-green-600",
      description: "Insight transforms raw data into actionable intelligence with 7 comprehensive dashboards. Track KPIs, identify trends, benchmark performance, and make data-driven decisions to improve outcomes and profitability.",
      useCases: [
        "Monitor occupancy rates and revenue per resident",
        "Track quality indicators and benchmark against peers",
        "Analyze staff productivity and overtime trends",
        "Identify cost-saving opportunities"
      ],
      impact: {
        metric: "15% cost reduction",
        detail: "Facilities save $50K-$200K annually through data-driven optimization"
      },
      features: [
        "7 role-specific dashboards",
        "Real-time KPI tracking",
        "Predictive analytics and forecasting",
        "Custom report builder"
      ]
    },
    {
      id: 8,
      name: "Mentor",
      tagline: "Staff Training Coordinator",
      category: "operations",
      icon: GraduationCap,
      color: "from-indigo-500 to-purple-600",
      description: "Mentor ensures 100% staff certification compliance by tracking training requirements, auto-assigning courses, and monitoring completion. It integrates with LMS platforms and sends reminders before certifications expire.",
      useCases: [
        "Track CPR, First Aid, and specialty certifications",
        "Auto-assign required training based on role and state regulations",
        "Send reminders 30/60/90 days before expiration",
        "Generate training compliance reports for inspections"
      ],
      impact: {
        metric: "100% certification compliance",
        detail: "Zero expired certifications and automatic training assignment"
      },
      features: [
        "Integration with Relias, HealthStream, Canvas",
        "Automated course assignment",
        "Certification expiration tracking",
        "Compliance reporting"
      ]
    },
    {
      id: 9,
      name: "Steward",
      tagline: "Financial Analyst",
      category: "operations",
      icon: DollarSign,
      color: "from-yellow-500 to-orange-600",
      description: "Steward optimizes financial performance by tracking revenue, expenses, and profitability in real-time. It identifies cost-saving opportunities, forecasts cash flow, and ensures accurate billing and collections.",
      useCases: [
        "Track revenue per resident and occupancy rates",
        "Identify billing errors and missed charges",
        "Forecast cash flow and budget variances",
        "Optimize staffing costs based on census"
      ],
      impact: {
        metric: "10% revenue increase",
        detail: "Captures $30K-$100K in previously missed billing annually"
      },
      features: [
        "Real-time financial dashboards",
        "Automated billing and invoicing",
        "Integration with QuickBooks and Xero",
        "Budget vs. actual analysis"
      ]
    },
    {
      id: 10,
      name: "Advocate",
      tagline: "Quality Improvement Coordinator",
      category: "compliance",
      icon: Target,
      color: "from-pink-500 to-rose-600",
      description: "Advocate drives continuous quality improvement by tracking quality indicators, identifying improvement opportunities, and managing QAPI initiatives. It ensures facilities meet and exceed quality standards.",
      useCases: [
        "Track falls, infections, medication errors, and other QIs",
        "Identify root causes of quality issues",
        "Manage QAPI projects from planning to completion",
        "Generate quality reports for state agencies"
      ],
      impact: {
        metric: "40% fewer incidents",
        detail: "Reduces falls, medication errors, and infections through proactive monitoring"
      },
      features: [
        "Quality indicator tracking",
        "Root cause analysis tools",
        "QAPI project management",
        "Benchmarking against national standards"
      ]
    },
    {
      id: 11,
      name: "Harmony",
      tagline: "Behavioral Support Specialist",
      category: "clinical",
      icon: Activity,
      color: "from-violet-500 to-purple-600",
      description: "Harmony provides evidence-based behavioral support by analyzing triggers, tracking interventions, and suggesting de-escalation strategies. It helps staff understand and respond to challenging behaviors with compassion and effectiveness.",
      useCases: [
        "Identify behavioral triggers and patterns",
        "Suggest evidence-based interventions",
        "Track behavior plan effectiveness",
        "Provide real-time de-escalation guidance"
      ],
      impact: {
        metric: "60% reduction in incidents",
        detail: "Behavioral incidents decrease by 60% within 3 months of implementation"
      },
      features: [
        "ABC (Antecedent-Behavior-Consequence) tracking",
        "Evidence-based intervention library",
        "Real-time de-escalation prompts",
        "Behavior plan effectiveness analysis"
      ]
    },
    {
      id: 12,
      name: "Vanguard",
      tagline: "Medication Safety Guardian",
      category: "clinical",
      icon: AlertCircle,
      color: "from-red-500 to-orange-600",
      description: "Vanguard ensures medication safety by checking for drug interactions, allergies, and administration errors in real-time. It integrates with pharmacies via Surescripts and provides barcode scanning for error-proof administration.",
      useCases: [
        "Check for drug interactions before administration",
        "Alert staff to allergy conflicts",
        "Verify correct medication via barcode scanning",
        "Track PRN effectiveness and patterns"
      ],
      impact: {
        metric: "90% error reduction",
        detail: "Prevents 9 out of 10 potential medication errors before they occur"
      },
      features: [
        "Real-time drug interaction checking",
        "Barcode scanning integration",
        "E-prescribing via Surescripts",
        "Medication administration record (MAR) automation"
      ]
    },
    {
      id: 13,
      name: "Catalyst",
      tagline: "Admissions & Marketing Assistant",
      category: "engagement",
      icon: Sparkles,
      color: "from-fuchsia-500 to-pink-600",
      description: "Catalyst streamlines admissions by managing inquiries, scheduling tours, and tracking leads through the sales funnel. It automates follow-ups, generates marketing materials, and ensures no opportunity is missed.",
      useCases: [
        "Manage inquiry pipeline and lead scoring",
        "Schedule facility tours and send reminders",
        "Generate personalized marketing materials",
        "Track referral sources and conversion rates"
      ],
      impact: {
        metric: "25% higher occupancy",
        detail: "Increases move-ins by converting 25% more inquiries to admissions"
      },
      features: [
        "CRM with lead tracking",
        "Automated email and SMS follow-ups",
        "Tour scheduling with calendar sync",
        "Marketing analytics dashboard"
      ]
    },
    {
      id: 14,
      name: "Pulse",
      tagline: "Staff Engagement & Recognition",
      category: "engagement",
      icon: Award,
      color: "from-amber-500 to-yellow-600",
      description: "Pulse boosts staff morale and retention through gamification, recognition, and engagement tracking. It celebrates achievements, tracks satisfaction, and identifies burnout risks before staff leave.",
      useCases: [
        "Award points for completing tasks and training",
        "Recognize staff achievements publicly",
        "Track engagement and satisfaction scores",
        "Identify burnout risks through sentiment analysis"
      ],
      impact: {
        metric: "50% lower turnover",
        detail: "Reduces staff turnover from 60% to 30% through recognition and engagement"
      },
      features: [
        "Gamification with points and badges",
        "Peer recognition system",
        "Engagement pulse surveys",
        "Burnout risk prediction"
      ]
    },
    {
      id: 15,
      name: "Sentinel Pro",
      tagline: "Incident Response Coordinator",
      category: "compliance",
      icon: Clock,
      color: "from-slate-500 to-gray-600",
      description: "Sentinel Pro manages the entire incident lifecycle from reporting to resolution. It ensures timely investigation, root cause analysis, corrective actions, and regulatory notifications are completed on schedule.",
      useCases: [
        "Capture incident reports via voice or mobile app",
        "Auto-notify management and families per policy",
        "Track investigation timelines and corrective actions",
        "Generate regulatory reports (e.g., state incident reports)"
      ],
      impact: {
        metric: "100% on-time reporting",
        detail: "Zero late incident reports and automatic regulatory compliance"
      },
      features: [
        "Voice-to-text incident capture",
        "Automated notification workflows",
        "Investigation and corrective action tracking",
        "Regulatory report generation"
      ]
    },
    {
      id: 16,
      name: "Executive Assistant",
      tagline: "Strategic Planning & Board Reporting",
      category: "operations",
      icon: Briefcase,
      color: "from-violet-500 to-purple-600",
      description: "Executive Assistant provides C-suite and board members with strategic insights, automated reporting, and data-driven recommendations. It consolidates facility performance across all metrics into executive dashboards and generates board-ready presentations.",
      useCases: [
        "Generate monthly board reports with KPIs and trends",
        "Create strategic planning recommendations based on data analysis",
        "Monitor multi-site performance across all facilities",
        "Prepare investor updates and financial summaries"
      ],
      impact: {
        metric: "80% faster reporting",
        detail: "Reduces executive reporting time from 20 hours to 4 hours per month"
      },
      features: [
        "Executive dashboard with real-time KPIs",
        "Automated board presentation generation",
        "Multi-site performance comparison",
        "Strategic planning recommendations"
      ]
    },
    {
      id: 17,
      name: "HR Manager",
      tagline: "Recruitment & Employee Relations",
      category: "operations",
      icon: UserCheck,
      color: "from-rose-500 to-pink-600",
      description: "HR Manager streamlines the entire employee lifecycle from recruitment to offboarding. It automates job postings, screens candidates, manages onboarding, tracks performance reviews, and handles employee relations issues with built-in HR best practices.",
      useCases: [
        "Post job openings to multiple platforms automatically",
        "Screen resumes and rank candidates by fit",
        "Automate onboarding checklists and new hire paperwork",
        "Schedule and track performance reviews and 1-on-1s"
      ],
      impact: {
        metric: "60% faster hiring",
        detail: "Reduces time-to-hire from 45 days to 18 days on average"
      },
      features: [
        "Automated job posting to Indeed, LinkedIn, ZipRecruiter",
        "AI-powered resume screening and ranking",
        "Digital onboarding workflows",
        "Performance review tracking and reminders"
      ]
    },
    {
      id: 18,
      name: "Maintenance Coordinator",
      tagline: "Facility Maintenance & Safety Inspections",
      category: "operations",
      icon: Wrench,
      color: "from-amber-500 to-yellow-600",
      description: "Maintenance Coordinator ensures your facility stays safe and operational by managing work orders, scheduling preventive maintenance, tracking equipment lifecycles, and conducting safety inspections. It prevents costly emergency repairs through proactive maintenance scheduling.",
      useCases: [
        "Create and assign work orders from staff requests",
        "Schedule preventive maintenance for HVAC, plumbing, electrical",
        "Track equipment warranties and replacement schedules",
        "Conduct monthly safety inspections with digital checklists"
      ],
      impact: {
        metric: "40% fewer emergencies",
        detail: "Proactive maintenance reduces emergency repair calls by 40%"
      },
      features: [
        "Digital work order management",
        "Preventive maintenance scheduling",
        "Equipment lifecycle tracking",
        "Safety inspection checklists"
      ]
    },
    {
      id: 19,
      name: "Nutrition Specialist",
      tagline: "Menu Planning & Dietary Compliance",
      category: "clinical",
      icon: UtensilsCrossed,
      color: "from-lime-500 to-green-600",
      description: "Nutrition Specialist manages all aspects of food service from menu planning to meal delivery. It ensures dietary restrictions are followed, generates shopping lists, tracks food costs, and monitors nutritional adequacy for each resident's specific needs.",
      useCases: [
        "Create weekly menus that meet dietary restrictions and preferences",
        "Generate automated shopping lists and track food inventory",
        "Monitor nutritional intake for residents with special diets",
        "Alert staff to allergy conflicts and dietary violations"
      ],
      impact: {
        metric: "100% diet compliance",
        detail: "Zero dietary violations and improved resident satisfaction with meals"
      },
      features: [
        "Automated menu planning with dietary restrictions",
        "Shopping list generation and inventory tracking",
        "Nutritional analysis and reporting",
        "Allergy and preference management"
      ]
    },
    {
      id: 20,
      name: "Transportation Manager",
      tagline: "Vehicle Scheduling & Appointment Coordination",
      category: "engagement",
      icon: Truck,
      color: "from-sky-500 to-blue-600",
      description: "Transportation Manager coordinates all resident transportation needs including medical appointments, family visits, community outings, and recreational activities. It optimizes routes, manages driver schedules, tracks vehicle maintenance, and ensures no resident misses an important appointment.",
      useCases: [
        "Schedule medical appointments and coordinate transportation",
        "Optimize routes for multiple residents going to appointments",
        "Track vehicle maintenance and inspection schedules",
        "Send reminders to families about pickup/drop-off times"
      ],
      impact: {
        metric: "Zero missed rides",
        detail: "100% on-time transportation with automated scheduling and reminders"
      },
      features: [
        "Appointment scheduling with auto-transportation booking",
        "Route optimization for multiple stops",
        "Driver schedule management",
        "Vehicle maintenance tracking"
      ]
    }
  ];

  const filteredAgents = selectedCategory === "all" 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>15 AI-Powered Digital Care Coordinators</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Your{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI Care Team
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            20 specialized AI agents working 24/7 to automate workflows, predict crises, 
            ensure compliance, and elevate care quality. Each agent is a domain expert 
            designed to solve specific challenges in residential care management.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-accent/50 text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {category.name}
                <span className="ml-2 opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card key={agent.id} className="p-6 hover:shadow-xl hover:border-primary/30 transition-all group">
                  {/* Agent Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Impact Metric */}
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-primary">{agent.impact.metric}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{agent.impact.detail}</p>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Key Use Cases
                    </h4>
                    <ul className="space-y-1.5">
                      {agent.useCases.slice(0, 3).map((useCase, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {agent.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Deploy Your AI Care Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            All 20 agents work together seamlessly to transform your facility operations. 
            Start your free trial and see the difference in days, not months.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              Start 30-Day Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-border hover:bg-accent/10">
              Schedule a Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • All 20 agents included • Cancel anytime
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
                <li><Link href="/" className="hover:text-foreground transition-colors">Overview</Link></li>
                <li><Link href="/agents" className="hover:text-foreground transition-colors">20 AI Agents</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">For Group Homes</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For ICF-ID</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">For Families</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2 Certified</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
