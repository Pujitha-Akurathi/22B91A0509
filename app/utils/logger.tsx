// Custom logging utility - replaces console.log usage
const logs: Array<{
  eventType: string
  details: any
  timestamp: string
}> = []

export function logEvent(eventType: string, details: any) {
  const logEntry = {
    eventType,
    details,
    timestamp: new Date().toISOString(),
  }

  logs.push(logEntry)

  // Store in localStorage for persistence
  const existingLogs = JSON.parse(localStorage.getItem("appLogs") || "[]")
  existingLogs.push(logEntry)
  localStorage.setItem("appLogs", JSON.stringify(existingLogs))

  // Optional: Send to external logging service in production
  // sendToLoggingService(logEntry)
}

export function getLogs() {
  return JSON.parse(localStorage.getItem("appLogs") || "[]")
}

export function clearLogs() {
  logs.length = 0
  localStorage.removeItem("appLogs")
}

// Log levels for different types of events
export const LOG_TYPES = {
  URL_SHORTENED: "URL_SHORTENED",
  URL_CLICKED: "URL_CLICKED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  REDIRECT_ERROR: "REDIRECT_ERROR",
  BULK_URL_CREATION: "BULK_URL_CREATION",
  APP_ERROR: "APP_ERROR",
} as const
