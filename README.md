# Breach Search Tool

A modern, responsive web application for searching and discovering legendary heroes and their extraordinary abilities.

## 🚀 Live Demo

**🌐 Static Version (Netlify)**: [Coming Soon - Your Netlify URL]

## Features

- **Real-time Search**: Search across hero names, titles, classes, weapons, origins, abilities, and descriptions
- **Advanced Filtering**: Filter by hero class and minimum power level
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and card-based layout
- **Detailed Hero Information**: View comprehensive details including abilities, weapons, origins, and descriptions
- **Mobile-Friendly**: Responsive design that works perfectly on all devices

## Hero Database

The tool includes a diverse collection of legendary heroes from various mythologies and fictional universes:

- **Arthur Pendragon** (King Arthur) - Paladin with Excalibur
- **Diana Prince** (Wonder Woman) - Warrior from Themyscira
- **Clark Kent** (Superman) - Guardian from Krypton
- **Bruce Wayne** (Batman) - Detective from Gotham City
- **Gandalf** (The Grey Wizard) - Wizard from Middle-earth
- **Jean Grey** (Phoenix) - Psychic with telepathic abilities

## 📦 Deployment Options

### Option 1: Static Version (Netlify, Vercel, etc.)

For static hosting platforms like Netlify:

1. **Files needed**: `public/static-index.html` + `netlify.toml`
2. **No backend required** - all data embedded in frontend
3. **Perfect for**: Netlify, Vercel, GitHub Pages, etc.

**Netlify Deployment:**
```bash
# The netlify.toml file is already configured
# Just connect your GitHub repo to Netlify
# Build command: echo 'Static site - no build required'
# Publish directory: public
```

### Option 2: Full-Stack Version (Heroku, Railway, etc.)

For platforms that support Node.js:

1. **Files needed**: All files (server.js, package.json, public/index.html)
2. **Backend included** - Express.js API with real endpoints
3. **Perfect for**: Heroku, Railway, Render, DigitalOcean, etc.

## 🛠 Local Development

### Full-Stack Version:

1. Clone the repository:
```bash
git clone <repository-url>
cd heroic-search-tool
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Static Version Only:

Simply open `public/static-index.html` directly in your browser or serve it with any static file server.

## Development

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints (Full-Stack Version)

- `GET /` - Serves the main application
- `GET /api/search?type=TYPE&account=VALUE` - Proxy to the HEROIC Breach Search API
- `GET /api/heroes` - Returns all heroes
- `GET /api/classes` - Returns all available hero classes

## Usage

1. **Basic Search**: Type any keyword in the search box to find heroes by name, title, abilities, weapons, etc.
2. **Class Filtering**: Select a specific hero class from the dropdown (Paladin, Warrior, Guardian, Detective, Wizard, Psychic)
3. **Power Filtering**: Set a minimum power level to filter heroes by their strength
4. **Clear Filters**: Use the Clear button to reset all filters and show all heroes
5. **Real-time Results**: Search results update automatically as you type

## Technology Stack

- **Backend**: Node.js with Express.js (full-stack version)
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Data**: In-memory JSON data structure
- **Static Version**: Pure frontend with embedded data

## Project Structure

```
heroic-search-tool/
├── netlify.toml           # Netlify deployment configuration
├── package.json           # Node.js dependencies and scripts
├── server.js              # Express server and API endpoints (full-stack)
├── README.md              # Project documentation
└── public/
    ├── index.html         # Frontend for full-stack version
    └── static-index.html  # Standalone static version
```

## 🚀 Quick Deploy

### Netlify (Recommended for Static)
1. Connect your GitHub repository to Netlify
2. Netlify will automatically use the `netlify.toml` configuration
3. Your site will be live at your-app-name.netlify.app

### Heroku (For Full-Stack)
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```

### Vercel (For Static)
```bash
# Install Vercel CLI, then:
vercel --prod
```

## Netlify Serverless Functions (API Proxy)

- The backend search is handled by a Netlify serverless function located in `netlify/functions/search.js`.
- **API Key Security:** Set your HEROIC API key as an environment variable in Netlify (`HEROIC_API_KEY`). Do not expose it in frontend code.
- The frontend calls `/api/search` which is proxied to the HEROIC API by the serverless function.

## Contributing

This is an MVP (Minimum Viable Product) designed to demonstrate the core functionality of a heroic search tool. Future enhancements could include:

- Database integration (MongoDB, PostgreSQL)
- User authentication and favorites
- Advanced search algorithms
- Hero comparison features
- Image galleries for heroes
- Export functionality
- Admin interface for managing heroes

## License

MIT License - Feel free to use and modify as needed.

## Environment Variables

Create a `.env` file (or export in your shell) with:

```bash
# Required for both local dev and Netlify
HEROIC_API_KEY=your_api_key_here
```

For Netlify, add `HEROIC_API_KEY` in **Site settings → Build & deploy → Environment variables**.