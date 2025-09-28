// Centralized timing/scheduling constants

export const ACCESS_TOKEN_TTL_SECONDS = 15;
export const REFRESH_TOKEN_TTL_SECONDS = 86_400;

export const ACCESS_TOKEN_EXPIRY_BUFFER_MS = 5_000; // 5s early refresh buffer
export const REFRESH_TOKEN_EXPIRY_BUFFER_MS = 5_000; // 5s early refresh buffer

// How often the app checks for proactive refresh while running
// export const PROACTIVE_REFRESH_CHECK_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
export const PROACTIVE_REFRESH_CHECK_INTERVAL_MS = 30 * 1000; // 10 seconds

// When the remaining lifetime of the refresh token is below this threshold,
// trigger a proactive refresh (silent + transparent)
// export const PROACTIVE_REFRESH_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 1 day
export const PROACTIVE_REFRESH_THRESHOLD_MS = 60 * 1000; // 60 seconds

// Forced refresh intervals (even if tokens are still valid)
export const FORCE_ACCESS_REFRESH_INTERVAL_MS = 5 * 1000; // 5 seconds
export const FORCE_REFRESH_ROTATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
