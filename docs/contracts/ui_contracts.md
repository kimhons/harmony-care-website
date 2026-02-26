# UI Contracts — Harmony AI-Native Care Management Platform

**Document:** `ui_contracts.md`
**Output Path:** `docs/contracts/ui_contracts.md`
**Version:** 2.0
**Last Updated:** 2026-02-26
**Total Screens:** 503
**Total Domains:** 30

This document defines every UI screen in the Harmony platform. Each screen entry specifies its component file name, route, functional description, role-based access, data model dependencies, agent integration points, and key UI elements. The document serves as the single source of truth for frontend development, QA test planning, and accessibility auditing.

---

## 1. Design System and Branding

Harmony uses a medical-grade design language rooted in clinical information systems rather than consumer SaaS aesthetics. The visual identity communicates trust, competence, and calm under pressure.

### 1.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#1B4965` | Navigation chrome, primary actions, section headers |
| `--primary-light` | `#5FA8D3` | Hover states, secondary buttons, active indicators |
| `--accent` | `#62B6CB` | Data visualization primary, links, interactive highlights |
| `--success` | `#2D6A4F` | Positive status, completed tasks, normal vitals |
| `--warning` | `#E9C46A` | Attention-needed states, approaching thresholds |
| `--danger` | `#C1121F` | Critical alerts, overdue items, abnormal vitals |
| `--surface` | `#F8F9FA` | Page backgrounds, card surfaces |
| `--surface-alt` | `#E9ECEF` | Table stripes, section dividers |
| `--text-primary` | `#212529` | Body text, table data |
| `--text-secondary` | `#6C757D` | Labels, metadata, timestamps |
| `--border` | `#DEE2E6` | Card borders, dividers, input outlines |

### 1.2 Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Page titles | Inter | 700 | 24px |
| Section headers | Inter | 600 | 18px |
| Body text | Inter | 400 | 14px |
| Table data | Inter | 400 | 13px |
| Labels and metadata | Inter | 500 | 12px |
| Badges and tags | Inter | 600 | 11px |
| Mobile body | Inter | 400 | 16px |

### 1.3 Component Standards

All screens use the shared component library built on shadcn/ui with Harmony-specific extensions.

**Status Badges** use a consistent color-to-meaning mapping across all domains: green for active/complete/normal, amber for pending/warning/approaching, red for critical/overdue/abnormal, gray for inactive/archived/not-applicable, and blue for informational/in-progress.

**Data Tables** use server-side pagination (25 rows default), column sorting, column visibility toggles, and row-level actions via a kebab menu. All tables support CSV/PDF export through a unified export component.

**Forms** use inline validation with field-level error messages, auto-save drafts for long forms, and a consistent button placement pattern: primary action right-aligned, cancel/back left-aligned.

**Navigation** uses a persistent left sidebar (240px collapsed to 64px) with icon+label items grouped by domain. The sidebar collapses to icons-only on tablet and converts to a bottom tab bar on mobile.

**Charts** use Chart.js with the Harmony color palette. All charts include a data source citation, date range context, and accessible alt text.

### 1.4 Role Definitions

| Role ID | Label | Description |
|---|---|---|
| `R-OWNER` | Facility Owner | Full system access, multi-facility management, financial oversight |
| `R-ADMIN` | Administrator | Facility-level administration, user management, configuration |
| `R-CARE-MGR` | Care Manager / RN | Clinical oversight, care plan management, medication administration |
| `R-DIRECT-CARE` | Direct Support Professional | Resident care delivery, documentation, task execution |
| `R-FAMILY` | Family Member | Read-only resident updates, messaging, activity viewing |
| `R-AUDITOR` | Compliance Auditor | Read-only access to compliance, quality, and regulatory data |
| `R-PHYSICIAN` | Physician / Provider | Order entry, lab review, visit documentation |
| `R-ANON` | Anonymous / Public | Marketing pages, login, password reset only |

### 1.5 Agent Integration Reference

| Agent | Primary Domain | Integration Pattern |
|---|---|---|
| DocuBot | Documentation | Voice-to-text transcription, note formatting, SOAP generation |
| Sentinel | Health Monitoring | Predictive alerts, vital trend analysis, fall risk scoring |
| Guardian | Compliance | Regulatory monitoring, audit readiness, policy compliance |
| Compass | Care Planning | Personalized care recommendations, goal suggestions |
| Nexus | Scheduling | Shift optimization, conflict resolution, coverage analysis |
| Executive Assistant | Enterprise | Strategic insights, board reporting, KPI analysis |
| HR Manager | Staff Management | Recruitment, credential tracking, performance analysis |
| Maintenance Coordinator | Facility | Work order prioritization, preventive maintenance scheduling |
| Nutrition Specialist | Dining | Menu optimization, dietary compliance, nutritional analysis |
| Transportation Manager | Transport | Route optimization, appointment coordination |
| Pharma | Medication | Drug interaction checking, medication reconciliation |
| Billing Analyst | Finance | Revenue cycle optimization, claim analysis |
| Analytics Engine | Reporting | Cross-domain data aggregation, trend identification |
| Quality Assurance | QA/QI | Quality metric tracking, improvement identification |
| Advocate | Resident Rights | Rights compliance, restraint reduction |
| Connect | Communication | Message routing, family engagement |
| Concierge | Activities | Activity recommendations, participation tracking |
| Training Coach | Staff Development | Training recommendations, competency tracking |
| Catalyst | Admissions | Referral management, bed availability |
| Emergency Coordinator | Safety | Emergency response, evacuation coordination |

---

## 2. Domain Summary

| # | Domain | Screens | Primary Agent(s) |
|---|---|---|---|
| D01 | Authentication and Onboarding | 14 | None |
| D02 | Global Dashboard and Command Center | 18 | All agents |
| D03 | Resident Management | 40 | Compass, Sentinel |
| D04 | Care Plans and ISPs | 28 | Compass |
| D05 | Clinical Documentation | 24 | DocuBot |
| D06 | Medication Administration | 22 | Pharma |
| D07 | Health Monitoring and Vitals | 20 | Sentinel |
| D08 | Incident and Behavior Management | 22 | Sentinel, Compass |
| D09 | Compliance and Regulatory | 26 | Guardian |
| D10 | Scheduling and Staffing | 19 | Nexus |
| D11 | Staff and HR Management | 23 | HR Manager |
| D12 | Communication and Family Engagement | 19 | Connect |
| D13 | Activities and Community | 10 | Concierge |
| D14 | Nutrition and Dining | 18 | Nutrition Specialist |
| D16 | Facility and Maintenance | 26 | Maintenance Coordinator |
| D18 | Appointments and Referrals | 21 | Catalyst |
| D20 | Quality Assurance and Improvement | 34 | Quality Assurance |
| D23 | Notifications and Settings | 29 | All agents |
| D25 | Infection Control | 11 | Sentinel |
| D26 | Mobile and Point-of-Care | 32 | DocuBot, Sentinel |
| D27 | Physician Portal | 8 | DocuBot, Pharma |
| D28 | Inventory and Supply Chain | 8 | Maintenance Coordinator |
| D29 | Agentic Workflows and Automation | 25 | All agents |
| D30 | Shared Components and Patterns | 16 | None |
| D31 | Behavioral Health and Mental Wellness | 10 | Compass |
| D32 | Therapy Services | 6 | Nexus, DocuBot |
| D33 | Multi-Facility Management | 6 | Executive Assistant |
| D34 | Emergency Management and Safety | 11 | Emergency Coordinator |
| | **TOTAL** | **503** | |

---

## 3. Screen Definitions by Domain

The following sections define every screen in the platform. Each screen is identified by a unique `SCR-` prefixed ID, organized by functional domain.

# D01 — Authentication & Onboarding

### SCR-D01-LOGIN
- **Name:** Login.tsx
- **Route:** /login
- **Description:** Primary login screen with facility-branded header, email/password fields, OAuth provider buttons (Manus, Google Workspace, Microsoft Entra), and "Remember this device" toggle. Displays facility logo and HIPAA notice.
- **Role Access:** R-ANON
- **Key Data:** DM-USER
- **Agent Integration:** None
- **Key UI Elements:** Email input field, password input with visibility toggle, OAuth provider buttons row, facility logo header, HIPAA compliance notice footer

### SCR-D01-MFA-SETUP
- **Name:** MfaSetup.tsx
- **Route:** /auth/mfa-setup
- **Description:** Multi-factor authentication enrollment screen. Supports TOTP authenticator app, SMS verification, and hardware security key registration. Required for all staff roles accessing PHI.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-AUDITOR
- **Key Data:** DM-USER, DM-MFA-DEVICE
- **Agent Integration:** None
- **Key UI Elements:** QR code display for authenticator app, phone number input for SMS, security key registration button, backup codes generator, verification code input

### SCR-D01-MFA-VERIFY
- **Name:** MfaVerify.tsx
- **Route:** /auth/mfa-verify
- **Description:** MFA challenge screen presented after password authentication. Accepts TOTP code, SMS code, or security key tap. Includes "Trust this device for 30 days" option.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY, R-AUDITOR
- **Key Data:** DM-USER, DM-MFA-DEVICE
- **Agent Integration:** None
- **Key UI Elements:** 6-digit code input with auto-advance, method selector tabs, trust device checkbox, resend code link, backup code fallback link

### SCR-D01-PASSWORD-RESET
- **Name:** PasswordReset.tsx
- **Route:** /auth/password-reset
- **Description:** Password reset request screen. User enters email, receives reset link. Includes rate limiting notice and support contact for locked accounts.
- **Role Access:** R-ANON
- **Key Data:** DM-USER
- **Agent Integration:** None
- **Key UI Elements:** Email input field, submit button, success confirmation message, support contact link, back to login link

### SCR-D01-PASSWORD-RESET-CONFIRM
- **Name:** PasswordResetConfirm.tsx
- **Route:** /auth/password-reset/:token
- **Description:** Password reset confirmation screen. User sets new password with strength meter. Enforces minimum 12 characters, mixed case, number, and special character per HIPAA requirements.
- **Role Access:** R-ANON
- **Key Data:** DM-USER
- **Agent Integration:** None
- **Key UI Elements:** New password input, confirm password input, password strength meter, HIPAA password requirements checklist, submit button

### SCR-D01-ONBOARD-WELCOME
- **Name:** OnboardWelcome.tsx
- **Route:** /onboard/welcome
- **Description:** First screen of the onboarding wizard for newly created accounts. Displays welcome message, brief platform overview, and estimated setup time. Collects user's preferred name and timezone.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER
- **Agent Integration:** Concierge (welcome guidance)
- **Key UI Elements:** Welcome hero with facility branding, preferred name input, timezone selector dropdown, progress stepper (step 1 of 5), continue button

### SCR-D01-ONBOARD-ROLE
- **Name:** OnboardRole.tsx
- **Route:** /onboard/role
- **Description:** Role confirmation and facility association step. Displays the user's assigned role with description of permissions. For multi-facility owners, presents facility selector.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER, DM-FACILITY, DM-USER-FACILITY
- **Agent Integration:** None
- **Key UI Elements:** Role badge with permission summary, facility association card, multi-facility selector (Owner only), progress stepper (step 2 of 5), back/continue buttons

### SCR-D01-ONBOARD-PROFILE
- **Name:** OnboardProfile.tsx
- **Route:** /onboard/profile
- **Description:** Profile completion step. Collects professional credentials, contact information, emergency contact, and profile photo. Staff roles see certification upload fields.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER, DM-STAFF-PROFILE, DM-CREDENTIAL
- **Agent Integration:** None
- **Key UI Elements:** Profile photo uploader with crop tool, phone number input, emergency contact fields, credential/license number inputs (staff only), progress stepper (step 3 of 5)

### SCR-D01-ONBOARD-PREFERENCES
- **Name:** OnboardPreferences.tsx
- **Route:** /onboard/preferences
- **Description:** Notification and accessibility preferences. Configure push notification channels, email digest frequency, preferred language, dark/light mode, text size, and screen reader compatibility.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER-PREFERENCES
- **Agent Integration:** None
- **Key UI Elements:** Notification channel toggles (push, email, SMS), email digest frequency selector, language dropdown, theme toggle, text size slider, progress stepper (step 4 of 5)

### SCR-D01-ONBOARD-TERMS
- **Name:** OnboardTerms.tsx
- **Route:** /onboard/terms
- **Description:** Legal agreements acceptance. Displays Terms of Service, Privacy Policy, HIPAA Business Associate Agreement (staff), and Acceptable Use Policy. Each must be individually acknowledged.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER, DM-CONSENT-LOG
- **Agent Integration:** None
- **Key UI Elements:** Scrollable legal document viewer, individual checkbox per agreement, BAA section (staff only), electronic signature pad, progress stepper (step 5 of 5)

### SCR-D01-ONBOARD-COMPLETE
- **Name:** OnboardComplete.tsx
- **Route:** /onboard/complete
- **Description:** Onboarding completion confirmation. Shows summary of configured settings, quick-start guide links based on role, and button to enter the main application.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-USER
- **Agent Integration:** Concierge (offers guided tour)
- **Key UI Elements:** Completion checkmark animation, settings summary card, role-specific quick-start links, "Start using Harmony" primary button, "Take guided tour" secondary button

### SCR-D01-SESSION-EXPIRED
- **Name:** SessionExpired.tsx
- **Route:** /auth/session-expired
- **Description:** Session timeout notification screen. Displayed after HIPAA-mandated automatic logout (15 minutes inactivity for PHI screens). Preserves return URL for re-authentication.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Session expired message, re-login button, inactivity timeout explanation, return-to-previous-page notice, support contact link

### SCR-D01-DEVICE-TRUST
- **Name:** DeviceTrust.tsx
- **Route:** /auth/device-trust
- **Description:** Device trust management screen. Lists trusted devices with last-used timestamps, browser/OS info, and IP location. Allows revoking trust from individual devices.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY, R-AUDITOR
- **Key Data:** DM-USER, DM-TRUSTED-DEVICE
- **Agent Integration:** None
- **Key UI Elements:** Trusted devices list with browser/OS icons, last-used timestamp per device, IP geolocation badge, revoke trust button per device, revoke all button

### SCR-D01-ACCOUNT-LOCKED
- **Name:** AccountLocked.tsx
- **Route:** /auth/account-locked
- **Description:** Account lockout screen displayed after 5 failed login attempts. Shows lockout duration (30 minutes), provides self-service unlock via email verification, and administrator contact information.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Lockout countdown timer, unlock via email button, administrator contact card, security notice, back to login link

---

# D02 — Global Dashboard & Command Center

### SCR-D02-OWNER-DASHBOARD
- **Name:** OwnerDashboard.tsx
- **Route:** /app/dashboard/owner
- **Description:** Multi-facility executive overview for platform owners. Displays aggregate census across all facilities, revenue summary, compliance scores per facility, critical alerts requiring attention, and AI agent fleet status.
- **Role Access:** R-OWNER
- **Key Data:** DM-FACILITY, DM-RESIDENT, DM-COMPLIANCE-SCORE, DM-REVENUE, DM-AGENT-STATUS
- **Agent Integration:** Executive Assistant (strategic insights), Analytics Engine (trend data)
- **Key UI Elements:** Facility comparison cards with census/compliance/revenue KPIs, multi-facility map with status pins, aggregate alert feed, revenue trend sparklines, agent fleet health indicators

### SCR-D02-ADMIN-DASHBOARD
- **Name:** AdminDashboard.tsx
- **Route:** /app/dashboard/admin
- **Description:** Single-facility operations dashboard for administrators. Shows today's census, staffing coverage, pending approvals, compliance alerts, upcoming inspections, and financial snapshot.
- **Role Access:** R-ADMIN
- **Key Data:** DM-FACILITY, DM-RESIDENT, DM-STAFF, DM-SHIFT, DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (compliance alerts), Nexus (staffing status)
- **Key UI Elements:** Census donut chart with bed availability, staffing coverage bar (current vs required), pending approvals queue badge, compliance score gauge, upcoming events timeline

### SCR-D02-CARE-MGR-DASHBOARD
- **Name:** CareManagerDashboard.tsx
- **Route:** /app/dashboard/care-manager
- **Description:** Shift-focused dashboard for care managers. Displays current shift residents, overdue documentation, medication pass status, active incidents, care plan reviews due, and staff assignments for the shift.
- **Role Access:** R-CARE-MGR
- **Key Data:** DM-RESIDENT, DM-PROGRESS-NOTE, DM-MAR, DM-INCIDENT, DM-CARE-PLAN, DM-SHIFT
- **Agent Integration:** DocuBot (documentation status), Sentinel (health alerts)
- **Key UI Elements:** Shift resident grid with status indicators, overdue documentation count with drill-down, medication pass completion bar, active incident cards, care plan review due list

### SCR-D02-DSP-DASHBOARD
- **Name:** DspDashboard.tsx
- **Route:** /app/dashboard/dsp
- **Description:** Mobile-optimized dashboard for direct support professionals. Shows assigned residents for current shift, pending tasks (med passes, documentation, vitals), quick-action buttons for common workflows, and shift handoff notes from previous shift.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-RESIDENT, DM-TASK, DM-MAR, DM-SHIFT-HANDOFF
- **Agent Integration:** DocuBot (voice note quick-start), Sentinel (resident alerts)
- **Key UI Elements:** Assigned residents carousel with photo/name/room, task checklist with priority indicators, voice note quick-record button, shift handoff summary card, emergency button

### SCR-D02-FAMILY-DASHBOARD
- **Name:** FamilyDashboard.tsx
- **Route:** /app/dashboard/family
- **Description:** Family member portal home. Displays linked resident's daily summary, recent photos/activities, upcoming appointments, care plan highlights, and messaging with care team.
- **Role Access:** R-FAMILY
- **Key Data:** DM-RESIDENT, DM-ACTIVITY-LOG, DM-APPOINTMENT, DM-CARE-PLAN, DM-MESSAGE
- **Agent Integration:** Connect (daily summary generation)
- **Key UI Elements:** Resident photo with today's mood/status, daily activity feed, upcoming appointments list, unread messages badge, care plan summary accordion

### SCR-D02-AUDITOR-DASHBOARD
- **Name:** AuditorDashboard.tsx
- **Route:** /app/dashboard/auditor
- **Description:** Read-only compliance-focused dashboard for regulatory auditors. Displays compliance scores by category, documentation completion rates, incident statistics, staffing ratios, and quick access to audit-relevant reports.
- **Role Access:** R-AUDITOR
- **Key Data:** DM-COMPLIANCE-SCORE, DM-PROGRESS-NOTE, DM-INCIDENT, DM-STAFF, DM-REPORT
- **Agent Integration:** Guardian (compliance data)
- **Key UI Elements:** Compliance category score cards, documentation completion heatmap, incident trend chart, staffing ratio table, report quick-access links

### SCR-D02-GLOBAL-SEARCH
- **Name:** GlobalSearch.tsx
- **Route:** /app/search
- **Description:** Unified search across all platform data. Supports searching residents by name/ID/room, staff by name/role, documents by content/title, incidents by date/type, and medications by name. Results grouped by category with role-based filtering.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-AUDITOR
- **Key Data:** All DM-* models (search index)
- **Agent Integration:** Concierge (natural language query interpretation)
- **Key UI Elements:** Search input with type-ahead suggestions, category filter tabs, results list grouped by entity type, recent searches history, advanced filter panel

### SCR-D02-NOTIFICATION-CENTER
- **Name:** NotificationCenter.tsx
- **Route:** /app/notifications
- **Description:** Centralized notification inbox. Displays all system notifications organized by priority (critical, warning, info), category (clinical, compliance, operational, communication), and read/unread status. Supports bulk actions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY, R-AUDITOR
- **Key Data:** DM-NOTIFICATION
- **Agent Integration:** None
- **Key UI Elements:** Notification list with priority color coding, category filter sidebar, mark read/unread toggle, bulk select with actions, notification detail slide-over panel

### SCR-D02-NOTIFICATION-PREFERENCES
- **Name:** NotificationPreferences.tsx
- **Route:** /app/notifications/preferences
- **Description:** Per-user notification configuration. Controls which notification types are received via push, email, SMS, and in-app. Includes quiet hours, escalation rules, and digest frequency settings.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY, R-AUDITOR
- **Key Data:** DM-USER-PREFERENCES
- **Agent Integration:** None
- **Key UI Elements:** Notification type matrix (rows: categories, columns: channels), quiet hours time range picker, escalation delay slider, digest frequency selector, test notification button

### SCR-D02-COMMAND-PALETTE
- **Name:** CommandPalette.tsx
- **Route:** (overlay, triggered by Ctrl+K)
- **Description:** Quick-action command palette overlay. Keyboard-driven interface for rapid navigation, resident lookup, starting documentation, creating incidents, and triggering agent actions. Supports fuzzy matching.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** All navigable entities
- **Agent Integration:** Concierge (natural language commands)
- **Key UI Elements:** Search input with fuzzy matching, categorized action list, keyboard shortcut hints, recent actions history, pinned favorites section

### SCR-D02-ALERTS-PANEL
- **Name:** AlertsPanel.tsx
- **Route:** /app/alerts
- **Description:** Real-time alerts dashboard showing active clinical alerts (falls, elopement, vital sign anomalies), compliance alerts (overdue tasks, expiring certifications), and operational alerts (staffing shortages, maintenance issues).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-ALERT, DM-INCIDENT, DM-COMPLIANCE-TASK, DM-VITAL
- **Agent Integration:** Sentinel (clinical alerts), Guardian (compliance alerts), Emergency Coordinator (crisis alerts)
- **Key UI Elements:** Alert severity columns (critical/warning/info), auto-refresh toggle, alert acknowledge button, escalation timer per alert, alert history toggle

### SCR-D02-FACILITY-SWITCHER
- **Name:** FacilitySwitcher.tsx
- **Route:** (overlay/modal)
- **Description:** Facility context switcher for multi-facility users. Displays all accessible facilities with census, compliance score, and last-visited timestamp. Switching facility reloads all dashboard data.
- **Role Access:** R-OWNER
- **Key Data:** DM-FACILITY
- **Agent Integration:** None
- **Key UI Elements:** Facility list with search filter, facility card with census/compliance badge, current facility highlight, recent facilities section, "All Facilities" aggregate option

### SCR-D02-SHIFT-HANDOFF
- **Name:** ShiftHandoff.tsx
- **Route:** /app/shift-handoff
- **Description:** Shift handoff summary screen. Outgoing shift staff documents key events, pending tasks, and resident concerns. Incoming shift staff reviews and acknowledges. Includes structured checklist and free-text notes.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT-HANDOFF, DM-RESIDENT, DM-TASK, DM-INCIDENT
- **Agent Integration:** DocuBot (auto-summarize shift events)
- **Key UI Elements:** Outgoing shift summary with auto-populated events, pending tasks transfer list, resident concern flags, incoming staff acknowledgment checkbox, handoff timestamp log

### SCR-D02-CENSUS-BOARD
- **Name:** CensusBoard.tsx
- **Route:** /app/census
- **Description:** Real-time facility census board. Visual grid showing all beds/rooms with occupancy status, resident name, and key indicators (fall risk, elopement risk, isolation). Supports drag-and-drop room reassignment.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT, DM-ROOM, DM-BED, DM-FACILITY
- **Agent Integration:** None
- **Key UI Elements:** Floor plan grid with bed status colors, resident name/photo per bed, risk indicator icons, empty bed highlight, drag-and-drop room assignment

### SCR-D02-TASK-QUEUE
- **Name:** TaskQueue.tsx
- **Route:** /app/tasks
- **Description:** Personal task queue showing all pending items: documentation due, medication passes, care plan reviews, training assignments, approval requests, and agent-generated recommendations. Sortable by priority, due date, and category.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TASK
- **Agent Integration:** Concierge (task prioritization)
- **Key UI Elements:** Task list with priority badges, due date countdown, category filter tabs, complete/snooze/delegate actions, overdue task highlight

### SCR-D02-ANNOUNCEMENT-BOARD
- **Name:** AnnouncementBoard.tsx
- **Route:** /app/announcements
- **Description:** Facility-wide announcement board. Administrators post announcements visible to all staff. Supports pinned announcements, read receipts, and acknowledgment requirements for policy changes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-ANNOUNCEMENT
- **Agent Integration:** None
- **Key UI Elements:** Announcement feed with pinned items at top, read/unread indicator, acknowledgment required badge, create announcement button (admin), announcement detail expansion

### SCR-D02-SYSTEM-STATUS
- **Name:** SystemStatus.tsx
- **Route:** /app/system-status
- **Description:** Platform health and status page. Shows service availability (API, database, file storage, email, agents), recent downtime incidents, scheduled maintenance windows, and current system version.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-SYSTEM-STATUS
- **Agent Integration:** None
- **Key UI Elements:** Service status indicators (green/yellow/red), uptime percentage per service, incident timeline, maintenance schedule calendar, system version badge

### SCR-D02-HELP-CENTER
- **Name:** HelpCenter.tsx
- **Route:** /app/help
- **Description:** In-app help center with searchable knowledge base articles, video tutorials, FAQ, and support ticket submission. Content is role-contextualized — DSPs see care documentation guides, admins see configuration guides.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY, R-AUDITOR
- **Key Data:** DM-HELP-ARTICLE
- **Agent Integration:** Concierge (contextual help suggestions)
- **Key UI Elements:** Search bar with article suggestions, category navigation sidebar, article viewer with embedded video, support ticket form, recently viewed articles

---

# D03 — Resident Management

### SCR-D03-RESIDENT-LIST
- **Name:** ResidentList.tsx
- **Route:** /app/residents
- **Description:** Searchable, filterable census table of all active residents. Columns include photo, name, room/bed, age, admission date, primary diagnosis, care level, and risk flags. Supports bulk actions and CSV export.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned only), R-AUDITOR
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Data table with sortable columns, search bar with name/ID filter, status filter chips (active/LOA/hospitalized/discharged), bulk action toolbar, export CSV button

### SCR-D03-RESIDENT-PROFILE
- **Name:** ResidentProfile.tsx
- **Route:** /app/residents/:id
- **Description:** Comprehensive resident profile with tabbed navigation across demographics, medical, care plan, documentation, medications, incidents, and family contacts. Header shows photo, name, room, age, and critical alerts.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked), R-AUDITOR
- **Key Data:** DM-RESIDENT, DM-CARE-PLAN, DM-MEDICATION, DM-INCIDENT, DM-PROGRESS-NOTE
- **Agent Integration:** Sentinel (health risk indicators in header)
- **Key UI Elements:** Resident photo/name/room header bar, tabbed content navigation, critical alert banner, quick-action buttons (note, vitals, incident), last-updated timestamp

### SCR-D03-RESIDENT-CREATE
- **Name:** ResidentCreate.tsx
- **Route:** /app/residents/new
- **Description:** Multi-step resident admission intake form. Step 1: Demographics. Step 2: Medical history. Step 3: Emergency contacts. Step 4: Insurance. Step 5: Legal/guardian. Step 6: Preferences. Step 7: Room assignment. Step 8: Review and submit.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-RESIDENT, DM-EMERGENCY-CONTACT, DM-INSURANCE, DM-GUARDIAN
- **Agent Integration:** Catalyst (pre-populates from referral data if available)
- **Key UI Elements:** Multi-step wizard with progress indicator, form validation per step, save draft button, required field indicators, review summary before submit

### SCR-D03-RESIDENT-EDIT
- **Name:** ResidentEdit.tsx
- **Route:** /app/residents/:id/edit
- **Description:** Edit existing resident demographics, contact information, and preferences. Changes to medical fields require care manager approval. All edits logged to audit trail.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Editable form fields with current values pre-populated, change reason text input, approval required indicator for medical fields, save/cancel buttons, audit trail link

### SCR-D03-RESIDENT-PHOTO
- **Name:** ResidentPhoto.tsx
- **Route:** /app/residents/:id/photo
- **Description:** Resident photo management. Upload, crop, and set primary identification photo. Maintains photo history with timestamps. Used for ID badges, face sheets, and staff reference.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT, DM-FILE
- **Agent Integration:** None
- **Key UI Elements:** Photo upload dropzone, image cropper with aspect ratio lock, current photo display, photo history grid, set as primary button

### SCR-D03-RESIDENT-DEMOGRAPHICS
- **Name:** ResidentDemographics.tsx
- **Route:** /app/residents/:id/demographics
- **Description:** Detailed demographics tab. Full legal name, preferred name, DOB, SSN (masked), gender, race/ethnicity, primary language, communication method, religion, and veteran status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Read-only field display with edit button, SSN masked with reveal toggle (admin only), language/communication badges, demographic summary card, print demographics button

### SCR-D03-EMERGENCY-CONTACTS
- **Name:** EmergencyContacts.tsx
- **Route:** /app/residents/:id/emergency-contacts
- **Description:** Emergency contact list for a resident. Each contact includes name, relationship, phone numbers, email, address, and authorization level (medical decisions, pickup, notification only).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-EMERGENCY-CONTACT
- **Agent Integration:** None
- **Key UI Elements:** Contact cards with phone/email quick-dial links, authorization level badges, primary contact indicator, add/edit/remove contact buttons, contact order drag-and-drop

### SCR-D03-INSURANCE-INFO
- **Name:** InsuranceInfo.tsx
- **Route:** /app/residents/:id/insurance
- **Description:** Resident insurance information. Primary and secondary insurance carriers, policy numbers, group numbers, effective dates, authorization tracking, and Medicaid/Medicare eligibility status.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INSURANCE, DM-RESIDENT
- **Agent Integration:** Billing Analyst (eligibility verification)
- **Key UI Elements:** Primary/secondary insurance cards, policy number with copy button, effective date range display, authorization status indicator, eligibility check button

### SCR-D03-GUARDIAN-INFO
- **Name:** GuardianInfo.tsx
- **Route:** /app/residents/:id/guardian
- **Description:** Legal guardian and representative information. Includes guardianship type (full, limited, healthcare only), court order reference, guardian contact details, and power of attorney documents.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-GUARDIAN, DM-RESIDENT, DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** Guardian contact card with relationship type, guardianship scope badges, court order document link, POA document upload, expiration date alert

### SCR-D03-ADVANCE-DIRECTIVES
- **Name:** AdvanceDirectives.tsx
- **Route:** /app/residents/:id/advance-directives
- **Description:** Advance directive documentation. DNR/DNI status, healthcare proxy designation, living will, POLST/MOLST form, organ donation preferences, and religious/cultural care preferences.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-ADVANCE-DIRECTIVE, DM-RESIDENT, DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** DNR/DNI status banner (prominent), healthcare proxy contact card, directive document viewer, last reviewed date with renewal alert, print directive summary button

### SCR-D03-RESIDENT-TIMELINE
- **Name:** ResidentTimeline.tsx
- **Route:** /app/residents/:id/timeline
- **Description:** Chronological event timeline for a resident. Aggregates all events: admissions, care plan changes, incidents, medication changes, hospitalizations, assessments, family visits, and milestones. Filterable by event type and date range.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked, filtered), R-AUDITOR
- **Key Data:** DM-TIMELINE-EVENT, DM-RESIDENT
- **Agent Integration:** Analytics Engine (pattern detection in timeline)
- **Key UI Elements:** Vertical timeline with event type icons, date range filter, event type filter checkboxes, event detail expansion panel, timeline export button

### SCR-D03-RESIDENT-DOCUMENTS
- **Name:** ResidentDocuments.tsx
- **Route:** /app/residents/:id/documents
- **Description:** Document repository for a specific resident. Organized by category: admission, medical, legal, care plans, assessments, correspondence. Supports upload, version tracking, and expiration alerts.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-DOCUMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Document list grouped by category, upload dropzone, version history per document, expiration date column with alerts, document viewer/download buttons

### SCR-D03-ASSESSMENT-LIST
- **Name:** AssessmentList.tsx
- **Route:** /app/residents/:id/assessments
- **Description:** List of all assessments for a resident. Shows assessment type, date completed, assessor name, score/outcome, and next due date. Supports filtering by assessment type and date range.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-ASSESSMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Assessment table with type/date/assessor columns, due date countdown badges, status chips (completed/overdue/scheduled), create new assessment button, assessment type filter

### SCR-D03-ASSESSMENT-DETAIL
- **Name:** AssessmentDetail.tsx
- **Route:** /app/residents/:id/assessments/:assessmentId
- **Description:** Full assessment view with all scored items, assessor notes, supporting documentation, and outcome summary. Includes comparison to previous assessment of same type.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-ASSESSMENT, DM-ASSESSMENT-ITEM, DM-RESIDENT
- **Agent Integration:** Compass (care plan recommendations based on assessment)
- **Key UI Elements:** Assessment header with type/date/assessor, scored items list with values, assessor notes section, previous assessment comparison sidebar, print/export button

### SCR-D03-ASSESSMENT-CREATE
- **Name:** AssessmentCreate.tsx
- **Route:** /app/residents/:id/assessments/new
- **Description:** Assessment entry form. Select assessment type (functional, behavioral, medical, risk, nutritional), then complete structured scoring items. Supports save-as-draft and auto-save.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-ASSESSMENT, DM-ASSESSMENT-ITEM, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Assessment type selector, structured scoring form with item descriptions, numeric/scale input per item, notes textarea per section, save draft / submit buttons

### SCR-D03-FUNCTIONAL-ASSESSMENT
- **Name:** FunctionalAssessment.tsx
- **Route:** /app/residents/:id/assessments/new/functional
- **Description:** Functional assessment form covering ADLs (bathing, dressing, eating, toileting, transferring, continence), IADLs (cooking, cleaning, laundry, shopping, transportation, medication management), mobility, and communication.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-ASSESSMENT, DM-RESIDENT
- **Agent Integration:** Compass (suggests ISP goals based on functional levels)
- **Key UI Elements:** ADL scoring grid (independent/supervised/limited assist/extensive assist/dependent), IADL scoring grid, mobility assessment section, communication assessment section, summary score calculation

