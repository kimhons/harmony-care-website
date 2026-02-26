# Harmony AI-Native Care Management Platform: Single Source of Truth (SSOT)

**DOCUMENT ID:** SSOT.md
**VERSION:** 1.0
**DATE:** 2026-02-25

---

## 1. Scope Statement and Constraints

**Project Goal:** To develop and deploy the Harmony AI-Native Care Management Platform, a comprehensive solution designed to enhance operational efficiency, improve resident care, and ensure regulatory compliance for residential care facilities, group homes, and ICF-ID facilities.

**Core Capabilities:**
- **AI-Powered Agents:** A suite of 20 autonomous AI agents to automate tasks across documentation, health monitoring, compliance, operations, and analytics.
- **Web Platform:** A user-facing web application built with React 19 for residents, families, and facility staff, providing access to data, communication tools, and agent-driven insights.
- **Robust Backend:** A scalable backend powered by Node.js, Express, and tRPC, supporting all platform functionalities.
- **Data Management:** A secure and reliable data layer using MySQL/TiDB with Drizzle ORM.
- **Integrations:** Seamless integrations with essential third-party services, including Resend for email, AWS S3 for storage, and Manus OAuth for authentication.

**Constraints:**
- **Technology Stack:** The project must adhere to the specified technology stack (React 19, Node.js, tRPC 11, MySQL/TiDB, etc.).
- **Stable ID System:** All artifacts must use the defined stable ID system for cross-referencing (e.g., REQ-DOMAIN-0001, TASK-MODULE-0001).
- **Non-Interpretation Contract:** All documentation must be explicit, detailed, and avoid ambiguity. Vague terms are forbidden unless quantified. All tasks must be atomic and verifiable.
- **Deployment Target:** The primary deployment environment is Vercel.

---

## 2. Glossary of Domain Terms

| Term | Definition |
|---|---|
| **Harmony AI-Native Care Management Platform** | The full name of the project, a software platform designed for residential care facilities. |
| **AI-Powered Agents** | Autonomous or semi-autonomous software entities that perform tasks on behalf of users. In Harmony, these are specialized for tasks like documentation, health monitoring, and compliance. |
| **LangGraph** | A framework for building stateful, multi-actor applications with LLMs. Used for the `Concierge` and other conversational agents. |
| **CrewAI** | A framework for orchestrating role-playing, autonomous AI agents. Used for complex, multi-agent tasks like incident investigation. |
| **Azure Foundry** | A platform-as-a-service (PaaS) for building, deploying, and scaling applications. In Harmony, it's planned for hosting mission-critical, production-hardened agents. |
| **Concierge** | The master orchestrator in the agentic layer. It receives all complex requests and routes them to the appropriate agent or system. |
| **CRUD** | An acronym for Create, Read, Update, and Delete, which are the four basic functions of persistent storage. |
| **Microservices** | An architectural style that structures an application as a collection of loosely coupled services. |
| **Agentic Architecture** | A system design that heavily features AI agents as core components for reasoning and task execution. |
| **Human-in-the-loop (HITL)** | A model that requires human interaction. In Harmony, this is used for critical decisions, such as approving a change to a resident's care plan. |
| **Corrective Action Plan (CAP)** | A plan developed to address problems or deficiencies, often identified during an incident investigation. |
| **Root Cause Analysis (RCA)** | A method of problem-solving used for identifying the root causes of faults or problems. |
| **Single Source of Truth (SSOT)** | A practice of structuring information models and associated data schema such that every data element is mastered in only one place. This document serves as the SSOT for the Harmony project. |
| **tRPC** | A framework for building end-to-end typesafe APIs with TypeScript. |
| **Drizzle ORM** | A TypeScript ORM (Object-Relational Mapper) for SQL databases. |
| **Vercel** | A cloud platform for static sites and Serverless Functions that fits perfectly with the Next.js framework. |
| **shadcn/ui** | A collection of re-usable UI components for React. |
| **Wouter** | A minimalist routing library for React. |

