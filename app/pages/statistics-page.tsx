"use client"

import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import { formatDistanceToNow } from "date-fns"

interface URLData {
  id: string
  longUrl: string
  shortcode: string
  expiryMinutes: number
  customShortcode?: string
  createdAt: string
  expiryAt: string
}

interface ClickData {
  shortcode: string
  timestamp: string
  referrer: string
  location: string
}

export default function StatisticsPage() {
  const [urls, setUrls] = useState<URLData[]>([])
  const [clicks, setClicks] = useState<ClickData[]>([])

  useEffect(() => {
    // Load data from localStorage
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]")
    const storedClicks = JSON.parse(localStorage.getItem("urlClicks") || "[]")

    setUrls(storedUrls)
    setClicks(storedClicks)
  }, [])

  const getClicksForUrl = (shortcode: string) => {
    return clicks.filter((click) => click.shortcode === shortcode)
  }

  const isExpired = (expiryAt: string) => {
    return new Date() > new Date(expiryAt)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Shortcode</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => {
                const urlClicks = getClicksForUrl(url.shortcode)
                const expired = isExpired(url.expiryAt)

                return (
                  <TableRow key={url.id}>
                    <TableCell>
                      <Link
                        href={url.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          maxWidth: 300,
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {url.longUrl}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/${url.shortcode}`} sx={{ fontFamily: "monospace" }}>
                        /{url.shortcode}
                      </Link>
                    </TableCell>
                    <TableCell>{formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(url.expiryAt), { addSuffix: true })}</TableCell>
                    <TableCell>
                      <Chip label={expired ? "Expired" : "Active"} color={expired ? "error" : "success"} size="small" />
                    </TableCell>
                    <TableCell>
                      <strong>{urlClicks.length}</strong>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Click Details
          </Typography>

          {urls.map((url) => {
            const urlClicks = getClicksForUrl(url.shortcode)

            if (urlClicks.length === 0) return null

            return (
              <Accordion key={url.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>
                    /{url.shortcode} - {urlClicks.length} clicks
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Referrer</TableCell>
                          <TableCell>Location</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {urlClicks.map((click, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(click.timestamp)}</TableCell>
                            <TableCell>{click.referrer || "Direct"}</TableCell>
                            <TableCell>{click.location}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Box>
      </Paper>
    </Box>
  )
}
