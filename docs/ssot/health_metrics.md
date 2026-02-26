# Harmony Platform Health Metrics

**DOCUMENT:** `health_metrics.md`
**OUTPUT PATH:** `docs/ssot/health_metrics.md`
**TASK:** Create health metrics with: (1) Detected mode: CONSOLIDATE, (2) Detected surfaces with evidence, (3) Health scores: orphan count conflict count unverified count coverage percentage, (4) GAP items found, (5) Next priority actions. Calculate coverage as: (mapped REQs with TASK+TEST) / (total REQs).

---

## 1. Detected Mode

- **Mode:** `CONSOLIDATE`
- **Evidence:** The project brief explicitly sets the mode to `CONSOLIDATE`, indicating the primary effort is to unify existing code and extensive, disparate documentation into a cohesive Single Source of Truth (SSOT).

## 2. Detected Surfaces

| Surface | Technology | Evidence File | Key Details |
|---|---|---|---|
| **UI (Web)** | React 19, Tailwind 4, shadcn/ui, Wouter | `harmony_blueprint_context.md` | 18 pages, 25+ components identified. |
| **API** | tRPC 11, Express 4 | `harmony_routers.txt` | 12+ routers confirmed, including auth, admin, and signup. |
| **Data** | MySQL/TiDB, Drizzle ORM | `harmony_schema.txt` | 8 tables defined, including `users`, `signups`, and `referrals`. |
| **Agents/Automation** | LangChain, LangGraph, CrewAI | `harmony_all_specs.md` | 20 AI agents planned across 5 domains. |
| **Integrations** | Resend, S3, OAuth, Google Maps | `harmony_blueprint_context.md` | Key integrations for email, storage, and authentication are listed. |
| **Infra/Ops** | Vercel | `harmony_blueprint_context.md` | Vercel is the designated deployment platform. |

## 3. Health Scores

| Metric | Score | Details |
|---|---|---|
| **Orphan Count** | 5 | **GAP-0001**: `leadScoringService.ts` exists but no data model or API seems to use its output. **GAP-0002**: `VideoModal.tsx` component is defined but not used in any of the listed pages. **GAP-0003**: `group-homes-solutions.md` and `icf-id-solutions.md` are mentioned as completed but not listed in the repo files. **GAP-0004**: `LiveChat.tsx` component is present but no backend integration for it is specified. **GAP-0005**: `AnimatedCounter.tsx` is not used in any of the main pages. |
| **Conflict Count** | 2 | **CONFLICT-0001**: `harmony_blueprint_context.md` lists `Wouter` as the router, but some components suggest `react-router` might be in use. **CONFLICT-0002**: `harmony_schema.txt` defines `users.role` as `user` or `admin`, but no admin-specific logic is implemented in the signup or auth routers beyond a basic check. |
| **Unverified Count** | 3 | **GAP-0006**: Phase 2 (Product Pages) is marked as PARTIAL, with 5 pages not done. **GAP-0007**: Phase 3 (Solutions, Pricing & Resources) is PARTIAL, with several solution pages missing. **GAP-0008**: Phase 4 (Company & Forms) is PARTIAL, with pages like 'Contact' and 'Careers' not started. |
| **Coverage Percentage** | 15% | **Calculation**: 3 REQs with TASK+TEST / 20 total REQs. **Total REQs**: 20 (from the 20 planned AI agents). **Mapped REQs**: 3 (based on `referral.test.ts`, `milestoneSystem.test.ts`, `newsletter.test.ts` which map to specific agent functionalities). |

## 4. GAP Items Found

- **GAP-0001**: `leadScoringService.ts` is an orphan with no clear consumer.
- **GAP-0002**: `VideoModal.tsx` component is unused.
- **GAP-0003**: Solution-specific markdown files for group homes and ICF-ID facilities are missing.
- **GAP-0004**: `LiveChat.tsx` has no backend integration.
- **GAP-0005**: `AnimatedCounter.tsx` component is unused.
- **GAP-0006**: Incomplete Product Pages (Phase 2): `15 AI agents page`, `features page`, `dashboards`, `integrations`, `security pages`.
- **GAP-0007**: Incomplete Solutions Pages (Phase 3): Solutions for facilities other than Group Homes and ICF-ID are missing.
- **GAP-0008**: Incomplete Company Pages (Phase 4): `Contact`, `Careers`, and other standard company pages are not implemented.

## 5. Next Priority Actions

1.  **TASK-DOC-0001**: Create tasks to implement the missing pages from Phase 2, 3, and 4 to improve feature completeness.
2.  **TASK-TEST-0001**: Develop a comprehensive test plan to increase the `Coverage Percentage`. Start by creating tests for the existing agent specifications.
3.  **TASK-INTEGRATE-0001**: Integrate the `leadScoringService.ts` with the `calculatorLeads` data model and expose the score via the API.
4.  **TASK-UI-0001**: Implement the `VideoModal.tsx` and `AnimatedCounter.tsx` components on the `Home.tsx` or `Agents.tsx` pages to provide richer content.
5.  **TASK-DOC-0002**: Resolve the `Wouter` vs. `react-router` conflict by standardizing on one router and updating all related files.
