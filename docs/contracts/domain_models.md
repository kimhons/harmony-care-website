# Domain Models (DM-*)

**DOCUMENT:** domain_models.md
**PROJECT:** Harmony AI-Native Care Management Platform
**VERSION:** 1.0
**DATE:** 2026-02-25

---

## 1. Introduction

This document defines the canonical data models for the Harmony AI-Native Care Management Platform. Each data model is assigned a stable `DM-*` identifier and represents a core business entity within the system. These definitions serve as the single source of truth for database schema, API contracts, and application logic.

This document is a **NO-INTERPRETATION** artifact. All models, fields, and relationships are explicitly defined. There are no vague descriptions or summary-level details. All definitions are grounded in the existing database schema and architectural specifications.

**Related Documents:**

*   `REQ-*: System Requirements`
*   `API-*: API Endpoint Specifications`
*   `MOD-*: Module Definitions`

---

## 2. Existing Data Models

These data models are derived directly from the current Drizzle ORM schema (`drizzle/schema.ts`) and are implemented in the production database.
### 2.1. User (DM-USER)

**Description:** Represents a registered user with login credentials and system access rights. This model is central to authentication and authorization.

**Source:** `drizzle/schema.ts` -> `users` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `openId` | `varchar(64)` | `notNull`, `unique` | Manus OAuth identifier. |
| `name` | `text` | | User's full name. |
| `email` | `varchar(320)` | | User's email address. |
| `loginMethod` | `varchar(64)` | | OAuth provider used for login. |
| `role` | `enum('user', 'admin')` | `notNull`, `default('user')` | User's role in the system. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of user creation. |
| `updatedAt` | `timestamp` | `notNull`, `defaultNow()`, `onUpdateNow()` | Timestamp of last user update. |
| `lastSignedIn` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of last user sign-in. |

**Relationships:**

*   **None** (This is the root identity model)

### 2.2. Signup (DM-SIGNUP)

**Description:** Represents a prospective customer who has signed up for early access or the waitlist. This model captures initial lead information and marketing attribution data.

**Source:** `drizzle/schema.ts` -> `signups` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `firstName` | `varchar(100)` | `notNull` | First name of the person signing up. |
| `lastName` | `varchar(100)` | `notNull` | Last name of the person signing up. |
| `email` | `varchar(320)` | `notNull` | Email address of the person signing up. |
| `phone` | `varchar(20)` | | Phone number of the person signing up. |
| `facilityName` | `varchar(200)` | `notNull` | Name of the care facility. |
| `facilityType` | `varchar(100)` | `notNull` | Type of care facility. |
| `residentCount` | `int` | `notNull` | Number of residents in the facility. |
| `tier` | `varchar(50)` | `notNull` | Selected pricing tier. |
| `interestedFeatures` | `text` | | JSON array of features the user is interested in. |
| `additionalNeeds` | `text` | | Any additional needs or comments from the user. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of signup creation. |
| `emailsSent` | `text` | | JSON array of sent email types and timestamps. |
| `lastEmailSent` | `timestamp` | | Timestamp of the last email sent. |
| `emailOptOut` | `int` | `notNull`, `default(0)` | Flag to indicate if the user has opted out of emails. |
| `campaignStatus` | `varchar(50)` | `notNull`, `default('active')` | Status of the email campaign for this signup. |
| `utmSource` | `varchar(100)` | | UTM source parameter for marketing attribution. |
| `utmMedium` | `varchar(100)` | | UTM medium parameter for marketing attribution. |
| `utmCampaign` | `varchar(100)` | | UTM campaign parameter for marketing attribution. |
| `utmTerm` | `varchar(100)` | | UTM term parameter for marketing attribution. |
| `utmContent` | `varchar(100)` | | UTM content parameter for marketing attribution. |
| `referralCode` | `varchar(20)` | | Referral code used during signup. |
| `ownReferralCode` | `varchar(20)` | `unique` | The user's own unique referral code to share. |

**Relationships:**

*   **One-to-Many:** `DM-SIGNUP` has many `DM-REFERRAL` (as referrer)
*   **One-to-One:** `DM-SIGNUP` has one `DM-REFERRAL` (as referred)
*   **One-to-Many:** `DM-SIGNUP` has many `DM-MILESTONE-NOTIFICATION`

### 2.3. Referral (DM-REFERRAL)

**Description:** Tracks the relationship between a referrer and a referred user, including the status of any rewards.

