# HarmonyCare AI: Operational Agent Specifications

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## Table of Contents

1. [Nexus (Scheduling & Staffing Agent)](#1-nexus-scheduling--staffing-agent)
2. [HR Manager (Human Resources Agent)](#2-hr-manager-human-resources-agent)
3. [Maintenance Coordinator (Facilities Agent)](#3-maintenance-coordinator-facilities-agent)
4. [Nutrition Specialist (Dietary Agent)](#4-nutrition-specialist-dietary-agent)
5. [Transportation Manager (Logistics Agent)](#5-transportation-manager-logistics-agent)

---

## 1. Nexus (Scheduling & Staffing Agent)

**Purpose & Core Function:** To optimize staff scheduling to ensure regulatory compliance, meet resident care needs, and minimize labor costs, while also managing staff preferences and availability.

**Framework & Runtime:** **LangGraph**, as scheduling involves complex constraints, optimization, and potential negotiation (human-in-the-loop).

### Key Responsibilities

*   Generates draft schedules based on resident acuity, required staff-to-resident ratios, and staff availability.
*   Optimizes schedules to minimize overtime and agency staff usage.
*   Manages staff shift swap and time-off requests, automatically checking for coverage.
*   Identifies and flags potential scheduling gaps or compliance risks in real-time.
*   Notifies staff of their upcoming shifts and any changes to the schedule.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_staff_availability` | Retrieves staff availability, time-off requests, and preferences. | `{date_range: DateRange}` | `{availability_data: List[StaffAvailability]}` |
| `get_staffing_requirements` | Calculates the required number and type of staff per shift based on resident census and acuity. | `{date: date}` | `{requirements: Dict[shift, StaffingNeeds]}` |
| `optimize_schedule` | Runs an optimization algorithm to generate the most efficient schedule. | `{requirements, availability}` | `{draft_schedule: Schedule}` |
| `publish_schedule` | Publishes the final schedule and notifies all relevant staff members. | `{schedule: Schedule}` | `{status: string}` |
| `process_shift_swap_request` | Manages a shift swap request between two staff members, ensuring compliance. | `{requester_id, target_id, shift_date}` | `{is_approved: boolean, reason: string}` |

### Example Workflow: Creating the Weekly Schedule

1.  **Trigger:** Runs automatically every Tuesday for the following week.
2.  **Nexus** calls `get_staffing_requirements` for the upcoming week.
3.  It then calls `get_staff_availability` to gather all staff preferences and approved time off.
4.  The requirements and availability data are passed to the `optimize_schedule` tool.
5.  The tool returns a draft schedule that minimizes overtime and respects as many preferences as possible.
6.  **Nexus** reviews the draft. It finds one overnight shift is still uncovered.
7.  It identifies qualified, non-overtime staff and sends them a notification offering a bonus for picking up the shift.
8.  A staff member accepts. The schedule is now complete.
9.  **Nexus** calls `publish_schedule` to finalize and distribute the schedule.
10. **Output:** All staff receive their schedules for the next week via the app and email.

### Success Metrics

*   **Primary:** 95% of shifts filled without resorting to expensive agency staff.
*   **Secondary:** 50% reduction in time spent by managers on creating and managing schedules.
*   **Tertiary:** Maintain 100% compliance with mandated staff-to-resident ratios.

---

## 2. HR Manager (Human Resources Agent)

**Purpose & Core Function:** To automate routine HR tasks, from recruitment and onboarding to performance management and offboarding, ensuring a smooth employee lifecycle.

**Framework & Runtime:** **LangGraph**, to manage the long-running, multi-step processes inherent in HR workflows like hiring and performance reviews.

### Key Responsibilities

*   Screens new job applications based on predefined criteria.
*   Schedules interviews between qualified candidates and hiring managers.
*   Automates the onboarding process: sending offer letters, initiating background checks, and assigning first-day tasks.
*   Tracks employee performance review cycles and reminds managers when they are due.
*   Manages the offboarding process, creating a checklist of tasks for departing employees.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `screen_applications` | Filters new job applications against the job description's requirements. | `{job_id: string}` | `{shortlisted_candidates: List[Candidate]}` |
| `schedule_interview` | Finds a mutually available time and schedules an interview. | `{candidate_id, interviewer_ids}` | `{interview_slot: Datetime}` |
| `initiate_onboarding` | Kicks off the onboarding workflow for a new hire. | `{candidate_id: string}` | `{onboarding_id: string}` |
| `track_performance_review` | Checks the status of an employee's performance review cycle. | `{employee_id: string}` | `{status: string, due_date: date}` |
| `generate_offboarding_checklist` | Creates a personalized offboarding checklist for a departing employee. | `{employee_id: string}` | `{checklist: List[Task]}` |

### Example Workflow: Hiring a New Nurse

1.  **Trigger:** A new application is received for the "Registered Nurse" position.
2.  **HR Manager** calls `screen_applications` with the new applicant's data.
3.  The agent determines the candidate meets all minimum qualifications.
4.  It calls `schedule_interview`, providing the candidate's and the hiring manager's availability.
5.  An interview is scheduled, and calendar invites are sent.
6.  After the interview, the hiring manager provides positive feedback.
7.  **HR Manager** is prompted to proceed and calls `initiate_onboarding`.
8.  This tool sends the offer letter, and upon acceptance, triggers the background check and assigns onboarding tasks (e.g., "Complete HR paperwork," "Sign up for benefits").
9.  **Output:** The candidate is seamlessly moved from applicant to new hire in the system, with all initial steps automated.

### Success Metrics

*   **Primary:** 40% reduction in time-to-hire for new positions.
*   **Secondary:** 90% of new hire onboarding tasks completed before their first day.
*   **Tertiary:** Improved employee satisfaction with HR processes.

---

## 3. Maintenance Coordinator (Facilities Agent)

**Purpose & Core Function:** To manage the facility's physical assets, from preventative maintenance schedules to handling ad-hoc repair requests, ensuring a safe and functional environment.

**Framework & Runtime:** **LangGraph**, ideal for managing the lifecycle of a work order from creation to completion and verification.

### Key Responsibilities

*   Manages the preventative maintenance (PM) schedule for all critical equipment (HVAC, boilers, etc.).
*   Receives, prioritizes, and assigns incoming work orders from staff and residents.
*   Monitors the status of open work orders and sends reminders for overdue tasks.
*   Orders necessary parts and supplies from approved vendors.
*   Analyzes maintenance data to identify trends and predict equipment failure.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_pm_schedule` | Retrieves the preventative maintenance schedule for a given asset or date range. | `{asset_id: string}` | `{pm_tasks: List[PMTask]}` |
| `create_work_order` | Creates a new work order in the system. | `{description, location, priority}` | `{work_order_id: string}` |
| `assign_work_order` | Assigns a work order to the appropriate maintenance technician. | `{work_order_id, technician_id}` | `{status: string}` |
| `order_parts` | Orders parts from a vendor catalog. | `{part_number: string, quantity: int}` | `{order_id: string, eta: date}` |
| `analyze_asset_history` | Reviews the maintenance history of an asset to predict future issues. | `{asset_id: string}` | `{failure_prediction: string}` |

### Example Workflow: A Resident Reports a Leaky Faucet

1.  **User Input:** A staff member uses the app: "Faucet in Room 204 is dripping."
2.  **Maintenance Coordinator** receives the request and calls `create_work_order` with the details.
3.  It assesses the priority as "Medium" and calls `assign_work_order` to assign it to the on-duty technician.
4.  The technician accepts the work order and inspects the faucet. They determine a specific washer is needed.
5.  The technician updates the work order. **Maintenance Coordinator** sees the update and calls `order_parts`.
6.  The part is ordered. The agent updates the work order with the part's ETA.
7.  When the part arrives, the agent notifies the technician, who then completes the repair.
8.  **Output:** The work order is closed, and the reporting staff member is notified that the issue is resolved.

### Success Metrics

*   **Primary:** 95% completion of scheduled preventative maintenance tasks on time.
*   **Secondary:** 30% reduction in emergency repair requests due to better preventative care.
*   **Tertiary:** Improved resident satisfaction with facility upkeep.

---

## 4. Nutrition Specialist (Dietary Agent)

**Purpose & Core Function:** To assist in planning nutritious and appealing menus that cater to the diverse dietary needs and preferences of all residents.

**Framework & Runtime:** **LangGraph**, as menu planning involves balancing multiple constraints (nutrition, cost, preference, allergies).

### Key Responsibilities

*   Generates weekly menu plans that meet nutritional guidelines and budget constraints.
*   Manages a database of resident dietary restrictions, allergies, and preferences.
*   Generates personalized meal plans for residents with specific needs (e.g., diabetic, low-sodium).
*   Assists with inventory management by generating shopping lists based on menu plans.
*   Analyzes resident feedback on meals to suggest improvements to the menu.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_resident_dietary_needs` | Retrieves all dietary restrictions and preferences for residents. | `{resident_ids: List[string]}` | `{dietary_profiles: List[Profile]}` |
| `generate_menu_plan` | Creates a draft weekly menu based on nutritional targets and food costs. | `{nutritional_targets, budget}` | `{menu_plan: Menu}` |
| `validate_menu_against_diets` | Checks a menu plan against all resident dietary restrictions. | `{menu_plan: Menu, dietary_profiles}` | `{conflicts: List[Conflict]}` |
| `create_shopping_list` | Generates a consolidated shopping list for a given menu plan. | `{menu_plan: Menu}` | `{shopping_list: List[Item]}` |
| `get_meal_feedback` | Retrieves resident feedback scores for past meals. | `{date_range: DateRange}` | `{feedback_data: List[Feedback]}` |

### Example Workflow: Planning Next Week's Menu

1.  **Trigger:** Runs automatically every Wednesday.
2.  **Nutrition Specialist** calls `get_resident_dietary_needs` for all current residents.
3.  It calls `generate_menu_plan` with the facility's nutritional and budget targets.
4.  The draft menu is then passed to `validate_menu_against_diets`.
5.  The tool returns a conflict: "Friday's fish dish contains nuts, and 3 residents have nut allergies."
6.  **Nutrition Specialist** finds a nut-free alternative recipe and updates the menu.
7.  It re-validates the menu. This time, there are no conflicts.
8.  The agent then calls `create_shopping_list` to generate the grocery order for the kitchen.
9.  **Output:** A compliant, nutritionally balanced menu and a complete shopping list are sent to the head chef.

### Success Metrics

*   **Primary:** 100% compliance with all resident dietary restrictions.
*   **Secondary:** 15% reduction in food waste through better planning.
*   **Tertiary:** 20% improvement in resident satisfaction scores for food quality.

---

## 5. Transportation Manager (Logistics Agent)

**Purpose & Core Function:** To manage and optimize the facility's transportation services, ensuring residents can safely and efficiently get to appointments and activities.

**Framework & Runtime:** **LangGraph**, for handling the multi-step, constraint-based problem of scheduling vehicles and drivers.

### Key Responsibilities

*   Manages resident requests for transportation to medical appointments, shopping, etc.
*   Creates optimized daily routes for facility vehicles to minimize travel time and fuel costs.
*   Schedules drivers and vehicles, ensuring proper vehicle type (e.g., wheelchair accessible) is assigned.
*   Monitors vehicle maintenance schedules and flags when service is due.
*   Communicates schedules and any delays to residents and staff.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_transport_requests` | Retrieves all pending transportation requests for a given day. | `{date: date}` | `{requests: List[TransportRequest]}` |
| `optimize_routes` | Calculates the most efficient multi-stop routes for all requests. | `{requests: List, vehicle_capacity: int}` | `{routes: List[Route]}` |
| `assign_driver_and_vehicle` | Assigns a specific driver and vehicle to a calculated route. | `{route: Route}` | `{assignment_id: string}` |
| `get_vehicle_maintenance_status` | Checks the maintenance status and schedule for a vehicle. | `{vehicle_id: string}` | `{status: string}` |
| `notify_resident_of_pickup` | Sends a notification to a resident with their pickup time. | `{resident_id, pickup_time}` | `{status: string}` |

### Example Workflow: Scheduling Tomorrow's Appointments

1.  **Trigger:** Runs daily at 5 PM for the next day's schedule.
2.  **Transportation Manager** calls `get_transport_requests` for the following day.
3.  It groups the requests by geographic area and vehicle type needed.
4.  It passes the list of requests to `optimize_routes`.
5.  The tool returns two optimized routes, one for the wheelchair-accessible van and one for the sedan.
6.  The agent then calls `assign_driver_and_vehicle` for each route, selecting available drivers.
7.  For each request in the finalized routes, it calls `notify_resident_of_pickup` to confirm the time.
8.  **Output:** All residents with appointments receive a confirmation, and the drivers receive their route and schedule for the next day.

### Success Metrics

*   **Primary:** 25% reduction in vehicle mileage and fuel costs.
*   **Secondary:** Fulfill 98% of all transportation requests.
*   **Tertiary:** Improved resident satisfaction with the timeliness and reliability of transport services.
