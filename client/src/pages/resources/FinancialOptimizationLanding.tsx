import ResourceLandingTemplate from "@/components/ResourceLandingTemplate";
import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  BarChart3,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function FinancialOptimizationLanding() {
  return (
    <ResourceLandingTemplate
      leadMagnetId={3}
      title="Stop Chasing Reimbursement: A Guide to Cost-Cutting in Residential Care"
      subtitle="The contrarian approach to financial sustainability: reduce costs by $127K annually without chasing higher reimbursement rates or cutting care quality."
      badge="📘 Free Professional Guide"
      seoDescription="Learn how to save an average of $127K annually through strategic cost reduction without compromising care quality or chasing reimbursement."
      seoImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028725899/GC5X5TPdNGfhjqPDyVt4dB/resources/financial-optimization-thumbnail.png"
      keyStats={[
        { value: "$127K", label: "Avg Savings", color: "blue" },
        { value: "18%", label: "Cost Reduction", color: "coral" },
        { value: "32", label: "Pages" },
      ]}
      downloadCount="2,100+"
      whatInside={[
        {
          icon: <DollarSign className="text-blue-600" size={24} />,
          title: "The Reimbursement Trap",
          description:
            "Why chasing higher rates is a losing game—and the better alternative.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <TrendingUp className="text-coral-600" size={24} />,
          title: "$127K Savings Framework",
          description:
            "Detailed breakdown of where facilities are finding hidden cost savings.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <PiggyBank className="text-blue-600" size={24} />,
          title: "Cost Reduction Strategies",
          description:
            "12 proven tactics to cut expenses without impacting resident care quality.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <BarChart3 className="text-coral-600" size={24} />,
          title: "ROI Calculator",
          description:
            "Interactive tool to project your facility's potential savings based on size and type.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <FileText className="text-blue-600" size={24} />,
          title: "Case Studies",
          description:
            "Real facilities that achieved 15-22% cost reduction in 12 months.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <CheckCircle2 className="text-coral-600" size={24} />,
          title: "90-Day Action Plan",
          description:
            "Week-by-week implementation guide with measurable milestones.",
          bgColor: "bg-coral-100",
        },
      ]}
      testimonials={[
        {
          rating: 5,
          quote:
            "We saved $143,000 in the first year by implementing just 6 of the 12 strategies. This guide paid for itself 1000x over.",
          author: "Patricia Williams",
          role: "CFO, Heritage Living Group",
          bgColor: "border-blue-100",
        },
        {
          rating: 5,
          quote:
            "Finally, a financial guide that doesn't tell us to just increase census or chase Medicaid rate increases.",
          author: "James Anderson",
          role: "Administrator, Maple Grove ICF",
          bgColor: "border-coral-100",
        },
        {
          rating: 5,
          quote:
            "The ROI calculator alone was worth downloading. It helped us prioritize which cost-cutting initiatives to tackle first.",
          author: "Maria Gonzalez",
          role: "Director, Sunshine Care Homes",
          bgColor: "border-blue-100",
        },
      ]}
      relatedResources={[
        {
          title: "The Staffing Crisis Myth",
          description:
            "Reduce overtime by 35% and improve staff retention without hiring more people.",
          href: "/resources/staffing-optimization",
        },
        {
          title: "Medication Management 2.0",
          description:
            "Eliminate medication errors and reduce liability costs with AI-powered safety protocols.",
          href: "/resources/medication-management",
        },
      ]}
      finalCtaHeadline="Ready to Transform Your Facility's Finances?"
      finalCtaSubtext="Join 2,100+ facility administrators who have saved an average of $127K annually using these cost-reduction strategies."
    />
  );
}
