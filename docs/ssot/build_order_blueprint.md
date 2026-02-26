# Build Order Blueprint

**DOCUMENT:** build_order_blueprint.md
**OUTPUT PATH:** docs/ssot/build_order_blueprint.md
**TASK:** Create build order blueprint with wave-by-wave plan, gates, freeze points, effort estimates, risk mitigation.

---

## 1. Build Philosophy

The Harmony platform will be built in a series of waves, each delivering a distinct set of capabilities and value. This iterative approach allows for early feedback, risk mitigation, and a phased rollout. Each wave will conclude with a gate, a formal review to ensure all objectives for that wave have been met before proceeding to the next.

## 2. Build Waves

### Wave 0: Foundation & Core Infrastructure

*   **Goal:** Establish the core infrastructure, security, and developer operations foundation.
*   **Effort Estimate:** 2-3 weeks
*   **Freeze Point:** Once the core infrastructure is stable, major changes to the deployment strategy or core technology stack will require a formal review.

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Infrastructure** | | | |
| Git Repository Setup | Initialize and configure the GitHub repository. | REQ-INFRA-0001 | TASK-INFRA-0001 | DONE |
| Vercel Project Setup | Create and configure the Vercel project for deployment. | REQ-INFRA-0002 | TASK-INFRA-0002 | DONE |
| CI/CD Pipeline | Implement a CI/CD pipeline for automated testing and deployment. | REQ-INFRA-0003 | TASK-INFRA-0003 | PENDING |
| **Authentication** | | | |
| Manus OAuth Integration | Integrate Manus OAuth for user authentication. | REQ-AUTH-0001 | TASK-AUTH-0001 | DONE |
| JWT Session Management | Implement JWT-based session management. | REQ-AUTH-0002 | TASK-AUTH-0002 | DONE |
| **Database** | | | |
| Drizzle ORM Setup | Configure Drizzle ORM for database access. | REQ-DATA-0001 | TASK-DATA-0001 | DONE |
| Initial Schema Migration | Create and apply the initial database schema migration. | REQ-DATA-0002 | TASK-DATA-0002 | DONE |
| **UI Shell** | | | |
| Core Layout & Navigation | Build the main application layout, including header, footer, and navigation. | REQ-UI-0001 | TASK-UI-0001 | DONE |
| **Security** | | | |
| Foundational Security Policies | Define and implement basic security policies (CORS, CSP). | REQ-SEC-0001 | TASK-SEC-0001 | PENDING |

*   **Gate 0:** All core infrastructure is in place and tested. CI/CD pipeline is operational. Basic security policies are implemented.

### Wave 1: MVP Launch - Signup, Referrals, and Admin

*   **Goal:** Launch the Minimum Viable Product (MVP) to start capturing early access signups and build a user base.
*   **Effort Estimate:** 3-4 weeks
*   **Freeze Point:** The core data models for signups and referrals will be frozen after this wave.

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **User-Facing** | | | |
| Early Access Signup Form | Create the signup form for early access. | REQ-SIGNUP-0001 | TASK-SIGNUP-0001 | DONE |
| Referral Program Page | Design and build the page explaining the referral program. | REQ-REFERRAL-0001 | TASK-REFERRAL-0001 | DONE |
| **Backend** | | | |
| Signup Logic | Implement the backend logic for creating new signups. | REQ-SIGNUP-0002 | TASK-SIGNUP-0002 | DONE |
| Referral Logic | Implement the backend logic for tracking referrals. | REQ-REFERRAL-0002 | TASK-REFERRAL-0002 | DONE |
| **Admin** | | | |
| Admin Dashboard | Create a dashboard for admins to view signups and basic analytics. | REQ-ADMIN-0001 | TASK-ADMIN-0001 | DONE |
| **Emails** | | | |
| Welcome Email | Implement the welcome email for new signups. | REQ-EMAIL-0001 | TASK-EMAIL-0001 | DONE |
| Referral Email | Implement the email sent to users with their referral code. | REQ-EMAIL-0002 | TASK-EMAIL-0002 | DONE |

*   **Gate 1:** MVP is live and accepting signups. Admin dashboard is functional and displays accurate data. Emails are being sent reliably.

### Wave 2: Engagement & Lead Generation

