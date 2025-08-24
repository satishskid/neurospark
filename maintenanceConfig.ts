// Centralized maintenance configuration for temporarily blocking user logins

// Use Vite env vars: set VITE_LOGIN_DISABLED="true" to block logins
// Optionally set VITE_LOGIN_DISABLED_MESSAGE to customize the banner/error text

export const LOGIN_BLOCKED: boolean = true;

export const LOGIN_BLOCK_MESSAGE: string =
  "Logins are temporarily disabled while we perform a scheduled upgrade. Please try again soon.";;