### SCR-D03-BEHAVIORAL-ASSESSMENT
- **Name:** BehavioralAssessment.tsx
- **Route:** /app/residents/:id/assessments/new/behavioral
- **Description:** Behavioral assessment form. Documents target behaviors, frequency, intensity, duration, antecedents, and consequences. Includes ABC (Antecedent-Behavior-Consequence) data collection template.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-ASSESSMENT, DM-BEHAVIOR-DATA, DM-RESIDENT
- **Agent Integration:** Advocate (behavior pattern analysis)
- **Key UI Elements:** Target behavior definition fields, ABC data entry grid, frequency/intensity/duration scales, behavior function hypothesis section, intervention recommendation section

### SCR-D03-MEDICAL-ASSESSMENT
- **Name:** MedicalAssessment.tsx
- **Route:** /app/residents/:id/assessments/new/medical
- **Description:** Medical assessment form. Documents current diagnoses, vital signs baseline, pain assessment, skin integrity check, fall risk score (Morse scale), nutritional screening (MNA), and sensory assessment.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ASSESSMENT, DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (risk score calculation)
- **Key UI Elements:** Diagnosis list with ICD-10 code lookup, vital signs baseline form, Morse Fall Scale calculator, MNA nutritional screening form, skin integrity body map

### SCR-D03-RISK-ASSESSMENT
- **Name:** RiskAssessment.tsx
- **Route:** /app/residents/:id/assessments/new/risk
- **Description:** Comprehensive risk assessment covering fall risk, elopement risk, aspiration risk, skin breakdown risk, behavioral risk, and self-harm risk. Each category scored with evidence-based tools.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ASSESSMENT, DM-RISK-SCORE, DM-RESIDENT
- **Agent Integration:** Sentinel (predictive risk scoring)
- **Key UI Elements:** Risk category tabs, scoring tool per category, overall risk level indicator, risk mitigation plan fields, risk reassessment schedule

### SCR-D03-GOALS-LIST
- **Name:** GoalsList.tsx
- **Route:** /app/residents/:id/goals
- **Description:** List of all active and completed goals for a resident. Shows goal description, target date, current progress percentage, responsible staff, and linked ISP objective.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked), R-AUDITOR
- **Key Data:** DM-GOAL, DM-RESIDENT
- **Agent Integration:** Compass (goal progress analysis)
- **Key UI Elements:** Goal cards with progress bars, status filter (active/met/discontinued/on-hold), target date countdown, responsible staff avatar, linked ISP objective reference

### SCR-D03-GOAL-DETAIL
- **Name:** GoalDetail.tsx
- **Route:** /app/residents/:id/goals/:goalId
- **Description:** Individual goal detail with progress history, data collection entries, trend chart, staff notes, and goal modification history. Includes option to mark goal as met, modify, or discontinue.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked), R-AUDITOR
- **Key Data:** DM-GOAL, DM-GOAL-DATA, DM-RESIDENT
- **Agent Integration:** Compass (progress trend analysis)
- **Key UI Elements:** Goal description header, progress trend line chart, data collection entry table, staff notes feed, goal status action buttons (met/modify/discontinue)

### SCR-D03-GOAL-PROGRESS
- **Name:** GoalProgress.tsx
- **Route:** /app/residents/:id/goals/:goalId/progress
- **Description:** Goal data collection entry screen. Staff records trial data, percentage scores, or yes/no outcomes per goal objective. Supports batch entry for multiple goals in one session.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-GOAL-DATA, DM-GOAL, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Goal objective list with data entry fields, trial counter, percentage calculator, notes per entry, batch submit button

### SCR-D03-RESIDENT-PREFERENCES
- **Name:** ResidentPreferences.tsx
- **Route:** /app/residents/:id/preferences
- **Description:** Person-centered preferences documentation. Food preferences, daily routine preferences, preferred activities, communication style, sensory sensitivities, comfort items, and cultural/religious observances.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-RESIDENT-PREFERENCE, DM-RESIDENT
- **Agent Integration:** Connect (shares relevant preferences with family)
- **Key UI Elements:** Preference category sections, free-text fields with save, preference importance ranking, family-contributed preferences flag, last updated timestamp per section

### SCR-D03-COMMUNICATION-NEEDS
- **Name:** CommunicationNeeds.tsx
- **Route:** /app/residents/:id/communication
- **Description:** Communication profile for residents with speech/language needs. Documents primary communication method, assistive devices, communication board preferences, sign language use, and staff communication tips.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-COMMUNICATION-PROFILE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Communication method selector, assistive device list, communication tips for staff, visual communication board reference, staff training link

### SCR-D03-MOBILITY-EQUIPMENT
- **Name:** MobilityEquipment.tsx
- **Route:** /app/residents/:id/mobility
- **Description:** Mobility and adaptive equipment profile. Documents wheelchair type/size, walker, orthotics, positioning devices, bed type, and transfer method. Includes equipment maintenance schedule.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-EQUIPMENT, DM-RESIDENT
- **Agent Integration:** Maintenance Coordinator (equipment maintenance alerts)
- **Key UI Elements:** Equipment inventory list, equipment photo/description, maintenance schedule per item, replacement due date, transfer method instructions

### SCR-D03-RESIDENT-TRANSFER
- **Name:** ResidentTransfer.tsx
- **Route:** /app/residents/:id/transfer
- **Description:** Resident transfer workflow. Initiates transfer between rooms within facility or between facilities. Includes transfer reason, new room/bed assignment, care plan transfer, and notification to care team and family.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-RESIDENT, DM-ROOM, DM-BED, DM-TRANSFER-LOG
- **Agent Integration:** None
- **Key UI Elements:** Current room/bed display, destination room/bed selector, transfer reason dropdown, care plan transfer checklist, notification recipient list

### SCR-D03-RESIDENT-ARCHIVE
- **Name:** ResidentArchive.tsx
- **Route:** /app/residents/archive
- **Description:** Archived (discharged/deceased) resident records. Searchable list with discharge date, discharge reason, and record retention status. Records maintained per state retention requirements.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-RESIDENT
- **Agent Integration:** Guardian (retention compliance check)
- **Key UI Elements:** Archived resident table, discharge date/reason columns, retention period countdown, restore record button (admin), purge eligible indicator

### SCR-D03-RESIDENT-SEARCH
- **Name:** ResidentSearch.tsx
- **Route:** /app/residents/search
- **Description:** Advanced resident search with multi-field filtering. Search by diagnosis, medication, age range, care level, risk level, admission date range, room/unit, and custom fields.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Multi-field filter form, search results table, save search criteria button, export results button, result count indicator

### SCR-D03-RESIDENT-BATCH-IMPORT
- **Name:** ResidentBatchImport.tsx
- **Route:** /app/residents/import
- **Description:** Bulk resident import from CSV/Excel. Provides template download, file upload, field mapping interface, validation preview with error highlighting, and import confirmation.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Template download button, file upload dropzone, column mapping interface, validation results table with error rows highlighted, import/cancel buttons

### SCR-D03-FACE-SHEET
- **Name:** FaceSheet.tsx
- **Route:** /app/residents/:id/face-sheet
- **Description:** Printable face sheet (one-page resident summary). Includes photo, demographics, diagnoses, medications, allergies, emergency contacts, insurance, guardian, advance directives, and physician information. Formatted for print.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-RESIDENT, DM-MEDICATION, DM-EMERGENCY-CONTACT, DM-INSURANCE, DM-GUARDIAN
- **Agent Integration:** None
- **Key UI Elements:** Print-optimized single-page layout, resident photo, demographics section, medical summary section, contacts section, print button

### SCR-D03-RESIDENT-SNAPSHOT
- **Name:** ResidentSnapshot.tsx
- **Route:** /app/residents/:id/snapshot
- **Description:** AI-generated resident snapshot report. Summarizes recent health trends, goal progress, incident history, medication changes, and care team observations for a configurable date range.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT, DM-VITAL, DM-GOAL, DM-INCIDENT, DM-MEDICATION, DM-PROGRESS-NOTE
- **Agent Integration:** Analytics Engine (data synthesis), Sentinel (health trend analysis)
- **Key UI Elements:** Date range selector, AI-generated narrative summary, health trend mini-charts, goal progress summary, export/print button

### SCR-D03-RESIDENT-ALERTS
- **Name:** ResidentAlerts.tsx
- **Route:** /app/residents/:id/alerts
- **Description:** Active alerts and flags for a specific resident. Includes clinical alerts (fall risk, elopement risk, allergy), compliance alerts (overdue assessments, expiring documents), and custom staff flags.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-ALERT, DM-RESIDENT
- **Agent Integration:** Sentinel (clinical alert generation)
- **Key UI Elements:** Alert list with severity indicators, alert detail expansion, acknowledge/resolve buttons, create custom flag button, alert history toggle

### SCR-D03-ROOM-ASSIGNMENT
- **Name:** RoomAssignment.tsx
- **Route:** /app/residents/:id/room
- **Description:** Room and bed assignment management for a resident. Shows current assignment, room details (type, capacity, features), roommate information, and assignment history.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ROOM, DM-BED, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Current room/bed display card, available rooms list, room feature tags (accessible, private, semi-private), roommate compatibility note, assignment history table

### SCR-D03-BED-MANAGEMENT
- **Name:** BedManagement.tsx
- **Route:** /app/facility/beds
- **Description:** Facility-wide bed management board. Visual grid of all rooms/beds showing occupancy, availability, reserved, and out-of-service status. Supports filtering by unit/wing and bed type.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ROOM, DM-BED, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Floor/wing filter tabs, bed grid with color-coded status, occupant name per bed, bed type icons, availability count summary

### SCR-D03-GROUP-ASSIGNMENTS
- **Name:** GroupAssignments.tsx
- **Route:** /app/residents/groups
- **Description:** Resident group management. Create and manage groups for activities, dining, outings, and care teams. Assign residents to groups, view group rosters, and track group-based scheduling.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT-GROUP, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Group list with member count, group roster with resident photos, create/edit group form, drag-and-drop resident assignment, group schedule link

### SCR-D03-PHOTO-GALLERY
- **Name:** PhotoGallery.tsx
- **Route:** /app/residents/:id/photos
- **Description:** Resident photo gallery for activity documentation, milestone celebrations, and family sharing. Photos tagged by date, event, and staff uploader. Family-visible photos flagged separately.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked, family-visible only)
- **Key Data:** DM-FILE, DM-RESIDENT
- **Agent Integration:** Connect (shares family-flagged photos)
- **Key UI Elements:** Photo grid with date/event tags, upload button, family-visible toggle per photo, lightbox viewer, download/share buttons

### SCR-D03-MILESTONE-TRACKER
- **Name:** MilestoneTracker.tsx
- **Route:** /app/residents/:id/milestones
- **Description:** Resident milestone and achievement tracker. Documents personal achievements, goal completions, community participation milestones, and anniversary dates. Supports celebration notifications to family.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-MILESTONE, DM-RESIDENT
- **Agent Integration:** Connect (family notification)
- **Key UI Elements:** Milestone timeline, add milestone form, milestone category badges, family notification toggle, celebration photo upload

### SCR-D03-BIRTHDAY-CALENDAR
- **Name:** BirthdayCalendar.tsx
- **Route:** /app/residents/birthdays
- **Description:** Resident birthday and anniversary calendar. Monthly view showing upcoming birthdays, admission anniversaries, and custom celebration dates. Supports reminder notifications to staff.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Monthly calendar with birthday markers, upcoming birthdays list (next 30 days), anniversary list, reminder notification toggle, celebration planning notes

### SCR-D03-EMERGENCY-CARD
- **Name:** EmergencyCard.tsx
- **Route:** /app/residents/:id/emergency-card
- **Description:** Printable emergency information card for a resident. Single-page format with photo, name, DOB, diagnoses, medications, allergies, emergency contacts, physician, and advance directive status. Designed for wallet/badge size.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RESIDENT, DM-MEDICATION, DM-EMERGENCY-CONTACT
- **Agent Integration:** None
- **Key UI Elements:** Wallet-card formatted layout, resident photo, critical medical info, emergency contact numbers, print button, QR code linking to digital profile

### SCR-D03-QR-BADGE
- **Name:** QrBadge.tsx
- **Route:** /app/residents/:id/badge
- **Description:** Resident identification badge generator. Creates printable badge with photo, name, room number, and QR code that links to the resident's digital profile (requires authentication to view).
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Badge preview with photo/name/room, QR code generator, badge size selector (standard/large), print button, batch print option for all residents

---

# D04 — Care Plans & Individual Service Plans (ISP)

### SCR-D04-CARE-PLAN-LIST
- **Name:** CarePlanList.tsx
- **Route:** /app/care-plans
- **Description:** Facility-wide care plan registry. Table of all active care plans with resident name, plan type (ISP, BSP, nursing), status (draft/active/review-due/expired), last review date, next review due, and assigned care manager.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-RESIDENT
- **Agent Integration:** Guardian (compliance status per plan)
- **Key UI Elements:** Care plan table with status badges, review-due filter, plan type filter tabs, bulk export button, overdue plans highlight

### SCR-D04-CARE-PLAN-DETAIL
- **Name:** CarePlanDetail.tsx
- **Route:** /app/care-plans/:planId
- **Description:** Full care plan document view. Displays all objectives, interventions, responsible staff, target dates, progress data, and signatures. Includes version history sidebar and compliance status indicator.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned resident), R-FAMILY (linked, filtered view), R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-INTERVENTION, DM-RESIDENT
- **Agent Integration:** Compass (AI-generated progress insights)
- **Key UI Elements:** Plan header with resident/status/dates, objectives accordion with progress bars, intervention schedule table, signature status panel, version history sidebar

### SCR-D04-CARE-PLAN-CREATE
- **Name:** CarePlanCreate.tsx
- **Route:** /app/care-plans/new
- **Description:** Multi-step care plan creation wizard. Step 1: Select resident and plan type. Step 2: Define objectives from assessment data. Step 3: Add interventions per objective. Step 4: Assign staff and schedules. Step 5: Set review dates. Step 6: Review and route for approval.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-INTERVENTION, DM-RESIDENT, DM-ASSESSMENT
- **Agent Integration:** Compass (suggests objectives based on assessments)
- **Key UI Elements:** Step wizard with progress bar, resident selector, objective builder with assessment linkage, intervention form with frequency/duration, review schedule picker

### SCR-D04-CARE-PLAN-EDIT
- **Name:** CarePlanEdit.tsx
- **Route:** /app/care-plans/:planId/edit
- **Description:** Edit existing care plan. Modify objectives, interventions, staff assignments, and schedules. Changes create a new version and require re-approval. Edit reason is required and logged.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-INTERVENTION
- **Agent Integration:** None
- **Key UI Elements:** Editable plan sections, change reason input (required), version comparison toggle, save draft button, submit for re-approval button

### SCR-D04-CARE-PLAN-APPROVAL
- **Name:** CarePlanApproval.tsx
- **Route:** /app/care-plans/:planId/approval
- **Description:** Care plan approval workflow screen. Displays plan for review with approval/rejection actions. Shows approval chain (care manager, administrator, physician if required), current status, and pending approvers.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-APPROVAL-WORKFLOW
- **Agent Integration:** None
- **Key UI Elements:** Plan summary for review, approval chain visualization, approve/reject/request-changes buttons, rejection reason textarea, approval timestamp log

### SCR-D04-CARE-PLAN-VERSIONS
- **Name:** CarePlanVersions.tsx
- **Route:** /app/care-plans/:planId/versions
- **Description:** Version history for a care plan. Lists all versions with date, author, change summary, and approval status. Supports side-by-side comparison of any two versions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CARE-PLAN-VERSION
- **Agent Integration:** None
- **Key UI Elements:** Version list with date/author/status, version comparison selector, side-by-side diff view with change highlights, restore previous version button, version export

### SCR-D04-CARE-PLAN-DIFF
- **Name:** CarePlanDiff.tsx
- **Route:** /app/care-plans/:planId/diff/:v1/:v2
- **Description:** Side-by-side comparison of two care plan versions. Highlights additions (green), removals (red), and modifications (yellow) across all plan sections.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CARE-PLAN-VERSION
- **Agent Integration:** None
- **Key UI Elements:** Split-pane layout with version headers, color-coded diff highlighting, section navigation sidebar, change count summary, print diff button

### SCR-D04-ISP-ANNUAL-REVIEW
- **Name:** IspAnnualReview.tsx
- **Route:** /app/care-plans/:planId/annual-review
- **Description:** Annual ISP review form. Structured review of all objectives (met/not met/modified/discontinued), new objectives for coming year, team member input sections, and family participation documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-ISP-REVIEW
- **Agent Integration:** Compass (annual progress summary), Analytics Engine (year-over-year trends)
- **Key UI Elements:** Objective review table with outcome selectors, new objective builder, team input sections by role, family participation checkbox/notes, meeting date/attendees fields

### SCR-D04-ISP-QUARTERLY-REVIEW
- **Name:** IspQuarterlyReview.tsx
- **Route:** /app/care-plans/:planId/quarterly-review
- **Description:** Quarterly ISP progress review. Documents progress toward each objective with data summaries, identifies barriers, and recommends modifications. Less comprehensive than annual but required by most state regulations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-GOAL-DATA
- **Agent Integration:** Compass (quarterly progress analysis)
- **Key UI Elements:** Objective progress summary cards, data trend mini-charts per objective, barrier identification fields, modification recommendations, reviewer signature

### SCR-D04-ISP-GOAL-MAPPING
- **Name:** IspGoalMapping.tsx
- **Route:** /app/care-plans/:planId/goal-map
- **Description:** Visual mapping of ISP objectives to daily goals, interventions, and data collection schedules. Shows how high-level ISP objectives cascade into operational daily tasks.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-GOAL, DM-INTERVENTION
- **Agent Integration:** None
- **Key UI Elements:** Hierarchical tree visualization (objective → goals → interventions), drag-and-drop goal assignment, unlinked goals warning, coverage gap indicator, print map button

### SCR-D04-OBJECTIVE-LIST
- **Name:** ObjectiveList.tsx
- **Route:** /app/care-plans/:planId/objectives
- **Description:** List of all objectives within a care plan. Shows objective text, domain (health, safety, community, vocational, social), target date, progress percentage, and data collection frequency.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-OBJECTIVE, DM-CARE-PLAN
- **Agent Integration:** None
- **Key UI Elements:** Objective cards with domain badges, progress bars, target date display, data frequency indicator, add objective button

### SCR-D04-OBJECTIVE-DETAIL
- **Name:** ObjectiveDetail.tsx
- **Route:** /app/care-plans/:planId/objectives/:objId
- **Description:** Single objective detail view. Full objective text, measurable criteria, baseline data, current progress data with trend chart, linked interventions, responsible staff, and data collection log.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-OBJECTIVE, DM-GOAL-DATA, DM-INTERVENTION
- **Agent Integration:** Compass (trend analysis and recommendations)
- **Key UI Elements:** Objective text with measurable criteria, progress trend line chart, baseline vs current comparison, intervention list, data collection log table

### SCR-D04-OBJECTIVE-PROGRESS-CHART
- **Name:** ObjectiveProgressChart.tsx
- **Route:** /app/care-plans/:planId/objectives/:objId/chart
- **Description:** Detailed progress visualization for a single objective. Line chart with data points, trend line, target line, and baseline. Supports date range filtering and data point annotation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-GOAL-DATA, DM-OBJECTIVE
- **Agent Integration:** Analytics Engine (statistical trend analysis)
- **Key UI Elements:** Line chart with data points and trend line, target threshold line, date range selector, data point hover details, export chart as image button

### SCR-D04-INTERVENTION-LIST
- **Name:** InterventionList.tsx
- **Route:** /app/care-plans/:planId/interventions
- **Description:** All interventions across a care plan. Table with intervention description, linked objective, responsible staff, frequency, schedule, and implementation status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-INTERVENTION, DM-CARE-PLAN
- **Agent Integration:** None
- **Key UI Elements:** Intervention table with objective linkage, frequency/schedule columns, staff assignment, status badges, add intervention button

### SCR-D04-INTERVENTION-DETAIL
- **Name:** InterventionDetail.tsx
- **Route:** /app/care-plans/:planId/interventions/:intId
- **Description:** Single intervention detail. Full description, step-by-step procedure, required materials, staff training requirements, implementation schedule, and effectiveness tracking data.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-INTERVENTION
- **Agent Integration:** None
- **Key UI Elements:** Intervention description with procedure steps, materials checklist, staff training status, schedule calendar view, effectiveness data table

### SCR-D04-INTERVENTION-SCHEDULE
- **Name:** InterventionSchedule.tsx
- **Route:** /app/care-plans/:planId/interventions/schedule
- **Description:** Calendar view of all intervention schedules for a care plan. Shows which interventions are scheduled for each day/time, assigned staff, and completion status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-INTERVENTION, DM-SCHEDULE
- **Agent Integration:** Nexus (schedule optimization)
- **Key UI Elements:** Weekly calendar grid with intervention blocks, staff assignment per block, completion checkmarks, conflict indicators, print schedule button

### SCR-D04-TEAM-ASSIGNMENTS
- **Name:** CarePlanTeamAssignments.tsx
- **Route:** /app/care-plans/:planId/team
- **Description:** Care plan team roster. Lists all staff assigned to the plan with their roles, responsibilities, assigned objectives/interventions, and contact information.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN-TEAM, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Team member cards with role/photo, assigned objectives per member, add/remove team member, role assignment dropdown, team communication button

### SCR-D04-MEETING-SCHEDULER
- **Name:** CarePlanMeetingScheduler.tsx
- **Route:** /app/care-plans/:planId/meetings/schedule
- **Description:** Schedule ISP team meetings. Select date/time, invite team members and family, set agenda items, and send calendar invitations. Tracks RSVPs and attendance.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEETING, DM-CARE-PLAN-TEAM
- **Agent Integration:** Nexus (find optimal meeting time)
- **Key UI Elements:** Date/time picker, attendee selector with RSVP status, agenda builder, send invitations button, meeting history list

### SCR-D04-MEETING-MINUTES
- **Name:** CarePlanMeetingMinutes.tsx
- **Route:** /app/care-plans/:planId/meetings/:meetingId/minutes
- **Description:** ISP meeting minutes documentation. Records attendees, discussion points, decisions made, action items with owners, and next meeting date. Supports voice-to-text transcription.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEETING, DM-MEETING-MINUTES
- **Agent Integration:** DocuBot (voice-to-text meeting transcription)
- **Key UI Elements:** Attendee checklist, discussion notes editor, decision log, action items with owner/due-date, voice recording button with transcription

### SCR-D04-SIGNATURE-COLLECTION
- **Name:** CarePlanSignatureCollection.tsx
- **Route:** /app/care-plans/:planId/signatures
- **Description:** Electronic signature collection for care plan approval. Lists all required signatories (care manager, administrator, physician, guardian/family), signature status, and signature pad for in-person signing.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-FAMILY (own signature only)
- **Key Data:** DM-SIGNATURE, DM-CARE-PLAN
- **Agent Integration:** None
- **Key UI Elements:** Signatory list with status (pending/signed/declined), electronic signature pad, date/time stamp per signature, send reminder button, print signature page

### SCR-D04-CARE-PLAN-PRINT
- **Name:** CarePlanPrint.tsx
- **Route:** /app/care-plans/:planId/print
- **Description:** Print-optimized care plan document. Formats the complete care plan for printing or PDF export with proper page breaks, headers/footers, and signature lines.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-INTERVENTION
- **Agent Integration:** None
- **Key UI Elements:** Print-formatted document layout, page break controls, header/footer with facility info, signature lines, print/export PDF buttons

### SCR-D04-TEMPLATE-LIBRARY
- **Name:** CarePlanTemplateLibrary.tsx
- **Route:** /app/care-plans/templates
- **Description:** Library of care plan templates. Pre-built templates for common plan types (ISP, BSP, nursing care plan, fall prevention, elopement prevention). Templates can be customized and saved as facility-specific templates.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template cards with type/description, preview button, use template button, create custom template button, template category filter

### SCR-D04-TEMPLATE-EDITOR
- **Name:** CarePlanTemplateEditor.tsx
- **Route:** /app/care-plans/templates/:templateId/edit
- **Description:** Care plan template editor. Define default objectives, interventions, review schedules, and required signatures for a template. Templates serve as starting points for new care plans.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-CARE-PLAN-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template name/description fields, default objectives editor, default interventions editor, review schedule configuration, save/publish template buttons

### SCR-D04-AI-SUGGESTIONS
- **Name:** CarePlanAiSuggestions.tsx
- **Route:** /app/care-plans/:planId/ai-suggestions
- **Description:** AI-generated care plan recommendations panel. Compass agent analyzes assessment data, progress trends, and evidence-based practices to suggest new objectives, intervention modifications, and goal adjustments.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CARE-PLAN, DM-ASSESSMENT, DM-GOAL-DATA
- **Agent Integration:** Compass (primary — generates all suggestions)
- **Key UI Elements:** Suggestion cards with rationale, accept/reject/modify buttons per suggestion, evidence-based practice citations, confidence score per suggestion, apply selected suggestions button

### SCR-D04-COMPLIANCE-CHECKER
- **Name:** CarePlanComplianceChecker.tsx
- **Route:** /app/care-plans/:planId/compliance
- **Description:** Care plan compliance validation. Checks plan against state-specific regulatory requirements: required sections present, review dates within mandated intervals, required signatures obtained, and documentation completeness.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-COMPLIANCE-RULE
- **Agent Integration:** Guardian (regulatory rule engine)
- **Key UI Elements:** Compliance checklist with pass/fail per item, state regulation reference per item, remediation instructions for failures, overall compliance score, generate compliance report button

### SCR-D04-FAMILY-REVIEW
- **Name:** CarePlanFamilyReview.tsx
- **Route:** /app/care-plans/:planId/family-review
- **Description:** Family-facing care plan review portal. Displays care plan in simplified, non-clinical language. Family can view objectives, progress, and add comments/questions. Supports electronic acknowledgment.
- **Role Access:** R-FAMILY (linked resident)
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE (simplified view)
- **Agent Integration:** Connect (translates clinical language to family-friendly)
- **Key UI Elements:** Simplified plan summary, objective progress cards, comment/question input per section, acknowledgment signature, download family-friendly PDF

### SCR-D04-AUDIT-TRAIL
- **Name:** CarePlanAuditTrail.tsx
- **Route:** /app/care-plans/:planId/audit
- **Description:** Complete audit trail for a care plan. Every view, edit, approval, signature, and export logged with user, timestamp, IP address, and action detail. Required for HIPAA compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-AUDIT-LOG
- **Agent Integration:** None
- **Key UI Elements:** Audit log table with timestamp/user/action columns, date range filter, action type filter, export audit log button, IP address display

### SCR-D04-BEHAVIOR-SUPPORT-PLAN
- **Name:** BehaviorSupportPlan.tsx
- **Route:** /app/care-plans/:planId/bsp
- **Description:** Behavior Support Plan (BSP) specific view. Documents target behaviors, function of behavior, replacement behaviors, prevention strategies, intervention strategies, crisis intervention procedures, and data collection methods.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-BEHAVIOR-DATA
- **Agent Integration:** Advocate (behavior analysis), Compass (intervention recommendations)
- **Key UI Elements:** Target behavior definitions, function analysis summary, replacement behavior descriptions, tiered intervention strategies, crisis protocol steps

---

# D05 — Clinical Documentation & Progress Notes

### SCR-D05-NOTES-LIST
- **Name:** NotesList.tsx
- **Route:** /app/documentation/notes
- **Description:** Facility-wide progress notes registry. Filterable table showing all notes with resident name, note type, author, date, status (draft/final/co-signed), and word count. Supports date range and author filtering.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Notes table with sortable columns, date range picker, author filter, note type filter tabs, bulk export button

### SCR-D05-NOTE-DETAIL
- **Name:** NoteDetail.tsx
- **Route:** /app/documentation/notes/:noteId
- **Description:** Full progress note view. Displays note content, author, date/time, resident, note type, co-signer status, linked care plan objectives, and any attachments. Includes audit trail of edits.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked, filtered), R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Note content display, author/date header, co-signer status badge, linked objectives sidebar, edit history accordion

### SCR-D05-NOTE-CREATE-TEXT
- **Name:** NoteCreateText.tsx
- **Route:** /app/documentation/notes/new/text
- **Description:** Text-based progress note creation. Select resident, note type, and enter note content using structured template. Auto-links to active care plan objectives. Supports save-as-draft.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned residents)
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT, DM-CARE-PLAN
- **Agent Integration:** None
- **Key UI Elements:** Resident selector, note type dropdown, structured text editor with template sections, care plan objective linker, save draft / finalize buttons

### SCR-D05-NOTE-CREATE-VOICE
- **Name:** NoteCreateVoice.tsx
- **Route:** /app/documentation/notes/new/voice
- **Description:** Voice-to-text progress note creation powered by DocuBot. Staff speaks naturally, DocuBot transcribes and structures into compliant note format. Supports real-time transcription preview and post-transcription editing.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned residents)
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** DocuBot (voice transcription and note structuring)
- **Key UI Elements:** Microphone record button with waveform visualizer, real-time transcription preview, resident selector, note type selector, edit transcription / finalize buttons

### SCR-D05-NOTE-EDIT
- **Name:** NoteEdit.tsx
- **Route:** /app/documentation/notes/:noteId/edit
- **Description:** Edit an existing progress note. Only available for draft notes or within the late-entry correction window (configurable, typically 24 hours). Edits require reason and are logged.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own notes only)
- **Key Data:** DM-PROGRESS-NOTE
- **Agent Integration:** None
- **Key UI Elements:** Editable note content, edit reason input (required), original content comparison, late entry indicator, save / cancel buttons

### SCR-D05-NOTE-COSIGN
- **Name:** NoteCosign.tsx
- **Route:** /app/documentation/notes/:noteId/cosign
- **Description:** Co-signature workflow for progress notes. Supervisor reviews note content, adds co-signer comments if needed, and applies electronic co-signature. Required for notes by unlicensed staff.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE, DM-SIGNATURE
- **Agent Integration:** None
- **Key UI Elements:** Note content for review, co-signer comments textarea, approve/return-for-revision buttons, electronic signature pad, co-sign timestamp

### SCR-D05-DAILY-LOG-LIST
- **Name:** DailyLogList.tsx
- **Route:** /app/documentation/daily-logs
- **Description:** Daily log entries across the facility. Chronological feed of all daily activities, observations, and events logged by staff. Filterable by resident, shift, staff member, and date.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-AUDITOR
- **Key Data:** DM-DAILY-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Chronological log feed, resident filter, shift filter (AM/PM/NOC), staff filter, date picker

### SCR-D05-DAILY-LOG-ENTRY
- **Name:** DailyLogEntry.tsx
- **Route:** /app/documentation/daily-logs/new
- **Description:** Quick daily log entry form. Select resident(s), log category (activity, meal, behavior, health, communication, other), enter brief description, and optionally attach photo. Optimized for mobile one-handed use.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-DAILY-LOG, DM-RESIDENT
- **Agent Integration:** DocuBot (voice entry option)
- **Key UI Elements:** Resident quick-selector, category buttons, text input, photo attach button, voice entry toggle, submit button

### SCR-D05-SHIFT-NOTES
- **Name:** ShiftNotes.tsx
- **Route:** /app/documentation/shift-notes
- **Description:** Shift summary notes view. Aggregates all documentation from a specific shift into a structured summary. Auto-generated by DocuBot from individual entries, editable by shift supervisor before finalization.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT-NOTE, DM-DAILY-LOG, DM-PROGRESS-NOTE
- **Agent Integration:** DocuBot (auto-summarization)
- **Key UI Elements:** Shift selector (date + AM/PM/NOC), auto-generated summary, individual entries list, edit summary button, finalize shift notes button

### SCR-D05-SOAP-NOTE
- **Name:** SoapNote.tsx
- **Route:** /app/documentation/notes/new/soap
- **Description:** SOAP (Subjective, Objective, Assessment, Plan) note template. Structured form with four sections, each with guidance prompts. Used primarily for clinical observations and nursing notes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** DocuBot (voice entry per section)
- **Key UI Elements:** Four-section form (S/O/A/P), guidance prompts per section, resident selector, vital signs quick-entry in Objective section, save/finalize buttons

### SCR-D05-DAP-NOTE
- **Name:** DapNote.tsx
- **Route:** /app/documentation/notes/new/dap
- **Description:** DAP (Data, Assessment, Plan) note template. Three-section structured form commonly used for behavioral health documentation and therapy session notes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** DocuBot (voice entry per section)
- **Key UI Elements:** Three-section form (D/A/P), section guidance prompts, resident selector, linked behavior data, save/finalize buttons

### SCR-D05-NARRATIVE-NOTE
- **Name:** NarrativeNote.tsx
- **Route:** /app/documentation/notes/new/narrative
- **Description:** Free-form narrative note template. Unstructured text entry for general observations, incident descriptions, and communication logs. Includes prompts for required elements per state regulations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** DocuBot (voice entry)
- **Key UI Elements:** Rich text editor, required elements checklist sidebar, resident selector, word count indicator, save/finalize buttons

### SCR-D05-TEMPLATE-MANAGER
- **Name:** NoteTemplateManager.tsx
- **Route:** /app/documentation/templates
- **Description:** Note template management. Create, edit, and manage custom note templates for the facility. Templates define required sections, prompts, and auto-populated fields.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-NOTE-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template list with type/name, template editor with section builder, required fields configuration, preview button, publish/unpublish toggle

### SCR-D05-NOTE-SEARCH
- **Name:** NoteSearch.tsx
- **Route:** /app/documentation/search
- **Description:** Full-text search across all documentation. Search note content, filter by resident, author, date range, note type, and keywords. Results show matching excerpts with highlighted search terms.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-DAILY-LOG
- **Agent Integration:** None
- **Key UI Elements:** Search input with keyword highlighting, filter panel (resident, author, date, type), results list with excerpt preview, result count, export results button

### SCR-D05-NOTE-BULK-EXPORT
- **Name:** NoteBulkExport.tsx
- **Route:** /app/documentation/export
- **Description:** Bulk documentation export. Select date range, residents, and note types to export as PDF or CSV. Used for audit preparation, legal requests, and record transfers.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-DAILY-LOG
- **Agent Integration:** None
- **Key UI Elements:** Date range picker, resident multi-selector, note type checkboxes, format selector (PDF/CSV), generate export button with progress indicator

