# Azure AI Foundry Agent Service - Research Findings

## Overview

Microsoft Foundry is a platform that combines **models, tools, frameworks, and governance** into a unified system for building intelligent agents. Foundry Agent Service is at the center, enabling the operation of agents across development, deployment, and production.

## Core Value Proposition

**Problem**: LLMs can drift, be incorrect, and lack accountability. Without visibility, policy enforcement, and orchestration, these models are difficult to trust in real business workflows.

**Solution**: Foundry Agent Service connects models, tools, and frameworks into a single runtime. It manages conversations, orchestrates tool calls, enforces content safety, and integrates with identity, networking, and observability systems to ensure agents are secure, scalable, and production-ready.

## Agent Components

Each agent has three core components:

1. **Model (LLM)**: Powers reasoning and language understanding (GPT-4o, GPT-4, GPT-3.5, Llama, etc.)
2. **Instructions**: Define the agent's goals, behavior, and constraints
   - **Declarative**: Prompt-based single agent or YAML/code workflows to orchestrate multiple agents
   - **Hosted**: Containerized agents created and deployed in code, hosted by Foundry
3. **Tools**: Let the agent retrieve knowledge or take action (Bing, SharePoint, Azure AI Search, Logic Apps, Azure Functions, OpenAPI, etc.)

## How Foundry Works (The "Agent Factory")

### 1. Models
Select a model from the catalog (GPT-4o, GPT-4, GPT-3.5, Llama, etc.) that gives your agent its intelligence.

### 2. Customization
Shape the model with fine-tuning, distillation, or domain-specific prompts. Encode agent behavior, role-specific knowledge, and patterns from prior performance.

### 3. Tools
Equip your agent with tools to access enterprise knowledge (Bing, SharePoint, Azure AI Search) and take real-world actions (Logic Apps, Azure Functions, OpenAPI).

### 4. Orchestration
Connected agents orchestrate the full lifecycle: handling tool calls, updating conversation state, managing retries, and logging outputs.

### 5. Observability
Capture logs, traces, and evaluations at every step. Full conversation-level visibility with Application Insights integration.

### 6. Trust
Enterprise-grade trust features: identity via Microsoft Entra, RBAC, content filters, encryption, and network isolation. Platform-managed or bring-your-own infrastructure.

## Key Capabilities

| Capability | Description |
|------------|-------------|
| **Conversation Management** | Manages multi-turn conversations, context, and state |
| **Tool Orchestration** | Handles tool calls, retries, and error handling |
| **Content Safety** | Enforces content filters and safety policies |
| **Identity & RBAC** | Microsoft Entra integration, role-based access control |
| **Observability** | Logs, traces, evaluations, Application Insights integration |
| **Multi-Agent Workflows** | Orchestrate multiple agents together via YAML or code |
| **Hosted Agents** | Containerized agents deployed and hosted by Foundry |
| **Network Isolation** | VNet integration, private endpoints |
| **Encryption** | Data encryption at rest and in transit |

## Business Continuity & Disaster Recovery (BCDR)

**Cosmos DB for State Management**:
- Customers provision and manage their own single-tenant Cosmos DB account
- All agent state is stored in customer's Cosmos DB
- Backup and recovery rely on Cosmos DB's native capabilities
- If primary region becomes unavailable, agent automatically becomes available in secondary region by connecting to same Cosmos DB account
- All history is preserved in Cosmos DB for minimal disruption

**Recommendation**: Provision and maintain Cosmos DB account with appropriate backup and recovery policies.

## Getting Started

1. Create a Foundry project in Azure subscription
2. Deploy a compatible model (e.g., GPT-4o)
3. Start making API calls using the SDKs

## Integration with HarmonyCare Architecture

### Advantages
1. **Production-Ready**: Built-in observability, policy enforcement, security
2. **Azure-Native**: Seamless integration with Azure services (Entra ID, Application Insights, Logic Apps, etc.)
3. **Multi-Agent Orchestration**: Native support for connected agents and workflows
4. **Content Safety**: Built-in content filters and safety policies
5. **Scalability**: Platform-managed infrastructure with auto-scaling
6. **BCDR**: Cosmos DB-based state management with regional failover

### Considerations
1. **Cost**: Azure-native services may be more expensive than open-source alternatives
2. **Vendor Lock-in**: Tight coupling with Microsoft ecosystem
3. **Open-Source LLM Support**: Need to verify support for open-source models (Llama, etc.) for cost optimization
4. **Customization**: May have limitations compared to building custom orchestration with LangGraph/CrewAI

### Recommended Approach
**Hybrid Architecture**: Use Foundry Agent Service for production-critical agents (compliance, medication management, health monitoring) that require maximum reliability and observability, while using custom orchestration (LangGraph/CrewAI) for less critical agents or internal tools where cost optimization and flexibility are priorities.

This approach balances:
- **Production readiness** (Foundry for critical agents)
- **Cost optimization** (custom orchestration + open-source LLMs for non-critical agents)
- **Flexibility** (ability to use best tool for each use case)
- **Reduced vendor lock-in** (not all agents depend on Foundry)
