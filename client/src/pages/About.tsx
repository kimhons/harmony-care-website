import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Users, Shield, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
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
            We're on a mission to give caregivers their time back so they can focus on what truly matters—providing compassionate, person-centered care.
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
                HarmonyCare exists to revolutionize residential care management by eliminating the administrative burden that prevents caregivers from doing their best work. We believe that technology should serve humanity, not replace it.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI-powered platform reduces paperwork by 60%, giving caregivers precious hours back to spend with residents, build meaningful relationships, and deliver the compassionate care that transforms lives.
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
                      <h3 className="font-semibold text-lg mb-2">Person-Centered Care</h3>
                      <p className="text-muted-foreground">
                        Every resident deserves individualized attention and compassionate support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Caregiver Empowerment</h3>
                      <p className="text-muted-foreground">
                        Technology that amplifies human capability rather than replacing it
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Continuous Innovation</h3>
                      <p className="text-muted-foreground">
                        Evolving AI that learns and adapts to serve care facilities better every day
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
              We envision a world where residential care facilities operate seamlessly, caregivers feel fulfilled and supported, families stay connected and informed, and residents receive the dignity and attention they deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Industry Standard</h3>
                <p className="text-muted-foreground">
                  Become the trusted AI platform powering residential care facilities nationwide, setting the standard for intelligent care management.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Human-Centered AI</h3>
                <p className="text-muted-foreground">
                  Pioneer AI that enhances human connection rather than diminishing it, proving technology can amplify compassion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
                <p className="text-muted-foreground">
                  Transform thousands of care facilities, improving quality of life for millions of residents and their families.
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
              These values shape every decision we make and every feature we build
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
                  We believe care is fundamentally about human connection. Every feature we build must enhance—never replace—the compassionate relationships between caregivers and residents. Technology serves people, not the other way around.
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
                  Caregivers shouldn't need technical expertise to use powerful tools. We obsess over intuitive design, natural language interfaces, and workflows that feel effortless. Complexity is our problem to solve, not theirs.
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
                  AI decisions that affect resident care must be explainable and auditable. We build systems that caregivers can trust, understand, and verify. Privacy, security, and compliance are non-negotiable foundations.
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
                  We listen deeply to caregivers, administrators, and families. Their feedback shapes our roadmap. Our AI learns from real-world usage to become more helpful every day. We're never done improving.
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
                  Every care facility deserves access to world-class technology, regardless of size or budget. We're committed to fair, transparent pricing that makes AI-powered care management accessible to group homes and large facilities alike.
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
                  We're building for the long term—creating sustainable solutions that reduce caregiver burnout, improve retention, and ensure high-quality care remains viable and rewarding as a profession.
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
              Our approach addresses the fundamental challenges facing modern care facilities
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Solving the Paperwork Crisis</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Caregivers currently spend 60% of their time on documentation, compliance reporting, and administrative tasks—time stolen from direct resident care. This isn't just inefficient; it's a crisis of compassion. Our AI agents handle routine documentation automatically, learning each resident's patterns and generating accurate, compliant records in real-time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By reducing paperwork from hours to minutes, we're giving caregivers back the time they need to have meaningful conversations, notice subtle changes in resident wellbeing, and provide the personalized attention that makes care facilities feel like home.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Bridging the Communication Gap</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Families want to stay connected, but caregivers lack the time for frequent updates. Residents have questions at 2 AM when staff is limited. Shift changes create information gaps that compromise care continuity. These communication breakdowns create anxiety for families and safety risks for residents.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our 24/7 AI agents provide instant, accurate responses to family questions, proactive updates about resident activities and wellbeing, and seamless information handoffs between shifts. Everyone stays informed without adding burden to already-stretched staff.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Preventing Caregiver Burnout</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The residential care industry faces a retention crisis. Caregivers leave not because they stop caring, but because administrative overload makes the job unsustainable. High turnover disrupts resident relationships and compromises care quality—the very things that drew caregivers to this profession.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By automating the frustrating parts of the job while preserving the meaningful human work, we're making caregiving sustainable again. Our platform helps facilities retain experienced staff, maintain continuity of care, and create work environments where compassion can flourish.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Enabling Proactive, Personalized Care</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Traditional care management is reactive—problems get addressed after they become obvious. But the best care is anticipatory, noticing subtle patterns before they become crises. This requires tracking countless details across multiple residents, something human memory can't reliably do at scale.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI continuously monitors patterns in behavior, health metrics, and daily activities, alerting caregivers to meaningful changes early. This enables truly personalized care plans that adapt to each resident's evolving needs, preferences, and goals—the kind of individualized attention that transforms institutional care into genuine support for human flourishing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ensuring Compliance Without Compromise</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Regulatory compliance is essential for resident safety and facility viability, but compliance work often feels at odds with direct care. Caregivers spend hours preparing for audits, filling out forms, and documenting according to complex regulations—time that could be spent with residents.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform makes compliance automatic and continuous rather than burdensome and periodic. AI agents ensure documentation meets regulatory standards in real-time, generate audit-ready reports instantly, and track all requirements without manual effort. Facilities stay compliant while caregivers stay focused on care.
                </p>
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
                Whether you're a founding member, a care professional, or simply believe in our mission, we'd love to connect with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
                  onClick={() => window.location.href = '/signup'}
                >
                  Become a Founding Member
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full px-8"
                  onClick={() => window.location.href = '/demo'}
                >
                  Schedule a Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
