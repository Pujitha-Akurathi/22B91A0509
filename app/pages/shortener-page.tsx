"use client"

import { useState } from "react"
import { Paper, Typography, Box, Alert, Divider } from "@mui/material"
import URLForm from "../components/url-form"
import URLList from "../components/url-list"
import { logEvent } from "../utils/logger"
import { validateURL, generateShortcode, isShortcodeUnique } from "../utils/utils"

interface URLData {
  id: string
  longUrl: string
  shortcode: string
  expiryMinutes: number
  customShortcode?: string
  createdAt: string
  expiryAt: string
}

export default function ShortenerPage() {
  const [urls, setUrls] = useState<URLData[]>([])
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = (formData: any[]) => {
    setError("")
    setSuccess("")

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
        return
      }

      // Validate custom shortcode
      if (data.customShortcode) {
        if (!/^[a-zA-Z0-9]+$/.test(data.customShortcode)) {
          errors.push(`URL ${index + 1}: Custom shortcode must be alphanumeric`)
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
      const existingUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
      existingUrls.push(urlData)
      localStorage.setItem("shortenedUrls", JSON.stringify(existingUrls))

      logEvent("URL_SHORTENED", {
        shortcode,
        longUrl: data.longUrl,
        expiryMinutes: data.expiryMinutes,
        customShortcode: data.customShortcode,
      })
    })

    if (errors.length > 0) {
      setError(errors.join("; "))
      logEvent("VALIDATION_ERROR", { errors })
    }

    if (newUrls.length > 0) {
      setUrls(newUrls)
      setSuccess(`Successfully shortened ${newUrls.length} URL(s)`)
      logEvent("BULK_URL_CREATION", { count: newUrls.length })
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
          <URLList urls={urls} />
        </Paper>
      )}
    </Box>
  )
}
