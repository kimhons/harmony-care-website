# Harmony Care AI - Repository Inventory (SSOT)

**ID:** DOC-SSOT-REPO-INVENTORY-001
**PROJECT:** Harmony AI-Native Care Management Platform
**MODE:** CONSOLIDATE
**REPO:** https://github.com/kimhons/harmony-care-website
**PURPOSE:** To provide a single, authoritative, and lossless inventory of all code, documentation, entry points, and architectural surfaces within the Harmony Care repository. This document is the source of truth for what exists and where to find it.

---

## 1. Documentation

This section catalogs all documents, specifications, and knowledge artifacts in the repository.

| Path | Purpose & Key Details | ID |
|---|---|---|
| `/README.md` | Comprehensive project overview, setup, and contribution guide. | DOC-ROOT-README-001 |
| `/CONTRIBUTING.md` | Guidelines for contributing to the project. | DOC-ROOT-CONTRIBUTING-001 |
| `/DEPLOYMENT-GUIDE.md` | Instructions for deploying the application. | DOC-ROOT-DEPLOYMENT-001 |
| `/CI-CD-SETUP.md` | Guide for setting up the CI/CD pipeline. | DOC-ROOT-CICD-001 |
| `/PROGRESS_REPORT.md` | High-level project progress report. | DOC-ROOT-PROGRESS-001 |
| `/todo.md` | Comprehensive task tracking document (45K lines). | DOC-ROOT-TODO-001 |
| `/engagement_agent_specifications.md` | Detailed specifications for engagement AI agents. | DOC-SPEC-AGENT-ENGAGEMENT-001 |
| `/operational_agent_specifications.md` | Detailed specifications for operational AI agents. | DOC-SPEC-AGENT-OPERATIONAL-001 |
| `/tool_and_concierge_specs.md` | Specifications for AI agent tools and the concierge agent. | DOC-SPEC-AGENT-TOOLS-001 |
| `/refined_hybrid_architecture.md` | In-depth description of the hybrid microservices and agentic architecture. | DOC-ARCH-HYBRID-001 |
| `/harmonycare_analysis.md` | Analysis of the Harmony Care platform. | DOC-ANALYSIS-HARMONYCARE-001 |
| `/senior_living_operations_research.md` | Research on senior living operations. | DOC-RESEARCH-SENIORLIVING-001 |
| `/repository_organization_design.md` | Design document for the repository's organization. | DOC-DESIGN-REPO-ORG-001 |
| `/repository_reorganization_guide.md` | Guide for reorganizing the repository. | DOC-GUIDE-REPO-REORG-001 |
| `/file_mapping_and_recommendations.md` | Mapping of files and recommendations for the repository structure. | DOC-MAP-FILES-001 |
| `/docs/1_product/1.1_vision_and_strategy.md` | Product vision and strategy document. | DOC-PROD-VISION-001 |
| `/docs/3_engineering/3.1_deployment_guide.md` | Detailed deployment guide. | DOC-ENG-DEPLOY-001 |
| `/docs/3_engineering/3.2_ci_cd_setup.md` | Detailed CI/CD setup guide. | DOC-ENG-CICD-001 |
| `/docs/3_engineering/3.3_contributing.md` | Detailed contribution guidelines. | DOC-ENG-CONTRIBUTING-001 |
| `/docs/3_engineering/3.4_resend_webhook_setup.md` | Setup guide for the Resend webhook. | DOC-ENG-RESEND-WEBHOOK-001 |
| `/docs/4_project_management/4.1_todo.md` | Project to-do list. | DOC-PM-TODO-001 |
| `/docs/4_project_management/4.2_admin_quickstart.md` | Quickstart guide for the admin dashboard. | DOC-PM-ADMIN-QUICKSTART-001 |
| `/docs/4_project_management/4.3_analytics_events.md` | Documentation for analytics events. | DOC-PM-ANALYTICS-EVENTS-001 |
| `/docs/4_project_management/4.4_progress_report.md` | Project progress report. | DOC-PM-PROGRESS-REPORT-001 |
| `/docs/4_project_management/4.5_progress_report_v2.md` | Version 2 of the project progress report. | DOC-PM-PROGRESS-REPORT-V2-001 |
| `/docs/5_research/facility-health-assessment.md` | Research on facility health assessment. | DOC-RESEARCH-FACILITY-HEALTH-001 |
| `/docs/5_research/magazine-proposal.md` | Proposal for a magazine. | DOC-RESEARCH-MAGAZINE-PROPOSAL-001 |
| `/docs/5_research/magazine-proposal-v2.md` | Version 2 of the magazine proposal. | DOC-RESEARCH-MAGAZINE-PROPOSAL-V2-001 |
| `/docs/5_research/magazine-toc-detailed.md` | Detailed table of contents for the magazine. | DOC-RESEARCH-MAGAZINE-TOC-001 |
| `/docs/5_research/pain-points-research.md` | Research on customer pain points. | DOC-RESEARCH-PAIN-POINTS-001 |
| `/docs/5_research/solution-mapping.md` | Mapping of solutions to customer pain points. | DOC-RESEARCH-SOLUTION-MAPPING-001 |
| `/docs/5_research/top-100-pain-points.md` | Top 100 customer pain points. | DOC-RESEARCH-TOP-100-PAIN-POINTS-001 |
| `/docs/6_marketing/` | Various marketing documents (SEO, search console, newsletter, blog reviews, social media). | DOC-MKTG-001 |
| `/docs/7_knowledge_base/USA/` | Knowledge base with state-specific overviews (CA, TX, FL, NY, PA, OH, IL, GA, KY). | DOC-KB-USA-001 |

