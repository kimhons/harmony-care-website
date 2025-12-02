# HarmonyCare AI: Engagement Agent Specifications

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## Table of Contents

1. [Connect (Family & Resident Portal Agent)](#1-connect-family--resident-portal-agent)
2. [Pulse (Staff Engagement Agent)](#2-pulse-staff-engagement-agent)
3. [Advocate (Quality Improvement Agent)](#3-advocate-quality-improvement-agent)
4. [Catalyst (Admissions & CRM Agent)](#4-catalyst-admissions--crm-agent)
5. [Executive Assistant (Admin & Leadership Agent)](#5-executive-assistant-admin--leadership-agent)

---

## 1. Connect (Family & Resident Portal Agent)

**Purpose & Core Function:** To foster communication and transparency between the facility, residents, and their families by providing timely updates, facilitating communication, and offering a window into the resident's life.

**Framework & Runtime:** **LangGraph**, as it manages conversational flows and stateful interactions with multiple users (family members, residents).

### Key Responsibilities

*   Provides families with non-clinical updates on their loved one (e.g., activity participation, general mood).
*   Facilitates the scheduling of calls and visits between residents and families.
*   Answers common, non-clinical questions from families about facility life, events, and policies.
*   Allows residents to send messages and photos to their families through a simple, voice-enabled interface.
*   Broadcasts facility-wide announcements and event reminders to residents and families.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_resident_activity_log` | Retrieves a log of a resident's participation in social and recreational activities. | `{resident_id: string, date_range: DateRange}` | `{activities: List[ActivityLog]}` |
| `schedule_family_visit` | Schedules a visit, booking a room and adding it to the resident and facility calendar. | `{resident_id, family_member_id, requested_time}` | `{visit_id: string, confirmed_time: Datetime}` |
| `get_facility_faq` | Searches a knowledge base of frequently asked questions about the facility. | `{query: string}` | `{answer: string}` |
| `send_family_message` | Sends a message or photo from a resident to their designated family contacts. | `{resident_id, message_content, image_url}` | `{message_id: string}` |
| `broadcast_announcement` | Sends an announcement to all residents and/or families. | `{audience: string, message: string}` | `{status: string}` |

### Example Workflow: A Family Member Checks In

1.  **User Input (Family Member via Portal):** "How has Mom been doing this week?"
2.  **Connect** identifies "Mom" as the user's linked resident.
3.  It calls `get_resident_activity_log` for the past week. The log shows participation in a painting class and a music event.
4.  **Connect** synthesizes this into a friendly, non-clinical summary: "Your mom has had a great week! She participated in Tuesday's painting class and seemed to really enjoy the live music event on Thursday."
5.  It then proactively asks, "Would you like to schedule a video call with her this weekend?"
6.  The family member agrees. **Connect** calls `schedule_family_visit` to arrange the call.
7.  **Output:** A warm update is provided, and a video call is successfully scheduled, strengthening the family's connection to the facility.

### Success Metrics

*   **Primary:** 40% increase in family engagement scores (logins, messages, calls scheduled).
*   **Secondary:** 30% reduction in routine, non-clinical phone calls to the nursing station.
*   **Tertiary:** 95% resident and family satisfaction with the communication portal.

---

## 2. Pulse (Staff Engagement Agent)

**Purpose & Core Function:** To improve staff morale, reduce burnout, and decrease turnover by monitoring staff sentiment, facilitating recognition, and providing support resources.

**Framework & Runtime:** **LangGraph**, to manage confidential, one-on-one conversations and track sentiment over time.

### Key Responsibilities

*   Conducts regular, confidential "pulse check" surveys with staff via chat.
*   Analyzes sentiment from survey responses to identify team- or facility-wide trends.
*   Facilitates a peer-to-peer recognition program (e.g., "shout-outs").
*   Provides staff with easy access to HR resources, wellness tips, and support services.
*   Alerts leadership to significant negative sentiment trends without revealing individual responses.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `send_pulse_survey` | Sends a short, confidential survey to a staff member. | `{staff_id: string}` | `{survey_id: string}` |
| `analyze_sentiment` | Analyzes the sentiment of a text response (positive, negative, neutral). | `{text: string}` | `{sentiment_score: float}` |
| `create_peer_recognition` | Logs a peer-to-peer recognition in the system. | `{recognizer_id, recognized_id, reason}` | `{recognition_id: string}` |
| `get_hr_resource` | Fetches information from the HR knowledge base (e.g., PTO policy). | `{query: string}` | `{resource_content: string}` |
| `generate_sentiment_report` | Creates an anonymized report of team sentiment trends for leadership. | `{team_id: string, date_range: DateRange}` | `{report_url: string}` |

### Example Workflow: Weekly Pulse Check

1.  **Trigger:** Every Friday, **Pulse** initiates a conversation with a staff member.
2.  **Pulse:** "Hi Alex, it's Pulse, your friendly workplace bot! Got a minute for a quick, confidential check-in? How was your week on a scale of 1-5?"
3.  Alex responds: "2. It was really tough. We were short-staffed on Wednesday."
4.  **Pulse** calls `analyze_sentiment` on the text, which returns a negative score.
5.  **Pulse:** "I'm sorry to hear that. Dealing with short staffing is definitely challenging. Your feedback is valuable and will be included in an anonymous summary for leadership to help them understand these challenges. On a brighter note, is there a colleague who really helped you out this week?"
6.  Alex gives a shout-out to a coworker. **Pulse** calls `create_peer_recognition`.
7.  **Output:** The negative sentiment is logged anonymously for trend analysis. The positive peer recognition is shared publicly on the facility's digital bulletin board.

### Success Metrics

*   **Primary:** 20% reduction in annual staff turnover.
*   **Secondary:** 15% improvement in employee satisfaction/engagement scores.
*   **Tertiary:** 90% participation rate in weekly pulse surveys.

---

## 3. Advocate (Quality Improvement Agent)

**Purpose & Core Function:** To drive a data-driven quality improvement culture by investigating incidents, identifying root causes, and managing corrective action plans (CAPs).

**Framework & Runtime:** **CrewAI**, as its core function is to orchestrate a team of specialized sub-agents to conduct thorough, multi-faceted investigations.

### Key Responsibilities

*   Orchestrates the investigation of incidents (e.g., falls, medication errors).
*   Spawns specialized sub-agents to analyze different facets of an incident in parallel.
*   Synthesizes findings from sub-agents to identify the root cause(s).
*   Generates a draft Corrective Action Plan (CAP) with recommended interventions.
*   Tracks the implementation and effectiveness of CAPs over time.

### Required Tools (for Advocate & its sub-agents)

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_incident_details` | Retrieves the full report for a specific incident. | `{incident_id: string}` | `{incident_data: Incident}` |
| `review_care_plan_history` | Fetches the resident's care plan and its revision history. | `{resident_id: string}` | `{care_plan_history: List[CarePlan]}` |
| `analyze_staffing_data` | Retrieves staffing levels and assignments for the time of the incident. | `{datetime: Datetime}` | `{staffing_data: dict}` |
| `check_protocol_compliance` | Checks if facility protocols were followed during the incident. | `{protocol_name: string, incident_data}` | `{was_compliant: boolean, deviations: List}` |
| `generate_cap_draft` | Creates a draft Corrective Action Plan based on root cause findings. | `{root_cause: string, incident_id: string}` | `{cap_draft: CAP}` |

### Example Workflow: Investigating a Resident Fall

1.  **Trigger:** A new fall incident is reported.
2.  The **Concierge** routes the investigation to **Advocate**.
3.  **Advocate (CrewAI)** spawns three sub-agents:
    *   **Clinical Analyst:** Calls `get_incident_details` and `review_care_plan_history` to review the resident's clinical context.
    *   **Operational Analyst:** Calls `analyze_staffing_data` and `check_protocol_compliance` to review the environmental and process context.
    *   **Historical Analyst:** Calls `get_incident_details` for all falls in the past 90 days to look for trends.
4.  The sub-agents complete their analysis and report their findings back to **Advocate**.
5.  **Advocate** synthesizes the findings: "The resident was on a new medication known to cause dizziness, and the fall occurred during a shift change when staffing was lowest."
6.  It identifies the root cause as a combination of medication side effects and inadequate handover protocols.
7.  It calls `generate_cap_draft` to create a plan that includes a medication review and a revised shift handover protocol.
8.  **Output:** The draft CAP is sent to the Director of Nursing for review and approval.

### Success Metrics

*   **Primary:** 40% reduction in the recurrence rate of similar incidents.
*   **Secondary:** 50% reduction in the time required to complete a root cause analysis.
*   **Tertiary:** 90% of CAPs implemented on schedule.

---

## 4. Catalyst (Admissions & CRM Agent)

**Purpose & Core Function:** To streamline the admissions process and manage relationships with prospective residents and their families, from initial inquiry to move-in.

**Framework & Runtime:** **LangGraph**, to manage the long-running, conversational sales and admissions funnel.

### Key Responsibilities

*   Engages with leads from the facility website, answering initial questions and capturing contact information.
*   Schedules facility tours and sends reminders to prospective families.
*   Nurtures leads with personalized follow-up emails and information packets.
*   Guides families through the admissions paperwork process, highlighting required documents.
*   Manages a CRM of all prospective residents, tracking their stage in the admissions funnel.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `create_lead` | Creates a new lead in the CRM system. | `{name, email, phone, inquiry}` | `{lead_id: string}` |
| `schedule_facility_tour` | Schedules a tour, assigning a staff member and booking a time slot. | `{lead_id: string, requested_time: Datetime}` | `{tour_id: string}` |
| `send_follow_up_email` | Sends a personalized follow-up email from a template. | `{lead_id: string, template_name: string}` | `{status: string}` |
| `get_admissions_checklist` | Retrieves the list of required documents for admission. | `{lead_id: string}` | `{checklist: List[DocumentStatus]}` |
| `update_lead_stage` | Updates the lead's stage in the CRM funnel (e.g., "Tour Scheduled"). | `{lead_id: string, new_stage: string}` | `{status: string}` |

### Example Workflow: A New Website Inquiry

1.  **Trigger:** A family member fills out the contact form on the website.
2.  **Catalyst** calls `create_lead` to add the person to the CRM.
3.  It immediately sends an introductory email and asks about their needs.
4.  Based on the response, it suggests, "It sounds like our memory care unit might be a good fit. Would you be available for a tour next week?"
5.  The family member agrees. **Catalyst** calls `schedule_facility_tour`.
6.  After the tour, the agent automatically calls `send_follow_up_email` with a "Thank you for visiting" message and pricing information.
7.  It then calls `update_lead_stage` to move the lead to the "Tour Completed" stage.
8.  **Output:** The lead is effectively nurtured, and the admissions director has a clear view of the prospect's journey in the CRM.

### Success Metrics

*   **Primary:** 15% increase in the lead-to-admission conversion rate.
*   **Secondary:** 50% reduction in manual data entry and follow-up by the admissions director.
*   **Tertiary:** 90% of new leads contacted within 5 minutes.

---

## 5. Executive Assistant (Admin & Leadership Agent)

**Purpose & Core Function:** To provide administrative support and data-driven insights to the facility's leadership team, automating reporting and summarizing key operational data.

**Framework & Runtime:** **LangGraph**, as it needs to synthesize information from multiple sources and present it in a structured, conversational manner.

### Key Responsibilities

*   Generates daily, weekly, and monthly operational reports (e.g., census, staffing, budget).
*   Summarizes key findings from other agents' reports for executive review.
*   Helps schedule meetings and manage the leadership team's calendar.
*   Answers ad-hoc questions from leadership by querying data from across the platform.
*   Drafts internal communications and announcements on behalf of leadership.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `generate_operational_report` | Generates a report by pulling data from multiple services (census, finance, HR). | `{report_type: string, date_range: DateRange}` | `{report_url: string}` |
| `summarize_agent_findings` | Summarizes the key alerts and findings from other agents (e.g., Sentinel, Guardian). | `{date_range: DateRange}` | `{summary: string}` |
| `schedule_leadership_meeting` | Schedules a meeting for the leadership team, finding a common available time. | `{attendees: List[string], topic: string}` | `{meeting_id: string}` |
| `query_platform_data` | Performs a natural language query across the entire platform's database. | `{query: string}` | `{answer: string, data_source: string}` |
| `draft_internal_memo` | Drafts an internal communication based on key points. | `{topic: string, key_points: List[string]}` | `{draft_memo: string}` |

### Example Workflow: The Daily Morning Briefing

1.  **Trigger:** Runs every morning at 7 AM.
2.  **Executive Assistant** calls `generate_operational_report` for the previous day's census, labor costs, and incidents.
3.  It calls `summarize_agent_findings` to get the top 3 most critical alerts from **Sentinel** and **Guardian**.
4.  It synthesizes this information into a concise briefing.
5.  **User Input (Facility Director):** "Morning! Give me the daily briefing."
6.  **Output:** "Good morning! Here is your briefing for November 28th:
    *   **Census:** 98% (49/50 residents)
    *   **Labor:** 5% over budget due to sick call coverage.
    *   **Incidents:** 1 minor fall, no injury.
    *   **Top Alert:** Sentinel has flagged resident John Doe for high infection risk due to elevated temperature. A clinical alert has been sent to the nursing team."

### Success Metrics

*   **Primary:** 60% reduction in time spent by leadership on manual data gathering and report generation.
*   **Secondary:** Faster, more informed decision-making based on real-time, synthesized data.
*   **Tertiary:** Improved operational oversight and ability for the executive team.
