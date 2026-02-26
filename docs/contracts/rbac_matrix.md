# RBAC Matrix — Harmony AI-Native Care Management Platform

> **Document ID:** CONTRACT-RBAC-001  
> **Version:** 1.0.0  
> **Generated:** 2026-02-25 (Blueprint Forge OS)  
> **Mode:** CONSOLIDATE  

---

## 1. Role Definitions

| Role ID | Role Name | Description | Scope | Auth Required |
|---------|-----------|-------------|-------|---------------|
| R-OWNER | OWNER | Platform owner / super-admin. Full system access. | Global | Yes (OAuth + role check) |
| R-ADMIN | ADMIN | Facility administrator. Manages facility operations, staff, residents. | Facility-level | Yes (OAuth + role check) |
| R-CARE-MGR | CARE_MANAGER | Supervises care delivery, creates care plans, reviews documentation. | Facility-level | Yes (OAuth + role check) |
| R-DIRECT-CARE | DIRECT_CARE_STAFF | Provides hands-on resident care, documents activities, administers medications. | Assigned-residents | Yes (OAuth + role check) |
| R-FAMILY | FAMILY_MEMBER | Views resident updates, communicates with staff, reviews care plans. | Linked-resident(s) | Yes (OAuth + role check) |
| R-AUDITOR | AUDITOR | Read-only access to compliance records, audit trails, reports. | Facility-level (read-only) | Yes (OAuth + role check) |
| R-ANON | ANONYMOUS | Unauthenticated visitor. Marketing site, blog, public resources only. | Public pages only | No |

---

## 2. Role Hierarchy

```
R-OWNER
  └── R-ADMIN
        ├── R-CARE-MGR
        │     └── R-DIRECT-CARE
        ├── R-AUDITOR
        └── R-FAMILY (no inheritance — isolated)
```

**Inheritance Rules:**
- R-OWNER inherits all R-ADMIN permissions
- R-ADMIN inherits all R-CARE-MGR permissions
- R-CARE-MGR inherits all R-DIRECT-CARE permissions
- R-AUDITOR has read-only access — no inheritance from care roles
- R-FAMILY is isolated — no inheritance, scoped to linked resident(s) only
- R-ANON has no inheritance — public pages only

---

## 3. Data Isolation Rules

| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| ISO-001 | Facility-level isolation: R-ADMIN, R-CARE-MGR, R-DIRECT-CARE, R-AUDITOR see only data from their assigned facility | `ctx.user.facilityId` filter on all queries |
| ISO-002 | Resident-level isolation: R-DIRECT-CARE sees only assigned residents | `ctx.user.assignedResidentIds` filter |
| ISO-003 | Family isolation: R-FAMILY sees only linked resident(s) data | `ctx.user.linkedResidentIds` filter |
| ISO-004 | Multi-facility: R-OWNER sees all facilities | No facility filter applied |
| ISO-005 | PHI field-level: SSN, DOB, medical records require R-CARE-MGR+ or explicit grant | Field-level middleware |
| ISO-006 | PII field-level: Email, phone, address visible to R-ADMIN+ and R-FAMILY (own data) | Field-level middleware |

---

## 4. Permission Matrix — tRPC Procedures

### 4.1 Authentication & System

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| auth.me | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ❌ |
| auth.logout | ✅ X | ✅ X | ✅ X | ✅ X | ✅ X | ✅ X | ❌ |
| system.notifyOwner | ✅ X | ✅ X | ❌ | ❌ | ❌ | ❌ | ❌ |

### 4.2 Signup & Referral (Marketing Site)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| signup.create | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C |
| referral.validate | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R |
| referral.create | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ❌ |
| referral.analytics | ✅ R | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| referral.milestones | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ❌ | ❌ |

### 4.3 Lead Management & Marketing

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| calculator.submit | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C |
| adminCalculatorLeads.list | ✅ R | ✅ R | ❌ | ❌ | ❌ | ❌ | ❌ |
| adminCalculatorLeads.export | ✅ E | ✅ E | ❌ | ❌ | ❌ | ❌ | ❌ |
| leadMagnets.list | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R |
| leadMagnets.download | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R | ✅ R |
| newsletter.subscribe | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C |
| newsletter.unsubscribe | ✅ D | ✅ D | ✅ D | ✅ D | ✅ D | ✅ D | ✅ D |

