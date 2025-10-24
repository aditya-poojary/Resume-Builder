# Netlify Environment Variables Setup

## Error You're Seeing

```
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```

## Solution: Add Environment Variables

### Option 1: Via Netlify Dashboard (RECOMMENDED)

Go to: https://app.netlify.com → Your Site → Site Settings → Environment Variables

Add these 4 variables:

#### 1. NEXT_PUBLIC_SUPABASE_URL

```
https://etwybhvsfktpdraemwyv.supabase.co
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3liaHZzZmt0cGRyYWVtd3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDU1NDcsImV4cCI6MjA3NjUyMTU0N30.EQAovr6Ic8IDNVI5xY74jSkxL1T7ZgJ9GiXe46mzhio
```

#### 3. DATABASE_URL

```
postgresql://postgres.etwybhvsfktpdraemwyv:HtGKsNh4ioTXHwf6@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
```

#### 4. NEXT_PUBLIC_APP_URL

```
https://[YOUR-SITE-NAME].netlify.app
```

⚠️ Replace `[YOUR-SITE-NAME]` with your actual Netlify site name

### For Each Variable:

- ✅ Check all scopes: **Production**, **Deploy Preview**, **Branch deploys**
- ✅ Click "Create variable"

---

### Option 2: Via Netlify CLI

Install Netlify CLI if you haven't:

```bash
npm install -g netlify-cli
```

Login to Netlify:

```bash
netlify login
```

Link your site:

```bash
netlify link
```

Add environment variables:

```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://etwybhvsfktpdraemwyv.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d3liaHZzZmt0cGRyYWVtd3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDU1NDcsImV4cCI6MjA3NjUyMTU0N30.EQAovr6Ic8IDNVI5xY74jSkxL1T7ZgJ9GiXe46mzhio"
netlify env:set DATABASE_URL "postgresql://postgres.etwybhvsfktpdraemwyv:HtGKsNh4ioTXHwf6@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
netlify env:set NEXT_PUBLIC_APP_URL "https://[YOUR-SITE-NAME].netlify.app"
```

---

## After Adding Environment Variables

### 1. Trigger a New Build

Go to: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

Or via CLI:

```bash
netlify deploy --prod
```

### 2. Update Supabase Redirect URLs

After successful deployment, go to Supabase Dashboard:

**Supabase** → **Authentication** → **URL Configuration**

Add:

- Site URL: `https://[YOUR-SITE-NAME].netlify.app`
- Redirect URLs: `https://[YOUR-SITE-NAME].netlify.app/**`

---

## Verify Setup

After deployment completes:

1. ✅ Visit your Netlify site
2. ✅ Try signing up with a new account
3. ✅ Test login/logout
4. ✅ Create a resume
5. ✅ Verify data persists

---

## Troubleshooting

### Build still failing?

- Check all 4 variables are added correctly
- Make sure scopes include "Production"
- Clear cache and redeploy

### Authentication not working?

- Update Supabase redirect URLs
- Check NEXT_PUBLIC_APP_URL matches your Netlify URL

### Database errors?

- Verify DATABASE_URL has the correct password
- Check connection pooler URL is correct
