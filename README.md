# Affordmed URL Shortener - Campus Hiring Test

This is a React-based client-side application to shorten URLs, track statistics, manage redirections, and implement a custom logging system using the Affordmed Logging API.

## 🚀 Features

- ✅ Shorten up to 5 URLs simultaneously
- ✅ Custom shortcodes (alphanumeric, 3-20 characters)
- ✅ Auto-generated unique shortcodes
- ✅ Configurable expiry time (default: 30 minutes)
- ✅ Click tracking with analytics
- ✅ Statistics dashboard
- ✅ React Router redirection
- ✅ Material UI styling
- ✅ Custom logging via Affordmed API
- ✅ No console.log usage
- ✅ localStorage persistence

## 🛠 Tech Stack

- **React** (latest version)
- **Material UI** for styling
- **React Router DOM** for routing
- **Custom Logging API** (Affordmed)
- **localStorage** for data persistence

## 📦 Installation & Setup

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd affordmed-url-shortener

# Install dependencies
npm install

# Start the development server
npm start
``` bash

The app will run at `http://localhost:3000`

## 🏗 Project Structure

```bash
src/
├── components/
│   ├── URLForm.js          # Form to create shortened URLs
│   ├── URLCard.js          # Display individual URL cards
│   ├── StatsTable.js       # Statistics table component
│   ├── RedirectHandler.js  # Handle shortcode redirections
│   └── Navigation.js       # Navigation tabs
├── pages/
│   ├── ShortenerPage.js    # Main URL shortening page
│   └── StatisticsPage.js   # Analytics and statistics page
├── logger.js               # Custom logging to Affordmed API
├── utils.js                # Utility functions
├── App.js                  # Main app component
└── index.js                # App entry point
\`\`\`

## 🔧 Key Functionalities

### URL Shortening
- Enter up to 5 URLs simultaneously
- Optional custom shortcodes (alphanumeric, unique)
- Set expiry time in minutes (default: 30)
- Auto-validation of URLs and shortcodes

### Analytics & Tracking
- Track every click with timestamp
- Record referrer information
- Capture user timezone
- Display comprehensive statistics

### Redirection
- Automatic redirection for valid shortcodes
- Expiry checking
- Error handling for invalid/expired links
- Click logging for analytics

### Custom Logging
- All events logged to Affordmed API
- No console.log usage
- Structured logging with levels (info, error, warn)
- Silent error handling

## 📊 API Integration

The app integrates with the Affordmed Logging API:

\`\`\`
POST http://20.244.56.144/evaluation-service/logs
\`\`\`

Request format:
\`\`\`json
{
  "stack": "frontend",
  "level": "info",
  "package": "component",
  "message": "URL shortened successfully"
}
\`\`\`

## 🎯 Usage

1. **Create Short URLs**: Navigate to the URL Shortener page and enter up to 5 URLs
2. **View Statistics**: Check the Statistics page for detailed analytics
3. **Use Short URLs**: Visit any shortened URL (e.g., `/abc123`) for redirection
4. **Track Clicks**: All clicks are automatically tracked and displayed in statistics

## ✅ Test Requirements Met

- [x] React (latest version)
- [x] react-router-dom for routing
- [x] Material UI styling
- [x] No console.log usage
- [x] Custom logging via POST API
- [x] Runs on localhost:3000
- [x] Frontend only, no backend
- [x] Up to 5 URL shortening
- [x] Custom shortcodes
- [x] Expiry handling
- [x] Click tracking
- [x] Statistics dashboard
- [x] Redirection handling

## 🏆 Campus Hiring Test - Affordmed

This project demonstrates proficiency in:
- Modern React development
- Material UI component library
- Client-side routing
- API integration
- Data persistence
- Analytics implementation
- Error handling
- Code organization

Built with ❤️ for Affordmed Technologies Campus Hiring Process.
