# HarmonyCare AI: Additional Agent Specifications

**Author:** Manus AI  
**Date:** November 28, 2025  
**Version:** 1.0

---

## Table of Contents

1. [Activities Coordinator (Enrichment Agent)](#1-activities-coordinator-enrichment-agent)
2. [Housekeeping Manager (Cleanliness Agent)](#2-housekeeping-manager-cleanliness-agent)
3. [Laundry Manager (Linen Services Agent)](#3-laundry-manager-linen-services-agent)
4. [Receptionist (Front Desk Agent)](#4-receptionist-front-desk-agent)
5. [Chef (Food Service Agent)](#5-chef-food-service-agent)

---

## 1. Activities Coordinator (Enrichment Agent)

**Purpose & Core Function:** To plan, organize, and promote a diverse calendar of social, recreational, and therapeutic activities that enhance resident quality of life and engagement.

**Framework & Runtime:** **LangGraph**, for managing the multi-step process of planning, scheduling, and gathering feedback on events.

### Key Responsibilities

*   Generates a monthly activity calendar based on resident interests, seasonal themes, and budget.
*   Manages resident sign-ups for activities with limited capacity.
*   Schedules entertainers, instructors, and volunteers for events.
*   Sends personalized activity recommendations and reminders to residents.
*   Collects and analyzes resident feedback on activities to improve future planning.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_resident_interests` | Retrieves a list of resident interests and past activity ratings. | `{}` | `{interests: List[InterestProfile]}` |
| `create_activity_event` | Creates a new event on the facility calendar. | `{title, description, date, time, location}` | `{event_id: string}` |
| `manage_event_signup` | Manages sign-ups for an event, including waitlists. | `{event_id: string, resident_id: string}` | `{status: string}` |
| `book_external_vendor` | Schedules and confirms an external vendor (e.g., musician). | `{vendor_id, date, time}` | `{booking_id: string}` |
| `collect_activity_feedback` | Sends a short survey to residents after an activity. | `{event_id: string}` | `{status: string}` |

### Example Workflow: Planning a Monthly Concert

1.  **Trigger:** The first of the month, for planning next month's calendar.
2.  **Activities Coordinator** reviews resident interests via `get_resident_interests` and notes a high interest in classical music.
3.  It calls `book_external_vendor` to schedule a local string quartet it has in its vendor list.
4.  Once the booking is confirmed, it calls `create_activity_event` to add the "Classical Afternoon Concert" to the calendar.
5.  A week before the event, it sends a notification to all residents who have expressed interest in music.
6.  After the concert, it calls `collect_activity_feedback` to survey attendees.
7.  **Output:** A popular event is successfully planned and executed, and feedback is gathered for future improvements.

### Success Metrics

*   **Primary:** 30% increase in resident participation in activities.
*   **Secondary:** 90% resident satisfaction score for facility activities.
*   **Tertiary:** 50% reduction in time spent by staff on activity planning and logistics.

---

## 2. Housekeeping Manager (Cleanliness Agent)

**Purpose & Core Function:** To manage and optimize all housekeeping operations, ensuring a clean, safe, and pleasant environment for residents and staff.

**Framework & Runtime:** **LangGraph**, for managing cleaning schedules, assignments, and quality control workflows.

### Key Responsibilities

*   Generates and assigns daily, weekly, and deep-cleaning schedules for all resident rooms and common areas.
*   Manages inventory of cleaning supplies and automates re-ordering.
*   Conducts virtual quality control inspections using a checklist-based system.
*   Assigns and tracks ad-hoc cleaning requests (e.g., spills).
*   Optimizes cleaning routes and assignments for maximum efficiency.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `generate_cleaning_schedule` | Creates a detailed cleaning schedule for a given period. | `{date_range: DateRange}` | `{schedule: CleaningSchedule}` |
| `assign_cleaning_task` | Assigns a specific cleaning task to a housekeeping staff member. | `{task_id, staff_id}` | `{assignment_id: string}` |
| `check_supply_inventory` | Checks the current level of a cleaning supply. | `{supply_name: string}` | `{quantity: int}` |
| `order_cleaning_supplies` | Places an order for cleaning supplies from an approved vendor. | `{items: List[OrderItem]}` | `{order_id: string}` |
| `log_qc_inspection` | Logs the results of a quality control inspection. | `{location, checklist_results}` | `{inspection_id: string}` |

### Example Workflow: Daily Room Cleaning Assignment

1.  **Trigger:** Runs every morning at 7 AM.
2.  **Housekeeping Manager** calls `generate_cleaning_schedule` for the day, which includes standard room cleanings and a deep clean for Room 301.
3.  It then calls `assign_cleaning_task` for each task, distributing the workload evenly among the available housekeeping staff.
4.  During the day, a spill is reported in the main dining room. A staff member creates an ad-hoc request.
5.  The agent receives the request and assigns it to the closest available housekeeper with a high priority.
6.  At the end of the day, the agent logs which rooms were cleaned and flags any that were missed.
7.  **Output:** All cleaning tasks are efficiently assigned and tracked, ensuring the facility remains clean and responding quickly to unexpected needs.

### Success Metrics

*   **Primary:** 95% or higher score on internal quality control inspections.
*   **Secondary:** 100% completion of scheduled cleaning tasks.
*   **Tertiary:** 20% reduction in cleaning supply costs through better inventory management.

---

## 3. Laundry Manager (Linen Services Agent)

**Purpose & Core Function:** To manage the entire laundry workflow, from collection and washing to folding and redistribution, ensuring residents always have clean linens and personal clothing.

**Framework & Runtime:** **LangGraph**, to track batches of laundry through a multi-step physical workflow.

### Key Responsibilities

*   Schedules the collection of soiled linens and personal clothing from resident rooms.
*   Tracks batches of laundry through the washing, drying, and folding process.
*   Manages inventory of facility linens (sheets, towels) and triggers re-orders when stock is low.
*   Ensures personal clothing is correctly sorted and returned to the right resident.
*   Monitors washing machine usage and schedules preventative maintenance.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `schedule_laundry_collection` | Creates a schedule for collecting laundry from rooms. | `{date: date}` | `{collection_schedule: Schedule}` |
| `track_laundry_batch` | Updates the status of a batch of laundry (e.g., "Washing", "Folding"). | `{batch_id: string, status: string}` | `{status: string}` |
| `check_linen_inventory` | Gets the current count of clean linens in stock. | `{item_type: string}` | `{count: int}` |
| `order_new_linens` | Orders new linens when stock falls below a threshold. | `{item_type: string, quantity: int}` | `{order_id: string}` |
| `match_personal_item` | Matches a personal clothing item to a resident using tags or labels. | `{item_tag_id: string}` | `{resident_id: string}` |

### Example Workflow: A Resident's Laundry Cycle

1.  **Trigger:** On a resident's designated laundry day, a task is created.
2.  **Laundry Manager** includes the resident's room on the daily collection schedule via `schedule_laundry_collection`.
3.  Staff collect the laundry, scan a barcode on the bag to create a new batch, and the agent calls `track_laundry_batch` to set the status to "Awaiting Wash".
4.  As the batch moves through each station (washing, drying, folding), staff scan the barcode, and the agent updates the status.
5.  During folding, a staff member finds a shirt with a specific tag. They use a handheld device to scan it, which calls `match_personal_item`.
6.  The tool returns the resident's name and room number, ensuring it's placed in the correct return basket.
7.  Once the entire batch is folded and sorted, its status is updated to "Ready for Delivery".
8.  **Output:** The resident's clean laundry is returned to them correctly, with its entire journey tracked and auditable.

### Success Metrics

*   **Primary:** 99.5% accuracy in returning personal clothing to the correct resident.
*   **Secondary:** Ensure a consistent supply of clean linens, with no stockouts.
*   **Tertiary:** 24-hour turnaround time for all resident laundry.

---

## 4. Receptionist (Front Desk Agent)

**Purpose & Core Function:** To manage front desk operations, including visitor check-in, call routing, and answering general inquiries, serving as the facility's friendly first point of contact.

**Framework & Runtime:** **LangGraph**, for handling conversational flows with visitors and routing inquiries to the correct department or person.

### Key Responsibilities

*   Manages the visitor check-in and check-out process, including printing visitor badges.
*   Answers incoming phone calls and routes them to the appropriate resident or staff member.
*   Answers general questions from visitors about the facility.
*   Accepts and logs package deliveries for residents and staff.
*   Monitors the main entrance and alerts security to any issues.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `check_in_visitor` | Logs a visitor's entry and prints a badge. | `{visitor_name, resident_to_visit}` | `{visitor_id: string}` |
| `route_phone_call` | Transfers an incoming call to the correct extension. | `{caller_id: string, requested_person: string}` | `{status: string}` |
| `find_staff_member` | Looks up a staff member's current status and location. | `{staff_name: string}` | `{staff_status: string}` |
| `log_package_delivery` | Logs a package delivery and notifies the recipient. | `{recipient_name: string, tracking_number: string}` | `{package_id: string}` |
| `alert_security` | Sends a high-priority alert to the security team. | `{reason: string}` | `{alert_id: string}` |

### Example Workflow: A Visitor Arrives

1.  **User Input (Visitor at Kiosk):** The visitor types their name and who they are there to see.
2.  **Receptionist** calls `check_in_visitor`, which logs the visit and prints a badge.
3.  It then sends a notification to the resident's in-room tablet: "Your guest, John Doe, has arrived and is waiting in the lobby."
4.  While waiting, the visitor asks the kiosk, "What time is dinner served?"
5.  The agent calls `get_facility_faq` with the query and responds, "Dinner service is from 5:30 PM to 7:00 PM in the main dining hall."
6.  When the visitor leaves, they scan their badge at the kiosk to check out.
7.  **Output:** A seamless and efficient visitor experience that enhances security and frees up human staff for more complex interactions.

### Success Metrics

*   **Primary:** 90% of visitors checked in within 2 minutes of arrival.
*   **Secondary:** Accurate, auditable log of all visitors to the facility.
*   **Tertiary:** 50% reduction in time staff spend answering routine phone calls.

---

## 5. Chef (Food Service Agent)

**Purpose & Core Function:** To assist the kitchen staff in daily food preparation and service, ensuring meals are prepared correctly, safely, and according to the planned menu and dietary requirements.

**Framework & Runtime:** **LangGraph**, to guide kitchen staff through complex recipes and multi-step food preparation workflows.

### Key Responsibilities

*   Provides step-by-step instructions for preparing meals from the weekly menu.
*   Generates customized preparation lists for special dietary versions of meals.
*   Manages food safety protocols, prompting staff to log temperatures and check for expired items.
*   Assists with plating and portion control to ensure consistency.
*   Coordinates timing between different kitchen stations to ensure all components of a meal are ready simultaneously.

### Required Tools

| Tool Name | Description | Input Schema | Output Schema |
|---|---|---|---|
| `get_recipe_steps` | Retrieves the step-by-step recipe for a menu item. | `{menu_item_id: string}` | `{steps: List[string]}` |
| `get_dietary_modifications` | Gets the required modifications for a recipe for specific diets. | `{menu_item_id: string}` | `{modifications: List[DietMod]}` |
| `log_food_temperature` | Logs a food temperature reading for HACCP compliance. | `{item_name: string, temperature: float}` | `{log_id: string}` |
| `check_inventory_expiration` | Checks for and flags expired items in the inventory. | `{}` | `{expired_items: List[Item]}` |
| `coordinate_meal_timing` | Calculates and displays the required start times for different meal components. | `{meal_id: string}` | `{timing_plan: dict}` |

### Example Workflow: Preparing Lunch

1.  **Trigger:** The head chef starts the "Lunch Service" workflow.
2.  **Chef** agent displays the day's menu. The head chef selects "Roast Chicken".
3.  The agent calls `get_recipe_steps` and displays the first step on a kitchen screen.
4.  It also calls `get_dietary_modifications` and displays a side-note: "Prepare 5 portions with no salt seasoning for low-sodium diets."
5.  Simultaneously, it calls `coordinate_meal_timing` and advises the vegetable station to start steaming the broccoli in 25 minutes.
6.  As the chicken comes out of the oven, the agent prompts, "Please check and log the internal temperature of the chicken."
7.  A staff member uses a probe and enters the temperature, which the agent logs via `log_food_temperature`.
8.  **Output:** A complex meal is prepared consistently and safely, with all dietary needs met and all compliance steps logged automatically.

### Success Metrics

*   **Primary:** 100% compliance with food safety (HACCP) logging requirements.
*   **Secondary:** 95% accuracy in preparing meals according to special dietary needs.
*   **Tertiary:** Improved consistency and quality of meals served.
