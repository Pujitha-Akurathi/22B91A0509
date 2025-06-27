"use client"

import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material"
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

function App() {
 React.useEffect(() => {
  localStorage.setItem(
    "accessToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMmI5MWEwNTA5QHNya3JlYy5hYy5pbiIsImV4cCI6MTc1MTAwNzk2OSwiaWF0IjoxNzUxMDA3MDY5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMjM1YzIzNGUtZGNlMC00OGFjLTk2NTYtNWNkNDU0ODc5NGUxIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHVqaXRoYSBha3VyYXRoaSIsInN1YiI6ImZmZjhiNTY5LTIyNGQtNGE4MC05NzViLTgwMTNhODI3NzU3NSJ9LCJlbWFpbCI6IjIyYjkxYTA1MDlAc3JrcmVjLmFjLmluIiwibmFtZSI6InB1aml0aGEgYWt1cmF0aGkiLCJyb2xsTm8iOiIyMmI5MWEwNTA5IiwiYWNjZXNzQ29kZSI6InhXUE5YdCIsImNsaWVudElEIjoiZmZmOGI1NjktMjI0ZC00YTgwLTk3NWItODAxM2E4Mjc3NTc1IiwiY2xpZW50U2VjcmV0IjoiY05YYVZ1cVluZndEQVJrZiJ9.jznxxp_8D_KfOoZwFjB7ivbYcp0c1C3lv0ty9rvHci4" 
  );

  log("frontend", "info", "app", "Application started successfully");
}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                URL Shortener App
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

export default App
