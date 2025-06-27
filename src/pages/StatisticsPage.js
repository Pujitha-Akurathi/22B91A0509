"use client"

import { useState, useEffect } from "react"
import { Paper, Typography, Box, Alert } from "@mui/material"
import StatsTable from "../components/StatsTable"
import { logInfo } from "../logger"

export default function StatisticsPage() {
  const [urls, setUrls] = useState([])
  const [clicks, setClicks] = useState([])

  useEffect(() => {
    logInfo("statistics", "Statistics page loaded")

    // Load data from localStorage
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
    const storedClicks = JSON.parse(localStorage.getItem("urlClicks") || "[]")

    setUrls(storedUrls)
    setClicks(storedClicks)

    logInfo("statistics", `Loaded ${storedUrls.length} URLs and ${storedClicks.length} clicks`)
  }, [])

  if (urls.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Statistics
        </Typography>
        <Alert severity="info">No shortened URLs found. Create some URLs first to see statistics.</Alert>
      </Paper>
    )
  }

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Statistics
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Analytics and click tracking for all your shortened URLs.
        </Typography>

        <StatsTable urls={urls} clicks={clicks} />
      </Paper>
    </Box>
  )
}
