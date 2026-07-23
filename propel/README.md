# Propel — AI Marketing Platform for Founders

> Stop guessing. Start launching. Every marketing tool founders need in one place.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Anthropic Claude · Stripe · Resend

---

## Features

| Tool | Plan | Description |
|------|------|-------------|
| AI Copy Engine | Free | Taglines, headlines, email subjects, social posts |
| Launch Checklist | Free | 100+ point battle-tested launch checklist |
| ICP Builder | Free | Ideal Customer Profile + targeting playbook |
| Press Kit Builder | Pro | Auto-generated press kits with AI |
| Content Calendar | Pro | Multi-channel content scheduling |
| Email Drip Builder | Pro | AI-written email sequences |
| SEO Analyzer | Pro | Landing page audit + keyword gaps |
| Analytics Hub | Scale | All-channel metrics + AI weekly summary |
| Competitor Intel | Scale | Real-time competitor monitoring |

---

## 🚀 Push to GitHub — Step-by-Step Guide

### Step 1 — Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `propel` (or your preferred name)
3. Set to **Private** (you can make it public later)
4. **Do NOT** add a README, .gitignore, or license (we have those already)
5. Click **Create repository**
6. Copy the repository URL (e.g. `https://github.com/yourusername/propel.git`)

### Step 2 — Initialize and Push

Open your terminal, navigate to the project folder, then run:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. First commit
git commit -m "feat: initial Propel launch — AI marketing platform"

# 4. Connect to GitHub (replace with your actual URL)
git remote add origin https://github.com/yourusername/propel.git

# 5. Push to main branch
git branch -M main
git push -u origin main
```

Done! Your code is now on GitHub. ✓

---

## ⚙️ Local Development Setup

### Step 1 — Install Dependencies

```bash
npm install
```

### Step 2 — Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Project Settings → API
3. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run

### Step 3 — Set Up Anthropic

1. Go to [console.anthropic.com](https://console.anthropic.com) → API Keys → Create key
2. Copy the key starting with `sk-ant-...`

### Step 4 — Set Up Stripe (optional for now)

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create 4 prices: Builder Monthly ($29), Builder Annual ($23), Scale Monthly ($89), Scale Annual ($71)
3. Copy the price IDs

### Step 5 — Configure Environment Variables

```bash
# Copy the template
cp .env.local.example .env.local

# Edit .env.local with your actual values
nano .env.local   # or open in VS Code: code .env.local
```

Fill in all values — at minimum:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`

### Step 6 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the landing page.

---

## 🌐 Deploy to Vercel

### Option A — Vercel Dashboard (easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import from GitHub** → select your `propel` repo
3. Framework: **Next.js** (auto-detected)
4. Click **Environment Variables** → add all variables from `.env.local`
5. Click **Deploy**

Done! You'll get a live URL in ~2 minutes.

### Option B — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel

# Add env vars
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
# ... add all other env vars

# Deploy to production
vercel --prod
```

---

## 📁 Project Structure

```
propel/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── auth/page.tsx         # Login / Signup
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        # Sidebar + topbar
│   │   │   ├── copy/page.tsx     # AI Copy Engine
│   │   │   ├── checklist/page.tsx # Launch Checklist
│   │   │   ├── presskit/page.tsx # Press Kit Builder
│   │   │   ├── calendar/page.tsx # Content Calendar
│   │   │   └── analytics/page.tsx # Analytics Hub
│   │   └── api/
│   │       └── generate/route.ts # AI generation endpoint
│   ├── lib/
│   │   ├── supabase.ts           # Supabase browser client
│   │   └── supabase-server.ts    # Supabase server client
│   └── middleware.ts             # Route protection
├── supabase/
│   └── schema.sql                # Database schema
├── .env.local.example            # Environment variables template
└── README.md
```

---

## 🔧 Adding New Features

### Add a new dashboard tool

1. Create `src/app/dashboard/your-tool/page.tsx`
2. Add to the `NAV` array in `src/app/dashboard/layout.tsx`
3. Add a new case in `src/app/api/generate/route.ts` if it needs AI

### Add a new AI generation type

In `src/app/api/generate/route.ts`, add:

```typescript
if (type === "your-type") {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: `Your prompt here: ${payload.data}` }],
  });
  const result = JSON.parse(message.content[0].text.replace(/```json|```/g, "").trim());
  return NextResponse.json({ result });
}
```

---

## Pricing Plans

| Plan | Price | AI Credits | Projects | Team |
|------|-------|-----------|----------|------|
| Starter | Free | 10/month | 1 | Solo |
| Builder | $29/mo | Unlimited | 5 | Solo |
| Scale | $89/mo | Unlimited | Unlimited | 5 seats |

---

## Support

Built with ❤️ for founders who ship.
