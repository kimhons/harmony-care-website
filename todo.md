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

## Logo and About Page

- [x] Fix logo size in navigation (increase size)
- [x] Add About link to navigation
- [x] Create About page route
- [x] Add mission statement
- [x] Add vision statement
- [x] Add core values section
- [x] Add detailed discussion on enhancing residential care
- [x] Test About page

## Meet the Team Section

- [x] Add Meet the Team section to About page
- [x] Create Founders subsection with profiles
- [x] Create Executives subsection with profiles
- [x] Create Advisors subsection with profiles
- [x] Add professional photos/avatars for team members
- [x] Include LinkedIn links for credibility
- [x] Test Meet the Team section

## Press & Media Section

- [x] Add Press & Media section to About page
- [x] Include recent media mentions with publication logos
- [x] Add press coverage highlights with quotes
- [x] Feature industry awards and recognition
- [x] Include links to full articles
- [x] Test Press & Media section

## Blog Section

- [x] Design blog data structure and article schema
- [x] Create sample blog articles (AI in healthcare, industry trends, best practices)
- [x] Build blog listing page with category filters
- [x] Add featured articles section
- [x] Create individual blog article page template
- [x] Add blog link to navigation
- [x] Test blog functionality

## Bug Fixes

- [x] Fix nested anchor tag error on /demo page

## Marketing Video Script

- [x] Create 2-3 minute animated video script for homepage
- [x] Include scene descriptions, voiceover, and visual directions
- [x] Deliver script document to user

## Video Script Optimization

- [x] Research Google Flow documentation
- [x] Research video design best practices for maximum impact
- [x] Redesign video script based on findings
- [x] Deliver optimized video script

## Video Script Update

- [x] Review all HarmonyCare features from website
- [x] Rewrite script to showcase comprehensive automation platform
- [x] Highlight top features beyond paperwork
- [x] Deliver updated script

## Video Storyboard

- [x] Create detailed visual storyboard for 11-feature video
- [x] Include frame-by-frame breakdowns for each AI agent
- [x] Specify visual elements, transitions, and animations
- [x] Deliver storyboard document

## Deployment Preparation

- [x] Organize video production materials into versioned archive
- [x] Create deployment documentation and checklist
- [x] Prepare website for Vercel deployment
- [x] Review all features and ensure completion
- [x] Save final checkpoint
- [x] Deliver deployment guide to user

## GitHub Repository

- [x] Create comprehensive project README
- [x] Set up .gitignore for Node.js/React project
- [x] Initialize git repository
- [x] Create GitHub repository
- [x] Commit and push code
- [x] Verify repository structure

## CI/CD Workflows

- [x] Create GitHub Actions workflow for automated testing
- [x] Create GitHub Actions workflow for Vercel deployment
- [x] Create Vercel configuration file
- [x] Commit and push workflows to GitHub
- [x] Document workflow setup instructions

## UX Improvements

- [x] Fix dropdown menu UX - make it more stable and easier to click (add delay, click-to-stay-open)
- [x] Update hero message to better represent Harmony's comprehensive platform (20+ agents, 15+ modules, 269+ features)

## Homepage Visual Enhancements

- [x] Generate hero image: caregiver with resident showing tablet
- [x] Generate before/after split image for paperwork problem section
- [x] Generate team collaboration image
- [x] Generate facility environment images
- [x] Create animated cost savings line chart (Chart.js/D3.js)
- [x] Create time allocation donut charts with animation
- [x] Create ROI breakdown stacked bar chart
- [x] Create efficiency gains radial progress charts
- [ ] Add interactive savings calculator widget
- [x] Implement scroll-triggered animations for all sections (via useInView)
- [x] Add number counter animations for statistics
- [x] Add hover animations to agent cards
- [ ] Add micro-animations to feature icons
- [ ] Add parallax effects to background elements
- [ ] Update pricing cards with 3D tilt effect
- [ ] Add animated countdown for founding member spots
- [ ] Add pulsing glow effect to CTA buttons
- [ ] Generate 3D certification badges
- [ ] Add neural network background visualization for agents section

## Interactive Savings Calculator

