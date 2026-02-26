# UI Contracts (ui_contracts.md)

**DOCUMENT:** ui_contracts.md
**OUTPUT PATH:** docs/contracts/ui_contracts.md
**TASK:** Define ALL UI screens (SCR-*) and components (CMP-*).

---

## 1. UI Screens (SCR)

### SCR-HOME
- **ID:** SCR-HOME
- **Name:** Home.tsx
- **Description:** The main landing page for the Harmony Care platform. It provides a high-level overview of the product, its features, and benefits. It includes a hero section, a showcase of the AI agents, key features, and expected outcomes for care facilities.
- **Requirements:**
    - REQ-UI-0001: The Home page must be visually engaging and clearly communicate the value proposition of Harmony Care.
    - REQ-UI-0002: The Home page must feature a prominent call-to-action for early access signup.
    - REQ-UI-0003: The Home page must showcase the different AI agents and their capabilities.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
    - CMP-AI-CHAT-BOX
    - CMP-SAVINGS-CALCULATOR
- **API Calls:** None
- **Data Models:** None

### SCR-SIGNUP
- **ID:** SCR-SIGNUP
- **Name:** Signup.tsx
- **Description:** A dedicated page for users to sign up for early access to the Harmony Care platform. It contains a form to collect user information.
- **Requirements:**
    - REQ-UI-0004: The Signup page must provide a simple and intuitive form for users to enter their information.
    - REQ-UI-0005: The Signup form must collect first name, last name, email, phone number, facility name, facility type, resident count, and selected tier.
    - REQ-UI-0006: The Signup form must validate user input and provide clear error messages.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:**
    - API-SIGNUP-CREATE
- **Data Models:**
    - DM-SIGNUP

### SCR-ADMIN
- **ID:** SCR-ADMIN
- **Name:** Admin.tsx
- **Description:** The main dashboard for administrative users. It provides an overview of platform analytics, including signup trends, user engagement, and referral statistics.
- **Requirements:**
    - REQ-UI-0007: The Admin dashboard must be accessible only to users with the 'admin' role.
    - REQ-UI-0008: The Admin dashboard must display key analytics in a clear and concise manner.
- **Components:**
    - CMP-DASHBOARD-LAYOUT
    - CMP-COST-SAVINGS-CHART
- **API Calls:**
    - API-ADMIN-ANALYTICS
- **Data Models:** None

### SCR-ADMIN-CALCULATOR-LEADS
- **ID:** SCR-ADMIN-CALCULATOR-LEADS
- **Name:** AdminCalculatorLeads.tsx
- **Description:** A page within the admin dashboard for managing leads generated through the ROI calculator.
- **Requirements:**
    - REQ-UI-0009: The Calculator Leads page must display a list of all leads with their relevant information.
    - REQ-UI-0010: The Calculator Leads page must allow admins to filter and sort the leads.
- **Components:**
    - CMP-DASHBOARD-LAYOUT
- **API Calls:**
    - API-ADMIN-CALCULATOR-LEADS-GET
- **Data Models:**
    - DM-CALCULATOR-LEAD

### SCR-ADMIN-RESOURCES
- **ID:** SCR-ADMIN-RESOURCES
- **Name:** AdminResources.tsx
- **Description:** A page within the admin dashboard for managing marketing resources and lead magnets.
- **Requirements:**
    - REQ-UI-0011: The Resources page must allow admins to upload, edit, and delete lead magnets.
- **Components:**
    - CMP-DASHBOARD-LAYOUT
- **API Calls:**
    - API-LEAD-MAGNETS-GET
    - API-LEAD-MAGNETS-CREATE
    - API-LEAD-MAGNETS-UPDATE
    - API-LEAD-MAGNETS-DELETE
- **Data Models:**
    - DM-LEAD-MAGNET

### SCR-EMAIL-ENGAGEMENT
- **ID:** SCR-EMAIL-ENGAGEMENT
- **Name:** EmailEngagement.tsx
- **Description:** A page that displays analytics related to email campaigns and user engagement.
- **Requirements:**
    - REQ-UI-0012: The Email Engagement page must show metrics like open rates, click-through rates, and unsubscribes.
- **Components:**
    - CMP-DASHBOARD-LAYOUT
- **API Calls:**
    - API-EMAIL-ENGAGEMENT-GET
- **Data Models:** None

