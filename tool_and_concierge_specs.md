## Detailed Specifications: Tool Layer & Concierge Orchestrator

**Author:** Manus AI  
**Date:** November 27, 2025  
**Version:** 1.0

### 1. The Tool Layer: Secure Bridge to CRUD Services

The Tool Layer is the most critical component for securely integrating agents with the backend. It acts as a secure, auditable, and permissioned middleware that prevents agents from directly accessing any data or services. All agent actions are funneled through this layer.

**Core Framework**: LangChain (for its robust tool creation and management capabilities).

#### 1.1. Tool Design Principles

Every tool created within this layer MUST adhere to the following principles:

1.  **Strictly Schematized**: All tool inputs and outputs MUST be defined with a Pydantic model. This enforces type safety and provides a clear contract for the LLM, reducing malformed requests.
2.  **Atomic Operations**: Each tool should correspond to a single, logical CRUD operation (e.g., `get_resident`, `create_incident_report`). Avoid creating overly broad tools that perform multiple actions.
3.  **Idempotent**: Where possible, tools should be designed to be idempotent. For example, a `create` tool should handle cases where the same request is sent twice, preventing duplicate entries.
4.  **Comprehensive Logging**: Every tool invocation MUST be logged with a structured format, including the invoking agent, input parameters, timestamp, execution duration, and success/failure status.
5.  **Permission Enforcement**: Before execution, every tool MUST verify that the calling agent (and by extension, the user) has the necessary permissions to perform the action. This is done by inspecting the agent's context, which contains the user's role and permissions.
6.  **Graceful Error Handling**: Tools should never crash the agent. They must catch exceptions and return a structured error message to the agent, allowing it to reason about the failure and potentially retry or change its approach.

#### 1.2. Tool Implementation Example (Python with LangChain & Pydantic)

This example shows a tool for creating an incident report. It demonstrates all the core design principles.

```python
# In a file like /tools/incident_tools.py

from langchain_core.tools import tool
from pydantic import BaseModel, Field
from typing import List, Literal

# Local modules for logging, permissions, and API calls
from ..utils.auditing import log_tool_call
from ..utils.security import check_permission
from ..services.api_client import harmony_api

# 1. Strictly Schematized Input using Pydantic
class CreateIncidentInput(BaseModel):
    """Input schema for the create_incident_report tool."""
    resident_id: str = Field(description="The unique ID of the resident involved.")
    incident_type: Literal["fall", "medication_error", "behavioral", "injury"] = Field(description="The category of the incident.")
    description: str = Field(description="A detailed narrative of the incident.")
    witness_ids: List[str] = Field(description="A list of staff member IDs who witnessed the event.")

# 2. The Tool Definition using @tool decorator
@tool("create_incident_report", args_schema=CreateIncidentInput)
def create_incident_report(resident_id: str, incident_type: str, description: str, witness_ids: List[str]) -> dict:
    """Creates a new incident report in the system. Requires 'create:incident' permission."""
    
    # 3. Comprehensive Logging
    log_tool_call(
        tool_name="create_incident_report", 
        agent_id=agent_context.get("agent_id"), 
        user_id=agent_context.get("user_id"),
        params={"resident_id": resident_id, "incident_type": incident_type}
    )

    # 4. Permission Enforcement
    if not check_permission(agent_context, "create:incident"):
        return {"status": "error", "message": "Permission denied. You do not have the required 'create:incident' permission."}

    # 5. Graceful Error Handling
    try:
        # 6. Atomic Operation (calling the backend CRUD service)
        response = harmony_api.post("/incidents", json={
            "residentId": resident_id,
            "type": incident_type,
            "description": description,
            "witnessIds": witness_ids
        })
        
        response.raise_for_status() # Raises an exception for 4xx/5xx responses
        
        return {"status": "success", "incident_id": response.json().get("id")}

    except Exception as e:
        # Log the detailed error
        log_error(f"Tool 'create_incident_report' failed: {e}")
        # Return a structured error to the agent
        return {"status": "error", "message": f"Failed to create incident report. API Error: {e}"}

```

