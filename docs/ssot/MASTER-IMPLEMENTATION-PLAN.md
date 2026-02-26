
# MASTER IMPLEMENTATION PLAN

**DOCUMENT:** MASTER-IMPLEMENTATION-PLAN.md  
**OUTPUT PATH:** docs/ssot/MASTER-IMPLEMENTATION-PLAN.md  

---

## 1. Local Setup and Execution

This section provides instructions for setting up the Harmony Care Website project for local development and testing.

### 1.1. Prerequisites

- Node.js (v18 or later)
- pnpm
- Docker (for local database)

### 1.2. Installation

1.  **Clone the repository:**
    ```bash
    gh repo clone kimhons/harmony-care-website
    cd harmony-care-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Add the necessary environment variables for database connection, authentication, and other services.

### 1.3. Running the Application

1.  **Start the database:**
    ```bash
    docker-compose up -d
    ```

2.  **Run database migrations:**
    ```bash
    pnpm drizzle-kit migrate:mysql
    ```

3.  **Start the development server:**
    ```bash
    pnpm dev
    ```

### 1.4. Running Tests

The project uses Vitest for testing. To run the tests, use the following command:

```bash
pnpm test
```

This will run all the test files in the `server` and `tests` directories.

---

## 2. Master TODO Registry

This registry contains all the atomic tasks required to complete the project. Each task is represented as a Task Card with a unique ID, description, acceptance criteria, and verification steps.

### Phase 2: Product Pages

**TASK-ID:** TASK-PRODUCT-0001
**Title:** Create Product Overview Page
**Description:** Develop the main product page that provides a comprehensive overview of the Harmony platform, its core value proposition, and key benefits.
**Acceptance Criteria:**
- The page must be accessible at the `/product` route.
- It must feature a hero section with a clear and compelling headline.
- It must include sections detailing the problem Harmony solves and the solution it provides.
- It must showcase the top 5-10 AI agents with brief descriptions and links to the full agent page.
- It must highlight at least 10 key features with icons and short explanations.
- It must present measurable outcomes and results that users can expect.
- It must include customer testimonials or social proof.
- All content must be responsive and display correctly on desktop, tablet, and mobile devices.
**Dependencies:** None
**Test Cases:**
- Verify that the page loads at `/product`.
- Verify that all sections are present and populated with content.
- Verify that links to the agents page work correctly.
- Verify the page's responsiveness across different screen sizes.
**Verify Command:** `pnpm test client/product-overview.test.ts`

**TASK-ID:** TASK-PRODUCT-0002
**Title:** Create Detailed AI Agents Page
**Description:** Build a dedicated page to showcase all 20 AI agents, providing detailed information about each one's capabilities, use cases, and impact.
**Acceptance Criteria:**
- The page must be accessible at the `/agents` route.
- It must display a card for each of the 20 AI agents.
- Each card must include the agent's name, icon, a detailed description, key use cases, and potential impact metrics.
- The page must include a filtering or categorization system to sort agents by function (e.g., Clinical, Operational, Financial).
- All agent cards must be responsive and display correctly in a grid layout.
**Dependencies:** TASK-PRODUCT-0001
**Test Cases:**
- Verify that the page loads at `/agents`.
- Verify that all 20 agent cards are displayed.
- Verify that the filtering functionality works as expected.
- Verify the responsiveness of the agent grid.
**Verify Command:** `pnpm test client/agents-page.test.ts`

---

## 3. Wave Plan

This section outlines the phased implementation plan, grouping tasks into logical waves to ensure a structured and incremental delivery of the project.

### Wave 1: Foundation and Core Functionality

**Objective:** Establish the foundational elements of the website, including the main landing page, core product pages, and essential backend services.

- **TASK-PRODUCT-0001:** Create Product Overview Page
- **TASK-PRODUCT-0002:** Create Detailed AI Agents Page
- **TASK-PRODUCT-0003:** Create Features Page
- **TASK-PRODUCT-0004:** Create Dashboards Showcase Page
- **TASK-PRODUCT-0005:** Create Integrations Page
- **TASK-PRODUCT-0006:** Create Security & Compliance Page
- **TASK-AUTH-0001:** Implement User Authentication
- **TASK-DB-0001:** Set Up Database Schema

### Wave 2: Solutions and Lead Generation

**Objective:** Develop solution-specific pages and implement lead generation mechanisms to capture prospective customers.

- **TASK-SOLUTIONS-0001:** Create "For Group Homes" Solutions Page
- **TASK-SOLUTIONS-0002:** Create "For ICF-ID Facilities" Solutions Page
- **TASK-LEADGEN-0001:** Create Pricing Page with Tiers
- **TASK-LEADGEN-0002:** Implement Interactive ROI Calculator
- **TASK-LEADGEN-0003:** Create "Request Demo" Form
- **TASK-LEADGEN-0004:** Create "Start Free Trial" Form

### Wave 3: Content and Community

**Objective:** Build out content-rich sections of the website to engage users and build a community.

- **TASK-CONTENT-0001:** Create Blog Structure and Initial Posts
- **TASK-CONTENT-0002:** Create Case Studies Section
- **TASK-CONTENT-0003:** Create Help Center / Knowledge Base
- **TASK-COMMUNITY-0001:** Create "About Us" Page
- **TASK-COMMUNITY-0002:** Create Careers Page

### Wave 4: Admin and Automation

**Objective:** Develop the admin dashboard for managing the platform and automate key business processes.

- **TASK-ADMIN-0001:** Create Admin Dashboard with Analytics
- **TASK-ADMIN-0002:** Implement Signups Data Management
- **TASK-AUTOMATION-0001:** Implement Email Drip Campaign
- **TASK-AUTOMATION-0002:** Implement Lead Scoring System

### Wave 5: Finalization and Launch

**Objective:** Complete all remaining tasks, perform final testing, and prepare the website for public launch.

- **TASK-GENERAL-0001:** SEO Optimization
- **TASK-GENERAL-0002:** Performance Optimization
- **TASK-GENERAL-0003:** Final Testing and Polish
- **TASK-LAUNCH-0001:** Deploy to Production

---

## 4. Contract Freeze Points

Contract freeze points are established at the end of each wave to ensure stability and predictability in the development process. Once a wave is completed and the corresponding freeze point is reached, any changes to the requirements or scope of the completed wave will require a formal change request process.

- **Wave 1 Freeze Point:** After the completion of all tasks in Wave 1, the core architecture, foundational UI components, and basic product pages will be considered stable.

- **Wave 2 Freeze Point:** Upon completion of Wave 2, the lead generation and sales funnel, including pricing and solution pages, will be frozen.

- **Wave 3 Freeze Point:** After Wave 3, the content structure, including the blog, case studies, and help center, will be finalized.

- **Wave 4 Freeze Point:** With the completion of Wave 4, the admin functionality and backend automation processes will be considered feature-complete.

- **Wave 5 Freeze Point:** After Wave 5, the project is considered ready for launch, and only critical bug fixes will be addressed without a formal change request.

---

## 5. Cross-Reference Index

This index provides a comprehensive mapping of all project artifacts, ensuring that every requirement, task, module, and test is cross-linked and traceable throughout the development lifecycle.

### 5.1. Requirements (REQ)

| REQ ID | Description | Linked Tasks | Linked Modules | Linked Tests |
|---|---|---|---|---|
| REQ-PRODUCT-0001 | The system shall have a public-facing website. | TASK-PRODUCT-0001 | MOD-WEB-APP | TEST-UI-0001 |
| REQ-PRODUCT-0002 | The system shall showcase all AI agents. | TASK-PRODUCT-0002 | MOD-WEB-APP | TEST-UI-0002 |
| REQ-AUTH-0001 | The system shall allow users to register and log in. | TASK-AUTH-0001 | MOD-API-AUTH | TEST-API-0001 |

### 5.2. Tasks (TASK)

| TASK ID | Description | Linked REQs | Linked Modules | Linked Tests |
|---|---|---|---|---|
| TASK-PRODUCT-0001 | Create Product Overview Page | REQ-PRODUCT-0001 | MOD-WEB-APP | TEST-UI-0001 |
| TASK-PRODUCT-0002 | Create Detailed AI Agents Page | REQ-PRODUCT-0002 | MOD-WEB-APP | TEST-UI-0002 |
| TASK-AUTH-0001 | Implement User Authentication | REQ-AUTH-0001 | MOD-API-AUTH | TEST-API-0001 |

### 5.3. Modules (MOD)

| MOD ID | Description | Linked Tasks | Linked APIs | Linked DMs |
|---|---|---|---|---|
| MOD-WEB-APP | Frontend React Application | TASK-PRODUCT-0001, TASK-PRODUCT-0002 | API-TRPC-V1 | - |
| MOD-API-AUTH | Authentication Service | TASK-AUTH-0001 | API-AUTH-V1 | DM-USERS |

### 5.4. UI Screens (SCR)

| SCR ID | Description | Linked Components | Linked Tasks |
|---|---|---|---|
| SCR-HOME | Home Page | CMP-NAVIGATION, CMP-FOOTER | TASK-PRODUCT-0001 |
| SCR-AGENTS | Agents Page | CMP-NAVIGATION, CMP-FOOTER | TASK-PRODUCT-0002 |

### 5.5. API Endpoints (API)

| API ID | Description | Linked Modules | Linked Routers |
|---|---|---|---|
| API-TRPC-V1 | tRPC API | MOD-WEB-APP | - |
| API-AUTH-V1 | Authentication API | MOD-API-AUTH | authRouter |

### 5.6. Data Models (DM)

| DM ID | Description | Linked Schema | Linked Modules |
|---|---|---|---|
| DM-USERS | Users Table | users | MOD-API-AUTH |
| DM-SIGNUPS | Signups Table | signups | MOD-API-SIGNUP |

---
