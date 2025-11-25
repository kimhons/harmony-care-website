import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createSignup, getAllSignups } from "./db";
import { sendWelcomeEmail } from "./email";
import { getCampaignStats } from "./emailCampaign";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  admin: router({
    analytics: publicProcedure.query(async ({ ctx }) => {
      // TODO: Add admin auth check
      if (!ctx.user || ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const signups = await getAllSignups();
      const campaignStats = await getCampaignStats();

      // Calculate analytics
      const totalSignups = signups.length;
      const signupsByTier = signups.reduce((acc: Record<string, number>, s) => {
        acc[s.tier] = (acc[s.tier] || 0) + 1;
        return acc;
      }, {});
      const signupsByFacilityType = signups.reduce((acc: Record<string, number>, s) => {
        acc[s.facilityType] = (acc[s.facilityType] || 0) + 1;
        return acc;
      }, {});
      const totalResidents = signups.reduce((sum, s) => sum + s.residentCount, 0);
      const avgResidentsPerFacility = totalSignups > 0 ? Math.round(totalResidents / totalSignups) : 0;

      // Interested features analysis
      const featureCounts: Record<string, number> = {};
      signups.forEach((s) => {
        if (s.interestedFeatures) {
          try {
            const features = JSON.parse(s.interestedFeatures);
            features.forEach((f: string) => {
              featureCounts[f] = (featureCounts[f] || 0) + 1;
            });
          } catch {}
        }
      });

      // Signup trend (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentSignups = signups.filter((s) => new Date(s.createdAt) >= thirtyDaysAgo);
      const signupsByDay: Record<string, number> = {};
      recentSignups.forEach((s) => {
        const date = new Date(s.createdAt).toISOString().split('T')[0];
        signupsByDay[date] = (signupsByDay[date] || 0) + 1;
      });
      
      // UTM tracking statistics
      const utmStats = {
        bySource: signups.reduce((acc: Record<string, number>, s) => {
          const source = s.utmSource || 'direct';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {}),
        byMedium: signups.reduce((acc: Record<string, number>, s) => {
          const medium = s.utmMedium || 'direct';
          acc[medium] = (acc[medium] || 0) + 1;
          return acc;
        }, {}),
        byCampaign: signups.reduce((acc: Record<string, number>, s) => {
          const campaign = s.utmCampaign || 'none';
          acc[campaign] = (acc[campaign] || 0) + 1;
          return acc;
        }, {}),
      };

      return {
        totalSignups,
        signupsByTier,
        signupsByFacilityType,
        totalResidents,
        avgResidentsPerFacility,
        featureCounts,
        signupsByDay,
        campaignStats,
        utmStats,
        recentSignups: signups.slice(0, 10).map((s) => ({
          id: s.id,
          name: `${s.firstName} ${s.lastName}`,
          email: s.email,
          facilityName: s.facilityName,
          facilityType: s.facilityType,
          tier: s.tier,
          createdAt: s.createdAt,
        })),
      };
    }),

    signups: publicProcedure.query(async ({ ctx }) => {
      // TODO: Add admin auth check
      if (!ctx.user || ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const signups = await getAllSignups();
      return signups.map((s) => ({
        ...s,
        interestedFeatures: s.interestedFeatures ? JSON.parse(s.interestedFeatures) : [],
      }));
    }),
  }),

  signup: router({
    create: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Invalid email address"),
          phone: z.string().optional(),
          facilityName: z.string().min(1, "Facility name is required"),
          facilityType: z.string().min(1, "Facility type is required"),
          residentCount: z.number().min(1, "Resident count must be at least 1"),
          tier: z.string().min(1, "Please select a tier"),
          interestedFeatures: z.array(z.string()).optional(),
          additionalNeeds: z.string().optional(),
          // UTM tracking parameters
          utmSource: z.string().optional(),
          utmMedium: z.string().optional(),
          utmCampaign: z.string().optional(),
          utmTerm: z.string().optional(),
          utmContent: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Store interested features as JSON string
        const signupData = {
          ...input,
          interestedFeatures: input.interestedFeatures
            ? JSON.stringify(input.interestedFeatures)
            : null,
        };

        await createSignup(signupData);

        // Send welcome email
        try {
          await sendWelcomeEmail({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            facilityName: input.facilityName,
            tier: input.tier,
          });
        } catch (emailError) {
          console.error('[Signup] Failed to send welcome email:', emailError);
          // Don't fail the signup if email fails
        }

        return {
          success: true,
          message: "Thank you for signing up! Check your email for confirmation.",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