### 2. The Concierge: Master Orchestrator

The Concierge is the central nervous system of the agentic layer. It receives all complex requests and intelligently routes them to the appropriate agent or system. Its primary goal is to abstract the complexity of the underlying agent ecosystem from the rest of the application.

**Core Framework**: LangGraph (for its stateful, graph-based orchestration capabilities).

#### 2.1. Concierge Workflow (LangGraph Implementation)

The Concierge operates as a state machine, or a graph, where each node represents a step in the reasoning process.

```mermaid
graph TD
    A[Start: Receive User Query] --> B{Classify Intent};
    B -- "Intent: Risk Analysis" --> C[Route to Sentinel Agent];
    B -- "Intent: Incident Summary" --> D[Route to Advocate Agent];
    B -- "Intent: Compliance Question" --> E[Route to Guardian Agent (Foundry)];
    B -- "Intent: Unclear/Complex" --> F{Decompose & Clarify};
    F -- "Clarified Sub-Task 1" --> G[Route to Sub-Agent];
    F -- "Clarified Sub-Task 2" --> H[Route to Sub-Agent];
    C --> I{Aggregate Results};
    D --> I;
    E --> I;
    G --> I;
    H --> I;
    I --> J[Format Final Response];
    J --> K[End: Return Response];
```

**Node Descriptions**:

1.  **`Classify Intent`**: This node uses a fast and cheap LLM (like Claude 3 Sonnet or a fine-tuned model) to categorize the user's query into a predefined list of intents (e.g., `risk_analysis`, `compliance_query`, `schedule_optimization`).

2.  **`Route to Agent`**: Based on the intent, this conditional edge directs the workflow to the appropriate agent's graph. For example, a `compliance_query` is routed to the `Guardian` agent, which will be hosted on Azure Foundry for maximum reliability.

3.  **`Decompose & Clarify`**: If the intent is ambiguous or requires multiple steps, this node uses a more powerful LLM (like Claude 3 Opus) to break the problem down into smaller, actionable sub-tasks. It can also enter a human-in-the-loop state to ask the user for clarification.

4.  **`Aggregate Results`**: This node collects the outputs from all the invoked agents. It is responsible for synthesizing the information into a coherent draft.

5.  **`Format Final Response`**: The final node takes the synthesized draft and formats it into the required output format (e.g., JSON for the UI, a formatted text summary).

#### 2.2. State Management

The state of the LangGraph workflow is critical. It's a dictionary that is passed between nodes and updated at each step. A typical state object would look like this:

```json
{
  "user_query": "Which residents missed their medication this morning and have a history of falls?",
  "intent": "cross_domain_risk_analysis",
  "sub_tasks": [
    {"agent": "Medic", "query": "List residents who missed morning medication"},
    {"agent": "Sentinel", "query": "List residents with high fall risk"}
  ],
  "agent_outputs": {
    "Medic": ["resident_123", "resident_456"],
    "Sentinel": ["resident_456", "resident_789"]
  },
  "synthesis": "Resident 456 missed their morning medication and has a high fall risk.",
  "final_response": {"resident_id": "resident_456", "risk_factor": "medication_miss_and_fall_history"},
  "error_log": []
}
```

This state will be persisted (e.g., in Cosmos DB) to allow for long-running, asynchronous executions and full auditability.

#### 2.3. Human-in-the-Loop Integration

LangGraph's `interrupt` mechanism will be used to pause the workflow and wait for human approval. This is critical for any agent-proposed action that modifies data.

**Workflow**:
1.  An agent uses a tool to propose a change (e.g., `propose_care_plan_update`).
2.  The tool call returns a `pending_approval` status.
3.  The LangGraph workflow enters an `interrupt` state, saving its current state and awaiting external input.
4.  The UI displays the proposed change to a qualified user (e.g., a nurse).
5.  The user clicks "Approve" or "Reject".
6.  An API call is made to resume the LangGraph workflow, passing in the user's decision.
7.  The graph continues execution based on the approval status.
