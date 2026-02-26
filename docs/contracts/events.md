# HarmonyCare Platform Events

**DOCUMENT:** events.md
**TASK:** Define ALL async events (EVT-*) existing and planned.

This document outlines the event-driven architecture of the HarmonyCare platform. It serves as a contract for all asynchronous communication between modules, agents, and services. Each event is defined with a unique identifier, a description of its purpose, the data payload it carries, and the modules that publish or subscribe to it.

---

## Event Naming Convention

Events are named using the following stable ID system:

`EVT-DOMAIN-EVENTNAME`

- **DOMAIN:** A logical grouping of related events (e.g., USER, LEAD, REFERRAL).
- **EVENTNAME:** A descriptive name for the event in `PascalCase`.

---

## User & Auth Events (EVT-USER-*)

Events related to user lifecycle, authentication, and account management.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-USER-SignedUp` | Triggered when a new user completes the early access signup form. | `signup: Signup` | `API-SIGNUP-POST-create` | `MOD-Email`, `MOD-Referral`, `MOD-Analytics` |
| `EVT-USER-LoggedIn` | Fired after a user successfully authenticates via Manus OAuth. | `user: User` | `API-AUTH-GET-me` | `MOD-Audit` |
| `EVT-USER-LoggedOut` | Fired when a user session is terminated. | `{ userId: number }` | `API-AUTH-POST-logout` | `MOD-Audit` |
| `EVT-USER-RoleChanged` | Occurs when an administrator changes a user's role. | `{ userId: number, newRole: 'user' \| 'admin' }` | `MOD-Admin` | `MOD-Audit`, `MOD-Notification` |

---

## Lead & CRM Events (EVT-LEAD-*)

Events related to lead capture, nurturing, and conversion.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-LEAD-CalculatorLeadGenerated` | A potential lead submits the ROI calculator. | `lead: CalculatorLead` | `API-CALCULATOR-POST-save` | `MOD-Email`, `MOD-LeadScoring`, `AGENT-Catalyst` |
| `EVT-LEAD-LeadMagnetDownloaded` | A user downloads a lead magnet resource. | `download: LeadMagnetDownload` | `API-LEADMAGNETS-POST-download` | `MOD-Email`, `MOD-LeadScoring`, `AGENT-Catalyst` |
| `EVT-LEAD-NewsletterSubscribed` | A user subscribes to the newsletter. | `subscriber: NewsletterSubscriber` | `API-NEWSLETTER-POST-subscribe` | `MOD-Email` |
| `EVT-LEAD-ScoreUpdated` | A lead's score changes based on their engagement. | `{ leadId: number, newScore: number, oldScore: number, tier: 'hot' \| 'warm' \| 'cold' }` | `MOD-LeadScoring` | `AGENT-Catalyst`, `MOD-Analytics` |
| `EVT-LEAD-NurtureEmailSent` | An email in a nurture sequence has been sent. | `{ leadId: number, sequence: string, emailType: string }` | `MOD-Email` | `MOD-Analytics` |
| `EVT-LEAD-TourScheduled` | A prospective lead schedules a facility tour. | `{ leadId: number, tourId: string, tourTime: Datetime }` | `AGENT-Catalyst` | `MOD-Notification`, `MOD-Calendar` |

---

## Referral Program Events (EVT-REFERRAL-*)

Events for the founding member referral program.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-REFERRAL-ReferredUserSignedUp` | A new user signs up using a referral code. | `referral: Referral` | `API-SIGNUP-POST-create` | `MOD-Referral`, `MOD-Email`, `MOD-Analytics` |
| `EVT-REFERRAL-MilestoneAchieved` | A referrer reaches a new reward milestone. | `notification: MilestoneNotification` | `MOD-Referral` | `MOD-Email`, `MOD-Notification` |
| `EVT-REFERRAL-RewardStatusChanged` | The status of a referral reward is updated. | `{ referralId: number, newStatus: 'pending' \| 'applied' \| 'claimed' }` | `MOD-Admin` | `MOD-Notification` |

---

## Engagement & Communication Events (EVT-ENGAGEMENT-*)

Events related to interactions with residents, families, and staff.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-ENGAGEMENT-FamilyMessageSent` | A resident sends a message or photo to their family. | `{ residentId: string, messageId: string }` | `AGENT-Connect` | `MOD-Notification` |
| `EVT-ENGAGEMENT-VisitScheduled` | A family visit has been scheduled. | `{ visitId: string, residentId: string, familyMemberId: string, visitTime: Datetime }` | `AGENT-Connect` | `MOD-Notification`, `MOD-Calendar` |
| `EVT-ENGAGEMENT-FacilityAnnouncement` | A facility-wide announcement is broadcast. | `{ audience: string, message: string }` | `AGENT-Connect` | `MOD-Notification` |
| `EVT-ENGAGEMENT-StaffPulseCheck` | A staff member completes a pulse check survey. | `{ staffId: string, sentimentScore: float, responses: object }` | `AGENT-Pulse` | `MOD-Analytics` |
| `EVT-ENGAGEMENT-PeerRecognitionCreated` | A staff member gives a shout-out to a colleague. | `{ recognizerId: string, recognizedId: string, reason: string }` | `AGENT-Pulse` | `MOD-Notification` |
| `EVT-ENGAGEMENT-EmailOpened` | A recipient opens an email sent via Resend. | `{ messageId: string, recipient: string, timestamp: Datetime }` | `API-RESEND-WEBHOOK` | `MOD-Analytics`, `MOD-LeadScoring` |
| `EVT-ENGAGEMENT-EmailLinkClicked` | A recipient clicks a link in an email. | `{ messageId: string, recipient: string, url: string, timestamp: Datetime }` | `API-RESEND-WEBHOOK` | `MOD-Analytics`, `MOD-LeadScoring` |

