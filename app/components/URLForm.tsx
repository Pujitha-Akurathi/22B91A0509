"use client"

import type React from "react"

import { useState } from "react"
import { Box, TextField, Button, Grid, Typography, IconButton, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { logInfo } from "../logger"

interface FormData {
  longUrl: string
  expiryMinutes: number
  customShortcode: string
}

interface URLFormProps {
  onSubmit: (data: FormData[]) => void
}

export default function URLForm({ onSubmit }: URLFormProps) {
  const [forms, setForms] = useState<FormData[]>([{ longUrl: "", expiryMinutes: 30, customShortcode: "" }])

  const handleInputChange = (index: number, field: keyof FormData, value: string | number) => {
    const newForms = [...forms]
    newForms[index] = { ...newForms[index], [field]: value }
    setForms(newForms)
  }

  const addForm = () => {
    if (forms.length < 5) {
      setForms([...forms, { longUrl: "", expiryMinutes: 30, customShortcode: "" }])
      logInfo("form", `Added form ${forms.length + 1}`)
    }
  }

  const removeForm = (index: number) => {
    if (forms.length > 1) {
      const newForms = forms.filter((_, i) => i !== index)
      setForms(newForms)
      logInfo("form", `Removed form ${index + 1}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    logInfo("form", "Form submission started")
    onSubmit(forms)

    // Reset forms
    setForms([{ longUrl: "", expiryMinutes: 30, customShortcode: "" }])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        {forms.map((form, index) => (
          <Paper key={index} elevation={1} sx={{ p: 3, mb: 2, border: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">URL #{index + 1}</Typography>
              {forms.length > 1 && (
                <IconButton onClick={() => removeForm(index)} color="error" size="small">
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Long URL"
                  placeholder="https://example.com/very/long/url"
                  value={form.longUrl}
                  onChange={(e) => handleInputChange(index, "longUrl", e.target.value)}
                  required
                  type="url"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry (minutes)"
                  type="number"
                  value={form.expiryMinutes}
                  onChange={(e) => handleInputChange(index, "expiryMinutes", Number.parseInt(e.target.value) || 30)}
                  inputProps={{ min: 1 }}
                  helperText="Default: 30 minutes"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Custom Shortcode (optional)"
                  placeholder="abc123"
                  value={form.customShortcode}
                  onChange={(e) => handleInputChange(index, "customShortcode", e.target.value)}
                  helperText="Alphanumeric only (3-20 chars)"
                  inputProps={{ pattern: "[a-zA-Z0-9]*" }}
                />
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={addForm} disabled={forms.length >= 5}>
          Add URL ({forms.length}/5)
        </Button>

        <Button type="submit" variant="contained" size="large" disabled={!forms.some((form) => form.longUrl.trim())}>
          Shorten URLs
        </Button>
      </Box>
    </form>
  )
}
