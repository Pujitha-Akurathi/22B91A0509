// Utility functions for URL validation, shortcode generation, etc.

export function validateURL(url) {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === "http:" || urlObj.protocol === "https:"
  } catch {
    return false
  }
}

export function generateShortcode() {
  // Generate a unique shortcode using timestamp and random characters
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return (random + timestamp).substring(0, 7)
}

export function isShortcodeUnique(shortcode) {
  const existingUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
  return !existingUrls.some((url) => url.shortcode === shortcode)
}

export function isValidShortcode(shortcode) {
  return /^[a-zA-Z0-9]+$/.test(shortcode) && shortcode.length >= 3 && shortcode.length <= 20
}

export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, "")
}

export function getLocationInfo() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return "Unknown"
  }
}

export function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`
  }

  return `${hours}h ${remainingMinutes}m`
}
