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
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  AlertCircle,
  TrendingUp,
  Clock,
  UserCheck,
  GraduationCap,
  Target,
  Activity,
  Award,
  ChevronDown
} from "lucide-react";
import { APP_TITLE } from "@/const";
import { useState } from "react";
import { Link } from "wouter";

export default function IcfId() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const challenges = [
    {
      icon: Shield,
      title: "Complex Federal Regulations",
      description: "Navigating 42 CFR Part 483 requirements, active treatment mandates, and continuous compliance monitoring."
    },
    {
      icon: Target,
      title: "Active Treatment Requirements",
      description: "Documenting individualized active treatment programs, measurable goals, and quarterly progress reviews."
    },
    {
      icon: FileText,
      title: "Extensive Documentation Burden",
      description: "ISPs, quarterly reviews, behavioral data, incident reports, and daily progress notes for every resident."
    },
    {
      icon: Users,
      title: "Larger Resident Populations",
      description: "Managing care for 16-50+ residents with diverse needs, behaviors, and medical complexities."
    },
    {
      icon: GraduationCap,
      title: "Staff Training & Certification",
      description: "Ensuring all staff maintain required certifications, training hours, and competency assessments."
    },
    {
      icon: Clock,
      title: "Survey Readiness",
      description: "Maintaining continuous survey readiness with proper documentation, policies, and quality assurance."
    }
  ];

  const recommendedAgents = [
    {
      name: "Guardian",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      description: "Continuous 42 CFR Part 483 compliance monitoring",
      benefit: "Real-time alerts for regulatory gaps, automatic survey-ready reports",
      priority: "Essential"
    },
    {
      name: "Compass",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      description: "AI-powered ISP development with active treatment integration",
      benefit: "Generate compliant ISPs with measurable goals in minutes",
      priority: "Essential"
    },
    {
      name: "DocuBot",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      description: "Voice-to-text for progress notes, behavioral data, and incident reports",
      benefit: "Document active treatment delivery in real-time",
      priority: "Essential"
    },
    {
      name: "Sentinel",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      description: "Predictive health monitoring for medically complex residents",
      benefit: "Prevent hospitalizations and detect health changes early",
      priority: "Essential"
    },
    {
      name: "Vanguard",
      icon: Activity,
      color: "from-teal-500 to-cyan-500",
      description: "Medication administration with eMAR and error prevention",
      benefit: "Zero medication errors with automated checks and alerts",
      priority: "Essential"
    },
    {
      name: "Nexus",
      icon: Calendar,
      color: "from-indigo-500 to-blue-500",
      description: "Intelligent scheduling for DSPs, QIDPs, and specialized staff",
      benefit: "Ensure proper staffing ratios and certification coverage",
      priority: "High Priority"
    },
    {
      name: "Catalyst",
      icon: GraduationCap,
      color: "from-yellow-500 to-orange-500",
      description: "Staff training tracking and competency management",
      benefit: "Automated training reminders and certification tracking",
      priority: "High Priority"
    },
    {
      name: "Sentinel Pro",
      icon: Clock,
      color: "from-slate-500 to-gray-600",
      description: "Incident management with regulatory reporting",
      benefit: "Automated state incident reports and investigation tracking",
      priority: "High Priority"
    },
    {
      name: "Connect",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Family and guardian engagement portal",
      benefit: "Automated updates to families and legal guardians",
      priority: "Recommended"
    },
    {
      name: "Insight",
      icon: TrendingUp,
      color: "from-blue-600 to-indigo-600",
      description: "Quality assurance and outcomes tracking",
      benefit: "Track ISP goal progress and active treatment effectiveness",
      priority: "Recommended"
    }
  ];

  const useCases = [
    {
      title: "ISP Development & Quarterly Reviews",
      scenario: "QIDP needs to develop an ISP for a new resident with complex behavioral and medical needs, including active treatment goals.",
      before: "8-10 hours to research, write, and format ISP with measurable goals",
      after: "Compass generates compliant ISP draft in 45 minutes with AI-suggested goals based on assessments",
      agents: ["Compass", "Sentinel", "DocuBot"]
    },
    {
      title: "Active Treatment Documentation",
      scenario: "DSP delivers active treatment activities throughout the day and needs to document progress toward ISP goals.",
      before: "30-45 minutes of documentation after shift, often incomplete or delayed",
      after: "DocuBot captures voice notes during activities, auto-links to ISP goals, generates compliant progress notes",
      agents: ["DocuBot", "Compass"]
    },
    {
      title: "Federal Survey Preparation",
      scenario: "State survey team announces they'll arrive in 48 hours for annual inspection.",
      before: "Frantic 48-hour scramble to gather documents, finding gaps in ISPs and training records",
      after: "Guardian provides survey-ready documentation package in 15 minutes, identifies and resolves gaps proactively",
      agents: ["Guardian", "Catalyst", "Vanguard"]
    },
    {
      title: "Behavioral Crisis Management",
      scenario: "Resident exhibits escalating behavioral episode requiring intervention and documentation.",
      before: "Paper incident report completed hours later, missing critical details and timeline",
      after: "Sentinel Pro captures incident via voice in real-time, auto-generates state report, triggers investigation workflow",
      agents: ["Sentinel Pro", "DocuBot", "Sentinel"]
    },
    {
      title: "Medication Administration Round",
      scenario: "Nurse conducts morning medication pass for 25 residents with complex medication regimens.",
      before: "Paper MAR with frequent transcription errors, missed allergy checks",
      after: "Vanguard provides digital eMAR with barcode scanning, allergy alerts, and automatic documentation",
      agents: ["Vanguard", "Sentinel"]
    }
  ];

  const complianceFeatures = [
    {
      regulation: "42 CFR 483.440",
      requirement: "Active Treatment",
      solution: "Compass generates ISPs with measurable active treatment goals, tracks progress, alerts to missed activities"
    },
    {
      regulation: "42 CFR 483.420",
      requirement: "Client Protections",
      solution: "Guardian monitors rights restrictions, tracks incident reports, ensures proper documentation"
    },
    {
      regulation: "42 CFR 483.430",
      requirement: "Facility Staffing",
      solution: "Nexus ensures proper staffing ratios, tracks QIDP coverage, manages certification requirements"
    },
    {
      regulation: "42 CFR 483.460",
      requirement: "Health Care Services",
      solution: "Sentinel monitors health status, Vanguard manages medications, integrated care coordination"
    },
    {
      regulation: "42 CFR 483.480",
      requirement: "Condition of Participation",
      solution: "Guardian provides continuous compliance monitoring across all CoPs with real-time alerts"
    }
  ];

  const beforeAfter = [
    {
      category: "ISP Development Time",
      before: "8-10 hours per ISP",
      after: "45-60 minutes per ISP",
      savings: "85% time savings"
    },
    {
      category: "Survey Deficiencies",
      before: "4-6 deficiencies per survey",
      after: "0-1 deficiencies per survey",
      savings: "80% reduction"
    },
    {
      category: "Medication Errors",
      before: "2-3 errors per month",
      after: "Zero errors",
      savings: "100% elimination"
    },
    {
      category: "Documentation Compliance",
      before: "75% compliant",
      after: "100% compliant",
      savings: "25% improvement"
    },
    {
      category: "Staff Training Tracking",
      before: "Manual spreadsheets, gaps",
      after: "Automated, 100% current",
      savings: "Zero training gaps"
    },
    {
      category: "Monthly Cost (30 residents)",
      before: "$4,500-$6,000",
      after: "$2,370",
      savings: "50-60% cost reduction"
    }
  ];

  const faqs = [
    {
      question: "How does Harmony ensure compliance with 42 CFR Part 483?",
      answer: "Guardian continuously monitors all operations against federal ICF-ID regulations, providing real-time alerts for any gaps. The system is updated automatically when regulations change, and generates survey-ready documentation packages on demand. Every feature is designed with CFR compliance built-in."
    },
    {
      question: "Can Harmony help with active treatment documentation?",
      answer: "Absolutely! Compass integrates active treatment directly into ISPs with measurable goals, and DocuBot allows staff to document active treatment delivery in real-time via voice. The system automatically tracks progress toward goals and alerts when activities are missed."
    },
    {
      question: "What's the implementation timeline for a 30-resident ICF-ID?",
      answer: "Most ICF-ID facilities are fully operational within 3-4 weeks. We provide white-glove migration support including ISP import, staff training (on-site or virtual), and dedicated QIDP training. You'll start seeing compliance improvements from week one."
    },
    {
      question: "Does Harmony integrate with our existing EHR or pharmacy system?",
      answer: "Yes! We offer API integrations with major EHR systems, pharmacy platforms, and state reporting portals. Our team handles the technical integration, and we can build custom integrations for your specific systems."
    },
    {
      question: "How does pricing work for larger ICF-ID facilities?",
      answer: "ICF-ID facilities typically use our Professional plan at $79/resident/month for 11-50 residents, or Enterprise plan at $99/resident/month for 50+ residents. Enterprise includes custom integrations, dedicated account management, and white-label options."
    },
    {
      question: "Can Harmony help us prepare for our annual survey?",
      answer: "Yes! Guardian maintains continuous survey readiness by monitoring all compliance areas 24/7. When a survey is announced, it generates a complete documentation package in minutes, identifies any gaps, and provides remediation guidance. Many facilities report zero deficiencies after implementing Harmony."
    }
  ];

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
              <Link href="/agents">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">AI Agents</a>
              </Link>
              <Link href="/pricing">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              </Link>
            </div>

            <Link href="/demo">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              <span>Solutions for ICF-ID Facilities</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Native Care Management for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ICF-ID Facilities
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Purpose-built for intermediate care facilities serving individuals with intellectual disabilities. 
              Ensure 100% compliance with 42 CFR Part 483, streamline active treatment documentation, and pass surveys with zero deficiencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                  Schedule ICF-ID Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">CFR 483 compliance</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-sm text-muted-foreground">faster ISP development</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">Zero</div>
              <p className="text-sm text-muted-foreground">medication errors</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">0-1</div>
              <p className="text-sm text-muted-foreground">survey deficiencies</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unique Challenges Facing{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ICF-ID Facilities
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand the complex regulatory and operational demands of intermediate care facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4`}>
                  <challenge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Agents Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Recommended for ICF-ID</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ICF-ID Care Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              10 AI agents specifically designed to address ICF-ID regulatory requirements and operational needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendedAgents.map((agent, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}>
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                      <Badge variant={agent.priority === "Essential" ? "default" : agent.priority === "High Priority" ? "secondary" : "outline"} className="text-xs">
                        {agent.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{agent.description}</p>
                    <div className="flex items-start gap-2 mt-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">{agent.benefit}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/agents">
              <Button variant="outline" size="lg" className="rounded-full">
                Explore All 20 Agents
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                42 CFR Part 483 Compliance
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to meet federal ICF-ID regulations
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/30">
                  <tr>
                    <th className="text-left p-4 font-semibold">Regulation</th>
                    <th className="text-left p-4 font-semibold">Requirement</th>
                    <th className="text-left p-4 font-semibold">Harmony Solution</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceFeatures.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 font-mono text-sm text-primary">{item.regulation}</td>
                      <td className="p-4 font-medium">{item.requirement}</td>
                      <td className="p-4 text-sm text-muted-foreground">{item.solution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-World{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ICF-ID Scenarios
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Harmony transforms daily operations in ICF-ID facilities
            </p>
          </div>

          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4">{useCase.scenario}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 pl-14">
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-sm font-semibold text-destructive mb-2">❌ Before Harmony</p>
                    <p className="text-sm text-muted-foreground">{useCase.before}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <p className="text-sm font-semibold text-green-600 mb-2">✅ With Harmony</p>
                    <p className="text-sm text-muted-foreground">{useCase.after}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pl-14">
                  {useCase.agents.map((agent, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {agent}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Measurable{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ICF-ID Improvements
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real outcomes from ICF-ID facilities using Harmony Care
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/30">
                  <tr>
                    <th className="text-left p-4 font-semibold">Metric</th>
                    <th className="text-left p-4 font-semibold">Before Harmony</th>
                    <th className="text-left p-4 font-semibold">With Harmony</th>
                    <th className="text-left p-4 font-semibold">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {beforeAfter.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 font-medium">{item.category}</td>
                      <td className="p-4 text-muted-foreground">{item.before}</td>
                      <td className="p-4 text-green-600 font-medium">{item.after}</td>
                      <td className="p-4">
                        <Badge variant="default" className="bg-green-500">
                          {item.savings}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Pricing for ICF-ID */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>🔥 Founding Member Pricing - Up to 65% Off Forever</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lock In{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Founding Member Rates
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              Save <strong className="text-foreground">61-65% off</strong> regular pricing forever + <strong className="text-foreground">40% off onboarding & maintenance</strong>
            </p>
            <p className="text-sm text-destructive font-semibold">
              ⏰ Only 23 founding member spots remaining
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-primary">
              <div className="text-center mb-6">
                <Badge className="mb-4">Most Popular for ICF-ID</Badge>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>61% OFF - Founding Member</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional Plan</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl text-muted-foreground line-through">$158</span>
                    <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">-61%</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">$62</span>
                    <span className="text-muted-foreground">/resident/month</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">For 11-50 residents</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">✓ Price locked in forever</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">All 20 AI Agents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">42 CFR Part 483 compliance monitoring</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">ISP development with active treatment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">eMAR with medication management</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Staff training & certification tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority 24/7 support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API integrations (EHR, pharmacy)</span>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold mb-2">Example: 30-resident ICF-ID</p>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground line-through">$4,740/month regular</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">$1,860</span>
                  <span className="text-sm text-muted-foreground">/month founding member</span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">Save $2,880/month = $34,560/year</p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full" size="lg">
                Start Free Trial
              </Button>
            </Card>

            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>65% OFF - Founding Member</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Enterprise Plan</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl text-muted-foreground line-through">$198</span>
                    <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">-65%</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">$69</span>
                    <span className="text-muted-foreground">/resident/month</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">For 50+ residents</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">✓ Price locked in forever</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Everything in Professional, plus:</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Multi-site management dashboard</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Dedicated account manager</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">White-glove migration service</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom integrations</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">SLA guarantees (99.9% uptime)</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Quarterly business reviews</span>
                </div>
              </div>

              <Button className="w-full rounded-full" variant="outline" size="lg">
                Contact Sales
              </Button>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="link" className="text-primary">
                View detailed pricing comparison →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Harmony for ICF-ID facilities
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ICF-ID Facility?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join leading ICF-ID facilities achieving 100% compliance, zero survey deficiencies, and dramatically reduced administrative burden
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/demo">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
                Schedule Your Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Start 30-Day Free Trial
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • All 20 agents included • Cancel anytime
          </p>
        </div>
      </section>

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
                AI-Native Care Management for Residential Facilities
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/"><a className="hover:text-foreground transition-colors">Overview</a></Link></li>
                <li><Link href="/agents"><a className="hover:text-foreground transition-colors">20 AI Agents</a></Link></li>
                <li><Link href="/pricing"><a className="hover:text-foreground transition-colors">Pricing</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/solutions/group-homes"><a className="hover:text-foreground transition-colors">For Group Homes</a></Link></li>
                <li><Link href="/solutions/icf-id"><a className="hover:text-foreground transition-colors">For ICF-ID</a></Link></li>
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

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