### SCR-D05-NOTE-PRINT
- **Name:** NotePrint.tsx
- **Route:** /app/documentation/notes/:noteId/print
- **Description:** Print-optimized note view. Formats progress note for printing with facility header, resident information, note content, author/date, and signature lines.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Print-formatted layout, facility header, resident info block, note content, signature lines, print button

### SCR-D05-NOTE-AUDIT-TRAIL
- **Name:** NoteAuditTrail.tsx
- **Route:** /app/documentation/notes/:noteId/audit
- **Description:** Audit trail for a specific note. Shows all access events (view, edit, print, export) with user, timestamp, and IP address. Required for HIPAA compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-AUDIT-LOG
- **Agent Integration:** None
- **Key UI Elements:** Audit event table, date range filter, event type filter, user filter, export audit log button

### SCR-D05-DOC-COMPLIANCE-DASHBOARD
- **Name:** DocComplianceDashboard.tsx
- **Route:** /app/documentation/compliance
- **Description:** Documentation compliance dashboard. Shows completion rates by resident, staff, and note type. Identifies overdue documentation, unsigned notes, and documentation gaps against regulatory requirements.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT, DM-COMPLIANCE-RULE
- **Agent Integration:** Guardian (compliance scoring)
- **Key UI Elements:** Completion rate heatmap by resident, overdue documentation list, unsigned notes queue, staff compliance ranking, compliance trend chart

### SCR-D05-OVERDUE-ALERTS
- **Name:** OverdueDocAlerts.tsx
- **Route:** /app/documentation/overdue
- **Description:** Overdue documentation alerts list. Shows all documentation that is past due based on care plan schedules, regulatory requirements, and facility policies. Supports sending reminders to responsible staff.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE, DM-CARE-PLAN, DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (overdue detection)
- **Key UI Elements:** Overdue items table with resident/type/due-date, days overdue counter, responsible staff column, send reminder button, escalation status indicator

### SCR-D05-DOC-STATISTICS
- **Name:** DocStatistics.tsx
- **Route:** /app/documentation/statistics
- **Description:** Documentation productivity statistics. Charts showing notes per staff per day, average note length, voice vs text entry ratio, documentation time per note, and completion time trends.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE
- **Agent Integration:** Analytics Engine (statistical analysis)
- **Key UI Elements:** Notes per day bar chart, voice vs text pie chart, average completion time trend, staff productivity ranking, date range selector

### SCR-D05-ATTACHMENT-MANAGER
- **Name:** NoteAttachmentManager.tsx
- **Route:** /app/documentation/notes/:noteId/attachments
- **Description:** Manage attachments for a progress note. Upload photos, documents, and files. View attached items with thumbnails. Remove attachments before note finalization.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own notes)
- **Key Data:** DM-FILE, DM-PROGRESS-NOTE
- **Agent Integration:** None
- **Key UI Elements:** Attachment list with thumbnails, upload dropzone, file type indicators, remove attachment button, attachment size display

### SCR-D05-NOTE-TAGS
- **Name:** NoteTags.tsx
- **Route:** /app/documentation/tags
- **Description:** Note tagging and categorization management. Create and manage tags for organizing documentation (e.g., "fall-related", "behavior", "family-communication", "medical-appointment"). Tags enable cross-resident analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TAG, DM-PROGRESS-NOTE
- **Agent Integration:** None
- **Key UI Elements:** Tag list with usage count, create tag form, tag color picker, merge duplicate tags, tag usage analytics

### SCR-D05-CLINICAL-SUMMARY
- **Name:** ClinicalSummary.tsx
- **Route:** /app/residents/:id/clinical-summary
- **Description:** AI-generated clinical summary for a resident. Synthesizes recent progress notes, vitals, medications, and incidents into a narrative clinical summary for a specified date range. Used for physician visits, hospital transfers, and annual reviews.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROGRESS-NOTE, DM-VITAL, DM-MEDICATION, DM-INCIDENT, DM-RESIDENT
- **Agent Integration:** DocuBot (narrative generation), Sentinel (health trend synthesis)
- **Key UI Elements:** Date range selector, AI-generated narrative summary, source data references, edit generated summary, export as PDF button

### SCR-D05-DOC-TRAINING-MODE
- **Name:** DocTrainingMode.tsx
- **Route:** /app/documentation/training
- **Description:** Documentation training simulator. New staff practice writing progress notes with guided prompts, example scenarios, and AI feedback on note quality, completeness, and compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TRAINING-SCENARIO
- **Agent Integration:** Training Coach (feedback and scoring), DocuBot (voice training)
- **Key UI Elements:** Training scenario selector, practice note editor, AI feedback panel with improvement suggestions, compliance checklist scoring, completion certificate

---

# D06 — Medication Administration

### SCR-D06-MAR-DAILY
- **Name:** MarDaily.tsx
- **Route:** /app/medications/mar/daily
- **Description:** Daily Medication Administration Record. Grid view with residents as rows and scheduled medication times as columns. Each cell shows medication name, dose, route, and administration status (given/refused/held/not-available).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-MAR, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (missed dose alerts)
- **Key UI Elements:** Resident × time-slot grid, status color coding (green/red/yellow/gray), medication detail popover on cell click, shift filter tabs, print MAR button

### SCR-D06-MAR-WEEKLY
- **Name:** MarWeekly.tsx
- **Route:** /app/medications/mar/weekly
- **Description:** Weekly MAR view for a single resident. Seven-day grid showing all scheduled medications with administration status per day. Useful for identifying patterns in refusals or missed doses.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-MAR, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** 7-day medication grid, resident selector, administration status per cell, weekly compliance percentage, export/print button

### SCR-D06-MAR-MONTHLY
- **Name:** MarMonthly.tsx
- **Route:** /app/medications/mar/monthly
- **Description:** Monthly MAR view for a single resident. Calendar-style grid showing daily medication compliance. Used for monthly medication reviews and pharmacy reconciliation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-MAR, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Monthly calendar grid with daily compliance indicators, medication list sidebar, monthly compliance percentage, pharmacy reconciliation checkbox, print/export button

### SCR-D06-MED-PASS
- **Name:** MedPass.tsx
- **Route:** /app/medications/pass
- **Description:** Mobile-optimized medication pass screen. Staff selects resident (or scans QR badge), sees list of medications due now, confirms administration with timestamp, and documents refusals/holds with reason codes.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-MAR, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (allergy/interaction alerts at point of administration)
- **Key UI Elements:** Resident selector with QR scan, medications due now list, administer/refuse/hold buttons per medication, reason code dropdown for non-administration, confirmation timestamp

### SCR-D06-MED-PROFILE
- **Name:** MedProfile.tsx
- **Route:** /app/medications/:medId
- **Description:** Medication detail profile. Drug name, generic name, class, dosage form, strength, route, frequency, prescriber, pharmacy, start date, indication, and special instructions. Includes drug information reference.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Medication header with drug name/class, dosage details card, prescriber information, pharmacy contact, drug information reference link

### SCR-D06-MED-CREATE
- **Name:** MedCreate.tsx
- **Route:** /app/residents/:id/medications/new
- **Description:** New medication order entry. Select drug from formulary, enter dose, route, frequency, start date, prescriber, pharmacy, and special instructions. Runs interaction and allergy checks before saving.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION, DM-RESIDENT, DM-ALLERGY
- **Agent Integration:** Sentinel (interaction/allergy check)
- **Key UI Elements:** Drug formulary search with autocomplete, dose/route/frequency fields, prescriber selector, pharmacy selector, interaction check results panel

### SCR-D06-MED-EDIT
- **Name:** MedEdit.tsx
- **Route:** /app/medications/:medId/edit
- **Description:** Edit existing medication order. Modify dose, frequency, or instructions. Changes require physician order reference and are logged. Dose changes trigger re-verification of interactions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION
- **Agent Integration:** Sentinel (re-check interactions on dose change)
- **Key UI Elements:** Editable medication fields, physician order reference input, change reason (required), interaction re-check results, save/cancel buttons

### SCR-D06-MED-DISCONTINUE
- **Name:** MedDiscontinue.tsx
- **Route:** /app/medications/:medId/discontinue
- **Description:** Medication discontinuation form. Records discontinuation date, reason, physician order reference, and taper schedule if applicable. Notifies care team and updates MAR.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION
- **Agent Integration:** None
- **Key UI Elements:** Discontinuation date picker, reason selector, physician order reference, taper schedule fields (if applicable), confirm discontinue button

### SCR-D06-PRN-LOG
- **Name:** PrnLog.tsx
- **Route:** /app/medications/prn
- **Description:** PRN (as-needed) medication administration log. Records each PRN administration with reason, time given, dose, effectiveness assessment (30/60 minute follow-up), and staff initials.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-PRN-LOG, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (PRN frequency monitoring)
- **Key UI Elements:** PRN administration list with resident/medication/time, reason for administration, effectiveness follow-up timer, follow-up assessment entry, frequency trend indicator

### SCR-D06-CONTROLLED-SUBSTANCE-LOG
- **Name:** ControlledSubstanceLog.tsx
- **Route:** /app/medications/controlled
- **Description:** Controlled substance tracking log. Documents receipt, administration, waste, and count for all Schedule II-V medications. Requires dual-signature for waste. Running count per medication.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CONTROLLED-SUBSTANCE-LOG, DM-MEDICATION
- **Agent Integration:** Guardian (count discrepancy alerts)
- **Key UI Elements:** Substance list with running count, administration entry with dual-signature, waste documentation with witness, count verification form, discrepancy alert

### SCR-D06-MED-COUNT-SHEET
- **Name:** MedCountSheet.tsx
- **Route:** /app/medications/count
- **Description:** Shift medication count sheet. Staff counts all controlled substances at shift change, records counts, and both outgoing and incoming staff sign. Discrepancies trigger immediate investigation.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-CONTROLLED-SUBSTANCE-LOG, DM-MEDICATION
- **Agent Integration:** Guardian (discrepancy detection)
- **Key UI Elements:** Medication count table with expected/actual columns, outgoing staff signature, incoming staff signature, discrepancy flag, investigation trigger button

### SCR-D06-MED-ERROR-REPORT
- **Name:** MedErrorReport.tsx
- **Route:** /app/medications/errors/new
- **Description:** Medication error reporting form. Documents error type (wrong drug/dose/time/route/resident), discovery method, resident impact, corrective actions taken, and physician notification.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-MED-ERROR, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Advocate (error investigation)
- **Key UI Elements:** Error type selector, medication/resident involved, description of error, actions taken checklist, physician notification confirmation

### SCR-D06-MED-ERROR-LIST
- **Name:** MedErrorList.tsx
- **Route:** /app/medications/errors
- **Description:** Medication error registry. List of all reported medication errors with date, type, severity, resident, staff involved, and investigation status. Supports trend analysis filtering.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-MED-ERROR
- **Agent Integration:** Analytics Engine (error trend analysis)
- **Key UI Elements:** Error list table, severity filter, date range filter, error type distribution chart, investigation status badges

### SCR-D06-MED-INTERACTION-CHECKER
- **Name:** MedInteractionChecker.tsx
- **Route:** /app/medications/interactions
- **Description:** Drug interaction checking tool. Enter or select medications to check for interactions. Displays severity level, clinical significance, and recommended actions for each identified interaction.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION, DM-DRUG-INTERACTION
- **Agent Integration:** Sentinel (interaction database)
- **Key UI Elements:** Medication multi-selector, interaction results list with severity badges, clinical significance descriptions, recommended actions, resident medication profile quick-load

### SCR-D06-ALLERGY-ALERTS
- **Name:** AllergyAlerts.tsx
- **Route:** /app/medications/allergies
- **Description:** Medication allergy management. View and manage resident allergies with reaction type, severity, and documentation date. Cross-references with current medications for active alerts.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-ALLERGY, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (allergy-medication cross-check)
- **Key UI Elements:** Allergy list per resident, reaction type/severity badges, active medication conflict alerts, add/edit allergy form, allergy band print button

### SCR-D06-PHARMACY-DASHBOARD
- **Name:** PharmacyDashboard.tsx
- **Route:** /app/medications/pharmacy
- **Description:** Pharmacy integration dashboard. Shows pending orders, delivery status, formulary updates, and communication log with pharmacy provider. Supports electronic prescription transmission.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PHARMACY-ORDER, DM-MEDICATION
- **Agent Integration:** None
- **Key UI Elements:** Pending orders queue, delivery tracking status, formulary search, pharmacy contact card, order history table

### SCR-D06-MED-REORDER
- **Name:** MedReorder.tsx
- **Route:** /app/medications/reorder
- **Description:** Medication reorder alerts and management. Shows medications approaching reorder point based on current supply and administration rate. Supports one-click reorder to pharmacy.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION, DM-PHARMACY-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Low-stock medication list with days remaining, reorder button per medication, auto-reorder toggle, reorder history, pharmacy contact

### SCR-D06-MED-INVENTORY
- **Name:** MedInventory.tsx
- **Route:** /app/medications/inventory
- **Description:** Medication inventory management. Current stock levels for all medications, lot numbers, expiration dates, storage location, and receipt/dispensing history.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION-INVENTORY
- **Agent Integration:** None
- **Key UI Elements:** Inventory table with stock level/lot/expiration, expiring soon alerts, receipt entry form, dispensing log, inventory audit button

### SCR-D06-MED-DESTRUCTION
- **Name:** MedDestruction.tsx
- **Route:** /app/medications/destruction
- **Description:** Medication destruction log. Documents destruction of expired, discontinued, or returned medications. Requires dual-witness signatures and records destruction method.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MED-DESTRUCTION-LOG
- **Agent Integration:** Guardian (destruction compliance)
- **Key UI Elements:** Destruction entry form with medication/quantity/reason, destruction method selector, witness 1 signature, witness 2 signature, destruction log history

### SCR-D06-MED-CONSENT
- **Name:** MedConsent.tsx
- **Route:** /app/medications/consent
- **Description:** Medication consent form management. Track informed consent for psychotropic medications, experimental treatments, and high-risk medications. Includes consent expiration tracking.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CONSENT, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Guardian (consent expiration alerts)
- **Key UI Elements:** Consent status table per resident/medication, consent form viewer, expiration date alerts, renewal workflow button, consent history

### SCR-D06-MED-TRAINING
- **Name:** MedTraining.tsx
- **Route:** /app/medications/training
- **Description:** Medication administration training and competency tracking. Documents staff completion of medication administration training, competency assessments, and annual recertification.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRAINING-RECORD, DM-STAFF
- **Agent Integration:** Training Coach (competency assessment)
- **Key UI Elements:** Staff competency table, training completion status, assessment score display, recertification due dates, training material links

### SCR-D06-MED-RECONCILIATION
- **Name:** MedReconciliation.tsx
- **Route:** /app/residents/:id/medications/reconciliation
- **Description:** Medication reconciliation form. Used during admission, transfer, and discharge to compare medication lists from different sources and resolve discrepancies. Documents reconciliation decisions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (discrepancy detection)
- **Key UI Elements:** Side-by-side medication list comparison, discrepancy highlight, resolution action per discrepancy (continue/discontinue/modify), reconciliation signature, print reconciliation form

---

# D07 — Health Monitoring & Vitals

### SCR-D07-VITALS-DASHBOARD
- **Name:** VitalsDashboard.tsx
- **Route:** /app/residents/:id/vitals
- **Description:** Per-resident vitals dashboard. Displays latest readings for blood pressure, heart rate, temperature, respiratory rate, oxygen saturation, weight, and blood glucose with trend sparklines and normal range indicators.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (anomaly detection, trend alerts)
- **Key UI Elements:** Vital sign cards with current value and trend sparkline, normal range indicator bars, last recorded timestamp, record new vitals button, alert threshold configuration

### SCR-D07-VITALS-ENTRY
- **Name:** VitalsEntry.tsx
- **Route:** /app/residents/:id/vitals/new
- **Description:** Vital signs entry form. Mobile-optimized for bedside data collection. Enter BP (systolic/diastolic), pulse, temperature, respirations, O2 sat, weight, and blood glucose. Position and method documented.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (immediate out-of-range alerts on entry)
- **Key UI Elements:** Numeric input fields per vital sign, position selector (sitting/standing/lying), method selector per vital, out-of-range warning on entry, submit with timestamp

### SCR-D07-VITALS-TRENDS
- **Name:** VitalsTrends.tsx
- **Route:** /app/residents/:id/vitals/trends
- **Description:** Vital sign trend charts over configurable time periods. Line charts for each vital sign with normal range shading, data points, and trend lines. Supports overlay of multiple vitals.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (trend analysis), Analytics Engine (statistical projections)
- **Key UI Elements:** Multi-line chart with vital sign selector, date range picker, normal range shading, data point hover details, export chart button

### SCR-D07-WEIGHT-TRACKING
- **Name:** WeightTracking.tsx
- **Route:** /app/residents/:id/vitals/weight
- **Description:** Weight tracking chart and history. Line chart showing weight over time with BMI calculation, significant change alerts (5% in 30 days, 10% in 180 days), and dietary referral triggers.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (significant weight change alerts), Nutrition Specialist (dietary referral)
- **Key UI Elements:** Weight trend line chart, BMI calculation display, significant change alert banner, weight entry form, dietary referral trigger button

### SCR-D07-BP-TRACKING
- **Name:** BpTracking.tsx
- **Route:** /app/residents/:id/vitals/blood-pressure
- **Description:** Blood pressure tracking with systolic/diastolic trend chart, hypertension/hypotension classification per reading, positional BP comparison, and medication correlation view.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-VITAL, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (BP classification alerts)
- **Key UI Elements:** Dual-line chart (systolic/diastolic), classification color bands, positional comparison table, medication overlay toggle, BP entry form

### SCR-D07-GLUCOSE-TRACKING
- **Name:** GlucoseTracking.tsx
- **Route:** /app/residents/:id/vitals/glucose
- **Description:** Blood glucose monitoring for diabetic residents. Tracks fasting, pre-meal, post-meal, and bedtime readings. Displays A1C estimates, insulin sliding scale reference, and hypo/hyperglycemia alerts.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-VITAL, DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Sentinel (glucose range alerts)
- **Key UI Elements:** Glucose trend chart with meal-time markers, target range shading, insulin sliding scale reference card, A1C estimate display, glucose entry form with meal context

### SCR-D07-SEIZURE-LOG
- **Name:** SeizureLog.tsx
- **Route:** /app/residents/:id/health/seizures
- **Description:** Seizure event log for residents with epilepsy. Documents seizure type, duration, triggers, post-ictal state, interventions, and emergency response. Includes seizure action plan reference.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-SEIZURE-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (seizure frequency monitoring), Emergency Coordinator (emergency protocol)
- **Key UI Elements:** Seizure event list with date/type/duration, seizure entry form, seizure action plan card, frequency trend chart, emergency protocol quick-reference

### SCR-D07-SEIZURE-CHART
- **Name:** SeizureChart.tsx
- **Route:** /app/residents/:id/health/seizures/chart
- **Description:** Seizure frequency and pattern visualization. Calendar heatmap showing seizure days, frequency trend chart, type distribution, and time-of-day pattern analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-SEIZURE-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (pattern detection), Analytics Engine (statistical analysis)
- **Key UI Elements:** Calendar heatmap with seizure frequency, frequency trend line chart, seizure type pie chart, time-of-day distribution, medication correlation overlay

### SCR-D07-BOWEL-BLADDER
- **Name:** BowelBladder.tsx
- **Route:** /app/residents/:id/health/bowel-bladder
- **Description:** Bowel and bladder tracking log. Documents bowel movements (date, time, consistency using Bristol scale, amount) and bladder output. Tracks continence program compliance.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-BOWEL-BLADDER-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (constipation alerts — no BM in 3+ days)
- **Key UI Elements:** Daily tracking grid, Bristol stool scale reference, continence program schedule, constipation alert indicator, weekly summary view

### SCR-D07-SLEEP-TRACKING
- **Name:** SleepTracking.tsx
- **Route:** /app/residents/:id/health/sleep
- **Description:** Sleep monitoring log. Documents bedtime, wake time, sleep quality, nighttime awakenings, and sleep-related behaviors. Tracks sleep patterns for residents with sleep disorders.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-SLEEP-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (sleep pattern anomaly detection)
- **Key UI Elements:** Sleep log entry form, sleep duration bar chart, sleep quality trend, nighttime awakening frequency, weekly sleep pattern summary

### SCR-D07-PAIN-ASSESSMENT
- **Name:** PainAssessment.tsx
- **Route:** /app/residents/:id/health/pain
- **Description:** Pain assessment tool. Supports multiple scales (numeric 0-10, Wong-Baker faces, FLACC for non-verbal residents). Documents pain location (body map), character, duration, aggravating/relieving factors, and interventions.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-PAIN-ASSESSMENT, DM-RESIDENT
- **Agent Integration:** Sentinel (pain trend monitoring)
- **Key UI Elements:** Pain scale selector (numeric/faces/FLACC), body map for location marking, pain characteristics checklist, intervention documentation, pain trend chart

### SCR-D07-SCREENING-SCHEDULE
- **Name:** ScreeningSchedule.tsx
- **Route:** /app/health/screenings/schedule
- **Description:** Health screening schedule for all residents. Calendar view showing due dates for annual physicals, dental exams, vision/hearing screenings, TB tests, and specialty appointments.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SCREENING-SCHEDULE, DM-RESIDENT
- **Agent Integration:** Guardian (overdue screening alerts)
- **Key UI Elements:** Calendar with screening due dates, resident filter, screening type filter, overdue screening highlight, schedule appointment button

### SCR-D07-SCREENING-RESULTS
- **Name:** ScreeningResults.tsx
- **Route:** /app/residents/:id/health/screenings
- **Description:** Health screening results for a resident. Lists all completed screenings with date, type, provider, results, and follow-up recommendations. Supports document upload for external results.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-SCREENING-RESULT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Screening results table, result document viewer, follow-up recommendation notes, upload external results, next screening due date

### SCR-D07-PHYSICIAN-ORDERS
- **Name:** PhysicianOrders.tsx
- **Route:** /app/residents/:id/health/orders
- **Description:** Physician orders list for a resident. Active and historical orders with order date, physician, order text, implementation status, and expiration date.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PHYSICIAN-ORDER, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Active orders list, order detail expansion, implementation status badges, expired orders toggle, new order entry form

### SCR-D07-ORDER-DETAIL
- **Name:** OrderDetail.tsx
- **Route:** /app/residents/:id/health/orders/:orderId
- **Description:** Single physician order detail. Full order text, physician name/credentials, order date, implementation date, responsible staff, and related documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-PHYSICIAN-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Order text display, physician information, implementation timeline, related documentation links, order modification history

### SCR-D07-ORDER-CREATE
- **Name:** OrderCreate.tsx
- **Route:** /app/residents/:id/health/orders/new
- **Description:** New physician order entry. Transcribe verbal/telephone orders with read-back confirmation, or enter written orders. Requires physician signature within regulatory timeframe.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PHYSICIAN-ORDER, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Order type selector (verbal/telephone/written), order text input, physician selector, read-back confirmation checkbox, signature pending indicator

### SCR-D07-LAB-RESULTS
- **Name:** LabResults.tsx
- **Route:** /app/residents/:id/health/labs
- **Description:** Laboratory results tracker. Displays lab results with reference ranges, abnormal value flagging, and trend charts for recurring tests (CBC, CMP, lipid panel, thyroid, etc.).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-LAB-RESULT, DM-RESIDENT
- **Agent Integration:** Sentinel (abnormal result alerts)
- **Key UI Elements:** Lab results table with reference ranges, abnormal value highlighting, trend chart per test type, result document upload, physician notification status

### SCR-D07-IMMUNIZATION-RECORD
- **Name:** ImmunizationRecord.tsx
- **Route:** /app/residents/:id/health/immunizations
- **Description:** Immunization history and tracking. Documents all vaccinations with date, type, lot number, site, administrator, and next due date. Tracks flu, COVID, pneumonia, hepatitis, and tetanus series.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-IMMUNIZATION, DM-RESIDENT
- **Agent Integration:** Guardian (immunization compliance)
- **Key UI Elements:** Immunization table with vaccine/date/lot columns, due/overdue indicators, immunization entry form, consent documentation link, print immunization record

### SCR-D07-ANNUAL-PHYSICAL
- **Name:** AnnualPhysical.tsx
- **Route:** /app/residents/:id/health/annual-physical
- **Description:** Annual physical examination tracker. Documents last physical date, physician, findings, follow-up orders, and next physical due date. Supports uploading external physical exam reports.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-SCREENING-RESULT, DM-PHYSICIAN-ORDER, DM-RESIDENT
- **Agent Integration:** Guardian (annual physical compliance)
- **Key UI Elements:** Last physical summary card, findings documentation, follow-up orders list, upload external report, next physical due date with reminder

### SCR-D07-HEALTH-ALERT-CONFIG
- **Name:** HealthAlertConfig.tsx
- **Route:** /app/health/alert-config
- **Description:** Health alert threshold configuration. Set custom alert thresholds per vital sign per resident (or facility defaults). Configure alert escalation rules and notification recipients.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ALERT-CONFIG, DM-RESIDENT
- **Agent Integration:** Sentinel (alert engine configuration)
- **Key UI Elements:** Vital sign threshold sliders per resident, facility default settings, escalation rule builder, notification recipient selector, test alert button

---

# D08 — Incident & Behavior Management

### SCR-D08-INCIDENT-LIST
- **Name:** IncidentList.tsx
- **Route:** /app/incidents
- **Description:** Facility-wide incident registry. Table of all incidents with date, type (fall, elopement, injury, medication error, behavioral, property damage, abuse/neglect allegation), severity, resident, status (open/investigating/closed), and assigned investigator.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INCIDENT, DM-RESIDENT
- **Agent Integration:** Advocate (investigation status)
- **Key UI Elements:** Incident table with sortable columns, type/severity/status filters, date range picker, export button, create new incident button

### SCR-D08-INCIDENT-DETAIL
- **Name:** IncidentDetail.tsx
- **Route:** /app/incidents/:incidentId
- **Description:** Full incident report view. Includes incident description, date/time/location, persons involved, witnesses, immediate actions taken, injuries sustained, notifications made, investigation findings, and corrective actions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INCIDENT, DM-RESIDENT, DM-STAFF
- **Agent Integration:** Advocate (investigation findings)
- **Key UI Elements:** Incident header with type/severity/status, description section, persons involved list, actions taken checklist, investigation findings section, corrective action links

### SCR-D08-INCIDENT-CREATE
- **Name:** IncidentCreate.tsx
- **Route:** /app/incidents/new
- **Description:** Incident report creation form. Multi-section form: what happened, when/where, who was involved, immediate actions taken, injuries, notifications, and witness statements. Supports photo attachment and voice-to-text.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-INCIDENT, DM-RESIDENT
- **Agent Integration:** DocuBot (voice-to-text incident description)
- **Key UI Elements:** Incident type selector, date/time/location fields, description textarea with voice option, persons involved multi-selector, injury documentation, photo upload

### SCR-D08-INCIDENT-EDIT
- **Name:** IncidentEdit.tsx
- **Route:** /app/incidents/:incidentId/edit
- **Description:** Edit incident report. Add supplemental information, update investigation status, attach additional documentation. Original report preserved; edits tracked as addenda.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-INCIDENT
- **Agent Integration:** None
- **Key UI Elements:** Editable incident fields, addendum section, edit reason input, attachment upload, save addendum button

### SCR-D08-INVESTIGATION
- **Name:** IncidentInvestigation.tsx
- **Route:** /app/incidents/:incidentId/investigation
- **Description:** Incident investigation workspace. Advocate agent assists with root cause analysis. Documents investigation steps, evidence collected, interviews conducted, contributing factors, root cause determination, and recommendations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-INCIDENT, DM-INVESTIGATION
- **Agent Integration:** Advocate (root cause analysis, sub-agent coordination)
- **Key UI Elements:** Investigation timeline, evidence collection log, interview notes section, contributing factors checklist, root cause determination form, AI-assisted analysis panel

### SCR-D08-ROOT-CAUSE-ANALYSIS
- **Name:** RootCauseAnalysis.tsx
- **Route:** /app/incidents/:incidentId/rca
- **Description:** Structured root cause analysis form. Fishbone diagram builder, 5-Why analysis template, contributing factor categorization (human, process, equipment, environment), and root cause determination with evidence linkage.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-INVESTIGATION, DM-INCIDENT
- **Agent Integration:** Advocate (AI-assisted factor analysis)
- **Key UI Elements:** Fishbone diagram interactive builder, 5-Why analysis template, contributing factor category selector, evidence linkage per factor, root cause summary

### SCR-D08-CAP-LIST
- **Name:** CapList.tsx
- **Route:** /app/corrective-actions
- **Description:** Corrective Action Plan (CAP) registry. Lists all active and completed CAPs with incident reference, responsible person, target date, status, and completion percentage.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION, DM-INCIDENT
- **Agent Integration:** Guardian (CAP compliance tracking)
- **Key UI Elements:** CAP table with status/progress columns, overdue CAP highlight, status filter, responsible person filter, create new CAP button

### SCR-D08-CAP-DETAIL
- **Name:** CapDetail.tsx
- **Route:** /app/corrective-actions/:capId
- **Description:** Single CAP detail view. Shows action items, responsible persons, target dates, completion status per item, evidence of completion, and effectiveness review.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION, DM-CAP-ITEM
- **Agent Integration:** None
- **Key UI Elements:** Action items checklist with status, responsible person per item, target/completion dates, evidence upload per item, effectiveness review section

### SCR-D08-CAP-CREATE
- **Name:** CapCreate.tsx
- **Route:** /app/corrective-actions/new
- **Description:** Create new Corrective Action Plan. Link to incident/investigation, define action items with responsible persons and target dates, set review schedule, and route for approval.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CORRECTIVE-ACTION, DM-INCIDENT
- **Agent Integration:** Advocate (suggests corrective actions based on root cause)
- **Key UI Elements:** Incident linker, action item builder, responsible person selector per item, target date picker, review schedule, approval routing

### SCR-D08-CAP-TRACKING
- **Name:** CapTracking.tsx
- **Route:** /app/corrective-actions/:capId/tracking
- **Description:** CAP progress tracking dashboard. Gantt-style view of action items with completion status, overdue items highlighted, and overall CAP completion percentage.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION, DM-CAP-ITEM
- **Agent Integration:** Guardian (overdue tracking)
- **Key UI Elements:** Gantt chart of action items, completion percentage gauge, overdue items alert list, update status buttons, evidence upload per item

### SCR-D08-BEHAVIOR-LOG
- **Name:** BehaviorLog.tsx
- **Route:** /app/residents/:id/behaviors
- **Description:** Behavior tracking log for a resident. Chronological list of behavior events with date, time, behavior type, antecedent, consequence, duration, intensity, and staff response.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-BEHAVIOR-DATA, DM-RESIDENT
- **Agent Integration:** Advocate (behavior pattern analysis)
- **Key UI Elements:** Behavior event list, quick-entry form, behavior type filter, date range filter, frequency summary

### SCR-D08-BEHAVIOR-ENTRY
- **Name:** BehaviorEntry.tsx
- **Route:** /app/residents/:id/behaviors/new
- **Description:** Behavior data entry form. Mobile-optimized for real-time documentation. Records antecedent (what happened before), behavior (what the resident did), consequence (what happened after), duration, intensity, and staff intervention.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-BEHAVIOR-DATA, DM-RESIDENT
- **Agent Integration:** DocuBot (voice entry)
- **Key UI Elements:** ABC data entry fields, behavior type quick-select buttons, duration timer, intensity scale, intervention description, submit button

### SCR-D08-BEHAVIOR-TRENDS
- **Name:** BehaviorTrends.tsx
- **Route:** /app/residents/:id/behaviors/trends
- **Description:** Behavior trend analysis dashboard. Charts showing behavior frequency over time, time-of-day patterns, antecedent distribution, and intervention effectiveness. Supports multi-behavior comparison.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-BEHAVIOR-DATA, DM-RESIDENT
- **Agent Integration:** Advocate (pattern analysis), Analytics Engine (statistical trends)
- **Key UI Elements:** Frequency trend line chart, time-of-day heatmap, antecedent pie chart, intervention effectiveness bar chart, date range selector

### SCR-D08-BEHAVIOR-INTERVENTION-PLAN
- **Name:** BehaviorInterventionPlan.tsx
- **Route:** /app/residents/:id/behaviors/intervention-plan
- **Description:** Behavior intervention plan viewer/editor. Tiered intervention strategies (prevention, de-escalation, crisis), replacement behaviors, reinforcement schedules, and crisis protocol.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-AUDITOR
- **Key Data:** DM-CARE-PLAN, DM-BEHAVIOR-DATA, DM-RESIDENT
- **Agent Integration:** Compass (intervention recommendations)
- **Key UI Elements:** Tiered intervention display (green/yellow/red), replacement behavior descriptions, reinforcement schedule, crisis protocol steps, staff quick-reference card

### SCR-D08-CRISIS-PROTOCOL
- **Name:** CrisisProtocol.tsx
- **Route:** /app/residents/:id/behaviors/crisis
- **Description:** Crisis intervention protocol for a resident. Step-by-step crisis response procedures, emergency contacts, approved physical intervention techniques (if any), and post-crisis debriefing checklist.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-CRISIS-PROTOCOL, DM-RESIDENT
- **Agent Integration:** Emergency Coordinator (crisis activation)
- **Key UI Elements:** Step-by-step crisis response, emergency contact quick-dial, approved intervention techniques, post-crisis debrief form, crisis history log

### SCR-D08-RESTRAINT-LOG
- **Name:** RestraintLog.tsx
- **Route:** /app/incidents/restraints
- **Description:** Restraint and restriction use log. Documents all instances of physical restraint, mechanical restraint, or rights restrictions with type, duration, reason, physician order, and monitoring checks.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-RESTRAINT-LOG, DM-RESIDENT
- **Agent Integration:** Guardian (restraint compliance monitoring)
- **Key UI Elements:** Restraint event table, duration tracking, monitoring check log, physician order reference, reduction trend chart