---

## 3. Module Registry

This registry defines the high-level modules of the Harmony platform, their ownership boundaries, and their primary interfaces.

| Module ID | Module Name | Owner | Description | Primary Interfaces |
|---|---|---|---|---|
| MOD-WEB | Harmony Web UI | Frontend Team | The main user-facing React application. Provides all interactive experiences for users. | API-TRPC-V1, Public Internet |
| MOD-API | tRPC API Server | Backend Team | The core API layer that handles all business logic and data access. | MOD-WEB, MOD-AGENT |
| MOD-DB | Harmony Database | Backend Team | The primary data store for the platform (MySQL/TiDB). | MOD-API |
| MOD-AGENT | Agentic Layer | AI Team | The collection of all AI agents and the orchestration layer (Concierge). | MOD-API, External APIs |
| MOD-AUTH | Authentication Service | Backend Team | Manages user authentication and authorization via Manus OAuth and JWTs. | MOD-WEB, MOD-API |
| MOD-EMAIL | Email Service | Backend Team | Handles all transactional and marketing emails via the Resend API. | MOD-API, MOD-AGENT |
| MOD-STORAGE | File Storage Service | Backend Team | Manages file uploads and storage using AWS S3. | MOD-API |
| MOD-OPS | Infrastructure & Operations | DevOps Team | All infrastructure, deployment (Vercel), and CI/CD pipelines. | GitHub, AWS, Vercel |

---

## 4. Requirements Catalog

This catalog lists all functional and non-functional requirements for the Harmony platform. Each requirement includes acceptance criteria and mappings to other system artifacts.

### 4.1. User & Authentication Requirements (REQ-AUTH)

| REQ ID | Requirement | Acceptance Criteria | Mappings |
|---|---|---|---|
| REQ-AUTH-0001 | Users must be able to sign up for an early access waitlist. | 1. A user can submit a form with their first name, last name, email, phone, facility name, facility type, resident count, tier, interested features, and additional needs. 2. A new record is created in the `signups` table. 3. The user receives a confirmation email. | TASK-SIGNUP-0001, MOD-WEB, MOD-API, DM-SIGNUPS, TEST-SIGNUP-0001 |
| REQ-AUTH-0002 | Users must be able to log in using Manus OAuth. | 1. A user can click a "Login with Manus" button. 2. The user is redirected to the Manus OAuth page. 3. Upon successful authentication, the user is redirected back to the Harmony platform. 4. A new user record is created in the `users` table if one does not exist. 5. A JWT session is created for the user. | TASK-AUTH-0001, MOD-WEB, MOD-API, MOD-AUTH, DM-USERS, TEST-AUTH-0001 |
| REQ-AUTH-0003 | The system must support two user roles: `user` and `admin`. | 1. The `users` table must have a `role` column with possible values 'user' and 'admin'. 2. The default role for a new user is 'user'. 3. Admin users have access to the admin dashboard. | TASK-AUTH-0002, MOD-API, DM-USERS, TEST-AUTH-0002 |
| REQ-AUTH-0004 | Users must be able to log out. | 1. A logged-in user can click a "Logout" button. 2. The user's session is terminated. 3. The user is redirected to the homepage. | TASK-AUTH-0003, API-AUTH-V1-POST-LOGOUT, MOD-WEB, MOD-API, TEST-AUTH-0002 |

### 4.2. Agent Requirements (REQ-AGENT)

