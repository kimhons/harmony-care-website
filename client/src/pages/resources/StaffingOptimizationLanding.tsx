import ResourceLandingTemplate from "@/components/ResourceLandingTemplate";
import {
  Calendar,
  TrendingDown,
  Users,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function StaffingOptimizationLanding() {
  return (
    <ResourceLandingTemplate
      leadMagnetId={2}
      title="The Staffing Crisis Myth: Residential Care Staffing Solutions"
      subtitle="Why the staffing shortage isn't what you think—and how facilities are reducing overtime by 35% while improving care quality."
      badge="📘 Free Professional Guide"
      seoDescription="Discover proven strategies to optimize residential care staffing, reduce overtime by 35%, and improve care quality without hiring more staff."
      seoImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028725899/GC5X5TPdNGfhjqPDyVt4dB/resources/staffing-optimization-thumbnail.png"
      keyStats={[
        { value: "35%", label: "Less Overtime", color: "coral" },
        { value: "92%", label: "Staff Retention", color: "blue" },
        { value: "24", label: "Pages" },
      ]}
      downloadCount="1,800+"
      whatInside={[
        {
          icon: <Users className="text-blue-600" size={24} />,
          title: "The Real Problem",
          description:
            "Why hiring more staff doesn't solve the staffing crisis—and what actually does.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <TrendingDown className="text-coral-600" size={24} />,
          title: "35% Reduction Framework",
          description:
            "Step-by-step scheduling optimization that cuts overtime costs by over one-third.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <Calendar className="text-blue-600" size={24} />,
          title: "Smart Scheduling",
          description:
            "AI-powered scheduling strategies that balance staff needs with resident care requirements.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <Clock className="text-coral-600" size={24} />,
          title: "Time Optimization",
          description:
            "How to reclaim 15+ hours per week from administrative tasks and redirect to direct care.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <BarChart3 className="text-blue-600" size={24} />,
          title: "Retention Strategies",
          description:
            "Proven tactics that increased staff retention from 68% to 92% in 6 months.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <CheckCircle2 className="text-coral-600" size={24} />,
          title: "Implementation Toolkit",
          description:
            "Templates, checklists, and staff communication guides for smooth rollout.",
          bgColor: "bg-coral-100",
        },
      ]}
      testimonials={[
        {
          rating: 5,
          quote:
            "We cut our overtime budget by $48,000 in the first year using these strategies. Staff morale has never been higher.",
          author: "David Thompson",
          role: "Administrator, Oakwood Care Center",
          bgColor: "border-blue-100",
        },
        {
          rating: 5,
          quote:
            "The scheduling framework alone was worth it. We went from constant call-ins to a stable, predictable schedule.",
          author: "Lisa Rodriguez",
          role: "Director of Nursing, Sunrise Homes",
          bgColor: "border-coral-100",
        },
        {
          rating: 5,
          quote:
            'Finally, practical solutions instead of just "hire more people." This guide changed how we think about staffing.',
          author: "Robert Kim",
          role: "CEO, Community Living Network",
          bgColor: "border-blue-100",
        },
      ]}
      relatedResources={[
        {
          title: "Stop Chasing Reimbursement",
          description:
            "Cost-cutting strategies that save an average of $127K annually without reducing care quality.",
          href: "/resources/financial-optimization",
        },
        {
          title: "The Compliance Paradox",
          description:
            "Reduce violations by 42% while spending less time on compliance paperwork.",
          href: "/resources/compliance-paradox",
        },
      ]}
      finalCtaHeadline="Ready to Solve Your Staffing Challenges?"
      finalCtaSubtext="Join 1,800+ facility administrators who have reduced overtime by an average of 35% using these proven strategies."
    />
  );
}