### 4.4 Email Engagement

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| emailEngagement.trackOpen | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C |
| emailEngagement.trackClick | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C | ✅ C |
| emailEngagement.analytics | ✅ R | ✅ R | ❌ | ❌ | ❌ | ❌ | ❌ |

### 4.5 Admin Operations

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| admin.analytics | ✅ R | ✅ R | ❌ | ❌ | ❌ | ✅ R | ❌ |
| admin.manageUsers | ✅ CRUD | ✅ CRUD | ❌ | ❌ | ❌ | ❌ | ❌ |
| admin.manageResources | ✅ CRUD | ✅ CRUD | ❌ | ❌ | ❌ | ❌ | ❌ |
| admin.systemConfig | ✅ CRUD | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| fileUpload.upload | ✅ C | ✅ C | ✅ C | ✅ C | ❌ | ❌ | ❌ |
| fileUpload.list | ✅ R | ✅ R | ✅ R | ✅ R | ❌ | ✅ R | ❌ |

### 4.6 Resident Management (Planned — MOD-RESIDENT)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| resident.create | ✅ C | ✅ C | ❌ | ❌ | ❌ | ❌ | ❌ |
| resident.read | ✅ R | ✅ R | ✅ R | ✅ R* | ✅ R* | ✅ R | ❌ |
| resident.update | ✅ U | ✅ U | ✅ U | ❌ | ❌ | ❌ | ❌ |
| resident.delete | ✅ D | ✅ D | ❌ | ❌ | ❌ | ❌ | ❌ |
| resident.timeline | ✅ R | ✅ R | ✅ R | ✅ R* | ✅ R* | ✅ R | ❌ |
| resident.assessment | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CR* | ❌ | ✅ R | ❌ |

> `*` = Scoped to assigned/linked residents only (ISO-002, ISO-003)

### 4.7 Care Plans & Documentation (Planned — MOD-CARE-PLAN)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| carePlan.create | ✅ C | ✅ C | ✅ C | ❌ | ❌ | ❌ | ❌ |
| carePlan.read | ✅ R | ✅ R | ✅ R | ✅ R* | ✅ R* | ✅ R | ❌ |
| carePlan.update | ✅ U | ✅ U | ✅ U | ❌ | ❌ | ❌ | ❌ |
| carePlan.approve | ✅ X | ✅ X | ✅ X | ❌ | ❌ | ❌ | ❌ |
| progressNote.create | ✅ C | ✅ C | ✅ C | ✅ C* | ❌ | ❌ | ❌ |
| progressNote.read | ✅ R | ✅ R | ✅ R | ✅ R* | ✅ R* | ✅ R | ❌ |

### 4.8 Medication Management (Planned — MOD-MEDICATION)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| medication.prescribe | ✅ C | ✅ C | ✅ C | ❌ | ❌ | ❌ | ❌ |
| medication.administer | ✅ X | ✅ X | ✅ X | ✅ X* | ❌ | ❌ | ❌ |
| medication.history | ✅ R | ✅ R | ✅ R | ✅ R* | ✅ R* | ✅ R | ❌ |
| medication.alerts | ✅ R | ✅ R | ✅ R | ✅ R* | ❌ | ❌ | ❌ |