## 2. Client Code (UI)

This section details the React-based web interface.

### 2.1. UI Pages (Screens)

| Path | Component Name | Purpose & Key Features | ID |
|---|---|---|---|
| `src/pages/Home.tsx` | Home | Landing page with hero, agents showcase, features, outcomes. | SCR-HOME |
| `src/pages/Signup.tsx` | Signup | Early access signup form. | SCR-SIGNUP |
| `src/pages/Admin.tsx` | Admin | Admin dashboard with analytics. | SCR-ADMIN |
| `src/pages/AdminCalculatorLeads.tsx` | AdminCalculatorLeads | Calculator lead management. | SCR-ADMIN-CALC-LEADS |
| `src/pages/AdminResources.tsx` | AdminResources | Resource management. | SCR-ADMIN-RESOURCES |
| `src/pages/EmailEngagement.tsx` | EmailEngagement | Email engagement analytics. | SCR-EMAIL-ENGAGEMENT |
| `src/pages/Referrals.tsx` | Referrals | Referral program page. | SCR-REFERRALS |
| `src/pages/Pricing.tsx` | Pricing | 3-tier pricing page. | SCR-PRICING |
| `src/pages/About.tsx` | About | About page. | SCR-ABOUT |
| `src/pages/Blog.tsx` | Blog | Blog listing. | SCR-BLOG |
| `src/pages/BlogArticle.tsx` | BlogArticle | Individual blog article. | SCR-BLOG-ARTICLE |
| `src/pages/Agents.tsx` | Agents | AI agents showcase. | SCR-AGENTS |
| `src/pages/Demo.tsx` | Demo | Demo request page. | SCR-DEMO |
| `src/pages/GroupHomes.tsx` | GroupHomes | Solutions for group homes. | SCR-GROUP-HOMES |
| `src/pages/IcfId.tsx` | IcfId | Solutions for ICF-ID facilities. | SCR-ICF-ID |
| `src/pages/Resources.tsx` | Resources | Resources hub. | SCR-RESOURCES |
| `src/pages/resources/Compliance.tsx` | Compliance | Resource landing page for compliance. | SCR-RESOURCE-COMPLIANCE |
| `src/pages/resources/Staffing.tsx` | Staffing | Resource landing page for staffing. | SCR-RESOURCE-STAFFING |
| `src/pages/resources/Financial.tsx` | Financial | Resource landing page for financial. | SCR-RESOURCE-FINANCIAL |
| `src/pages/resources/Medication.tsx` | Medication | Resource landing page for medication. | SCR-RESOURCE-MEDICATION |
| `src/pages/resources/PersonCentered.tsx` | PersonCentered | Resource landing page for person-centered care. | SCR-RESOURCE-PERSONCENTERED |
| `src/pages/NotFound.tsx` | NotFound | 404 page. | SCR-NOT-FOUND |

### 2.2. UI Components

