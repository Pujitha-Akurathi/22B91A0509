"use client"

import { useState } from "react"
import { Paper, Typography, Box, Alert, Divider } from "@mui/material"
import URLForm from "../components/URLForm"
import URLCard from "../components/URLCard"
import { logInfo, logError } from "../logger"
import { validateURL, generateShortcode, isShortcodeUnique, isValidShortcode } from "../utils"

interface URLData {
  id: string
  longUrl: string
  shortcode: string
  expiryMinutes: number
  customShortcode?: string
  createdAt: string
  expiryAt: string
}

interface FormData {
  longUrl: string
  expiryMinutes: number
  customShortcode: string
}

export default function ShortenerPage() {
  const [urls, setUrls] = useState<URLData[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (formData: FormData[]) => {
    setError("")
    setSuccess("")

    logInfo("shortener", "URL shortening process started")

    const newUrls: URLData[] = []
    const errors: string[] = []

    formData.forEach((data, index) => {
      if (!data.longUrl.trim()) return

      // Validate URL
      if (!validateURL(data.longUrl)) {
        errors.push(`URL ${index + 1}: Invalid URL format`)
        return
      }

      // Validate expiry
      if (data.expiryMinutes <= 0) {
        errors.push(`URL ${index + 1}: Expiry must be a positive number`)
        logError("shortener", `Invalid expiry time: ${data.expiryMinutes}`)
        return
      }

      // Validate custom shortcode
      if (data.customShortcode) {
        if (!isValidShortcode(data.customShortcode)) {
          errors.push(`URL ${index + 1}: Custom shortcode must be alphanumeric (3-20 chars)`)
          return
        }
        if (!isShortcodeUnique(data.customShortcode)) {
          errors.push(`URL ${index + 1}: Custom shortcode already exists`)
          return
        }
      }

      const shortcode = data.customShortcode || generateShortcode()
      const createdAt = new Date().toISOString()
      const expiryAt = new Date(Date.now() + data.expiryMinutes * 60 * 1000).toISOString()

      const urlData: URLData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        longUrl: data.longUrl,
        shortcode,
        expiryMinutes: data.expiryMinutes,
        customShortcode: data.customShortcode,
        createdAt,
        expiryAt,
      }

      newUrls.push(urlData)

      // Save to localStorage
      if (typeof window !== "undefined") {
        const existingUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
        existingUrls.push(urlData)
        localStorage.setItem("shortenedUrls", JSON.stringify(existingUrls))
      }

      logInfo("shortener", `URL shortened successfully: ${data.longUrl} -> /${shortcode}`)
    })

    if (errors.length > 0) {
      setError(errors.join("; "))
      logError("shortener", `Validation errors: ${errors.join(", ")}`)
    }

    if (newUrls.length > 0) {
      setUrls(newUrls)
      setSuccess(`Successfully shortened ${newUrls.length} URL(s)`)
      logInfo("shortener", `Bulk URL creation completed: ${newUrls.length} URLs`)
    }
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Shortener
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Shorten up to 5 URLs at once with optional expiry time and custom shortcodes.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <URLForm onSubmit={handleSubmit} />
      </Paper>

      {urls.length > 0 && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Shortened URLs
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {urls.map((url) => (
              <URLCard key={url.id} url={url} />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  )
}
