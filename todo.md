# Harmony Website TODO

## Phase 1: Homepage & Foundation
- [x] Design system setup (colors, typography, spacing)
- [x] Homepage hero section with compelling headline and CTA
- [x] Problem/solution sections
- [x] Top 5 AI agents showcase
- [x] Key features grid
- [x] Outcomes/results section
- [x] Trust & security badges
- [x] Final CTA section
- [x] Responsive navigation header
- [x] Footer with links

## Phase 2: Product Pages
- [ ] Product overview page
- [ ] 15 AI agents page with detailed cards
- [ ] Features page with 20 categories
- [ ] 7 Dashboards showcase
- [ ] Integrations page
- [ ] Security & compliance page

## Phase 3: Solutions, Pricing & Resources
- [ ] Solutions: For Group Homes
- [ ] Solutions: For ICF-ID Facilities
- [ ] Solutions: For Administrators
- [ ] Solutions: For Clinical Staff
- [ ] Solutions: For Families
- [ ] Pricing page with 3 tiers
- [ ] ROI calculator (interactive)
- [ ] Resources: Blog structure
- [ ] Resources: Case studies
- [ ] Resources: Help center

## Phase 4: Company & Forms
- [ ] About Us page
- [ ] Careers page
- [ ] Request Demo form
- [ ] Start Free Trial form
- [ ] Join Beta Program page
- [ ] Contact Us page
- [ ] SEO optimization (meta tags, structured data)
- [ ] Performance optimization
- [ ] Final testing and polish

## Bugs
- [x] Fix Vite WebSocket HMR connection issue

## Mobile Improvements
- [x] Implement responsive hamburger menu with slide-out panel

## Pricing Page
- [x] Create pricing page route
- [x] Build three subscription tier cards (Starter, Professional, Enterprise)
- [x] Implement interactive ROI calculator
- [x] Add pricing comparison table
- [x] Add FAQ section

## AI Agents Showcase Page
- [x] Create /agents route
- [x] Build detailed cards for all 15 AI agents
- [x] Add agent descriptions, use cases, and impact metrics
- [x] Implement filtering/categorization by function
- [x] Add visual icons/illustrations for each agent

## Demo Request Form
- [x] Create /demo route
- [x] Build multi-step form wizard (3 steps)
- [x] Step 1: Facility information (name, type, size, location)
- [x] Step 2: Current challenges selection
- [x] Step 3: Scheduling with calendar integration
- [x] Add form validation and error handling
- [x] Implement progress indicator
- [x] Add success confirmation page

## Video Modal
- [x] Implement video modal component with YouTube embed
- [x] Add modal trigger to hero section play button
- [x] Include backdrop overlay and close button
- [x] Add keyboard support (ESC to close)