| REQ ID | Requirement | Acceptance Criteria | Mappings |
|---|---|---|---|
| REQ-AGENT-0001 | The `Connect` agent must provide families with non-clinical updates on residents. | 1. The agent can retrieve a resident's activity log. 2. The agent can synthesize the log into a friendly summary. 3. The agent can proactively suggest scheduling a video call. | TASK-AGENT-0001, MOD-AGENT, WF-FAMILY-CHECKIN, TEST-AGENT-CONNECT-001 |
| REQ-AGENT-0002 | The `Pulse` agent must conduct confidential weekly pulse checks with staff. | 1. The agent sends a survey to staff members every Friday. 2. The agent analyzes the sentiment of the responses. 3. The agent logs negative sentiment anonymously for trend analysis. 4. The agent facilitates a peer-to-peer recognition program. | TASK-AGENT-0002, MOD-AGENT, WF-PULSE-CHECK, TEST-AGENT-PULSE-001 |
| REQ-AGENT-0003 | The `Advocate` agent must investigate incidents and manage corrective action plans. | 1. The agent can spawn sub-agents to analyze different facets of an incident. 2. The agent can synthesize findings to identify the root cause. 3. The agent can generate a draft Corrective Action Plan (CAP). | TASK-AGENT-0003, MOD-AGENT, WF-INCIDENT-INVESTIGATION, TEST-AGENT-ADVOCATE-001 |
| REQ-AGENT-0004 | The `Catalyst` agent must manage the admissions process and CRM. | 1. The agent can engage with leads from the website. 2. The agent can schedule facility tours. 3. The agent can nurture leads with personalized follow-up emails. | TASK-AGENT-0004, MOD-AGENT, WF-ADMISSIONS-FUNNEL, TEST-AGENT-CATALYST-001 |

---

## 5. Workflows

This section defines the key business and system workflows, including their states and gates.

### 5.1. Family Check-in Workflow (WF-FAMILY-CHECKIN)

**Description:** A family member checks on a resident's well-being and schedules a call.

| State ID | State Name | Description | Gates |
|---|---|---|---|
| STATE-FC-01 | Inquiry Received | Family member asks for an update on a resident. | GATE-FC-INTENT-DETECT |
| STATE-FC-02 | Fetching Data | The `Connect` agent retrieves the resident's activity log. | GATE-FC-DATA-VALIDATION |
| STATE-FC-03 | Synthesizing Summary | The agent generates a user-friendly summary of the resident's activities. | GATE-FC-SUMMARY-APPROVAL |
| STATE-FC-04 | Proposing Next Step | The agent proactively suggests scheduling a video call. | GATE-FC-USER-CONFIRMATION |
| STATE-FC-05 | Scheduling Call | The agent books the video call in the system. | GATE-FC-SCHEDULE-CONFLICT |
| STATE-FC-06 | Confirmation Sent | The family member receives a confirmation of the scheduled call. | - |

### 5.2. Incident Investigation Workflow (WF-INCIDENT-INVESTIGATION)

**Description:** The `Advocate` agent investigates a reported incident (e.g., a resident fall).

| State ID | State Name | Description | Gates |
|---|---|---|---|
| STATE-II-01 | Incident Reported | A new incident is logged in the system. | GATE-II-INCIDENT-TRIAGE |
| STATE-II-02 | Investigation Initiated | The `Concierge` routes the investigation to the `Advocate` agent. | - |
| STATE-II-03 | Sub-Agents Spawned | `Advocate` (CrewAI) spawns specialized sub-agents for parallel analysis (Clinical, Operational, Historical). | GATE-II-SUB-AGENT-HEALTH |
| STATE-II-04 | Data Analysis | Sub-agents gather and analyze data from various sources (care plans, staffing logs, etc.). | GATE-II-DATA-INTEGRITY |
| STATE-II-05 | Findings Synthesized | `Advocate` synthesizes the findings from all sub-agents to determine the root cause. | GATE-II-ROOT-CAUSE-CONFIDENCE |
| STATE-II-06 | CAP Drafted | `Advocate` generates a draft Corrective Action Plan (CAP). | GATE-II-CAP-REVIEW |
| STATE-II-07 | Awaiting Approval | The draft CAP is sent to a human (e.g., Director of Nursing) for review and approval. | GATE-II-HUMAN-IN-THE-LOOP |
| STATE-II-08 | CAP Implemented | The approved CAP is implemented. | - |

