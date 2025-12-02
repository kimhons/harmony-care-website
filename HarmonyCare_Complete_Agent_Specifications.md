# HarmonyCare AI: Complete Agent Specifications
## All 20 Agents with Detailed Tools, Workflows & Success Metrics

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0  
**Document Type:** Technical Specification

---

## Executive Summary

This document provides comprehensive specifications for all 20 HarmonyCare AI agents, detailing their responsibilities, required tools, workflows, input/output schemas, success metrics, and integration points with the CRUD system. Each agent is designed to address specific operational challenges in residential care facilities while maintaining clear boundaries between deterministic CRUD operations and probabilistic AI reasoning.

The agents are organized into four categories based on their primary function, with framework assignments optimized for their specific requirements and criticality.

---

## Table of Contents

### Clinical Agents (5)
1. [Guardian (Compliance & Audit)](#1-guardian-compliance--audit-agent)
2. [Sentinel (Predictive Health)](#2-sentinel-predictive-health-agent)
3. [Vanguard (Medication Safety)](#3-vanguard-medication-safety-agent)
4. [DocuBot (Clinical Documentation)](#4-docubot-clinical-documentation-agent)
5. [Compass (Care Planning)](#5-compass-care-planning-agent)

### Operational Agents (5)
6. [Nexus (Scheduling & Staffing)](#6-nexus-scheduling--staffing-agent)
7. [HR Manager (Human Resources)](#7-hr-manager-human-resources-agent)
8. [Maintenance Coordinator (Facilities)](#8-maintenance-coordinator-facilities-agent)
9. [Nutrition Specialist (Dietary)](#9-nutrition-specialist-dietary-agent)
10. [Transportation Manager (Logistics)](#10-transportation-manager-logistics-agent)

### Engagement Agents (5)
11. [Connect (Family & Resident Portal)](#11-connect-family--resident-portal-agent)
12. [Pulse (Staff Engagement)](#12-pulse-staff-engagement-agent)
13. [Advocate (Quality Improvement)](#13-advocate-quality-improvement-agent)
14. [Catalyst (Admissions & CRM)](#14-catalyst-admissions--crm-agent)
15. [Executive Assistant (Admin & Leadership)](#15-executive-assistant-admin--leadership-agent)

### Support Agents (5)
16. [Activities Coordinator (Enrichment)](#16-activities-coordinator-enrichment-agent)
17. [Housekeeping Manager (Cleanliness)](#17-housekeeping-manager-cleanliness-agent)
18. [Laundry Manager (Linen Services)](#18-laundry-manager-linen-services-agent)
19. [Receptionist (Front Desk)](#19-receptionist-front-desk-agent)
20. [Chef (Food Service)](#20-chef-food-service-agent)

---

## Framework Assignment Matrix

| Agent | Framework | Phase | Rationale |
|-------|-----------|-------|-----------|
| Guardian | LangGraph → Azure Foundry | 1 → 3 | Critical compliance function requires enterprise reliability |
| Sentinel | LangGraph → Azure Foundry | 1 → 3 | High-stakes clinical decision support |
| Vanguard | LangGraph → Azure Foundry | 2 → 3 | Life-impacting medication safety |
| DocuBot | LangGraph | 1 | Stateful workflow from transcription to finalization |
| Compass | LangGraph | 2 | Collaborative, multi-step care planning |
| Nexus | LangGraph | 1 | Complex constraint-based scheduling |
| HR Manager | LangGraph | 2 | Long-running employee lifecycle processes |
| Maintenance Coordinator | LangGraph | 2 | Work order lifecycle management |
| Nutrition Specialist | LangGraph | 3 | Multi-constraint menu planning |
| Transportation Manager | LangGraph | 3 | Route optimization and logistics |
| Connect | LangGraph | 2 | Stateful family conversations |
| Pulse | LangGraph | 3 | Confidential sentiment tracking |
| Advocate | CrewAI | 2 | Multi-agent collaborative investigation |
| Catalyst | LangGraph | 3 | Long-running sales funnel |
| Executive Assistant | LangGraph | 3 | Data synthesis and reporting |
| Activities Coordinator | LangGraph | 3 | Event planning and feedback |
| Housekeeping Manager | LangGraph | 3 | Schedule and quality control |
| Laundry Manager | LangGraph | 3 | Batch tracking workflow |
| Receptionist | LangGraph | 3 | Conversational routing |
| Chef | LangGraph | 3 | Multi-step food preparation |

---

## Agent Specifications

### Clinical Agents

## 1. Guardian (Compliance & Audit Agent)

**Purpose:** Ensure continuous compliance with federal, state, and local regulations, and automate audit preparation.

**Framework:** LangGraph (Phase 1) → Azure Foundry (Phase 3)

**Key Responsibilities:**
- Monitor facility documentation against regulatory knowledge base
- Identify compliance gaps proactively
- Automate audit document collection
- Track staff training and certifications
- Generate compliance reports

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `search_regulations` | `{query: string}` | `{results: List[RegulationSnippet]}` | `GET /regulations/search` |
| `scan_documentation` | `{doc_type: string, date_range: DateRange}` | `{findings: List[ComplianceFinding]}` | `GET /documents/scan` |
| `generate_audit_report` | `{audit_type: string, findings: List}` | `{report_url: string}` | `POST /reports/audit` |
| `check_staff_certification` | `{staff_id: string, cert_name: string}` | `{is_valid: boolean, expiry: date}` | `GET /staff/{id}/certifications` |
| `schedule_remediation_task` | `{assignee_id, description, due_date}` | `{task_id: string}` | `POST /tasks/remediation` |

**Example Workflow:**

The Guardian agent conducts a mock audit by first searching the regulatory knowledge base for the state inspection checklist. For each checklist item, it scans relevant documentation using the `scan_documentation` tool, which queries the CRUD API for incident reports, MARs, and care plans. When a gap is identified (such as a missing signature), it logs the finding and creates a remediation task through the `schedule_remediation_task` tool. Finally, it compiles all findings into a comprehensive audit report using `generate_audit_report`, which stores the report in the document management system and returns a URL for review.

**Success Metrics:**
- **Primary:** 100% pass rate on external regulatory audits
- **Secondary:** 90% reduction in audit preparation time
- **Tertiary:** 75% reduction in compliance-related fines

**Integration Points:**
- Document Management System (read access)
- Staff Management System (certification tracking)
- Task Management System (remediation assignment)
- Reporting System (audit report generation)

---

## 2. Sentinel (Predictive Health Agent)

**Purpose:** Proactively identify residents at risk of health crises through data analysis and predictive modeling.

**Framework:** LangGraph (Phase 1) → Azure Foundry (Phase 3)

**Key Responsibilities:**
- Analyze vital signs, ADLs, and behavioral trends
- Cross-reference medication changes with health data
- Generate risk scores for specific conditions
- Create actionable clinical alerts
- Suggest preventative interventions

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_resident_vitals_trend` | `{resident_id: string, time_period: string}` | `{vitals_data: TimeSeriesData}` | `GET /residents/{id}/vitals` |
| `get_resident_adl_logs` | `{resident_id: string, time_period: string}` | `{adl_logs: List[ADLLog]}` | `GET /residents/{id}/adl-logs` |
| `get_medication_history` | `{resident_id: string}` | `{medications: List[MedicationRecord]}` | `GET /residents/{id}/medications` |
| `analyze_risk_factors` | `{vitals_data, adl_logs, medications}` | `{risk_scores: Dict[string, float]}` | `POST /analytics/risk-assessment` |
| `create_clinical_alert` | `{resident_id, risk_type, evidence}` | `{alert_id: string}` | `POST /alerts/clinical` |

**Example Workflow:**

Sentinel runs nightly for all residents, retrieving 14 days of vital signs, ADL logs, and medication history for each resident. When it detects a concerning pattern—such as increased blood pressure, a new psychoactive medication, and decreased mobility—it passes this combined data to the `analyze_risk_factors` tool, which runs a predictive model. If the model returns a high fall risk score (e.g., 0.85), Sentinel creates a clinical alert through the `create_clinical_alert` tool, which appears on the nursing dashboard with supporting evidence, prompting immediate preventative action.

**Success Metrics:**
- **Primary:** 30% reduction in preventable hospitalizations
- **Secondary:** 50% reduction in resident falls with injury
- **Tertiary:** 95% of high-risk alerts deemed clinically relevant

**Integration Points:**
- Vitals Monitoring System (real-time data feed)
- ADL Tracking System (activity logs)
- e-MAR System (medication data)
- Clinical Alert System (notification delivery)
- Predictive Analytics Engine (risk modeling)

---

## 3. Vanguard (Medication Safety Agent)

**Purpose:** Prevent medication errors through intelligent safety checks during ordering, transcription, and administration.

**Framework:** LangGraph (Phase 2) → Azure Foundry (Phase 3)

**Key Responsibilities:**
- Verify medication orders against allergies and interactions
- Flag ambiguous or incorrect orders
- Automate e-MAR transcription
- Provide real-time administration decision support
- Track medication error trends

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `check_drug_interactions` | `{resident_id: string, new_drug: string}` | `{interactions: List[InteractionWarning]}` | `POST /medications/check-interactions` |
| `verify_resident_allergies` | `{resident_id: string, new_drug: string}` | `{is_allergic: boolean}` | `GET /residents/{id}/allergies/check` |
| `validate_dosage` | `{drug, dosage, resident_profile}` | `{is_safe: boolean, recommendation}` | `POST /medications/validate-dosage` |
| `create_mar_entry` | `{resident_id, drug, dosage, frequency, route}` | `{mar_entry_id: string}` | `POST /mar/entries` |
| `get_resident_profile` | `{resident_id: string}` | `{profile: dict}` | `GET /residents/{id}/profile` |

**Example Workflow:**

When a new medication order is entered, Vanguard immediately verifies it against the resident's allergy list using `verify_resident_allergies`. It then checks for drug interactions with current medications via `check_drug_interactions`. If a moderate interaction is detected, Vanguard retrieves the resident's profile and validates the dosage using `validate_dosage`. The agent flags the interaction and requires pharmacist override. Once approved, it automatically creates the e-MAR entry through `create_mar_entry`, ensuring the medication is properly documented with visible warnings about the interaction.

**Success Metrics:**
- **Primary:** 90% reduction in medication administration errors
- **Secondary:** 100% of new orders checked for interactions/allergies
- **Tertiary:** 50% reduction in manual MAR transcription time

**Integration Points:**
- e-MAR System (medication records)
- Pharmacy System (drug database)
- Resident Health Records (allergies, conditions)
- Clinical Decision Support System (dosage validation)

---

## 4. DocuBot (Clinical Documentation Agent)

**Purpose:** Streamline clinical documentation by converting unstructured inputs into compliant, structured notes.

**Framework:** LangGraph (Phase 1)

**Key Responsibilities:**
- Transcribe spoken clinical notes
- Extract clinical entities from text
- Format notes into structured formats (SOAP)
- Suggest billing codes
- Ensure documentation compliance

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `transcribe_audio` | `{audio_file_url: string}` | `{transcription: string}` | `POST /transcription/audio` |
| `extract_clinical_entities` | `{text: string}` | `{entities: Dict}` | `POST /nlp/extract-entities` |
| `format_soap_note` | `{entities: Dict}` | `{soap_note: string}` | `POST /notes/format-soap` |
| `suggest_billing_codes` | `{note_text: string}` | `{codes: List[string]}` | `POST /billing/suggest-codes` |
| `save_progress_note` | `{resident_id, note}` | `{note_id: string}` | `POST /residents/{id}/notes` |

**Example Workflow:**

A nurse records a voice note about a resident's condition. DocuBot receives the audio file and calls `transcribe_audio` to convert it to text. It then passes the raw text to `extract_clinical_entities`, which identifies key clinical information (symptoms, vitals, interventions). This structured data is formatted into a SOAP note using `format_soap_note`. The agent then suggests relevant billing codes via `suggest_billing_codes`. The formatted note and codes are displayed to the nurse for review. Upon approval, DocuBot saves the note to the resident's chart using `save_progress_note`.

**Success Metrics:**
- **Primary:** 70% reduction in documentation time
- **Secondary:** 98% accuracy in entity extraction
- **Tertiary:** Improved billing accuracy through better code suggestions

**Integration Points:**
- Speech-to-Text Service (transcription)
- NLP Engine (entity extraction)
- EHR System (note storage)
- Billing System (code suggestions)

---

## 5. Compass (Care Planning Agent)

**Purpose:** Assist in creating, reviewing, and updating personalized, goal-oriented resident care plans.

**Framework:** LangGraph (Phase 2)

**Key Responsibilities:**
- Synthesize assessment data into care plans
- Suggest SMART goals
- Monitor progress towards goals
- Ensure timely care plan updates
- Facilitate interdisciplinary team reviews

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_resident_assessments` | `{resident_id: string}` | `{assessments: List[Assessment]}` | `GET /residents/{id}/assessments` |
| `summarize_progress_notes` | `{resident_id, date_range}` | `{summary: string}` | `GET /residents/{id}/notes/summary` |
| `generate_smart_goals` | `{assessment_findings: dict}` | `{goals: List[SMARTGoal]}` | `POST /care-plans/generate-goals` |
| `draft_care_plan` | `{resident_id, goals}` | `{draft_plan: CarePlan}` | `POST /care-plans/draft` |
| `track_goal_progress` | `{goal_id: string}` | `{progress_status, evidence}` | `GET /care-plans/goals/{id}/progress` |

**Example Workflow:**

During a quarterly care plan review, Compass retrieves all resident assessments and summarizes progress notes from the past 90 days. It tracks progress on existing goals using `track_goal_progress`. The agent synthesizes this information into a summary for the interdisciplinary team meeting. When the team identifies a new focus area (e.g., social engagement), Compass generates SMART goals using `generate_smart_goals` and presents a suggested goal: "Resident will attend at least 3 group activities per week for the next 90 days." Upon team approval, it creates the updated care plan using `draft_care_plan`.

**Success Metrics:**
- **Primary:** 50% reduction in care plan documentation time
- **Secondary:** 90% of care plans updated on schedule
- **Tertiary:** Measurable improvement in resident outcomes

**Integration Points:**
- Assessment System (MDS, fall risk, etc.)
- Progress Notes System (clinical documentation)
- Care Plan Management System (plan storage)
- Goal Tracking System (outcome measurement)

---

### Operational Agents

## 6. Nexus (Scheduling & Staffing Agent)

**Purpose:** Optimize staff scheduling to ensure compliance, meet care needs, and minimize labor costs.

**Framework:** LangGraph (Phase 1)

**Key Responsibilities:**
- Generate compliant staff schedules
- Optimize to minimize overtime
- Manage shift swaps and time-off
- Identify scheduling gaps
- Notify staff of schedule changes

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_staff_availability` | `{date_range: DateRange}` | `{availability_data: List[StaffAvailability]}` | `GET /staff/availability` |
| `get_staffing_requirements` | `{date: date}` | `{requirements: Dict[shift, StaffingNeeds]}` | `GET /staffing/requirements` |
| `optimize_schedule` | `{requirements, availability}` | `{draft_schedule: Schedule}` | `POST /scheduling/optimize` |
| `publish_schedule` | `{schedule: Schedule}` | `{status: string}` | `POST /scheduling/publish` |
| `process_shift_swap_request` | `{requester_id, target_id, shift_date}` | `{is_approved, reason}` | `POST /scheduling/shift-swap` |

**Example Workflow:**

Every Tuesday, Nexus automatically generates the following week's schedule. It first calls `get_staffing_requirements` to determine required staff levels based on resident census and acuity. It then retrieves staff availability and preferences via `get_staff_availability`. The optimization engine (`optimize_schedule`) creates a draft schedule that minimizes overtime while respecting preferences. When an overnight shift remains uncovered, Nexus identifies qualified staff and offers a bonus for picking up the shift. Once complete, it publishes the schedule using `publish_schedule`, and all staff receive notifications.

**Success Metrics:**
- **Primary:** 95% of shifts filled without agency staff
- **Secondary:** 50% reduction in scheduling time
- **Tertiary:** 100% compliance with staff-to-resident ratios

**Integration Points:**
- Staff Management System (availability, certifications)
- Resident Census System (acuity data)
- Scheduling System (schedule storage)
- Notification System (staff alerts)

---

## 7. HR Manager (Human Resources Agent)

**Purpose:** Automate HR tasks from recruitment to offboarding, ensuring smooth employee lifecycle management.

**Framework:** LangGraph (Phase 2)

**Key Responsibilities:**
- Screen job applications
- Schedule interviews
- Automate onboarding process
- Track performance reviews
- Manage offboarding

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `screen_applications` | `{job_id: string}` | `{shortlisted_candidates: List[Candidate]}` | `GET /recruitment/applications/{job_id}` |
| `schedule_interview` | `{candidate_id, interviewer_ids}` | `{interview_slot: Datetime}` | `POST /recruitment/interviews` |
| `initiate_onboarding` | `{candidate_id: string}` | `{onboarding_id: string}` | `POST /hr/onboarding` |
| `track_performance_review` | `{employee_id: string}` | `{status, due_date}` | `GET /hr/performance-reviews/{id}` |
| `generate_offboarding_checklist` | `{employee_id: string}` | `{checklist: List[Task]}` | `POST /hr/offboarding/{id}/checklist` |

**Example Workflow:**

When a new application is received for a Registered Nurse position, HR Manager screens it against minimum qualifications using `screen_applications`. If the candidate meets requirements, it schedules an interview via `schedule_interview`, finding mutually available times. After a successful interview, the hiring manager provides positive feedback. HR Manager then initiates onboarding through `initiate_onboarding`, which sends the offer letter, triggers background checks, and assigns pre-start tasks like completing HR paperwork and benefits enrollment.

**Success Metrics:**
- **Primary:** 40% reduction in time-to-hire
- **Secondary:** 90% of onboarding tasks completed before first day
- **Tertiary:** Improved employee satisfaction with HR processes

**Integration Points:**
- Applicant Tracking System (applications, candidates)
- Calendar System (interview scheduling)
- Onboarding System (new hire workflow)
- Performance Management System (review tracking)

---

## 8. Maintenance Coordinator (Facilities Agent)

**Purpose:** Manage facility assets through preventative maintenance and responsive work order management.

**Framework:** LangGraph (Phase 2)

**Key Responsibilities:**
- Manage preventative maintenance schedules
- Process and assign work orders
- Monitor work order status
- Order parts and supplies
- Predict equipment failures

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_pm_schedule` | `{asset_id: string}` | `{pm_tasks: List[PMTask]}` | `GET /maintenance/pm-schedule` |
| `create_work_order` | `{description, location, priority}` | `{work_order_id: string}` | `POST /maintenance/work-orders` |
| `assign_work_order` | `{work_order_id, technician_id}` | `{status: string}` | `PATCH /maintenance/work-orders/{id}/assign` |
| `order_parts` | `{part_number, quantity}` | `{order_id, eta}` | `POST /maintenance/parts/order` |
| `analyze_asset_history` | `{asset_id: string}` | `{failure_prediction: string}` | `GET /maintenance/assets/{id}/analysis` |

**Example Workflow:**

When a staff member reports a leaky faucet in Room 204, Maintenance Coordinator creates a work order using `create_work_order` with medium priority. It assigns the work order to the on-duty technician via `assign_work_order`. The technician inspects the faucet and identifies a needed washer. The agent receives this update and orders the part through `order_parts`. When the part arrives, it notifies the technician, who completes the repair. The work order is closed, and the reporting staff member is notified of resolution.

**Success Metrics:**
- **Primary:** 95% of PM tasks completed on time
- **Secondary:** 30% reduction in emergency repairs
- **Tertiary:** Improved resident satisfaction with facility upkeep

**Integration Points:**
- Asset Management System (equipment tracking)
- Work Order System (request management)
- Inventory System (parts ordering)
- Vendor Management System (supplier integration)

---

## 9. Nutrition Specialist (Dietary Agent)

**Purpose:** Plan nutritious, appealing menus that accommodate diverse dietary needs and preferences.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Generate weekly menu plans
- Manage dietary restrictions database
- Create personalized meal plans
- Generate shopping lists
- Analyze meal feedback

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_resident_dietary_needs` | `{resident_ids: List[string]}` | `{dietary_profiles: List[Profile]}` | `GET /residents/dietary-needs` |
| `generate_menu_plan` | `{nutritional_targets, budget}` | `{menu_plan: Menu}` | `POST /nutrition/menu-plans` |
| `validate_menu_against_diets` | `{menu_plan, dietary_profiles}` | `{conflicts: List[Conflict]}` | `POST /nutrition/validate-menu` |
| `create_shopping_list` | `{menu_plan: Menu}` | `{shopping_list: List[Item]}` | `POST /nutrition/shopping-lists` |
| `get_meal_feedback` | `{date_range: DateRange}` | `{feedback_data: List[Feedback]}` | `GET /nutrition/feedback` |

**Example Workflow:**

Every Wednesday, Nutrition Specialist generates next week's menu. It retrieves dietary needs for all residents using `get_resident_dietary_needs`, then creates a draft menu with `generate_menu_plan` based on nutritional targets and budget. The draft is validated against all dietary restrictions via `validate_menu_against_diets`. When a conflict is detected (e.g., Friday's fish dish contains nuts, and 3 residents have nut allergies), the agent finds a nut-free alternative and re-validates. Once compliant, it generates a shopping list using `create_shopping_list` for the kitchen.

**Success Metrics:**
- **Primary:** 100% compliance with dietary restrictions
- **Secondary:** 15% reduction in food waste
- **Tertiary:** 20% improvement in food satisfaction scores

**Integration Points:**
- Resident Health Records (dietary restrictions)
- Menu Planning System (recipe database)
- Inventory System (food stock)
- Feedback System (meal ratings)

---

## 10. Transportation Manager (Logistics Agent)

**Purpose:** Manage transportation services to ensure safe, efficient resident travel to appointments and activities.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Manage transportation requests
- Optimize daily routes
- Schedule drivers and vehicles
- Monitor vehicle maintenance
- Communicate schedules and delays

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_transport_requests` | `{date: date}` | `{requests: List[TransportRequest]}` | `GET /transportation/requests` |
| `optimize_routes` | `{requests, vehicle_capacity}` | `{routes: List[Route]}` | `POST /transportation/optimize-routes` |
| `assign_driver_and_vehicle` | `{route: Route}` | `{assignment_id: string}` | `POST /transportation/assignments` |
| `get_vehicle_maintenance_status` | `{vehicle_id: string}` | `{status: string}` | `GET /transportation/vehicles/{id}/maintenance` |
| `notify_resident_of_pickup` | `{resident_id, pickup_time}` | `{status: string}` | `POST /notifications/pickup` |

**Example Workflow:**

Daily at 5 PM, Transportation Manager retrieves the next day's transportation requests using `get_transport_requests`. It groups requests by geographic area and vehicle type, then optimizes routes via `optimize_routes`. The tool returns two efficient routes—one for the wheelchair-accessible van and one for the sedan. The agent assigns drivers and vehicles using `assign_driver_and_vehicle`, then notifies each resident of their pickup time through `notify_resident_of_pickup`. Drivers receive their complete route and schedule.

**Success Metrics:**
- **Primary:** 25% reduction in vehicle mileage and fuel costs
- **Secondary:** 98% fulfillment of transportation requests
- **Tertiary:** Improved resident satisfaction with transport reliability

**Integration Points:**
- Appointment System (medical appointments)
- Vehicle Management System (fleet tracking)
- Route Optimization Engine (logistics)
- Notification System (resident alerts)

---

### Engagement Agents

## 11. Connect (Family & Resident Portal Agent)

**Purpose:** Foster communication between facility, residents, and families through timely updates and easy interaction.

**Framework:** LangGraph (Phase 2)

**Key Responsibilities:**
- Provide non-clinical resident updates
- Facilitate visit and call scheduling
- Answer common family questions
- Enable resident-to-family messaging
- Broadcast facility announcements

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_resident_activity_log` | `{resident_id, date_range}` | `{activities: List[ActivityLog]}` | `GET /residents/{id}/activities` |
| `schedule_family_visit` | `{resident_id, family_member_id, requested_time}` | `{visit_id, confirmed_time}` | `POST /visits/schedule` |
| `get_facility_faq` | `{query: string}` | `{answer: string}` | `GET /facility/faq` |
| `send_family_message` | `{resident_id, message_content, image_url}` | `{message_id: string}` | `POST /messages/family` |
| `broadcast_announcement` | `{audience, message}` | `{status: string}` | `POST /announcements/broadcast` |

**Example Workflow:**

A family member logs into the portal and asks, "How has Mom been doing this week?" Connect identifies the linked resident and retrieves the activity log using `get_resident_activity_log`. It synthesizes a friendly summary: "Your mom has had a great week! She participated in Tuesday's painting class and seemed to really enjoy the live music event on Thursday." It then proactively offers to schedule a video call. When the family member agrees, Connect calls `schedule_family_visit` to arrange the call, strengthening family connection.

**Success Metrics:**
- **Primary:** 40% increase in family engagement scores
- **Secondary:** 30% reduction in routine phone calls to nursing station
- **Tertiary:** 95% satisfaction with communication portal

**Integration Points:**
- Activity Management System (participation logs)
- Calendar System (visit scheduling)
- Messaging System (family communication)
- Knowledge Base (FAQ system)

---

## 12. Pulse (Staff Engagement Agent)

**Purpose:** Improve staff morale and reduce turnover through sentiment monitoring and recognition.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Conduct confidential pulse surveys
- Analyze staff sentiment trends
- Facilitate peer recognition
- Provide HR resource access
- Alert leadership to negative trends

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `send_pulse_survey` | `{staff_id: string}` | `{survey_id: string}` | `POST /staff/pulse-surveys` |
| `analyze_sentiment` | `{text: string}` | `{sentiment_score: float}` | `POST /analytics/sentiment` |
| `create_peer_recognition` | `{recognizer_id, recognized_id, reason}` | `{recognition_id: string}` | `POST /staff/recognition` |
| `get_hr_resource` | `{query: string}` | `{resource_content: string}` | `GET /hr/resources` |
| `generate_sentiment_report` | `{team_id, date_range}` | `{report_url: string}` | `POST /reports/sentiment` |

**Example Workflow:**

Every Friday, Pulse initiates a confidential check-in with staff members. When a staff member reports a tough week due to short staffing, Pulse analyzes the sentiment using `analyze_sentiment`, which returns a negative score. The agent acknowledges the difficulty and logs the feedback anonymously for leadership review. It then asks if anyone helped them through the week. When the staff member gives a shout-out to a colleague, Pulse creates a peer recognition using `create_peer_recognition`, which is shared on the facility's digital bulletin board.

**Success Metrics:**
- **Primary:** 20% reduction in annual staff turnover
- **Secondary:** 15% improvement in employee engagement scores
- **Tertiary:** 90% participation in weekly pulse surveys

**Integration Points:**
- Survey System (pulse check delivery)
- Sentiment Analysis Engine (NLP)
- Recognition System (peer appreciation)
- HR Knowledge Base (resource access)

---

## 13. Advocate (Quality Improvement Agent)

**Purpose:** Drive quality improvement through incident investigation and corrective action planning.

**Framework:** CrewAI (Phase 2) - Multi-agent collaboration

**Key Responsibilities:**
- Orchestrate incident investigations
- Coordinate specialized sub-agents
- Identify root causes
- Generate corrective action plans
- Track CAP implementation

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_incident_details` | `{incident_id: string}` | `{incident_data: Incident}` | `GET /incidents/{id}` |
| `review_care_plan_history` | `{resident_id: string}` | `{care_plan_history: List[CarePlan]}` | `GET /residents/{id}/care-plans/history` |
| `analyze_staffing_data` | `{datetime: Datetime}` | `{staffing_data: dict}` | `GET /staffing/analysis` |
| `check_protocol_compliance` | `{protocol_name, incident_data}` | `{was_compliant, deviations}` | `POST /compliance/check-protocol` |
| `generate_cap_draft` | `{root_cause, incident_id}` | `{cap_draft: CAP}` | `POST /quality/cap/draft` |

**Example Workflow:**

When a resident fall is reported, the Concierge routes the investigation to Advocate. Using CrewAI, Advocate spawns three specialized sub-agents: a Clinical Analyst reviews the resident's medical context, an Operational Analyst examines staffing and protocol compliance, and a Historical Analyst looks for trends. Each sub-agent uses the Tool Layer to query CRUD services. Advocate synthesizes their findings, identifying that the fall occurred during a shift change with a new medication causing dizziness. It generates a draft CAP that includes medication review and revised handover protocols.

**Success Metrics:**
- **Primary:** 40% reduction in incident recurrence
- **Secondary:** 50% reduction in root cause analysis time
- **Tertiary:** 90% of CAPs implemented on schedule

**Integration Points:**
- Incident Management System (incident reports)
- Care Planning System (resident care plans)
- Staffing System (shift data)
- Quality Management System (CAP tracking)

---

## 14. Catalyst (Admissions & CRM Agent)

**Purpose:** Streamline admissions and manage prospective resident relationships from inquiry to move-in.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Engage with website leads
- Schedule facility tours
- Nurture leads with follow-ups
- Guide admissions paperwork
- Manage CRM funnel

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `create_lead` | `{name, email, phone, inquiry}` | `{lead_id: string}` | `POST /crm/leads` |
| `schedule_facility_tour` | `{lead_id, requested_time}` | `{tour_id: string}` | `POST /crm/tours` |
| `send_follow_up_email` | `{lead_id, template_name}` | `{status: string}` | `POST /crm/follow-ups` |
| `get_admissions_checklist` | `{lead_id: string}` | `{checklist: List[DocumentStatus]}` | `GET /admissions/checklist/{lead_id}` |
| `update_lead_stage` | `{lead_id, new_stage}` | `{status: string}` | `PATCH /crm/leads/{id}/stage` |

**Example Workflow:**

When a family member submits the website contact form, Catalyst creates a lead in the CRM using `create_lead`. It immediately sends an introductory email asking about their needs. Based on the response, it suggests a tour of the memory care unit and schedules it via `schedule_facility_tour`. After the tour, it automatically sends a thank-you email with pricing information using `send_follow_up_email`. It updates the lead stage to "Tour Completed" via `update_lead_stage`, giving the admissions director clear visibility into the prospect's journey.

**Success Metrics:**
- **Primary:** 15% increase in lead-to-admission conversion
- **Secondary:** 50% reduction in manual follow-up work
- **Tertiary:** 90% of leads contacted within 5 minutes

**Integration Points:**
- CRM System (lead management)
- Calendar System (tour scheduling)
- Email Marketing System (automated follow-ups)
- Document Management System (admissions paperwork)

---

## 15. Executive Assistant (Admin & Leadership Agent)

**Purpose:** Provide administrative support and data-driven insights to facility leadership.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Generate operational reports
- Summarize agent findings
- Manage leadership calendar
- Answer ad-hoc data questions
- Draft internal communications

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `generate_operational_report` | `{report_type, date_range}` | `{report_url: string}` | `POST /reports/operational` |
| `summarize_agent_findings` | `{date_range: DateRange}` | `{summary: string}` | `GET /agents/findings/summary` |
| `schedule_leadership_meeting` | `{attendees, topic}` | `{meeting_id: string}` | `POST /calendar/meetings` |
| `query_platform_data` | `{query: string}` | `{answer, data_source}` | `POST /analytics/query` |
| `draft_internal_memo` | `{topic, key_points}` | `{draft_memo: string}` | `POST /communications/draft-memo` |

**Example Workflow:**

Every morning at 7 AM, Executive Assistant generates the daily operational report, pulling census, labor costs, and incident data. It summarizes the top alerts from Sentinel and Guardian using `summarize_agent_findings`. When the Facility Director asks for the briefing, the agent provides a concise summary: "Census at 98%, labor 5% over budget due to sick calls, 1 minor fall with no injury. Top alert: Sentinel flagged resident John Doe for high infection risk—clinical team has been notified." This enables faster, more informed decision-making.

**Success Metrics:**
- **Primary:** 60% reduction in manual data gathering time
- **Secondary:** Faster decision-making with real-time insights
- **Tertiary:** Improved operational oversight for leadership

**Integration Points:**
- Reporting System (operational reports)
- All Agent Systems (finding aggregation)
- Calendar System (meeting scheduling)
- Data Warehouse (cross-platform queries)

---

### Support Agents

## 16. Activities Coordinator (Enrichment Agent)

**Purpose:** Plan and promote diverse activities that enhance resident quality of life and engagement.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Generate monthly activity calendars
- Manage event sign-ups
- Schedule entertainers and vendors
- Send activity recommendations
- Collect and analyze feedback

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_resident_interests` | `{}` | `{interests: List[InterestProfile]}` | `GET /residents/interests` |
| `create_activity_event` | `{title, description, date, time, location}` | `{event_id: string}` | `POST /activities/events` |
| `manage_event_signup` | `{event_id, resident_id}` | `{status: string}` | `POST /activities/events/{id}/signup` |
| `book_external_vendor` | `{vendor_id, date, time}` | `{booking_id: string}` | `POST /vendors/bookings` |
| `collect_activity_feedback` | `{event_id: string}` | `{status: string}` | `POST /activities/events/{id}/feedback` |

**Success Metrics:**
- **Primary:** 30% increase in resident participation
- **Secondary:** 90% resident satisfaction with activities
- **Tertiary:** 50% reduction in planning time

---

## 17. Housekeeping Manager (Cleanliness Agent)

**Purpose:** Manage housekeeping operations to ensure a clean, safe environment.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Generate cleaning schedules
- Manage supply inventory
- Conduct quality inspections
- Assign ad-hoc cleaning requests
- Optimize cleaning routes

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `generate_cleaning_schedule` | `{date_range: DateRange}` | `{schedule: CleaningSchedule}` | `POST /housekeeping/schedules` |
| `assign_cleaning_task` | `{task_id, staff_id}` | `{assignment_id: string}` | `POST /housekeeping/assignments` |
| `check_supply_inventory` | `{supply_name: string}` | `{quantity: int}` | `GET /inventory/supplies/{name}` |
| `order_cleaning_supplies` | `{items: List[OrderItem]}` | `{order_id: string}` | `POST /inventory/orders` |
| `log_qc_inspection` | `{location, checklist_results}` | `{inspection_id: string}` | `POST /housekeeping/inspections` |

**Success Metrics:**
- **Primary:** 95%+ quality control inspection scores
- **Secondary:** 100% completion of scheduled tasks
- **Tertiary:** 20% reduction in supply costs

---

## 18. Laundry Manager (Linen Services Agent)

**Purpose:** Manage laundry workflow to ensure residents always have clean linens and clothing.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Schedule laundry collection
- Track batches through workflow
- Manage linen inventory
- Match personal items to residents
- Monitor equipment maintenance

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `schedule_laundry_collection` | `{date: date}` | `{collection_schedule: Schedule}` | `POST /laundry/collection-schedule` |
| `track_laundry_batch` | `{batch_id, status}` | `{status: string}` | `PATCH /laundry/batches/{id}` |
| `check_linen_inventory` | `{item_type: string}` | `{count: int}` | `GET /inventory/linens/{type}` |
| `order_new_linens` | `{item_type, quantity}` | `{order_id: string}` | `POST /inventory/linens/order` |
| `match_personal_item` | `{item_tag_id: string}` | `{resident_id: string}` | `GET /laundry/match-item/{tag}` |

**Success Metrics:**
- **Primary:** 99.5% accuracy in returning personal items
- **Secondary:** No linen stockouts
- **Tertiary:** 24-hour turnaround time

---

## 19. Receptionist (Front Desk Agent)

**Purpose:** Manage front desk operations as the facility's first point of contact.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Manage visitor check-in/out
- Route phone calls
- Answer general inquiries
- Log package deliveries
- Monitor entrance security

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `check_in_visitor` | `{visitor_name, resident_to_visit}` | `{visitor_id: string}` | `POST /visitors/check-in` |
| `route_phone_call` | `{caller_id, requested_person}` | `{status: string}` | `POST /communications/route-call` |
| `find_staff_member` | `{staff_name: string}` | `{staff_status: string}` | `GET /staff/find/{name}` |
| `log_package_delivery` | `{recipient_name, tracking_number}` | `{package_id: string}` | `POST /packages/log` |
| `alert_security` | `{reason: string}` | `{alert_id: string}` | `POST /security/alerts` |

**Success Metrics:**
- **Primary:** 90% of visitors checked in within 2 minutes
- **Secondary:** Accurate visitor audit trail
- **Tertiary:** 50% reduction in routine call handling time

---

## 20. Chef (Food Service Agent)

**Purpose:** Assist kitchen staff in meal preparation to ensure safety, quality, and dietary compliance.

**Framework:** LangGraph (Phase 3)

**Key Responsibilities:**
- Provide recipe instructions
- Generate dietary modifications
- Manage food safety protocols
- Assist with portion control
- Coordinate meal timing

**Required Tools:**

| Tool Name | Input Schema | Output Schema | CRUD Endpoint |
|-----------|--------------|---------------|---------------|
| `get_recipe_steps` | `{menu_item_id: string}` | `{steps: List[string]}` | `GET /recipes/{id}/steps` |
| `get_dietary_modifications` | `{menu_item_id: string}` | `{modifications: List[DietMod]}` | `GET /recipes/{id}/modifications` |
| `log_food_temperature` | `{item_name, temperature}` | `{log_id: string}` | `POST /food-safety/temperature-logs` |
| `check_inventory_expiration` | `{}` | `{expired_items: List[Item]}` | `GET /inventory/food/expired` |
| `coordinate_meal_timing` | `{meal_id: string}` | `{timing_plan: dict}` | `GET /meals/{id}/timing` |

**Success Metrics:**
- **Primary:** 100% HACCP compliance
- **Secondary:** 95% accuracy in dietary modifications
- **Tertiary:** Improved meal consistency and quality

---

## Tool Layer Architecture

### Tool Design Principles

All tools follow these mandatory principles:

1. **Strict Schema Definition**: Every tool has Pydantic (Python) or Zod (TypeScript) schemas
2. **Input Validation**: Runtime validation before execution
3. **Comprehensive Logging**: Tool call, parameters, result, duration, agent ID
4. **Graceful Error Handling**: Structured error responses, never crash the agent
5. **Permission Enforcement**: RBAC checks before execution
6. **Idempotency**: Safe to retry without side effects
7. **Event Emission**: Publish domain events for audit trail

### Tool Registry Structure

```python
TOOL_REGISTRY = {
    "tool_name": {
        "function": tool_function,
        "permissions": ["read:resource", "write:resource"],
        "category": "clinical|operational|engagement|support",
        "cost_estimate": 0.001,  # USD per call
        "crud_endpoint": "GET /api/endpoint",
        "rate_limit": 100  # calls per minute
    }
}
```

### Total Tool Count

| Category | Agent Count | Avg Tools per Agent | Total Tools |
|----------|-------------|---------------------|-------------|
| Clinical | 5 | 5 | 25 |
| Operational | 5 | 5 | 25 |
| Engagement | 5 | 5 | 25 |
| Support | 5 | 5 | 25 |
| **Total** | **20** | **5** | **100** |

---

## Integration Architecture

### Agent-to-CRUD Communication Flow

```
Agent → Tool Layer → CRUD API → Microservice → Database
  ↓
Event Bus (for audit trail and downstream processing)
```

### Event-Driven Architecture

All agent actions emit domain events:

```json
{
  "event_type": "IncidentCreated",
  "agent_id": "advocate_001",
  "user_id": "user_123",
  "timestamp": "2025-11-28T10:30:00Z",
  "payload": {
    "incident_id": "inc_456",
    "resident_id": "res_789",
    "type": "fall"
  }
}
```

### Cross-Agent Communication

Agents communicate through the Concierge orchestrator:

```
User Request → Concierge → Agent A → Tool → CRUD
                    ↓
              Agent B (if needed) → Tool → CRUD
                    ↓
              Aggregate Results → User Response
```

---

## Deployment Strategy

### Phase 1 (Weeks 1-4): Foundation
- Deploy: Guardian, Sentinel, DocuBot, Nexus
- Framework: LangGraph + LangChain
- Focus: Core clinical and operational workflows

### Phase 2 (Weeks 5-8): Expansion
- Deploy: Vanguard, Compass, HR Manager, Maintenance, Connect, Advocate (CrewAI)
- Framework: Add CrewAI for multi-agent collaboration
- Focus: Advanced clinical workflows and family engagement

### Phase 3 (Weeks 9-12): Enterprise Scale
- Migrate: Guardian, Sentinel, Vanguard to Azure Foundry
- Deploy: Remaining 10 agents
- Framework: Full hybrid architecture
- Focus: Production hardening and scale

---

## Success Metrics Summary

### Clinical Impact
- 30% reduction in preventable hospitalizations
- 90% reduction in medication errors
- 70% reduction in documentation time
- 50% reduction in care plan documentation time

### Operational Efficiency
- 95% of shifts filled without agency staff
- 40% reduction in time-to-hire
- 95% PM tasks completed on time
- 25% reduction in transportation costs

### Engagement & Quality
- 40% increase in family engagement
- 20% reduction in staff turnover
- 40% reduction in incident recurrence
- 15% increase in admissions conversion

### Financial Impact
- Platform cost: $1,735/month per facility
- Revenue: $2,083/month (Professional tier)
- Gross margin: 17%
- ROI: 6-9 months

---

## Conclusion

This comprehensive specification provides a complete blueprint for implementing all 20 HarmonyCare AI agents. Each agent is designed with clear responsibilities, well-defined tools, realistic workflows, and measurable success metrics. The hybrid framework approach (LangGraph, CrewAI, Azure Foundry) ensures the right tool for each job, balancing flexibility, collaboration, and enterprise reliability.

The Tool Layer architecture maintains strict boundaries between agents and CRUD systems, ensuring security, auditability, and maintainability. The phased deployment strategy allows for incremental value delivery while managing complexity and risk.

With this specification, the two-developer team has a clear roadmap for building a production-ready, AI-native platform that transforms residential care management.
