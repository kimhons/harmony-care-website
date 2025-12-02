# HarmonyCare Repository: Complete File Mapping & Recommendations

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## 1. Executive Summary

This document provides a comprehensive mapping of all files in the current `kimhons/harmony-care-website` repository to their new locations in the proposed optimal structure. It also includes actionable recommendations for the two-developer team to implement this reorganization efficiently.

## 2. Complete File Mapping

### 2.1 Root-Level Files

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `README.md` | `README.md` (updated content) | Remains at root but simplified to high-level overview |
| `todo.md` | **DELETE** (migrate to GitHub Issues) | Replace with native GitHub project management |
| `PROGRESS_REPORT.md` | `docs/4_project_management/4.1_progress_reports.md` | Centralize project management docs |
| `CONTRIBUTING.md` | `docs/3_engineering/3.5_contributing.md` | Move to engineering docs |
| `DEPLOYMENT-GUIDE.md` | `docs/3_engineering/3.4_deployment_guide.md` | Consolidate engineering guides |
| `CI-CD-SETUP.md` | `docs/3_engineering/3.6_ci_cd_setup.md` | Engineering infrastructure docs |
| `RESEND_WEBHOOK_SETUP.md` | `docs/3_engineering/3.7_resend_webhook_setup.md` | Technical integration guide |
| `BING_WEBMASTER_SETUP.md` | `docs/6_marketing/6.4_bing_webmaster_setup.md` | SEO and marketing setup |
| `GOOGLE_SEARCH_CONSOLE_SETUP.md` | `docs/6_marketing/6.5_google_search_console_setup.md` | SEO and marketing setup |
| `MULTI_SEARCH_ENGINE_SETUP.md` | `docs/6_marketing/6.6_multi_search_engine_setup.md` | SEO and marketing setup |
| `YANDEX_WEBMASTER_SETUP.md` | `docs/6_marketing/6.7_yandex_webmaster_setup.md` | SEO and marketing setup |
| `NEWSLETTER_NURTURE.md` | `docs/6_marketing/6.3_newsletter_content.md` | Marketing content strategy |
| `BLOG_ARTICLES_REVIEW.md` | `docs/6_marketing/6.8_blog_articles_review.md` | Content review and strategy |

### 2.2 Agent Specification Documents (New Files)

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `HarmonyCare_Complete_Agent_Specifications.md` | `docs/1_product/1.2_complete_agent_specifications.md` | Master product specification |
| `clinical_agent_specifications.md` | `docs/1_product/1.3_clinical_agents.md` | Detailed clinical agent specs |
| `operational_agent_specifications.md` | `docs/1_product/1.4_operational_agents.md` | Detailed operational agent specs |
| `engagement_agent_specifications.md` | `docs/1_product/1.5_engagement_agents.md` | Detailed engagement agent specs |
| `additional_agent_specifications.md` | `docs/1_product/1.6_support_agents.md` | Detailed support agent specs |

### 2.3 Architecture & Implementation Documents (New Files)

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `HarmonyCare_Updated_Implementation_Blueprint_v2.md` | `docs/2_architecture/2.1_system_architecture.md` | Primary architecture document |
| `refined_hybrid_architecture.md` | `docs/2_architecture/2.2_hybrid_agent_architecture.md` | Agent framework design |
| `architectural_review_analysis.md` | `docs/2_architecture/2.3_crud_agent_integration.md` | Integration patterns |
| `tool_and_concierge_specs.md` | `docs/2_architecture/2.4_tool_layer_specifications.md` | Tool layer design |
| `harmonycare_analysis.md` | `docs/5_research/5.1_harmonycare_analysis.md` | Initial research and analysis |
| `azure_foundry_research.md` | `docs/5_research/5.2_azure_foundry_research.md` | Framework research |
| `claude_multiagent_insights.md` | `docs/5_research/5.3_claude_multiagent_insights.md` | Multi-agent patterns research |
| `chatgpt_insights.md` | `docs/5_research/5.4_chatgpt_insights.md` | External recommendations |
| `senior_living_operations_research.md` | `docs/5_research/5.5_senior_living_operations_research.md` | Industry research |

