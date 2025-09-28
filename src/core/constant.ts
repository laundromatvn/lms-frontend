// Centralized timing/scheduling constants

export const ACCESS_TOKEN_EXPIRY_BUFFER_MS = 5_000; // 5s early refresh buffer
export const REFRESH_TOKEN_EXPIRY_BUFFER_MS = 5_000; // 5s early refresh buffer

// How often the app checks for proactive refresh while running
// export const PROACTIVE_REFRESH_CHECK_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
export const PROACTIVE_REFRESH_CHECK_INTERVAL_MS = 30 * 1000; // 10 seconds

// When the remaining lifetime of the refresh token is below this threshold,
// trigger a proactive refresh (silent + transparent)
// export const PROACTIVE_REFRESH_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 1 day
export const PROACTIVE_REFRESH_THRESHOLD_MS = 60 * 1000; // 60 seconds
