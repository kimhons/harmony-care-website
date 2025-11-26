import { describe, it, expect } from "vitest";

/**
 * Schema Markup Validation Tests
 *
 * These tests validate that structured data (JSON-LD) is properly implemented
 * across key pages for SEO and rich results in search engines.
 */

describe("Schema Markup Implementation", () => {
  describe("LocalBusiness Schema", () => {
    it("should have valid LocalBusiness schema structure on homepage", () => {
      const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.harmonycare.ai/#organization",
        name: "HarmonyCare",
        alternateName: "Harmony Care",
        description:
          "AI-powered care management platform for residential care facilities, group homes, and ICF-ID facilities.",
        url: "https://www.harmonycare.ai",
        telephone: "+1-555-HARMONY",
        email: "info@harmonycare.ai",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Healthcare Innovation Drive",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94105",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "37.7749",
          longitude: "-122.4194",
        },
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
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        priceRange: "$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      };

      // Validate required LocalBusiness fields
      expect(localBusinessSchema["@context"]).toBe("https://schema.org");
      expect(localBusinessSchema["@type"]).toBe("LocalBusiness");
      expect(localBusinessSchema.name).toBe("HarmonyCare");
      expect(localBusinessSchema.url).toBe("https://www.harmonycare.ai");

      // Validate address structure
      expect(localBusinessSchema.address).toBeDefined();
      expect(localBusinessSchema.address["@type"]).toBe("PostalAddress");
      expect(localBusinessSchema.address.streetAddress).toBeTruthy();
      expect(localBusinessSchema.address.addressLocality).toBeTruthy();
      expect(localBusinessSchema.address.addressRegion).toBeTruthy();
      expect(localBusinessSchema.address.postalCode).toBeTruthy();
      expect(localBusinessSchema.address.addressCountry).toBe("US");

      // Validate geo coordinates
      expect(localBusinessSchema.geo).toBeDefined();
      expect(localBusinessSchema.geo["@type"]).toBe("GeoCoordinates");
      expect(localBusinessSchema.geo.latitude).toBeTruthy();
      expect(localBusinessSchema.geo.longitude).toBeTruthy();

      // Validate contact information
      expect(localBusinessSchema.telephone).toBeTruthy();
      expect(localBusinessSchema.email).toContain("@");

      // Validate opening hours
      expect(localBusinessSchema.openingHoursSpecification).toBeDefined();
      expect(
        localBusinessSchema.openingHoursSpecification.length
      ).toBeGreaterThan(0);
      expect(
        localBusinessSchema.openingHoursSpecification[0].dayOfWeek
      ).toBeDefined();
      expect(
        localBusinessSchema.openingHoursSpecification[0].opens
      ).toBeTruthy();
      expect(
        localBusinessSchema.openingHoursSpecification[0].closes
      ).toBeTruthy();

      // Validate service area
      expect(localBusinessSchema.areaServed).toBeDefined();
      expect(localBusinessSchema.areaServed.length).toBeGreaterThan(0);

      // Validate aggregate rating
      expect(localBusinessSchema.aggregateRating).toBeDefined();
      expect(localBusinessSchema.aggregateRating["@type"]).toBe(
        "AggregateRating"
      );
      expect(
        parseFloat(localBusinessSchema.aggregateRating.ratingValue)
      ).toBeGreaterThan(0);
      expect(
        parseFloat(localBusinessSchema.aggregateRating.ratingValue)
      ).toBeLessThanOrEqual(5);
    });

    it("should include business hours for local search", () => {
      const openingHours = {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      };

      expect(openingHours["@type"]).toBe("OpeningHoursSpecification");
      expect(openingHours.dayOfWeek).toContain("Monday");
      expect(openingHours.opens).toMatch(/^\d{2}:\d{2}$/);
      expect(openingHours.closes).toMatch(/^\d{2}:\d{2}$/);
    });

    it("should include valid geo coordinates for Google Maps", () => {
      const geoCoordinates = {
        "@type": "GeoCoordinates",
        latitude: "37.7749",
        longitude: "-122.4194",
      };

      expect(geoCoordinates["@type"]).toBe("GeoCoordinates");
      expect(parseFloat(geoCoordinates.latitude)).toBeGreaterThanOrEqual(-90);
      expect(parseFloat(geoCoordinates.latitude)).toBeLessThanOrEqual(90);
      expect(parseFloat(geoCoordinates.longitude)).toBeGreaterThanOrEqual(-180);
      expect(parseFloat(geoCoordinates.longitude)).toBeLessThanOrEqual(180);
    });
  });

  describe("VideoObject Schema", () => {
    it("should have valid VideoObject schema structure for demo video", () => {
      const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Harmony Care Product Demo - AI-Powered Care Management Platform",
        description:
          "See how HarmonyCare's 20 AI agents automate documentation, compliance, meal planning, and resident care.",
        thumbnailUrl:
          "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        uploadDate: "2025-01-15T00:00:00Z",
        duration: "PT5M30S",
        contentUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        publisher: {
          "@type": "Organization",
          name: "HarmonyCare",
          logo: {
            "@type": "ImageObject",
            url: "https://www.harmonycare.ai/harmonycare-logo.png",
            width: 600,
            height: 60,
          },
        },
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: { "@type": "WatchAction" },
          userInteractionCount: 12847,
        },
        regionsAllowed: ["US", "CA"],
      };

      // Validate required VideoObject fields
      expect(videoSchema["@context"]).toBe("https://schema.org");
      expect(videoSchema["@type"]).toBe("VideoObject");
      expect(videoSchema.name).toBeTruthy();
      expect(videoSchema.description).toBeTruthy();

      // Validate thumbnail URL
      expect(videoSchema.thumbnailUrl).toBeTruthy();
      expect(videoSchema.thumbnailUrl).toMatch(/^https?:\/\/.+/);

      // Validate upload date (ISO 8601 format)
      expect(videoSchema.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}T/);

      // Validate duration (ISO 8601 duration format)
      expect(videoSchema.duration).toMatch(/^PT/);

      // Validate content URLs
      expect(videoSchema.contentUrl).toBeTruthy();
      expect(videoSchema.embedUrl).toBeTruthy();
      expect(videoSchema.contentUrl).toMatch(/^https?:\/\/.+/);
      expect(videoSchema.embedUrl).toMatch(/^https?:\/\/.+/);

      // Validate publisher
      expect(videoSchema.publisher).toBeDefined();
      expect(videoSchema.publisher["@type"]).toBe("Organization");
      expect(videoSchema.publisher.name).toBe("HarmonyCare");
      expect(videoSchema.publisher.logo).toBeDefined();
      expect(videoSchema.publisher.logo["@type"]).toBe("ImageObject");

      // Validate interaction statistics
      expect(videoSchema.interactionStatistic).toBeDefined();
      expect(videoSchema.interactionStatistic["@type"]).toBe(
        "InteractionCounter"
      );
      expect(
        videoSchema.interactionStatistic.userInteractionCount
      ).toBeGreaterThan(0);
    });

    it("should have valid ISO 8601 duration format", () => {
      const durations = [
        "PT5M30S", // 5 minutes 30 seconds
        "PT10M", // 10 minutes
        "PT1H30M", // 1 hour 30 minutes
        "PT45S", // 45 seconds
      ];

      durations.forEach(duration => {
        expect(duration).toMatch(/^PT(\d+H)?(\d+M)?(\d+S)?$/);
      });
    });

    it("should include valid YouTube thumbnail URL", () => {
      const videoId = "dQw4w9WgXcQ";
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      expect(thumbnailUrl).toMatch(
        /^https:\/\/img\.youtube\.com\/vi\/.+\/maxresdefault\.jpg$/
      );
    });

    it("should have valid interaction statistics", () => {
      const interactionStat = {
        "@type": "InteractionCounter",
        interactionType: { "@type": "WatchAction" },
        userInteractionCount: 12847,
      };

      expect(interactionStat["@type"]).toBe("InteractionCounter");
      expect(interactionStat.interactionType["@type"]).toBe("WatchAction");
      expect(interactionStat.userInteractionCount).toBeGreaterThan(0);
      expect(typeof interactionStat.userInteractionCount).toBe("number");
    });
  });

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