| Path | Component Name | Purpose | ID |
|---|---|---|---|
| `src/components/Navigation.tsx` | Navigation | Main navigation bar. | CMP-NAVIGATION |
| `src/components/Footer.tsx` | Footer | Site footer. | CMP-FOOTER |
| `src/components/AIChatBox.tsx` | AIChatBox | AI chat interface. | CMP-AI-CHAT-BOX |
| `src/components/SavingsCalculator.tsx` | SavingsCalculator | Interactive ROI calculator. | CMP-SAVINGS-CALCULATOR |
| `src/components/CostSavingsChart.tsx` | CostSavingsChart | Chart component for cost savings. | CMP-COST-SAVINGS-CHART |
| `src/components/AnimatedCounter.tsx` | AnimatedCounter | Animated number counter. | CMP-ANIMATED-COUNTER |
| `src/components/ComparisonTable.tsx` | ComparisonTable | Feature comparison table. | CMP-COMPARISON-TABLE |
| `src/components/DashboardLayout.tsx` | DashboardLayout | Layout for the admin dashboard. | CMP-DASHBOARD-LAYOUT |
| `src/components/ExitIntentPopup.tsx` | ExitIntentPopup | Exit intent popup. | CMP-EXIT-INTENT-POPUP |
| `src/components/FeaturedResources.tsx` | FeaturedResources | Cards for featured resources. | CMP-FEATURED-RESOURCES |
| `src/components/LiveChat.tsx` | LiveChat | Live chat widget. | CMP-LIVE-CHAT |
| `src/components/MilestoneCelebration.tsx` | MilestoneCelebration | Milestone celebration notifications. | CMP-MILESTONE-CELEBRATION |
| `src/components/NewsletterSignup.tsx` | NewsletterSignup | Newsletter signup form. | CMP-NEWSLETTER-SIGNUP |
| `src/components/ResourceLandingTemplate.tsx` | ResourceLandingTemplate | Template for resource landing pages. | CMP-RESOURCE-LANDING-TEMPLATE |
| `src/components/SEOHead.tsx` | SEOHead | SEO meta tags. | CMP-SEO-HEAD |
| `src/components/ShareTemplates.tsx` | ShareTemplates | Social sharing templates. | CMP-SHARE-TEMPLATES |
| `src/components/VideoModal.tsx` | VideoModal | Modal for playing videos. | CMP-VIDEO-MODAL |
| `src/components/ui/` | shadcn/ui | Collection of UI components from shadcn/ui. | CMP-SHADCN-UI |

## 3. Server Code (API & Services)

This section covers the backend logic, including API endpoints and business services.

### 3.1. API Entry Points (tRPC Routers)

| Path | Router Name | Purpose & Key Endpoints | ID |
|---|---|---|---|
| `server/routers.ts` | system | System-level endpoints. | API-SYSTEM-V1 |
| `server/routers.ts` | auth | Authentication endpoints (`me`, `logout`). | API-AUTH-V1 |
| `server/routers.ts` | admin | Admin-only endpoints (`analytics`, `signups`, `exportCSV`). | API-ADMIN-V1 |
| `server/routers.ts` | signup | Signup endpoint (`create`). | API-SIGNUP-V1 |
| `server/routers.ts` | referral | Referral program endpoints (`validate`, `create`, `analytics`, `milestones`). | API-REFERRAL-V1 |
| `server/routers.ts` | calculator | ROI calculator endpoints. | API-CALCULATOR-V1 |
| `server/routers.ts` | adminCalculatorLeads | Admin endpoints for calculator leads. | API-ADMIN-CALC-LEADS-V1 |
| `server/routers.ts` | resendWebhook | Webhook for Resend email service. | API-RESEND-WEBHOOK-V1 |
| `server/routers.ts` | leadMagnets | Endpoints for lead magnets. | API-LEAD-MAGNETS-V1 |
| `server/routers.ts` | fileUpload | File upload endpoints. | API-FILE-UPLOAD-V1 |
| `server/routers.ts` | newsletter | Newsletter subscription endpoints. | API-NEWSLETTER-V1 |
| `server/routers.ts` | emailEngagement | Email engagement tracking endpoints. | API-EMAIL-ENGAGEMENT-V1 |

### 3.2. Server-Side Services

