const API = "http://20.244.56.144/evaluation-service/logs"

export async function log(stack: string, level: string, pkg: string, message: string) {
  // Only run on client side
  if (typeof window === "undefined") return

  try {
    const TOKEN = localStorage.getItem("accessToken")

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    })
  } catch (e) {
    // Silent error as per requirements
  }
}

// Helper functions for common log patterns
export const logInfo = (pkg: string, message: string) => log("frontend", "info", pkg, message)
export const logError = (pkg: string, message: string) => log("frontend", "error", pkg, message)
export const logWarn = (pkg: string, message: string) => log("frontend", "warn", pkg, message)
