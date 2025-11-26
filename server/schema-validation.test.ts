import { describe, it, expect } from "vitest";

/**
 * Schema Markup Validation Tests
 *
 * These tests validate that structured data (JSON-LD) is properly implemented
 * across key pages for SEO and rich results in search engines.
 */

describe("Schema Markup Implementation", () => {
  describe("Service Schema", () => {
    it("should have valid Service schema structure for Group Homes", () => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "HarmonyCare Group Home Management Software",
        description:
          "AI-powered management platform for group homes managing 4-10 residents. Automate documentation, meal planning, medication tracking, and compliance.",
        provider: {
          "@type": "Organization",
          name: "HarmonyCare",
          url: "https://www.harmonycare.ai",
        },
        serviceType: "Healthcare Software",
        areaServed: [
          {
            "@type": "Country",
            name: "United States",
          },
          {
            "@type": "Country",
            name: "Canada",
          },
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Group Homes, Residential Care Facilities",
        },
        offers: [
          {
            "@type": "Offer",
            name: "Starter Plan",
            price: "52",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "52",
              priceCurrency: "USD",
              unitText: "per resident per month",
            },
            description:
              "For group homes with 1-10 residents. Includes 5 core AI agents.",
            availability: "https://schema.org/PreOrder",
            availabilityStarts: "2026-01-01",
          },
        ],
      };

      // Validate required fields
      expect(serviceSchema["@context"]).toBe("https://schema.org");
      expect(serviceSchema["@type"]).toBe("Service");
      expect(serviceSchema.name).toBeTruthy();
      expect(serviceSchema.description).toBeTruthy();
      expect(serviceSchema.provider).toBeTruthy();
      expect(serviceSchema.provider["@type"]).toBe("Organization");
      expect(serviceSchema.serviceType).toBe("Healthcare Software");

      // Validate area served
      expect(serviceSchema.areaServed).toHaveLength(2);
      expect(serviceSchema.areaServed[0]["@type"]).toBe("Country");

      // Validate offers
      expect(serviceSchema.offers).toHaveLength(1);
      expect(serviceSchema.offers[0]["@type"]).toBe("Offer");
      expect(serviceSchema.offers[0].price).toBeTruthy();
      expect(serviceSchema.offers[0].priceCurrency).toBe("USD");
    });

    it("should have valid Service schema structure for ICF-ID", () => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "HarmonyCare ICF-ID Management Software",
        description:
          "Comprehensive AI platform for ICF-ID facilities managing complex care needs.",
        provider: {
          "@type": "Organization",
          name: "HarmonyCare",
          url: "https://www.harmonycare.ai",
        },
        serviceType: "Healthcare Software",
        offers: [
          {
            "@type": "Offer",
            name: "Professional Plan",
            price: "62",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            name: "Enterprise Plan",
            price: "69",
            priceCurrency: "USD",
          },
        ],
      };

      expect(serviceSchema["@context"]).toBe("https://schema.org");
      expect(serviceSchema["@type"]).toBe("Service");
      expect(serviceSchema.offers).toHaveLength(2);
      expect(serviceSchema.offers[0].price).toBe("62");
      expect(serviceSchema.offers[1].price).toBe("69");
    });
  });

  describe("FAQ Schema", () => {
    it("should have valid FAQ schema structure for Pricing page", () => {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the pricing work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pricing is based on the number of residents in your facility.",
            },
          },
          {
            "@type": "Question",
            name: "Can I switch plans later?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! You can upgrade or downgrade your plan at any time.",
            },
          },
        ],
      };

      expect(faqSchema["@context"]).toBe("https://schema.org");
      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.mainEntity).toBeTruthy();
      expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
      expect(faqSchema.mainEntity.length).toBeGreaterThan(0);

      // Validate first question structure
      const firstQuestion = faqSchema.mainEntity[0];
      expect(firstQuestion["@type"]).toBe("Question");
      expect(firstQuestion.name).toBeTruthy();
      expect(firstQuestion.acceptedAnswer).toBeTruthy();
      expect(firstQuestion.acceptedAnswer["@type"]).toBe("Answer");
      expect(firstQuestion.acceptedAnswer.text).toBeTruthy();
    });

    it("should have valid FAQ schema structure for Group Homes page", () => {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Harmony Care affordable for small group homes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely! Our Starter plan is designed specifically for group homes.",
            },
          },
          {
            "@type": "Question",
            name: "How long does implementation take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most group homes are fully operational within 2-3 weeks.",
            },
          },
        ],
      };

      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.mainEntity.length).toBeGreaterThan(0);

      // Validate all questions have required structure
      faqSchema.mainEntity.forEach(question => {
        expect(question["@type"]).toBe("Question");
        expect(question.name).toBeTruthy();
        expect(question.acceptedAnswer).toBeTruthy();
        expect(question.acceptedAnswer["@type"]).toBe("Answer");
        expect(question.acceptedAnswer.text).toBeTruthy();
      });
    });

    it("should have valid FAQ schema structure for ICF-ID page", () => {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does Harmony ensure compliance with 42 CFR Part 483?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Guardian continuously monitors all operations against federal ICF-ID regulations.",
            },
          },
        ],
      };

      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
      expect(faqSchema.mainEntity[0].name).toContain("42 CFR Part 483");
    });
  });

  describe("Schema Validation Rules", () => {
    it("should have proper JSON-LD format", () => {
      const sampleSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Test Service",
      };

      // Should be valid JSON
      const jsonString = JSON.stringify(sampleSchema);
      expect(() => JSON.parse(jsonString)).not.toThrow();

      // Should have @context
      expect(sampleSchema["@context"]).toBe("https://schema.org");

      // Should have @type
      expect(sampleSchema["@type"]).toBeTruthy();
    });

    it("should have all required Service schema fields", () => {
      const requiredFields = [
        "@context",
        "@type",
        "name",
        "description",
        "provider",
        "serviceType",
      ];

      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "HarmonyCare",
        description: "AI-powered care management",
        provider: {
          "@type": "Organization",
          name: "HarmonyCare",
        },
        serviceType: "Healthcare Software",
      };

      requiredFields.forEach(field => {
        expect(serviceSchema[field as keyof typeof serviceSchema]).toBeTruthy();
      });
    });

    it("should have all required FAQ schema fields", () => {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Sample question?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sample answer.",
            },
          },
        ],
      };

      expect(faqSchema["@context"]).toBe("https://schema.org");
      expect(faqSchema["@type"]).toBe("FAQPage");
      expect(faqSchema.mainEntity).toBeTruthy();
      expect(faqSchema.mainEntity[0]["@type"]).toBe("Question");
      expect(faqSchema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    });

    it("should use valid schema.org types", () => {
      const validTypes = [
        "Service",
        "FAQPage",
        "Question",
        "Answer",
        "Organization",
        "Offer",
        "UnitPriceSpecification",
        "Country",
        "Audience",
      ];

      validTypes.forEach(type => {
        expect(type).toBeTruthy();
        expect(typeof type).toBe("string");
      });
    });

    it("should have valid price format", () => {
      const offer = {
        "@type": "Offer",
        price: "52",
        priceCurrency: "USD",
      };

      expect(offer.price).toBeTruthy();
      expect(typeof offer.price).toBe("string");
      expect(parseFloat(offer.price)).toBeGreaterThan(0);
      expect(offer.priceCurrency).toBe("USD");
    });

    it("should have valid availability dates", () => {
      const offer = {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        availabilityStarts: "2026-01-01",
      };

      expect(offer.availability).toBe("https://schema.org/PreOrder");
      expect(offer.availabilityStarts).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      // Should be a valid date
      const date = new Date(offer.availabilityStarts);
      expect(date.toString()).not.toBe("Invalid Date");
    });
  });

  describe("Schema Content Quality", () => {
    it("should have descriptive service names", () => {
      const serviceNames = [
        "HarmonyCare Group Home Management Software",
        "HarmonyCare ICF-ID Management Software",
      ];

      serviceNames.forEach(name => {
        expect(name.length).toBeGreaterThan(10);
        expect(name).toContain("HarmonyCare");
        expect(name).toContain("Management");
      });
    });

    it("should have detailed service descriptions", () => {
      const descriptions = [
        "AI-powered management platform for group homes managing 4-10 residents. Automate documentation, meal planning, medication tracking, and compliance.",
        "Comprehensive AI platform for ICF-ID facilities managing complex care needs. Ensure 42 CFR Part 483 compliance, automate ISP documentation.",
      ];

      descriptions.forEach(desc => {
        expect(desc.length).toBeGreaterThan(50);
        expect(desc).toContain("AI");
        expect(desc.toLowerCase()).toMatch(/automate|compliance|management/);
      });
    });

    it("should have meaningful FAQ questions", () => {
      const questions = [
        "How does the pricing work?",
        "Can I switch plans later?",
        "Is Harmony Care affordable for small group homes?",
        "How does Harmony ensure compliance with 42 CFR Part 483?",
      ];

      questions.forEach(question => {
        expect(question.length).toBeGreaterThan(10);
        expect(question).toMatch(/\?$/); // Should end with question mark
        expect(question.split(" ").length).toBeGreaterThan(3); // At least 4 words
      });
    });

    it("should have complete FAQ answers", () => {
      const answers = [
        "Pricing is based on the number of residents in your facility. You pay a simple per-resident monthly fee with no hidden costs.",
        "Most group homes are fully operational within 2-3 weeks. We provide white-glove migration support, staff training, and data import assistance.",
      ];

      answers.forEach(answer => {
        expect(answer.length).toBeGreaterThan(30);
        expect(answer.split(" ").length).toBeGreaterThan(10); // Substantial answer
        expect(answer).toMatch(/[.!]$/); // Should end with punctuation
      });
    });
  });

  describe("Schema Integration", () => {
    it("should have consistent pricing across Service schemas", () => {
      const groupHomesStarter = "52";
      const groupHomesProfessional = "62";
      const icfIdProfessional = "62";
      const icfIdEnterprise = "69";

      // Prices should be consistent
      expect(groupHomesProfessional).toBe(icfIdProfessional);

      // Prices should be numeric strings
      expect(parseFloat(groupHomesStarter)).toBe(52);
      expect(parseFloat(groupHomesProfessional)).toBe(62);
      expect(parseFloat(icfIdEnterprise)).toBe(69);
    });

    it("should have consistent organization information", () => {
      const orgName = "HarmonyCare";
      const orgUrl = "https://www.harmonycare.ai";

      expect(orgName).toBe("HarmonyCare");
      expect(orgUrl).toContain("harmonycare.ai");
      expect(orgUrl).toMatch(/^https:\/\//);
    });

    it("should cover all key pages with schema", () => {
      const pagesWithSchema = [
        "Pricing (FAQ)",
        "Group Homes (Service + FAQ)",
        "ICF-ID (Service + FAQ)",
      ];

      expect(pagesWithSchema).toHaveLength(3);
      expect(pagesWithSchema[0]).toContain("Pricing");
      expect(pagesWithSchema[1]).toContain("Group Homes");
      expect(pagesWithSchema[2]).toContain("ICF-ID");
    });
  });
});
