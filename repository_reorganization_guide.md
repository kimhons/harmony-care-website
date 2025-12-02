# HarmonyCare Repository: Reorganization Implementation Guide

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## 1. Introduction

This guide provides a step-by-step plan for reorganizing the `kimhons/harmony-care-website` repository from its current state into the optimal monorepo structure. Following these steps will establish a clean, scalable, and well-documented foundation for the project.

## 2. Step-by-Step Reorganization Plan

These commands should be run from the root of your cloned repository.

### Step 1: Create the New Directory Structure

First, we create the primary directories for the new structure.

```bash
# Create the main 'docs' and 'packages' directories
mkdir docs packages

# Create the thematic subdirectories within 'docs'
mkdir -p docs/1_product docs/2_architecture docs/3_engineering docs/4_project_management docs/5_research docs/6_marketing

# Create a placeholder for GitHub-specific files
mkdir -p .github/workflows
```

### Step 2: Move Application Code into `/packages`

Next, we will relocate the existing `client`, `server`, and `shared` directories into the new `packages` directory.

```bash
# Move the core application code
mv client packages/client
mv server packages/server
mv shared packages/shared
```

### Step 3: Consolidate All Documentation into `/docs`

This step involves moving all scattered Markdown files into their new, organized locations within the `/docs` directory.

**Move Root-Level Documents:**

```bash
# Move technical setup and guides to docs/3_engineering
mv CI-CD-SETUP.md DEPLOYMENT-GUIDE.md RESEND_WEBHOOK_SETUP.md docs/3_engineering/

# Move marketing and SEO files to docs/6_marketing
mv BING_WEBMASTER_SETUP.md GOOGLE_SEARCH_CONSOLE_SETUP.md MULTI_SEARCH_ENGINE_SETUP.md YANDEX_WEBMASTER_SETUP.md docs/6_marketing/

# Move project management files
mv PROGRESS_REPORT.md docs/4_project_management/
mv CONTRIBUTING.md docs/3_engineering/3.5_contributing.md

# Move newsletter content
mv NEWSLETTER_NURTURE.md docs/6_marketing/6.3_newsletter_content.md
```

**Consolidate `docs`, `research`, and `marketing` folders:**

```bash
# Move existing docs content into the new structure
mv docs/*.md docs/3_engineering/  # Assuming old docs were mostly engineering-related

# Move all research files
mv research/*.md docs/5_research/

# Move all marketing files
mv marketing/*.md docs/6_marketing/

# Clean up old empty directories
rmdir research marketing
```

**Move Specification Documents:**

Assuming the agent specification documents are in the root directory:

```bash
# Move the master agent specification
mv HarmonyCare_Complete_Agent_Specifications.md docs/1_product/1.2_complete_agent_specifications.md

# Move the detailed agent specifications
mv clinical_agent_specifications.md docs/1_product/1.3_clinical_agents.md
mv operational_agent_specifications.md docs/1_product/1.4_operational_agents.md
mv engagement_agent_specifications.md docs/1_product/1.5_engagement_agents.md
mv additional_agent_specifications.md docs/1_product/1.6_support_agents.md

# Move architecture and implementation plans
mv HarmonyCare_Updated_Implementation_Blueprint_v2.md docs/2_architecture/2.1_system_architecture.md
mv refined_hybrid_architecture.md docs/2_architecture/2.2_hybrid_agent_architecture.md
mv architectural_review_analysis.md docs/2_architecture/2.3_crud_agent_integration.md
mv tool_and_concierge_specs.md docs/2_architecture/2.4_tool_layer_specifications.md
```

### Step 4: Configure the Monorepo

Create a `pnpm-workspace.yaml` file in the root directory to define the monorepo workspaces.

**`pnpm-workspace.yaml`:**
```yaml
packages:
  - 'packages/*'
```

Update the root `package.json` to include scripts that can run commands across all packages.

**`package.json` (add scripts section):**
```json
{
  "private": true,
  "scripts": {
    "dev": "pnpm --filter client dev",
    "build": "pnpm --filter "./packages/*" build",
    "test": "pnpm --filter "./packages/*" test"
  }
}
```

### Step 5: Update the README.md

Replace the content of the root `README.md` with a new, high-level overview. The detailed information from the old README should be moved into the relevant `docs` files.

**New `README.md` Content:**

```markdown
# HarmonyCare - AI-Native Care Management Platform

**Transforming residential care with 20 autonomous AI agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## About This Repository

This monorepo contains the source code and complete documentation for the HarmonyCare platform. It is structured to provide a clear separation between code and documentation, facilitating development and onboarding.

- **`/packages`**: Contains all application code, including the frontend (`client`), backend (`server`), and shared libraries.
- **`/docs`**: The single source of truth for all project documentation, including product specifications, architecture, and engineering guides.

## 🚀 Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm package manager
- MySQL database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kimhons/harmony-care-website.git
    cd harmony-care-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Copy the `.env.example` to `.env` and fill in the required values. See `docs/3_engineering/3.1_development_setup.md` for detailed instructions.

4.  **Run database migrations:**
    ```bash
    pnpm --filter server db:push
    ```

5.  **Start the development servers:**
    ```bash
    pnpm dev
    ```

## 📚 Documentation

All project documentation is located in the `/docs` directory. We recommend starting with the following files:

- **[Product Vision & Strategy](./docs/1_product/1.1_vision_and_strategy.md)**: Understand what we are building and why.
- **[System Architecture](./docs/2_architecture/2.1_system_architecture.md)**: Get a high-level overview of how the system works.
- **[Development Setup](./docs/3_engineering/3.1_development_setup.md)**: Learn how to set up your local development environment.

## 🤝 Contributing

Contributions are welcome! Please see our **[Contributing Guide](./docs/3_engineering/3.5_contributing.md)** for details on our development process, coding conventions, and how to submit a pull request.

---

**Built with ❤️ by the HarmonyCare team**

*Transforming residential care, one facility at a time.*
```

### Step 6: Final Cleanup and Commit

Finally, remove any remaining clutter and commit the new structure to the repository.

```bash
# Remove the old todo.md in favor of GitHub Issues
rm todo.md

# Add all changes to git
git add .

# Commit the reorganization
git commit -m "chore: reorganize repository into a structured monorepo"

# Push the changes to the remote repository
git push origin main
```

## 3. Post-Reorganization Workflow

-   **Tasks:** All new tasks, bugs, and features should be created as **GitHub Issues**.
-   **Documentation:** All new documentation should be added to the appropriate folder within `/docs`.
-   **Code:** All new code should be added to the relevant package in `/packages`.
-   **Pull Requests:** All changes should be submitted via pull requests, which should be reviewed against the documentation in `/docs` to ensure alignment with a link to the relevant GitHub Issue.