### SCR-D08-RESTRAINT-REPORTING
- **Name:** RestraintReporting.tsx
- **Route:** /app/incidents/restraints/report
- **Description:** Restraint use reporting for regulatory submission. Aggregates restraint data by type, resident, frequency, and duration. Generates reports in state-required formats.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-RESTRAINT-LOG
- **Agent Integration:** Guardian (regulatory format compliance)
- **Key UI Elements:** Restraint summary statistics, type distribution chart, frequency trend, duration analysis, generate regulatory report button

### SCR-D08-INCIDENT-NOTIFICATIONS
- **Name:** IncidentNotifications.tsx
- **Route:** /app/incidents/:incidentId/notifications
- **Description:** Incident notification workflow tracker. Documents all required notifications: guardian/family, physician, administrator, regulatory agency, law enforcement (if applicable). Tracks notification status and timestamps.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-INCIDENT-NOTIFICATION, DM-INCIDENT
- **Agent Integration:** None
- **Key UI Elements:** Required notification checklist, notification status (sent/pending/not-required), timestamp per notification, send notification button, notification template selector

### SCR-D08-REGULATORY-REPORTING
- **Name:** IncidentRegulatoryReporting.tsx
- **Route:** /app/incidents/:incidentId/regulatory
- **Description:** Regulatory incident reporting. Generates state-specific incident reports for submission to licensing agencies. Auto-populates from incident data, allows review before submission.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INCIDENT, DM-REGULATORY-REPORT
- **Agent Integration:** Guardian (state-specific format compliance)
- **Key UI Elements:** State-specific report form, auto-populated fields from incident, review/edit before submission, submission confirmation, submission tracking

### SCR-D08-INCIDENT-DASHBOARD
- **Name:** IncidentDashboard.tsx
- **Route:** /app/incidents/dashboard
- **Description:** Incident analytics dashboard. Charts showing incident frequency trends, type distribution, severity breakdown, time-of-day patterns, location hotspots, and staff involvement analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INCIDENT
- **Agent Integration:** Analytics Engine (trend analysis), Advocate (pattern detection)
- **Key UI Elements:** Incident frequency trend chart, type distribution pie chart, severity bar chart, time-of-day heatmap, location map, date range selector

### SCR-D08-PATTERN-DETECTION
- **Name:** IncidentPatternDetection.tsx
- **Route:** /app/incidents/patterns
- **Description:** AI-powered incident pattern detection. Advocate agent analyzes incident data to identify recurring patterns, correlations between incidents, and predictive risk factors.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-INCIDENT, DM-BEHAVIOR-DATA
- **Agent Integration:** Advocate (primary — pattern analysis), Sentinel (risk correlation)
- **Key UI Elements:** Detected pattern cards with confidence scores, pattern detail with supporting evidence, risk factor correlation matrix, recommended preventive actions, pattern history

### SCR-D08-NEAR-MISS
- **Name:** NearMissReport.tsx
- **Route:** /app/incidents/near-miss/new
- **Description:** Near-miss event reporting form. Documents events that could have resulted in an incident but were prevented or did not result in harm. Used for proactive safety improvement.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-NEAR-MISS, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Near-miss description form, potential severity assessment, prevention factor documentation, contributing factors, improvement suggestion field

---

# D09 — Compliance & Regulatory

### SCR-D09-COMPLIANCE-DASHBOARD
- **Name:** ComplianceDashboard.tsx
- **Route:** /app/compliance
- **Description:** Facility compliance overview dashboard. Displays overall compliance score, scores by category (documentation, staffing, health/safety, resident rights, physical plant), overdue tasks count, upcoming deadlines, and recent regulatory changes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-COMPLIANCE-SCORE, DM-COMPLIANCE-TASK, DM-FACILITY
- **Agent Integration:** Guardian (compliance scoring engine)
- **Key UI Elements:** Overall compliance score gauge, category score cards, overdue tasks counter, upcoming deadlines timeline, regulatory change alerts

### SCR-D09-STATE-CHECKLIST
- **Name:** StateChecklist.tsx
- **Route:** /app/compliance/checklist/:stateCode
- **Description:** State-specific compliance checklist. Comprehensive list of all regulatory requirements for the facility's licensing state, with compliance status per item, evidence links, and last verified date.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-COMPLIANCE-RULE, DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (auto-verification of checkable items)
- **Key UI Elements:** Checklist with pass/fail/NA per item, regulation reference per item, evidence document link, last verified date, compliance percentage by section

### SCR-D09-TASK-LIST
- **Name:** ComplianceTaskList.tsx
- **Route:** /app/compliance/tasks
- **Description:** Compliance task management. All compliance-related tasks with due dates, assigned staff, priority, category, and completion status. Supports recurring task scheduling.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (task generation from regulatory requirements)
- **Key UI Elements:** Task table with due date/assignee/status, priority filter, category filter, overdue highlight, create task button

### SCR-D09-TASK-DETAIL
- **Name:** ComplianceTaskDetail.tsx
- **Route:** /app/compliance/tasks/:taskId
- **Description:** Single compliance task detail. Task description, regulatory reference, assigned staff, due date, completion steps, evidence requirements, and completion documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMPLIANCE-TASK
- **Agent Integration:** None
- **Key UI Elements:** Task description with regulatory reference, completion steps checklist, evidence upload, assigned staff, mark complete button

### SCR-D09-DOCUMENT-LIBRARY
- **Name:** ComplianceDocLibrary.tsx
- **Route:** /app/compliance/documents
- **Description:** Compliance document library. Repository of all compliance-related documents: policies, procedures, regulations, survey reports, plans of correction, and training materials. Organized by category with version control.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** Document list with category/version/date, search bar, category filter sidebar, document viewer, upload new document button

### SCR-D09-DOCUMENT-UPLOAD
- **Name:** ComplianceDocUpload.tsx
- **Route:** /app/compliance/documents/upload
- **Description:** Compliance document upload form. Upload documents with metadata: title, category, effective date, expiration date, review schedule, and access permissions.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** File upload dropzone, title/category/date fields, expiration date picker, review schedule selector, access permission settings

### SCR-D09-DOC-EXPIRATION
- **Name:** ComplianceDocExpiration.tsx
- **Route:** /app/compliance/documents/expiring
- **Description:** Document expiration tracker. Lists all compliance documents approaching expiration with days remaining, responsible person, and renewal status. Supports automated renewal reminders.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-DOCUMENT
- **Agent Integration:** Guardian (expiration monitoring)
- **Key UI Elements:** Expiring documents table sorted by days remaining, renewal status badges, responsible person column, send reminder button, renewal workflow link

### SCR-D09-SURVEY-READINESS
- **Name:** SurveyReadiness.tsx
- **Route:** /app/compliance/survey-readiness
- **Description:** Survey readiness dashboard. Aggregated view of all compliance areas with readiness scores. Identifies gaps that would be flagged during a regulatory survey. Includes mock survey scheduling.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-COMPLIANCE-SCORE, DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (readiness scoring), Quality Assurance (gap analysis)
- **Key UI Elements:** Readiness score by category, gap identification list, remediation priority ranking, mock survey schedule button, historical survey scores

### SCR-D09-SURVEY-PREP-CHECKLIST
- **Name:** SurveyPrepChecklist.tsx
- **Route:** /app/compliance/survey-prep
- **Description:** Pre-survey preparation checklist. Step-by-step preparation tasks organized by survey day timeline (30 days before, 7 days before, day-of). Tracks completion of each preparation item.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (checklist generation)
- **Key UI Elements:** Timeline-organized checklist, completion checkboxes, responsible person per item, days-until-survey countdown, preparation progress percentage

### SCR-D09-MOCK-SURVEY
- **Name:** MockSurvey.tsx
- **Route:** /app/compliance/mock-survey
- **Description:** Mock survey tool. Simulates a regulatory survey with randomized resident selection, document requests, and observation scenarios. Generates findings report with severity ratings.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-COMPLIANCE-RULE, DM-RESIDENT, DM-DOCUMENT
- **Agent Integration:** Quality Assurance (survey simulation), Guardian (finding generation)
- **Key UI Elements:** Start mock survey button, survey progress tracker, finding entry form, severity rating per finding, generate findings report button

### SCR-D09-DEFICIENCY-TRACKER
- **Name:** DeficiencyTracker.tsx
- **Route:** /app/compliance/deficiencies
- **Description:** Survey deficiency tracking. Lists all deficiencies from actual and mock surveys with citation reference, severity, status (open/POC submitted/corrected/verified), and plan of correction link.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-DEFICIENCY, DM-CORRECTIVE-ACTION
- **Agent Integration:** Guardian (deficiency tracking)
- **Key UI Elements:** Deficiency table with citation/severity/status, POC link per deficiency, correction deadline, verification status, trend chart

### SCR-D09-POC-LIST
- **Name:** PocList.tsx
- **Route:** /app/compliance/plans-of-correction
- **Description:** Plans of Correction registry. Lists all POCs with survey date, deficiency count, submission deadline, approval status, and implementation progress.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION
- **Agent Integration:** None
- **Key UI Elements:** POC table with dates/status, implementation progress bars, submission deadline countdown, approval status badges, create new POC button

### SCR-D09-POC-DETAIL
- **Name:** PocDetail.tsx
- **Route:** /app/compliance/plans-of-correction/:pocId
- **Description:** Single Plan of Correction detail. Lists each deficiency with corrective action, responsible person, target date, implementation steps, and evidence of correction.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION, DM-DEFICIENCY
- **Agent Integration:** None
- **Key UI Elements:** Deficiency list with corrective actions, implementation timeline, evidence upload per action, responsible person assignments, submission/approval status

### SCR-D09-POC-CREATE
- **Name:** PocCreate.tsx
- **Route:** /app/compliance/plans-of-correction/new
- **Description:** Create Plan of Correction. Link to survey deficiencies, define corrective actions per deficiency, assign responsible persons, set target dates, and prepare for regulatory submission.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-CORRECTIVE-ACTION, DM-DEFICIENCY
- **Agent Integration:** Advocate (suggests corrective actions), Guardian (regulatory format compliance)
- **Key UI Elements:** Deficiency linker, corrective action builder per deficiency, responsible person selector, target date picker, preview submission format

### SCR-D09-REGULATORY-ALERTS
- **Name:** RegulatoryAlerts.tsx
- **Route:** /app/compliance/regulatory-alerts
- **Description:** Regulatory change monitoring. Displays recent and upcoming regulatory changes relevant to the facility's licensing state. Includes impact assessment and required action items.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-REGULATORY-CHANGE
- **Agent Integration:** Guardian (regulatory monitoring)
- **Key UI Elements:** Regulatory change feed, impact severity badges, affected area tags, required action items, effective date timeline

### SCR-D09-REGULATORY-CALENDAR
- **Name:** RegulatoryCalendar.tsx
- **Route:** /app/compliance/calendar
- **Description:** Regulatory deadline calendar. Shows all compliance-related deadlines: license renewals, certification expirations, report submission dates, training deadlines, and survey windows.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMPLIANCE-TASK
- **Agent Integration:** Guardian (deadline tracking)
- **Key UI Elements:** Monthly calendar with deadline markers, deadline type color coding, upcoming deadlines list, reminder configuration, export calendar

### SCR-D09-LICENSE-TRACKER
- **Name:** LicenseTracker.tsx
- **Route:** /app/compliance/licenses
- **Description:** Facility licensing renewal tracker. Documents all required licenses with issue date, expiration date, renewal requirements, and renewal status. Supports multi-state tracking for multi-facility operators.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-LICENSE, DM-FACILITY
- **Agent Integration:** Guardian (expiration alerts)
- **Key UI Elements:** License table with expiration dates, renewal status badges, renewal requirements checklist, document upload, multi-facility view

### SCR-D09-CERTIFICATION-TRACKER
- **Name:** CertificationTracker.tsx
- **Route:** /app/compliance/certifications
- **Description:** Facility certification tracking. Tracks Medicaid/Medicare certification, accreditation status (CARF, Joint Commission), and specialty certifications with renewal timelines.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-CERTIFICATION, DM-FACILITY
- **Agent Integration:** Guardian (certification compliance)
- **Key UI Elements:** Certification cards with status/expiration, renewal timeline, required documentation checklist, certification document upload, accreditation body contact

### SCR-D09-HIPAA-MONITOR
- **Name:** HipaaMonitor.tsx
- **Route:** /app/compliance/hipaa
- **Description:** HIPAA compliance monitoring dashboard. Tracks PHI access patterns, security incidents, training completion, risk assessment status, and BAA management.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AUDIT-LOG, DM-TRAINING-RECORD, DM-SECURITY-INCIDENT
- **Agent Integration:** Guardian (HIPAA compliance scoring)
- **Key UI Elements:** PHI access audit summary, security incident log, training compliance percentage, risk assessment status, BAA tracker

### SCR-D09-PRIVACY-INCIDENT
- **Name:** PrivacyIncidentLog.tsx
- **Route:** /app/compliance/privacy-incidents
- **Description:** Privacy incident (breach) log. Documents potential and confirmed HIPAA breaches with discovery date, affected individuals, breach type, notification status, and remediation actions.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-SECURITY-INCIDENT
- **Agent Integration:** Guardian (breach assessment)
- **Key UI Elements:** Incident list with severity/status, breach assessment form, affected individuals count, notification tracker, remediation action plan

### SCR-D09-CONSENT-MANAGEMENT
- **Name:** ConsentManagement.tsx
- **Route:** /app/compliance/consents
- **Description:** Facility-wide consent management. Tracks all required consents per resident: treatment consent, photo/media consent, research consent, medication consent, and data sharing consent.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CONSENT, DM-RESIDENT
- **Agent Integration:** Guardian (consent compliance)
- **Key UI Elements:** Consent matrix (residents × consent types), status indicators (obtained/pending/expired/declined), consent document viewer, renewal alerts, bulk consent report

### SCR-D09-CONSENT-BUILDER
- **Name:** ConsentFormBuilder.tsx
- **Route:** /app/compliance/consents/builder
- **Description:** Consent form template builder. Create and customize consent form templates with configurable sections, signature fields, witness requirements, and expiration rules.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-CONSENT-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Form section builder, signature field placement, witness requirement toggle, expiration rule configuration, preview/publish buttons

### SCR-D09-CONSENT-DASHBOARD
- **Name:** ConsentDashboard.tsx
- **Route:** /app/compliance/consents/dashboard
- **Description:** Consent tracking dashboard. Shows consent completion rates by type, expiring consents, missing consents, and consent renewal trends.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CONSENT, DM-RESIDENT
- **Agent Integration:** Guardian (consent gap analysis)
- **Key UI Elements:** Consent completion rate by type chart, expiring consents list, missing consents alert, renewal trend chart, export consent report

### SCR-D09-COMPLIANCE-TRAINING
- **Name:** ComplianceTraining.tsx
- **Route:** /app/compliance/training
- **Description:** Compliance training assignment and tracking. Assign mandatory compliance training (HIPAA, abuse prevention, fire safety, infection control) to staff and track completion.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRAINING-RECORD, DM-STAFF
- **Agent Integration:** Training Coach (training recommendations)
- **Key UI Elements:** Training assignment matrix (staff × training type), completion status, overdue training alerts, assign training button, completion certificate generation

### SCR-D09-AUDIT-LOG
- **Name:** ComplianceAuditLog.tsx
- **Route:** /app/compliance/audit-log
- **Description:** Comprehensive audit log viewer. All system access events, data modifications, PHI access, and administrative actions with user, timestamp, IP address, and action detail.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-AUDIT-LOG
- **Agent Integration:** None
- **Key UI Elements:** Audit event table with filters, user filter, action type filter, date range picker, export audit log, PHI access highlight

### SCR-D09-COMPLIANCE-REPORT-GEN
- **Name:** ComplianceReportGenerator.tsx
- **Route:** /app/compliance/reports/generate
- **Description:** Compliance report generator. Select report type (annual compliance summary, incident summary, staffing compliance, training compliance, survey readiness), date range, and generate formatted report.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-COMPLIANCE-SCORE, DM-INCIDENT, DM-TRAINING-RECORD
- **Agent Integration:** Guardian (report generation), Analytics Engine (data aggregation)
- **Key UI Elements:** Report type selector, date range picker, parameter configuration, generate report button, report preview, export PDF/Excel

---

# D10 — Scheduling & Staffing

### SCR-D10-SCHEDULE-CALENDAR
- **Name:** ScheduleCalendar.tsx
- **Route:** /app/scheduling/calendar
- **Description:** Master staff schedule calendar. Weekly/bi-weekly view showing all shifts by position with assigned staff. Color-coded by shift type (AM/PM/NOC) and position. Supports drag-and-drop shift assignment.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SHIFT, DM-STAFF, DM-SCHEDULE
- **Agent Integration:** Nexus (schedule optimization)
- **Key UI Elements:** Weekly calendar grid with shift blocks, position rows, staff assignment per block, open shift indicators, drag-and-drop assignment, coverage ratio display

### SCR-D10-SCHEDULE-DAILY
- **Name:** ScheduleDaily.tsx
- **Route:** /app/scheduling/daily
- **Description:** Daily staffing view. Shows all staff on duty for the selected date organized by shift and position. Displays staff-to-resident ratios, overtime indicators, and unfilled positions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT, DM-STAFF
- **Agent Integration:** Nexus (ratio compliance check)
- **Key UI Elements:** Shift columns (AM/PM/NOC), staff cards per shift with role badges, ratio compliance indicator, unfilled position alerts, overtime warning icons

### SCR-D10-MY-SCHEDULE
- **Name:** MySchedule.tsx
- **Route:** /app/scheduling/my-schedule
- **Description:** Personal schedule view for individual staff. Shows upcoming shifts, total hours this pay period, overtime tracking, PTO balance, and shift swap requests.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Personal shift calendar, hours this period counter, overtime indicator, PTO balance display, shift swap request button

### SCR-D10-SHIFT-CREATE
- **Name:** ShiftCreate.tsx
- **Route:** /app/scheduling/shifts/new
- **Description:** Create new shift or shift template. Define shift time, position, required certifications, resident assignment, and recurring pattern (one-time, weekly, bi-weekly, monthly).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SHIFT
- **Agent Integration:** None
- **Key UI Elements:** Time range picker, position selector, certification requirements, recurrence pattern selector, resident assignment, save shift/template button

### SCR-D10-SHIFT-DETAIL
- **Name:** ShiftDetail.tsx
- **Route:** /app/scheduling/shifts/:shiftId
- **Description:** Single shift detail. Shows assigned staff, shift time, position, resident assignments, tasks due during shift, and handoff notes from previous shift.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own shifts)
- **Key Data:** DM-SHIFT, DM-STAFF, DM-TASK
- **Agent Integration:** None
- **Key UI Elements:** Shift header with time/position, assigned staff card, resident assignments, shift tasks checklist, handoff notes section

### SCR-D10-OPEN-SHIFTS
- **Name:** OpenShifts.tsx
- **Route:** /app/scheduling/open-shifts
- **Description:** Open shift board. Lists all unfilled shifts with date, time, position, and required qualifications. Staff can claim open shifts subject to overtime rules and certification requirements.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT, DM-STAFF
- **Agent Integration:** Nexus (optimal fill recommendations)
- **Key UI Elements:** Open shift list with date/time/position, claim shift button, qualification match indicator, overtime warning, auto-fill recommendation badge

### SCR-D10-SHIFT-SWAP
- **Name:** ShiftSwap.tsx
- **Route:** /app/scheduling/swap
- **Description:** Shift swap request and approval workflow. Staff initiates swap request, selects willing partner, supervisor reviews and approves/denies. Validates certification and overtime compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SHIFT-SWAP, DM-SHIFT, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Swap request form, available swap partners list, supervisor approval queue, swap history, compliance validation results

### SCR-D10-CALLOFF-MANAGEMENT
- **Name:** CalloffManagement.tsx
- **Route:** /app/scheduling/calloffs
- **Description:** Call-off tracking and management. Record staff call-offs with reason, find replacement staff, track call-off patterns, and manage attendance points.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CALLOFF, DM-SHIFT, DM-STAFF
- **Agent Integration:** Nexus (replacement finder), HR Manager (attendance tracking)
- **Key UI Elements:** Call-off entry form, replacement staff finder, call-off history per staff, attendance points tracker, pattern analysis

### SCR-D10-OVERTIME-TRACKER
- **Name:** OvertimeTracker.tsx
- **Route:** /app/scheduling/overtime
- **Description:** Overtime monitoring dashboard. Shows current overtime hours per staff member, projected overtime for the pay period, overtime cost estimates, and overtime approval workflow.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SHIFT, DM-STAFF, DM-PAYROLL
- **Agent Integration:** Nexus (overtime minimization), Billing Analyst (cost projection)
- **Key UI Elements:** Staff overtime hours table, projected vs actual overtime chart, cost estimate display, overtime approval queue, overtime trend chart

### SCR-D10-STAFFING-RATIOS
- **Name:** StaffingRatios.tsx
- **Route:** /app/scheduling/ratios
- **Description:** Real-time staffing ratio monitor. Displays current staff-to-resident ratios by unit/shift against state-mandated minimums. Alerts when ratios fall below requirements.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-SHIFT, DM-STAFF, DM-RESIDENT
- **Agent Integration:** Nexus (ratio compliance), Guardian (regulatory ratio requirements)
- **Key UI Elements:** Ratio gauges per unit/shift, state minimum reference, below-minimum alerts, historical ratio trend, compliance percentage

### SCR-D10-SCHEDULE-TEMPLATE
- **Name:** ScheduleTemplate.tsx
- **Route:** /app/scheduling/templates
- **Description:** Schedule template management. Create and manage reusable schedule templates for different staffing patterns (regular, holiday, reduced, emergency). Apply templates to generate schedules.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SCHEDULE-TEMPLATE
- **Agent Integration:** Nexus (template optimization)
- **Key UI Elements:** Template list, template editor with shift blocks, apply template to date range, template comparison, save/duplicate template

### SCR-D10-AUTO-SCHEDULE
- **Name:** AutoSchedule.tsx
- **Route:** /app/scheduling/auto-generate
- **Description:** AI-powered schedule generation. Nexus agent generates optimal schedules based on staff availability, certifications, overtime rules, resident needs, and staff preferences. Produces multiple schedule options ranked by optimization score.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SHIFT, DM-STAFF, DM-SCHEDULE
- **Agent Integration:** Nexus (primary — schedule generation)
- **Key UI Elements:** Schedule generation parameters, staff availability input, generate button, multiple schedule options with scores, accept/modify/regenerate actions

### SCR-D10-AVAILABILITY-MANAGEMENT
- **Name:** AvailabilityManagement.tsx
- **Route:** /app/scheduling/availability
- **Description:** Staff availability management. Staff submit availability preferences (preferred shifts, blackout dates, maximum hours). Managers view aggregate availability for scheduling decisions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-AVAILABILITY, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Weekly availability grid, preferred shift selector, blackout date picker, maximum hours input, aggregate availability view (managers)

### SCR-D10-PTO-MANAGEMENT
- **Name:** PtoManagement.tsx
- **Route:** /app/scheduling/pto
- **Description:** Paid time off request and approval system. Staff submit PTO requests, managers review against staffing needs and approve/deny. Tracks PTO balances, accrual rates, and usage history.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-PTO-REQUEST, DM-STAFF
- **Agent Integration:** Nexus (staffing impact assessment)
- **Key UI Elements:** PTO request form with date range, PTO balance display, approval queue (managers), staffing impact preview, PTO calendar overlay

### SCR-D10-TIMECARD-REVIEW
- **Name:** TimecardReview.tsx
- **Route:** /app/scheduling/timecards
- **Description:** Timecard review and approval. Managers review staff timecards with clock-in/out times, break deductions, overtime calculations, and discrepancy flags. Supports manual adjustments with reason codes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TIMECARD, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Timecard table with clock times, hours calculated, discrepancy flags, manual adjustment form, approve/reject buttons, pay period selector

### SCR-D10-CLOCK-IN-OUT
- **Name:** ClockInOut.tsx
- **Route:** /app/scheduling/clock
- **Description:** Staff clock-in/out screen. Mobile-optimized with geofencing verification. Records clock time, location, and shift assignment. Supports break start/end tracking.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TIMECARD, DM-SHIFT
- **Agent Integration:** None
- **Key UI Elements:** Clock in/out button, current shift display, break start/end buttons, geolocation verification indicator, shift hours counter

### SCR-D10-STAFFING-REPORT
- **Name:** StaffingReport.tsx
- **Route:** /app/scheduling/reports
- **Description:** Staffing analytics reports. Generates reports on staffing hours, overtime trends, call-off rates, ratio compliance, and labor cost analysis for configurable date ranges.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SHIFT, DM-STAFF, DM-TIMECARD
- **Agent Integration:** Analytics Engine (staffing analytics)
- **Key UI Elements:** Report type selector, date range picker, staffing hours chart, overtime trend, call-off rate chart, labor cost breakdown, export report

### SCR-D10-CREDENTIAL-MATRIX
- **Name:** CredentialMatrix.tsx
- **Route:** /app/scheduling/credentials
- **Description:** Staff credential and certification matrix. Grid showing all staff against required certifications with current/expired/expiring status. Used for shift assignment validation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CREDENTIAL, DM-STAFF
- **Agent Integration:** HR Manager (credential tracking)
- **Key UI Elements:** Staff × certification grid, status color coding (current/expiring/expired), expiration date per cell, certification upload link, filter by certification type

### SCR-D10-AGENCY-STAFF
- **Name:** AgencyStaff.tsx
- **Route:** /app/scheduling/agency
- **Description:** Agency/temporary staff management. Track agency staff assignments, credentials, orientation status, and costs. Manage agency contracts and preferred agency lists.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENCY-STAFF, DM-SHIFT
- **Agent Integration:** None
- **Key UI Elements:** Agency staff roster, credential verification status, orientation checklist, cost tracking per agency, agency contract management

---

# D11 — Staff & HR Management

### SCR-D11-STAFF-DIRECTORY
- **Name:** StaffDirectory.tsx
- **Route:** /app/staff
- **Description:** Staff directory with search and filter. Lists all active staff with photo, name, role, department, contact information, and status. Supports filtering by role, department, and certification.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Staff grid/list toggle, search bar, role filter, department filter, staff card with photo/name/role/contact

### SCR-D11-STAFF-PROFILE
- **Name:** StaffProfile.tsx
- **Route:** /app/staff/:staffId
- **Description:** Comprehensive staff profile. Tabbed view with personal information, employment details, credentials/certifications, training history, performance reviews, schedule, and assigned residents.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own profile)
- **Key Data:** DM-STAFF, DM-CREDENTIAL, DM-TRAINING-RECORD
- **Agent Integration:** None
- **Key UI Elements:** Staff photo/name header, tabbed content navigation, credential status badges, training completion indicators, assigned residents list

### SCR-D11-STAFF-CREATE
- **Name:** StaffCreate.tsx
- **Route:** /app/staff/new
- **Description:** New staff onboarding form. Multi-step: personal information, employment details, role assignment, credential upload, emergency contacts, system access configuration, and orientation checklist.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-STAFF, DM-CREDENTIAL
- **Agent Integration:** HR Manager (onboarding workflow)
- **Key UI Elements:** Multi-step wizard, personal info form, role/department selector, credential upload, emergency contact fields, system access configuration

### SCR-D11-STAFF-EDIT
- **Name:** StaffEdit.tsx
- **Route:** /app/staff/:staffId/edit
- **Description:** Edit staff profile. Update personal information, employment details, role, department, and contact information. Role changes trigger access permission updates.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Editable profile fields, role change with permission preview, department selector, save/cancel buttons, change history link

### SCR-D11-CREDENTIAL-MANAGEMENT
- **Name:** CredentialManagement.tsx
- **Route:** /app/staff/:staffId/credentials
- **Description:** Staff credential and certification management. Upload, track, and manage all professional credentials: licenses, certifications, CPR/First Aid, medication administration, and specialty training.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own credentials)
- **Key Data:** DM-CREDENTIAL, DM-STAFF
- **Agent Integration:** HR Manager (expiration tracking), Guardian (credential compliance)
- **Key UI Elements:** Credential list with status/expiration, upload credential document, expiration alert indicators, renewal workflow, verification status

### SCR-D11-CREDENTIAL-VERIFY
- **Name:** CredentialVerify.tsx
- **Route:** /app/staff/:staffId/credentials/:credId/verify
- **Description:** Credential verification workflow. Administrator reviews uploaded credential document, verifies against issuing authority, and marks as verified/rejected with notes.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-CREDENTIAL
- **Agent Integration:** None
- **Key UI Elements:** Credential document viewer, issuing authority reference, verify/reject buttons, verification notes, verification timestamp

### SCR-D11-TRAINING-DASHBOARD
- **Name:** TrainingDashboard.tsx
- **Route:** /app/training
- **Description:** Training management dashboard. Shows facility-wide training compliance rates, upcoming training deadlines, overdue training, and available training courses.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRAINING-RECORD, DM-TRAINING-COURSE, DM-STAFF
- **Agent Integration:** Training Coach (training recommendations)
- **Key UI Elements:** Training compliance percentage gauge, overdue training count, upcoming deadlines list, course catalog link, staff training matrix

### SCR-D11-TRAINING-CATALOG
- **Name:** TrainingCatalog.tsx
- **Route:** /app/training/catalog
- **Description:** Training course catalog. Lists all available training courses with title, description, duration, format (online/in-person/video), mandatory/optional status, and target roles.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TRAINING-COURSE
- **Agent Integration:** None
- **Key UI Elements:** Course cards with title/description/duration, format badges, mandatory indicator, target role filter, enroll button

### SCR-D11-TRAINING-COURSE
- **Name:** TrainingCourse.tsx
- **Route:** /app/training/courses/:courseId
- **Description:** Training course content viewer. Displays course materials (video, slides, documents), progress tracking, knowledge check questions, and completion certificate generation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TRAINING-COURSE, DM-TRAINING-RECORD
- **Agent Integration:** Training Coach (adaptive learning)
- **Key UI Elements:** Course content viewer (video/slides/text), progress bar, knowledge check questions, completion certificate, course evaluation form

### SCR-D11-TRAINING-ASSIGN
- **Name:** TrainingAssign.tsx
- **Route:** /app/training/assign
- **Description:** Assign training to staff. Select course(s), target staff (individual, role-based, or all), set due date, and send notifications. Supports bulk assignment.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRAINING-RECORD, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Course selector, staff/role multi-selector, due date picker, notification message, assign button, assignment confirmation

### SCR-D11-TRAINING-RECORDS
- **Name:** TrainingRecords.tsx
- **Route:** /app/staff/:staffId/training
- **Description:** Individual staff training history. Lists all completed and pending training with course name, completion date, score, certificate, and expiration date for recurring training.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own records)
- **Key Data:** DM-TRAINING-RECORD, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Training history table, completion status badges, certificate download links, expiration dates, pending training list

### SCR-D11-TRAINING-MATRIX
- **Name:** TrainingMatrix.tsx
- **Route:** /app/training/matrix
- **Description:** Staff × training compliance matrix. Grid showing all staff against required training with completion status. Identifies gaps and overdue items. Exportable for regulatory reporting.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-TRAINING-RECORD, DM-STAFF, DM-TRAINING-COURSE
- **Agent Integration:** Guardian (training compliance)
- **Key UI Elements:** Staff × course grid, status color coding, gap identification, overdue highlight, export matrix button

### SCR-D11-PERFORMANCE-REVIEWS
- **Name:** PerformanceReviews.tsx
- **Route:** /app/staff/:staffId/reviews
- **Description:** Staff performance review history. Lists all performance reviews with date, reviewer, rating, and status. Supports annual, probationary, and ad-hoc review types.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (own reviews)
- **Key Data:** DM-PERFORMANCE-REVIEW, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Review history list, rating display, review document viewer, upcoming review schedule, create new review button

### SCR-D11-PERFORMANCE-REVIEW-FORM
- **Name:** PerformanceReviewForm.tsx
- **Route:** /app/staff/:staffId/reviews/new
- **Description:** Performance review form. Structured evaluation with competency ratings, goal achievement review, strengths/areas for improvement, development plan, and overall rating. Supports self-assessment.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PERFORMANCE-REVIEW, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Competency rating scales, goal achievement review, narrative sections, development plan builder, overall rating selector, signature fields

### SCR-D11-DISCIPLINARY-LOG
- **Name:** DisciplinaryLog.tsx
- **Route:** /app/staff/:staffId/disciplinary
- **Description:** Staff disciplinary action log. Documents verbal warnings, written warnings, suspensions, and terminations with date, reason, documentation, and follow-up actions.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-DISCIPLINARY-ACTION, DM-STAFF
- **Agent Integration:** HR Manager (progressive discipline tracking)
- **Key UI Elements:** Disciplinary action timeline, action type badges, documentation viewer, follow-up action tracking, progressive discipline status

### SCR-D11-GRIEVANCE-LOG
- **Name:** GrievanceLog.tsx
- **Route:** /app/hr/grievances
- **Description:** Staff grievance tracking. Documents filed grievances with date, category, description, investigation status, and resolution. Supports anonymous submission.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-GRIEVANCE, DM-STAFF
- **Agent Integration:** HR Manager (grievance workflow)
- **Key UI Elements:** Grievance list with status, anonymous submission option, investigation notes, resolution documentation, grievance category filter

### SCR-D11-ORIENTATION-CHECKLIST
- **Name:** OrientationChecklist.tsx
- **Route:** /app/staff/:staffId/orientation
- **Description:** New employee orientation checklist. Tracks completion of all orientation requirements: facility tour, policy review, system training, shadowing shifts, competency demonstrations, and required documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ORIENTATION-CHECKLIST, DM-STAFF
- **Agent Integration:** HR Manager (orientation workflow)
- **Key UI Elements:** Checklist with completion checkboxes, required documentation upload, mentor/preceptor assignment, target completion date, progress percentage

### SCR-D11-RECRUITMENT
- **Name:** RecruitmentDashboard.tsx
- **Route:** /app/hr/recruitment
- **Description:** Recruitment pipeline dashboard. Tracks open positions, applicants, interview schedules, and hiring status. Supports job posting creation and applicant tracking.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-JOB-POSTING, DM-APPLICANT
- **Agent Integration:** HR Manager (recruitment workflow)
- **Key UI Elements:** Open positions list, applicant pipeline kanban, interview schedule, hiring status tracker, create job posting button

