# ChatGPT Suggestion - Key Insights

## Architecture Recommendations

### 1. System Layers (Logical Diagram)
1. **User Experience Layer**: Next.js web app + React Native mobile apps (staff & families) + dashboards + agent playground UI. All traffic via Azure Front Door with TLS 1.3
2. **API Gateway & Security Layer**: Azure API Management or Kong (unified entry, rate limiting, JWT verification). Entra ID (Azure AD) for SSO; B2C for families. WAF + DDoS protection
3. **Application Services Layer**: NestJS (TypeScript) microservices for domain logic (residents, staff, medications, incidents, compliance, finance, etc.). Temporal or Azure Durable Functions for workflows. Azure Event Hubs/Service Bus for events
4. **Agentic Layer**: 20 domain-specific agents as Python crew containers in Microsoft Foundry Agent Service. CrewAI for multi-agent workflows. Foundry provides conversation management, memory, RBAC, policy enforcement, cost tracking, observability
5. **Data & Search Layer**: Azure PostgreSQL (with Timescale), Azure Blob Storage, Azure AI Search (hybrid keyword+vector RAG), Azure Cache for Redis, ClickHouse/Azure Data Explorer for analytics
6. **Integration Layer**: Logic Apps for MS365, Surescripts, QuickBooks, ADP, Relias, HL7/FHIR, Twilio, Stripe

### 2. Key Technology Decisions
- **Backend Framework**: NestJS (TypeScript) for microservices
- **Agent Framework**: CrewAI + Microsoft Foundry Agent Service
- **Workflow Orchestration**: Temporal or Azure Durable Functions
- **Event Bus**: Azure Event Hubs or Service Bus
- **Database**: Azure PostgreSQL with Timescale extension + Row-Level Security
- **Vector Search**: Azure AI Search (hybrid keyword+vector)
- **Caching**: Azure Cache for Redis
- **Analytics**: ClickHouse on Azure or Azure Data Explorer
- **Identity**: Entra ID (staff) + B2C (families)
- **API Gateway**: Azure API Management or Kong

### 3. Agent Architecture
- **20 domain-specific agents** packaged as Python crew containers
- Agents interact with platform **only through Foundry tools** mapped to application APIs
- **Multi-agent workflows** defined in CrewAI, executed by Foundry's hosted agent runtime
- **Main orchestrator** (e.g., Aurora) routes user requests to appropriate agent/crew
- **Human-in-the-loop** for high-impact actions (med changes, CAP approvals)
- Foundry provides: conversation management, memory, RBAC, policy enforcement, cost tracking, observability

### 4. MVP Scope
**Core OS**:
- Multi-tenant org/facility/resident model
- Resident profiles
- Incidents
- Staff management
- Care plans
- Scheduling
- e-MAR (electronic Medication Administration Record)
- Admissions CRM
- Basic dashboards

**Initial Agents** (7):
1. DocuBot - Documentation
2. Sentinel - Health monitoring
3. Guardian - Compliance
4. Compass - Care planning
5. Nexus - Scheduling
6. Connect - Family communication
7. Advocate - Quality improvement

**Foundry Integration**:
- Deploy agents as Microsoft Foundry hosted agents
- Safe tool access
- Content-safety enforcement
- Observability

**Agent Playground** (sandbox):
- Internal staff can clone templates and test custom agents
- No production access

### 5. RBAC & Security
**Role Groups**:
- Executive
- Clinical Leader
- Staff
- Finance
- Compliance
- Operations
- Family
- Agent Builder

**Fine-grained scopes**: residents.read, medication.administer, agents.publish, etc.

**Foundry restricts** each agent's accessible tools based on role (e.g., Vanguard cannot invoke billing APIs)

**Tenant Isolation**:
- Each record includes tenant_id
- Postgres RLS enforces isolation
- Storage containers separated per tenant and region
- Agents run in tenant-scoped projects on Foundry

### 6. Observability & Trust
**Tracing & Metrics**:
- OpenTelemetry spans to Azure Monitor
- Foundry Observability logs tool calls, prompts, responses, token usage, cost per agent run

**Content Safety**:
- All inputs/outputs pass through Azure AI Content Safety
- Foundry guardrails block policy circumvention or PHI disclosure attempts

**Policy Enforcement**:
- Foundry Control Plane: cost caps, rate limits, restricted domains, cross-tenant restrictions
- Agent builders cannot publish to production without safety/quality evaluations

**Compliance**:
- Agents that influence care require human approval
- Guardian applies jurisdiction-specific rule engines (U.S./Canada/Quebec)
- All PHI accesses audited

### 7. Disaster Recovery
- **Critical services** (API, Postgres, caching, event bus): active-active across two Azure regions (RPO 15 min, RTO 1 hour)
- **Non-critical services** (analytics, gamification, playground): active-passive (RPO 1 hr, RTO 4 hr)
- **Backups**: Nightly full + hourly incremental; encryption keys rotate every 90 days
- **DR drills**: Twice a year

## Key Differences from Original Architecture

### Original (from ProjectHarmony files)
- LangGraph for agent orchestration
- LiteLLM for model routing
- Custom tool connectors
- Temporal.io for workflows
- PostgreSQL + MongoDB + Weaviate + Redis + S3 + Data Warehouse
- Kong API Gateway + Keycloak authentication

### ChatGPT Suggestion
- **CrewAI + Microsoft Foundry Agent Service** for agent orchestration (instead of LangGraph)
- **NestJS (TypeScript)** for microservices (instead of Node.js/Express)
- **Azure-native services** throughout (Azure PostgreSQL, Azure AI Search, Azure Event Hubs, etc.)
- **Temporal or Azure Durable Functions** for workflows (more flexible)
- **Entra ID + B2C** for identity (instead of Keycloak)
- **Azure API Management or Kong** for API gateway
- **Agent Playground** as a key MVP feature for internal customization

## Recommendation
The ChatGPT suggestion provides a **more Azure-native, production-ready architecture** with:
1. Better integration with Microsoft ecosystem (Foundry, Entra ID, Azure services)
2. Clearer separation of concerns (agents only access platform via Foundry tools)
3. Built-in observability, policy enforcement, and cost tracking via Foundry
4. More pragmatic MVP scope (7 agents instead of 20)
5. Agent Playground for internal customization without production risk
6. Stronger security and compliance posture (content safety, RBAC, tenant isolation)

However, we should also consider:
- **Cost implications** of Azure-native services vs. open-source alternatives
- **Vendor lock-in** with Microsoft Foundry Agent Service
- **Development team expertise** with Azure vs. other platforms
- **Open-source LLM support** for cost optimization (as per user's architectural preference)