### 4.9 AI Agent Operations (Planned — MOD-AGENTS-*)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| agent.docubot.transcribe | ✅ X | ✅ X | ✅ X | ✅ X* | ❌ | ❌ | ❌ |
| agent.docubot.generateNote | ✅ X | ✅ X | ✅ X | ✅ X* | ❌ | ❌ | ❌ |
| agent.sentinel.getAlerts | ✅ R | ✅ R | ✅ R | ✅ R* | ❌ | ❌ | ❌ |
| agent.sentinel.analyze | ✅ X | ✅ X | ✅ X | ❌ | ❌ | ❌ | ❌ |
| agent.guardian.auditReport | ✅ R | ✅ R | ❌ | ❌ | ❌ | ✅ R | ❌ |
| agent.guardian.complianceCheck | ✅ X | ✅ X | ✅ X | ❌ | ❌ | ✅ R | ❌ |
| agent.nexus.optimizeSchedule | ✅ X | ✅ X | ✅ X | ❌ | ❌ | ❌ | ❌ |
| agent.nexus.getSchedule | ✅ R | ✅ R | ✅ R | ✅ R* | ❌ | ❌ | ❌ |
| agent.compass.generatePlan | ✅ X | ✅ X | ✅ X | ❌ | ❌ | ❌ | ❌ |
| agent.compass.insights | ✅ R | ✅ R | ✅ R | ❌ | ❌ | ✅ R | ❌ |
| agent.config | ✅ CRUD | ✅ CRUD | ❌ | ❌ | ❌ | ❌ | ❌ |
| agent.executionLog | ✅ R | ✅ R | ✅ R | ❌ | ❌ | ✅ R | ❌ |

### 4.10 Compliance & Audit (Planned — MOD-COMPLIANCE-ENGINE)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| compliance.dashboard | ✅ R | ✅ R | ✅ R | ❌ | ❌ | ✅ R | ❌ |
| compliance.generateReport | ✅ X | ✅ X | ❌ | ❌ | ❌ | ✅ R | ❌ |
| compliance.alerts | ✅ R | ✅ R | ✅ R | ❌ | ❌ | ✅ R | ❌ |
| compliance.acknowledgeAlert | ✅ U | ✅ U | ✅ U | ❌ | ❌ | ❌ | ❌ |
| audit.trail | ✅ R | ✅ R | ❌ | ❌ | ❌ | ✅ R | ❌ |
| audit.export | ✅ E | ✅ E | ❌ | ❌ | ❌ | ✅ E | ❌ |

### 4.11 Family Portal (Planned — MOD-FAMILY-PORTAL)

| Procedure | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|-----------|---------|---------|------------|----------------|----------|-----------|--------|
| familyPortal.updates | ✅ R | ✅ R | ✅ R | ❌ | ✅ R* | ❌ | ❌ |
| familyPortal.messages | ✅ CRUD | ✅ CRUD | ✅ CRUD | ✅ CR* | ✅ CR* | ❌ | ❌ |
| familyPortal.photos | ✅ CRUD | ✅ CRUD | ✅ CR | ✅ CR* | ✅ R* | ❌ | ❌ |
| familyPortal.visitSchedule | ✅ CRUD | ✅ CRUD | ✅ R | ❌ | ✅ CRUD* | ❌ | ❌ |

---

## 5. Permission Matrix — UI Pages

| Page (SCR-*) | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR | R-ANON |
|--------------|---------|---------|------------|----------------|----------|-----------|--------|
| SCR-HOME | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-ABOUT | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-PRICING | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-BLOG | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-AGENTS | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-DEMO | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-RESOURCES | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-SIGNUP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| SCR-REFERRALS | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| SCR-EMAIL-ENGAGEMENT | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SCR-ADMIN | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SCR-ADMIN-CALCULATOR-LEADS | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SCR-ADMIN-RESOURCES | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SCR-DASHBOARD (planned) | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| SCR-VOICE-DOC (planned) | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| SCR-COMPLIANCE-CENTER (planned) | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| SCR-RESIDENT-TIMELINE (planned) | ✅ | ✅ | ✅ | ✅* | ✅* | ✅ | ❌ |
| SCR-FAMILY-PORTAL (planned) | ✅ | ✅ | ✅ | ❌ | ✅* | ❌ | ❌ |
| SCR-AGENT-CONFIG (planned) | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Permission Matrix — Data Models (Field-Level PHI/PII)

### 6.1 DM-RESIDENT — PHI Fields

| Field | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR |
|-------|---------|---------|------------|----------------|----------|-----------|
| fullName | ✅ | ✅ | ✅ | ✅* | ✅* | ✅ |
| dateOfBirth | ✅ | ✅ | ✅ | ✅* | ✅* | ✅ |
| ssn | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| medicalRecordNumber | ✅ | ✅ | ✅ | ✅* | ❌ | ✅ |
| diagnoses | ✅ | ✅ | ✅ | ✅* | ❌ | ✅ |
| medications | ✅ | ✅ | ✅ | ✅* | ✅* (names only) | ✅ |
| allergies | ✅ | ✅ | ✅ | ✅* | ✅* | ✅ |
| emergencyContacts | ✅ | ✅ | ✅ | ✅* | ✅* | ❌ |
| insuranceInfo | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| advanceDirectives | ✅ | ✅ | ✅ | ✅* | ✅* | ✅ |

