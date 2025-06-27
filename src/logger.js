const API = "http://20.244.56.144/evaluation-service/logs";

export async function log(stack, level, pkg, message) {
  try {
    const TOKEN = localStorage.getItem("accessToken");

    if (!TOKEN) {
      console.warn("Access token not found. Logging aborted."); // optional dev-only message
      return;
    }

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    // Optional: silently ignore failed logs
    if (!res.ok) {
      // you could store failed logs locally if required
    }
  } catch (e) {
    // Silent fail — as required by the test
  }
}

// 🔧 Helper functions for common log types
export const logInfo = (pkg, message) => log("frontend", "info", pkg, message);
export const logError = (pkg, message) => log("frontend", "error", pkg, message);
export const logWarn = (pkg, message) => log("frontend", "warn", pkg, message);
