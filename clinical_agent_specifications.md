# HarmonyCare AI: Clinical Agent Specifications

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## Table of Contents

1. [Guardian (Compliance & Audit Agent)](#1-guardian-compliance--audit-agent)
2. [Sentinel (Predictive Health Agent)](#2-sentinel-predictive-health-agent)
3. [Vanguard (Medication Safety Agent)](#3-vanguard-medication-safety-agent)
4. [DocuBot (Clinical Documentation Agent)](#4-docubot-clinical-documentation-agent)
5. [Compass (Care Planning Agent)](#5-compass-care-planning-agent)

---

## 1. Guardian (Compliance & Audit Agent)

**Purpose & Core Function:** To ensure the facility operates in continuous compliance with all federal, state, and local regulations, and to automate audit preparation and execution.

**Framework & Runtime:** LangGraph (initially), migrating to **Azure Foundry** in Phase 3 for enterprise-grade reliability, auditability, and content safety.

### Key Responsibilities

*   Continuously monitors facility documentation and practices against a knowledge base of regulations.
*   Proactively identifies potential compliance gaps and generates alerts.
*   Automates the collection and organization of documents for audits.
*   Assists in generating responses to regulatory inquiries.
*   Tracks and verifies the completion of required staff training and certifications.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `search_regulations` | Searches the internal knowledge base of federal/state regulations. | `{query: string}` | `{results: List[RegulationSnippet]}` |
| `scan_documentation` | Scans resident records and facility logs for compliance keywords. | `{doc_type: string, date_range: DateRange}` | `{findings: List[ComplianceFinding]}` |
| `generate_audit_report` | Compiles findings into a pre-formatted audit report. | `{audit_type: string, findings: List[ComplianceFinding]}` | `{report_url: string}` |
| `check_staff_certification` | Verifies the status of a staff member's required certifications. | `{staff_id: string, certification_name: string}` | `{is_valid: boolean, expiry_date: date}` |
| `schedule_remediation_task` | Creates a task in the system to address a compliance gap. | `{assignee_id: string, description: string, due_date: date}` | `{task_id: string}` |

### Example Workflow: Mock Audit

1.  **User Input:** "Run a mock audit for our upcoming state inspection."
2.  **Guardian** invokes `search_regulations` with `query="state inspection checklist"`.
3.  For each item on the checklist, **Guardian** uses `scan_documentation` to find relevant records (e.g., incident reports, MARs, care plans).
4.  If a gap is found (e.g., a missing signature on an incident report), it logs the finding.
5.  After scanning all areas, **Guardian** calls `generate_audit_report` with the collected findings.
6.  For each finding, it also calls `schedule_remediation_task` to assign a corrective action to the appropriate staff member.
7.  **Output:** A link to the mock audit report and a confirmation that remediation tasks have been assigned.

### Success Metrics

*   **Primary:** 100% pass rate on all external regulatory audits.
*   **Secondary:** 90% reduction in time spent preparing for audits.
*   **Tertiary:** 75% reduction in compliance-related fines or penalties.

---

## 2. Sentinel (Predictive Health Agent)

**Purpose & Core Function:** To proactively identify residents at risk of health crises (e.g., falls, infections, hospitalizations) by analyzing real-time and historical data.

**Framework & Runtime:** LangGraph (initially), migrating to **Azure Foundry** in Phase 3 for high-stakes clinical decision support.

### Key Responsibilities

*   Analyzes trends in vital signs, ADLs (Activities of Daily Living), and behavioral data.
*   Cross-references data with medication changes and recent incidents.
*   Uses predictive models to generate risk scores for specific conditions.
*   Generates clear, actionable alerts for clinical staff with supporting evidence.
*   Suggests preventative interventions based on identified risk factors.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_resident_vitals_trend` | Retrieves time-series data for a resident's vital signs. | `{resident_id: string, time_period: string}` | `{vitals_data: TimeSeriesData}` |
| `get_resident_adl_logs` | Fetches logs of a resident's performance in Activities of Daily Living. | `{resident_id: string, time_period: string}` | `{adl_logs: List[ADLLog]}` |
| `get_medication_history` | Retrieves a resident's complete medication history. | `{resident_id: string}` | `{medications: List[MedicationRecord]}` |
| `analyze_risk_factors` | Runs a predictive model based on input data to generate risk scores. | `{vitals_data, adl_logs, medications}` | `{risk_scores: Dict[string, float]}` |
| `create_clinical_alert` | Creates a high-priority alert for the nursing team. | `{resident_id: string, risk_type: string, evidence: string}` | `{alert_id: string}` |

### Example Workflow: Fall Risk Detection

1.  **Trigger:** Runs nightly for all residents.
2.  For each resident, **Sentinel** calls `get_resident_vitals_trend`, `get_resident_adl_logs`, and `get_medication_history` for the past 14 days.
3.  It notices a slight increase in blood pressure, a new psychoactive medication, and a decrease in mobility (ADL score).
4.  **Sentinel** passes this combined data to `analyze_risk_factors`.
5.  The model returns a high fall risk score (e.g., 0.85).
6.  **Sentinel** calls `create_clinical_alert` with `risk_type="fall"` and `evidence="Increased BP, new medication, decreased mobility"`.
7.  **Output:** A clinical alert appears on the nursing dashboard, prompting a fall risk assessment for the resident.

### Success Metrics

*   **Primary:** 30% reduction in preventable hospitalizations.
*   **Secondary:** 50% reduction in resident falls with injury.
*   **Tertiary:** 95% of high-risk alerts are deemed clinically relevant by staff.

---

## 3. Vanguard (Medication Safety Agent)

**Purpose & Core Function:** To prevent medication errors by acting as an intelligent safety net during the ordering, transcription, and administration phases.

**Framework & Runtime:** LangGraph (initially), migrating to **Azure Foundry** in Phase 3 due to its critical, life-impacting function.

### Key Responsibilities

*   Verifies new medication orders against a resident's allergies and current medications for interactions.
*   Flags ambiguous or potentially incorrect medication orders (e.g., wrong dosage, frequency).
*   Automates the transcription of new orders into the e-MAR (electronic Medication Administration Record).
*   Provides real-time decision support to nurses during medication administration.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `check_drug_interactions` | Checks a new drug against a resident's current medication list. | `{resident_id: string, new_drug: string}` | `{interactions: List[InteractionWarning]}` |
| `verify_resident_allergies` | Checks a new drug against a resident's known allergies. | `{resident_id: string, new_drug: string}` | `{is_allergic: boolean}` |
| `validate_dosage` | Checks if a dosage is within the standard range for the drug and resident profile. | `{drug: string, dosage: string, resident_profile: dict}` | `{is_safe: boolean, recommendation: string}` |
| `create_mar_entry` | Creates a new entry in the electronic Medication Administration Record. | `{resident_id, drug, dosage, frequency, route}` | `{mar_entry_id: string}` |
| `get_resident_profile` | Retrieves a resident's profile including age, weight, and conditions. | `{resident_id: string}` | `{profile: dict}` |

### Example Workflow: New Medication Order

1.  **Trigger:** A new medication order is scanned or entered into the system.
2.  **Vanguard** receives the order details: `Resident ID`, `Drug`, `Dosage`, `Frequency`.
3.  It calls `verify_resident_allergies`. Result: `is_allergic: false`.
4.  It calls `check_drug_interactions`. Result: `interactions: ["Moderate interaction with Drug X"]`.
5.  It calls `get_resident_profile` and then `validate_dosage`. Result: `is_safe: true`.
6.  **Vanguard** flags the moderate interaction and requires pharmacist/physician override.
7.  Once overridden, it calls `create_mar_entry` to add the medication to the resident's e-MAR.
8.  **Output:** The medication is added to the e-MAR with a visible warning about the interaction.

### Success Metrics

*   **Primary:** 90% reduction in medication administration errors.
*   **Secondary:** 100% of new orders checked for interactions and allergies.
*   **Tertiary:** 50% reduction in time spent manually transcribing MARs.

---

## 4. DocuBot (Clinical Documentation Agent)

**Purpose & Core Function:** To streamline and improve the quality of clinical documentation by converting unstructured inputs (voice, text) into compliant, structured notes.

**Framework & Runtime:** **LangGraph**, as it involves a clear, stateful workflow from transcription to finalization.

### Key Responsibilities

*   Transcribes spoken notes from clinicians into text.
*   Extracts key clinical entities (symptoms, vitals, actions) from the transcribed text.
*   Formats the extracted information into a structured format (e.g., SOAP note).
*   Suggests relevant billing codes based on the note's content.
*   Ensures notes meet facility and regulatory documentation standards before saving.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `transcribe_audio` | Converts an audio file of spoken notes into raw text. | `{audio_file_url: string}` | `{transcription: string}` |
| `extract_clinical_entities` | Identifies and extracts clinical entities from text. | `{text: string}` | `{entities: Dict}` |
| `format_soap_note` | Organizes extracted entities into a SOAP note structure. | `{entities: Dict}` | `{soap_note: string}` |
| `suggest_billing_codes` | Suggests ICD-10/CPT codes based on the note's content. | `{note_text: string}` | `{codes: List[string]}` |
| `save_progress_note` | Saves the final, structured note to the resident's chart. | `{resident_id: string, note: string}` | `{note_id: string}` |

### Example Workflow: Nurse's Spoken Note

1.  **User Input:** A nurse records a voice note: "Checked on Mrs. Smith. She reports a headache and dizziness. BP is 140/90. Administered Tylenol as ordered. Will re-check in 1 hour."
2.  **DocuBot** receives the audio file and calls `transcribe_audio`.
3.  It passes the raw text to `extract_clinical_entities`, which returns structured data.
4.  This data is then passed to `format_soap_note`, which generates:
    *   **S:** "Resident reports headache and dizziness."
    *   **O:** "BP 140/90."
    *   **A:** "Pain, potential hypertension."
    *   **P:** "Administered Tylenol. Will re-check in 1 hour."
5.  **DocuBot** calls `suggest_billing_codes` and gets relevant codes.
6.  The formatted note and suggested codes are displayed to the nurse for review.
7.  Upon approval, `save_progress_note` is called.
8.  **Output:** A compliant, structured SOAP note is saved to the resident's chart.

### Success Metrics

*   **Primary:** 70% reduction in time spent on clinical documentation.
*   **Secondary:** 98% accuracy in entity extraction and formatting.
*   **Tertiary:** Improved billing accuracy through better code suggestions.

---

## 5. Compass (Care Planning Agent)

**Purpose & Core Function:** To assist in the creation, review, and updating of personalized, goal-oriented resident care plans.

**Framework & Runtime:** **LangGraph**, as care planning is a collaborative, multi-step process often requiring human-in-the-loop.

### Key Responsibilities

*   Synthesizes information from assessments, progress notes, and staff observations to draft initial care plans.
*   Suggests specific, measurable, achievable, relevant, and time-bound (SMART) goals for residents.
*   Monitors progress towards care plan goals and suggests adjustments.
*   Ensures care plans are updated according to regulatory schedules (e.g., quarterly).
*   Facilitates interdisciplinary team reviews by providing a consolidated summary of resident progress.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_resident_assessments` | Retrieves all formal assessments for a resident (e.g., MDS, fall risk). | `{resident_id: string}` | `{assessments: List[Assessment]}` |
| `summarize_progress_notes` | Summarizes progress notes over a given period, focusing on key changes. | `{resident_id: string, date_range: DateRange}` | `{summary: string}` |
| `generate_smart_goals` | Suggests SMART goals based on assessment findings and resident preferences. | `{assessment_findings: dict}` | `{goals: List[SMARTGoal]}` |
| `draft_care_plan` | Assembles a draft care plan from assessments, goals, and interventions. | `{resident_id: string, goals: List[SMARTGoal]}` | `{draft_plan: CarePlan}` |
| `track_goal_progress` | Analyzes data to track progress towards a specific care plan goal. | `{goal_id: string}` | `{progress_status: string, evidence: string}` |

### Example Workflow: Quarterly Care Plan Review

1.  **Trigger:** A quarterly care plan review is due for a resident.
2.  **Compass** calls `get_resident_assessments` and `summarize_progress_notes` for the last 90 days.
3.  It calls `track_goal_progress` for each existing goal in the current care plan.
4.  **Compass** synthesizes this information into a summary document for the interdisciplinary team (IDT).
5.  During the IDT meeting, the team discusses the progress. A nurse notes that the resident has met their mobility goal.
6.  The team decides on a new goal related to social engagement.
7.  **Compass**, having listened to the meeting, calls `generate_smart_goals` with the new focus.
8.  It presents a suggested goal: "Resident will attend at least 3 group activities per week for the next 90 days."
9.  The team agrees. **Compass** calls `draft_care_plan` to generate the updated plan.
10. **Output:** The updated care plan is saved and ready for final sign-off.

### Success Metrics

*   **Primary:** 50% reduction in time spent on care plan documentation.
*   **Secondary:** 90% of care plans updated on schedule.
*   **Tertiary:** Measurable improvement in resident outcomes linked to care plan goals.
