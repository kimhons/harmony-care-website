# PROOF Traceability Matrix

**Author:** Blueprint Forge OS
**Version:** 1.0
**Date:** 2026-02-25

This document provides a complete traceability matrix, linking requirements to tasks, system components, and verification methods. It ensures that every requirement is tested and that the system is built as specified.

| REQ ID | Requirement Description | Acceptance Criteria | Linked Task IDs | Linked Components | Verification Method | Status |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-AUTH-0001 | Users must be able to log in via Manus OAuth. | User can click a 'Login with Manus' button, be redirected to Manus, approve, and be returned to the app, logged in. | TASK-AUTH-0001 | MOD-AUTH, SCR-Login | TEST-AUTH-LOGIN | DONE |
| REQ-AUTH-0002 | The system must store user profile information from the OAuth provider. | User's name, email, and a unique ID (openId) are stored in the `users` table upon first login. | TASK-AUTH-0002 | MOD-AUTH, DM-Users | TEST-AUTH-PROFILE | DONE |
| REQ-AUTH-0003 | Users must be able to log out. | User can click a 'Logout' button, which clears their session cookie and redirects them to the homepage. | TASK-AUTH-0003 | MOD-AUTH, API-AUTH-POST-LOGOUT | TEST-AUTH-LOGOUT | DONE |
| REQ-AUTH-0004 | The system must differentiate between 'user' and 'admin' roles. | The `users` table has a `role` column. Specific routes and UI elements are accessible only to 'admin' roles. | TASK-AUTH-0004 | MOD-AUTH, DM-Users, API-ADMIN-GET-ANALYTICS | TEST-AUTH-ROLES | DONE |
| REQ-SIGNUP-0001 | Prospective users must be able to sign up for an early access waitlist. | A public-facing form at `/signup` collects user details and saves them to the `signups` table. | TASK-SIGNUP-0001 | SCR-Signup, API-SIGNUP-POST-CREATE, DM-Signups | TEST-SIGNUP-CREATE | DONE |
| REQ-SIGNUP-0002 | Signup data must include personal, facility, and tier information. | The `signups` table must contain columns for name, email, facility name, facility type, resident count, and selected tier. | TASK-SIGNUP-0001 | DM-Signups | TEST-SIGNUP-DATA | DONE |
| REQ-SIGNUP-0003 | The system must track marketing attribution for signups using UTM parameters. | The `signups` table must have columns for `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, and `utmContent`. | TASK-SIGNUP-0002 | DM-Signups | TEST-SIGNUP-UTM | DONE |
| REQ-SIGNUP-0004 | Upon successful signup, the user should receive a welcome email. | The `create` signup endpoint must trigger the `sendWelcomeEmail` service. | TASK-SIGNUP-0003 | API-SIGNUP-POST-CREATE, MOD-EMAIL | TEST-SIGNUP-EMAIL | DONE |
| REQ-REFERRAL-0001 | Each user who signs up must receive a unique referral code. | The `signups` table must have a unique `ownReferralCode` for each new entry. | TASK-REFERRAL-0001 | API-SIGNUP-POST-CREATE, DM-Signups | TEST-REFERRAL-CODEGEN | DONE |
| REQ-REFERRAL-0002 | Users must be able to sign up using a referral code from another user. | The signup form must accept an optional `referralCode`. If valid, a record is created in the `referrals` table linking the referrer and the new user. | TASK-REFERRAL-0002 | SCR-Signup, API-SIGNUP-POST-CREATE, DM-Referrals | TEST-REFERRAL-USAGE | DONE |
| REQ-REFERRAL-0003 | The system must notify the referrer when their code is used successfully. | After a successful referral signup, the system triggers `sendReferralSuccessEmail` to the original referrer. | TASK-REFERRAL-0003 | API-SIGNUP-POST-CREATE, MOD-EMAIL | TEST-REFERRAL-NOTIFICATION | DONE |
| REQ-REFERRAL-0004 | The system must track referral milestones and trigger notifications. | The `checkAndCreateMilestones` service is called after a referral, creating records in `milestoneNotifications` and triggering `sendMilestoneEmail`. | TASK-REFERRAL-0004 | MOD-MILESTONE, DM-MilestoneNotifications | TEST-REFERRAL-MILESTONE | DONE |
| REQ-ADMIN-0001 | Admin users must be able to view a dashboard with key analytics. | An admin-only route `/admin` displays analytics data fetched from the `API-ADMIN-GET-ANALYTICS` endpoint. | TASK-ADMIN-0001 | SCR-Admin, API-ADMIN-GET-ANALYTICS | TEST-ADMIN-DASHBOARD | DONE |
| REQ-ADMIN-0002 | The admin dashboard must show total signups, signups by tier, and signups by facility type. | The `analytics` endpoint must calculate and return these aggregates from the `signups` table. | TASK-ADMIN-0001 | API-ADMIN-GET-ANALYTICS | TEST-ADMIN-SIGNUP-STATS | DONE |
| REQ-ADMIN-0003 | The admin dashboard must show referral program analytics. | The `analytics` endpoint must include data from `getReferralAnalytics`, showing conversion rates and top referrers. | TASK-ADMIN-0002 | API-ADMIN-GET-ANALYTICS, MOD-REFERRAL-ANALYTICS | TEST-ADMIN-REFERRAL-STATS | DONE |
| REQ-ADMIN-0004 | Admin users must be able to export signup data to a CSV file. | An `exportCSV` endpoint provides a downloadable CSV of all signups. | TASK-ADMIN-0003 | API-ADMIN-GET-EXPORTCSV, MOD-CSV-EXPORT | TEST-ADMIN-EXPORT | DONE |
| REQ-CALC-0001 | A public ROI savings calculator must be available. | The `SavingsCalculator` component on the homepage allows users to input data and see projected savings. | TASK-CALC-0001 | CMP-SavingsCalculator | TEST-CALC-UI | DONE |
| REQ-CALC-0002 | Calculator submissions must be saved as leads. | Submitting the calculator form sends data to the `calculator` router, which saves it in the `calculatorLeads` table. | TASK-CALC-0002 | API-CALC-POST-SAVE, DM-CalculatorLeads | TEST-CALC-LEAD-SAVE | DONE |
| REQ-CALC-0003 | Calculator leads must be tracked and managed in the admin panel. | The `/admin/calculator-leads` page displays all entries from the `calculatorLeads` table. | TASK-CALC-0003 | SCR-AdminCalculatorLeads, API-ADMINCALCLEADS-GET-ALL | TEST-CALC-LEAD-ADMIN | DONE |
| REQ-LEADMAG-0001 | The system must manage lead magnets (downloadable resources). | The `leadMagnets` table stores information about resources. An admin interface allows for managing them. | TASK-LEADMAG-0001 | DM-LeadMagnets, API-LEADMAGNETS-GET-ALL | TEST-LEADMAG-MANAGE | DONE |
| REQ-LEADMAG-0002 | Users must be able to download lead magnets by providing their email. | Public-facing resource pages list lead magnets. Downloading requires an email and creates a record in `leadMagnetDownloads`. | TASK-LEADMAG-0002 | SCR-Resources, API-LEADMAGNETS-POST-DOWNLOAD, DM-LeadMagnetDownloads | TEST-LEADMAG-DOWNLOAD | DONE |
| REQ-AGENT-0001 | The system must include a 'Connect' agent for family/resident communication. | An agent named 'Connect' exists with tools like `get_resident_activity_log` and `schedule_family_visit`. | TASK-AGENT-0001 | AGENT-Connect | TEST-AGENT-CONNECT-TOOLS | PENDING |
| REQ-AGENT-0002 | The system must include a 'Pulse' agent for staff engagement. | An agent named 'Pulse' exists with tools like `send_pulse_survey` and `create_peer_recognition`. | TASK-AGENT-0002 | AGENT-Pulse | TEST-AGENT-PULSE-TOOLS | PENDING |
| REQ-AGENT-0003 | The system must include an 'Advocate' agent for quality improvement. | An agent named 'Advocate' exists, using CrewAI to orchestrate investigations with tools like `get_incident_details`. | TASK-AGENT-0003 | AGENT-Advocate | TEST-AGENT-ADVOCATE-TOOLS | PENDING |
| REQ-AGENT-0004 | The system must include a 'Catalyst' agent for admissions and CRM. | An agent named 'Catalyst' exists with tools like `create_lead` and `schedule_facility_tour`. | TASK-AGENT-0004 | AGENT-Catalyst | TEST-AGENT-CATALYST-TOOLS | PENDING |
| REQ-AGENT-0005 | The system must include an 'Executive Assistant' agent for leadership support. | An agent named 'Executive Assistant' exists with tools like `generate_operational_report` and `query_platform_data`. | TASK-AGENT-0005 | AGENT-ExecutiveAssistant | TEST-AGENT-EXECUTIVE-TOOLS | PENDING |
| REQ-AGENT-0006 | The system must include a 'Nexus' agent for staff scheduling. | An agent named 'Nexus' exists with tools like `optimize_schedule` and `publish_schedule`. | TASK-AGENT-0006 | AGENT-Nexus | TEST-AGENT-NEXUS-TOOLS | PENDING |
| REQ-AGENT-0007 | The system must include an 'HR Manager' agent for human resources. | An agent named 'HR Manager' exists with tools like `screen_applications` and `initiate_onboarding`. | TASK-AGENT-0007 | AGENT-HRManager | TEST-AGENT-HR-TOOLS | PENDING |
| REQ-AGENT-0008 | The system must include a 'Maintenance Coordinator' agent for facilities. | An agent named 'Maintenance Coordinator' exists with tools like `create_work_order` and `get_pm_schedule`. | TASK-AGENT-0008 | AGENT-MaintenanceCoordinator | TEST-AGENT-MAINTENANCE-TOOLS | PENDING |
| REQ-AGENT-0009 | The system must include a 'Nutrition Specialist' agent for dietary management. | An agent named 'Nutrition Specialist' exists with tools like `get_resident_dietary_profile` and `generate_meal_plan`. | TASK-AGENT-0009 | AGENT-NutritionSpecialist | TEST-AGENT-NUTRITION-TOOLS | PENDING |
| REQ-AGENT-0010 | The system must include a 'Transportation Manager' agent for logistics. | An agent named 'Transportation Manager' exists with tools like `schedule_resident_transport` and `optimize_route`. | TASK-AGENT-0010 | AGENT-TransportationManager | TEST-AGENT-TRANSPORT-TOOLS | PENDING |
| REQ-DATA-0001 | The database schema must support user authentication and profiles. | The `users` table must exist with `id`, `openId`, `name`, `email`, and `role` columns. | TASK-DB-0001 | DM-Users | TEST-DB-USERS-TABLE | DONE |
| REQ-DATA-0002 | The database schema must support the early access signup waitlist. | The `signups` table must exist with all specified fields for personal, facility, marketing, and referral data. | TASK-DB-0002 | DM-Signups | TEST-DB-SIGNUPS-TABLE | DONE |
| REQ-DATA-0003 | The database schema must support the referral program. | The `referrals` table must exist to link referrers and referred users. | TASK-DB-0003 | DM-Referrals | TEST-DB-REFERRALS-TABLE | DONE |
| REQ-DATA-0004 | The database schema must support milestone notifications. | The `milestoneNotifications` table must exist to store achievements. | TASK-DB-0004 | DM-MilestoneNotifications | TEST-DB-MILESTONES-TABLE | DONE |
| REQ-DATA-0005 | The database schema must support ROI calculator leads. | The `calculatorLeads` table must exist to store submissions from the savings calculator. | TASK-DB-0005 | DM-CalculatorLeads | TEST-DB-CALCLEADS-TABLE | DONE |
| REQ-DATA-0006 | The database schema must support lead magnets and their downloads. | The `leadMagnets` and `leadMagnetDownloads` tables must exist. | TASK-DB-0006 | DM-LeadMagnets, DM-LeadMagnetDownloads | TEST-DB-LEADMAGNETS-TABLES | DONE |
| REQ-DATA-0007 | The database schema must support newsletter subscriptions. | The `newsletterSubscribers` table must exist. | TASK-DB-0007 | DM-NewsletterSubscribers | TEST-DB-NEWSLETTER-TABLE | DONE |
| REQ-API-0001 | The API must provide an endpoint for user self-profiling (`/me`). | The `auth` router must have a `me` procedure that returns the current user's data from the context. | TASK-API-0001 | API-AUTH-GET-ME | TEST-API-ME | DONE |
| REQ-API-0002 | The API must provide endpoints for admin analytics. | The `admin` router must have an `analytics` procedure that returns aggregated data. | TASK-API-0002 | API-ADMIN-GET-ANALYTICS | TEST-API-ADMIN-ANALYTICS | DONE |
| REQ-API-0003 | The API must provide endpoints for creating signups. | The `signup` router must have a `create` procedure that validates input and creates a new record. | TASK-API-0003 | API-SIGNUP-POST-CREATE | TEST-API-SIGNUP-CREATE | DONE |
| REQ-API-0004 | The API must provide endpoints for managing the referral program. | The `referral` router must have procedures for validating codes, creating referrals, and getting analytics. | TASK-API-0004 | API-REFERRAL-POST-VALIDATE, API-REFERRAL-POST-CREATE, API-REFERRAL-GET-ANALYTICS | TEST-API-REFERRAL | DONE |
| REQ-API-0005 | The API must handle file uploads. | A `fileUpload` router must exist to handle multipart form data and interface with S3 storage. | TASK-API-0005 | API-FILEUPLOAD | TEST-API-FILEUPLOAD | PENDING |
| REQ-API-0006 | The API must handle webhooks from the Resend email service. | A `resendWebhook` router must exist to process incoming webhook events for email engagement tracking. | TASK-API-0006 | API-RESENDWEBHOOK | TEST-API-WEBHOOK | DONE |
| REQ-UI-0001 | The application must have a homepage. | The `Home.tsx` page component must exist and render the main landing page content. | TASK-UI-0001 | SCR-Home | TEST-UI-HOMEPAGE | DONE |
| REQ-UI-0002 | The application must have a signup page. | The `Signup.tsx` page component must exist and render the early access signup form. | TASK-UI-0002 | SCR-Signup | TEST-UI-SIGNUPPAGE | DONE |
| REQ-UI-0003 | The application must have an admin dashboard. | The `Admin.tsx` page component must exist and render the admin analytics dashboard. | TASK-UI-0003 | SCR-Admin | TEST-UI-ADMINPAGE | DONE |
| REQ-UI-0004 | The application must have a referral program page. | The `Referrals.tsx` page component must exist and display referral program information. | TASK-UI-0004 | SCR-Referrals | TEST-UI-REFERRALPAGE | DONE |
| REQ-UI-0005 | The application must have a pricing page. | The `Pricing.tsx` page component must exist and display the 3-tier pricing structure. | TASK-UI-0005 | SCR-Pricing | TEST-UI-PRICINGPAGE | DONE |
| REQ-UI-0006 | The application must have pages for different solution areas (Group Homes, ICF-ID). | The `GroupHomes.tsx` and `IcfId.tsx` page components must exist. | TASK-UI-0006 | SCR-GroupHomes, SCR-IcfId | TEST-UI-SOLUTIONPAGES | DONE |
| REQ-UI-0007 | The application must have a resources hub and individual resource pages. | The `Resources.tsx` component and templates for resource landing pages must exist. | TASK-UI-0007 | SCR-Resources, CMP-ResourceLandingTemplate | TEST-UI-RESOURCESPAGES | DONE |
| REQ-UI-0008 | The application must include an interactive ROI calculator component. | The `SavingsCalculator.tsx` component must be implemented and functional. | TASK-UI-0008 | CMP-SavingsCalculator | TEST-UI-CALCULATOR | DONE |
| REQ-UI-0009 | The application must include a chart component for data visualization. | The `CostSavingsChart.tsx` component must be implemented for use in the calculator and admin dashboard. | TASK-UI-0009 | CMP-CostSavingsChart | TEST-UI-CHART | DONE |
| REQ-UI-0010 | The application must include an AI chat interface component. | The `AIChatBox.tsx` component must be implemented for future agent interaction. | TASK-UI-0010 | CMP-AIChatBox | TEST-UI-CHATBOX | PENDING |
| GAP-0001 | Agent implementation is pending. | All `REQ-AGENT-*` requirements are defined in specs but not yet implemented in code. | TASK-AGENT-IMPL-ALL | AGENT-* | - | PENDING |
| GAP-0002 | File upload API is not fully implemented. | The `fileUpload` router exists but lacks complete logic for S3 integration and error handling. | TASK-API-0005 | API-FILEUPLOAD | - | PENDING |
| GAP-0003 | AI Chat Box UI is a placeholder. | The `AIChatBox.tsx` component exists but is not connected to any backend agent service. | TASK-UI-0010 | CMP-AIChatBox | - | PENDING |
| GAP-0004 | Incomplete Product and Solutions Pages. | Per `todo.md`, several key pages like the 15 AI agents page, features, and other solutions pages are not yet built. | TASK-UI-BUILD-MISSING-PAGES | SCR-* | - | PENDING |
| GAP-0005 | Testing coverage is incomplete. | While 17 test files exist, they do not cover all API endpoints or critical business logic, especially for the agent-based workflows. | TASK-TEST-INCREASE-COVERAGE | TEST-* | - | PENDING |

---

### ID Reference

*   **REQ:** Requirement
*   **TASK:** Task
*   **MOD:** Server-side Module/Service
*   **SCR:** UI Screen/Page
*   **CMP:** UI Component
*   **API:** API Endpoint/Router
*   **DM:** Data Model/Table
*   **WF:** Workflow
*   **AGENT:** AI Agent
*   **TEST:** Test Case/File
*   **GAP:** Identified Gap