*   **Goal:** Enhance user engagement and lead generation capabilities.
*   **Effort Estimate:** 2-3 weeks
*   **Freeze Point:** The core logic for the ROI calculator will be frozen.

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Lead Generation** | | | |
| ROI Savings Calculator | Build the interactive ROI savings calculator. | REQ-LEADGEN-0001 | TASK-LEADGEN-0001 | DONE |
| Lead Magnet System | Create a system for managing and downloading lead magnets. | REQ-LEADGEN-0002 | TASK-LEADGEN-0002 | PENDING |
| Newsletter Signup | Implement newsletter signup forms and backend management. | REQ-LEADGEN-0003 | TASK-LEADGEN-0003 | DONE |
| Exit-Intent Popup | Add an exit-intent popup to capture leads. | REQ-LEADGEN-0004 | TASK-LEADGEN-0004 | PENDING |

*   **Gate 2:** Lead generation tools are live and integrated with email nurture sequences.

### Wave 3: AI Agent Integration (Phase 1)

*   **Goal:** Integrate the first set of AI agents to showcase the platform's intelligence.
*   **Effort Estimate:** 4-6 weeks
*   **Freeze Point:** The core agent framework (LangGraph, CrewAI) and communication protocols will be frozen.

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Agent Runtimes** | | | |
| LangGraph Runtime | Set up the runtime environment for LangGraph agents. | REQ-AGENT-0001 | TASK-AGENT-0001 | PENDING |
| CrewAI Runtime | Set up the runtime environment for CrewAI agents. | REQ-AGENT-0002 | TASK-AGENT-0002 | PENDING |
| **Agent Integration** | | | |
| Connect Agent | Integrate the **Connect** (Family & Resident Portal) agent. | REQ-AGENT-0003 | TASK-AGENT-0003 | PENDING |
| Pulse Agent | Integrate the **Pulse** (Staff Engagement) agent. | REQ-AGENT-0004 | TASK-AGENT-0004 | PENDING |

*   **Gate 3:** The first two AI agents are functional and accessible through a basic UI. The agent runtimes are stable.

### Wave 4: Advanced Features & Solutions

*   **Goal:** Build out specialized solutions and advanced platform features.
*   **Effort Estimate:** 3-4 weeks

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Content Pages** | | | |
| Solutions Pages | Create dedicated pages for Group Homes and ICF-ID facilities. | REQ-CONTENT-0001 | TASK-CONTENT-0001 | PARTIAL |
| Pricing Page | Design and build the 3-tier pricing page. | REQ-CONTENT-0002 | TASK-CONTENT-0002 | DONE |
| Blog & Resources | Implement the blog and resource center. | REQ-CONTENT-0003 | TASK-CONTENT-0003 | PENDING |

*   **Gate 4:** All marketing and solution pages are live and populated with content.

### Wave 5: Full AI Agent Rollout & Platform Hardening

*   **Goal:** Complete the integration of all 20 AI agents and harden the platform for a full public launch.
*   **Effort Estimate:** 6-8 weeks

| Feature/Task | Description | REQ ID | TASK ID | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Agent Integration** | | | |
| Full Agent Rollout | Integrate the remaining 18 AI agents. | REQ-AGENT-0005 | TASK-AGENT-0005 | PENDING |
| **Platform Hardening** | | | |
| Security Audit | Conduct a comprehensive security audit and penetration testing. | REQ-SEC-0002 | TASK-SEC-0002 | PENDING |
| Performance Testing | Perform load testing and performance optimization. | REQ-PERF-0001 | TASK-PERF-0001 | PENDING |

*   **Gate 5:** Platform is ready for a full public launch. All agents are functional, and the platform is secure and performant.

## 3. Risk Mitigation

| Risk ID | Risk Description | Mitigation Strategy |
| :--- | :--- | :--- |
| RISK-0001 | **AI Agent Complexity:** The development and integration of 20 AI agents is a significant undertaking and may be more complex than anticipated. | Phase the agent rollout, starting with the most critical and lowest-risk agents. Use well-defined agent specifications and frameworks (LangGraph, CrewAI) to manage complexity. |
| RISK-0002 | **Data Security & Privacy:** The platform will handle sensitive resident and staff data, making security a critical concern. | Implement robust security measures from the start (Wave 0). Conduct a comprehensive security audit (Wave 5). Adhere to HIPAA and other relevant data privacy regulations. |
| RISK-0003 | **Third-Party Service Dependency:** The platform relies on several third-party services (Manus OAuth, Resend, S3). Outages or changes in these services could impact functionality. | Implement resilient error handling and fallback mechanisms. Monitor the status of third-party services. Have contingency plans for critical service failures. |
| RISK-0004 | **Scope Creep:** The project has a large scope, and there is a risk of continuous feature additions delaying the launch. | Adhere strictly to the wave-based plan and gates. All changes to the scope must go through a formal change control process. |