### 2.4 Existing `docs/` Directory

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `docs/BLOG_ARTICLES_REVIEW.md` | `docs/6_marketing/6.8_blog_articles_review.md` | Marketing content |
| `docs/BLOG_TOPIC_RECOMMENDATIONS.md` | `docs/6_marketing/6.9_blog_topic_recommendations.md` | Content strategy |
| `docs/PROGRESS_REPORT.md` | `docs/4_project_management/4.1_progress_reports.md` | Project management |
| `docs/admin-quickstart.md` | `docs/3_engineering/3.8_admin_quickstart.md` | Engineering guide |
| `docs/analytics-events.md` | `docs/3_engineering/3.9_analytics_events.md` | Technical implementation |
| `docs/dns-audit-report.md` | `docs/6_marketing/6.10_dns_audit_report.md` | Infrastructure audit |
| `docs/email-campaign-sequence.md` | `docs/6_marketing/6.11_email_campaign_sequence.md` | Marketing automation |
| `docs/email-campaign-setup.md` | `docs/6_marketing/6.12_email_campaign_setup.md` | Marketing setup |
| `docs/seo-content-strategy.md` | `docs/6_marketing/6.1_seo_content_strategy.md` | SEO strategy |

### 2.5 `research/` Directory

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `research/facility-health-assessment.md` | `docs/5_research/5.6_facility_health_assessment.md` | Product research |
| `research/magazine-proposal-v2.md` | `docs/6_marketing/6.13_magazine_proposal_v2.md` | Marketing initiative |
| `research/magazine-proposal.md` | `docs/6_marketing/6.14_magazine_proposal.md` | Marketing initiative |
| `research/magazine-toc-detailed.md` | `docs/6_marketing/6.15_magazine_toc_detailed.md` | Marketing content |
| `research/pain-points-research.md` | `docs/5_research/5.7_pain_points_research.md` | User research |
| `research/solution-mapping.md` | `docs/5_research/5.8_solution_mapping.md` | Product strategy |
| `research/top-100-pain-points.md` | `docs/5_research/5.9_top_100_pain_points.md` | User research |

### 2.6 `marketing/` Directory

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `marketing/social-media-ad-copy.md` | `docs/6_marketing/6.2_social_media_ad_copy.md` | Marketing content |

### 2.7 Application Code Directories

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `client/` | `packages/client/` | Monorepo structure |
| `server/` | `packages/server/` | Monorepo structure |
| `shared/` | `packages/shared/` | Monorepo structure |
| `drizzle/` | `packages/server/drizzle/` | Co-locate with server code |

### 2.8 Content Files

| Current Location | New Location | Rationale |
|------------------|--------------|-----------|
| `content/blog/*.md` | `packages/client/src/content/blog/*.md` | Co-locate with frontend |
| `content/knowledge-base/**/*.md` | `packages/client/src/content/knowledge-base/**/*.md` | Co-locate with frontend |
| `client/public/content/blog/*.md` | `packages/client/src/content/blog/*.md` | Consolidate all content |

## 3. New Files to Create

### 3.1 Product Documentation

| File | Purpose |
|------|---------|
| `docs/1_product/1.1_vision_and_strategy.md` | High-level product vision, mission, and strategic goals |
| `docs/1_product/README.md` | Overview of the product documentation section |

### 3.2 Architecture Documentation

| File | Purpose |
|------|---------|
| `docs/2_architecture/2.5_database_schema.md` | Complete database schema documentation with ERD |
| `docs/2_architecture/2.6_api_specifications.md` | tRPC API endpoint documentation |
| `docs/2_architecture/README.md` | Overview of the architecture documentation section |

### 3.3 Engineering Documentation

| File | Purpose |
|------|---------|
| `docs/3_engineering/3.1_development_setup.md` | Comprehensive local development setup guide |
| `docs/3_engineering/3.2_coding_conventions.md` | TypeScript, React, and Node.js coding standards |
| `docs/3_engineering/3.3_testing_strategy.md` | Testing approach, tools, and best practices |
| `docs/3_engineering/README.md` | Overview of the engineering documentation section |

### 3.4 Project Management

| File | Purpose |
|------|---------|
| `docs/4_project_management/4.1_roadmap.md` | Product roadmap with phases and milestones |
| `docs/4_project_management/4.2_sprint_planning/` | Directory for sprint planning documents |
| `docs/4_project_management/4.3_meeting_notes/` | Directory for meeting notes |
| `docs/4_project_management/README.md` | Overview of project management documentation |

### 3.5 Research

| File | Purpose |
|------|---------|
| `docs/5_research/README.md` | Overview of research documentation |

### 3.6 Marketing

| File | Purpose |
|------|---------|
| `docs/6_marketing/README.md` | Overview of marketing documentation |

### 3.7 Root Configuration