---

## 6. Interface Contracts

This section defines the contracts for all major system interfaces.

### 6.1. API Surface (tRPC)

This defines the available tRPC routers and their primary procedures.

| Router | Procedure | Description | Input Schema | Output Schema | ID |
|---|---|---|---|---|---|
| auth | `me` | Retrieves the currently authenticated user. | `undefined` | `User` | API-AUTH-V1-GET-ME |
| auth | `logout` | Logs out the current user. | `undefined` | `{ success: boolean }` | API-AUTH-V1-POST-LOGOUT |
| signup | `create` | Creates a new early access signup. | `InsertSignup` | `Signup` | API-SIGNUP-V1-POST-CREATE |
| referral | `validate` | Validates a referral code. | `{ code: string }` | `{ valid: boolean }` | API-REFERRAL-V1-GET-VALIDATE |
| referral | `create` | Creates a referral relationship. | `InsertReferral` | `Referral` | API-REFERRAL-V1-POST-CREATE |
| calculator | `calculate` | Runs the ROI calculation. | `CalculatorInput` | `CalculatorOutput` | API-CALCULATOR-V1-POST-CALCULATE |
| admin | `analytics` | Retrieves admin dashboard analytics. | `undefined` | `AdminAnalytics` | API-ADMIN-V1-GET-ANALYTICS |
| fileUpload | `createPresignedUrl` | Creates a presigned URL for S3 uploads. | `{ filename: string, filetype: string }` | `{ uploadUrl: string, key: string }` | API-FILEUPLOAD-V1-POST-CREATEPRESIGNEDURL |

### 6.2. Data Surface (Database Schema)

This defines the primary data models (tables) in the MySQL/TiDB database.

| Data Model ID | Table Name | Description | Key Columns |
|---|---|---|---|
| DM-USERS | `users` | Stores user account information. | `id`, `openId`, `email`, `role` |
| DM-SIGNUPS | `signups` | Stores early access waitlist signups. | `id`, `email`, `facilityName`, `tier` |
| DM-REFERRALS | `referrals` | Tracks referral relationships and rewards. | `id`, `referrerSignupId`, `referredSignupId` |
| DM-MILESTONES | `milestoneNotifications` | Stores records of achieved milestones. | `id`, `signupId`, `milestoneType` |
| DM-CALCLEADS | `calculatorLeads` | Stores leads generated from the ROI calculator. | `id`, `email`, `annualSavings` |
| DM-LEADMAGNETS | `leadMagnets` | Stores information about downloadable lead magnets. | `id`, `title`, `fileUrl` |
| DM-LEADDOWNLOADS | `leadMagnetDownloads` | Tracks downloads of lead magnets. | `id`, `leadMagnetId`, `email` |
| DM-NEWSLETTER | `newsletterSubscribers` | Stores information about newsletter subscribers. | `id`, `email`, `status` |

### 6.3. Agent Tool Surface

This defines the tools available to the AI agents.

| Tool Name | Agent Owner | Description | Input Schema | Output Schema |
|---|---|---|---|---|
| `get_resident_activity_log` | Connect | Retrieves a log of a resident's participation in activities. | `{resident_id: string, date_range: DateRange}` | `{activities: List[ActivityLog]}` |
| `schedule_family_visit` | Connect | Schedules a visit between a resident and family. | `{resident_id, family_member_id, requested_time}` | `{visit_id: string, confirmed_time: Datetime}` |
| `send_pulse_survey` | Pulse | Sends a short, confidential survey to a staff member. | `{staff_id: string}` | `{survey_id: string}` |
| `create_peer_recognition` | Pulse | Logs a peer-to-peer recognition in the system. | `{recognizer_id, recognized_id, reason}` | `{recognition_id: string}` |
| `get_incident_details` | Advocate | Retrieves the full report for a specific incident. | `{incident_id: string}` | `{incident_data: Incident}` |
| `generate_cap_draft` | Advocate | Creates a draft Corrective Action Plan. | `{root_cause: string, incident_id: string}` | `{cap_draft: CAP}` |
| `create_lead` | Catalyst | Creates a new lead in the CRM system. | `{name, email, phone, inquiry}` | `{lead_id: string}` |
| `schedule_facility_tour` | Catalyst | Schedules a facility tour for a prospective resident. | `{lead_id: string, requested_time: Datetime}` | `{tour_id: string}` |