| Path | Service Name | Purpose | ID |
|---|---|---|---|
| `server/email.ts` | email | Service for sending welcome emails. | SVC-EMAIL-001 |
| `server/emailCampaign.ts` | emailCampaign | Service for managing email campaigns. | SVC-EMAIL-CAMPAIGN-001 |
| `server/emailEngagement.ts` | emailEngagement | Service for tracking email engagement. | SVC-EMAIL-ENGAGEMENT-001 |
| `server/emailTemplates.ts` | emailTemplates | Service for managing email templates. | SVC-EMAIL-TEMPLATES-001 |
| `server/leadScoringService.ts` | leadScoringService | Service for scoring leads. | SVC-LEAD-SCORING-001 |
| `server/milestoneService.ts` | milestoneService | Service for tracking milestones. | SVC-MILESTONE-001 |
| `server/newsletter.ts` | newsletter | Service for managing the newsletter. | SVC-NEWSLETTER-001 |
| `server/nurtureEmailService.ts` | nurtureEmailService | Service for sending nurture email sequences. | SVC-NURTURE-EMAIL-001 |
| `server/referral.ts` | referral | Service for referral program logic. | SVC-REFERRAL-001 |
| `server/referralAnalytics.ts` | referralAnalytics | Service for referral analytics. | SVC-REFERRAL-ANALYTICS-001 |
| `server/resendWebhook.ts` | resendWebhook | Service for handling Resend webhooks. | SVC-RESEND-WEBHOOK-001 |
| `server/fileUpload.ts` | fileUpload | Service for handling file uploads. | SVC-FILE-UPLOAD-001 |
| `server/storage.ts` | storage | Helper functions for S3 storage. | SVC-STORAGE-001 |
| `server/csvExport.ts` | csvExport | Utility for exporting data to CSV. | SVC-CSV-EXPORT-001 |

## 4. Database

This section outlines the database schema.

| Table Name | Path | Purpose & Key Columns | ID |
|---|---|---|---|
| `users` | `drizzle/schema.ts` | Core user table for authentication and user data. (`id`, `openId`, `email`, `role`) | DM-USERS |
| `signups` | `drizzle/schema.ts` | Waitlist signups for early access. (`id`, `email`, `facilityName`, `tier`) | DM-SIGNUPS |
| `referrals` | `drizzle/schema.ts` | Tracks referral relationships and rewards. (`id`, `referrerSignupId`, `referredSignupId`) | DM-REFERRALS |
| `milestoneNotifications` | `drizzle/schema.ts` | Tracks achievement celebrations. (`id`, `signupId`, `milestoneType`) | DM-MILESTONE-NOTIFICATIONS |
| `calculatorLeads` | `drizzle/schema.ts` | Submissions from the ROI calculator. (`id`, `email`, `annualSavings`) | DM-CALCULATOR-LEADS |
| `leadMagnets` | `drizzle/schema.ts` | Downloadable resources for lead generation. (`id`, `title`, `fileUrl`) | DM-LEAD-MAGNETS |
| `leadMagnetDownloads` | `drizzle/schema.ts` | Tracks who downloaded which lead magnet. (`id`, `leadMagnetId`, `email`) | DM-LEAD-MAGNET-DOWNLOADS |
| `newsletterSubscribers` | `drizzle/schema.ts` | Tracks blog newsletter signups. (`id`, `email`, `status`) | DM-NEWSLETTER-SUBSCRIBERS |

## 5. Scripts

This section lists one-off or recurring scripts.

| Path | Purpose | ID |
|---|---|---|
| `scripts/add-new-resources.ts` | Adds new resources to the application. | SCRIPT-ADD-RESOURCES-001 |
| `scripts/check-nested-links.mjs` | Checks for broken nested links. | SCRIPT-CHECK-LINKS-001 |
| `scripts/create-quick-wins-checklists.mts` | Creates quick-win checklists. | SCRIPT-CREATE-CHECKLISTS-001 |
| `scripts/run-nurture-emails.mjs` | Runs the nurture email sequences. | SCRIPT-RUN-NURTURE-EMAILS-001 |
| `scripts/run-resource-nurture.mjs` | Runs the resource nurture email sequences. | SCRIPT-RUN-RESOURCE-NURTURE-001 |
| `scripts/seed-lead-magnets.mjs` | Seeds the database with initial lead magnets. | SCRIPT-SEED-LEAD-MAGNETS-001 |
| `scripts/upload-thumbnails.mjs` | Uploads thumbnails for resources. | SCRIPT-UPLOAD-THUMBNAILS-001 |

## 6. Tests

This section inventories all test files.