**Source:** `drizzle/schema.ts` -> `referrals` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `referrerSignupId` | `int` | `notNull` | The ID of the `DM-SIGNUP` who made the referral. |
| `referredSignupId` | `int` | `notNull` | The ID of the `DM-SIGNUP` who was referred. |
| `referralCode` | `varchar(20)` | `notNull` | The referral code that was used. |
| `rewardStatus` | `varchar(50)` | `notNull`, `default('pending')` | The status of the referral reward (e.g., pending, applied, claimed). |
| `rewardType` | `varchar(50)` | | The type of reward (e.g., discount, credit, upgrade). |
| `rewardValue` | `varchar(100)` | | The value of the reward (e.g., "10%", "$50", "free_month"). |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the referral was created. |

**Relationships:**

*   **Many-to-One:** `DM-REFERRAL` belongs to one `DM-SIGNUP` (referrer).
*   **One-to-One:** `DM-REFERRAL` is associated with one `DM-SIGNUP` (referred).

### 2.4. Milestone Notification (DM-MILESTONE-NOTIFICATION)

**Description:** Records a notification generated when a user achieves a specific milestone, such as a referral goal.

**Source:** `drizzle/schema.ts` -> `milestoneNotifications` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `signupId` | `int` | `notNull` | The ID of the `DM-SIGNUP` who achieved the milestone. |
| `milestoneId` | `varchar(50)` | `notNull` | A unique identifier for the specific milestone (e.g., 'first-referral'). |
| `milestoneType` | `varchar(50)` | `notNull` | The category of the milestone (e.g., referral_count, tier_upgrade). |
| `title` | `varchar(200)` | `notNull` | The celebratory title of the notification. |
| `description` | `text` | `notNull` | The descriptive message for the milestone achievement. |
| `badgePath` | `varchar(500)` | `notNull` | The path to the graphical badge awarded for the milestone. |
| `isViewed` | `int` | `notNull`, `default(0)` | Flag indicating if the notification has been viewed by the user. |
| `isShared` | `int` | `notNull`, `default(0)` | Flag indicating if the user has shared the milestone achievement. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the notification was created. |

**Relationships:**

*   **Many-to-One:** `DM-MILESTONE-NOTIFICATION` belongs to one `DM-SIGNUP`.

### 2.5. Calculator Lead (DM-CALCULATOR-LEAD)

**Description:** Captures lead information from the ROI calculator, including the calculated savings and lead scoring data.

**Source:** `drizzle/schema.ts` -> `calculatorLeads` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `email` | `varchar(320)` | `notNull` | Email address of the lead. |
| `name` | `varchar(200)` | | Name of the lead. |
| `facilityName` | `varchar(200)` | | Name of the facility. |
| `facilityType` | `varchar(50)` | `notNull` | Type of facility (e.g., "group_home", "icf_id"). |
| `residentCount` | `int` | `notNull` | Number of residents in the facility. |
| `annualSavings` | `int` | `notNull` | Total calculated annual savings. |
| `overtimeSavings` | `int` | `notNull` | Calculated savings from reduced overtime. |
| `errorSavings` | `int` | `notNull` | Calculated savings from reduced errors. |
| `complianceSavings` | `int` | `notNull` | Calculated savings from improved compliance. |
| `retentionSavings` | `int` | `notNull` | Calculated savings from increased staff retention. |
| `source` | `varchar(50)` | `notNull`, `default("calculator")` | The source of the lead (e.g., "calculator", "exit_intent"). |
| `utmSource` | `varchar(100)` | | UTM source parameter. |
| `utmMedium` | `varchar(100)` | | UTM medium parameter. |
| `utmCampaign` | `varchar(100)` | | UTM campaign parameter. |
| `utmTerm` | `varchar(100)` | | UTM term parameter. |
| `utmContent` | `varchar(100)` | | UTM content parameter. |
| `emailSent` | `int` | `notNull`, `default(0)` | Flag indicating if the results email has been sent. |
| `emailSentAt` | `timestamp` | | Timestamp of when the results email was sent. |
| `nurtureSequence` | `text` | | JSON array tracking the email nurture sequence. |
| `lastNurtureEmail` | `varchar(50)` | | Identifier for the last nurture email sent. |
| `lastNurtureEmailSentAt` | `timestamp` | | Timestamp of the last nurture email sent. |
| `nurtureCompleted` | `int` | `notNull`, `default(0)` | Flag indicating if the nurture sequence is complete. |
| `leadScore` | `int` | `notNull`, `default(0)` | A score from 0-100 indicating lead quality. |
| `leadTier` | `varchar(20)` | `notNull`, `default("cold")` | The tier of the lead (e.g., 'hot', 'warm', 'cold'). |
| `engagementScore` | `int` | `notNull`, `default(0)` | A score based on lead engagement (email opens, clicks). |
| `lastEngagementAt` | `timestamp` | | Timestamp of the last engagement. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the lead was created. |