### SCR-D11-JOB-POSTING
- **Name:** JobPosting.tsx
- **Route:** /app/hr/recruitment/postings/:postingId
- **Description:** Job posting detail and management. View/edit job description, requirements, salary range, and posting status. Track applicants for this position.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-JOB-POSTING, DM-APPLICANT
- **Agent Integration:** None
- **Key UI Elements:** Job description editor, requirements list, salary range, posting status toggle, applicant list for this position

### SCR-D11-APPLICANT-PROFILE
- **Name:** ApplicantProfile.tsx
- **Route:** /app/hr/recruitment/applicants/:applicantId
- **Description:** Applicant profile and evaluation. Resume/CV viewer, interview notes, reference check status, background check status, and hiring decision workflow.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-APPLICANT
- **Agent Integration:** HR Manager (background check coordination)
- **Key UI Elements:** Resume viewer, interview notes section, reference check status, background check status, advance/reject buttons

### SCR-D11-EMPLOYEE-HANDBOOK
- **Name:** EmployeeHandbook.tsx
- **Route:** /app/hr/handbook
- **Description:** Digital employee handbook. Searchable, versioned handbook with policies, procedures, benefits information, and code of conduct. Tracks staff acknowledgment of handbook updates.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** Handbook table of contents, searchable content viewer, version history, acknowledgment button, policy update notifications

### SCR-D11-BENEFITS-INFO
- **Name:** BenefitsInfo.tsx
- **Route:** /app/hr/benefits
- **Description:** Employee benefits information portal. Displays available benefits, enrollment status, plan details, and open enrollment dates. Links to benefit provider portals.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-BENEFITS
- **Agent Integration:** None
- **Key UI Elements:** Benefits overview cards, enrollment status, plan detail viewer, open enrollment countdown, provider portal links

### SCR-D11-EXIT-INTERVIEW
- **Name:** ExitInterview.tsx
- **Route:** /app/hr/exit-interview/:staffId
- **Description:** Exit interview form and process. Structured questionnaire covering reason for leaving, job satisfaction, management feedback, and improvement suggestions. Generates anonymized summary for retention analysis.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-EXIT-INTERVIEW, DM-STAFF
- **Agent Integration:** HR Manager (retention analysis)
- **Key UI Elements:** Exit interview questionnaire, reason for leaving selector, satisfaction rating scales, narrative feedback sections, anonymized summary generator

---

# D12 — Communication & Family Engagement

### SCR-D12-MESSAGING-INBOX
- **Name:** MessagingInbox.tsx
- **Route:** /app/messages
- **Description:** Internal messaging inbox. Threaded conversations between staff, with family, and with care teams. Supports text, photo, and file attachments. Messages tagged by resident context for audit trail.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-MESSAGE, DM-CONVERSATION
- **Agent Integration:** None
- **Key UI Elements:** Conversation list with unread badges, message thread view, compose new message, attachment support, resident context tag

### SCR-D12-MESSAGING-COMPOSE
- **Name:** MessagingCompose.tsx
- **Route:** /app/messages/compose
- **Description:** Compose new message. Select recipients (individual staff, care team, family member), enter subject and message body, attach files/photos, and optionally link to a resident record.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-MESSAGE
- **Agent Integration:** None
- **Key UI Elements:** Recipient selector with search, subject line, message body editor, file/photo attachment, resident linker, send button

### SCR-D12-MESSAGING-THREAD
- **Name:** MessagingThread.tsx
- **Route:** /app/messages/:conversationId
- **Description:** Message thread view. Chronological display of all messages in a conversation with sender, timestamp, read receipts, and attachments. Supports reply and forward.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-MESSAGE, DM-CONVERSATION
- **Agent Integration:** None
- **Key UI Elements:** Message bubbles with sender/timestamp, read receipts, attachment previews, reply input, forward button

### SCR-D12-FAMILY-PORTAL-HOME
- **Name:** FamilyPortalHome.tsx
- **Route:** /app/family
- **Description:** Family portal landing page. Shows linked resident's daily summary, recent activity photos, upcoming appointments, unread messages, and quick links to care plan, medications, and contact care team.
- **Role Access:** R-FAMILY
- **Key Data:** DM-RESIDENT, DM-ACTIVITY-LOG, DM-APPOINTMENT, DM-MESSAGE
- **Agent Integration:** Connect (daily summary generation)
- **Key UI Elements:** Resident photo with today's summary, activity photo carousel, upcoming appointments, unread messages badge, quick-link cards

### SCR-D12-FAMILY-DAILY-UPDATE
- **Name:** FamilyDailyUpdate.tsx
- **Route:** /app/family/daily-update
- **Description:** Daily update for family members. AI-generated summary of the resident's day including meals, activities, health observations, and mood. Includes photos taken during the day.
- **Role Access:** R-FAMILY
- **Key Data:** DM-DAILY-LOG, DM-ACTIVITY-LOG, DM-RESIDENT
- **Agent Integration:** Connect (primary — daily summary generation)
- **Key UI Elements:** Date selector, AI-generated daily narrative, activity photos, meal summary, mood/health observations, ask a question button

### SCR-D12-FAMILY-CARE-PLAN-VIEW
- **Name:** FamilyCarePlanView.tsx
- **Route:** /app/family/care-plan
- **Description:** Family-friendly care plan view. Simplified presentation of the resident's care plan with goals explained in plain language, progress indicators, and upcoming milestones.
- **Role Access:** R-FAMILY
- **Key Data:** DM-CARE-PLAN, DM-OBJECTIVE, DM-RESIDENT
- **Agent Integration:** Connect (plain language translation)
- **Key UI Elements:** Simplified goal cards with progress bars, plain language descriptions, milestone timeline, family input section, download family summary

### SCR-D12-FAMILY-MED-VIEW
- **Name:** FamilyMedView.tsx
- **Route:** /app/family/medications
- **Description:** Family-friendly medication list. Shows resident's current medications with name, purpose (in plain language), schedule, and any recent changes. Does not show clinical dosing details.
- **Role Access:** R-FAMILY
- **Key Data:** DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Connect (plain language medication descriptions)
- **Key UI Elements:** Medication list with name/purpose, schedule display, recent changes highlight, medication question button, last updated date

### SCR-D12-FAMILY-APPOINTMENT-VIEW
- **Name:** FamilyAppointmentView.tsx
- **Route:** /app/family/appointments
- **Description:** Family view of upcoming and past appointments. Shows appointment date, type, provider, location, and transportation arrangements. Family can request to attend.
- **Role Access:** R-FAMILY
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Upcoming appointments list, past appointments list, appointment details, request to attend button, transportation info

### SCR-D12-FAMILY-VISIT-SCHEDULE
- **Name:** FamilyVisitSchedule.tsx
- **Route:** /app/family/visits
- **Description:** Family visit scheduling. Schedule visits with preferred date/time, check visiting hours, and receive confirmation. Supports recurring visit scheduling and special event notifications.
- **Role Access:** R-FAMILY
- **Key Data:** DM-VISIT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Visit scheduling calendar, visiting hours display, visit request form, confirmation status, recurring visit setup

### SCR-D12-FAMILY-FEEDBACK
- **Name:** FamilyFeedback.tsx
- **Route:** /app/family/feedback
- **Description:** Family satisfaction feedback form. Structured survey covering care quality, communication, facility environment, staff interactions, and overall satisfaction. Supports anonymous submission.
- **Role Access:** R-FAMILY
- **Key Data:** DM-FEEDBACK
- **Agent Integration:** Quality Assurance (feedback analysis)
- **Key UI Elements:** Satisfaction rating scales, category-specific questions, narrative feedback textarea, anonymous toggle, submit button

### SCR-D12-FAMILY-PHOTO-SHARE
- **Name:** FamilyPhotoShare.tsx
- **Route:** /app/family/photos
- **Description:** Family photo sharing gallery. View photos shared by care team and upload family photos for the resident. Photos tagged by date and event.
- **Role Access:** R-FAMILY
- **Key Data:** DM-FILE, DM-RESIDENT
- **Agent Integration:** Connect (photo sharing notifications)
- **Key UI Elements:** Photo gallery grid, upload photo button, photo date/event tags, lightbox viewer, download button

### SCR-D12-FAMILY-BILLING-VIEW
- **Name:** FamilyBillingView.tsx
- **Route:** /app/family/billing
- **Description:** Family billing portal. View current charges, payment history, outstanding balance, and make payments. Download invoices and statements.
- **Role Access:** R-FAMILY
- **Key Data:** DM-INVOICE, DM-PAYMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Current balance display, recent charges list, payment history, make payment button, download invoice/statement

### SCR-D12-FAMILY-DIRECTORY
- **Name:** FamilyDirectory.tsx
- **Route:** /app/residents/:id/family
- **Description:** Family member directory for a resident. Lists all linked family members with relationship, contact information, portal access status, and communication preferences.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-FAMILY-MEMBER, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Family member cards with relationship/contact, portal access status badge, invite to portal button, communication preference settings, add family member

### SCR-D12-FAMILY-INVITE
- **Name:** FamilyInvite.tsx
- **Route:** /app/residents/:id/family/invite
- **Description:** Invite family member to the portal. Enter family member's name, email, relationship, and access level. Sends invitation email with registration link.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-FAMILY-MEMBER, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Name/email/relationship fields, access level selector, custom invitation message, send invitation button, pending invitations list

### SCR-D12-COMMUNICATION-LOG
- **Name:** CommunicationLog.tsx
- **Route:** /app/residents/:id/communications
- **Description:** Communication log for a resident. Documents all communications with family, physicians, and external providers with date, type (phone, email, in-person, portal), participants, and summary.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-COMMUNICATION-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Communication event list, type filter, date range filter, add communication entry, communication detail expansion

### SCR-D12-COMMUNICATION-ENTRY
- **Name:** CommunicationEntry.tsx
- **Route:** /app/residents/:id/communications/new
- **Description:** Log a communication event. Record type, participants, date/time, summary, and any follow-up actions. Supports voice-to-text for quick logging.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-COMMUNICATION-LOG, DM-RESIDENT
- **Agent Integration:** DocuBot (voice-to-text)
- **Key UI Elements:** Communication type selector, participant fields, summary textarea with voice option, follow-up action items, submit button

### SCR-D12-BROADCAST-MESSAGE
- **Name:** BroadcastMessage.tsx
- **Route:** /app/messages/broadcast
- **Description:** Broadcast message to multiple recipients. Send announcements to all staff, all families, specific roles, or specific units. Supports scheduling future sends.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-MESSAGE
- **Agent Integration:** None
- **Key UI Elements:** Recipient group selector, message composer, schedule send option, delivery confirmation tracking, broadcast history

### SCR-D12-SATISFACTION-DASHBOARD
- **Name:** SatisfactionDashboard.tsx
- **Route:** /app/communication/satisfaction
- **Description:** Family and resident satisfaction analytics. Aggregated satisfaction scores, trend charts, category breakdowns, and verbatim feedback analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-FEEDBACK
- **Agent Integration:** Quality Assurance (satisfaction analysis), Analytics Engine (trend analysis)
- **Key UI Elements:** Overall satisfaction score, category score breakdown, trend chart, verbatim feedback feed, response rate indicator

### SCR-D12-COMPLAINT-TRACKER
- **Name:** ComplaintTracker.tsx
- **Route:** /app/communication/complaints
- **Description:** Complaint tracking and resolution. Documents complaints from families, residents, and staff with category, severity, investigation status, and resolution.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMPLAINT
- **Agent Integration:** Advocate (complaint investigation)
- **Key UI Elements:** Complaint list with status, complaint entry form, investigation notes, resolution documentation, complaint trend chart

---

# D13 — Activities & Community Integration

### SCR-D13-ACTIVITY-CALENDAR
- **Name:** ActivityCalendar.tsx
- **Route:** /app/activities/calendar
- **Description:** Facility activity calendar. Monthly/weekly/daily views showing all scheduled activities, outings, events, and celebrations. Color-coded by activity type. Supports recurring activity scheduling.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-ACTIVITY, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Calendar with activity blocks, activity type color coding, day/week/month view toggle, create activity button, print calendar

### SCR-D13-ACTIVITY-CREATE
- **Name:** ActivityCreate.tsx
- **Route:** /app/activities/new
- **Description:** Create new activity or event. Define title, description, date/time, location, capacity, required staff, target resident group, materials needed, and recurrence pattern.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ACTIVITY
- **Agent Integration:** None
- **Key UI Elements:** Activity form with title/description, date/time picker, location selector, capacity input, resident group selector, recurrence pattern

### SCR-D13-ACTIVITY-DETAIL
- **Name:** ActivityDetail.tsx
- **Route:** /app/activities/:activityId
- **Description:** Activity detail view. Shows activity description, schedule, registered participants, staff assigned, materials needed, and post-activity documentation (attendance, notes, photos).
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-ACTIVITY, DM-ACTIVITY-ATTENDANCE
- **Agent Integration:** None
- **Key UI Elements:** Activity header with date/time/location, participant list, staff assignments, materials checklist, post-activity notes/photos

### SCR-D13-ACTIVITY-ATTENDANCE
- **Name:** ActivityAttendance.tsx
- **Route:** /app/activities/:activityId/attendance
- **Description:** Activity attendance tracker. Check off participating residents, document engagement level (active/passive/refused), and add notes about individual participation.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-ACTIVITY-ATTENDANCE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Resident checklist with attendance toggle, engagement level selector per resident, participation notes, submit attendance, photo upload

### SCR-D13-ACTIVITY-REPORT
- **Name:** ActivityReport.tsx
- **Route:** /app/activities/reports
- **Description:** Activity participation analytics. Charts showing participation rates by resident, activity type popularity, engagement trends, and community integration metrics.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-ACTIVITY-ATTENDANCE, DM-ACTIVITY
- **Agent Integration:** Analytics Engine (participation analysis)
- **Key UI Elements:** Participation rate chart, activity popularity ranking, resident engagement trend, community integration metrics, date range selector

### SCR-D13-COMMUNITY-OUTING
- **Name:** CommunityOuting.tsx
- **Route:** /app/activities/outings
- **Description:** Community outing planning and documentation. Plan outings with destination, transportation, staff requirements, participant list, risk assessment, and emergency contacts. Post-outing documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ACTIVITY, DM-OUTING
- **Agent Integration:** Transportation Manager (vehicle scheduling)
- **Key UI Elements:** Outing planning form, participant selector, risk assessment checklist, transportation request, post-outing report

### SCR-D13-COMMUNITY-RESOURCE
- **Name:** CommunityResource.tsx
- **Route:** /app/activities/community-resources
- **Description:** Community resource directory. Database of local community resources, volunteer organizations, recreational facilities, and integration opportunities for residents.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-COMMUNITY-RESOURCE
- **Agent Integration:** None
- **Key UI Elements:** Resource directory with search, category filter, resource detail cards, contact information, map location

### SCR-D13-VOLUNTEER-MANAGEMENT
- **Name:** VolunteerManagement.tsx
- **Route:** /app/activities/volunteers
- **Description:** Volunteer roster and scheduling. Track volunteers, their skills/interests, background check status, orientation completion, and scheduled volunteer activities.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-VOLUNTEER
- **Agent Integration:** None
- **Key UI Elements:** Volunteer roster, background check status, orientation checklist, volunteer schedule, activity assignment

### SCR-D13-RESIDENT-INTERESTS
- **Name:** ResidentInterests.tsx
- **Route:** /app/residents/:id/interests
- **Description:** Resident interest and preference profile for activity planning. Documents hobbies, preferred activities, social preferences, physical activity tolerance, and sensory considerations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-RESIDENT-PREFERENCE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Interest category checklist, activity preference ranking, social preference selector, physical tolerance level, sensory considerations

### SCR-D13-ACTIVITY-TEMPLATE
- **Name:** ActivityTemplate.tsx
- **Route:** /app/activities/templates
- **Description:** Activity template library. Pre-built activity templates for common programs (arts/crafts, music therapy, exercise, gardening, cooking, movie night). Templates include materials, instructions, and adaptations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ACTIVITY-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template cards with description, materials list, instructions, adaptation suggestions, use template button

---

# D14 — Nutrition & Dining

### SCR-D14-MENU-CALENDAR
- **Name:** MenuCalendar.tsx
- **Route:** /app/nutrition/menu
- **Description:** Weekly/monthly meal menu calendar. Displays breakfast, lunch, dinner, and snack menus with nutritional information. Supports menu rotation cycles and holiday/special event menus.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-MENU, DM-MEAL
- **Agent Integration:** Nutrition Specialist (menu planning)
- **Key UI Elements:** Weekly menu grid (meals × days), nutritional info per meal, menu cycle selector, print menu, special diet indicators

### SCR-D14-MENU-PLANNING
- **Name:** MenuPlanning.tsx
- **Route:** /app/nutrition/menu/plan
- **Description:** Menu planning tool. Create and edit menus with recipe selection, nutritional balance verification, allergen checking, and dietary restriction compliance. AI-assisted menu optimization.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-MENU, DM-RECIPE, DM-DIETARY-RESTRICTION
- **Agent Integration:** Nutrition Specialist (menu optimization, nutritional balance)
- **Key UI Elements:** Drag-and-drop recipe assignment, nutritional balance dashboard, allergen conflict alerts, dietary restriction compliance checker, save/publish menu

### SCR-D14-RECIPE-LIBRARY
- **Name:** RecipeLibrary.tsx
- **Route:** /app/nutrition/recipes
- **Description:** Recipe database. Searchable library of recipes with ingredients, instructions, nutritional information, allergens, serving size, and texture modification options.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-RECIPE
- **Agent Integration:** None
- **Key UI Elements:** Recipe search with filters, recipe cards with photo/name/calories, recipe detail viewer, add new recipe, texture modification options

### SCR-D14-DIETARY-PROFILES
- **Name:** DietaryProfiles.tsx
- **Route:** /app/nutrition/dietary-profiles
- **Description:** Facility-wide dietary profile overview. Lists all residents with their dietary restrictions, allergies, texture modifications, fluid restrictions, and meal preferences.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-DIETARY-RESTRICTION, DM-RESIDENT
- **Agent Integration:** Nutrition Specialist (dietary compliance)
- **Key UI Elements:** Resident dietary matrix, restriction type filter, allergen filter, dietary profile cards, print dietary summary

### SCR-D14-RESIDENT-DIET
- **Name:** ResidentDiet.tsx
- **Route:** /app/residents/:id/nutrition
- **Description:** Individual resident dietary profile. Documents diet type, allergies, texture modifications, fluid restrictions, supplement schedule, feeding assistance level, and meal preferences.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-DIETARY-RESTRICTION, DM-RESIDENT
- **Agent Integration:** Nutrition Specialist (dietary recommendations)
- **Key UI Elements:** Diet type badge, allergy list with severity, texture modification selector, fluid restriction display, meal preference notes

### SCR-D14-MEAL-TRACKING
- **Name:** MealTracking.tsx
- **Route:** /app/nutrition/meal-tracking
- **Description:** Meal intake tracking. Staff documents each resident's meal consumption (percentage eaten per item), fluid intake, and any feeding difficulties. Mobile-optimized for dining room use.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-MEAL-INTAKE, DM-RESIDENT
- **Agent Integration:** Sentinel (inadequate intake alerts)
- **Key UI Elements:** Resident meal grid, percentage consumed slider per item, fluid intake counter, feeding difficulty notes, submit meal tracking

### SCR-D14-FLUID-TRACKING
- **Name:** FluidTracking.tsx
- **Route:** /app/residents/:id/nutrition/fluids
- **Description:** Fluid intake and output tracking for residents with fluid restrictions or monitoring orders. Running daily total with target, type of fluid, and time of intake.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-FLUID-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (fluid restriction alerts)
- **Key UI Elements:** Running fluid total with target bar, intake entry form, fluid type selector, output tracking (if ordered), daily summary

### SCR-D14-SUPPLEMENT-TRACKING
- **Name:** SupplementTracking.tsx
- **Route:** /app/nutrition/supplements
- **Description:** Nutritional supplement tracking. Documents supplement administration (protein shakes, vitamins, tube feeding) with time, amount, and tolerance.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-SUPPLEMENT-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Supplement schedule per resident, administration log, tolerance notes, supplement inventory, reorder alerts

### SCR-D14-NUTRITION-REPORT
- **Name:** NutritionReport.tsx
- **Route:** /app/nutrition/reports
- **Description:** Nutrition analytics reports. Meal consumption trends, weight change correlation, fluid intake compliance, and dietary restriction adherence across the facility.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEAL-INTAKE, DM-VITAL, DM-RESIDENT
- **Agent Integration:** Nutrition Specialist (nutritional analysis), Analytics Engine (trend analysis)
- **Key UI Elements:** Meal consumption trend chart, weight correlation scatter plot, fluid compliance rates, dietary adherence percentage, date range selector

### SCR-D14-KITCHEN-PREP
- **Name:** KitchenPrep.tsx
- **Route:** /app/nutrition/kitchen
- **Description:** Kitchen preparation dashboard. Shows today's menu, resident count by diet type, special preparation notes, allergen warnings, and texture modification requirements for kitchen staff.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-MENU, DM-DIETARY-RESTRICTION, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Today's menu display, diet type count summary, allergen warning list, texture modification list, special preparation notes


# D15 — Transportation

### SCR-D15-TRANSPORT-CALENDAR
- **Name:** TransportCalendar.tsx
- **Route:** /app/transportation/calendar
- **Description:** Transportation schedule calendar. Shows all scheduled transports with resident, destination, time, vehicle, and driver assignment. Supports recurring appointment transport scheduling.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRANSPORT, DM-APPOINTMENT, DM-RESIDENT
- **Agent Integration:** Transportation Manager (schedule optimization)
- **Key UI Elements:** Daily/weekly calendar with transport blocks, vehicle assignment, driver assignment, route optimization, print daily transport sheet

### SCR-D15-TRANSPORT-REQUEST
- **Name:** TransportRequest.tsx
- **Route:** /app/transportation/request
- **Description:** Transportation request form. Request transport for medical appointments, community outings, or personal errands. Specify resident, destination, date/time, accessibility requirements, and escort needs.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-TRANSPORT, DM-RESIDENT
- **Agent Integration:** Transportation Manager (availability check)
- **Key UI Elements:** Resident selector, destination input, date/time picker, accessibility requirements checklist, escort needed toggle, submit request

### SCR-D15-TRANSPORT-DETAIL
- **Name:** TransportDetail.tsx
- **Route:** /app/transportation/:transportId
- **Description:** Transport trip detail. Shows resident, destination, scheduled time, vehicle, driver, accessibility needs, escort assignment, departure/arrival times, and trip notes.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-TRANSPORT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Trip detail card, departure/arrival time log, driver/vehicle info, accessibility notes, trip completion status

### SCR-D15-VEHICLE-MANAGEMENT
- **Name:** VehicleManagement.tsx
- **Route:** /app/transportation/vehicles
- **Description:** Vehicle fleet management. Lists all facility vehicles with type, capacity, accessibility features, maintenance status, insurance expiration, and current assignment.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-VEHICLE
- **Agent Integration:** Maintenance Coordinator (vehicle maintenance)
- **Key UI Elements:** Vehicle list with status badges, maintenance schedule, insurance expiration alerts, vehicle detail cards, add vehicle form

### SCR-D15-DRIVER-MANAGEMENT
- **Name:** DriverManagement.tsx
- **Route:** /app/transportation/drivers
- **Description:** Driver roster and credential management. Lists authorized drivers with license status, training completion, driving record, and schedule availability.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-DRIVER, DM-CREDENTIAL
- **Agent Integration:** None
- **Key UI Elements:** Driver roster with credential status, license expiration alerts, training completion, availability schedule, add driver form

### SCR-D15-ROUTE-OPTIMIZATION
- **Name:** RouteOptimization.tsx
- **Route:** /app/transportation/routes
- **Description:** Route optimization tool. Groups multiple transport requests into efficient routes. Shows map with stops, estimated times, and total distance. AI-optimized routing.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-TRANSPORT, DM-ROUTE
- **Agent Integration:** Transportation Manager (route optimization)
- **Key UI Elements:** Map with route visualization, stop sequence list, estimated time per stop, total distance/time, optimize route button

### SCR-D15-TRANSPORT-LOG
- **Name:** TransportLog.tsx
- **Route:** /app/transportation/log
- **Description:** Transport trip log. Historical record of all completed transports with date, resident, destination, departure/arrival times, mileage, and any incidents during transport.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-TRANSPORT
- **Agent Integration:** None
- **Key UI Elements:** Trip log table, date range filter, resident filter, mileage summary, incident flag column

### SCR-D15-TRANSPORT-REPORT
- **Name:** TransportReport.tsx
- **Route:** /app/transportation/reports
- **Description:** Transportation analytics. Trip count trends, mileage tracking, cost analysis, on-time performance, and vehicle utilization rates.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-TRANSPORT, DM-VEHICLE
- **Agent Integration:** Analytics Engine (transport analytics)
- **Key UI Elements:** Trip count trend chart, mileage summary, cost analysis, on-time percentage, vehicle utilization chart

---

# D16 — Facility & Maintenance

### SCR-D16-MAINTENANCE-DASHBOARD
- **Name:** MaintenanceDashboard.tsx
- **Route:** /app/maintenance
- **Description:** Facility maintenance overview. Open work orders, preventive maintenance schedule, equipment status, safety inspection calendar, and maintenance cost tracking.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORK-ORDER, DM-EQUIPMENT, DM-INSPECTION
- **Agent Integration:** Maintenance Coordinator (work order prioritization)
- **Key UI Elements:** Open work orders count, PM schedule calendar, equipment status summary, upcoming inspections, maintenance cost chart

### SCR-D16-WORK-ORDER-LIST
- **Name:** WorkOrderList.tsx
- **Route:** /app/maintenance/work-orders
- **Description:** Work order registry. All maintenance requests with priority, category, location, assigned technician, status, and age. Supports filtering and sorting.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-WORK-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Work order table, priority/status filters, category filter, assigned technician filter, create work order button

### SCR-D16-WORK-ORDER-CREATE
- **Name:** WorkOrderCreate.tsx
- **Route:** /app/maintenance/work-orders/new
- **Description:** Submit maintenance request. Describe issue, select location, priority, category (plumbing, electrical, HVAC, structural, equipment, grounds), and attach photos.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-WORK-ORDER
- **Agent Integration:** Maintenance Coordinator (priority assessment)
- **Key UI Elements:** Issue description, location selector, priority selector, category dropdown, photo upload, submit button

### SCR-D16-WORK-ORDER-DETAIL
- **Name:** WorkOrderDetail.tsx
- **Route:** /app/maintenance/work-orders/:orderId
- **Description:** Work order detail. Full description, photos, assigned technician, status history, parts used, labor hours, cost, and completion documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-WORK-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Work order header with priority/status, description with photos, technician assignment, status timeline, completion documentation

### SCR-D16-PM-SCHEDULE
- **Name:** PmSchedule.tsx
- **Route:** /app/maintenance/preventive
- **Description:** Preventive maintenance schedule. Calendar of all scheduled preventive maintenance tasks for building systems, equipment, and safety devices. Tracks completion and generates work orders.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PM-SCHEDULE, DM-EQUIPMENT
- **Agent Integration:** Maintenance Coordinator (PM scheduling)
- **Key UI Elements:** PM calendar with task blocks, equipment filter, overdue PM highlight, complete PM button, PM history

### SCR-D16-EQUIPMENT-INVENTORY
- **Name:** EquipmentInventory.tsx
- **Route:** /app/maintenance/equipment
- **Description:** Equipment inventory. Lists all facility equipment with type, location, serial number, warranty status, maintenance history, and replacement schedule.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-EQUIPMENT
- **Agent Integration:** Maintenance Coordinator (equipment lifecycle)
- **Key UI Elements:** Equipment table with type/location/status, warranty expiration alerts, maintenance history per item, replacement schedule, add equipment form

### SCR-D16-SAFETY-INSPECTION
- **Name:** SafetyInspection.tsx
- **Route:** /app/maintenance/inspections
- **Description:** Safety inspection management. Schedule and document fire safety, environmental health, accessibility, and general safety inspections. Tracks findings and corrective actions.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-INSPECTION, DM-INSPECTION-FINDING
- **Agent Integration:** Guardian (inspection compliance)
- **Key UI Elements:** Inspection schedule calendar, inspection checklist form, finding documentation, corrective action tracking, inspection history

### SCR-D16-FIRE-SAFETY
- **Name:** FireSafety.tsx
- **Route:** /app/maintenance/fire-safety
- **Description:** Fire safety management. Fire drill schedule and documentation, fire extinguisher inspection log, sprinkler system testing, fire alarm testing, and evacuation plan management.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-FIRE-SAFETY-LOG
- **Agent Integration:** Guardian (fire safety compliance)
- **Key UI Elements:** Fire drill schedule/log, extinguisher inspection checklist, sprinkler test log, alarm test log, evacuation plan document

### SCR-D16-EMERGENCY-PREPAREDNESS
- **Name:** EmergencyPreparedness.tsx
- **Route:** /app/maintenance/emergency-prep
- **Description:** Emergency preparedness management. Emergency plans (fire, weather, pandemic, utility failure), supply inventory, generator testing, communication tree, and drill documentation.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-EMERGENCY-PLAN, DM-EMERGENCY-SUPPLY
- **Agent Integration:** Emergency Coordinator (emergency planning)
- **Key UI Elements:** Emergency plan documents, supply inventory checklist, generator test log, communication tree, drill schedule/documentation

### SCR-D16-ROOM-MANAGEMENT
- **Name:** RoomManagement.tsx
- **Route:** /app/facility/rooms
- **Description:** Room inventory and management. Lists all rooms with type, capacity, current occupants, features (accessible, private bathroom, medical equipment), and condition status.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ROOM, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Room list with type/capacity/occupancy, room feature tags, condition status, occupant display, room detail editor

### SCR-D16-FLOOR-PLAN
- **Name:** FloorPlan.tsx
- **Route:** /app/facility/floor-plan
- **Description:** Interactive facility floor plan. Visual map showing rooms, common areas, exits, and safety equipment locations. Clickable rooms show occupant and status information.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ROOM, DM-RESIDENT, DM-FACILITY
- **Agent Integration:** None
- **Key UI Elements:** Interactive floor plan map, room click for detail, safety equipment markers, exit markers, occupancy overlay

### SCR-D16-VENDOR-MANAGEMENT
- **Name:** VendorManagement.tsx
- **Route:** /app/maintenance/vendors
- **Description:** Vendor and contractor management. Contact directory for maintenance vendors, contract tracking, service history, and performance ratings.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-VENDOR
- **Agent Integration:** None
- **Key UI Elements:** Vendor directory with contact info, contract details, service history, performance rating, add vendor form

### SCR-D16-MAINTENANCE-REPORT
- **Name:** MaintenanceReport.tsx
- **Route:** /app/maintenance/reports
- **Description:** Maintenance analytics. Work order trends, completion times, cost analysis, PM compliance rates, and equipment reliability metrics.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORK-ORDER, DM-PM-SCHEDULE, DM-EQUIPMENT
- **Agent Integration:** Analytics Engine (maintenance analytics)
- **Key UI Elements:** Work order trend chart, average completion time, cost breakdown, PM compliance rate, equipment reliability chart


# D17 — Finance & Billing

### SCR-D17-FINANCE-DASHBOARD
- **Name:** FinanceDashboard.tsx
- **Route:** /app/finance
- **Description:** Financial overview dashboard. Revenue summary, expense breakdown, accounts receivable aging, occupancy-based revenue projection, and budget vs actual comparison.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-REVENUE, DM-EXPENSE, DM-INVOICE, DM-BUDGET
- **Agent Integration:** Billing Analyst (financial analysis), Executive Assistant (strategic insights)
- **Key UI Elements:** Revenue trend chart, expense pie chart, AR aging chart, occupancy revenue projection, budget vs actual comparison

### SCR-D17-BILLING-LIST
- **Name:** BillingList.tsx
- **Route:** /app/finance/billing
- **Description:** Billing registry. All invoices with resident, date, amount, status (draft/sent/paid/overdue), payment method, and aging days. Supports bulk invoice generation.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVOICE, DM-RESIDENT
- **Agent Integration:** Billing Analyst (billing optimization)
- **Key UI Elements:** Invoice table with status badges, date range filter, status filter, bulk generate invoices, export billing report

### SCR-D17-INVOICE-DETAIL
- **Name:** InvoiceDetail.tsx
- **Route:** /app/finance/billing/:invoiceId
- **Description:** Single invoice detail. Line items with descriptions, quantities, rates, and totals. Payment history, adjustments, and credit applications. Print/email invoice.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVOICE, DM-INVOICE-LINE-ITEM, DM-PAYMENT
- **Agent Integration:** None
- **Key UI Elements:** Invoice header with resident/date/total, line item table, payment history, adjustment log, print/email invoice buttons

### SCR-D17-INVOICE-CREATE
- **Name:** InvoiceCreate.tsx
- **Route:** /app/finance/billing/new
- **Description:** Create new invoice. Select resident, add line items (room/board, services, supplies, activities), apply rates, calculate totals, and send to family portal.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVOICE, DM-RESIDENT
- **Agent Integration:** Billing Analyst (rate calculation)
- **Key UI Elements:** Resident selector, line item builder, rate lookup, total calculation, send invoice button

### SCR-D17-PAYMENT-PROCESSING
- **Name:** PaymentProcessing.tsx
- **Route:** /app/finance/payments
- **Description:** Payment recording and processing. Record payments received (check, ACH, credit card, Medicaid/Medicare), apply to invoices, and generate receipts.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PAYMENT, DM-INVOICE
- **Agent Integration:** None
- **Key UI Elements:** Payment entry form, payment method selector, invoice application, receipt generation, payment history

### SCR-D17-AR-AGING
- **Name:** ArAging.tsx
- **Route:** /app/finance/ar-aging
- **Description:** Accounts receivable aging report. Shows outstanding balances by aging bucket (current, 30, 60, 90, 120+ days) by resident and payer type. Supports collection workflow.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVOICE, DM-PAYMENT
- **Agent Integration:** Billing Analyst (collection prioritization)
- **Key UI Elements:** AR aging table by resident, aging bucket columns, payer type filter, collection action buttons, aging trend chart