| File | Purpose |
|------|---------|
| `pnpm-workspace.yaml` | Define monorepo workspaces for pnpm |
| `.env.example` | Template for environment variables |

## 4. Actionable Recommendations for the Two-Developer Team

### 4.1 Immediate Actions (Week 1)

**Developer 1: Repository Restructuring**
1. Create a new branch: `git checkout -b chore/repo-restructure`
2. Follow the step-by-step guide in `repository_reorganization_guide.md`
3. Execute all file moves and directory creations
4. Update the root `README.md` with the new structure overview
5. Create `pnpm-workspace.yaml` for monorepo configuration
6. Test that the application still builds and runs after restructuring
7. Create a pull request for review

**Developer 2: Documentation Creation**
1. Create the new documentation files listed in Section 3
2. Write `docs/1_product/1.1_vision_and_strategy.md` based on existing materials
3. Write `docs/3_engineering/3.1_development_setup.md` by consolidating setup instructions from the old README
4. Write `docs/3_engineering/3.2_coding_conventions.md` based on the existing codebase patterns
5. Create `README.md` files for each `docs` subdirectory to provide navigation
6. Create a pull request for review

### 4.2 Short-Term Actions (Week 2-3)

**Both Developers:**
1. Migrate all tasks from `todo.md` to GitHub Issues
   - Use labels: `bug`, `feature`, `documentation`, `infrastructure`
   - Use milestones to group related issues (e.g., "Phase 1: Core Platform")
   - Assign issues to the appropriate developer
2. Set up GitHub Projects board for visual task management
3. Create issue templates in `.github/ISSUE_TEMPLATE/`
4. Update all internal links in documentation to reflect the new structure
5. Review and merge the restructuring pull requests

### 4.3 Medium-Term Actions (Month 1)

1. **Database Schema Documentation:** Create a visual ERD and document all tables, relationships, and indexes in `docs/2_architecture/2.5_database_schema.md`
2. **API Documentation:** Document all tRPC endpoints in `docs/2_architecture/2.6_api_specifications.md`
3. **Testing Strategy:** Expand the test suite and document the testing approach in `docs/3_engineering/3.3_testing_strategy.md`
4. **Roadmap:** Create a detailed product roadmap in `docs/4_project_management/4.1_roadmap.md`

### 4.4 Best Practices Going Forward

1. **All new documentation goes into `/docs`:** No more root-level Markdown files.
2. **Use GitHub Issues for all tasks:** Replace the `todo.md` workflow entirely.
3. **Pull requests must reference documentation:** Every PR should link to the relevant specification or architecture document.
4. **Keep the README simple:** The root README should be a high-level overview. Detailed information lives in `/docs`.
5. **Regular documentation reviews:** Schedule monthly reviews to ensure documentation stays up-to-date with code changes.

## 5. Migration Checklist

Use this checklist to track the reorganization progress:

- [ ] Create new directory structure (`docs/`, `packages/`)
- [ ] Move `client/`, `server/`, `shared/` to `packages/`
- [ ] Move all root-level Markdown files to appropriate `docs/` subdirectories
- [ ] Move all files from old `docs/`, `research/`, `marketing/` to new `docs/` structure
- [ ] Move agent specification documents to `docs/1_product/`
- [ ] Move architecture documents to `docs/2_architecture/`
- [ ] Create `pnpm-workspace.yaml`
- [ ] Update root `README.md`
- [ ] Create new documentation files (vision, setup, conventions, etc.)
- [ ] Create `README.md` files for each `docs/` subdirectory
- [ ] Test application build and run
- [ ] Migrate `todo.md` tasks to GitHub Issues
- [ ] Set up GitHub Projects board
- [ ] Create GitHub issue templates
- [ ] Update all internal documentation links
- [ ] Delete old empty directories
- [ ] Commit and push changes
- [ ] Create and merge pull requests

## 6. Expected Outcomes

After completing this reorganization, the team will experience:

- **Improved Navigation:** Finding any document or piece of code will be intuitive and fast.
- **Better Onboarding:** New team members can follow the numbered `docs/` folders to understand the entire project.
- **Reduced Confusion:** No more guessing where a file should go or where to find information.
- **Scalability:** The structure can easily accommodate new agents, features, and documentation without becoming cluttered.
- **Professional Presentation:** The repository will present a polished, well-organized image to stakeholders and potential contributors.

This reorganization is a foundational investment that will pay dividends throughout the entire development lifecycle of the HarmonyCare platform.
