# Claude Multi-Agent System - Key Insights from Anthropic

## Architecture Pattern: Orchestrator-Worker

Anthropic uses an **orchestrator-worker pattern** where a lead agent coordinates the process while delegating to specialized subagents that operate in parallel.

### Workflow
1. **User submits query** → Lead agent analyzes it
2. **Lead agent develops strategy** → Spawns subagents to explore different aspects simultaneously
3. **Subagents act as intelligent filters** → Iteratively use search tools to gather information
4. **Subagents return findings** → Lead agent compiles final answer
5. **Citation agent** → Processes documents and research report to identify specific locations for citations

### Key Components
- **LeadResearcher Agent**: Coordinates overall research process
- **Subagents**: Specialized agents with specific research tasks (run in parallel)
- **Memory**: Persists context when context window exceeds 200K tokens
- **CitationAgent**: Ensures all claims are properly attributed to sources

## Performance Insights

### Multi-Agent vs Single-Agent
- **90.2% performance improvement** on internal research eval (multi-agent with Claude Opus 4 lead + Claude Sonnet 4 subagents vs single-agent Claude Opus 4)
- **Excels at breadth-first queries** that involve pursuing multiple independent directions simultaneously

### Token Usage Analysis
Three factors explain **95% of performance variance** in BrowseComp evaluation:
1. **Token usage** (explains 80% of variance by itself)
2. **Number of tool calls**
3. **Model choice**

**Token consumption**:
- Agents use ~**4× more tokens** than chat interactions
- Multi-agent systems use ~**15× more tokens** than chats

**Implication**: Multi-agent systems require tasks where the value is high enough to pay for increased performance.

## When to Use Multi-Agent Systems

### Good Fit
- **Heavy parallelization** (breadth-first exploration)
- **Information exceeds single context windows**
- **Interfacing with numerous complex tools**
- **Open-ended problems** where required steps can't be predicted in advance
- **High-value tasks** that justify increased token usage

### Poor Fit
- **Domains requiring all agents to share same context**
- **Many dependencies between agents**
- **Most coding tasks** (fewer truly parallelizable tasks, agents not yet great at real-time coordination)

## Architecture Principles

### 1. Separation of Concerns
Each subagent has:
- **Distinct tools**
- **Distinct prompts**
- **Independent exploration trajectories**

This reduces path dependency and enables thorough, independent investigations.

### 2. Dynamic vs Static Retrieval
**Traditional RAG**: Static retrieval (fetch chunks most similar to input query)

**Multi-agent research**: Dynamic multi-step search that:
- Finds relevant information iteratively
- Adapts to new findings
- Analyzes results to formulate high-quality answers

### 3. Compression Through Parallelization
Subagents facilitate compression by:
- Operating in parallel with their own context windows
- Exploring different aspects simultaneously
- Condensing most important tokens for lead research agent

## Prompt Engineering Lessons

### Coordination Complexity
Multi-agent systems have rapid growth in coordination complexity. Early mistakes:
- Spawning 50 subagents for simple queries (inefficient)
- Need clear guidelines on when to spawn subagents and how many

### Interleaved Thinking
Subagents use "interleaved thinking" to evaluate tool results and decide next steps.

### Memory Management
When context window exceeds 200K tokens:
- Truncate context
- Persist important information (like research plan) to Memory tool
- Lead agent can retrieve from Memory as needed

## Implications for HarmonyCare

### Architecture Recommendations
1. **Use orchestrator-worker pattern** for complex multi-step workflows (e.g., incident investigation → CAP → quality improvement)
2. **Lead agent** (e.g., Aurora) coordinates overall process
3. **Specialized subagents** for domain-specific tasks (clinical, compliance, operations, etc.)
4. **Memory system** to persist context across long-running workflows
5. **Citation/audit agent** to ensure all decisions are traceable and compliant

### Cost Management
- **Reserve multi-agent workflows** for high-value tasks (compliance audits, care plan creation, incident investigation)
- **Use single-agent** for routine tasks (documentation, scheduling, simple queries)
- **Monitor token usage** closely and set budgets per workflow type

### Hybrid Approach
- **Claude Opus 4** for lead agents (complex reasoning, coordination)
- **Claude Sonnet 4** for subagents (cost-effective, still high performance)
- **Open-source models** (Llama, etc.) for non-critical tasks to reduce costs

### Tool Design
- **Distinct tools per agent role** (clinical agents can't access billing, etc.)
- **Structured parameters** (no free-form text that could lead to prompt injection)
- **Audit trails** for all tool calls (critical for compliance)

### Evaluation Strategy
- **Define clear success metrics** per agent type (e.g., medication error reduction, compliance accuracy)
- **Track token usage** and correlate with performance
- **A/B test** single-agent vs multi-agent for different workflow types
- **Monitor coordination errors** (agents spawning too many subagents, infinite loops, etc.)