### SCR-D17-RATE-MANAGEMENT
- **Name:** RateManagement.tsx
- **Route:** /app/finance/rates
- **Description:** Service rate management. Define and manage rates for room/board, services, supplies, and activities. Supports rate schedules by payer type (private pay, Medicaid, Medicare).
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-RATE, DM-RATE-SCHEDULE
- **Agent Integration:** None
- **Key UI Elements:** Rate table by service type, payer type columns, effective date, rate history, add/edit rate form

### SCR-D17-MEDICAID-BILLING
- **Name:** MedicaidBilling.tsx
- **Route:** /app/finance/medicaid
- **Description:** Medicaid billing management. Tracks Medicaid authorization, service documentation for billing, claim submission, and reimbursement tracking.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-MEDICAID-CLAIM, DM-AUTHORIZATION
- **Agent Integration:** Billing Analyst (claim optimization)
- **Key UI Elements:** Authorization tracker, service documentation status, claim submission queue, reimbursement tracking, denial management

### SCR-D17-EXPENSE-TRACKING
- **Name:** ExpenseTracking.tsx
- **Route:** /app/finance/expenses
- **Description:** Expense tracking and categorization. Record and categorize facility expenses (payroll, supplies, food, utilities, maintenance, insurance, professional services).
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-EXPENSE
- **Agent Integration:** None
- **Key UI Elements:** Expense entry form, category selector, vendor selector, receipt upload, expense list with filters

### SCR-D17-BUDGET-MANAGEMENT
- **Name:** BudgetManagement.tsx
- **Route:** /app/finance/budget
- **Description:** Budget creation and tracking. Define annual budget by category, track actual vs budget monthly, variance analysis, and budget revision workflow.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-BUDGET, DM-EXPENSE, DM-REVENUE
- **Agent Integration:** Executive Assistant (budget analysis)
- **Key UI Elements:** Budget vs actual table by category, variance percentage, monthly trend chart, budget revision form, export budget report

### SCR-D17-PAYROLL-SUMMARY
- **Name:** PayrollSummary.tsx
- **Route:** /app/finance/payroll
- **Description:** Payroll summary dashboard. Shows pay period hours, overtime, PTO used, gross pay estimates, and labor cost distribution by department/role.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PAYROLL, DM-TIMECARD, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** Pay period selector, hours summary table, overtime breakdown, labor cost by department chart, export payroll data

### SCR-D17-FINANCIAL-REPORTS
- **Name:** FinancialReports.tsx
- **Route:** /app/finance/reports
- **Description:** Financial report generator. Produce income statements, balance sheets, cash flow statements, occupancy revenue analysis, and custom financial reports.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-REVENUE, DM-EXPENSE, DM-BUDGET
- **Agent Integration:** Billing Analyst (financial analysis), Analytics Engine (data aggregation)
- **Key UI Elements:** Report type selector, date range picker, report preview, export PDF/Excel, scheduled report delivery

### SCR-D17-TRUST-ACCOUNT
- **Name:** TrustAccount.tsx
- **Route:** /app/finance/trust-accounts
- **Description:** Resident trust/personal funds account management. Track individual resident funds, deposits, withdrawals, and balances. Required for Medicaid residents.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-TRUST-ACCOUNT, DM-RESIDENT
- **Agent Integration:** Guardian (trust account compliance)
- **Key UI Elements:** Resident trust account list, balance display, transaction history, deposit/withdrawal form, quarterly statement generation

---

# D18 — Appointments & Referrals

### SCR-D18-APPOINTMENT-CALENDAR
- **Name:** AppointmentCalendar.tsx
- **Route:** /app/appointments/calendar
- **Description:** Facility-wide appointment calendar. Shows all resident appointments (medical, dental, therapy, specialist) with date, time, provider, location, and transportation status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT
- **Agent Integration:** Nexus (scheduling optimization)
- **Key UI Elements:** Calendar with appointment blocks, resident filter, provider filter, transportation status indicator, create appointment button

### SCR-D18-APPOINTMENT-CREATE
- **Name:** AppointmentCreate.tsx
- **Route:** /app/appointments/new
- **Description:** Schedule new appointment. Select resident, appointment type, provider, date/time, location, and transportation needs. Auto-checks for scheduling conflicts.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT, DM-PROVIDER
- **Agent Integration:** Nexus (conflict detection)
- **Key UI Elements:** Resident selector, appointment type, provider selector, date/time picker, location input, transportation request toggle

### SCR-D18-APPOINTMENT-DETAIL
- **Name:** AppointmentDetail.tsx
- **Route:** /app/appointments/:appointmentId
- **Description:** Appointment detail view. Shows all appointment information, preparation instructions, documents to bring, transportation arrangements, escort assignment, and post-appointment documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned), R-FAMILY (linked)
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Appointment header, preparation checklist, documents to bring list, transportation details, post-appointment notes entry

### SCR-D18-APPOINTMENT-PREP
- **Name:** AppointmentPrep.tsx
- **Route:** /app/appointments/:appointmentId/prep
- **Description:** Appointment preparation checklist. Documents to prepare (face sheet, medication list, recent labs), fasting requirements, medication hold instructions, and escort briefing.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT, DM-MEDICATION
- **Agent Integration:** None
- **Key UI Elements:** Preparation checklist, document print queue, fasting reminder, medication hold notes, escort briefing card

### SCR-D18-APPOINTMENT-FOLLOWUP
- **Name:** AppointmentFollowup.tsx
- **Route:** /app/appointments/:appointmentId/followup
- **Description:** Post-appointment documentation. Record appointment outcome, new orders, medication changes, follow-up appointment, and specialist recommendations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-APPOINTMENT, DM-PHYSICIAN-ORDER, DM-MEDICATION
- **Agent Integration:** None
- **Key UI Elements:** Outcome summary, new orders entry, medication change documentation, follow-up scheduling, specialist recommendation notes

### SCR-D18-PROVIDER-DIRECTORY
- **Name:** ProviderDirectory.tsx
- **Route:** /app/appointments/providers
- **Description:** Healthcare provider directory. Contact database of physicians, dentists, therapists, specialists, and other healthcare providers used by the facility.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-PROVIDER
- **Agent Integration:** None
- **Key UI Elements:** Provider search with specialty filter, provider cards with contact info, add provider form, provider preference per resident, map location

### SCR-D18-REFERRAL-LIST
- **Name:** ReferralList.tsx
- **Route:** /app/referrals
- **Description:** Referral tracking registry. All outgoing referrals with resident, referral type, provider, date sent, status (pending/scheduled/completed/declined), and follow-up date.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-REFERRAL, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Referral table with status badges, type filter, status filter, create referral button, overdue follow-up highlight

### SCR-D18-REFERRAL-CREATE
- **Name:** ReferralCreate.tsx
- **Route:** /app/referrals/new
- **Description:** Create new referral. Select resident, referral type (specialist, therapy, diagnostic, hospital), provider, clinical reason, supporting documentation, and urgency level.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-REFERRAL, DM-RESIDENT, DM-PROVIDER
- **Agent Integration:** None
- **Key UI Elements:** Resident selector, referral type, provider selector, clinical reason textarea, document attachment, urgency selector

### SCR-D18-REFERRAL-DETAIL
- **Name:** ReferralDetail.tsx
- **Route:** /app/referrals/:referralId
- **Description:** Referral detail and tracking. Shows referral information, status updates, appointment scheduling, and outcome documentation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-REFERRAL, DM-APPOINTMENT
- **Agent Integration:** None
- **Key UI Elements:** Referral header with status, clinical reason, supporting documents, status timeline, outcome documentation

### SCR-D18-TELEHEALTH
- **Name:** Telehealth.tsx
- **Route:** /app/appointments/:appointmentId/telehealth
- **Description:** Telehealth appointment interface. Integrated video call with provider, shared screen for document review, and real-time documentation. Supports pre-visit questionnaire.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-APPOINTMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Video call interface, shared document viewer, pre-visit questionnaire, real-time note taking, end call with summary

### SCR-D18-HOSPITALIZATION-TRACKER
- **Name:** HospitalizationTracker.tsx
- **Route:** /app/appointments/hospitalizations
- **Description:** Hospital admission/discharge tracking. Documents hospital admissions, reason, hospital name, attending physician, daily status updates, and discharge planning.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-HOSPITALIZATION, DM-RESIDENT
- **Agent Integration:** Sentinel (readmission risk), Catalyst (discharge planning)
- **Key UI Elements:** Active hospitalizations list, admission entry form, daily status update log, discharge planning checklist, readmission risk indicator


# D19 — Admissions & Discharge

### SCR-D19-REFERRAL-INTAKE
- **Name:** ReferralIntake.tsx
- **Route:** /app/admissions/referrals
- **Description:** Incoming referral management. Track referrals from hospitals, families, and agencies. Evaluate fit, schedule tours, and manage the admission decision process.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ADMISSION-REFERRAL
- **Agent Integration:** Catalyst (referral evaluation)
- **Key UI Elements:** Referral pipeline kanban (new/evaluating/tour-scheduled/accepted/declined), referral detail cards, evaluation checklist, tour scheduling

### SCR-D19-REFERRAL-EVALUATION
- **Name:** ReferralEvaluation.tsx
- **Route:** /app/admissions/referrals/:referralId/evaluate
- **Description:** Referral evaluation form. Assess prospective resident's care needs, behavioral history, medical complexity, and facility fit. Generate acceptance/decline recommendation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ADMISSION-REFERRAL
- **Agent Integration:** Catalyst (fit assessment)
- **Key UI Elements:** Care needs assessment, behavioral history review, medical complexity scoring, facility fit evaluation, recommendation with rationale

### SCR-D19-TOUR-SCHEDULING
- **Name:** TourScheduling.tsx
- **Route:** /app/admissions/tours
- **Description:** Facility tour scheduling and management. Schedule tours for prospective residents and families, assign tour guides, and track tour outcomes.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-TOUR
- **Agent Integration:** None
- **Key UI Elements:** Tour calendar, schedule tour form, tour guide assignment, tour feedback form, conversion tracking

### SCR-D19-ADMISSION-CHECKLIST
- **Name:** AdmissionChecklist.tsx
- **Route:** /app/admissions/:admissionId/checklist
- **Description:** Admission process checklist. Tracks completion of all admission requirements: paperwork, assessments, room preparation, care plan initiation, medication setup, and family orientation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ADMISSION-CHECKLIST, DM-RESIDENT
- **Agent Integration:** Catalyst (admission coordination)
- **Key UI Elements:** Checklist with completion status, responsible person per item, due date tracking, document upload per item, progress percentage

### SCR-D19-ADMISSION-PAPERWORK
- **Name:** AdmissionPaperwork.tsx
- **Route:** /app/admissions/:admissionId/paperwork
- **Description:** Admission paperwork management. Track collection and completion of all required admission documents: consent forms, financial agreements, medical records, legal documents.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-DOCUMENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Required documents checklist, document upload per item, completion status, missing document alerts, print admission packet

### SCR-D19-DISCHARGE-PLANNING
- **Name:** DischargePlanning.tsx
- **Route:** /app/residents/:id/discharge/plan
- **Description:** Discharge planning workspace. Documents discharge reason, destination, transfer summary, medication reconciliation, follow-up appointments, and family/guardian notification.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-DISCHARGE-PLAN, DM-RESIDENT
- **Agent Integration:** Catalyst (discharge coordination)
- **Key UI Elements:** Discharge reason selector, destination input, transfer summary builder, medication reconciliation link, follow-up appointment scheduler

### SCR-D19-DISCHARGE-SUMMARY
- **Name:** DischargeSummary.tsx
- **Route:** /app/residents/:id/discharge/summary
- **Description:** Discharge summary document. Comprehensive summary of resident's stay including diagnoses, treatments, medications at discharge, care plan outcomes, and follow-up recommendations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-DISCHARGE-PLAN, DM-RESIDENT, DM-MEDICATION, DM-CARE-PLAN
- **Agent Integration:** DocuBot (summary generation)
- **Key UI Elements:** Auto-generated discharge summary, editable sections, medication list at discharge, follow-up recommendations, print/export button

### SCR-D19-DISCHARGE-CHECKLIST
- **Name:** DischargeChecklist.tsx
- **Route:** /app/residents/:id/discharge/checklist
- **Description:** Discharge process checklist. Tracks completion of all discharge tasks: records transfer, medication packaging, personal belongings inventory, room inspection, and final billing.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-DISCHARGE-CHECKLIST, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Checklist with completion status, responsible person per item, personal belongings inventory, room inspection form, final billing confirmation

### SCR-D19-WAITLIST
- **Name:** Waitlist.tsx
- **Route:** /app/admissions/waitlist
- **Description:** Admission waitlist management. Track prospective residents waiting for bed availability with priority, care needs, estimated admission date, and contact information.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WAITLIST
- **Agent Integration:** None
- **Key UI Elements:** Waitlist table with priority ranking, care needs summary, estimated date, contact info, move to admission button

### SCR-D19-CENSUS-REPORT
- **Name:** CensusReport.tsx
- **Route:** /app/admissions/census-report
- **Description:** Census analytics report. Admission/discharge trends, average length of stay, bed occupancy rates, referral source analysis, and discharge destination analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-RESIDENT, DM-ADMISSION-REFERRAL
- **Agent Integration:** Analytics Engine (census analytics)
- **Key UI Elements:** Admission/discharge trend chart, occupancy rate gauge, average LOS display, referral source pie chart, discharge destination chart

---

# D20 — Quality Assurance & Improvement

### SCR-D20-QA-DASHBOARD
- **Name:** QaDashboard.tsx
- **Route:** /app/quality
- **Description:** Quality assurance overview. Quality indicator scores, improvement project status, audit findings, satisfaction metrics, and quality trend analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-QUALITY-INDICATOR, DM-QI-PROJECT, DM-AUDIT-FINDING
- **Agent Integration:** Quality Assurance (quality scoring)
- **Key UI Elements:** Quality indicator dashboard, improvement project status cards, audit findings summary, satisfaction trend, quality score trend chart

### SCR-D20-QUALITY-INDICATORS
- **Name:** QualityIndicators.tsx
- **Route:** /app/quality/indicators
- **Description:** Quality indicator tracking. Monitors key quality metrics: falls rate, pressure ulcer rate, infection rate, medication error rate, restraint use, weight loss, and behavioral incidents.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-QUALITY-INDICATOR
- **Agent Integration:** Quality Assurance (indicator calculation)
- **Key UI Elements:** Indicator cards with current value and trend, benchmark comparison, threshold alerts, historical trend charts, indicator detail drill-down

### SCR-D20-QI-PROJECT-LIST
- **Name:** QiProjectList.tsx
- **Route:** /app/quality/projects
- **Description:** Quality improvement project registry. Lists all active and completed QI projects with focus area, team, timeline, and outcome status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-QI-PROJECT
- **Agent Integration:** None
- **Key UI Elements:** Project list with status badges, focus area filter, timeline display, create project button, project outcome summary

### SCR-D20-QI-PROJECT-DETAIL
- **Name:** QiProjectDetail.tsx
- **Route:** /app/quality/projects/:projectId
- **Description:** QI project detail. PDSA cycle documentation, team members, baseline data, intervention description, measurement plan, results, and sustainability plan.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-QI-PROJECT
- **Agent Integration:** Quality Assurance (outcome analysis)
- **Key UI Elements:** PDSA cycle tracker, team member list, baseline vs current data chart, intervention description, measurement results

### SCR-D20-QI-PROJECT-CREATE
- **Name:** QiProjectCreate.tsx
- **Route:** /app/quality/projects/new
- **Description:** Create new QI project. Define focus area, problem statement, aim statement, team members, baseline data, and PDSA cycle plan.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-QI-PROJECT
- **Agent Integration:** Quality Assurance (problem identification)
- **Key UI Elements:** Focus area selector, problem statement editor, aim statement builder, team member selector, baseline data entry, PDSA plan template

### SCR-D20-INTERNAL-AUDIT
- **Name:** InternalAudit.tsx
- **Route:** /app/quality/audits
- **Description:** Internal audit management. Schedule and conduct internal quality audits by category (documentation, medication, infection control, resident rights). Track findings and corrective actions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-AUDIT, DM-AUDIT-FINDING
- **Agent Integration:** Quality Assurance (audit scheduling), Guardian (compliance audit)
- **Key UI Elements:** Audit schedule calendar, audit checklist by category, finding entry form, corrective action tracker, audit history

### SCR-D20-AUDIT-CHECKLIST
- **Name:** AuditChecklist.tsx
- **Route:** /app/quality/audits/:auditId/checklist
- **Description:** Audit checklist execution. Category-specific checklist with pass/fail/NA per item, evidence documentation, and finding generation for failed items.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-AUDIT, DM-AUDIT-FINDING
- **Agent Integration:** None
- **Key UI Elements:** Checklist items with pass/fail/NA, evidence upload per item, finding auto-generation for failures, completion progress, submit audit

### SCR-D20-AUDIT-FINDINGS
- **Name:** AuditFindings.tsx
- **Route:** /app/quality/audits/:auditId/findings
- **Description:** Audit findings report. Lists all findings from an audit with severity, category, description, and required corrective actions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-AUDIT-FINDING
- **Agent Integration:** None
- **Key UI Elements:** Finding list with severity badges, category grouping, corrective action assignment, finding detail expansion, export findings report

### SCR-D20-CORRECTIVE-ACTIONS
- **Name:** CorrectiveActions.tsx
- **Route:** /app/quality/corrective-actions
- **Description:** Corrective action tracking across all sources (audits, incidents, surveys, complaints). Shows action description, responsible person, due date, and completion status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-CORRECTIVE-ACTION
- **Agent Integration:** None
- **Key UI Elements:** Corrective action table, source filter, status filter, overdue highlight, completion documentation, trend analysis

### SCR-D20-RESIDENT-SATISFACTION
- **Name:** ResidentSatisfaction.tsx
- **Route:** /app/quality/resident-satisfaction
- **Description:** Resident satisfaction survey management. Create, distribute, and analyze resident satisfaction surveys. Track response rates and satisfaction trends.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SURVEY, DM-SURVEY-RESPONSE
- **Agent Integration:** Quality Assurance (satisfaction analysis)
- **Key UI Elements:** Survey builder, distribution management, response rate tracker, satisfaction score dashboard, verbatim feedback analysis

### SCR-D20-SURVEY-BUILDER
- **Name:** SurveyBuilder.tsx
- **Route:** /app/quality/surveys/builder
- **Description:** Survey creation tool. Build custom surveys with question types (rating scale, multiple choice, open text), branching logic, and anonymous option.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-SURVEY
- **Agent Integration:** None
- **Key UI Elements:** Question type selector, drag-and-drop question ordering, branching logic builder, preview survey, publish survey

### SCR-D20-SURVEY-RESULTS
- **Name:** SurveyResults.tsx
- **Route:** /app/quality/surveys/:surveyId/results
- **Description:** Survey results analysis. Aggregated responses with charts, individual response viewer, trend comparison with previous surveys, and actionable insights.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SURVEY-RESPONSE
- **Agent Integration:** Quality Assurance (insight generation)
- **Key UI Elements:** Response summary charts, question-by-question breakdown, trend comparison, verbatim responses, export results

### SCR-D20-QUALITY-MEETING
- **Name:** QualityMeeting.tsx
- **Route:** /app/quality/meetings
- **Description:** Quality committee meeting management. Schedule meetings, prepare agendas with quality data, document minutes, and track action items from meetings.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEETING, DM-MEETING-MINUTES
- **Agent Integration:** Executive Assistant (agenda preparation)
- **Key UI Elements:** Meeting schedule, agenda builder with data links, minutes editor, action item tracker, meeting history

### SCR-D20-QUALITY-REPORT
- **Name:** QualityReport.tsx
- **Route:** /app/quality/reports
- **Description:** Quality report generator. Produce quarterly quality reports, annual quality summaries, and custom quality analysis reports with charts and trend data.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-QUALITY-INDICATOR, DM-QI-PROJECT
- **Agent Integration:** Quality Assurance (report generation), Analytics Engine (data aggregation)
- **Key UI Elements:** Report type selector, date range picker, quality indicator charts, QI project summaries, export PDF/Excel


# D21 — Agent Management & Orchestration

### SCR-D21-AGENT-HUB
- **Name:** AgentHub.tsx
- **Route:** /app/agents
- **Description:** Central agent management hub. Shows all 20 AI agents with status (active/paused/error), recent activity, performance metrics, and configuration access. The primary interface for managing the agentic core.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT, DM-AGENT-ACTIVITY
- **Agent Integration:** All agents (status monitoring)
- **Key UI Elements:** Agent grid with status indicators, activity feed per agent, performance score, configure button, pause/resume toggle

### SCR-D21-AGENT-DETAIL
- **Name:** AgentDetail.tsx
- **Route:** /app/agents/:agentId
- **Description:** Individual agent detail view. Shows agent description, capabilities, current configuration, activity log, performance metrics, error log, and configuration panel.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT, DM-AGENT-ACTIVITY, DM-AGENT-CONFIG
- **Agent Integration:** Specific agent (configuration)
- **Key UI Elements:** Agent description card, capability list, activity timeline, performance charts, error log, configuration panel

### SCR-D21-AGENT-CONFIG
- **Name:** AgentConfig.tsx
- **Route:** /app/agents/:agentId/config
- **Description:** Agent configuration panel. Adjust agent parameters: sensitivity thresholds, notification preferences, automation level (suggest/auto-execute), and integration settings.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-CONFIG
- **Agent Integration:** Specific agent (configuration update)
- **Key UI Elements:** Parameter sliders/inputs, automation level selector, notification preference toggles, integration settings, save configuration button

### SCR-D21-AGENT-ACTIVITY-LOG
- **Name:** AgentActivityLog.tsx
- **Route:** /app/agents/:agentId/activity
- **Description:** Agent activity log. Chronological record of all agent actions: recommendations made, alerts generated, documents created, and decisions executed.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-ACTIVITY
- **Agent Integration:** Specific agent (activity feed)
- **Key UI Elements:** Activity timeline, action type filter, date range filter, action detail expansion, export activity log

### SCR-D21-AGENT-RECOMMENDATIONS
- **Name:** AgentRecommendations.tsx
- **Route:** /app/agents/recommendations
- **Description:** Aggregated agent recommendations inbox. All pending recommendations from all agents with priority, category, affected resident/staff, and accept/dismiss actions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-AGENT-RECOMMENDATION
- **Agent Integration:** All agents (recommendation feed)
- **Key UI Elements:** Recommendation list with priority/category, agent source badge, affected entity link, accept/dismiss/defer buttons, recommendation detail

### SCR-D21-AGENT-PERFORMANCE
- **Name:** AgentPerformance.tsx
- **Route:** /app/agents/performance
- **Description:** Agent performance analytics. Tracks recommendation acceptance rates, accuracy scores, time savings, error rates, and user satisfaction per agent.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-PERFORMANCE
- **Agent Integration:** All agents (performance metrics)
- **Key UI Elements:** Agent performance comparison chart, acceptance rate per agent, accuracy score trend, time savings estimate, user satisfaction ratings

### SCR-D21-AGENT-ORCHESTRATION
- **Name:** AgentOrchestration.tsx
- **Route:** /app/agents/orchestration
- **Description:** Agent orchestration configuration. Define agent interaction rules, priority hierarchies, conflict resolution policies, and workflow triggers between agents.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-WORKFLOW
- **Agent Integration:** All agents (orchestration)
- **Key UI Elements:** Agent interaction diagram, priority hierarchy editor, conflict resolution rules, workflow trigger builder, save orchestration config

### SCR-D21-AGENT-ALERTS
- **Name:** AgentAlerts.tsx
- **Route:** /app/agents/alerts
- **Description:** Agent alert management. Configure alert thresholds, notification channels (in-app, email, SMS), escalation rules, and quiet hours per agent.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-ALERT-CONFIG
- **Agent Integration:** All agents (alert configuration)
- **Key UI Elements:** Alert threshold configuration per agent, notification channel selector, escalation rule builder, quiet hours schedule, test alert button

### SCR-D21-AGENT-TRAINING
- **Name:** AgentTraining.tsx
- **Route:** /app/agents/:agentId/training
- **Description:** Agent feedback and training interface. Review agent outputs, provide corrections, and train the agent on facility-specific patterns and preferences.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-TRAINING-DATA
- **Agent Integration:** Specific agent (training feedback)
- **Key UI Elements:** Output review queue, correction interface, pattern teaching tool, training data history, agent accuracy improvement chart

### SCR-D21-AGENT-AUDIT-TRAIL
- **Name:** AgentAuditTrail.tsx
- **Route:** /app/agents/audit-trail
- **Description:** Agent decision audit trail. Complete record of all agent decisions with input data, reasoning, output, and human review status. Required for regulatory compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-AGENT-AUDIT
- **Agent Integration:** All agents (audit logging)
- **Key UI Elements:** Audit trail table, agent filter, decision type filter, reasoning viewer, human review status, export audit trail


# D22 — Analytics & Reporting

### SCR-D22-ANALYTICS-DASHBOARD
- **Name:** AnalyticsDashboard.tsx
- **Route:** /app/analytics
- **Description:** Executive analytics dashboard. High-level KPIs across all domains: occupancy, quality scores, staffing metrics, financial summary, compliance status, and satisfaction scores.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** All domain data (aggregated)
- **Agent Integration:** Analytics Engine (KPI calculation), Executive Assistant (executive insights)
- **Key UI Elements:** KPI cards with sparklines, domain health indicators, trend comparison, alert summary, drill-down links per domain

### SCR-D22-CUSTOM-REPORT-BUILDER
- **Name:** CustomReportBuilder.tsx
- **Route:** /app/analytics/reports/builder
- **Description:** Custom report builder. Select data sources, metrics, dimensions, filters, and visualization types to create custom reports. Save and schedule report delivery.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** All domain data
- **Agent Integration:** Analytics Engine (data query)
- **Key UI Elements:** Data source selector, metric picker, dimension selector, filter builder, visualization type selector, save/schedule report

### SCR-D22-REPORT-LIBRARY
- **Name:** ReportLibrary.tsx
- **Route:** /app/analytics/reports
- **Description:** Report library. Pre-built and custom reports organized by domain. Includes standard regulatory reports, operational reports, and custom saved reports.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-REPORT
- **Agent Integration:** None
- **Key UI Elements:** Report cards organized by domain, search bar, run report button, schedule report, download report history

### SCR-D22-REPORT-VIEWER
- **Name:** ReportViewer.tsx
- **Route:** /app/analytics/reports/:reportId
- **Description:** Report viewer. Displays generated report with charts, tables, and narrative. Supports parameter adjustment, date range changes, and export to PDF/Excel.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-REPORT
- **Agent Integration:** None
- **Key UI Elements:** Report display with charts/tables, parameter adjustment panel, date range selector, export PDF/Excel, print report

### SCR-D22-SCHEDULED-REPORTS
- **Name:** ScheduledReports.tsx
- **Route:** /app/analytics/reports/scheduled
- **Description:** Scheduled report management. View and manage all scheduled reports with frequency, recipients, last run date, and next run date.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-REPORT-SCHEDULE
- **Agent Integration:** None
- **Key UI Elements:** Scheduled report list, frequency display, recipient list, last/next run dates, edit schedule, pause/resume

### SCR-D22-TREND-ANALYSIS
- **Name:** TrendAnalysis.tsx
- **Route:** /app/analytics/trends
- **Description:** Multi-metric trend analysis tool. Compare multiple metrics over time with configurable date ranges, smoothing, and benchmark overlays. Identify correlations and patterns.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** All domain data (time series)
- **Agent Integration:** Analytics Engine (trend calculation), Executive Assistant (pattern identification)
- **Key UI Elements:** Metric selector (multi-select), date range picker, trend line chart with overlays, correlation indicators, pattern annotations

### SCR-D22-BENCHMARK-COMPARISON
- **Name:** BenchmarkComparison.tsx
- **Route:** /app/analytics/benchmarks
- **Description:** Benchmark comparison dashboard. Compare facility metrics against industry benchmarks, state averages, and historical facility performance.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-BENCHMARK, DM-QUALITY-INDICATOR
- **Agent Integration:** Analytics Engine (benchmark data)
- **Key UI Elements:** Metric comparison bars (facility vs benchmark), percentile ranking, improvement areas, historical comparison, benchmark source citations

### SCR-D22-DATA-EXPORT
- **Name:** DataExport.tsx
- **Route:** /app/analytics/export
- **Description:** Data export tool. Select data domain, date range, and fields to export raw data in CSV/Excel format for external analysis.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** All domain data
- **Agent Integration:** None
- **Key UI Elements:** Domain selector, field picker, date range, format selector (CSV/Excel), export button, export history

### SCR-D22-EXECUTIVE-BRIEFING
- **Name:** ExecutiveBriefing.tsx
- **Route:** /app/analytics/executive-briefing
- **Description:** AI-generated executive briefing. Weekly/monthly summary of key metrics, notable events, risk areas, and recommended actions. Designed for board reporting.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** All domain data (aggregated)
- **Agent Integration:** Executive Assistant (primary — briefing generation), Analytics Engine (data aggregation)
- **Key UI Elements:** Briefing document with sections, key metric highlights, notable events, risk areas, recommended actions, export for board presentation

### SCR-D22-PREDICTIVE-ANALYTICS
- **Name:** PredictiveAnalytics.tsx
- **Route:** /app/analytics/predictive
- **Description:** Predictive analytics dashboard. AI-powered predictions for occupancy trends, staffing needs, financial projections, and quality risk areas. Shows confidence intervals and contributing factors.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** All domain data (historical)
- **Agent Integration:** Analytics Engine (predictive models), Executive Assistant (interpretation)
- **Key UI Elements:** Prediction cards with confidence intervals, contributing factor analysis, scenario comparison, historical accuracy display, prediction timeline

---

# D23 — Notifications & Alerts

### SCR-D23-NOTIFICATION-CENTER
- **Name:** NotificationCenter.tsx
- **Route:** /app/notifications
- **Description:** Unified notification center. All notifications from agents, system events, and user actions organized by priority and category. Supports mark as read, dismiss, and action links.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-NOTIFICATION
- **Agent Integration:** All agents (notification source)
- **Key UI Elements:** Notification list with priority badges, category filter, mark read/dismiss, action link per notification, bulk actions

### SCR-D23-NOTIFICATION-PREFERENCES
- **Name:** NotificationPreferences.tsx
- **Route:** /app/notifications/preferences
- **Description:** Personal notification preferences. Configure which notification types to receive, delivery channels (in-app, email, SMS, push), and quiet hours.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-NOTIFICATION-PREFERENCE
- **Agent Integration:** None
- **Key UI Elements:** Notification type toggles, channel selector per type, quiet hours schedule, frequency settings, save preferences

### SCR-D23-ALERT-RULES
- **Name:** AlertRules.tsx
- **Route:** /app/notifications/alert-rules
- **Description:** System-wide alert rule configuration. Define conditions that trigger alerts, severity levels, notification targets, and escalation paths.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ALERT-RULE
- **Agent Integration:** All agents (alert triggers)
- **Key UI Elements:** Alert rule list, condition builder, severity selector, target audience selector, escalation path builder, create rule button

### SCR-D23-ESCALATION-MANAGEMENT
- **Name:** EscalationManagement.tsx
- **Route:** /app/notifications/escalations
- **Description:** Escalation path management. Define escalation chains for different alert types with time-based escalation, role-based routing, and acknowledgment requirements.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ESCALATION-PATH
- **Agent Integration:** None
- **Key UI Elements:** Escalation chain builder, time-based escalation steps, role-based routing, acknowledgment requirements, test escalation

### SCR-D23-ALERT-HISTORY
- **Name:** AlertHistory.tsx
- **Route:** /app/notifications/history
- **Description:** Alert history and analytics. Historical record of all alerts with response times, acknowledgment status, resolution status, and alert volume trends.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-NOTIFICATION
- **Agent Integration:** Analytics Engine (alert analytics)
- **Key UI Elements:** Alert history table, response time metrics, acknowledgment rate, alert volume trend chart, category breakdown

### SCR-D23-SHIFT-HANDOFF
- **Name:** ShiftHandoff.tsx
- **Route:** /app/notifications/handoff
- **Description:** Shift handoff notification board. Outgoing shift staff documents key events, pending tasks, and resident concerns for incoming shift. Structured handoff with acknowledgment.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-HANDOFF-NOTE, DM-SHIFT
- **Agent Integration:** DocuBot (handoff summary generation)
- **Key UI Elements:** Handoff note editor by resident, pending task list, critical alert summary, incoming shift acknowledgment, handoff history


# D24 — System Settings & Administration

### SCR-D24-SYSTEM-SETTINGS
- **Name:** SystemSettings.tsx
- **Route:** /app/settings
- **Description:** System settings hub. Links to all configuration areas: facility profile, user management, role permissions, integrations, branding, and system preferences.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-SYSTEM-CONFIG
- **Agent Integration:** None
- **Key UI Elements:** Settings category cards with descriptions, navigation to sub-settings, system health indicator, version information

### SCR-D24-FACILITY-PROFILE
- **Name:** FacilityProfile.tsx
- **Route:** /app/settings/facility
- **Description:** Facility profile management. Edit facility name, address, phone, license number, bed count, licensing state, administrator of record, and facility type.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-FACILITY
- **Agent Integration:** None
- **Key UI Elements:** Facility info form, license number, bed count, licensing state selector, administrator of record, save button

### SCR-D24-USER-MANAGEMENT
- **Name:** UserManagement.tsx
- **Route:** /app/settings/users
- **Description:** User account management. List all system users with role, status, last login, and access level. Create, edit, deactivate, and reset passwords for user accounts.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-USER, DM-STAFF
- **Agent Integration:** None
- **Key UI Elements:** User table with role/status, create user button, edit user, deactivate user, reset password, last login display

### SCR-D24-ROLE-MANAGEMENT
- **Name:** RoleManagement.tsx
- **Route:** /app/settings/roles
- **Description:** Role and permission management. Define custom roles with granular permissions per module. View permission matrix and manage role assignments.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ROLE, DM-PERMISSION
- **Agent Integration:** None
- **Key UI Elements:** Role list, permission matrix (roles × modules), create custom role, edit role permissions, role assignment view