### SCR-REFERRALS
- **ID:** SCR-REFERRALS
- **Name:** Referrals.tsx
- **Description:** A page dedicated to the referral program, where users can track their referrals and rewards.
- **Requirements:**
    - REQ-UI-0013: The Referrals page must display the user's unique referral code.
    - REQ-UI-0014: The Referrals page must show a list of referred users and the status of their rewards.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:**
    - API-REFERRAL-ANALYTICS
- **Data Models:**
    - DM-REFERRAL

### SCR-PRICING
- **ID:** SCR-PRICING
- **Name:** Pricing.tsx
- **Description:** A page that outlines the different pricing tiers for the Harmony Care platform.
- **Requirements:**
    - REQ-UI-0015: The Pricing page must clearly display the features and costs of each tier (Starter, Professional, Enterprise).
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
    - CMP-COMPARISON-TABLE
- **API Calls:** None
- **Data Models:** None

### SCR-ABOUT
- **ID:** SCR-ABOUT
- **Name:** About.tsx
- **Description:** A page that provides information about the Harmony Care company and its mission.
- **Requirements:**
    - REQ-UI-0016: The About page must tell a compelling story about the company and its values.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-BLOG
- **ID:** SCR-BLOG
- **Name:** Blog.tsx
- **Description:** A page that lists all the blog articles.
- **Requirements:**
    - REQ-UI-0017: The Blog page must display a list of articles with their titles, summaries, and publication dates.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-BLOG-ARTICLE
- **ID:** SCR-BLOG-ARTICLE
- **Name:** BlogArticle.tsx
- **Description:** A page that displays a single blog article.
- **Requirements:**
    - REQ-UI-0018: The Blog Article page must display the full content of the selected article.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-AGENTS
- **ID:** SCR-AGENTS
- **Name:** Agents.tsx
- **Description:** A page that showcases the various AI agents available in the Harmony Care platform.
- **Requirements:**
    - REQ-UI-0019: The Agents page must provide a detailed description of each agent and its capabilities.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-DEMO
- **ID:** SCR-DEMO
- **Name:** Demo.tsx
- **Description:** A page where prospective customers can request a demo of the Harmony Care platform.
- **Requirements:**
    - REQ-UI-0020: The Demo page must include a form to collect contact information and schedule a demo.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-GROUP-HOMES
- **ID:** SCR-GROUP-HOMES
- **Name:** GroupHomes.tsx
- **Description:** A solution page tailored for group homes, highlighting the benefits of Harmony Care for their specific needs.
- **Requirements:**
    - REQ-UI-0021: The Group Homes page must address the unique challenges and pain points of group home facilities.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-ICF-ID
- **ID:** SCR-ICF-ID
- **Name:** IcfId.tsx
- **Description:** A solution page tailored for ICF-ID facilities, highlighting the benefits of Harmony Care for their specific needs.
- **Requirements:**
    - REQ-UI-0022: The ICF-ID page must address the unique challenges and pain points of ICF-ID facilities.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

### SCR-RESOURCES
- **ID:** SCR-RESOURCES
- **Name:** Resources.tsx
- **Description:** A hub for all marketing and educational resources, including lead magnets and blog articles.
- **Requirements:**
    - REQ-UI-0023: The Resources page must be well-organized and easy to navigate.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
    - CMP-FEATURED-RESOURCES
- **API Calls:**
    - API-LEAD-MAGNETS-GET
- **Data Models:**
    - DM-LEAD-MAGNET