**Relationships:**

*   **One-to-Many:** `DM-CALCULATOR-LEAD` can have many `DM-LEAD-MAGNET-DOWNLOAD`.

### 2.6. Lead Magnet (DM-LEAD-MAGNET)

**Description:** Represents a downloadable resource (e.g., PDF, checklist) offered to generate leads.

**Source:** `drizzle/schema.ts` -> `leadMagnets` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `title` | `varchar(200)` | `notNull` | The title of the lead magnet. |
| `description` | `text` | `notNull` | A description of the lead magnet. |
| `type` | `varchar(50)` | `notNull` | The type of resource (e.g., "pdf", "checklist"). |
| `category` | `varchar(50)` | `notNull` | The category of the lead magnet (e.g., "roi", "compliance"). |
| `fileUrl` | `varchar(500)` | `notNull` | The S3 URL or external link to the resource file. |
| `thumbnailUrl` | `varchar(500)` | | The URL of a preview image for the resource. |
| `fileSize` | `int` | | The size of the file in kilobytes. |
| `downloadCount` | `int` | `notNull`, `default(0)` | The number of times the resource has been downloaded. |
| `isActive` | `int` | `notNull`, `default(1)` | Flag indicating if the lead magnet is currently visible. |
| `sortOrder` | `int` | `notNull`, `default(0)` | A number used for manual sorting of lead magnets. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the lead magnet was created. |
| `updatedAt` | `timestamp` | `notNull`, `defaultNow()`, `onUpdateNow()` | Timestamp of the last update. |

**Relationships:**

*   **One-to-Many:** `DM-LEAD-MAGNET` has many `DM-LEAD-MAGNET-DOWNLOAD`.

### 2.7. Lead Magnet Download (DM-LEAD-MAGNET-DOWNLOAD)

**Description:** Tracks an instance of a user downloading a lead magnet, capturing the user's information at the time of download.

**Source:** `drizzle/schema.ts` -> `leadMagnetDownloads` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `leadMagnetId` | `int` | `notNull` | The ID of the `DM-LEAD-MAGNET` that was downloaded. |
| `email` | `varchar(320)` | `notNull` | Email address of the person who downloaded the resource. |
| `name` | `varchar(200)` | | Name of the person. |
| `facilityName` | `varchar(200)` | | Name of the facility. |
| `facilityType` | `varchar(50)` | | Type of facility. |
| `residentCount` | `int` | | Number of residents in the facility. |
| `jobTitle` | `varchar(100)` | | Job title of the person. |
| `phoneNumber` | `varchar(20)` | | Phone number of the person. |
| `calculatorLeadId` | `int` | | The ID of the associated `DM-CALCULATOR-LEAD`, if one exists. |
| `utmSource` | `varchar(100)` | | UTM source parameter. |
| `utmMedium` | `varchar(100)` | | UTM medium parameter. |
| `utmCampaign` | `varchar(100)` | | UTM campaign parameter. |
| `ipAddress` | `varchar(45)` | | IP address of the downloader. |
| `userAgent` | `text` | | User agent string of the downloader's browser. |
| `downloadedAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of the download. |
| `nurtureSequence` | `text` | | JSON array tracking the email nurture sequence. |
| `lastNurtureEmail` | `varchar(50)` | | Identifier for the last nurture email sent. |
| `lastNurtureEmailSentAt` | `timestamp` | | Timestamp of the last nurture email sent. |
| `nurtureCompleted` | `int` | `notNull`, `default(0)` | Flag indicating if the nurture sequence is complete. |

**Relationships:**

*   **Many-to-One:** `DM-LEAD-MAGNET-DOWNLOAD` belongs to one `DM-LEAD-MAGNET`.
*   **Many-to-One:** `DM-LEAD-MAGNET-DOWNLOAD` can belong to one `DM-CALCULATOR-LEAD`.

### 2.8. Newsletter Subscriber (DM-NEWSLETTER-SUBSCRIBER)

**Description:** Represents a user who has subscribed to the blog newsletter.

**Source:** `drizzle/schema.ts` -> `newsletterSubscribers` table

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `email` | `varchar(320)` | `notNull`, `unique` | Email address of the subscriber. |
| `name` | `varchar(200)` | | Name of the subscriber. |
| `source` | `varchar(100)` | `notNull` | The source of the subscription (e.g., blog article slug, "homepage"). |
| `status` | `varchar(20)` | `notNull`, `default("active")` | The status of the subscription (e.g., "active", "unsubscribed"). |
| `utmSource` | `varchar(100)` | | UTM source parameter. |
| `utmMedium` | `varchar(100)` | | UTM medium parameter. |
| `utmCampaign` | `varchar(100)` | | UTM campaign parameter. |
| `nurtureSequence` | `text` | | JSON array tracking the email nurture sequence. |
| `lastNurtureEmail` | `varchar(50)` | | Identifier for the last nurture email sent. |
| `lastNurtureEmailSentAt` | `timestamp` | | Timestamp of the last nurture email sent. |
| `nurtureCompleted` | `int` | `notNull`, `default(0)` | Flag indicating if the nurture sequence is complete. |
| `emailOpens` | `int` | `notNull`, `default(0)` | The number of times the subscriber has opened an email. |
| `emailClicks` | `int` | `notNull`, `default(0)` | The number of times the subscriber has clicked a link in an email. |
| `lastEngagementAt` | `timestamp` | | Timestamp of the last engagement. |
| `subscribedAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the subscription was created. |
| `unsubscribedAt` | `timestamp` | | Timestamp of when the user unsubscribed. |

