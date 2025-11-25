/**
 * UTM Parameter Tracking Utilities
 * Captures and persists marketing attribution data
 */

export interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const UTM_STORAGE_KEY = 'harmony_utm_params';
const UTM_EXPIRY_DAYS = 30; // UTM parameters expire after 30 days

interface StoredUTM {
  params: UTMParams;
  timestamp: number;
}

/**
 * Extract UTM parameters from URL query string
 */
export function getUTMFromURL(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  
  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');
  const term = params.get('utm_term');
  const content = params.get('utm_content');
  
  if (source) utm.utmSource = source;
  if (medium) utm.utmMedium = medium;
  if (campaign) utm.utmCampaign = campaign;
  if (term) utm.utmTerm = term;
  if (content) utm.utmContent = content;
  
  return utm;
}

/**
 * Save UTM parameters to localStorage with timestamp
 */
export function saveUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;
  if (Object.keys(params).length === 0) return;
  
  const stored: StoredUTM = {
    params,
    timestamp: Date.now(),
  };
  
  try {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
  } catch (error) {
    console.warn('[UTM] Failed to save to localStorage:', error);
  }
}

/**
 * Retrieve UTM parameters from localStorage if not expired
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return {};
    
    const data: StoredUTM = JSON.parse(stored);
    const expiryTime = UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - data.timestamp > expiryTime;
    
    if (isExpired) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return {};
    }
    
    return data.params;
  } catch (error) {
    console.warn('[UTM] Failed to read from localStorage:', error);
    return {};
  }
}

/**
 * Get current UTM parameters (from URL or localStorage)
 * Priority: URL params > stored params
 */
export function getCurrentUTMParams(): UTMParams {
  const urlParams = getUTMFromURL();
  
  // If URL has UTM params, save them and return
  if (Object.keys(urlParams).length > 0) {
    saveUTMParams(urlParams);
    return urlParams;
  }
  
  // Otherwise return stored params
  return getStoredUTMParams();
}

/**
 * Clear stored UTM parameters
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.warn('[UTM] Failed to clear localStorage:', error);
  }
}

/**
 * Initialize UTM tracking on page load
 * Call this in your app's entry point or root component
 */
export function initUTMTracking(): void {
  if (typeof window === 'undefined') return;
  
  const urlParams = getUTMFromURL();
  if (Object.keys(urlParams).length > 0) {
    saveUTMParams(urlParams);
    console.log('[UTM] Captured parameters:', urlParams);
  }
}
