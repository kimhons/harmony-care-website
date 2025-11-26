import ResourceLandingTemplate from "@/components/ResourceLandingTemplate";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  FileText,
  BarChart3,
  Users,
} from "lucide-react";

export default function MedicationManagementLanding() {
  return (
    <ResourceLandingTemplate
      leadMagnetId={4}
      exitIntentLeadMagnetId={9}
      category="medication"
      title="Medication Management 2.0: AI-Powered Medication Safety Guide"
      subtitle="How residential care facilities are achieving zero medication errors using AI-powered safety protocols and automated verification systems."
      badge="📘 Free Professional Guide"
      seoDescription="Eliminate medication errors and reduce liability exposure with AI-powered medication management protocols for residential care facilities."
      seoImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028725899/GC5X5TPdNGfhjqPDyVt4dB/resources/medication-management-thumbnail.png"
      keyStats={[
        { value: "Zero", label: "Med Errors", color: "blue" },
        { value: "88%", label: "Time Saved", color: "coral" },
        { value: "26", label: "Pages" },
      ]}
      downloadCount="1,600+"
      whatInside={[
        {
          icon: <Shield className="text-blue-600" size={24} />,
          title: "Zero Error Framework",
          description:
            "The systematic approach that eliminated medication errors in 47 facilities.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <AlertTriangle className="text-coral-600" size={24} />,
          title: "Common Error Patterns",
          description:
            "The 7 most frequent medication errors and how to prevent each one.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <CheckCircle2 className="text-blue-600" size={24} />,
          title: "AI Verification Systems",
          description:
            "How automated double-checks catch errors before they reach residents.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <FileText className="text-coral-600" size={24} />,
          title: "Documentation Best Practices",
          description:
            "Streamlined MAR documentation that satisfies surveyors and saves time.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <BarChart3 className="text-blue-600" size={24} />,
          title: "Liability Reduction",
          description:
            "How better medication management reduces insurance costs and legal exposure.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <Users className="text-coral-600" size={24} />,
          title: "Staff Training Program",
          description:
            "Complete training curriculum to ensure consistent medication administration.",
          bgColor: "bg-coral-100",
        },
      ]}
      testimonials={[
        {
          rating: 5,
          quote:
            "We went from 3-4 medication errors per month to zero in 6 months. The AI verification system is a game-changer.",
          author: "Dr. Emily Chen",
          role: "Medical Director, Riverside Care",
          bgColor: "border-blue-100",
        },
        {
          rating: 5,
          quote:
            "Our insurance premiums dropped 15% after implementing these protocols. The ROI was immediate.",
          author: "Thomas Baker",
          role: "Administrator, Valley View ICF",
          bgColor: "border-coral-100",
        },
        {
          rating: 5,
          quote:
            "The documentation templates alone saved our nurses 2+ hours per day. And the error prevention is priceless.",
          author: "Sandra Lopez",
          role: "Director of Nursing, Harmony Homes",
          bgColor: "border-blue-100",
        },
      ]}
      relatedResources={[
        {
          title: "The Compliance Paradox",
          description:
            "Reduce regulatory violations by 42% while spending less time on paperwork.",
          href: "/resources/compliance-paradox",
        },
        {
          title: "The Active Treatment Trap",
          description:
            "Person-centered care strategies that achieve 94% family satisfaction.",
          href: "/resources/active-treatment-trap",
        },
      ]}
      finalCtaHeadline="Ready to Eliminate Medication Errors?"
      finalCtaSubtext="Join 1,600+ facility administrators who have achieved zero medication errors using these AI-powered safety protocols."
    />
  );
}
