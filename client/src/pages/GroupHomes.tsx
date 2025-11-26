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
  Home,
  AlertCircle,
  TrendingUp,
  Clock,
  UserCheck,
  UtensilsCrossed,
  Truck,
  Award,
  ChevronDown,
} from "lucide-react";
import { APP_TITLE } from "@/const";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { Link } from "wouter";

export default function GroupHomes() {
  return (
    <>
      <SEOHead
        title="Group Home Solutions - AI-Powered Management for Residential Care Homes"
        description="Purpose-built AI solutions for group homes managing 4-8 residents. Automate documentation, meal planning, medication tracking, and compliance. Reduce administrative burden by 70% while improving care quality."
      />
      <GroupHomesContent />
    </>
  );
}

function GroupHomesContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const challenges = [
    {
      icon: Users,
      title: "Small Staff, Big Responsibilities",
      description:
        "Limited staff members juggling multiple roles—care, documentation, compliance, and administration.",
    },
    {
      icon: FileText,
      title: "Overwhelming Paperwork",
      description:
        "Hours spent on documentation, care plans, and incident reports instead of direct care.",
    },
    {
      icon: Shield,
      title: "Compliance Complexity",
      description:
        "Navigating federal, state, and local regulations with limited administrative support.",
    },
    {
      icon: DollarSign,
      title: "Tight Budgets",
      description:
        "Operating on thin margins with limited resources for expensive enterprise software.",
    },
    {
      icon: Clock,
      title: "Staff Turnover",
      description:
        "High turnover rates due to burnout from administrative burden and long hours.",
    },
    {
      icon: AlertCircle,
      title: "Reactive vs. Proactive Care",
      description:
        "Struggling to predict and prevent health crises before they escalate.",
    },
  ];

  const recommendedAgents = [
    {
      name: "DocuBot",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      description:
        "Voice-to-text documentation saves 70% of documentation time",
      benefit: "Speak your notes, get compliant documentation instantly",
      priority: "Essential",
    },
    {
      name: "Guardian",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      description:
        "Continuous compliance monitoring ensures 100% audit readiness",
      benefit: "Never worry about surprise inspections again",
      priority: "Essential",
    },
    {
      name: "Sentinel",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      description: "Predicts health crises 24-48 hours in advance",
      benefit: "Prevent hospitalizations and emergency room visits",
      priority: "Essential",
    },
    {
      name: "Compass",
      icon: Brain,
      color: "from-orange-500 to-red-500",
      description:
        "AI-powered personalized care plans that adapt to resident needs",
      benefit: "Create and update care plans in minutes, not hours",
      priority: "Essential",
    },
    {
      name: "Nexus",
      icon: Calendar,
      color: "from-indigo-500 to-blue-500",
      description: "Intelligent scheduling solves staffing crises in seconds",
      benefit: "Find coverage for call-outs instantly",
      priority: "High Priority",
    },
    {
      name: "Connect",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Family engagement portal with automated updates",
      benefit: "Keep families informed without extra work",
      priority: "High Priority",
    },
    {
      name: "HR Manager",
      icon: UserCheck,
      color: "from-rose-500 to-pink-500",
      description: "Streamlines hiring and reduces time-to-hire by 60%",
      benefit: "Fill open positions faster with better candidates",
      priority: "Recommended",
    },
    {
      name: "Nutrition Specialist",
      icon: UtensilsCrossed,
      color: "from-lime-500 to-green-500",
      description: "Menu planning with 100% dietary compliance",
      benefit: "Automated meal planning that respects all dietary restrictions",
      priority: "Recommended",
    },
  ];

  const useCases = [
    {
      title: "Morning Medication Round",
      scenario:
        "Sarah, a DSP, uses DocuBot to document medication administration while walking through the home.",
      before: "Spent 45 minutes after shift writing medication notes",
      after:
        "Speaks notes during rounds, documentation auto-generated in 5 minutes",
      agents: ["DocuBot", "Vanguard"],
    },
    {
      title: "Resident Health Change",
      scenario:
        "Sentinel detects unusual sleep patterns and decreased fluid intake for John, alerting staff 36 hours before UTI symptoms appear.",
      before: "UTI discovered after symptoms escalate, resulting in ER visit",
      after:
        "Early intervention prevents hospitalization, saving $3,500 and resident distress",
      agents: ["Sentinel", "Compass"],
    },
    {
      title: "Surprise State Inspection",
      scenario: "State inspector arrives unannounced for facility review.",
      before:
        "Scrambling for documents, finding gaps in care plans and medication logs",
      after:
        "Guardian provides inspection-ready reports in 60 seconds, zero violations found",
      agents: ["Guardian", "DocuBot", "Vanguard"],
    },
    {
      title: "Staff Call-Out",
      scenario: "Evening shift DSP calls in sick 2 hours before shift starts.",
      before: "Spent 90 minutes calling staff, ended up working double shift",
      after:
        "Nexus finds qualified coverage in 30 seconds, sends automated notification",
      agents: ["Nexus", "HR Manager"],
    },
  ];

  const beforeAfter = [
    {
      category: "Documentation Time",
      before: "2-3 hours per shift",
      after: "30-45 minutes per shift",
      savings: "70% time savings",
    },
    {
      category: "Compliance Violations",
      before: "2-3 violations per year",
      after: "Zero violations",
      savings: "$50K+ in fines avoided",
    },
    {
      category: "Emergency Hospitalizations",
      before: "8-12 per year",
      after: "3-4 per year",
      savings: "60% reduction",
    },
    {
      category: "Staff Turnover",
      before: "60% annual turnover",
      after: "30% annual turnover",
      savings: "$40K+ in hiring costs",
    },
    {
      category: "Monthly Software Costs",
      before: "$2,000-$3,000",
      after: "$590 (10 residents)",
      savings: "70% cost reduction",
    },
  ];

  const faqs = [
    {
      question: "Is Harmony Care affordable for small group homes?",
      answer:
        "Absolutely! Our Starter plan is designed specifically for group homes with up to 10 residents at just $59/resident/month. For a 6-resident home, that's only $354/month—less than most point solutions, and you get the complete platform.",
    },
    {
      question: "How long does implementation take?",
      answer:
        "Most group homes are fully operational within 2-3 weeks. We provide white-glove migration support, staff training, and data import assistance. You'll start seeing time savings from day one.",
    },
    {
      question: "Do we need technical expertise to use Harmony?",
      answer:
        "No! Harmony is designed for direct care staff with minimal tech experience. Voice-to-text documentation, mobile-first design, and intuitive interfaces mean your team can start using it immediately.",
    },
    {
      question: "What if we only have 3-4 residents?",
      answer:
        "We offer flexible pricing for smaller homes. Contact our team for custom pricing that fits your budget while still providing access to essential AI agents.",
    },
    {
      question: "Can we start with just a few agents and add more later?",
      answer:
        "Yes! Our Starter plan includes 5 core agents (DocuBot, Sentinel, Guardian, Compass, Nexus). You can upgrade to Professional anytime to unlock all 20 agents.",
    },
    {
      question: "What happens to our existing documentation?",
      answer:
        "We migrate your existing care plans, resident records, and documentation into Harmony at no extra cost. Your data remains accessible and compliant throughout the transition.",
    },
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

            <Link href="/demo">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                Reserve Your Spot
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
              <Home className="w-4 h-4" />
              <span>Solutions for Group Homes</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Built Specifically for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Group Homes
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Affordable AI-powered care management designed for small
              residential facilities. Reduce administrative burden by 70%,
              ensure 100% compliance, and let your staff focus on caring—not
              paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/demo">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                >
                  Reserve Founding Member Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$59</div>
              <p className="text-sm text-muted-foreground">
                per resident/month
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">70%</div>
              <p className="text-sm text-muted-foreground">
                less documentation time
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                2-3 weeks
              </div>
              <p className="text-sm text-muted-foreground">
                to full implementation
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">
                compliance guaranteed
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Challenges We Solve for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Group Homes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand the unique pressures facing small residential care
              facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4`}
                >
                  <challenge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {challenge.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {challenge.description}
                </p>
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
              <span>Recommended for Group Homes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Essential{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Care Team
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              8 AI agents specifically chosen to address the most critical needs
              of group homes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendedAgents.map((agent, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <agent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{agent.name}</h3>
                      <Badge
                        variant={
                          agent.priority === "Essential"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {agent.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {agent.description}
                    </p>
                    <div className="flex items-start gap-2 mt-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-foreground">
                        {agent.benefit}
                      </p>
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

      {/* Real-World Use Cases */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-World{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Harmony transforms daily operations in group homes
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
                    <h3 className="text-xl font-semibold mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {useCase.scenario}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pl-14">
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-sm font-semibold text-destructive mb-2">
                      ❌ Before Harmony
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {useCase.before}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <p className="text-sm font-semibold text-green-600 mb-2">
                      ✅ With Harmony
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {useCase.after}
                    </p>
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
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Harmony{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Difference
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Measurable improvements in every aspect of group home operations
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/30">
                  <tr>
                    <th className="text-left p-4 font-semibold">Metric</th>
                    <th className="text-left p-4 font-semibold">
                      Before Harmony
                    </th>
                    <th className="text-left p-4 font-semibold">
                      With Harmony
                    </th>
                    <th className="text-left p-4 font-semibold">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {beforeAfter.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-4 font-medium">{item.category}</td>
                      <td className="p-4 text-muted-foreground">
                        {item.before}
                      </td>
                      <td className="p-4 text-green-600 font-medium">
                        {item.after}
                      </td>
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

      {/* Pricing for Group Homes */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>🔥 Founding Member Pricing - Up to 61% Off Forever</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lock In{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Founding Member Rates
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              Save <strong className="text-foreground">56% off</strong> regular
              pricing forever +{" "}
              <strong className="text-foreground">
                40% off onboarding & maintenance
              </strong>
            </p>
            <p className="text-sm text-destructive font-semibold">
              ⏰ Only 23 founding member spots remaining
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 border-2 border-primary">
              <div className="text-center mb-6">
                <Badge className="mb-4">Most Popular for Group Homes</Badge>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>56% OFF - Founding Member</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Starter Plan</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl text-muted-foreground line-through">
                      $118
                    </span>
                    <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">
                      -56%
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">$52</span>
                    <span className="text-muted-foreground">
                      /resident/month
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Perfect for 1-10 residents
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  ✓ Price locked in forever
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">5 Essential AI Agents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Voice-to-text documentation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Compliance monitoring</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Mobile app for staff</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Email support</span>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold mb-2">
                  Example: 6-resident home
                </p>
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground line-through">
                    $708/month regular
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">$312</span>
                  <span className="text-sm text-muted-foreground">
                    /month founding member
                  </span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
                  Save $396/month = $4,752/year
                </p>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                size="lg"
              >
                Join Waitlist
              </Button>
            </Card>

            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>61% OFF - Founding Member</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional Plan</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl text-muted-foreground line-through">
                      $158
                    </span>
                    <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">
                      -61%
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-primary">$62</span>
                    <span className="text-muted-foreground">
                      /resident/month
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  For 11-50 residents
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  ✓ Price locked in forever
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">
                    All 20 AI Agents
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Starter, plus:</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced predictive analytics</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Family engagement portal</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority 24/7 support</span>
                </div>
                <div className="flex items-start gap-2 pl-7">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">API integrations</span>
                </div>
              </div>

              <Button
                className="w-full rounded-full"
                variant="outline"
                size="lg"
              >
                Reserve Your Spot
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
      <section
        id="faq"
        className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background"
      >
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Harmony for group homes
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Group Home?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of group homes saving time, reducing costs, and
            improving resident outcomes with Harmony Care
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
              >
                Secure Early Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Join Early Access Waitlist
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • 5 essential agents included • Cancel
            anytime
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
                <li>
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/agents"
                    className="hover:text-foreground transition-colors"
                  >
                    20 AI Agents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/solutions/group-homes"
                    className="hover:text-foreground transition-colors"
                  >
                    For Group Homes
                  </Link>
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
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              © 2025 Harmony Care. All rights reserved. HIPAA Compliant | SOC 2
              Certified
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
