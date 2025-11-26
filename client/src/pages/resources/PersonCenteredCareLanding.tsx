import ResourceLandingTemplate from "@/components/ResourceLandingTemplate";
import {
  Heart,
  Users,
  TrendingUp,
  FileText,
  CheckCircle2,
  Smile,
} from "lucide-react";

export default function PersonCenteredCareLanding() {
  return (
    <ResourceLandingTemplate
      leadMagnetId={5}
      title="The Active Treatment Trap: Person-Centered Care in ICF-ID Facilities"
      subtitle="How to satisfy active treatment requirements while delivering truly person-centered care that achieves 94% family satisfaction."
      badge="📘 Free Professional Guide"
      seoDescription="Balance active treatment requirements with person-centered care to achieve 94% family satisfaction in ICF-ID facilities."
      seoImage="https://d2xsxph8kpxj0f.cloudfront.net/310419663028725899/GC5X5TPdNGfhjqPDyVt4dB/resources/person-centered-care-thumbnail.png"
      keyStats={[
        { value: "94%", label: "Family Satisfaction", color: "blue" },
        { value: "100%", label: "Compliance", color: "coral" },
        { value: "30", label: "Pages" },
      ]}
      downloadCount="1,900+"
      whatInside={[
        {
          icon: <Heart className="text-blue-600" size={24} />,
          title: "The Active Treatment Trap",
          description:
            "Why traditional active treatment approaches fail residents—and what works better.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <Users className="text-coral-600" size={24} />,
          title: "Person-Centered Framework",
          description:
            "How to design ISPs that honor individual preferences while meeting regulatory requirements.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <TrendingUp className="text-blue-600" size={24} />,
          title: "94% Satisfaction Strategy",
          description:
            "The systematic approach that achieved industry-leading family satisfaction scores.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <FileText className="text-coral-600" size={24} />,
          title: "ISP Development Guide",
          description:
            "Templates and examples for creating meaningful, person-centered service plans.",
          bgColor: "bg-coral-100",
        },
        {
          icon: <CheckCircle2 className="text-blue-600" size={24} />,
          title: "Compliance Integration",
          description:
            "How to satisfy CFR 483 active treatment requirements through person-centered practices.",
          bgColor: "bg-blue-100",
        },
        {
          icon: <Smile className="text-coral-600" size={24} />,
          title: "Quality of Life Metrics",
          description:
            "Measuring what matters: resident happiness, engagement, and meaningful participation.",
          bgColor: "bg-coral-100",
        },
      ]}
      testimonials={[
        {
          rating: 5,
          quote:
            "Our family satisfaction scores went from 73% to 94% in one year. This approach transformed our culture.",
          author: "Rebecca Martinez",
          role: "Administrator, Meadowbrook ICF-ID",
          bgColor: "border-blue-100",
        },
        {
          rating: 5,
          quote:
            "Finally, a guide that shows how to be compliant AND person-centered. We passed our survey with zero deficiencies.",
          author: "John Patterson",
          role: "Director, Community Living Services",
          bgColor: "border-coral-100",
        },
        {
          rating: 5,
          quote:
            "The ISP templates alone saved us countless hours. And the residents are noticeably happier and more engaged.",
          author: "Angela Davis",
          role: "Program Director, Sunrise ICF",
          bgColor: "border-blue-100",
        },
      ]}
      relatedResources={[
        {
          title: "The Compliance Paradox",
          description:
            "Navigate ICF-ID regulations while reducing violations by 42%.",
          href: "/resources/compliance-paradox",
        },
        {
          title: "Stop Chasing Reimbursement",
          description:
            "Save $127K annually through strategic cost reduction without cutting care quality.",
          href: "/resources/financial-optimization",
        },
      ]}
      finalCtaHeadline="Ready to Transform Your Care Approach?"
      finalCtaSubtext="Join 1,900+ facility administrators who have achieved 94% family satisfaction while maintaining 100% compliance."
    />
  );
}