## Branding Updates
- [x] Change color palette from dark theme to happy medical branding
- [x] Update CSS variables in index.css to use Healthcare Blue (#0066FF) and Warm Coral (#FF6B6B)
- [x] Change hero background from dark to light gradient
- [x] Update text colors for light background theme
- [x] Change hero headline to "Transform Your Resident Care Facility"
- [x] Update ThemeProvider default theme to "light"
- [x] Test all pages for color consistency

## Agent Expansion (15 → 20 Agents)
- [x] Add 5 new agents to homepage agent grid
- [x] Create detailed cards for Executive Assistant agent
- [x] Create detailed cards for HR Manager agent
- [x] Create detailed cards for Maintenance Coordinator agent
- [x] Create detailed cards for Nutrition Specialist agent
- [x] Create detailed cards for Transportation Manager agent
- [x] Update all "15 agents" references to "20 agents" across website
- [x] Update hero section tagline
- [x] Update agent count in badges and CTAs
- [x] Test all pages for consistency

## Group Homes Solutions Page
- [x] Create /solutions/group-homes route
- [x] Build hero section with group home focus
- [x] Add challenges section specific to group homes
- [x] Create recommended agents section with 8-10 key agents
- [x] Add real-world use case scenarios
- [x] Include pricing information for small facilities
- [x] Create comparison: Before vs After Harmony
- [x] Add FAQ section for group homes
- [x] Include CTA for demo and trial
- [x] Update navigation to include Solutions link
- [x] Test page on mobile and desktop

## ICF-ID Solutions Page
- [x] Create /solutions/icf-id route
- [x] Build hero section with ICF-ID focus
- [x] Add ICF-ID-specific challenges (active treatment, regulatory complexity, etc.)
- [x] Create recommended agents section (10 key agents for ICF-ID)
- [x] Add real-world use cases for ICF-ID facilities
- [x] Include pricing information for mid-sized facilities (Professional tier)
- [x] Add compliance section (CFR 483, active treatment requirements)
- [x] Create before/after comparison table
- [x] Add FAQ section for ICF-ID facilities
- [x] Include CTA for demo and trial
- [x] Update navigation (ICF-ID accessible via direct URL)
- [x] Test page on mobile and desktop

## Navigation Dropdown Enhancement
- [x] Create Navigation component with Solutions dropdown
- [x] Add hover/click functionality for dropdown menu
- [x] Include Group Homes and ICF-ID links in dropdown
- [x] Update Home page to use new Navigation component
- [x] Update Agents page to use new Navigation component
- [x] Update Pricing page to use new Navigation component
- [x] Update Demo page to use new Navigation component
- [x] Update GroupHomes page to use new Navigation component
- [x] Update IcfId page to use new Navigation component
- [x] Test dropdown on desktop and mobile
- [x] Ensure proper z-index and positioning

## Founding Member Pricing Campaign
- [x] Calculate marked-up base prices (75% increase)
- [x] Calculate founding member prices with tiered discounts (50%/55%/60%)
- [x] Update Pricing page with founding member campaign
- [x] Add strikethrough regular pricing with founding member pricing
- [x] Include 40% off onboarding fees messaging
- [x] Include 40% off yearly maintenance fees messaging
- [x] Add scarcity elements (limited spots, deadline)
- [x] Add exclusive founding member benefits
- [x] Add founding member badges and visual emphasis
- [x] Update Group Homes solutions page pricing
- [x] Update ICF-ID solutions page pricing
- [x] Update homepage pricing references
- [x] Add founding member badges and visual emphasis
- [x] Test all pricing displays across pages

## Increase Markup to 100%
- [x] Recalculate regular prices with 100% markup (double base prices)
- [x] Update Pricing page with new regular prices
- [x] Update Group Homes page with new regular prices
- [x] Update ICF-ID page with new regular prices
- [x] Update homepage pricing references
- [x] Recalculate savings examples
- [x] Test all pricing displays

## HarmonyCare Logo
- [x] Generate medical logo with "Harmony" and "Care" in different colors
- [x] Add medical icon (heart with pulse or cross)
- [x] Update APP_LOGO constant in const.ts
- [x] Test logo across all pages

## Trust Badges & Certifications
- [x] Design trust badges section with HIPAA, SOC 2, security certifications
- [x] Add integration partner logos (EHR systems, pharmacy platforms)
- [x] Include industry association memberships
- [x] Add trust badges to homepage (after pricing section)
- [x] Add trust badges to Pricing page
- [x] Add trust badges to Group Homes solutions page (using same design)
- [x] Add trust badges to ICF-ID solutions page (using same design)
- [x] Ensure responsive design for mobile
- [x] Test all pages with trust badges and new logo

## Logo Display Fix
- [x] Update Navigation component to import and use APP_LOGO
- [x] Replace gradient icon with actual logo image
- [x] Test logo display across all pages

## Pre-Launch Early Signup Messaging
- [x] Update homepage hero to clarify pre-launch status
- [x] Change CTAs from "Schedule Demo" to "Join Waitlist" or "Reserve Your Spot"
- [x] Update pricing page to show "Early Access Pricing" and launch timeline
- [x] Add expected launch date/timeline messaging (Q2 2025)
- [x] Update demo page to reflect early signup process (CTAs updated)
- [x] Change solutions pages CTAs to early access language
- [x] Add "Coming Q2 2025" or similar timeline indicators
- [x] Update founding member benefits to include early access perks
- [x] Test all updated messaging across pages

## Waitlist Signup Page
- [x] Create /signup route and page component
- [x] Design form with email, name, facility name fields
- [x] Add facility type dropdown (Group Home, ICF-ID, Assisted Living, etc.)
- [x] Add resident count input field
- [x] Add founding member tier selection
- [x] Implement form validation
- [x] Add success confirmation state
- [x] Update navigation and CTA buttons to link to /signup
- [x] Test form submission and validation
- [x] Add feature questionnaire section with checkboxes for key features/agents
- [x] Add text area for additional needs or custom requests

## Logo Size Fix
- [x] Increase logo size in Navigation component

## Update Launch Date
- [x] Change all Q2 2025 references to Q1 2026

## Backend Upgrade for Email Integration
- [x] Upgrade project to web-db-user feature
- [x] Fix Home.tsx merge conflict
- [x] Create database schema for signups table
- [x] Implement signup API endpoint
- [x] Integrate email service (Resend)
- [x] Create confirmation email template
- [x] Update frontend form to call API endpoint
- [x] Test signup flow with email confirmation

## Fix Nested Anchor Tags Error
- [x] Fix nested <a> tags in Home.tsx (Link wrapping Button)
- [x] Fix nested anchors in Navigation component

## Email Drip Campaign
- [x] Design campaign sequence (welcome, weekly updates, beta access)
- [x] Create email templates for each campaign stage (Week 1-3, Month 1-2)
- [x] Add campaign tracking fields to database
- [x] Implement email scheduling system
- [x] Create campaign management functions
- [x] Test drip campaign flow
- [x] Create campaign documentation
- [x] Create manual run script

## Admin Dashboard
- [x] Create admin analytics API endpoints
- [x] Build admin dashboard page at /admin
- [x] Add signup statistics cards (total, by tier, by facility type)
- [x] Add email campaign statistics (sent, pending, opt-outs)
- [x] Create signups data table with filters and search
- [x] Add charts for signup trends over time
- [x] Add facility type distribution chart
- [x] Add tier distribution chart
- [x] Add interested features analysis
- [x] Implement admin authentication/authorization (checks user.role === 'admin')
- [x] Test admin dashboard functionality

## UTM Parameter Tracking
- [x] Add UTM fields to signups database schema (source, medium, campaign, term, content)
- [x] Create utility function to capture UTM parameters from URL
- [x] Store UTM parameters in localStorage for persistence
- [x] Update signup form to capture and submit UTM data
- [x] Add UTM analytics section to admin dashboard
- [x] Create source/medium/campaign breakdown charts
- [x] Add conversion rate by channel analysis
- [x] Test UTM tracking with sample URLs

## CSV Export Functionality
- [x] Create CSV generation utility function
- [x] Add export API endpoint for signups data
- [x] Add export button to admin dashboard
- [x] Include all signup fields and UTM attribution in export
- [ ] Test CSV download functionality

## Referral Program
- [x] Add referrals table to database schema
- [x] Add referral code field to signups table
- [x] Create referral code generation function
- [x] Build referral tracking API endpoints (validate code, track referral)
- [x] Add referral code input to signup form
- [x] Connect frontend to backend API
- [x] Test referral code validation and tracking
- [x] Add referral analytics API endpoints
- [x] Build referral analytics UI in admin dashboard
- [x] Show top referrers with conversion rates
- [x] Display referral network growth charts
- [x] Test referral analytics section
- [ ] Create referral dashboard page for founding members
- [ ] Display referral stats and rewards

## Vercel Cron Job for Email Campaign
- [ ] Create vercel.json configuration file
- [ ] Set up cron schedule for 9am EST daily
- [ ] Create API endpoint for cron to call
- [ ] Test cron configuration locally
- [ ] Document deployment instructions

## Fix Nested Anchor Tags
- [x] Find and fix nested <a> tags in homepage or navigation

## Founding Member Referral Dashboard & Rewards
- [x] Define reward tiers and milestones
- [x] Add rewards tracking to database schema
- [x] Create referral email templates (welcome, milestone, monthly summary)
- [x] Build /referrals page for founding members
- [x] Display personal referral code and stats
- [x] Show reward progress bars and badges
- [x] Add shareable links with UTM tracking
- [x] Implement automated referral email notifications
- [x] Test complete referral program flow

## Social Sharing Templates
- [x] Design social media content variations (LinkedIn, Twitter, Facebook)
- [x] Create email template variations
- [x] Generate branded social media graphics with tier badges
- [x] Build ShareTemplates component with customization
- [x] Add one-click copy and share functionality
- [x] Integrate templates into referral dashboard
- [x] Test social sharing flow

## Automated Milestone Celebrations
- [x] Define milestone triggers (first referral, tier upgrades, top 10, etc.)
- [x] Create milestone celebration content templates
- [x] Generate achievement badge graphics for each milestone
- [x] Build milestone detection system in backend
- [x] Add milestone notifications to database schema
- [x] Create MilestoneCelebration component with confetti animation
- [x] Build shareable milestone posts with pre-written content
- [x] Integrate milestone celebrations into referral flow
- [x] Test milestone celebration system