**Relationships:**

*   **None**

---

## 3. Planned Data Models

These data models are derived from the agent and architectural specifications. They represent new entities required to support planned features and AI agent capabilities. They are not yet implemented in the database schema.

### 3.1. Incident (DM-INCIDENT)

**Description:** Represents a clinical or operational incident, such as a resident fall or medication error. This model is central to the quality improvement workflow.

**Source:** `harmony_all_specs.md` -> `Advocate` Agent -> `get_incident_details` tool

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `residentId` | `int` | `notNull` | The ID of the resident involved in the incident. |
| `incidentType` | `varchar(100)` | `notNull` | The type of incident (e.g., 'fall', 'medication_error'). |
| `incidentTimestamp` | `timestamp` | `notNull` | The exact time the incident occurred. |
| `description` | `text` | `notNull` | A detailed description of the incident. |
| `location` | `varchar(200)` | | The location where the incident occurred. |
| `staffInvolved` | `text` | | JSON array of staff IDs involved or present. |
| `witnesses` | `text` | | JSON array of witness names or IDs. |
| `status` | `varchar(50)` | `notNull`, `default('reported')` | The current status of the incident investigation ('reported', 'investigating', 'resolved'). |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the incident was reported. |
| `updatedAt` | `timestamp` | `notNull`, `defaultNow()`, `onUpdateNow()` | Timestamp of the last update. |

**Relationships:**

*   **Many-to-One:** `DM-INCIDENT` belongs to one `DM-RESIDENT` (planned).
*   **One-to-One:** `DM-INCIDENT` has one `DM-CAP` (Corrective Action Plan).

### 3.2. Care Plan (DM-CARE-PLAN)

**Description:** Represents the clinical care plan for a resident, including assessments, goals, and interventions.

**Source:** `harmony_all_specs.md` -> `Advocate` Agent -> `review_care_plan_history` tool

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `residentId` | `int` | `notNull` | The ID of the resident this care plan belongs to. |
| `version` | `int` | `notNull` | The version number of the care plan. |
| `assessment` | `text` | | The clinical assessment of the resident. |
| `goals` | `text` | | The care goals for the resident. |
| `interventions` | `text` | | The planned interventions to achieve the goals. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when this version of the care plan was created. |
| `updatedAt` | `timestamp` | `notNull`, `defaultNow()`, `onUpdateNow()` | Timestamp of the last update. |

**Relationships:**

*   **Many-to-One:** `DM-CARE-PLAN` belongs to one `DM-RESIDENT` (planned).

### 3.3. Corrective Action Plan (DM-CAP)

**Description:** A plan created in response to an incident, outlining the steps to be taken to prevent recurrence.

**Source:** `harmony_all_specs.md` -> `Advocate` Agent -> `generate_cap_draft` tool

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `incidentId` | `int` | `notNull` | The ID of the `DM-INCIDENT` this plan addresses. |
| `rootCause` | `text` | `notNull` | The identified root cause of the incident. |
| `actions` | `text` | `notNull` | JSON array of corrective actions to be taken. |
| `responsibleParties` | `text` | | JSON array of staff IDs responsible for implementing the actions. |
| `dueDate` | `timestamp` | | The date by which the actions should be completed. |
| `status` | `varchar(50)` | `notNull`, `default("draft")` | The status of the CAP (e.g., 'draft', 'approved', 'in_progress', 'completed'). |
| `effectiveness` | `text` | | A description of the effectiveness of the implemented actions. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the CAP was created. |
| `updatedAt` | `timestamp` | `notNull`, `defaultNow()`, `onUpdateNow()` | Timestamp of the last update. |

