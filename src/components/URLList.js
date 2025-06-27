"use client"
import { Box, Typography, Link, Chip, Grid, Paper, IconButton, Tooltip } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

export default function URLList({ urls }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(`${window.location.origin}/${text}`)
  }

  const formatDistanceToNow = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} days ago`
  }

  return (
    <Box>
      {urls.map((url) => (
        <Paper key={url.id} elevation={1} sx={{ p: 3, mb: 2, border: "1px solid #e0e0e0" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Original URL:
              </Typography>
              <Link
                href={url.longUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
              >
                {url.longUrl}
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Short URL:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Link href={`/${url.shortcode}`} sx={{ fontFamily: "monospace", fontWeight: "bold" }}>
                  /{url.shortcode}
                </Link>
                <Tooltip title="Copy to clipboard">
                  <IconButton size="small" onClick={() => copyToClipboard(url.shortcode)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open in new tab">
                  <IconButton size="small" href={`/${url.shortcode}`} target="_blank" component="a">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {url.customShortcode && <Chip label="Custom" size="small" color="primary" variant="outlined" />}
                <Typography variant="caption" color="text.secondary">
                  Expires: {formatDistanceToNow(new Date(url.expiryAt))}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Created: {formatDistanceToNow(new Date(url.createdAt))}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}
