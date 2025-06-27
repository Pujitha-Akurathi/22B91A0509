import {
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
  Typography,
  Box,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { formatDistanceToNow } from "../utils"

export default function StatsTable({ urls, clicks }) {
  const getClicksForUrl = (shortcode) => {
    return clicks.filter((click) => click.shortcode === shortcode)
  }

  const isExpired = (expiryAt) => {
    return new Date() > new Date(expiryAt)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <Box>
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
                  <TableCell>{formatDistanceToNow(new Date(url.createdAt))}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(url.expiryAt))}</TableCell>
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
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
    </Box>
  )
}