| Path | Purpose | ID |
|---|---|---|
| `server/adminCalculatorLeads.test.ts` | Tests for admin calculator leads functionality. | TEST-ADMIN-CALC-LEADS-001 |
| `server/auth.logout.test.ts` | Tests for user logout functionality. | TEST-AUTH-LOGOUT-001 |
| `server/emailEngagementAnalytics.test.ts` | Tests for email engagement analytics. | TEST-EMAIL-ENGAGEMENT-ANALYTICS-001 |
| `server/fileUpload.test.ts` | Tests for file upload functionality. | TEST-FILE-UPLOAD-001 |
| `server/leadMagnets.featured.test.ts` | Tests for featured lead magnets. | TEST-LEAD-MAGNETS-FEATURED-001 |
| `server/leadMagnets.test.ts` | Tests for lead magnets functionality. | TEST-LEAD-MAGNETS-001 |
| `server/leadScoringService.test.ts` | Tests for the lead scoring service. | TEST-LEAD-SCORING-001 |
| `server/milestoneSystem.test.ts` | Tests for the milestone system. | TEST-MILESTONE-SYSTEM-001 |
| `server/newsletter.test.ts` | Tests for newsletter functionality. | TEST-NEWSLETTER-001 |
| `server/referral.test.ts` | Tests for referral functionality. | TEST-REFERRAL-001 |
| `server/referralAnalytics.test.ts` | Tests for referral analytics. | TEST-REFERRAL-ANALYTICS-001 |
| `server/referralProgram.test.ts` | Tests for the referral program. | TEST-REFERRAL-PROGRAM-001 |
| `server/resend.test.ts` | Tests for Resend integration. | TEST-RESEND-001 |
| `server/resendWebhook.test.ts` | Tests for the Resend webhook. | TEST-RESEND-WEBHOOK-001 |
| `server/schema-validation.test.ts` | Tests for database schema validation. | TEST-SCHEMA-VALIDATION-001 |
| `server/shareTemplates.test.ts` | Tests for share templates. | TEST-SHARE-TEMPLATES-001 |
| `tests/resend.test.ts` | Additional tests for Resend integration. | TEST-RESEND-002 |

## 7. Config Files

This section lists key configuration files.

| Path | Purpose | ID |
|---|---|---|
| `package.json` | Project dependencies and scripts. | CONFIG-PACKAGE-JSON-001 |
| `tsconfig.json` | TypeScript configuration. | CONFIG-TSCONFIG-JSON-001 |
| `tailwind.config.js` | Tailwind CSS configuration. | CONFIG-TAILWIND-001 |
| `vercel.json` | Vercel deployment configuration. | CONFIG-VERCEL-001 |
| `drizzle.config.ts` | Drizzle ORM configuration. | CONFIG-DRIZZLE-001 |

## 8. Detected Surfaces

This section summarizes the primary architectural surfaces of the application.

| Surface | Technology Stack | Key Components / Evidence | ID |
|---|---|---|---|
| UI (Web) | React 19, Tailwind CSS 4, shadcn/ui, Wouter | 18 pages, 25+ components | SURFACE-UI-WEB-001 |
| API | tRPC 11, Express 4 | 12+ routers | SURFACE-API-TRPC-001 |
| Data | MySQL/TiDB, Drizzle ORM | 8 tables, 11 migrations | SURFACE-DATA-MYSQL-001 |
| Agents/Automation | LangChain, LangGraph, CrewAI | 20 planned AI agents | SURFACE-AGENTS-AI-001 |
| Integrations | Resend, AWS S3, Manus OAuth, Google Maps | `email.ts`, `storage.ts`, `auth` router | SURFACE-INTEGRATIONS-001 |
| Infra/Ops | Vercel | `vercel.json` | SURFACE-INFRA-VERCEL-001 |

## 9. Gaps & Conflicts

| ID | Type | Description | Affected Areas | Priority |
|---|---|---|---|---|
| GAP-0001 | Documentation | The `todo.md` file is extremely large (45K lines) and should be migrated to a proper project management tool. | Project Management | High |
| GAP-0002 | Code | Several pages and features are marked as `NOT done` in the `todo.md` status, including key product pages. | Client Code (UI) | High |
| GAP-0003 | Documentation | Many root-level documents need to be organized into the `docs/ssot/` directory as intended. | Documentation | Medium |
| CONFLICT-0001 | Documentation | There are multiple progress reports (`PROGRESS_REPORT.md`, `docs/4_project_management/4.4_progress_report.md`, `docs/4_project_management/4.5_progress_report_v2.md`). These should be consolidated. | Documentation | Medium |

---
**END OF DOCUMENT**
