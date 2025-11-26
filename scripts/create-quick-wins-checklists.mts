/**
 * Script to create Quick Wins PDF checklists for exit-intent popups
 * 
 * This script generates 5 category-specific quick wins checklists:
 * 1. Compliance Quick Wins
 * 2. Staffing Quick Wins
 * 3. Financial Quick Wins
 * 4. Medication Safety Quick Wins
 * 5. Person-Centered Care Quick Wins
 */

import { getDb } from '../server/db.js';
import { leadMagnets } from '../drizzle/schema.js';
import { storagePut } from '../server/storage.js';

const QUICK_WINS_DATA = [
  {
    title: 'Compliance Quick Wins Checklist',
    description: '5 immediate actions to reduce violations by 20% in 30 days. Proven strategies from facilities that passed their surveys with zero deficiencies.',
    category: 'compliance',
    content: `# Compliance Quick Wins Checklist

## 5 Immediate Actions to Reduce Violations by 20% in 30 Days

### Quick Win #1: Daily Documentation Spot Checks (Week 1)
**Action:** Implement 10-minute daily reviews of 3 random resident files
**Impact:** Catch 80% of documentation errors before surveyors do
**How to do it:**
- Set a daily 10am calendar reminder
- Review 3 random files each day
- Check for: signatures, dates, care plan updates
- Create a simple checklist template
- Track common errors and address patterns

### Quick Win #2: Staff Compliance Training Refresh (Week 1-2)
**Action:** 15-minute weekly huddles on one compliance topic
**Impact:** Reduce staff-related violations by 35%
**Topics to cover:**
- Week 1: Proper documentation standards
- Week 2: Medication administration protocols
- Week 3: Incident reporting requirements
- Week 4: Privacy and confidentiality rules

### Quick Win #3: Medication Administration Record (MAR) Audit (Week 2)
**Action:** Review all MARs for the past 30 days
**Impact:** Eliminate medication documentation errors
**Focus areas:**
- Missing signatures or initials
- Unclear or missing times
- PRN medication justifications
- Discontinued medication removal
- Allergies documentation

### Quick Win #4: Environment Safety Walk-Through (Week 3)
**Action:** 30-minute facility safety inspection
**Impact:** Identify and fix 90% of safety violations before survey
**Checklist:**
- Fire extinguishers accessible and current
- Exit signs illuminated
- Hallways clear of obstacles
- Handrails secure
- Emergency lighting functional
- First aid kits stocked

### Quick Win #5: Individual Service Plan (ISP) Review (Week 4)
**Action:** Verify all ISPs are current and person-centered
**Impact:** Pass active treatment requirements with confidence
**Review points:**
- ISPs updated within required timeframes
- Goals are measurable and achievable
- Family/guardian involvement documented
- Progress notes align with ISP goals
- Staff signatures complete

## Bonus Quick Win: Create a Survey-Ready Binder
Organize these documents in one place:
- Current licenses and certifications
- Staff training records (past 12 months)
- Medication administration policies
- Emergency procedures
- Incident reports (past 6 months)
- Quality assurance meeting minutes

## Track Your Progress
Use this 30-day tracker:
- Week 1: Daily spot checks + Staff training #1
- Week 2: MAR audit + Staff training #2
- Week 3: Safety walk-through + Staff training #3
- Week 4: ISP review + Staff training #4

## Expected Results After 30 Days
✓ 20% reduction in documentation errors
✓ 35% reduction in staff-related violations
✓ Zero medication documentation errors
✓ 90% of safety issues resolved
✓ 100% ISP compliance

---
**Need help implementing these quick wins?** Schedule a free consultation at harmony.care/demo`
  },
  {
    title: 'Staffing Quick Wins Checklist',
    description: '3 proven tactics to reduce overtime costs by 15% this month. Implemented by facilities that cut overtime budgets by $48K annually.',
    category: 'staffing',
    content: `# Staffing Quick Wins Checklist

## 3 Proven Tactics to Reduce Overtime by 15% This Month

### Quick Win #1: Optimize Your Schedule Template (Days 1-7)
**Action:** Analyze and rebuild your base schedule
**Impact:** Reduce overtime by 8-12% immediately
**Step-by-step:**
1. Pull overtime reports from past 90 days
2. Identify peak overtime days/shifts
3. Adjust base schedule to cover high-demand periods
4. Add 1-2 "flex" shifts during peak times
5. Implement the new schedule next week

**Pro Tip:** Most overtime happens on weekends and evenings. Add permanent weekend coverage instead of relying on overtime.

### Quick Win #2: Create an On-Call Backup List (Days 8-14)
**Action:** Build a reliable call-in coverage system
**Impact:** Cut emergency overtime by 40%
**How to build it:**
1. Survey staff for preferred on-call days
2. Offer incentives (extra $2/hr for on-call shifts)
3. Create a rotating on-call schedule
4. Maintain a backup list of 5-7 reliable staff
5. Text/call in priority order when coverage needed

**Incentive Ideas:**
- $50 bonus for accepting last-minute shift
- First choice of vacation days
- Flexible scheduling preferences
- Recognition in team meetings

### Quick Win #3: Implement a Shift-Swap System (Days 15-30)
**Action:** Let staff trade shifts without manager approval
**Impact:** Reduce call-ins by 30% and improve satisfaction
**Setup process:**
1. Create simple shift-swap request form
2. Set clear rules (24-hour notice, same qualification level)
3. Use group text or app for shift-swap requests
4. Manager reviews and approves within 2 hours
5. Track swaps to ensure fairness

**Rules for Success:**
- Both staff must be qualified for the position
- Swap must be submitted 24 hours in advance
- Maximum 2 swaps per person per month
- No swaps during probationary period
- Manager has final approval

## Bonus Quick Win: Staff Satisfaction Check-In
**Why it matters:** Happy staff = fewer call-ins and resignations

**5-minute monthly check-ins:**
- "What's working well with the schedule?"
- "What would make your job easier?"
- "Any concerns about coverage or workload?"
- "How can we support you better?"

**Common fixes that reduce overtime:**
- More consistent schedules
- Better break coverage
- Improved communication
- Recognition for reliability

## 30-Day Implementation Timeline

**Week 1:** Analyze overtime data + Build new schedule template
**Week 2:** Implement new schedule + Create on-call backup list
**Week 3:** Launch shift-swap system + Train staff
**Week 4:** Monitor results + Conduct satisfaction check-ins

## Track Your Savings

**Before Implementation:**
- Average weekly overtime hours: _______
- Average weekly overtime cost: $_______
- Monthly overtime budget: $_______

**After 30 Days:**
- New weekly overtime hours: _______
- New weekly overtime cost: $_______
- Monthly savings: $_______

## Expected Results After 30 Days
✓ 15% reduction in overtime costs
✓ 30% fewer call-ins
✓ 40% less emergency overtime
✓ Improved staff satisfaction scores
✓ More predictable scheduling

---
**Want to reduce overtime by 35%?** Get the full Staffing Optimization Guide at harmony.care/resources`
  },
  {
    title: 'Financial Quick Wins Checklist',
    description: 'Find $10K+ in hidden savings in 30 days. Cost-cutting strategies that don\'t compromise care quality.',
    category: 'financial',
    content: `# Financial Quick Wins Checklist

## Find $10K+ in Hidden Savings in 30 Days

### Quick Win #1: Audit Supply Spending (Week 1)
**Action:** Review and optimize supply purchases
**Potential Savings:** $2,000-$5,000/month
**How to do it:**
1. Pull supply invoices from past 3 months
2. Identify top 20 most expensive items
3. Get quotes from 2-3 alternative vendors
4. Negotiate bulk discounts with current vendors
5. Switch to generic brands where appropriate

**Common Savings Opportunities:**
- Medical supplies: 15-25% savings with bulk orders
- Cleaning supplies: 20% savings with generic brands
- Food costs: 10-15% with better vendor negotiations
- Office supplies: 30% savings buying in bulk

### Quick Win #2: Reduce Utility Costs (Week 2)
**Action:** Implement energy-saving measures
**Potential Savings:** $500-$1,500/month
**Quick fixes:**
1. Install programmable thermostats ($200 investment, $100/month savings)
2. Switch to LED bulbs ($300 investment, $75/month savings)
3. Fix water leaks ($0-$500, save $50-$200/month)
4. Adjust water heater temperature to 120°F
5. Use power strips to eliminate phantom power drain

**Bigger Savings (if budget allows):**
- Energy audit ($500, identifies $200+/month in savings)
- High-efficiency HVAC ($5K-$15K, save $300-$500/month)
- Solar panels (varies, save 20-40% on electric bills)

### Quick Win #3: Optimize Staffing Costs (Week 3)
**Action:** Reduce overtime and agency staffing
**Potential Savings:** $3,000-$8,000/month
**Strategies:**
1. Implement overtime reduction tactics (see Staffing Quick Wins)
2. Reduce agency staffing by 50% (hire 1-2 permanent staff)
3. Cross-train staff to cover multiple positions
4. Offer retention bonuses instead of hiring bonuses
5. Improve scheduling efficiency

**Cost Comparison:**
- Agency nurse: $60-$80/hour
- Permanent nurse with overtime: $40-$50/hour
- Permanent nurse regular time: $28-$35/hour
**Savings from reducing 40 hours/month of agency staffing: $1,200-$1,800**

### Quick Win #4: Eliminate Waste (Week 4)
**Action:** Identify and reduce operational waste
**Potential Savings:** $1,000-$3,000/month
**Areas to audit:**
1. Food waste (portion control, better meal planning)
2. Medical supply waste (proper storage, expiration tracking)
3. Medication waste (accurate ordering, proper disposal)
4. Paper waste (go digital where possible)
5. Water waste (fix leaks, efficient fixtures)

**Quick Wins:**
- Reduce food waste by 20%: Save $300-$800/month
- Better medication ordering: Save $200-$500/month
- Digital documentation: Save $100-$300/month on paper
- Fix water leaks: Save $50-$200/month

### Quick Win #5: Renegotiate Service Contracts (Week 4)
**Action:** Review and renegotiate vendor contracts
**Potential Savings:** $500-$2,000/month
**Contracts to review:**
1. Waste management (get 2-3 competing quotes)
2. Landscaping/snow removal (negotiate or DIY)
3. Pest control (annual contract vs. as-needed)
4. Laundry service (in-house vs. outsourced analysis)
5. Phone/internet (bundle services, negotiate rates)

**Negotiation Tips:**
- Get 3 quotes for every service
- Ask for loyalty discounts from current vendors
- Bundle services for better rates
- Commit to longer contracts for lower monthly costs
- Review contracts annually

## 30-Day Savings Tracker

| Category | Current Cost | New Cost | Monthly Savings |
|----------|-------------|----------|-----------------|
| Supplies | $_______ | $_______ | $_______ |
| Utilities | $_______ | $_______ | $_______ |
| Staffing | $_______ | $_______ | $_______ |
| Waste Reduction | $_______ | $_______ | $_______ |
| Service Contracts | $_______ | $_______ | $_______ |
| **TOTAL** | **$_______** | **$_______** | **$_______** |

## Expected Results After 30 Days
✓ $10,000+ in identified savings
✓ $3,000-$5,000 in immediate monthly savings
✓ $6,000-$10,000 in savings after full implementation
✓ Annual savings projection: $72,000-$120,000

## Bonus: ROI Calculator
**Investment required:** $500-$1,000 (thermostats, LED bulbs, audit time)
**Monthly savings:** $6,000-$10,000
**ROI:** 600-2000% in first month
**Annual ROI:** 7,200-12,000%

---
**Want to save $127K annually?** Get the complete Financial Optimization Guide at harmony.care/resources`
  },
  {
    title: 'Medication Safety Quick Wins Checklist',
    description: 'Eliminate common medication errors in 30 days. Safety protocols that reduce liability and improve resident outcomes.',
    category: 'medication',
    content: `# Medication Safety Quick Wins Checklist

## Eliminate Common Medication Errors in 30 Days

### Quick Win #1: Implement the 5 Rights Check (Week 1)
**Action:** Train all staff on the 5 Rights of Medication Administration
**Impact:** Prevent 70% of medication errors
**The 5 Rights:**
1. **Right Resident:** Check ID band, ask resident to state name
2. **Right Medication:** Verify medication name matches MAR
3. **Right Dose:** Confirm dose matches physician order
4. **Right Route:** Ensure correct administration method (oral, topical, etc.)
5. **Right Time:** Give medication within 1 hour of scheduled time

**Implementation:**
- Create laminated 5 Rights checklist cards
- Post 5 Rights posters in medication room
- Require verbal confirmation before each medication pass
- Conduct weekly spot checks for compliance

### Quick Win #2: Double-Check System for High-Risk Meds (Week 1-2)
**Action:** Require two-person verification for high-risk medications
**Impact:** Eliminate errors with insulin, anticoagulants, and opioids
**High-Risk Medications:**
- Insulin and diabetes medications
- Blood thinners (warfarin, heparin)
- Opioid pain medications
- Chemotherapy drugs
- Medications with similar names

**Process:**
1. First nurse prepares medication
2. Second nurse independently verifies:
   - Resident name
   - Medication name and dose
   - Route and time
3. Both nurses sign MAR
4. Document verification in notes

### Quick Win #3: Medication Storage Audit (Week 2)
**Action:** Organize and secure medication storage
**Impact:** Prevent contamination, expiration, and theft
**Checklist:**
- [ ] Medications stored at proper temperature
- [ ] Refrigerator temperature log maintained (36-46°F)
- [ ] Expired medications removed monthly
- [ ] Look-alike/sound-alike meds separated
- [ ] Controlled substances locked and counted daily
- [ ] External medications labeled with resident name
- [ ] PRN medications easily accessible

**Organization Tips:**
- Use color-coded bins by medication time
- Alphabetize medications by resident name
- Separate refrigerated medications
- Create "first to expire" section

### Quick Win #4: MAR Documentation Excellence (Week 3)
**Action:** Eliminate documentation errors
**Impact:** Pass medication audits with 100% compliance
**Common Errors to Fix:**
- Missing signatures or initials
- Unclear or missing administration times
- No justification for PRN medications
- Discontinued medications not removed
- Allergies not documented
- Refusal not properly documented

**Best Practices:**
- Sign immediately after giving medication
- Use black or blue ink only
- Document PRN reason and effectiveness
- Circle and initial missed doses with reason
- Update allergies section monthly
- Review MAR weekly for errors

### Quick Win #5: Medication Error Reporting System (Week 4)
**Action:** Create a no-blame error reporting culture
**Impact:** Learn from errors and prevent recurrence
**How to implement:**
1. Create simple one-page error report form
2. Make reporting easy and confidential
3. Review errors monthly in team meeting
4. Focus on system improvements, not blame
5. Track error trends and patterns

**Error Report Should Include:**
- What happened (the error)
- When it happened
- Who was involved
- Contributing factors
- Resident outcome
- Corrective actions taken

## Bonus Quick Win: Medication Reconciliation
**When to do it:** Every admission, transfer, and discharge
**Why it matters:** Prevents 50% of medication discrepancies

**Process:**
1. Obtain complete list of current medications
2. Compare to physician orders
3. Identify discrepancies
4. Clarify with physician
5. Update MAR and care plan
6. Document reconciliation

## 30-Day Implementation Timeline

**Week 1:**
- Train staff on 5 Rights
- Implement double-check for high-risk meds
- Create verification checklists

**Week 2:**
- Conduct medication storage audit
- Reorganize medication room
- Remove expired medications

**Week 3:**
- Review MAR documentation standards
- Audit all MARs for errors
- Provide staff feedback and retraining

**Week 4:**
- Launch error reporting system
- Review first month's data
- Celebrate successes and address gaps

## Track Your Progress

**Baseline (Before Implementation):**
- Medication errors per month: _______
- MAR documentation errors: _______
- Near-misses reported: _______

**After 30 Days:**
- Medication errors per month: _______
- MAR documentation errors: _______
- Near-misses reported: _______
- Improvement percentage: _______%

## Expected Results After 30 Days
✓ 70% reduction in medication errors
✓ 100% MAR documentation compliance
✓ Zero errors with high-risk medications
✓ Improved error reporting culture
✓ Reduced liability exposure

---
**Want to achieve zero medication errors?** Get the complete Medication Management 2.0 Guide at harmony.care/resources`
  },
  {
    title: 'Person-Centered Care Quick Wins Checklist',
    description: 'Boost family satisfaction scores by 20% in 30 days. Strategies that create meaningful resident engagement and quality of life.',
    category: 'care',
    content: `# Person-Centered Care Quick Wins Checklist

## Boost Family Satisfaction by 20% in 30 Days

### Quick Win #1: Individual Preference Profiles (Week 1)
**Action:** Create detailed preference profiles for each resident
**Impact:** Increase resident engagement by 40%
**What to include:**
- Preferred name and how they like to be addressed
- Morning routine preferences (wake time, breakfast, etc.)
- Favorite activities and hobbies
- Music, TV shows, and entertainment preferences
- Food likes and dislikes
- Social interaction preferences (group vs. alone time)
- Comfort items and personal belongings

**How to gather:**
1. Interview resident (if able)
2. Interview family members
3. Observe resident for 1 week
4. Ask direct care staff for input
5. Update profile monthly

### Quick Win #2: Meaningful Daily Activities (Week 1-2)
**Action:** Implement person-centered activity programming
**Impact:** Boost quality of life scores by 30%
**Activity Ideas by Interest:**

**For Social Residents:**
- Group games (bingo, cards, trivia)
- Music and sing-alongs
- Group exercise or walking club
- Coffee hour discussions
- Community outings

**For Creative Residents:**
- Art projects (painting, drawing, crafts)
- Music therapy
- Gardening
- Cooking or baking
- Writing or journaling

**For Active Residents:**
- Exercise programs
- Walking groups
- Sports activities (adapted as needed)
- Dance or movement therapy
- Outdoor activities

**For Quiet Residents:**
- One-on-one reading time
- Puzzle activities
- Pet therapy
- Nature watching
- Listening to music

### Quick Win #3: Family Communication System (Week 2)
**Action:** Establish regular family communication
**Impact:** Increase family satisfaction by 25%
**Communication Methods:**
1. **Weekly Updates:** Email or text with resident highlights
2. **Monthly Calls:** 10-minute check-in with family
3. **Photo Sharing:** Send photos of resident activities
4. **Open Door Policy:** Welcome family visits anytime
5. **Family Portal:** Online access to care plans and updates

**What to Share:**
- Activities resident participated in
- Social interactions and friendships
- Health updates and changes
- Upcoming events and activities
- Photos and videos

### Quick Win #4: Choice and Autonomy in Daily Living (Week 3)
**Action:** Maximize resident choice in daily routines
**Impact:** Improve resident satisfaction by 35%
**Areas for Choice:**
- **Morning Routine:** Wake time, breakfast time, shower time
- **Meals:** Food choices, meal times, dining location
- **Activities:** What to participate in, when to participate
- **Social Time:** Who to spend time with, group vs. alone
- **Personal Care:** Clothing choices, grooming preferences
- **Environment:** Room temperature, lighting, music

**How to Implement:**
1. Offer 2-3 choices for each decision
2. Respect resident's choice (even if different from your preference)
3. Document preferences in care plan
4. Train staff on offering meaningful choices
5. Review and adjust based on resident feedback

### Quick Win #5: Person-Centered ISP Development (Week 4)
**Action:** Rewrite ISPs to reflect resident preferences and goals
**Impact:** Pass active treatment requirements while honoring individuality
**ISP Components:**
1. **Resident's Own Words:** Use resident's language and voice
2. **Meaningful Goals:** Based on what matters to the resident
3. **Specific Actions:** Clear steps to achieve goals
4. **Family Involvement:** Include family input and participation
5. **Regular Review:** Update monthly based on progress

**Example Person-Centered Goals:**

**Instead of:** "Resident will participate in 3 activities per week"
**Write:** "Mary enjoys singing and wants to attend music hour every Tuesday and Thursday"

**Instead of:** "Resident will maintain social relationships"
**Write:** "John wants to have coffee with his friend Tom every morning at 10am"

**Instead of:** "Resident will maintain ADL skills"
**Write:** "Sarah takes pride in her appearance and wants to choose her own clothes each day"

## Bonus Quick Win: Resident Council
**Action:** Start a monthly resident council meeting
**Impact:** Empower residents and improve satisfaction

**How to Run It:**
1. Schedule monthly 30-minute meetings
2. Let residents set the agenda
3. Discuss facility concerns and suggestions
4. Implement at least one resident suggestion each month
5. Share outcomes with all residents

**Topics to Cover:**
- Menu suggestions
- Activity ideas
- Facility improvements
- Social events
- Community concerns

## 30-Day Implementation Timeline

**Week 1:**
- Create preference profiles for all residents
- Launch meaningful activity programming
- Train staff on person-centered approaches

**Week 2:**
- Implement family communication system
- Send first weekly updates
- Schedule monthly family calls

**Week 3:**
- Maximize choice in daily routines
- Update care plans with preferences
- Train staff on offering choices

**Week 4:**
- Rewrite ISPs to be person-centered
- Hold first resident council meeting
- Survey families for satisfaction feedback

## Track Your Progress

**Baseline Metrics:**
- Family satisfaction score: _______%
- Resident engagement in activities: _______%
- Resident choice opportunities per day: _______
- Family communication frequency: _______/month

**After 30 Days:**
- Family satisfaction score: _______%
- Resident engagement in activities: _______%
- Resident choice opportunities per day: _______
- Family communication frequency: _______/month
- Improvement: _______%

## Expected Results After 30 Days
✓ 20% increase in family satisfaction
✓ 40% increase in resident engagement
✓ 35% improvement in resident satisfaction
✓ 100% person-centered ISPs
✓ Stronger family relationships

---
**Want to achieve 94% family satisfaction?** Get the complete Person-Centered Care Guide at harmony.care/resources`
  }
];

