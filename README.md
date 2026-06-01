# Abeywardhane Gems — Full-Stack Website

A modern, responsive business portfolio for Abeywardhane Gems built with React + Express.

## 🏗️ Tech Stack

### Frontend (`/client`)
- **React 18** + **Vite** — fast dev server, optimized builds
- **React Router v6** — multi-page routing (Home, Services, Gallery, Blog, Contact)
- **Tailwind CSS** — utility-first styling with custom theme tokens
- **Framer Motion** — typing animation, hero slider transitions, scroll reveals
- **Lucide React** — clean, consistent icon set
- **Axios** — API requests to backend

### Backend (`/server`)
- **Node.js** + **Express** — REST API
- **Nodemailer** — sends contact-form messages to your inbox
- **CORS** + **Helmet** — security middleware
- **dotenv** — environment configuration
- **JSON file storage** — for blog posts / gem catalog (swap to MongoDB later if needed)

### Integrations
- **Google Maps** — embedded location map (no API key needed for basic embed)
- **WhatsApp Click-to-Chat** — opens WhatsApp directly with pre-filled message
- **Email (Gmail SMTP / SendGrid)** — receives contact form submissions

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
# Install both client + server deps at once
npm run install:all

# Or individually:
cd client && npm install
cd ../server && npm install
```

### 2. Set up environment variables

Copy the example env files and fill in your values:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

**Server `.env` essentials:**
- `EMAIL_USER` — your Gmail address (the one that will *send* messages)
- `EMAIL_PASS` — a Gmail [App Password](https://myaccount.google.com/apppasswords) (NOT your regular password)
- `EMAIL_TO` — where contact-form submissions are delivered
- `WHATSAPP_NUMBER` — your business WhatsApp number (e.g. `94740304669`)

**Client `.env` essentials:**
- `VITE_API_URL` — backend URL (default `http://localhost:5000/api`)
- `VITE_WHATSAPP_NUMBER` — same WhatsApp number
- `VITE_GOOGLE_MAPS_EMBED` — your Google Maps embed URL

### 3. Run in development

From the project root:

```bash
npm run dev
```

This starts both servers concurrently:
- Client: http://localhost:5173
- API:    http://localhost:5000

### 4. Build for production

```bash
npm run build
```

The client builds into `client/dist/` — deploy that to Vercel/Netlify, and host the server on Railway/Render/Heroku.

---

## 📁 Project Structure

```
abeywardhane-gems/
├── client/                  # React frontend
│   ├── public/              # static assets (favicon, images)
│   ├── src/
│   │   ├── assets/          # gem images, logos
│   │   ├── components/
│   │   │   ├── layout/      # Navbar, Footer, Layout shell
│   │   │   ├── sections/    # Hero, WhatWeDo, Services, Collection
│   │   │   └── ui/          # reusable buttons, cards, etc.
│   │   ├── data/            # static content (gems, services)
│   │   ├── hooks/           # custom React hooks
│   │   ├── lib/             # API client, WhatsApp helper
│   │   ├── pages/           # Home, Services, Gallery, Blog, Contact
│   │   ├── styles/          # global CSS + Tailwind
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                  # Express backend
│   ├── config/              # nodemailer transport
│   ├── controllers/         # request handlers
│   ├── middleware/          # validation, error handlers
│   ├── routes/              # /api/contact, /api/gems, /api/blogs
│   ├── data/                # JSON databases (gems.json, blogs.json)
│   ├── utils/               # email templates
│   ├── index.js             # server entry
│   └── package.json
└── package.json             # root scripts
```

---

## 🌐 API Endpoints

| Method | Path                | Purpose                            |
|--------|---------------------|------------------------------------|
| GET    | `/api/health`       | Health check                       |
| POST   | `/api/contact`      | Submit contact form (sends email)  |
| GET    | `/api/gems`         | List all gems in catalog           |
| GET    | `/api/gems/:id`     | Single gem detail                  |
| GET    | `/api/blogs`        | List blog posts                    |
| GET    | `/api/blogs/:slug`  | Single blog post                   |

---

## 📦 Deployment

**Recommended free hosting:**
- Client → **Vercel** (auto-deploy from GitHub)
- Server → **Render** or **Railway** (free tier sufficient for a portfolio site)

Update `VITE_API_URL` in `client/.env` to point at your deployed server URL before building.

---

## 📧 Contact

Phone / WhatsApp: +94 74 030 4669