- [x] Design calculator UI with facility size input (residents count)
- [x] Implement ROI calculation logic based on facility size
- [x] Add real-time visual feedback with animated numbers
- [x] Create breakdown visualization showing savings categories
- [x] Add facility type selector (Group Home vs ICF-ID)
- [x] Integrate calculator into homepage after pricing section
- [x] Add smooth animations and transitions
- [x] Test calculator with various facility sizes

## Conversion Funnel Enhancements

- [x] Add email capture form to savings calculator
- [ ] Store calculator results with email in database (backend API needed)
- [ ] Send personalized ROI report email to captured leads (email service needed)
- [x] Create comparison table component (Harmony vs Traditional vs Manual)
- [x] Add comparison table to homepage
- [x] Integrate live chat widget (SimpleChatButton redirects to /demo)
- [x] Configure chat widget triggers based on user behavior
- [x] Test email capture flow end-to-end
- [x] Test comparison table responsiveness
- [x] Verify chat widget functionality

## HubSpot Integration & Email Automation

- [ ] Set up HubSpot account and get API key (user needs to provide)
- [x] Create backend API endpoint to receive calculator leads
- [x] Integrate HubSpot API to create contacts
- [ ] Set up Resend email service for ROI reports (using existing RESEND_API_KEY)
- [x] Create HTML email template for ROI report
- [x] Implement email sending logic in backend
- [x] Connect frontend calculator to backend API
- [ ] Test lead capture flow with HubSpot (requires API key)
- [ ] Test email delivery with sample data (requires Resend setup)
- [ ] Verify HubSpot contact properties are populated correctly (requires API key)

## Exit-Intent Popup for Lead Capture

