/**
 * Analytics utility for tracking events
 *
 * This module provides a simple interface for tracking events with Google Analytics.
 * It safely handles cases where GA is not loaded or configured.
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Track a custom event in Google Analytics
 *
 * @param eventName - The name of the event (e.g., 'share_click', 'download_guide')
 * @param params - Additional parameters for the event
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  // Check if gtag is available
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", eventName, params);
      console.log("[Analytics] Event tracked:", eventName, params);
    } catch (error) {
      console.error("[Analytics] Error tracking event:", error);
    }
  } else {
    // Log to console in development for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Event (GA not loaded):", eventName, params);
    }
  }
}

/**
 * Track social share button clicks
 *
 * @param platform - The social platform (linkedin, twitter, email)
 * @param resourceCategory - The category of the resource being shared
 * @param resourceTitle - The title of the resource being shared
 */
export function trackShare(
  platform: "linkedin" | "twitter" | "email",
  resourceCategory: string,
  resourceTitle: string
): void {
  trackEvent("share", {
    event_category: "Social Share",
    event_label: `${platform} - ${resourceCategory}`,
    platform,
    resource_category: resourceCategory,
    resource_title: resourceTitle,
    share_location: "exit_intent_popup",
  });
}

/**
 * Track lead magnet downloads
 *
 * @param leadMagnetId - The ID of the lead magnet
 * @param leadMagnetTitle - The title of the lead magnet
 * @param source - The source of the download (e.g., 'landing_page', 'exit_intent_popup')
 */
export function trackDownload(
  leadMagnetId: number,
  leadMagnetTitle: string,
  source: string
): void {
  trackEvent("download", {
    event_category: "Lead Magnet",
    event_label: leadMagnetTitle,
    lead_magnet_id: leadMagnetId,
    lead_magnet_title: leadMagnetTitle,
    download_source: source,
  });
}

/**
 * Track exit-intent popup impressions
 *
 * @param resourceCategory - The category of the resource
 */
export function trackExitIntentShown(resourceCategory: string): void {
  trackEvent("exit_intent_shown", {
    event_category: "Exit Intent",
    event_label: resourceCategory,
    resource_category: resourceCategory,
  });
}

/**
 * Track exit-intent popup conversions
 *
 * @param resourceCategory - The category of the resource
 * @param email - The email address (hashed for privacy)
 */
export function trackExitIntentConversion(
  resourceCategory: string,
  email: string
): void {
  trackEvent("exit_intent_conversion", {
    event_category: "Exit Intent",
    event_label: resourceCategory,
    resource_category: resourceCategory,
    // Don't send raw email for privacy
    has_email: !!email,
  });
}