**Relationships:**

*   **One-to-One:** `DM-CAP` belongs to one `DM-INCIDENT`.

### 3.4. Activity Log (DM-ACTIVITY-LOG)

**Description:** Logs a resident's participation in social and recreational activities.

**Source:** `harmony_all_specs.md` -> `Connect` Agent -> `get_resident_activity_log` tool

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `residentId` | `int` | `notNull` | The ID of the resident. |
| `activityName` | `varchar(200)` | `notNull` | The name of the activity. |
| `activityTimestamp` | `timestamp` | `notNull` | The time the activity took place. |
| `staffNotes` | `text` | | Notes from staff about the resident's participation. |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the log entry was created. |

**Relationships:**

*   **Many-to-One:** `DM-ACTIVITY-LOG` belongs to one `DM-RESIDENT` (planned).

### 3.5. Family Visit (DM-FAMILY-VISIT)

**Description:** Represents a scheduled visit between a resident and their family.

**Source:** `harmony_all_specs.md` -> `Connect` Agent -> `schedule_family_visit` tool

**Fields:**

| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `int` | `autoincrement`, `primaryKey` | Surrogate primary key. |
| `residentId` | `int` | `notNull` | The ID of the resident. |
| `familyMemberId` | `int` | `notNull` | The ID of the family member. |
| `visitTimestamp` | `timestamp` | `notNull` | The scheduled time of the visit. |
| `visitType` | `varchar(50)` | `notNull` | The type of visit (e.g., 'in-person', 'video-call'). |
| `status` | `varchar(50)` | `notNull`, `default('scheduled')` | The status of the visit (e.g., 'scheduled', 'completed', 'cancelled'). |
| `createdAt` | `timestamp` | `notNull`, `defaultNow()` | Timestamp of when the visit was scheduled. |

**Relationships:**

*   **Many-to-One:** `DM-FAMILY-VISIT` belongs to one `DM-RESIDENT` (planned).

---

## 4. GAP Analysis

This section identifies gaps, conflicts, and risks discovered during the process of consolidating the data models.

*   **GAP-0001: Undefined `DM-RESIDENT` Model:** Several planned models, including `DM-INCIDENT`, `DM-CARE-PLAN`, `DM-ACTIVITY-LOG`, and `DM-FAMILY-VISIT`, have a required relationship with a `DM-RESIDENT` model. However, the `DM-RESIDENT` model itself is not defined in any of the source specifications. **Action:** A `TASK-MODELS-0001` must be created to define the `DM-RESIDENT` model, including fields for personal information, admission date, and current status.

*   **GAP-0002: Undefined `DM-FAMILY-MEMBER` Model:** The `DM-FAMILY-VISIT` model includes a `familyMemberId` field, which implies the existence of a `DM-FAMILY-MEMBER` model to store information about a resident's family contacts. This model is not defined. **Action:** A `TASK-MODELS-0002` must be created to define the `DM-FAMILY-MEMBER` model, linking it to the `DM-RESIDENT` model.

*   **GAP-0003: Undefined `DM-HR-RESOURCE` Model:** The `Pulse` agent specification includes a tool `get_hr_resource`, which retrieves information from an HR knowledge base. This implies the need for a `DM-HR-RESOURCE` model to store these resources (e.g., policies, wellness tips). This model is not defined. **Action:** A `TASK-MODELS-0003` must be created to define the `DM-HR-RESOURCE` model.

*   **GAP-0004: Undefined `DM-FACILITY-TOUR` Model:** The `Catalyst` agent specification includes a tool `schedule_facility_tour`, which creates a tour and returns a `tour_id`. This implies the need for a `DM-FACILITY-TOUR` model to store details about scheduled tours. This model is not defined. **Action:** A `TASK-MODELS-0004` must be created to define the `DM-FACILITY-TOUR` model.

*   **GAP-0005: Ambiguous Care Plan Versioning:** The `DM-CARE-PLAN` model includes a `version` field, but there is no explicit mechanism defined to link different versions of the same care plan together. This could make it difficult to retrieve the complete history of a resident's care plan. **Action:** A `TASK-MODELS-0005` should be created to clarify the relationship between `DM-CARE-PLAN` versions, perhaps by adding a `parentCarePlanId` field.

---
**END OF DOCUMENT**
