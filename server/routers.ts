import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createSignup, getAllSignups, getDb } from "./db";
import { sendWelcomeEmail } from "./email";
import { sendReferralWelcomeEmail, sendReferralSuccessEmail, sendMilestoneEmail } from "./referralEmails";
import { getCurrentTier, REWARD_TIERS } from "../shared/referralRewards";
import { getCampaignStats } from "./emailCampaign";
import { validateReferralCode, createReferral, generateUniqueReferralCode } from "./referral";
import { getReferralAnalytics } from "./referralAnalytics";
import { checkAndCreateMilestones, getUnviewedMilestones, markMilestoneAsViewed, markMilestoneAsShared, getAllMilestones } from "./milestoneService";
import { calculatorRouter } from "./calculator";
import { adminCalculatorLeadsRouter } from "./adminCalculatorLeads";
import { resendWebhookRouter } from "./resendWebhook";
import { leadMagnetsRouter } from "./leadMagnets";
import { fileUploadRouter } from "./fileUpload";
import { signups, referrals } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  calculator: calculatorRouter,
  adminCalculatorLeads: adminCalculatorLeadsRouter,
  resendWebhook: resendWebhookRouter,
  leadMagnets: leadMagnetsRouter,
  fileUpload: fileUploadRouter,
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

      // Get referral analytics
      const referralAnalytics = await getReferralAnalytics();

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
        referralAnalytics,
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
    
    exportCSV: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      
      const { generateSignupsCSV } = await import('./csvExport');
      const signups = await getAllSignups();
      const csvContent = generateSignupsCSV(signups);
      
      return {
        csv: csvContent,
        filename: `signups_${new Date().toISOString().split('T')[0]}.csv`,
      };
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
          // Referral code
          referralCode: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Validate referral code if provided
        let referrerSignupId: number | null = null;
        if (input.referralCode) {
          referrerSignupId = await validateReferralCode(input.referralCode);
          if (!referrerSignupId) {
            throw new Error('Invalid referral code');
          }
        }

        // Generate unique referral code for new signup
        const ownReferralCode = await generateUniqueReferralCode();

        // Store interested features as JSON string
        const signupData = {
          ...input,
          interestedFeatures: input.interestedFeatures
            ? JSON.stringify(input.interestedFeatures)
            : null,
          usedReferralCode: input.referralCode || null,
          ownReferralCode,
        };

        const newSignupId = await createSignup(signupData);

        // Create referral relationship if code was used
        if (referrerSignupId && newSignupId) {
          try {
            await createReferral({
              referrerSignupId,
              referredSignupId: newSignupId,
              referralCode: input.referralCode!,
            });
          } catch (referralError) {
            console.error('[Signup] Failed to create referral:', referralError);
            // Don't fail the signup if referral tracking fails
          }
        }

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
        
        // Send referral welcome email with their code
        try {
          await sendReferralWelcomeEmail({
            email: input.email,
            firstName: input.firstName,
            referralCode: ownReferralCode,
          });
        } catch (emailError) {
          console.error('[Signup] Failed to send referral welcome email:', emailError);
        }
        
        // If they used a referral code, notify the referrer
        if (referrerSignupId && newSignupId) {
          try {
            // Get referrer details
            const db = await getDb();
            if (db) {
              const referrerData = await db
                .select()
                .from(signups)
                .where(eq(signups.id, referrerSignupId))
                .limit(1);
              
              if (referrerData.length > 0) {
                const referrer = referrerData[0];
                
                // Count total referrals for referrer
                const referrerReferrals = await db
                  .select()
                  .from(referrals)
                  .where(eq(referrals.referrerSignupId, referrerSignupId));
                
                const totalReferrals = referrerReferrals.length;
                
                // Send success notification
                await sendReferralSuccessEmail({
                  referrerEmail: referrer.email,
                  referrerFirstName: referrer.firstName,
                  referredName: `${input.firstName} ${input.lastName}`,
                  totalReferrals,
                });
                
                // Check for milestone achievements (tier upgrades, leaderboard, etc.)
                await checkAndCreateMilestones(referrerSignupId);
              }
            }
          } catch (emailError) {
            console.error('[Signup] Failed to send referrer notification:', emailError);
          }
        }

        return {
          success: true,
          message: "Thank you for signing up! Check your email for confirmation.",
        };
      }),
  }),

  referral: router({
    validate: publicProcedure
      .input(z.object({ code: z.string() }))
      .query(async ({ input }) => {
        const referrerSignupId = await validateReferralCode(input.code);
        return {
          valid: referrerSignupId !== null,
          message: referrerSignupId
            ? 'Valid referral code! You\'ll both receive exclusive rewards.'
            : 'Invalid referral code. Please check and try again.',
        };
      }),
    
    myReferrals: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new Error('Unauthorized');
      }
      
      // Get user's signup record to find their referral code
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }
      
      const userSignup = await db
        .select()
        .from(signups)
        .where(eq(signups.email, ctx.user.email || ''))
        .limit(1);
      
      if (userSignup.length === 0) {
        throw new Error('Signup record not found');
      }
      
      const signup = userSignup[0];
      const referralCode = signup.ownReferralCode || '';
      
      // Get all referrals made by this user
      const userReferrals = await db
        .select()
        .from(referrals)
        .where(eq(referrals.referrerSignupId, signup.id));
      
      // Get details of referred users
      const referredUsers = await Promise.all(
        userReferrals.map(async (ref) => {
          const referred = await db
            .select({
              name: signups.firstName,
              facilityName: signups.facilityName,
              tier: signups.tier,
              createdAt: signups.createdAt,
            })
            .from(signups)
            .where(eq(signups.id, ref.referredSignupId))
            .limit(1);
          
          return referred[0];
        })
      );
      
      return {
        referralCode,
        totalReferrals: userReferrals.length,
        referredUsers: referredUsers.filter(Boolean),
      };
    }),
    
    milestones: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) {
        throw new Error('Unauthorized');
      }
      
      // Get user's signup record
      const db = await getDb();
      if (!db) {
        throw new Error('Database not available');
      }
      
      const userSignup = await db
        .select()
        .from(signups)
        .where(eq(signups.email, ctx.user.email || ''))
        .limit(1);
      
      if (userSignup.length === 0) {
        throw new Error('Signup record not found');
      }
      
      const signup = userSignup[0];
      
      // Get all milestone notifications
      const allMilestones = await getAllMilestones(signup.id);
      const unviewedMilestones = await getUnviewedMilestones(signup.id);
      
      return {
        all: allMilestones,
        unviewed: unviewedMilestones,
      };
    }),
    
    markViewed: publicProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new Error('Unauthorized');
        }
        
        await markMilestoneAsViewed(input.notificationId);
        
        return { success: true };
      }),
    
    markShared: publicProcedure
      .input(z.object({ notificationId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new Error('Unauthorized');
        }
        
        await markMilestoneAsShared(input.notificationId);
        
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
