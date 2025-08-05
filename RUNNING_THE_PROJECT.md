# 🚀 Running CrisisBoard Locally

## Quick Start

### Option 1: Using npm (Recommended)
```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Option 2: Using Python (if you have Python installed)
```bash
# Navigate to the public directory
cd public

# Start Python HTTP server
python -m http.server 3000
```

### Option 3: Using Node.js http-server directly
```bash
# Install http-server globally
npm install -g http-server

# Navigate to the public directory
cd public

# Start server
http-server -p 3000 -o
```

### Option 4: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `public/index.html`
3. Select "Open with Live Server"

## Accessing the Application

Once the server is running, open your browser and go to:
- **http://localhost:3000** (if using npm start)
- **http://localhost:8080** (if using Python or other methods)

## Features to Test

### 🔍 Search Functionality
- Type in the search bar to see autocomplete suggestions
- Try searching for: "hygiene", "security", "food", "electrical"
- Check search history by clicking on the search bar

### 🎯 Filter System
- Click "Advanced Filters" to expand the filter panel
- Try filtering by:
  - Category: Hygiene, Security, Food Quality
  - Status: Pending, In Progress, Resolved
  - Priority: Low, Medium, High, Urgent
  - Date Range: Today, This Week, This Month
  - Location: Hostel, Canteen, Library

### 📊 Sorting
- Use the "Sort by" dropdown to sort results by:
  - Date (Newest/Oldest)
  - Priority (High to Low/Low to High)
  - Status or Category (alphabetically)

### 🌙 Dark Mode
- Click the theme toggle button (sun/moon icon) to switch between light and dark modes

### 📱 Mobile Responsive
- Resize your browser window or use browser dev tools to test mobile layout
- Try the mobile menu on smaller screens

## Sample Data

The application comes with 5 sample complaints to test the search and filter functionality:

1. **Hygiene Issue** - Hostel bathroom cleaning (High Priority, Pending)
2. **Food Quality** - Canteen food deterioration (Medium Priority, In Progress)
3. **Electrical Issue** - Computer Lab power sockets (High Priority, Resolved)
4. **Security Concern** - Library unauthorized access (Urgent Priority, Pending)
5. **Maintenance** - Classroom AC units (Medium Priority, In Progress)

## Troubleshooting

### If npm install fails:
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

### If port 3000 is in use:
```bash
# Use a different port
npm run serve  # Uses port 8080
```

### If you get CORS errors:
- Make sure you're accessing the application through the HTTP server, not by opening the HTML file directly
- The application needs to be served from a web server due to JavaScript modules and CORS policies

## Development

### File Structure
```
crisisboard/
├── public/
│   ├── index.html      # Main application file
│   └── app.js          # JavaScript functionality
├── package.json        # Project configuration
├── README.md           # Project documentation
└── SEARCH_FILTER_FEATURES.md  # Feature documentation
```

### Making Changes
- Edit `public/index.html` for HTML/CSS changes
- Edit `public/app.js` for JavaScript functionality
- Refresh your browser to see changes (or use `npm run dev` for auto-refresh)

## Browser Compatibility

The application works on all modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Try clearing browser cache and cookies
4. Make sure all files are in the correct directory structure 