async function createQuickWinsChecklists() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  console.log('Creating Quick Wins Checklists...\n');

  for (const quickWin of QUICK_WINS_DATA) {
    console.log(`Processing: ${quickWin.title}`);

    // Create a simple text file for now (in production, you'd generate a PDF)
    const fileName = `${quickWin.category}-quick-wins-checklist.txt`;
    const fileContent = quickWin.content;
    const buffer = Buffer.from(fileContent, 'utf-8');

    // Upload to S3
    const uploadResult = await storagePut(
      `resources/${fileName}`,
      buffer,
      'text/plain'
    );

    console.log(`  ✓ Uploaded to S3: ${uploadResult.url}`);

    // Insert into database
    await db.insert(leadMagnets).values({
      title: quickWin.title,
      description: quickWin.description,
      type: 'checklist',
      category: quickWin.category,
      fileUrl: uploadResult.url,
      fileSize: buffer.length,
      thumbnailUrl: null, // No thumbnail for checklists
      downloadCount: 0,
      isActive: 1,
      sortOrder: 100 // Lower priority than main guides
    });

    console.log(`  ✓ Added to database\n`);
  }

  console.log('✅ All Quick Wins Checklists created successfully!');
  process.exit(0);
}

createQuickWinsChecklists().catch(error => {
  console.error('Error creating checklists:', error);
  process.exit(1);
});