### SCR-RESOURCE-LANDING
- **ID:** SCR-RESOURCE-LANDING
- **Name:** resources/*.tsx
- **Description:** A set of landing pages for specific resource categories (Compliance, Staffing, Financial, Medication, PersonCentered).
- **Requirements:**
    - REQ-UI-0024: Each resource landing page must focus on a specific topic and provide relevant resources.
- **Components:**
    - CMP-RESOURCE-LANDING-TEMPLATE
- **API Calls:** None
- **Data Models:** None

### SCR-NOT-FOUND
- **ID:** SCR-NOT-FOUND
- **Name:** NotFound.tsx
- **Description:** A 404 page that is displayed when a user navigates to a non-existent URL.
- **Requirements:**
    - REQ-UI-0025: The 404 page must be user-friendly and provide a way for users to navigate back to the main site.
- **Components:**
    - CMP-NAVIGATION
    - CMP-FOOTER
- **API Calls:** None
- **Data Models:** None

---

## 2. UI Components (CMP)

### CMP-NAVIGATION
- **ID:** CMP-NAVIGATION
- **Name:** Navigation.tsx
- **Description:** The main navigation bar for the website.
- **Used By:** All SCR pages except admin pages.

### CMP-FOOTER
- **ID:** CMP-FOOTER
- **Name:** Footer.tsx
- **Description:** The footer section of the website.
- **Used By:** All SCR pages except admin pages.

### CMP-AI-CHAT-BOX
- **ID:** CMP-AI-CHAT-BOX
- **Name:** AIChatBox.tsx
- **Description:** An interactive AI chat interface.
- **Used By:** SCR-HOME

### CMP-SAVINGS-CALCULATOR
- **ID:** CMP-SAVINGS-CALCULATOR
- **Name:** SavingsCalculator.tsx
- **Description:** An interactive ROI calculator.
- **Used By:** SCR-HOME

### CMP-COST-SAVINGS-CHART
- **ID:** CMP-COST-SAVINGS-CHART
- **Name:** CostSavingsChart.tsx
- **Description:** A chart component for visualizing cost savings.
- **Used By:** SCR-ADMIN

### CMP-ANIMATED-COUNTER
- **ID:** CMP-ANIMATED-COUNTER
- **Name:** AnimatedCounter.tsx
- **Description:** An animated number counter.
- **Used By:** Various pages to show statistics.

### CMP-COMPARISON-TABLE
- **ID:** CMP-COMPARISON-TABLE
- **Name:** ComparisonTable.tsx
- **Description:** A table for comparing features.
- **Used By:** SCR-PRICING

### CMP-DASHBOARD-LAYOUT
- **ID:** CMP-DASHBOARD-LAYOUT
- **Name:** DashboardLayout.tsx
- **Description:** The layout for the admin dashboard.
- **Used By:** SCR-ADMIN, SCR-ADMIN-CALCULATOR-LEADS, SCR-ADMIN-RESOURCES, SCR-EMAIL-ENGAGEMENT

### CMP-EXIT-INTENT-POPUP
- **ID:** CMP-EXIT-INTENT-POPUP
- **Name:** ExitIntentPopup.tsx
- **Description:** A popup that appears when a user is about to leave the site.
- **Used By:** Various pages to capture leads.

### CMP-FEATURED-RESOURCES
- **ID:** CMP-FEATURED-RESOURCES
- **Name:** FeaturedResources.tsx
- **Description:** A component for displaying featured resource cards.
- **Used By:** SCR-RESOURCES

### CMP-LIVE-CHAT
- **ID:** CMP-LIVE-CHAT
- **Name:** LiveChat.tsx
- **Description:** A live chat widget.
- **Used By:** Various pages to provide support.

### CMP-MILESTONE-CELEBRATION
- **ID:** CMP-MILESTONE-CELEBRATION
- **Name:** MilestoneCelebration.tsx
- **Description:** A component for celebrating user milestones.
- **Used By:** SCR-REFERRALS

### CMP-NEWSLETTER-SIGNUP
- **ID:** CMP-NEWSLETTER-SIGNUP
- **Name:** NewsletterSignup.tsx
- **Description:** A form for signing up for the newsletter.
- **Used By:** Various pages.

### CMP-RESOURCE-LANDING-TEMPLATE
- **ID:** CMP-RESOURCE-LANDING-TEMPLATE
- **Name:** ResourceLandingTemplate.tsx
- **Description:** A template for resource landing pages.
- **Used By:** SCR-RESOURCE-LANDING

### CMP-SEO-HEAD
- **ID:** CMP-SEO-HEAD
- **Name:** SEOHead.tsx
- **Description:** A component for managing SEO meta tags.
- **Used By:** All SCR pages.

### CMP-SHARE-TEMPLATES
- **ID:** CMP-SHARE-TEMPLATES
- **Name:** ShareTemplates.tsx
- **Description:** A component for social sharing.
- **Used By:** SCR-REFERRALS, SCR-BLOG-ARTICLE

### CMP-VIDEO-MODAL
- **ID:** CMP-VIDEO-MODAL
- **Name:** VideoModal.tsx
- **Description:** A modal for playing videos.
- **Used By:** Various pages.