### SCR-D24-INTEGRATION-SETTINGS
- **Name:** IntegrationSettings.tsx
- **Route:** /app/settings/integrations
- **Description:** External integration management. Configure connections to pharmacy systems, lab systems, EHR systems, billing systems, and third-party services.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INTEGRATION
- **Agent Integration:** None
- **Key UI Elements:** Integration cards with connection status, configure connection, test connection, sync status, error log

### SCR-D24-BRANDING-SETTINGS
- **Name:** BrandingSettings.tsx
- **Route:** /app/settings/branding
- **Description:** Facility branding customization. Upload logo, set facility colors, customize email templates, and configure the family portal appearance.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-BRANDING
- **Agent Integration:** None
- **Key UI Elements:** Logo upload, color picker for primary/secondary/accent, email template editor, family portal preview, save branding

### SCR-D24-TEMPLATE-MANAGEMENT
- **Name:** TemplateManagement.tsx
- **Route:** /app/settings/templates
- **Description:** Document template management. Create and edit templates for care plans, progress notes, assessments, reports, and forms used throughout the system.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template list by category, template editor, variable insertion, preview template, publish/archive template

### SCR-D24-LOOKUP-MANAGEMENT
- **Name:** LookupManagement.tsx
- **Route:** /app/settings/lookups
- **Description:** Lookup table management. Configure dropdown values for diagnoses, medications, activity types, incident categories, and other system-wide lookup lists.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-LOOKUP
- **Agent Integration:** None
- **Key UI Elements:** Lookup category list, value list per category, add/edit/deactivate values, sort order, import/export values

### SCR-D24-WORKFLOW-SETTINGS
- **Name:** WorkflowSettings.tsx
- **Route:** /app/settings/workflows
- **Description:** Workflow configuration. Define approval workflows, notification triggers, and automated processes for incidents, PTO requests, medication changes, and care plan updates.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORKFLOW
- **Agent Integration:** None
- **Key UI Elements:** Workflow list by process, workflow step editor, approval chain builder, trigger condition builder, workflow status toggle

### SCR-D24-DATA-IMPORT
- **Name:** DataImport.tsx
- **Route:** /app/settings/import
- **Description:** Data import tool. Import resident records, staff records, and historical data from CSV/Excel files with field mapping, validation, and error reporting.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** Multiple domain models
- **Agent Integration:** None
- **Key UI Elements:** File upload, data type selector, field mapping interface, validation results, import preview, execute import

### SCR-D24-SYSTEM-LOG
- **Name:** SystemLog.tsx
- **Route:** /app/settings/logs
- **Description:** System event log. Technical system events including errors, performance metrics, integration sync status, and background job execution.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-SYSTEM-LOG
- **Agent Integration:** None
- **Key UI Elements:** Log event table, severity filter, source filter, date range, log detail expansion, export logs

### SCR-D24-BACKUP-SETTINGS
- **Name:** BackupSettings.tsx
- **Route:** /app/settings/backup
- **Description:** Data backup configuration. Schedule automated backups, view backup history, and initiate manual backups. Configure backup retention and restore procedures.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-BACKUP
- **Agent Integration:** None
- **Key UI Elements:** Backup schedule configuration, backup history list, manual backup button, restore procedure, retention policy settings


# D25 — Infection Control & Prevention

### SCR-D25-INFECTION-DASHBOARD
- **Name:** InfectionDashboard.tsx
- **Route:** /app/infection-control
- **Description:** Infection control dashboard. Active infection count, infection rate trends, outbreak status, hand hygiene compliance, and isolation precaution status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INFECTION, DM-INFECTION-RATE
- **Agent Integration:** Sentinel (infection surveillance)
- **Key UI Elements:** Active infection count, infection rate trend chart, outbreak alert, hand hygiene compliance gauge, isolation status summary

### SCR-D25-INFECTION-LOG
- **Name:** InfectionLog.tsx
- **Route:** /app/infection-control/log
- **Description:** Infection surveillance log. Documents all infections with resident, infection type, organism, onset date, treatment, and resolution. Supports line listing for outbreak investigation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INFECTION, DM-RESIDENT
- **Agent Integration:** Sentinel (infection detection)
- **Key UI Elements:** Infection list with type/organism/status, resident filter, date range filter, add infection entry, line listing export

### SCR-D25-INFECTION-ENTRY
- **Name:** InfectionEntry.tsx
- **Route:** /app/infection-control/log/new
- **Description:** New infection documentation. Record resident, infection type (UTI, respiratory, skin, GI, wound), organism (if known), onset date, symptoms, treatment, and isolation precautions.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-INFECTION, DM-RESIDENT
- **Agent Integration:** Sentinel (infection classification)
- **Key UI Elements:** Resident selector, infection type dropdown, organism field, onset date, symptom checklist, treatment documentation, isolation precaution selector

### SCR-D25-OUTBREAK-MANAGEMENT
- **Name:** OutbreakManagement.tsx
- **Route:** /app/infection-control/outbreaks
- **Description:** Outbreak detection and management. Tracks potential and confirmed outbreaks with affected residents, timeline, containment measures, and reporting to health department.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-OUTBREAK, DM-INFECTION
- **Agent Integration:** Sentinel (outbreak detection), Emergency Coordinator (containment)
- **Key UI Elements:** Outbreak status board, affected resident list, containment measure checklist, timeline visualization, health department reporting form

### SCR-D25-ISOLATION-MANAGEMENT
- **Name:** IsolationManagement.tsx
- **Route:** /app/infection-control/isolation
- **Description:** Isolation precaution management. Lists all residents on isolation with precaution type (contact, droplet, airborne), start date, and PPE requirements. Tracks compliance.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-ISOLATION, DM-RESIDENT
- **Agent Integration:** Sentinel (isolation recommendations)
- **Key UI Elements:** Isolation resident list, precaution type badges, PPE requirements per resident, compliance tracking, discontinue isolation workflow

### SCR-D25-HAND-HYGIENE
- **Name:** HandHygiene.tsx
- **Route:** /app/infection-control/hand-hygiene
- **Description:** Hand hygiene compliance monitoring. Document hand hygiene observations, calculate compliance rates by unit/shift/role, and track improvement trends.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-HAND-HYGIENE-OBS
- **Agent Integration:** Quality Assurance (compliance analysis)
- **Key UI Elements:** Observation entry form, compliance rate by unit/shift/role, trend chart, target compliance line, observation schedule

### SCR-D25-ANTIBIOTIC-STEWARDSHIP
- **Name:** AntibioticStewardship.tsx
- **Route:** /app/infection-control/antibiotic-stewardship
- **Description:** Antibiotic stewardship tracking. Monitors antibiotic usage patterns, duration of therapy, culture-guided prescribing, and antibiotic days per 1000 resident days.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-MEDICATION, DM-INFECTION, DM-LAB-RESULT
- **Agent Integration:** Sentinel (stewardship analysis)
- **Key UI Elements:** Antibiotic usage chart, duration of therapy tracker, culture-guided prescribing rate, antibiotic days metric, prescribing pattern analysis

### SCR-D25-IMMUNIZATION-TRACKER
- **Name:** ImmunizationTracker.tsx
- **Route:** /app/infection-control/immunizations
- **Description:** Resident and staff immunization tracking. Documents immunization status for influenza, pneumococcal, COVID-19, hepatitis B, and other required vaccines.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-IMMUNIZATION, DM-RESIDENT, DM-STAFF
- **Agent Integration:** Guardian (immunization compliance)
- **Key UI Elements:** Immunization matrix (residents/staff × vaccine types), status indicators, due date alerts, consent tracking, immunization rate dashboard

### SCR-D25-INFECTION-REPORT
- **Name:** InfectionReport.tsx
- **Route:** /app/infection-control/reports
- **Description:** Infection control reports. Infection rate reports, antibiogram data, outbreak summaries, and immunization compliance reports for regulatory submission and quality improvement.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-INFECTION, DM-IMMUNIZATION
- **Agent Integration:** Sentinel (report generation), Analytics Engine (data aggregation)
- **Key UI Elements:** Report type selector, date range picker, infection rate charts, antibiogram table, export for regulatory submission

### SCR-D25-PPE-INVENTORY
- **Name:** PpeInventory.tsx
- **Route:** /app/infection-control/ppe
- **Description:** PPE inventory management. Track personal protective equipment stock levels, usage rates, reorder points, and supply chain status.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY
- **Agent Integration:** Maintenance Coordinator (supply management)
- **Key UI Elements:** PPE item list with stock levels, usage rate chart, reorder point alerts, order history, supply chain status

### SCR-D25-ENVIRONMENTAL-CLEANING
- **Name:** EnvironmentalCleaning.tsx
- **Route:** /app/infection-control/cleaning
- **Description:** Environmental cleaning schedule and documentation. Track cleaning schedules, terminal cleaning for isolation rooms, and cleaning compliance audits.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-CLEANING-LOG
- **Agent Integration:** None
- **Key UI Elements:** Cleaning schedule by area, completion log, terminal cleaning tracker, audit checklist, compliance rate display

---

# D26 — Mobile & Point-of-Care Workflows

### SCR-D26-MOBILE-HOME
- **Name:** MobileHome.tsx
- **Route:** /m/home
- **Description:** Mobile-optimized home screen for direct care staff. Quick-access tiles for assigned residents, current shift tasks, medication passes, documentation, and alerts. Designed for phone/tablet use during care delivery.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-SHIFT, DM-RESIDENT, DM-TASK
- **Agent Integration:** None
- **Key UI Elements:** Assigned residents grid, shift task counter, pending med pass badge, documentation shortcut, alert banner

### SCR-D26-MOBILE-RESIDENT-CARD
- **Name:** MobileResidentCard.tsx
- **Route:** /m/residents/:id
- **Description:** Mobile resident quick-view card. Essential resident information at a glance: photo, name, room, diagnoses, allergies, diet, code status, and current care alerts. One-tap access to documentation.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-RESIDENT, DM-ALLERGY, DM-DIAGNOSIS
- **Agent Integration:** Sentinel (active alerts)
- **Key UI Elements:** Resident photo/name/room, allergy badges, diet badge, code status badge, active alerts, quick-doc buttons

### SCR-D26-MOBILE-TASK-LIST
- **Name:** MobileTaskList.tsx
- **Route:** /m/tasks
- **Description:** Mobile task list for current shift. Prioritized list of all tasks due during the shift: ADL care, medication passes, vital signs, documentation, and resident-specific tasks.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-TASK, DM-SHIFT
- **Agent Integration:** None
- **Key UI Elements:** Task list sorted by time/priority, task completion swipe, overdue task highlight, task detail expansion, complete all button

### SCR-D26-MOBILE-ADL-TRACKER
- **Name:** MobileAdlTracker.tsx
- **Route:** /m/residents/:id/adl
- **Description:** Mobile ADL (Activities of Daily Living) tracking. Quick-entry interface for documenting bathing, dressing, grooming, toileting, eating, and mobility assistance provided.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-ADL-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** ADL category buttons, assistance level selector per category, time stamp, notes field, submit ADL log

### SCR-D26-MOBILE-VITALS-ENTRY
- **Name:** MobileVitalsEntry.tsx
- **Route:** /m/residents/:id/vitals
- **Description:** Mobile vital signs entry. Quick-entry form for blood pressure, pulse, temperature, respirations, oxygen saturation, weight, and blood glucose. Auto-flags abnormal values.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-VITAL, DM-RESIDENT
- **Agent Integration:** Sentinel (abnormal value alert)
- **Key UI Elements:** Vital sign input fields, normal range reference, abnormal value highlight, device pairing option, submit vitals

### SCR-D26-MOBILE-MED-PASS
- **Name:** MobileMedPass.tsx
- **Route:** /m/residents/:id/med-pass
- **Description:** Mobile medication administration. Shows medications due for the resident at current pass time. Barcode scanning for medication verification. Documents administration, refusal, or hold.
- **Role Access:** R-DIRECT-CARE (med-certified)
- **Key Data:** DM-MEDICATION, DM-MAR, DM-RESIDENT
- **Agent Integration:** Pharma (medication verification)
- **Key UI Elements:** Medication list for current pass, barcode scanner, administer/refuse/hold buttons, PRN reason entry, signature capture

### SCR-D26-MOBILE-QUICK-NOTE
- **Name:** MobileQuickNote.tsx
- **Route:** /m/residents/:id/quick-note
- **Description:** Mobile quick documentation. Voice-to-text or typed quick note with category tag (observation, behavior, communication, care provided). Auto-timestamps and links to resident record.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-PROGRESS-NOTE, DM-RESIDENT
- **Agent Integration:** DocuBot (voice-to-text, note formatting)
- **Key UI Elements:** Voice record button, text input, category tag selector, resident auto-link, submit note

### SCR-D26-MOBILE-INCIDENT-REPORT
- **Name:** MobileIncidentReport.tsx
- **Route:** /m/incidents/new
- **Description:** Mobile incident reporting. Quick incident documentation with type, resident involved, description, witnesses, and immediate actions taken. Photo attachment support.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-INCIDENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Incident type selector, resident selector, description textarea with voice, witness entry, photo capture, submit incident

### SCR-D26-MOBILE-MEAL-TRACK
- **Name:** MobileMealTrack.tsx
- **Route:** /m/nutrition/meal-track
- **Description:** Mobile meal intake tracking. Quick-entry for documenting meal consumption percentage per resident during dining. Optimized for rapid data entry across multiple residents.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-MEAL-INTAKE, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Resident list for current meal, percentage slider per food item, fluid intake counter, feeding assistance note, batch submit

### SCR-D26-MOBILE-BEHAVIOR-LOG
- **Name:** MobileBehaviorLog.tsx
- **Route:** /m/residents/:id/behavior
- **Description:** Mobile behavior observation logging. Quick-entry for documenting behavioral observations with antecedent, behavior description, consequence, and intervention used.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-BEHAVIOR-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** ABC entry fields, behavior type selector, intervention used selector, duration/intensity, submit observation

### SCR-D26-MOBILE-HANDOFF
- **Name:** MobileHandoff.tsx
- **Route:** /m/handoff
- **Description:** Mobile shift handoff. View incoming handoff notes and create outgoing handoff documentation. Structured by resident with key events, pending tasks, and concerns.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-HANDOFF-NOTE, DM-SHIFT
- **Agent Integration:** DocuBot (handoff summary)
- **Key UI Elements:** Incoming handoff notes, outgoing handoff editor by resident, key events summary, pending tasks, acknowledge handoff

### SCR-D26-MOBILE-ALERT-RESPONSE
- **Name:** MobileAlertResponse.tsx
- **Route:** /m/alerts/:alertId
- **Description:** Mobile alert response interface. Displays alert details with recommended actions. Staff acknowledges, responds, and documents response actions.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-NOTIFICATION, DM-RESIDENT
- **Agent Integration:** Relevant agent (alert source)
- **Key UI Elements:** Alert detail with severity, recommended actions, acknowledge button, response documentation, escalate button

### SCR-D26-MOBILE-WOUND-PHOTO
- **Name:** MobileWoundPhoto.tsx
- **Route:** /m/residents/:id/wound-photo
- **Description:** Mobile wound photography with measurement. Capture wound photos with ruler overlay for measurement, tag wound location, and link to wound assessment record.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-WOUND, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Camera with ruler overlay, wound location body map, measurement annotation, link to wound record, submit photo

### SCR-D26-MOBILE-FALL-RISK-CHECK
- **Name:** MobileFallRiskCheck.tsx
- **Route:** /m/residents/:id/fall-risk
- **Description:** Mobile fall risk quick-check. Rapid fall risk assessment with key risk factors displayed. Quick-update for environmental checks and intervention verification.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-FALL-RISK, DM-RESIDENT
- **Agent Integration:** Sentinel (fall risk scoring)
- **Key UI Elements:** Current fall risk score, risk factor checklist, environmental check items, intervention verification, update risk assessment

### SCR-D26-MOBILE-SEIZURE-LOG
- **Name:** MobileSeizureLog.tsx
- **Route:** /m/residents/:id/seizure
- **Description:** Mobile seizure documentation. Quick-entry for seizure events with onset time, duration, type, body involvement, post-ictal state, and interventions. Timer for duration tracking.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-SEIZURE-LOG, DM-RESIDENT
- **Agent Integration:** Sentinel (seizure pattern tracking)
- **Key UI Elements:** Seizure timer, type selector, body involvement diagram, intervention checklist, post-ictal assessment, submit log

### SCR-D26-MOBILE-POSITIONING
- **Name:** MobilePositioning.tsx
- **Route:** /m/residents/:id/positioning
- **Description:** Mobile repositioning tracker. Documents repositioning schedule compliance for residents at risk of pressure injuries. Records position, time, and skin check observations.
- **Role Access:** R-DIRECT-CARE
- **Key Data:** DM-POSITIONING-LOG, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Current position display, reposition button with position selector, skin check notes, schedule compliance indicator, next reposition timer


# D27 — Physician Portal & Orders

### SCR-D27-PHYSICIAN-DASHBOARD
- **Name:** PhysicianDashboard.tsx
- **Route:** /app/physician
- **Description:** Physician portal dashboard. Shows assigned residents, pending orders for signature, lab results requiring review, and upcoming scheduled visits.
- **Role Access:** R-PHYSICIAN
- **Key Data:** DM-RESIDENT, DM-PHYSICIAN-ORDER, DM-LAB-RESULT
- **Agent Integration:** None
- **Key UI Elements:** Assigned resident list, pending orders count, lab results for review, upcoming visits, quick-order entry

### SCR-D27-ORDER-ENTRY
- **Name:** OrderEntry.tsx
- **Route:** /app/physician/orders/new
- **Description:** Physician order entry. Create new orders for medications, labs, treatments, dietary changes, activity modifications, and referrals. Supports verbal/telephone order documentation.
- **Role Access:** R-PHYSICIAN, R-CARE-MGR (telephone orders)
- **Key Data:** DM-PHYSICIAN-ORDER, DM-RESIDENT
- **Agent Integration:** Pharma (drug interaction check)
- **Key UI Elements:** Order type selector, medication order with dose/route/frequency, lab order, treatment order, verbal order documentation, sign order

### SCR-D27-ORDER-REVIEW
- **Name:** OrderReview.tsx
- **Route:** /app/physician/orders/review
- **Description:** Pending order review queue. Lists all orders awaiting physician signature with resident, order type, ordering date, and urgency. Supports batch signing.
- **Role Access:** R-PHYSICIAN
- **Key Data:** DM-PHYSICIAN-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Pending order list, order detail expansion, sign individual order, batch sign selected, reject with reason

### SCR-D27-LAB-REVIEW
- **Name:** LabReview.tsx
- **Route:** /app/physician/labs
- **Description:** Lab result review interface. Displays lab results for assigned residents with abnormal value flagging. Physician reviews, acknowledges, and documents follow-up actions.
- **Role Access:** R-PHYSICIAN
- **Key Data:** DM-LAB-RESULT, DM-RESIDENT
- **Agent Integration:** Sentinel (abnormal result flagging)
- **Key UI Elements:** Lab result list with abnormal flags, result detail with reference ranges, acknowledge result, order follow-up, document action

### SCR-D27-RESIDENT-SUMMARY
- **Name:** PhysicianResidentSummary.tsx
- **Route:** /app/physician/residents/:id
- **Description:** Physician-focused resident summary. Clinical overview with active diagnoses, current medications, recent vitals, recent labs, active orders, and care plan summary.
- **Role Access:** R-PHYSICIAN
- **Key Data:** DM-RESIDENT, DM-DIAGNOSIS, DM-MEDICATION, DM-VITAL, DM-LAB-RESULT
- **Agent Integration:** None
- **Key UI Elements:** Clinical summary header, active diagnoses list, medication list, recent vitals table, recent labs, active orders

### SCR-D27-VISIT-DOCUMENTATION
- **Name:** VisitDocumentation.tsx
- **Route:** /app/physician/visits/:visitId
- **Description:** Physician visit documentation. SOAP note format with subjective, objective, assessment, and plan sections. Supports voice-to-text and template-based documentation.
- **Role Access:** R-PHYSICIAN
- **Key Data:** DM-PHYSICIAN-VISIT, DM-RESIDENT
- **Agent Integration:** DocuBot (voice-to-text, SOAP formatting)
- **Key UI Elements:** SOAP note sections, voice dictation button, template selector, diagnosis coding, order entry from visit, sign visit note

### SCR-D27-STANDING-ORDERS
- **Name:** StandingOrders.tsx
- **Route:** /app/physician/standing-orders
- **Description:** Standing order management. Create and manage facility standing orders for common situations (falls, fever, behavioral crisis, constipation). Physician approval workflow.
- **Role Access:** R-PHYSICIAN, R-OWNER, R-ADMIN
- **Key Data:** DM-STANDING-ORDER
- **Agent Integration:** None
- **Key UI Elements:** Standing order list, order template editor, approval workflow, effective date management, print standing orders

### SCR-D27-ON-CALL-MANAGEMENT
- **Name:** OnCallManagement.tsx
- **Route:** /app/physician/on-call
- **Description:** On-call physician schedule and communication. Shows current on-call physician, on-call schedule, and secure messaging for after-hours clinical questions.
- **Role Access:** R-PHYSICIAN, R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-ON-CALL-SCHEDULE
- **Agent Integration:** None
- **Key UI Elements:** Current on-call display, on-call schedule calendar, secure message to on-call, on-call log, schedule editor


# D28 — Inventory & Supply Chain

### SCR-D28-INVENTORY-DASHBOARD
- **Name:** InventoryDashboard.tsx
- **Route:** /app/inventory
- **Description:** Inventory overview dashboard. Stock levels for medical supplies, PPE, office supplies, and facility supplies. Low-stock alerts, reorder status, and spending trends.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY, DM-PURCHASE-ORDER
- **Agent Integration:** Maintenance Coordinator (supply management)
- **Key UI Elements:** Stock level summary by category, low-stock alerts, pending orders, spending trend chart, reorder queue

### SCR-D28-INVENTORY-LIST
- **Name:** InventoryList.tsx
- **Route:** /app/inventory/items
- **Description:** Inventory item registry. All tracked items with name, category, current stock, par level, reorder point, unit cost, and preferred vendor.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY
- **Agent Integration:** None
- **Key UI Elements:** Item table with stock/par/reorder, category filter, low-stock filter, add item form, edit item

### SCR-D28-INVENTORY-ADJUST
- **Name:** InventoryAdjust.tsx
- **Route:** /app/inventory/adjust
- **Description:** Inventory adjustment entry. Record stock additions (deliveries), removals (usage), and adjustments (count corrections) with reason codes and documentation.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY-TRANSACTION
- **Agent Integration:** None
- **Key UI Elements:** Item selector, adjustment type, quantity, reason code, documentation notes, submit adjustment

### SCR-D28-PURCHASE-ORDER-LIST
- **Name:** PurchaseOrderList.tsx
- **Route:** /app/inventory/purchase-orders
- **Description:** Purchase order registry. All purchase orders with vendor, date, total, status (draft/submitted/received/paid), and line items.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PURCHASE-ORDER
- **Agent Integration:** None
- **Key UI Elements:** PO table with status badges, vendor filter, date range filter, create PO button, PO detail expansion

### SCR-D28-PURCHASE-ORDER-CREATE
- **Name:** PurchaseOrderCreate.tsx
- **Route:** /app/inventory/purchase-orders/new
- **Description:** Create purchase order. Select vendor, add line items from inventory catalog, set quantities, and submit for approval.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PURCHASE-ORDER, DM-VENDOR
- **Agent Integration:** None
- **Key UI Elements:** Vendor selector, item catalog search, line item builder, quantity/price per item, submit for approval

### SCR-D28-RECEIVING
- **Name:** Receiving.tsx
- **Route:** /app/inventory/receiving
- **Description:** Delivery receiving interface. Match received items against purchase orders, document quantities received, note discrepancies, and update inventory.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-PURCHASE-ORDER, DM-INVENTORY
- **Agent Integration:** None
- **Key UI Elements:** PO lookup, line item verification, quantity received entry, discrepancy notes, receive and update inventory

### SCR-D28-PAR-LEVEL-MANAGEMENT
- **Name:** ParLevelManagement.tsx
- **Route:** /app/inventory/par-levels
- **Description:** Par level configuration. Set minimum stock levels and reorder points for all inventory items based on usage patterns and lead times.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY
- **Agent Integration:** Analytics Engine (usage pattern analysis)
- **Key UI Elements:** Item list with current par/reorder levels, usage history per item, recommended par levels, bulk edit, save configuration

### SCR-D28-SUPPLY-REPORT
- **Name:** SupplyReport.tsx
- **Route:** /app/inventory/reports
- **Description:** Inventory and supply chain analytics. Stock turnover rates, spending by category, vendor performance, waste tracking, and cost per resident metrics.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-INVENTORY, DM-PURCHASE-ORDER
- **Agent Integration:** Analytics Engine (supply analytics)
- **Key UI Elements:** Spending by category chart, stock turnover rates, vendor performance comparison, waste tracking, cost per resident trend

---

# D29 — Agentic Workflows & Automation

### SCR-D29-WORKFLOW-DASHBOARD
- **Name:** WorkflowDashboard.tsx
- **Route:** /app/workflows
- **Description:** Active workflow monitoring dashboard. Shows all running automated workflows with status, progress, triggering event, and assigned agent. Supports manual intervention and workflow pause/resume.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORKFLOW-INSTANCE
- **Agent Integration:** All agents (workflow execution)
- **Key UI Elements:** Active workflow list with status, workflow progress bars, triggering event display, pause/resume buttons, manual intervention link

### SCR-D29-WORKFLOW-BUILDER
- **Name:** WorkflowBuilder.tsx
- **Route:** /app/workflows/builder
- **Description:** Visual workflow builder. Create custom automated workflows with trigger conditions, agent actions, decision points, human approval gates, and notification steps. Drag-and-drop interface.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORKFLOW-TEMPLATE
- **Agent Integration:** All agents (available actions)
- **Key UI Elements:** Drag-and-drop canvas, trigger node, action nodes per agent, decision nodes, approval gates, notification nodes, save/publish workflow

### SCR-D29-WORKFLOW-TEMPLATES
- **Name:** WorkflowTemplates.tsx
- **Route:** /app/workflows/templates
- **Description:** Pre-built workflow template library. Common care facility workflows: new admission onboarding, incident response, medication change, care plan review, discharge process, and compliance audit.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-WORKFLOW-TEMPLATE
- **Agent Integration:** None
- **Key UI Elements:** Template cards with description, preview workflow diagram, customize template, activate template, template category filter

### SCR-D29-WORKFLOW-INSTANCE
- **Name:** WorkflowInstance.tsx
- **Route:** /app/workflows/:instanceId
- **Description:** Single workflow instance detail. Shows workflow diagram with current step highlighted, step history with timestamps, pending actions, and completion status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-WORKFLOW-INSTANCE
- **Agent Integration:** Relevant agents (step execution)
- **Key UI Elements:** Workflow diagram with current step, step history timeline, pending action detail, manual override option, complete/cancel workflow

### SCR-D29-APPROVAL-QUEUE
- **Name:** ApprovalQueue.tsx
- **Route:** /app/workflows/approvals
- **Description:** Pending approval queue. All workflow steps requiring human approval across all active workflows. Shows context, recommended action, and approve/deny buttons.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-WORKFLOW-INSTANCE
- **Agent Integration:** Relevant agents (approval context)
- **Key UI Elements:** Approval list with workflow context, recommended action display, approve/deny buttons, delegate approval, approval history

### SCR-D29-AUTOMATION-RULES
- **Name:** AutomationRules.tsx
- **Route:** /app/workflows/automation-rules
- **Description:** Automation rule management. Define trigger-action rules that agents execute automatically without workflow overhead. Simple if-then rules for common automations.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AUTOMATION-RULE
- **Agent Integration:** All agents (rule execution)
- **Key UI Elements:** Rule list with trigger/action, create rule form, condition builder, action selector, enable/disable toggle, rule execution log

### SCR-D29-AGENT-CHAT
- **Name:** AgentChat.tsx
- **Route:** /app/agents/chat
- **Description:** Conversational agent interface. Natural language interaction with the AI system for queries, task requests, and information retrieval. Context-aware responses based on user role and current screen.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** All domain data (contextual)
- **Agent Integration:** All agents (conversational interface)
- **Key UI Elements:** Chat message thread, natural language input, agent response with citations, action suggestion cards, conversation history

### SCR-D29-AGENT-TASK-QUEUE
- **Name:** AgentTaskQueue.tsx
- **Route:** /app/agents/tasks
- **Description:** Agent task execution queue. Shows all tasks currently being processed by agents with status, estimated completion, and priority. Supports task cancellation and reprioritization.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AGENT-TASK
- **Agent Integration:** All agents (task execution)
- **Key UI Elements:** Task queue sorted by priority, agent assignment per task, status indicators, estimated completion, cancel/reprioritize buttons

### SCR-D29-SMART-SUGGESTIONS
- **Name:** SmartSuggestions.tsx
- **Route:** /app/agents/suggestions
- **Description:** AI-powered contextual suggestions panel. Proactive recommendations based on current data patterns: care plan adjustments, staffing optimizations, compliance actions, and quality improvements.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** All domain data (analyzed)
- **Agent Integration:** All agents (suggestion generation)
- **Key UI Elements:** Suggestion cards with rationale, impact estimate, accept/dismiss/defer, suggestion category filter, suggestion history

### SCR-D29-BATCH-OPERATIONS
- **Name:** BatchOperations.tsx
- **Route:** /app/workflows/batch
- **Description:** Batch operation management. Execute bulk operations across multiple records: batch care plan reviews, batch medication reconciliation, batch compliance checks, and batch report generation.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** Multiple domain models
- **Agent Integration:** Relevant agents (batch execution)
- **Key UI Elements:** Operation type selector, record selection criteria, preview affected records, execute batch, progress tracker, results summary


# D30 — Shared UI Components & Patterns

### SCR-D30-GLOBAL-SEARCH
- **Name:** GlobalSearch.tsx
- **Route:** /app/search
- **Description:** Facility-wide search. Search across residents, staff, documents, medications, incidents, and all other records. Results grouped by category with relevance ranking and quick-action links.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** All domain data (indexed)
- **Agent Integration:** None
- **Key UI Elements:** Search input with type-ahead, category-grouped results, relevance ranking, quick-action links per result, recent searches

### SCR-D30-HELP-CENTER
- **Name:** HelpCenter.tsx
- **Route:** /app/help
- **Description:** In-app help center. Searchable knowledge base with user guides, video tutorials, FAQ, and contextual help articles. Supports help ticket submission.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-FAMILY
- **Key Data:** DM-HELP-ARTICLE
- **Agent Integration:** None
- **Key UI Elements:** Search bar, article categories, video tutorial gallery, FAQ accordion, submit help ticket

### SCR-D30-USER-PROFILE
- **Name:** UserProfile.tsx
- **Route:** /app/profile
- **Description:** User profile management. View and edit personal information, change password, configure notification preferences, set language/timezone, and manage two-factor authentication.
- **Role Access:** All roles
- **Key Data:** DM-USER
- **Agent Integration:** None
- **Key UI Elements:** Profile photo upload, personal info form, password change, notification preferences link, 2FA setup, timezone selector

### SCR-D30-PRINT-CENTER
- **Name:** PrintCenter.tsx
- **Route:** /app/print
- **Description:** Centralized print queue. Batch print documents, reports, care plans, medication sheets, and forms. Supports print preview and PDF generation.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** Multiple domain models
- **Agent Integration:** None
- **Key UI Elements:** Print queue list, document preview, print selected, generate PDF, batch print settings

### SCR-D30-CALENDAR-UNIFIED
- **Name:** CalendarUnified.tsx
- **Route:** /app/calendar
- **Description:** Unified facility calendar. Aggregates all calendar events: appointments, activities, staff schedules, compliance deadlines, and meetings. Filterable by category and role.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-APPOINTMENT, DM-ACTIVITY, DM-SHIFT, DM-COMPLIANCE-TASK, DM-MEETING
- **Agent Integration:** None
- **Key UI Elements:** Monthly/weekly/daily calendar, category color coding, category filter, event detail on click, create event button

### SCR-D30-FILE-MANAGER
- **Name:** FileManager.tsx
- **Route:** /app/files
- **Description:** Facility file manager. Browse, upload, and organize facility documents. Folder structure by category with search, version control, and access permissions.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-FILE, DM-DOCUMENT
- **Agent Integration:** None
- **Key UI Elements:** Folder tree, file list with metadata, upload button, search bar, version history, access permission settings

### SCR-D30-AUDIT-VIEWER
- **Name:** AuditViewer.tsx
- **Route:** /app/audit/:entityType/:entityId
- **Description:** Universal audit trail viewer. Shows change history for any record in the system with timestamp, user, field changed, old value, and new value.
- **Role Access:** R-OWNER, R-ADMIN, R-AUDITOR
- **Key Data:** DM-AUDIT-LOG
- **Agent Integration:** None
- **Key UI Elements:** Change history table, field-level diff view, user/timestamp per change, date range filter, export audit trail

### SCR-D30-SIGNATURE-CAPTURE
- **Name:** SignatureCapture.tsx
- **Route:** (modal component)
- **Description:** Digital signature capture component. Used across the system for document signing, order verification, and consent acknowledgment. Captures signature with timestamp and signer identity.
- **Role Access:** All roles
- **Key Data:** DM-SIGNATURE
- **Agent Integration:** None
- **Key UI Elements:** Signature pad, clear/redo, signer name display, timestamp, save signature

### SCR-D30-BODY-MAP
- **Name:** BodyMap.tsx
- **Route:** (modal component)
- **Description:** Interactive body map component. Used for wound location marking, pain assessment location, injury documentation, and skin assessment. Supports front/back views with annotation.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** Various (contextual)
- **Agent Integration:** None
- **Key UI Elements:** Front/back body diagram, click-to-mark locations, annotation per mark, mark type selector, save locations

