"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import ShortenerPage from "./pages/ShortenerPage"
import StatisticsPage from "./pages/StatisticsPage"
import RedirectHandler from "./components/RedirectHandler"
import Navigation from "./components/Navigation"
import { log } from "./logger"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
})

export default function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    log("frontend", "info", "app", "Application started successfully")
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Typography>Loading...</Typography>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Affordmed URL Shortener - Campus Hiring Test
              </Typography>
            </Toolbar>
          </AppBar>
          <Navigation />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/shortener" replace />} />
              <Route path="/shortener" element={<ShortenerPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/:shortcode" element={<RedirectHandler />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}