---

## Operational & Agent Events (EVT-OPS-*)

Events related to internal operations, agent tasks, and workflow orchestration.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-OPS-IncidentReported` | A new incident (e.g., fall, med error) is logged. | `{ incidentId: string, incidentType: string, residentId: string }` | `MOD-Clinical` | `AGENT-Concierge` |
| `EVT-OPS-InvestigationStarted` | An agent-led investigation has been initiated. | `{ investigationId: string, incidentId: string, agent: 'Advocate' }` | `AGENT-Concierge` | `AGENT-Advocate`, `MOD-Audit` |
| `EVT-OPS-CAPDraftGenerated` | A draft Corrective Action Plan is ready for review. | `{ capId: string, incidentId: string, draft: CAP }` | `AGENT-Advocate` | `MOD-Notification` |
| `EVT-OPS-TaskAssigned` | A task has been assigned to an agent or human. | `{ taskId: string, assignee: string, details: object }` | `AGENT-Concierge`, `AGENT-Nexus` | `MOD-Notification` |
| `EVT-OPS-InteractionDocumented` | An agent interaction has been documented. | `{ interactionId: string, agent: string, summary: string, filePath: string }` | `AGENT-Scribe` | `AGENT-Archivist` |

---

## Data & System Events (EVT-DATA-*)

Events related to data management and system-level processes.

| Event ID | Description | Payload | Published By | Subscribed By |
|---|---|---|---|---|
| `EVT-DATA-FileUploaded` | A file has been successfully uploaded to S3 storage. | `{ fileId: string, path: string, uploaderId: number, size: number }` | `API-FILEUPLOAD-POST-upload` | `MOD-Audit` |
| `EVT-DATA-RecordArchived` | A record has been moved to long-term archival storage. | `{ recordId: string, recordType: string, archivePath: string }` | `AGENT-Archivist` | `MOD-Audit` |
| `EVT-DATA-AnalyticsReportReady` | A scheduled analytics report has been generated. | `{ reportId: string, reportName: string, format: 'pdf' \| 'csv', filePath: string }` | `AGENT-Compass` | `MOD-Notification` |
| `EVT-DATA-ComplianceCheckFailed` | An automated compliance check has failed. | `{ checkId: string, rule: string, details: object }` | `AGENT-Guardian` | `AGENT-Auditor`, `MOD-Notification` |
| `EVT-DATA-AuditTrailGenerated` | A comprehensive audit trail for a process is created. | `{ processId: string, trailPath: string }` | `AGENT-Auditor` | `MOD-Admin` |

---

## Cross-References

- **Requirements:** REQ-SYS-0008 (Event-Driven Architecture), REQ-AGENT-0003 (Async Communication)
- **Modules:** MOD-Email, MOD-Notification, MOD-Analytics, MOD-Audit, MOD-Referral, MOD-LeadScoring, MOD-Admin, MOD-Clinical, MOD-Calendar
- **Agents:** AGENT-Connect, AGENT-Pulse, AGENT-Advocate, AGENT-Catalyst, AGENT-Concierge, AGENT-Scribe, AGENT-Archivist, AGENT-Guardian, AGENT-Auditor, AGENT-Nexus, AGENT-Compass
- **APIs:** API-SIGNUP-POST-create, API-AUTH-GET-me, API-AUTH-POST-logout, API-CALCULATOR-POST-save, API-LEADMAGNETS-POST-download, API-NEWSLETTER-POST-subscribe, API-RESEND-WEBHOOK, API-FILEUPLOAD-POST-upload