### SCR-D30-TIMELINE-VIEWER
- **Name:** TimelineViewer.tsx
- **Route:** (embedded component)
- **Description:** Universal timeline component. Chronological event display used across domains for resident history, incident timelines, workflow progress, and care plan evolution.
- **Role Access:** All roles (contextual)
- **Key Data:** Various (contextual)
- **Agent Integration:** None
- **Key UI Elements:** Chronological event list, event type icons, date grouping, event detail expansion, filter by event type

### SCR-D30-DASHBOARD-WIDGET-LIBRARY
- **Name:** DashboardWidgetLibrary.tsx
- **Route:** /app/dashboard/widgets
- **Description:** Dashboard widget library for customizable dashboards. Browse available widgets by category, preview widget data, and add to personal or role-based dashboards.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** Various (widget-specific)
- **Agent Integration:** None
- **Key UI Elements:** Widget catalog by category, widget preview, add to dashboard button, widget configuration, widget size options

### SCR-D30-ONBOARDING-TOUR
- **Name:** OnboardingTour.tsx
- **Route:** (overlay component)
- **Description:** Interactive onboarding tour for new users. Step-by-step guided tour of the system highlighting key features, navigation, and workflows based on user role.
- **Role Access:** All roles
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Step-by-step overlay, feature highlight, next/previous/skip buttons, progress indicator, role-specific tour paths

### SCR-D30-ACCESSIBILITY-SETTINGS
- **Name:** AccessibilitySettings.tsx
- **Route:** /app/settings/accessibility
- **Description:** Accessibility configuration. Font size adjustment, high contrast mode, screen reader optimization, keyboard navigation preferences, and color blind mode.
- **Role Access:** All roles
- **Key Data:** DM-USER-PREFERENCE
- **Agent Integration:** None
- **Key UI Elements:** Font size slider, high contrast toggle, screen reader mode toggle, keyboard navigation settings, color blind mode selector

### SCR-D30-ERROR-PAGE
- **Name:** ErrorPage.tsx
- **Route:** /app/error
- **Description:** Graceful error page. Displays user-friendly error message with error code, suggested actions, and support contact. Automatically logs error details for debugging.
- **Role Access:** All roles
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Error illustration, error message, suggested actions, return to dashboard button, contact support link

### SCR-D30-MAINTENANCE-MODE
- **Name:** MaintenanceMode.tsx
- **Route:** /maintenance
- **Description:** System maintenance mode page. Displayed during scheduled maintenance with estimated completion time, maintenance description, and emergency contact information.
- **Role Access:** All roles (unauthenticated)
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Maintenance illustration, estimated completion time, maintenance description, emergency contact, auto-refresh countdown

---

# D31 — Behavioral Health & Mental Wellness

### SCR-D31-BEHAVIORAL-DASHBOARD
- **Name:** BehavioralDashboard.tsx
- **Route:** /app/behavioral-health
- **Description:** Behavioral health overview. Active behavior support plans, behavioral incident trends, psychiatric medication monitoring, and mental health screening status across the facility.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-BEHAVIOR-PLAN, DM-BEHAVIOR-LOG, DM-MEDICATION
- **Agent Integration:** Compass (behavioral analysis)
- **Key UI Elements:** Active BSP count, behavioral incident trend chart, psychiatric med monitoring alerts, screening status summary, high-risk resident list

### SCR-D31-BSP-LIST
- **Name:** BspList.tsx
- **Route:** /app/behavioral-health/plans
- **Description:** Behavior Support Plan registry. All active and historical BSPs with resident, target behaviors, intervention strategies, and review dates.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-BEHAVIOR-PLAN, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** BSP list with resident/status, target behavior summary, next review date, create BSP button, BSP detail link

### SCR-D31-BSP-DETAIL
- **Name:** BspDetail.tsx
- **Route:** /app/behavioral-health/plans/:bspId
- **Description:** Behavior Support Plan detail. Target behaviors with operational definitions, antecedent strategies, replacement behaviors, consequence strategies, crisis intervention procedures, and data collection methods.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE (assigned)
- **Key Data:** DM-BEHAVIOR-PLAN, DM-RESIDENT
- **Agent Integration:** Compass (behavior analysis)
- **Key UI Elements:** Target behavior definitions, antecedent strategy list, replacement behavior descriptions, consequence strategies, crisis procedures, data collection forms

### SCR-D31-BSP-CREATE
- **Name:** BspCreate.tsx
- **Route:** /app/behavioral-health/plans/new
- **Description:** Create Behavior Support Plan. Functional behavior assessment summary, target behavior definitions, intervention strategies, data collection plan, and review schedule.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-BEHAVIOR-PLAN, DM-RESIDENT
- **Agent Integration:** Compass (FBA analysis, intervention recommendations)
- **Key UI Elements:** FBA summary section, target behavior builder, intervention strategy builder, data collection method selector, review schedule, save BSP

### SCR-D31-BEHAVIOR-DATA-COLLECTION
- **Name:** BehaviorDataCollection.tsx
- **Route:** /app/behavioral-health/data/:residentId
- **Description:** Behavior data collection interface. Record behavioral observations using the data collection methods defined in the BSP: frequency counts, duration recording, interval recording, and ABC data.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-BEHAVIOR-LOG, DM-BEHAVIOR-PLAN
- **Agent Integration:** None
- **Key UI Elements:** Data collection form matching BSP method, frequency counter, duration timer, interval recording grid, ABC entry, submit data

### SCR-D31-BEHAVIOR-ANALYSIS
- **Name:** BehaviorAnalysis.tsx
- **Route:** /app/behavioral-health/analysis/:residentId
- **Description:** Behavior data analysis. Charts showing behavior frequency, duration, and intensity trends over time. Pattern analysis identifying triggers, time-of-day patterns, and intervention effectiveness.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-BEHAVIOR-LOG, DM-BEHAVIOR-PLAN
- **Agent Integration:** Compass (pattern analysis, trend identification)
- **Key UI Elements:** Behavior frequency trend chart, trigger pattern analysis, time-of-day heat map, intervention effectiveness comparison, recommendation cards

### SCR-D31-MENTAL-HEALTH-SCREENING
- **Name:** MentalHealthScreening.tsx
- **Route:** /app/behavioral-health/screenings
- **Description:** Mental health screening management. Schedule and track standardized screenings (PHQ-9, GAD-7, MoCA) with scoring, interpretation, and follow-up action tracking.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-SCREENING, DM-RESIDENT
- **Agent Integration:** Sentinel (screening schedule), Compass (interpretation)
- **Key UI Elements:** Screening schedule, screening form with auto-scoring, score interpretation guide, follow-up action entry, screening history per resident

### SCR-D31-PSYCHIATRIC-MED-MONITOR
- **Name:** PsychiatricMedMonitor.tsx
- **Route:** /app/behavioral-health/psych-meds
- **Description:** Psychiatric medication monitoring dashboard. Tracks psychotropic medication use, side effect monitoring, dose changes, and gradual dose reduction attempts as required by regulations.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-MEDICATION, DM-RESIDENT
- **Agent Integration:** Pharma (medication monitoring), Guardian (regulatory compliance)
- **Key UI Elements:** Psychotropic med list by resident, side effect monitoring schedule, dose change history, GDR attempt tracking, regulatory compliance status

### SCR-D31-RESTRAINT-REDUCTION
- **Name:** RestraintReduction.tsx
- **Route:** /app/behavioral-health/restraints
- **Description:** Restraint and restrictive intervention tracking. Documents all restraint use with type, duration, reason, and alternatives attempted. Tracks restraint reduction goals and progress.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-AUDITOR
- **Key Data:** DM-RESTRAINT-LOG, DM-RESIDENT
- **Agent Integration:** Guardian (restraint compliance), Advocate (restraint reduction)
- **Key UI Elements:** Restraint event log, restraint type/duration/reason, alternatives attempted, reduction goal tracking, facility restraint rate trend

### SCR-D31-CRISIS-INTERVENTION
- **Name:** CrisisIntervention.tsx
- **Route:** /app/behavioral-health/crisis
- **Description:** Crisis intervention documentation. Record behavioral crisis events with de-escalation techniques used, staff involved, duration, outcome, and post-crisis debrief.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-CRISIS-EVENT, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Crisis event entry form, de-escalation technique checklist, staff involvement log, outcome documentation, debrief notes


# D32 — Therapy Services

### SCR-D32-THERAPY-DASHBOARD
- **Name:** TherapyDashboard.tsx
- **Route:** /app/therapy
- **Description:** Therapy services overview. Active therapy authorizations, session scheduling, progress toward goals, and therapy utilization metrics.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-THERAPY-AUTH, DM-THERAPY-SESSION, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Active authorization count, session schedule, goal progress summary, utilization metrics, authorization expiring alerts

### SCR-D32-THERAPY-AUTH-LIST
- **Name:** TherapyAuthList.tsx
- **Route:** /app/therapy/authorizations
- **Description:** Therapy authorization registry. All therapy authorizations with resident, therapy type (PT/OT/ST/behavioral), authorized units, used units, and expiration date.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-THERAPY-AUTH, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Authorization table, therapy type filter, units used/authorized display, expiration alerts, create authorization

### SCR-D32-THERAPY-SESSION-LOG
- **Name:** TherapySessionLog.tsx
- **Route:** /app/therapy/sessions
- **Description:** Therapy session documentation. Record therapy sessions with date, therapist, therapy type, activities performed, resident response, and progress notes.
- **Role Access:** R-CARE-MGR
- **Key Data:** DM-THERAPY-SESSION, DM-RESIDENT
- **Agent Integration:** DocuBot (session note formatting)
- **Key UI Elements:** Session entry form, therapy type selector, activity documentation, resident response notes, goal progress update, submit session

### SCR-D32-THERAPY-GOALS
- **Name:** TherapyGoals.tsx
- **Route:** /app/therapy/residents/:id/goals
- **Description:** Therapy goal tracking per resident. Lists therapy goals by discipline with baseline, target, current performance, and progress trend.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-FAMILY (linked)
- **Key Data:** DM-THERAPY-GOAL, DM-RESIDENT
- **Agent Integration:** None
- **Key UI Elements:** Goal list by therapy type, baseline/target/current display, progress trend chart, goal status badges, add/edit goal

### SCR-D32-THERAPY-SCHEDULE
- **Name:** TherapySchedule.tsx
- **Route:** /app/therapy/schedule
- **Description:** Therapy session scheduling calendar. Shows all scheduled therapy sessions by therapist and resident. Supports recurring session scheduling and cancellation tracking.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-THERAPY-SESSION, DM-RESIDENT
- **Agent Integration:** Nexus (scheduling optimization)
- **Key UI Elements:** Calendar with therapy blocks, therapist filter, resident filter, schedule session, cancellation log

### SCR-D32-THERAPY-REPORT
- **Name:** TherapyReport.tsx
- **Route:** /app/therapy/reports
- **Description:** Therapy utilization and outcome reports. Session counts, authorization utilization rates, goal achievement rates, and therapy cost analysis.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-THERAPY-SESSION, DM-THERAPY-AUTH, DM-THERAPY-GOAL
- **Agent Integration:** Analytics Engine (therapy analytics)
- **Key UI Elements:** Session count trend, authorization utilization chart, goal achievement rates, cost analysis, date range selector


# D33 — Multi-Facility Management

### SCR-D33-MULTI-FACILITY-DASHBOARD
- **Name:** MultiFacilityDashboard.tsx
- **Route:** /app/enterprise
- **Description:** Multi-facility overview dashboard. Aggregated KPIs across all facilities: occupancy, quality scores, staffing, compliance, and financial performance. Facility comparison and ranking.
- **Role Access:** R-OWNER
- **Key Data:** All domain data (multi-facility aggregated)
- **Agent Integration:** Executive Assistant (enterprise insights)
- **Key UI Elements:** Facility selector, KPI comparison table, facility ranking, aggregated trend charts, drill-down to individual facility

### SCR-D33-FACILITY-COMPARISON
- **Name:** FacilityComparison.tsx
- **Route:** /app/enterprise/compare
- **Description:** Side-by-side facility comparison. Compare selected metrics across facilities with charts and tables. Identify best practices and improvement opportunities.
- **Role Access:** R-OWNER
- **Key Data:** All domain data (multi-facility)
- **Agent Integration:** Analytics Engine (comparison analysis)
- **Key UI Elements:** Facility multi-selector, metric selector, comparison bar charts, ranking tables, best practice identification

### SCR-D33-ENTERPRISE-REPORTING
- **Name:** EnterpriseReporting.tsx
- **Route:** /app/enterprise/reports
- **Description:** Enterprise-level reporting. Consolidated reports across all facilities for board presentations, regulatory submissions, and strategic planning.
- **Role Access:** R-OWNER
- **Key Data:** All domain data (multi-facility)
- **Agent Integration:** Executive Assistant (report generation), Analytics Engine (data aggregation)
- **Key UI Elements:** Report type selector, facility scope selector, consolidated charts/tables, export for board presentation, schedule delivery

### SCR-D33-POLICY-MANAGEMENT
- **Name:** PolicyManagement.tsx
- **Route:** /app/enterprise/policies
- **Description:** Enterprise policy management. Create and distribute policies across all facilities. Track acknowledgment and compliance per facility.
- **Role Access:** R-OWNER
- **Key Data:** DM-POLICY, DM-FACILITY
- **Agent Integration:** Guardian (policy compliance)
- **Key UI Elements:** Policy list with distribution status, create/edit policy, distribute to facilities, acknowledgment tracking per facility, compliance dashboard

### SCR-D33-ENTERPRISE-STAFFING
- **Name:** EnterpriseStaffing.tsx
- **Route:** /app/enterprise/staffing
- **Description:** Enterprise staffing overview. Cross-facility staffing metrics, shared staff pool management, and inter-facility staff transfer coordination.
- **Role Access:** R-OWNER
- **Key Data:** DM-STAFF, DM-SHIFT (multi-facility)
- **Agent Integration:** Nexus (cross-facility optimization)
- **Key UI Elements:** Staffing metrics by facility, shared staff pool, transfer request management, cross-facility scheduling, staffing cost comparison

### SCR-D33-ENTERPRISE-FINANCE
- **Name:** EnterpriseFinance.tsx
- **Route:** /app/enterprise/finance
- **Description:** Enterprise financial overview. Consolidated financial statements, facility-level P&L comparison, budget tracking across facilities, and capital expenditure planning.
- **Role Access:** R-OWNER
- **Key Data:** DM-REVENUE, DM-EXPENSE, DM-BUDGET (multi-facility)
- **Agent Integration:** Billing Analyst (financial analysis), Executive Assistant (strategic insights)
- **Key UI Elements:** Consolidated revenue/expense, facility P&L comparison, budget vs actual by facility, capital expenditure tracker, financial trend charts

---

# D34 — Emergency Management & Safety

### SCR-D34-EMERGENCY-DASHBOARD
- **Name:** EmergencyDashboard.tsx
- **Route:** /app/emergency
- **Description:** Emergency management command center. Active emergency status, evacuation tracking, resident accountability, staff check-in, and emergency communication hub. Activated during declared emergencies.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-EMERGENCY-EVENT, DM-RESIDENT, DM-STAFF
- **Agent Integration:** Emergency Coordinator (emergency management)
- **Key UI Elements:** Emergency status banner, resident accountability board, staff check-in tracker, emergency communication log, evacuation progress

### SCR-D34-EVACUATION-TRACKER
- **Name:** EvacuationTracker.tsx
- **Route:** /app/emergency/evacuation
- **Description:** Evacuation tracking board. Real-time tracking of resident evacuation status with mobility level, assistance needs, current location, and assigned escort.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-RESIDENT, DM-EVACUATION-STATUS
- **Agent Integration:** Emergency Coordinator (evacuation coordination)
- **Key UI Elements:** Resident list with evacuation status, mobility level indicators, escort assignment, location tracking, all-clear confirmation

### SCR-D34-EMERGENCY-CONTACTS
- **Name:** EmergencyContacts.tsx
- **Route:** /app/emergency/contacts
- **Description:** Emergency contact directory. Quick-access directory of all emergency contacts: fire department, police, hospital, poison control, utility companies, and key staff.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-EMERGENCY-CONTACT
- **Agent Integration:** None
- **Key UI Elements:** Contact cards with one-tap call, category grouping, search bar, edit contacts, print emergency contact sheet

### SCR-D34-DRILL-MANAGEMENT
- **Name:** DrillManagement.tsx
- **Route:** /app/emergency/drills
- **Description:** Emergency drill scheduling and documentation. Schedule fire drills, tornado drills, lockdown drills, and elopement drills. Document drill execution, timing, and improvement areas.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-DRILL-LOG
- **Agent Integration:** Guardian (drill compliance)
- **Key UI Elements:** Drill schedule calendar, drill type selector, drill documentation form, timing records, improvement notes, drill history

### SCR-D34-ELOPEMENT-RESPONSE
- **Name:** ElopementResponse.tsx
- **Route:** /app/emergency/elopement
- **Description:** Elopement response protocol. Activated when a resident is reported missing. Shows resident photo, description, last known location, search assignments, and notification status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-RESIDENT, DM-ELOPEMENT-EVENT
- **Agent Integration:** Emergency Coordinator (search coordination)
- **Key UI Elements:** Resident photo/description, last known location, search area assignments, notification checklist (staff/family/police), found confirmation

### SCR-D34-WEATHER-ALERTS
- **Name:** WeatherAlerts.tsx
- **Route:** /app/emergency/weather
- **Description:** Weather alert monitoring. Displays active weather alerts for the facility location with severity, recommended actions, and facility preparation status.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-WEATHER-ALERT
- **Agent Integration:** Emergency Coordinator (weather monitoring)
- **Key UI Elements:** Active weather alerts with severity, recommended action checklist, facility preparation status, alert history, notification trigger

### SCR-D34-SAFETY-ROUNDS
- **Name:** SafetyRounds.tsx
- **Route:** /app/emergency/safety-rounds
- **Description:** Safety rounds documentation. Scheduled environmental safety rounds with checklist items: exit clearance, fire equipment, hazard identification, and resident safety checks.
- **Role Access:** R-CARE-MGR, R-DIRECT-CARE
- **Key Data:** DM-SAFETY-ROUND
- **Agent Integration:** None
- **Key UI Elements:** Safety round checklist, area-by-area inspection, hazard reporting, photo documentation, completion timestamp

### SCR-D34-GENERATOR-LOG
- **Name:** GeneratorLog.tsx
- **Route:** /app/emergency/generator
- **Description:** Emergency generator testing and maintenance log. Documents weekly generator tests, fuel levels, load testing, and maintenance history.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-GENERATOR-LOG
- **Agent Integration:** Maintenance Coordinator (generator maintenance)
- **Key UI Elements:** Test schedule, test result entry form, fuel level tracking, load test documentation, maintenance history

### SCR-D34-EMERGENCY-SUPPLY-CHECK
- **Name:** EmergencySupplyCheck.tsx
- **Route:** /app/emergency/supplies
- **Description:** Emergency supply inventory check. Periodic verification of emergency supplies: water, food, medications, flashlights, batteries, first aid, and blankets.
- **Role Access:** R-OWNER, R-ADMIN, R-CARE-MGR
- **Key Data:** DM-EMERGENCY-SUPPLY
- **Agent Integration:** None
- **Key UI Elements:** Supply checklist with quantity verification, expiration date checks, restock alerts, last verified date, verification sign-off

### SCR-D34-INCIDENT-COMMAND
- **Name:** IncidentCommand.tsx
- **Route:** /app/emergency/incident-command
- **Description:** Incident Command System (ICS) activation interface. Assign ICS roles, document command decisions, track resource deployment, and manage inter-agency communication during major emergencies.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-ICS-ACTIVATION
- **Agent Integration:** Emergency Coordinator (ICS management)
- **Key UI Elements:** ICS org chart with role assignments, command log, resource tracking, inter-agency communication log, deactivation checklist

### SCR-D34-AFTER-ACTION-REVIEW
- **Name:** AfterActionReview.tsx
- **Route:** /app/emergency/after-action/:eventId
- **Description:** Post-emergency after-action review. Structured debrief documenting what happened, what went well, what needs improvement, and action items for emergency plan updates.
- **Role Access:** R-OWNER, R-ADMIN
- **Key Data:** DM-AFTER-ACTION-REVIEW
- **Agent Integration:** Quality Assurance (improvement identification)
- **Key UI Elements:** Event timeline reconstruction, strengths documentation, improvement areas, action item assignment, emergency plan update recommendations

---


---

## 4. Marketing and Public Website Screens

The following screens serve the public-facing marketing website and are accessible without authentication.

### SCR-MKT-HOME
- **Name:** Home.tsx
- **Route:** /
- **Description:** Marketing landing page. Hero section with value proposition, AI agent showcase, key features grid, outcome metrics, video demo, and early access CTA. Designed to convert facility operators into leads.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Hero with headline/CTA, agent showcase carousel, features grid, outcomes metrics, video demo modal, early access signup

### SCR-MKT-PRICING
- **Name:** Pricing.tsx
- **Route:** /pricing
- **Description:** Pricing page with tier comparison. Starter, Professional, and Enterprise tiers with feature comparison table, per-resident pricing, and custom enterprise contact.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Tier cards with pricing, feature comparison table, CTA per tier, enterprise contact form

### SCR-MKT-ABOUT
- **Name:** About.tsx
- **Route:** /about
- **Description:** Company mission and team page. Founding story, mission statement, team profiles, and advisory board.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Mission statement, founding story, team grid, advisory board section

### SCR-MKT-AGENTS
- **Name:** Agents.tsx
- **Route:** /agents
- **Description:** AI agent showcase page. Detailed profiles of all 20 agents with capabilities, use cases, and integration patterns.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Agent cards with icon/description/impact, agent detail modals, category filtering

### SCR-MKT-BLOG
- **Name:** Blog.tsx
- **Route:** /blog
- **Description:** Blog listing page. Articles on care management, compliance, technology, and industry news with category filtering and search.
- **Role Access:** R-ANON
- **Key Data:** DM-BLOG-POST
- **Agent Integration:** None
- **Key UI Elements:** Article cards with thumbnail/title/excerpt, category filter, search bar, pagination

### SCR-MKT-BLOG-ARTICLE
- **Name:** BlogArticle.tsx
- **Route:** /blog/:slug
- **Description:** Individual blog article page. Full article content with author, date, reading time, social sharing, and related articles.
- **Role Access:** R-ANON
- **Key Data:** DM-BLOG-POST
- **Agent Integration:** None
- **Key UI Elements:** Article content, author bio, social sharing, related articles, newsletter signup

### SCR-MKT-DEMO
- **Name:** Demo.tsx
- **Route:** /demo
- **Description:** Demo request page. Form to schedule a personalized demo with facility information and preferred time.
- **Role Access:** R-ANON
- **Key Data:** DM-DEMO-REQUEST
- **Agent Integration:** None
- **Key UI Elements:** Demo request form, calendar picker, facility info fields, confirmation message

### SCR-MKT-RESOURCES
- **Name:** Resources.tsx
- **Route:** /resources
- **Description:** Resource hub. Whitepapers, guides, webinar recordings, and compliance checklists organized by category.
- **Role Access:** R-ANON
- **Key Data:** DM-LEAD-MAGNET
- **Agent Integration:** None
- **Key UI Elements:** Resource cards with type badge, category filter, download/access CTA, lead capture gate

### SCR-MKT-SIGNUP
- **Name:** Signup.tsx
- **Route:** /signup
- **Description:** Early access signup page. Collects facility operator information for waitlist placement with tier selection.
- **Role Access:** R-ANON
- **Key Data:** DM-SIGNUP
- **Agent Integration:** None
- **Key UI Elements:** Signup form, tier selector, facility type dropdown, confirmation page

### SCR-MKT-GROUP-HOMES
- **Name:** GroupHomes.tsx
- **Route:** /solutions/group-homes
- **Description:** Solution page for group homes. Tailored messaging addressing group home challenges with relevant agent capabilities.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Pain point sections, solution mapping, testimonial placeholders, CTA

### SCR-MKT-ICF-ID
- **Name:** IcfId.tsx
- **Route:** /solutions/icf-id
- **Description:** Solution page for ICF-ID facilities. Tailored messaging for intermediate care facilities with compliance focus.
- **Role Access:** R-ANON
- **Key Data:** None
- **Agent Integration:** None
- **Key UI Elements:** Regulatory challenge sections, compliance solution mapping, CTA

### SCR-MKT-REFERRALS
- **Name:** Referrals.tsx
- **Route:** /referrals
- **Description:** Referral program page. Referral code display, referred user tracking, and reward status.
- **Role Access:** R-ANON (with referral code)
- **Key Data:** DM-REFERRAL
- **Agent Integration:** None
- **Key UI Elements:** Referral code display, share buttons, referral tracking table, reward status

---

## 5. Shared UI Components (CMP)

The following reusable components are shared across multiple screens. Each component is identified by a `CMP-` prefixed ID.

### 5.1 Layout Components

| Component ID | File | Description | Used By |
|---|---|---|---|
| CMP-APP-SHELL | AppShell.tsx | Main application shell with sidebar, header, and content area | All /app/* screens |
| CMP-SIDEBAR-NAV | SidebarNav.tsx | Collapsible sidebar navigation with domain grouping | CMP-APP-SHELL |
| CMP-TOP-BAR | TopBar.tsx | Top header bar with search, notifications, and user menu | CMP-APP-SHELL |
| CMP-MOBILE-NAV | MobileNav.tsx | Bottom tab navigation for mobile views | All /m/* screens |
| CMP-BREADCRUMB | Breadcrumb.tsx | Breadcrumb navigation for nested pages | All detail/edit screens |
| CMP-PAGE-HEADER | PageHeader.tsx | Consistent page header with title, subtitle, and actions | All list/dashboard screens |
| CMP-MARKETING-NAV | Navigation.tsx | Marketing site top navigation | All marketing screens |
| CMP-MARKETING-FOOTER | Footer.tsx | Marketing site footer | All marketing screens |

### 5.2 Data Display Components

| Component ID | File | Description | Used By |
|---|---|---|---|
| CMP-DATA-TABLE | DataTable.tsx | Server-paginated table with sort, filter, export | 80+ list screens |
| CMP-STATUS-BADGE | StatusBadge.tsx | Color-coded status indicator | All list/detail screens |
| CMP-METRIC-CARD | MetricCard.tsx | KPI display card with value, label, trend | All dashboard screens |
| CMP-TREND-CHART | TrendChart.tsx | Line/bar chart with date range selector | Dashboard and report screens |
| CMP-TIMELINE | Timeline.tsx | Chronological event display | SCR-D03-RESIDENT-TIMELINE, SCR-D30-TIMELINE-VIEWER |
| CMP-CALENDAR | Calendar.tsx | Monthly/weekly/daily calendar view | Scheduling, activity, appointment screens |
| CMP-BODY-MAP | BodyMap.tsx | Interactive anatomical diagram for location marking | Wound, pain, injury screens |
| CMP-PROGRESS-BAR | ProgressBar.tsx | Goal/task completion progress indicator | Care plan, therapy, training screens |

### 5.3 Input Components

| Component ID | File | Description | Used By |
|---|---|---|---|
| CMP-VOICE-INPUT | VoiceInput.tsx | Voice-to-text input with DocuBot integration | Documentation, quick note, visit screens |
| CMP-SIGNATURE-PAD | SignaturePad.tsx | Digital signature capture | Order, consent, acknowledgment screens |
| CMP-FILE-UPLOAD | FileUpload.tsx | File upload with drag-drop and preview | Document, photo, import screens |
| CMP-RICH-TEXT | RichTextEditor.tsx | Rich text editor for notes and descriptions | Care plan, progress note, policy screens |
| CMP-RESIDENT-PICKER | ResidentPicker.tsx | Searchable resident selector with photo/room | 40+ resident-context screens |
| CMP-STAFF-PICKER | StaffPicker.tsx | Searchable staff selector with role/shift | Scheduling, assignment, incident screens |
| CMP-DATE-RANGE | DateRangePicker.tsx | Date range selector with presets | All report and analytics screens |
| CMP-BARCODE-SCANNER | BarcodeScanner.tsx | Camera-based barcode scanning | Medication administration, inventory screens |

### 5.4 Feedback Components

| Component ID | File | Description | Used By |
|---|---|---|---|
| CMP-ALERT-BANNER | AlertBanner.tsx | Page-level alert with severity and action | Dashboard, monitoring screens |
| CMP-TOAST | Toast.tsx | Transient success/error notification | All screens (via Sonner) |
| CMP-CONFIRMATION-DIALOG | ConfirmationDialog.tsx | Action confirmation modal | Delete, archive, sign-off actions |
| CMP-EMPTY-STATE | EmptyState.tsx | Illustrated empty state with action CTA | All list screens |
| CMP-LOADING-SKELETON | LoadingSkeleton.tsx | Content placeholder during data loading | All screens |
| CMP-ERROR-BOUNDARY | ErrorBoundary.tsx | Graceful error display with retry | All screens |

### 5.5 Agent Integration Components

| Component ID | File | Description | Used By |
|---|---|---|---|
| CMP-AGENT-CHAT | AgentChat.tsx | Conversational agent interface panel | SCR-D29-AGENT-CHAT, global sidebar |
| CMP-AGENT-SUGGESTION | AgentSuggestion.tsx | Contextual AI suggestion card | Dashboard, care plan, compliance screens |
| CMP-AGENT-STATUS | AgentStatus.tsx | Agent health and activity indicator | SCR-D20-AGENT-DASHBOARD, SCR-D02-SYSTEM-STATUS |
| CMP-SMART-ASSIST | SmartAssist.tsx | Inline AI assistance for form completion | Documentation, assessment, care plan screens |

---

## 6. Navigation Architecture

### 6.1 Sidebar Navigation Groups

The application sidebar organizes screens into the following navigation groups, each with a domain icon and expandable sub-items.

| Group | Icon | Items |
|---|---|---|
| Dashboard | LayoutDashboard | Role-specific dashboard |
| Residents | Users | Resident list, census board |
| Clinical | Heart | Care plans, documentation, medications, vitals, assessments |
| Compliance | Shield | Regulatory dashboard, audit prep, training, policies |
| Scheduling | Calendar | Master schedule, shift management, time-off |
| Staff | UserCog | Staff directory, credentials, HR, performance |
| Communication | MessageCircle | Messaging, family portal, announcements |
| Activities | Activity | Activity calendar, community integration |
| Nutrition | UtensilsCrossed | Menu planning, meal tracking, dietary management |
| Facility | Building | Maintenance, work orders, room management |
| Finance | DollarSign | Billing, claims, budgets, reports |
| Incidents | AlertTriangle | Incident log, behavior tracking, investigations |
| Appointments | CalendarClock | Appointment scheduling, referrals, physician portal |
| Infection Control | Bug | Surveillance, isolation, immunizations |
| Quality | BarChart3 | QA dashboard, QAPI, satisfaction surveys |
| Agents | Bot | Agent dashboard, workflows, automation |
| Reports | FileBarChart | Report builder, scheduled reports |
| Settings | Settings | System settings, users, roles, integrations |

### 6.2 Mobile Navigation

Mobile views use a bottom tab bar with five primary tabs:

| Tab | Icon | Target |
|---|---|---|
| Home | Home | SCR-D26-MOBILE-HOME |
| Tasks | CheckSquare | SCR-D26-MOBILE-TASK-LIST |
| Residents | Users | Assigned resident list |
| Alerts | Bell | SCR-D26-MOBILE-ALERT-RESPONSE |
| More | Menu | Full navigation menu |

---

## 7. Screen Index

The complete alphabetical index of all 503 screens follows. Each entry shows the screen ID, route, and domain.

| # | Screen ID | Route | Domain |
|---|---|---|---|
| 1 | SCR-D01-LOGIN | /login | D01 |
| 2 | SCR-D01-MFA-SETUP | /mfa/setup | D01 |
| 3 | SCR-D01-MFA-VERIFY | /mfa/verify | D01 |
| 4 | SCR-D01-PASSWORD-RESET | /password-reset | D01 |
| 5 | SCR-D01-PASSWORD-RESET-CONFIRM | /password-reset/confirm | D01 |
| 6 | SCR-D01-ONBOARD-WELCOME | /onboarding/welcome | D01 |
| 7 | SCR-D01-ONBOARD-ROLE | /onboarding/role | D01 |
| 8 | SCR-D01-ONBOARD-PROFILE | /onboarding/profile | D01 |
| 9 | SCR-D01-ONBOARD-PREFERENCES | /onboarding/preferences | D01 |
| 10 | SCR-D01-ONBOARD-TERMS | /onboarding/terms | D01 |
| 11 | SCR-D01-ONBOARD-COMPLETE | /onboarding/complete | D01 |
| 12 | SCR-D01-SESSION-EXPIRED | /session-expired | D01 |
| 13 | SCR-D01-DEVICE-TRUST | /device-trust | D01 |
| 14 | SCR-D01-ACCOUNT-LOCKED | /account-locked | D01 |

> The full 503-row index is maintained in the screen definition sections above (Section 3). Each `SCR-` entry includes its route, component file, role access, and agent integration. Use the domain section headers for navigation.

---

## 8. Implementation Priority

Screens are prioritized into four implementation waves based on operational criticality and regulatory requirements.

### Wave 1: Core Operations (147 screens)
Domains D01, D02, D03, D04, D05, D06 form the minimum viable product. These screens enable authentication, resident management, care planning, clinical documentation, and medication administration. Without these, the facility cannot operate.

### Wave 2: Compliance and Safety (99 screens)
Domains D07, D08, D09, D25, D34 address regulatory requirements. Health monitoring, incident management, compliance tracking, infection control, and emergency management are required for state licensing and CMS certification.

### Wave 3: Operations and Communication (122 screens)
Domains D10, D11, D12, D13, D14, D16, D18 cover scheduling, staffing, family engagement, activities, nutrition, facility maintenance, and appointments. These screens improve operational efficiency and family satisfaction.

### Wave 4: Intelligence and Scale (135 screens)
Domains D20, D23, D26, D27, D28, D29, D30, D31, D32, D33 deliver the agentic intelligence layer, mobile workflows, physician portal, inventory management, behavioral health, therapy services, and multi-facility management. These screens differentiate Harmony from legacy systems.

---

**End of UI Contracts Document**
**Total Screens: 503 | Total Domains: 30 | Total Components: 38**
