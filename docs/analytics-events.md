# Analytics Events Documentation

This document describes all Google Analytics events tracked in the Harmony website.

## Event Tracking Overview

All analytics events are tracked using the `trackEvent()` utility function from `/client/src/lib/analytics.ts`. Events are sent to Google Analytics via the `gtag()` function when available.

## Exit-Intent Popup Events

### 1. Exit Intent Shown

**Event Name:** `exit_intent_shown`

**Description:** Fired when the exit-intent popup is displayed to a user

**Parameters:**

- `event_category`: "Exit Intent"
- `event_label`: Resource category (e.g., "staffing", "compliance")
- `resource_category`: The category of the resource being viewed

**Example:**

```javascript
trackExitIntentShown("staffing");
```

**Use Cases:**

- Measure popup impression rate
- Calculate popup conversion rate
- A/B test popup timing and triggers

---

### 2. Exit Intent Conversion

**Event Name:** `exit_intent_conversion`

**Description:** Fired when a user successfully submits the exit-intent popup form

**Parameters:**

- `event_category`: "Exit Intent"
- `event_label`: Resource category
- `resource_category`: The category of the resource
- `has_email`: Boolean indicating if email was provided (true)

**Example:**

```javascript
trackExitIntentConversion("staffing", "user@example.com");
```

**Use Cases:**

- Measure popup conversion rate
- Calculate ROI of exit-intent strategy
- Identify highest-converting categories

**Privacy Note:** Raw email addresses are NOT sent to Google Analytics. Only a boolean flag (`has_email`) is tracked.

---

## Social Sharing Events

### 3. Social Share Click

**Event Name:** `share`

**Description:** Fired when a user clicks a social share button

**Parameters:**

- `event_category`: "Social Share"
- `event_label`: Platform and category (e.g., "linkedin - staffing")
- `platform`: The social platform ("linkedin", "twitter", or "email")
- `resource_category`: The category of the resource being shared
- `resource_title`: The title of the resource being shared
- `share_location`: Where the share button was clicked ("exit_intent_popup")

**Example:**

```javascript
trackShare("linkedin", "staffing", "The Staffing Crisis Myth");
```

**Use Cases:**

- Identify most effective sharing platforms
- Measure viral coefficient
- Calculate share-to-conversion rate
- Optimize share button placement

**Platform Breakdown:**

- **LinkedIn**: Professional network sharing
- **Twitter**: Social media sharing
- **Email**: Direct email sharing

---

## Lead Magnet Events

### 4. Lead Magnet Download

**Event Name:** `download`

**Description:** Fired when a user downloads a lead magnet

**Parameters:**

- `event_category`: "Lead Magnet"
- `event_label`: Lead magnet title
- `lead_magnet_id`: Database ID of the lead magnet
- `lead_magnet_title`: Title of the lead magnet
- `download_source`: Source of the download (e.g., "landing_page", "exit_intent_popup")

**Example:**

```javascript
trackDownload(7, "Staffing Quick Wins Checklist", "exit_intent_popup");
```

**Use Cases:**

- Measure lead magnet performance
- Identify most popular resources
- Track download sources
- Calculate conversion funnels

---

## Google Analytics Reports

### Recommended Custom Reports

#### 1. Exit-Intent Performance Report

**Metrics:**

- Total impressions (`exit_intent_shown`)
- Total conversions (`exit_intent_conversion`)
- Conversion rate (conversions / impressions)

**Dimensions:**

- Resource category
- Date
- Device type

#### 2. Social Sharing Report

**Metrics:**

- Total shares (`share`)
- Shares by platform
- Share-to-conversion rate

**Dimensions:**

- Platform (linkedin, twitter, email)
- Resource category
- Resource title

#### 3. Lead Magnet Performance Report

**Metrics:**

- Total downloads (`download`)
- Downloads by source
- Download-to-demo conversion rate

**Dimensions:**

- Lead magnet title
- Download source
- Date

---

## Event Tracking Implementation

### Setup Requirements

1. **Google Analytics 4 (GA4)** must be installed on the website
2. The `gtag()` function must be available globally via `window.gtag`
3. Events are automatically logged to console in development mode

### Testing Events

To test events in development:

1. Open browser console
2. Trigger the event (e.g., click a share button)
3. Look for console log: `[Analytics] Event tracked: share {...}`

### Production Verification

To verify events in production:

1. Open Google Analytics Real-Time reports
2. Trigger the event on the website
3. Check Real-Time > Events to see the event appear

---

## Event Naming Conventions

- **Event names**: lowercase with underscores (e.g., `exit_intent_shown`)
- **Categories**: Title Case (e.g., "Social Share")
- **Labels**: Platform/category combinations (e.g., "linkedin - staffing")
- **Custom parameters**: snake_case (e.g., `resource_category`)

---

## Privacy & Compliance

- **No PII**: Personal email addresses are never sent to Google Analytics
- **Anonymization**: IP anonymization is enabled by default in GA4
- **Consent**: Events respect user consent preferences (if configured)
- **Data Retention**: Follow Google Analytics data retention policies

---

## Future Event Tracking

Recommended additional events to implement:

1. **Scroll Depth**: Track how far users scroll on landing pages
2. **Form Abandonment**: Track when users start but don't complete forms
3. **Video Engagement**: Track video plays and completion rates
4. **CTA Clicks**: Track all call-to-action button clicks
5. **Page Time**: Track time spent on key pages

---

## Support & Questions

For questions about analytics tracking, contact the development team or refer to:

- Google Analytics 4 documentation: https://developers.google.com/analytics/devguides/collection/ga4
- Internal analytics utility: `/client/src/lib/analytics.ts`