---

## 7. Open Issues

This section tracks known issues, conflicts, and risks that require decisions or further investigation.

| ID | Issue | Options | Blockers | Status |
|---|---|---|---|---|
| GAP-0001 | The `todo.md` file is 45K lines long and contains a mix of high-level epics and granular tasks. It is not a sustainable project management tool. | 1. **Migrate to a dedicated project management tool** (e.g., Jira, Linear). 2. **Refactor `todo.md`** into a structured, multi-file system within the `docs/` directory. 3. **Develop a custom CLI tool** to manage tasks within the markdown files. | Decision on the future project management methodology. | Open |
| CONFLICT-0001 | The `refined_hybrid_architecture.md` proposes a 3-phase adoption of agentic frameworks (LangGraph -> CrewAI -> Foundry), but the agent specifications in `harmony_all_specs.md` already assume the use of both LangGraph and CrewAI. | 1. **Re-sequence the agent development** to align with the 3-phase adoption plan. 2. **Revise the architecture document** to reflect a parallel adoption strategy. 3. **Proceed with parallel adoption** but allocate extra resources for managing the increased complexity. | Decision from the architecture review board. | Open |
| RISK-0001 | The 20 planned AI agents have significant functional overlap and may be difficult to orchestrate effectively. The `Concierge` agent is a single point of failure. | 1. **Consolidate the 20 agents** into 5-7 core agents with broader capabilities. 2. **Develop a more robust orchestration strategy** with failover and redundancy for the `Concierge`. 3. **Implement a comprehensive monitoring and alerting system** for the agentic layer. | Awaiting a formal review of the agentic architecture and a risk mitigation plan. | Open |
| GAP-0002 | The database schema (`harmony_schema.txt`) does not include tables for many of the core concepts required by the agent specifications, such as `incidents`, `care_plans`, `staffing_schedules`, etc. | 1. **Design and implement the missing database tables.** 2. **Re-evaluate the data models** to ensure they support all required agent functionalities. | A detailed data modeling session is required. | Open |

---

## 8. Proposed Changes

This section lists proposed changes to the system architecture, features, or processes.

| Change ID | Change Description | Rationale | Impact | Status |
|---|---|---|---|---|
| CHG-0001 | **Consolidate Agent Specifications:** Merge the separate agent specification documents (`engagement_agent_specifications.md`, `operational_agent_specifications.md`, etc.) into a single, unified `agents.md` file within the `docs/ssot/` directory. | The current separation of agent specs is fragmented and leads to inconsistencies. A single, unified document will improve clarity and maintainability. | Medium. Requires refactoring existing documentation and updating all cross-references. | Proposed |
| CHG-0002 | **Adopt a Formal Data Modeling Tool:** Instead of relying on the Drizzle schema file as the primary data model reference, adopt a formal data modeling tool (e.g., dbdiagram.io, Lucidchart) to create and maintain an entity-relationship diagram (ERD). | A visual ERD will provide a much clearer and more comprehensive view of the database schema and relationships between tables, which is crucial for a complex system like Harmony. | Low. This is a documentation and process change that can be implemented in parallel with development. | Proposed |
| CHG-0003 | **Implement a Staging Environment:** The current deployment process only targets Vercel for production. A dedicated staging environment should be created to test new features and changes before they are deployed to production. | A staging environment is essential for ensuring the stability and quality of the production application. It allows for thorough testing in a production-like environment without impacting users. | High. Requires significant infrastructure work and changes to the CI/CD pipeline. | Proposed |

---