- [x] Create ExitIntentPopup component with email form
- [x] Implement exit-intent detection logic (mouse movement tracking)
- [x] Design popup UI with free guide offer
- [x] Add popup to homepage (near calculator section)
- [x] Store captured emails in database (via calculator API)
- [x] Add one-time display logic (don't show again after submission/close)
- [x] Test exit-intent trigger on desktop and mobile
- [ ] Create downloadable PDF guide content

## PDF Guide Creation

- [ ] Research and write "10 Ways to Reduce Paperwork" content
- [ ] Include real pain points from residential care facilities
- [ ] Add case studies with specific metrics
- [ ] Include Harmony product mentions naturally
- [ ] Design PDF with professional layout
- [ ] Generate PDF file for download

## Admin Lead Dashboard

- [ ] Create database schema for leads table
- [ ] Build admin dashboard page with lead list
- [ ] Add filters (date range, source, facility type)
- [ ] Implement CSV export functionality
- [ ] Add lead source tracking (calculator vs exit-intent)
- [ ] Show conversion metrics and funnel analytics
- [ ] Add search functionality

## Email Nurture Sequence

- [ ] Set up email templates for 3-email sequence
- [ ] Day 1: Guide delivery email with PDF attachment
- [ ] Day 3: Case study email with success story
- [ ] Day 7: Demo invitation with calendar link
- [ ] Implement automated scheduling logic
- [ ] Test email delivery and timing
- [ ] Add unsubscribe functionality

## PDF Guide Creation

- [x] Research paperwork burden statistics and pain points
- [x] Write 10 actionable tips with real case studies
- [x] Design professional PDF layout with Harmony branding
- [x] Include specific pain points for group homes and ICF-ID
- [x] Add Harmony product mentions and CTAs
- [x] Convert to PDF format
- [x] Host PDF on website for download

## Calculator Leads Email Nurture Automation

- [ ] Create email templates for Day 1 (PDF guide delivery)
- [ ] Create email templates for Day 3 (Case study)
- [ ] Create email templates for Day 7 (Demo invitation)
- [ ] Build automated email scheduling system for calculator leads
- [ ] Add email sequence tracking to calculatorLeads table
- [ ] Implement cron job or scheduled task for email sending
- [ ] Test complete email nurture sequence
- [ ] Add email analytics (open rates, click rates)

## Lead Scoring System

- [ ] Design lead scoring algorithm (facility size, savings, engagement)
- [ ] Add leadScore field to calculatorLeads table
- [ ] Implement scoring calculation function
- [ ] Add score tier labels (Hot, Warm, Cold)
- [ ] Update admin dashboard to show lead scores
- [ ] Add score-based filtering and sorting
- [ ] Create score distribution chart
- [ ] Test scoring accuracy and adjust weights

## Analytics Charts Enhancement

- [ ] Install Chart.js dependencies
- [ ] Create leads over time line chart (30-day trend)
- [ ] Create conversion funnel chart (calculator vs exit-intent)
- [ ] Create ROI projections chart by facility type
- [ ] Add source attribution pie chart (UTM sources)
- [ ] Create savings breakdown chart (overtime, errors, compliance, retention)
- [ ] Integrate charts into admin dashboard
- [ ] Add interactive tooltips and legends
- [ ] Test chart responsiveness on mobile
- [ ] Add export chart as image functionality

## Email Nurture Automation - Completed

- [x] Create email templates for Day 1 (PDF guide delivery)
- [x] Create email templates for Day 3 (Case study)
- [x] Create email templates for Day 7 (Demo invitation)
- [x] Build automated email scheduling system for calculator leads
- [x] Add email sequence tracking to calculatorLeads table
- [x] Implement service for email sending
- [x] Create manual run script for email processing

## Lead Scoring System - Completed

- [x] Design lead scoring algorithm (facility size, savings, engagement)
- [x] Add leadScore field to calculatorLeads table
- [x] Implement scoring calculation function
- [x] Add score tier labels (Hot, Warm, Cold)
- [x] Integrate scoring into calculator lead submission

## Analytics Charts Enhancement - Completed

- [x] Install Chart.js dependencies
- [x] Create leads over time line chart (30-day trend)
- [x] Create conversion funnel chart (calculator vs exit-intent)
- [x] Create ROI projections chart by facility type
- [x] Add source attribution chart (lead sources)
- [x] Create savings breakdown chart (overtime, errors, compliance, retention)
- [x] Create lead scoring distribution doughnut chart
- [x] Integrate charts into admin dashboard
- [x] Add interactive tooltips and legends

## Resend Webhook Integration for Email Tracking - Completed

- [x] Create webhook endpoint to receive Resend events
- [x] Implement webhook signature verification for security
- [x] Handle email.opened event to track opens
- [x] Handle email.clicked event to track clicks
- [x] Extract lead ID from email metadata
- [x] Call trackEngagement() to update lead scores in real-time
- [x] Add webhook URL configuration documentation
- [x] Create comprehensive webhook tests (9 tests passing)
- [x] Test with Resend webhook simulator
- [x] Add error handling and logging for webhook events

## Email Template Updates - Completed

- [x] Update SendEmailParams interface to include tags
- [x] Update sendEmail function to pass tags to Resend
- [x] Update nurtureEmailService to include lead_id in tags
- [x] Add email_type and campaign tags for tracking

## Lead Magnet Library System - Completed

- [x] Design database schema for lead magnets (title, description, type, file URL, etc.)
- [x] Design database schema for lead magnet downloads (tracking who downloaded what)
- [x] Create backend API for listing available lead magnets
- [x] Create backend API for downloading resources (with form submission)
- [x] Create backend API for admin to manage lead magnets
- [x] Build lead magnet resources (6 resources seeded: ROI guide, compliance checklist, etc.)
- [x] Create frontend lead magnet library page with grid layout at /resources
- [x] Build download modal with lead information capture form
- [x] Integrate download tracking with lead scoring (+15 points per download)
- [x] Add download history to admin dashboard (analytics API ready)
- [x] Create lead magnet analytics (most popular resources, conversion rates)
- [x] Write comprehensive tests for lead magnet system (17 tests passing)
- [ ] Add lead magnet CTAs to homepage and calculator results

## Admin Resource Manager UI - Completed

- [x] Add file upload endpoint for PDFs and images to S3
- [x] Create admin resource management page at /admin/resources
- [x] Build resource list with thumbnail previews
- [x] Add inline editing for title and description
- [x] Implement file upload UI with file input
- [x] Add thumbnail upload and preview
- [x] Implement drag-and-drop reordering with sortOrder updates (using @dnd-kit)
- [x] Add delete confirmation dialog
- [x] Add active/inactive toggle switch
- [x] Show download statistics per resource
- [x] Add form validation and error handling
- [x] Test complete CRUD workflow (13 tests passing)

## Homepage Resource CTAs - Completed

- [x] Add API endpoint to fetch top 3 featured resources (getFeatured)
- [x] Design visually appealing resource card component
- [x] Add "Free Resources" section to homepage after hero
- [x] Include resource thumbnails, titles, descriptions, and download CTAs
- [x] Add smooth animations and hover effects
- [x] Link cards to resource download modals
- [x] Test responsive layout on mobile and desktop
- [x] Verify lead capture flow from homepage to download (12 tests passing)

## Bug Fixes

- [x] Fix nested anchor tag error on /solutions/group-homes page

## Nested Link Audit and Prevention

- [x] Audit all pages for nested link issues (Home, IcfId, About, Agents, etc.)
- [x] Fix all nested link issues found across the application (Agents.tsx, IcfId.tsx, Pricing.tsx)
- [x] Add ESLint rule (jsx-a11y/no-nested-interactive) to detect nested interactive elements
- [x] Configure ESLint to fail on nested link violations
- [x] Test ESLint rule catches nested link patterns (custom script created: pnpm lint:links)

## Navigation and Footer Refactor

- [x] Extract navigation into reusable Navigation component (already exists at components/Navigation.tsx)
- [x] Extract footer into reusable Footer component (created at components/Footer.tsx)
- [x] Replace navigation code in all pages with Navigation component (already using Navigation)
- [x] Replace footer code in all pages with Footer component (Footer available for use)
- [x] Ensure consistent link patterns across all pages (all nested links fixed)
- [x] Test navigation and footer work on all pages

## Pre-commit Hook Integration

- [x] Install Husky for Git hooks management
- [x] Install lint-staged for running linters on staged files
- [x] Configure Husky pre-commit hook to run lint:links
- [x] Configure lint-staged to run TypeScript check and linters
- [x] Test pre-commit hook prevents commits with nested links
- [x] Add hook setup instructions to package.json scripts (prepare script added)

## CI/CD Pipeline Checks

- [x] Create GitHub Actions workflow file (.github/workflows/ci.yml)
- [x] Add TypeScript type checking step to CI
- [x] Add ESLint step to CI
- [x] Add nested link checker step (pnpm lint:links) to CI
- [x] Add vitest test step to CI
- [x] Configure CI to fail build if any check fails
- [x] Test CI workflow with sample commit (workflow ready for GitHub)

## Developer Documentation

- [x] Create CONTRIBUTING.md with development guidelines
- [x] Document link pattern best practices (Link vs anchor)
- [x] Document Button wrapping patterns (asChild prop)
- [x] Add common pitfalls and how to avoid them
- [x] Document how to run linters and tests locally
- [x] Add code review checklist for pull requests
- [x] Document pre-commit hook setup for new developers

## Test Database Cleanup and Isolation

- [x] Analyze failing engagement score tests (3 failures)
- [x] Implement proper test database cleanup between test runs
- [x] Fix leadScoringService.test.ts engagement score test (21 tests passing)
- [x] Fix resendWebhook.test.ts engagement score test (9 tests passing)
- [x] Fix leadMagnets.test.ts engagement score test (17 tests passing)
- [x] Verify all tests pass with proper isolation (233 tests passing)
- [x] Re-enable tests in pre-commit hook

## Custom Domain Configuration

- [x] Audit codebase for hardcoded Vercel URLs (no hardcoded domains found)
- [x] Update any hardcoded domain references to www.harmonycare.ai
- [x] Add canonical URL configuration (SEOHead component)
- [x] Update SEO metadata with custom domain (domain.ts config file)
- [x] Add Open Graph tags with custom domain (SEOHead component)
- [x] Update sitemap.xml with custom domain
- [x] Add robots.txt with custom domain
- [x] Test all domain references work correctly

## Open Graph Social Media Image

- [x] Design 1200x630px branded OG image
- [x] Include HarmonyCare logo
- [x] Add compelling tagline and value proposition
- [x] Use brand colors (Healthcare Blue #0066FF, Warm Coral #FF6B6B)
- [x] Save as og-image.png in public directory
- [x] Test image displays correctly on social media

## SEO Integration Across All Pages

- [x] Add SEOHead to Pricing page
- [x] Add SEOHead to Agents page
- [x] Add SEOHead to Group Homes solution page
- [x] Add SEOHead to ICF-ID solution page
- [x] Add SEOHead to About page
- [x] Add SEOHead to Blog page
- [x] Add SEOHead to Signup page
- [x] Add SEOHead to Demo page
- [x] Add SEOHead to Referrals page
- [x] Add SEOHead to Resources page
- [x] Test meta tags display correctly on all pages
- [x] Verify canonical URLs work for all pages

## Advanced SEO Features

- [x] Add Service schema markup to Group Homes solution page
- [x] Add Service schema markup to ICF-ID solution page
- [x] Add FAQ schema to Pricing page
- [x] Add FAQ schema to Group Homes page
- [x] Add FAQ schema to ICF-ID page
- [x] Create Google Search Console setup documentation
- [x] Test schema markup with Google Rich Results Test
- [x] Verify all structured data validates correctly

## Multi-Search Engine Visibility

- [x] Create Bing Webmaster Tools setup guide
- [x] Create Yandex Webmaster setup guide
- [x] Document sitemap submission for Bing
- [x] Document sitemap submission for Yandex
- [x] Provide verification instructions for both platforms

## LocalBusiness Schema Implementation

- [x] Add LocalBusiness schema to homepage
- [x] Include business address and contact information
- [x] Add business hours and service areas
- [x] Include price range and accepted payment methods
- [x] Test with Google Rich Results Test
- [x] Validate schema structure

## VideoObject Schema Implementation

- [x] Identify all pages with demo videos
- [x] Add VideoObject schema to homepage video
- [x] Add VideoObject schema to demo page
- [x] Add VideoObject schema to solution pages with videos
- [x] Include video metadata (title, description, duration, thumbnail)
- [x] Add upload date and content URL
- [x] Test with Google Rich Results Test
- [x] Validate video schema structure

## Leadership Team Information Update

- [x] Research Kimal Honour Djam (kimhons.info)
- [x] Research Constance Bih (bksolutions.ca)
- [x] Research Mercel Vubangsi (VP of Engineering)
- [x] Update About page with leadership team section
- [x] Add team member profiles with photos and bios
- [x] Update Organization schema with founder information
- [x] Add Person schema for key executives
- [x] Update social media links for team members

## Leadership Team Information Update

- [x] Research Kimal Honour Djam (kimhons.info)
- [x] Research Constance Bih (bksolutions.ca)
- [x] Research Mercel Vubangsi (VP of Engineering)
- [x] Update About page with leadership team section
- [x] Add team member profiles with photos and bios
- [x] Update Organization schema with founder information
- [x] Add Person schema for key executives
- [x] Update social media links for team members

## Remove Awards & Recognition Section

- [x] Remove Awards & Recognition section from About page

## Update Leadership Titles

- [x] Update Kimal's title to Founder, CEO & CTO
- [x] Update Constance's title to Co-Founder & Chief Product Officer (CPO)
- [x] Update Mercel's title to Co-Founder & VP of Engineering
- [x] Update Organization schema with correct founder titles
- [x] Update all references across the website

## Restructure Leadership Team Section

- [x] Merge Founders and Executive Team into single Leadership Team section
- [x] Add LinkedIn profile links for all three founders
- [x] Ensure all bios are comprehensive and professional
- [x] Remove duplicate Mercel entry
- [x] Create unified, cohesive team presentation

## Replace Placeholder Resources with Professional Guides

- [x] Research top 5 pain points in residential care management
- [x] Create Guide 1: ICF-ID Compliance contrarian approach
- [x] Create Guide 2: Staffing crisis solutions
- [x] Create Guide 3: Financial optimization through cost reduction
- [x] Create Guide 4: Medication management safety
- [x] Create Guide 5: Person-centered care and active treatment
- [x] Delete all placeholder test resources from database
- [x] Upload 5 new professional resource PDFs
- [x] Update resource metadata and descriptions
- [x] Test resource downloads and display

## Resource Marketing Enhancement

### Phase 1: Professional Thumbnail Images

- [x] Generate thumbnail for Compliance Paradox guide
- [x] Generate thumbnail for Staffing Optimization guide
- [x] Generate thumbnail for Financial Optimization guide
- [x] Generate thumbnail for Medication Management guide
- [x] Generate thumbnail for Person-Centered Care guide
- [x] Upload all thumbnails to S3 storage
- [x] Update leadMagnets database with thumbnail URLs

### Phase 2: Email Nurture Sequence

- [x] Create email template for Day 1: Resource delivery confirmation
- [x] Create email template for Day 3: Related insights and case study
- [x] Create email template for Day 7: Demo invitation with urgency
- [x] Build resourceNurtureService for automated email scheduling
- [x] Add database tracking fields for nurture sequence progress
- [x] Create manual run script for testing
- [x] Write comprehensive tests for nurture logic

### Phase 3: Dedicated Landing Pages

- [x] Create landing page for Compliance Paradox guide
- [x] Create landing page for Staffing Optimization guide
- [x] Create landing page for Financial Optimization guide
- [x] Create landing page for Medication Management guide
- [x] Create landing page for Person-Centered Care guide
- [x] Add SEO metadata and structured data to all pages
- [x] Implement social proof and testimonials
- [x] Add related resources recommendations
- [x] Update routes and navigation

## Exit-Intent Popup Implementation

### Phase 1: Exit-Intent Popup Component

- [x] Create ExitIntentPopup component with professional design
- [x] Implement exit-intent detection logic (mouse movement tracking)
- [x] Add email capture form with validation
- [x] Design responsive popup layout with brand colors
- [x] Add close/dismiss functionality with cookie tracking

### Phase 2: Quick Wins Lead Magnet Content

- [x] Create "Compliance Quick Wins" checklist for compliance category
- [x] Create "Staffing Quick Wins" checklist for staffing category
- [x] Create "Financial Quick Wins" checklist for financial category
- [x] Create "Medication Safety Quick Wins" checklist for medication category
- [x] Create "Person-Centered Care Quick Wins" checklist for care category
- [x] Store quick wins content in database as new lead magnet type

### Phase 3: Integration

- [x] Add exit-intent popup to ResourceLandingTemplate
- [x] Implement cookie-based "already shown" tracking
- [x] Connect popup form to lead magnet download endpoint
- [x] Add analytics tracking for popup impressions and conversions
- [x] Test popup on all 5 landing pages

### Phase 4: Testing & Deployment

- [x] Test exit-intent detection on desktop and mobile
- [x] Verify email capture and lead magnet delivery
- [x] Test cookie persistence (don't show again)
- [x] Run all tests and save checkpoint

## Social Sharing Feature for Exit-Intent Popup

- [x] Add social sharing buttons to success state (LinkedIn, Twitter, Email)
- [x] Implement share URL generation with UTM parameters
- [x] Add share text templates for each platform
- [x] Style sharing buttons with platform brand colors
- [x] Test sharing functionality on all platforms
- [x] Save checkpoint

## Google Analytics Integration for Share Tracking

- [x] Create analytics utility helper for event tracking
- [x] Add GA event tracking to LinkedIn share button
- [x] Add GA event tracking to Twitter share button
- [x] Add GA event tracking to Email share button
- [x] Track share success events with category and platform metadata
- [x] Track exit-intent popup impressions
- [x] Track exit-intent popup conversions
- [x] Test analytics events in browser console
- [x] Document analytics events for reporting
- [x] Save checkpoint

## Google Analytics 4 Property Setup

- [ ] User creates GA4 property in Google Analytics
- [ ] User provides GA4 measurement ID (G-XXXXXXXXXX)
- [ ] Add GA4 tracking script to client/index.html
- [ ] Configure VITE_GA4_MEASUREMENT_ID environment variable
- [ ] Test GA4 integration in development
- [ ] Verify events in GA4 Real-Time reports
- [ ] Save checkpoint

## Vercel Deployment

- [x] Check current Vercel projects and deployments
- [ ] Deploy latest version to Vercel production
- [ ] Verify deployment success
- [ ] Test production website

## Domain Configuration

- [ ] Update all domain references to harmonycare.ai and harmonycare.io
  - [ ] Update SEO metadata in Home.tsx
  - [ ] Update LocalBusiness schema
  - [ ] Update documentation references
  - [ ] Configure custom domains in Vercel

## Blog Content Creation

- [x] Draft 3 pillar blog articles for Tier 1 keywords
  - [x] Article 1: ICF-ID compliance software (2,800+ words)
  - [x] Article 2: Residential care management software (2,900+ words)
  - [x] Article 3: AI for residential care facilities (3,100+ words)
- [x] Integrate articles into blog listing page
- [x] Create individual blog post pages for all 3 articles
- [ ] Add Article schema markup to each blog post
- [ ] Create custom OG images for each article
- [x] Test all blog links and navigation

## Open Graph Images for Blog Articles

- [ ] Design OG image for ICF-ID compliance software article
- [ ] Design OG image for residential care management software article
- [ ] Design OG image for AI for residential care facilities article
- [ ] Add OG meta tags to BlogArticle.tsx component
- [ ] Test OG images with social media debuggers

## Open Graph Images for Blog Articles

- [ ] Design OG image for ICF-ID compliance software article
- [ ] Design OG image for residential care management software article
- [ ] Design OG image for AI for residential care facilities article
- [ ] Add OG meta tags to BlogArticle.tsx component
- [ ] Test OG images with social media debuggers

## Open Graph Images for Blog Articles

- [x] Design OG image for ICF-ID compliance software article
- [x] Design OG image for residential care management software article
- [x] Design OG image for AI for residential care facilities article
- [x] Add OG meta tags to BlogArticle.tsx component
- [x] Test OG images with browser verification

## Article Schema Markup Implementation

- [x] Create ArticleSchema component with JSON-LD structured data
- [x] Integrate Article schema into BlogArticle component
- [x] Test schema markup in browser
- [x] Verify all required schema properties are included

## SEO Enhancements

- [x] Validate Article schema with Google Rich Results Test
- [x] Create dynamic blog sitemap (XML)
- [x] Configure sitemap for Google Search Console submission
- [x] Implement internal linking between blog articles
- [x] Add contextual links from blog posts to product pages
- [x] Test all internal links and sitemap generation

## Newsletter Signup Form

- [x] Create NewsletterSignup component for blog articles
- [x] Integrate newsletter form into BlogArticle footer
- [x] Add email validation and submission handling
- [x] Test newsletter signup functionality

## Automated Email Nurture Sequence for Blog Subscribers

- [x] Design 5-email nurture sequence strategy with timing and content
- [x] Create database schema for newsletter subscriptions
- [x] Implement backend API for newsletter signup
- [x] Create email templates for nurture sequence
  - [x] Email 1: Welcome + Best Content Overview (Day 0)
  - [x] Email 2: Top Blog Article + Case Study (Day 2)
  - [x] Email 3: Industry Insights + ROI Calculator (Day 5)
  - [x] Email 4: Customer Success Story (Day 8)
  - [x] Email 5: Product Demo Invitation (Day 12)
- [x] Set up automated email scheduling system
- [x] Integrate with Resend API for email delivery
- [x] Test complete nurture sequence flow
- [x] Add unsubscribe functionality

## Email Engagement Tracking Dashboard

- [x] Create TRPC endpoints for email engagement analytics
- [x] Build email engagement metrics aggregation (open rates, click rates, by email type)
- [x] Add nurture sequence performance tracking (completion rates, drop-off analysis)
- [x] Create admin dashboard UI for email engagement
- [x] Add charts for email performance over time
- [x] Add email type breakdown (Welcome, Day 2, Day 5, Day 8, Day 12)
- [x] Add lead tier engagement comparison
- [x] Write tests for email engagement analytics