### 6.2 DM-USER — PII Fields

| Field | R-OWNER | R-ADMIN | R-CARE-MGR | R-DIRECT-CARE | R-FAMILY | R-AUDITOR |
|-------|---------|---------|------------|----------------|----------|-----------|
| email | ✅ | ✅ | Self only | Self only | Self only | ❌ |
| phone | ✅ | ✅ | Self only | Self only | Self only | ❌ |
| address | ✅ | ✅ | Self only | Self only | Self only | ❌ |
| role | ✅ | ✅ R | Self R | Self R | Self R | Self R |

---

## 7. HIPAA Compliance Requirements

| Requirement ID | Requirement | Implementation |
|---------------|-------------|----------------|
| REQ-SEC-0001 | All PHI must be encrypted at rest | AES-256 encryption on database columns containing PHI |
| REQ-SEC-0002 | All PHI must be encrypted in transit | TLS 1.3 enforced on all connections |
| REQ-SEC-0003 | Access to PHI must be logged | Audit trail table records all PHI access with user, timestamp, action, fields |
| REQ-SEC-0004 | Minimum necessary access | Field-level access control per RBAC matrix above |
| REQ-SEC-0005 | Business Associate Agreements | Required for all third-party integrations (LLM providers, S3, email) |
| REQ-SEC-0006 | Breach notification within 60 days | Automated breach detection + notification workflow |
| REQ-SEC-0007 | Patient right to access records | Family portal provides read access to linked resident data |
| REQ-SEC-0008 | Automatic session timeout | 30-minute idle timeout for all authenticated sessions |
| REQ-SEC-0009 | Unique user identification | OAuth-based unique openId per user |
| REQ-SEC-0010 | Emergency access procedure | Break-glass procedure for R-ADMIN with full audit logging |

---

## 8. Permission Legend

| Symbol | Meaning |
|--------|---------|
| ✅ C | Create |
| ✅ R | Read |
| ✅ U | Update |
| ✅ D | Delete |
| ✅ X | Execute (trigger action) |
| ✅ E | Export |
| ✅ CRUD | Full access (Create, Read, Update, Delete) |
| ✅ CR | Create + Read |
| ❌ | No access |
| `*` | Scoped to assigned/linked records only |

---

## 9. Cross-References

| This Document | References |
|---------------|------------|
| REQ-SEC-0001 through REQ-SEC-0010 | → SSOT.md, traceability_matrix.md |
| R-OWNER through R-ANON | → system_blueprint.md §6 Security |
| ISO-001 through ISO-006 | → domain_models.md, system_blueprint.md |
| All procedure permissions | → openapi.yaml, SSOT.md §6 Interface Contracts |
| PHI/PII field access | → domain_models.md DM-RESIDENT, DM-USER |
| Page access | → ui_contracts.md SCR-* definitions |

---

## 10. GAP Items

| GAP ID | Description | Priority | Proposed Resolution |
|--------|-------------|----------|---------------------|
| GAP-RBAC-001 | No field-level access control middleware exists yet | HIGH | Implement Drizzle middleware that filters fields based on `ctx.user.role` |
| GAP-RBAC-002 | No audit trail table for PHI access logging | HIGH | Create `audit_log` table in schema, add tRPC middleware |
| GAP-RBAC-003 | No facility-level data isolation implemented | HIGH | Add `facilityId` to user context, enforce in all queries |
| GAP-RBAC-004 | No break-glass emergency access procedure | MEDIUM | Implement elevated access workflow with dual-approval |
| GAP-RBAC-005 | No session timeout enforcement | MEDIUM | Add idle timeout middleware to Express |
| GAP-RBAC-006 | R-CARE-MGR and R-DIRECT-CARE roles not in schema enum | HIGH | Extend `role` enum in drizzle/schema.ts |
