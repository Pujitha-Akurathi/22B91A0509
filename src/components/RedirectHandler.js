"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Paper, Typography, Box, Button, Alert, CircularProgress } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import RefreshIcon from "@mui/icons-material/Refresh"
import { logInfo, logError } from "../logger"
import { getLocationInfo } from "../utils"

export default function RedirectHandler() {
  const { shortcode } = useParams()
  const navigate = useNavigate()
  const [redirectUrl, setRedirectUrl] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!shortcode) {
      setError("Invalid shortcode")
      setLoading(false)
      logError("redirect", "No shortcode provided")
      return
    }

    logInfo("redirect", `Processing redirect for shortcode: ${shortcode}`)

    // Get stored URLs
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
    const urlData = storedUrls.find((url) => url.shortcode === shortcode)

    if (!urlData) {
      setError("Shortcode not found")
      setLoading(false)
      logError("redirect", `Shortcode not found: ${shortcode}`)
      return
    }

    // Check if expired
    const now = new Date()
    const expiryDate = new Date(urlData.expiryAt)

    if (now > expiryDate) {
      setError("This link has expired")
      setLoading(false)
      logError("redirect", `Expired shortcode accessed: ${shortcode}`)
      return
    }

    // Log the click
    const clickData = {
      shortcode,
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      location: getLocationInfo(),
    }

    const existingClicks = JSON.parse(localStorage.getItem("urlClicks") || "[]")
    existingClicks.push(clickData)
    localStorage.setItem("urlClicks", JSON.stringify(existingClicks))

    logInfo("redirect", `Click tracked for ${shortcode}: ${JSON.stringify(clickData)}`)

    // Set redirect URL
    setRedirectUrl(urlData.longUrl)
    setLoading(false)

    // Redirect after a short delay
    setTimeout(() => {
      logInfo("redirect", `Redirecting to: ${urlData.longUrl}`)
      window.location.href = urlData.longUrl
    }, 2000)
  }, [shortcode])

  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Redirecting...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please wait while we redirect you to your destination.
        </Typography>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body2">The link you're looking for doesn't exist or has expired.</Typography>
        </Alert>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="contained" startIcon={<HomeIcon />} onClick={() => navigate("/shortener")}>
            Create New Link
          </Button>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Box>
      </Paper>
    )
  }

  if (redirectUrl) {
    return (
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom color="success.main">
          Redirecting to:
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            wordBreak: "break-all",
            fontFamily: "monospace",
            backgroundColor: "#f5f5f5",
            p: 2,
            borderRadius: 1,
          }}
        >
          {redirectUrl}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You will be redirected automatically in a few seconds...
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => (window.location.href = redirectUrl)}>
            Go Now
          </Button>
        </Box>
      </Paper>
    )
  }

  return null
}
