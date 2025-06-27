"use client"

import { useLocation, Link } from "react-router-dom"
import { Tabs, Tab, Box } from "@mui/material"
import { Link as LinkIcon, BarChart } from "@mui/icons-material"

export default function Navigation() {
  const location = useLocation()

  const getCurrentTab = () => {
    if (location.pathname === "/shortener") return 0
    if (location.pathname === "/statistics") return 1
    return 0
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
      <Tabs value={getCurrentTab()} centered>
        <Tab icon={<LinkIcon />} label="URL Shortener" component={Link} to="/shortener" />
        <Tab icon={<BarChart />} label="Statistics" component={Link} to="/statistics" />
      </Tabs>
    </Box>
  )
}
