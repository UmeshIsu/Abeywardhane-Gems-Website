# Abeywardhane Gems — API

Node.js + Express backend that powers the contact form, gem catalog, and blog endpoints.

## Run

```bash
npm install
cp .env.example .env   # then fill in your email creds
npm run dev            # starts on port 5000 with nodemon
```

## Endpoints

| Method | Path                 | Description                                  |
|--------|----------------------|----------------------------------------------|
| GET    | `/api/health`        | Health check (`{ status, uptime, env }`)     |
| POST   | `/api/contact`       | Submit contact form (5 / hour / IP)          |
| GET    | `/api/gems`          | List gems. Optional `?tag=Precious`          |
| GET    | `/api/gems/:id`      | Single gem by id                             |
| GET    | `/api/blogs`         | List blog posts (without full content)       |
| GET    | `/api/blogs/:slug`   | Single blog post by slug                     |

## Contact form payload

```json
POST /api/contact
{
  "name":    "Jane",
  "email":   "jane@example.com",
  "phone":   "+94 ...",         // optional
  "subject": "Sapphire inquiry", // optional
  "message": "Hi, I'm looking for ..."
}
```

Responses:
- `200 { ok: true, message: "Message delivered." }`
- `400 { error: "Please enter a valid email address." }`
- `429 { error: "Too many submissions. Please try again in an hour." }`

## Setting up Gmail SMTP

1. Turn on **2-Step Verification** on your Google account.
2. Generate an **App Password** at https://myaccount.google.com/apppasswords (pick "Mail" → "Other").
3. Paste the 16-character code into `EMAIL_PASS` in `.env`.

If your team prefers a transactional service later, swap the transport in `config/mailer.js` to SendGrid, Mailgun, Resend etc. — the controller doesn't need to change.

## Swapping JSON for a real database

The current `utils/dataStore.js` reads JSON files. When you're ready for a real DB:
1. Add `mongoose` (Mongo) or `pg` (Postgres) to dependencies.
2. Replace `readCollection` with a model query — controllers stay the same.
