import { logError, logInfo } from "./logger"

export function validateURL(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const isValid = urlObj.protocol === "http:" || urlObj.protocol === "https:"

    if (!isValid) {
      logError("utils", `Invalid URL protocol: ${url}`)
    }

    return isValid
  } catch (error) {
    logError("utils", `URL validation failed: ${url} - ${(error as Error).message}`)
    return false
  }
}

export function generateShortcode(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  const shortcode = (random + timestamp).substring(0, 7)

  logInfo("utils", `Generated shortcode: ${shortcode}`)
  return shortcode
}

export function isShortcodeUnique(shortcode: string): boolean {
  if (typeof window === "undefined") return true

  const existingUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
  const isUnique = !existingUrls.some((url: any) => url.shortcode === shortcode)

  if (!isUnique) {
    logError("utils", `Shortcode already exists: ${shortcode}`)
  }

  return isUnique
}

export function isValidShortcode(shortcode: string): boolean {
  const isValid = /^[a-zA-Z0-9]+$/.test(shortcode) && shortcode.length >= 3 && shortcode.length <= 20

  if (!isValid) {
    logError("utils", `Invalid shortcode format: ${shortcode}`)
  }

  return isValid
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

export function getLocationInfo(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return "Unknown"
  }
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "just now"
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}

export function formatDistanceToFuture(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1000 * 60))

  if (diffInMinutes < 0) return "expired"
  if (diffInMinutes < 60) return `expires in ${diffInMinutes} minutes`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `expires in ${diffInHours} hours`

  const diffInDays = Math.floor(diffInHours / 24)
  return `expires in ${diffInDays} days`
}
