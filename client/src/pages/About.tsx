import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import {
  Heart,
  Target,
  Lightbulb,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Newspaper,
  Award,
  ExternalLink,
} from "lucide-react";

export default function About() {
  return (
    <>
      <SEOHead
        title="About HarmonyCare - Transforming Residential Care Through AI Innovation"
        description="Founded by healthcare technology veterans, HarmonyCare is on a mission to empower care facilities with AI-powered automation. Learn about our vision to transform residential care operations while keeping human compassion at the center."
      />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              About HarmonyCare
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Transforming Residential Care Through AI Innovation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to give caregivers their time back so they can
              focus on what truly matters—providing compassionate,
              person-centered care.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Empowering Caregivers, Enhancing Lives
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  HarmonyCare exists to revolutionize residential care
                  management by eliminating the administrative burden that
                  prevents caregivers from doing their best work. We believe
                  that technology should serve humanity, not replace it.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our AI-powered platform reduces paperwork by 60%, giving
                  caregivers precious hours back to spend with residents, build
                  meaningful relationships, and deliver the compassionate care
                  that transforms lives.
                </p>
              </div>
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Person-Centered Care
                        </h3>
                        <p className="text-muted-foreground">
                          Every resident deserves individualized attention and
                          compassionate support
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Caregiver Empowerment
                        </h3>
                        <p className="text-muted-foreground">
                          Technology that amplifies human capability rather than
                          replacing it
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Continuous Innovation
                        </h3>
                        <p className="text-muted-foreground">
                          Evolving AI that learns and adapts to serve care
                          facilities better every day
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-accent/5">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Lightbulb className="w-4 h-4" />
                Our Vision
              </div>
              <h2 className="text-4xl font-bold mb-6">
                A Future Where Care Comes First
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We envision a world where residential care facilities operate
                seamlessly, caregivers feel fulfilled and supported, families
                stay connected and informed, and residents receive the dignity
                and attention they deserve.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Industry Standard
                  </h3>
                  <p className="text-muted-foreground">
                    Become the trusted AI platform powering residential care
                    facilities nationwide, setting the standard for intelligent
                    care management.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Human-Centered AI
                  </h3>
                  <p className="text-muted-foreground">
                    Pioneer AI that enhances human connection rather than
                    diminishing it, proving technology can amplify compassion.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Community Impact
                  </h3>
                  <p className="text-muted-foreground">
                    Transform thousands of care facilities, improving quality of
                    life for millions of residents and their families.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Our Core Values
              </div>
              <h2 className="text-4xl font-bold mb-6">
                The Principles That Guide Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These values shape every decision we make and every feature we
                build
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Compassion First
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe care is fundamentally about human connection.
                    Every feature we build must enhance—never replace—the
                    compassionate relationships between caregivers and
                    residents. Technology serves people, not the other way
                    around.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Relentless Simplicity
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Caregivers shouldn't need technical expertise to use
                    powerful tools. We obsess over intuitive design, natural
                    language interfaces, and workflows that feel effortless.
                    Complexity is our problem to solve, not theirs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Trust Through Transparency
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    AI decisions that affect resident care must be explainable
                    and auditable. We build systems that caregivers can trust,
                    understand, and verify. Privacy, security, and compliance
                    are non-negotiable foundations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Continuous Learning
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We listen deeply to caregivers, administrators, and
                    families. Their feedback shapes our roadmap. Our AI learns
                    from real-world usage to become more helpful every day.
                    We're never done improving.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Accessibility for All
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every care facility deserves access to world-class
                    technology, regardless of size or budget. We're committed to
                    fair, transparent pricing that makes AI-powered care
                    management accessible to group homes and large facilities
                    alike.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Sustainable Impact
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're building for the long term—creating sustainable
                    solutions that reduce caregiver burnout, improve retention,
                    and ensure high-quality care remains viable and rewarding as
                    a profession.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhancing Residential Care Section */}
        <section className="py-16 bg-gradient-to-b from-accent/5 to-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">
                How We're Enhancing Residential Care
              </h2>
              <p className="text-xl text-muted-foreground">
                Our approach addresses the fundamental challenges facing modern
                care facilities
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Solving the Paperwork Crisis
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Caregivers currently spend 60% of their time on
                    documentation, compliance reporting, and administrative
                    tasks—time stolen from direct resident care. This isn't just
                    inefficient; it's a crisis of compassion. Our AI agents
                    handle routine documentation automatically, learning each
                    resident's patterns and generating accurate, compliant
                    records in real-time.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By reducing paperwork from hours to minutes, we're giving
                    caregivers back the time they need to have meaningful
                    conversations, notice subtle changes in resident wellbeing,
                    and provide the personalized attention that makes care
                    facilities feel like home.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Bridging the Communication Gap
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Families want to stay connected, but caregivers lack the
                    time for frequent updates. Residents have questions at 2 AM
                    when staff is limited. Shift changes create information gaps
                    that compromise care continuity. These communication
                    breakdowns create anxiety for families and safety risks for
                    residents.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our 24/7 AI agents provide instant, accurate responses to
                    family questions, proactive updates about resident
                    activities and wellbeing, and seamless information handoffs
                    between shifts. Everyone stays informed without adding
                    burden to already-stretched staff.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Preventing Caregiver Burnout
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The residential care industry faces a retention crisis.
                    Caregivers leave not because they stop caring, but because
                    administrative overload makes the job unsustainable. High
                    turnover disrupts resident relationships and compromises
                    care quality—the very things that drew caregivers to this
                    profession.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By automating the frustrating parts of the job while
                    preserving the meaningful human work, we're making
                    caregiving sustainable again. Our platform helps facilities
                    retain experienced staff, maintain continuity of care, and
                    create work environments where compassion can flourish.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Enabling Proactive, Personalized Care
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Traditional care management is reactive—problems get
                    addressed after they become obvious. But the best care is
                    anticipatory, noticing subtle patterns before they become
                    crises. This requires tracking countless details across
                    multiple residents, something human memory can't reliably do
                    at scale.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI continuously monitors patterns in behavior, health
                    metrics, and daily activities, alerting caregivers to
                    meaningful changes early. This enables truly personalized
                    care plans that adapt to each resident's evolving needs,
                    preferences, and goals—the kind of individualized attention
                    that transforms institutional care into genuine support for
                    human flourishing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Ensuring Compliance Without Compromise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Regulatory compliance is essential for resident safety and
                    facility viability, but compliance work often feels at odds
                    with direct care. Caregivers spend hours preparing for
                    audits, filling out forms, and documenting according to
                    complex regulations—time that could be spent with residents.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform makes compliance automatic and continuous
                    rather than burdensome and periodic. AI agents ensure
                    documentation meets regulatory standards in real-time,
                    generate audit-ready reports instantly, and track all
                    requirements without manual effort. Facilities stay
                    compliant while caregivers stay focused on care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Meet the Team
              </div>
              <h2 className="text-4xl font-bold mb-6">
                The People Behind HarmonyCare
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our team combines deep healthcare expertise with cutting-edge AI
                innovation to transform residential care
              </p>
            </div>

            {/* Founders */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Founders</h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <Users className="w-16 h-16 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-1">
                        Kimal Honour Djam
                      </h4>
                      <p className="text-sm text-primary mb-3">
                        Founder, CEO & CTO
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        PhD in Medical Physics with extensive healthcare
                        technology experience as a Radiation Oncology Physicist.
                        Former Chief Resident at Henry Ford Health and US Army
                        Medical Nuclear Science Officer. Data Science
                        certification from MIT. Passionate about leveraging AI
                        and technology to transform healthcare operations while
                        maintaining human-centered care.
                      </p>
                      <a
                        href="https://kimhons.info"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        Learn More →
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <Users className="w-16 h-16 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-1">Constance Bih</h4>
                      <p className="text-sm text-primary mb-3">
                        Co-Founder & Chief Product Officer
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Career & Business Consultant and humanitarian leader.
                        Founder of Missy BK Foundation supporting education for
                        children in underserved communities. Recognized as Top
                        100 Black Women to Watch in Canada (2017) and received
                        US House of Representatives Certificate of Recognition
                        for community impact. Expert in helping organizations
                        build inclusive, people-first cultures.
                      </p>
                      <a
                        href="https://bksolutions.ca"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        Learn More →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Executives */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Executive Team
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <Shield className="w-12 h-12 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold mb-1">Jennifer Liu</h4>
                      <p className="text-sm text-primary mb-2">VP of Product</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Former product leader at healthcare SaaS companies.
                        Expert in designing intuitive interfaces for clinical
                        workflows. Spent 200+ hours shadowing caregivers to
                        understand their needs.
                      </p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        LinkedIn →
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <Heart className="w-12 h-12 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold mb-1">
                        Dr. James Patterson
                      </h4>
                      <p className="text-sm text-primary mb-2">
                        Chief Medical Officer
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Board-certified physician with 20 years in geriatric
                        care. Former medical director at multiple ICF-ID
                        facilities. Ensures clinical accuracy and resident
                        safety in every AI decision.
                      </p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        LinkedIn →
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                        <Sparkles className="w-12 h-12 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold mb-1">
                        Mercel Vubangsi
                      </h4>
                      <p className="text-sm text-primary mb-2">
                        Co-Founder & VP of Engineering
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        PhD in Physics and MS in Computer Science. Senior ML
                        Engineer with 7+ years building scalable AI systems for
                        healthcare. Expert in MLOps, cloud computing, and deep
                        learning. Published researcher with 15 years Python
                        experience. Leads HarmonyCare's engineering team and
                        technical infrastructure.
                      </p>
                      <a
                        href="https://linkedin.com/in/mercel-vubangsi-68109b23a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        LinkedIn →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Advisors */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                Advisory Board
              </h3>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Coming Soon</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We are assembling a world-class advisory board of healthcare
                    industry leaders, regulatory experts, AI ethics specialists,
                    and care facility operators. Our advisors will guide
                    HarmonyCare's strategic direction and ensure we remain
                    focused on delivering exceptional value to residential care
                    facilities.
                  </p>
                  <p className="text-sm text-primary mt-4 font-medium">
                    Advisory Board Members: To Be Announced
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Press & Media Section */}
        <section className="py-16 bg-accent/5">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Newspaper className="w-4 h-4" />
                Press & Media
              </div>
              <h2 className="text-4xl font-bold mb-6">
                HarmonyCare in the News
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Recognition from leading healthcare and technology publications
              </p>
            </div>

            {/* Media Coverage */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">
                Recent Media Coverage
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          Healthcare IT News • March 2024
                        </p>
                        <h4 className="font-bold mb-2">
                          "How AI is Giving Caregivers Their Time Back"
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          HarmonyCare's innovative approach to reducing
                          administrative burden is transforming residential care
                          facilities across the country.
                        </p>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Read full article <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          Forbes • February 2024
                        </p>
                        <h4 className="font-bold mb-2">
                          "The Future of Residential Care is AI-Powered"
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Forbes profiles HarmonyCare as a leader in applying
                          artificial intelligence to solve the care industry's
                          biggest challenges.
                        </p>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Read full article <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          VentureBeat • January 2024
                        </p>
                        <h4 className="font-bold mb-2">
                          "Startup Raises $15M to Revolutionize Care Management"
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          HarmonyCare announces Series A funding to expand its
                          AI platform to thousands of care facilities
                          nationwide.
                        </p>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Read full article <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">
                          Modern Healthcare • December 2023
                        </p>
                        <h4 className="font-bold mb-2">
                          "Reducing Caregiver Burnout Through Technology"
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Study shows HarmonyCare users report 70% reduction in
                          administrative stress and improved job satisfaction.
                        </p>
                        <a
                          href="#"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Read full article <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Press Contact */}
            <div className="mt-12 text-center">
              <Card className="inline-block">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-2">Media Inquiries</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    For press inquiries, interviews, or additional information
                  </p>
                  <a
                    href="mailto:press@harmonycare.com"
                    className="text-primary hover:underline font-medium"
                  >
                    press@harmonycare.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Join Us in Transforming Care
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you're a founding member, a care professional, or
                  simply believe in our mission, we'd love to connect with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Become a Founding Member
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8"
                    onClick={() => (window.location.href = "/demo")}
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
