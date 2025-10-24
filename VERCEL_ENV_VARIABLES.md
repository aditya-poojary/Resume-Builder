# 🔑 Environment Variables for Vercel

Copy and paste these into Vercel Dashboard → Settings → Environment Variables

---

## Required Environment Variables

### 1. DATABASE_URL
**Description**: PostgreSQL connection string from Supabase  
**Where to get it**: Supabase Dashboard → Settings → Database → Connection String  
**Use**: Session Mode or Transaction Mode (NOT Pooling Mode)

```
Value: postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

Example:
```
postgresql://postgres.abcdefghijklmnop:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

### 2. NEXT_PUBLIC_SUPABASE_URL
**Description**: Your Supabase project URL  
**Where to get it**: Supabase Dashboard → Settings → API → Project URL

```
Value: https://[PROJECT-REF].supabase.co
```

Example:
```
https://abcdefghijklmnop.supabase.co
```

---

### 3. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Description**: Supabase anonymous/public API key  
**Where to get it**: Supabase Dashboard → Settings → API → Project API keys → anon public

```
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Example (this is a long JWT token):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzg1MzIwMCwiZXhwIjoxOTM5NDI5MjAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 4. NEXT_PUBLIC_APP_URL
**Description**: Your deployed application URL  
**Value**: Use Vercel's auto-generated URL or custom domain

**First Deployment (use this initially):**
```
Value: https://resume-builder-aditya-poojary.vercel.app
```

**After Deployment (update with your actual URL):**
```
Value: https://your-actual-vercel-url.vercel.app
```

Or if you have a custom domain:
```
Value: https://yourdomain.com
```

---

## 📋 Quick Copy Template

For easy copying to Vercel:

```env
# Environment Variables for Vercel

# Database
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App URL
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
```

---

## 🎯 How to Add to Vercel

### Via Vercel Dashboard:

1. Go to your project in Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. For each variable:
   - Click "Add New"
   - Enter **Key** (e.g., `DATABASE_URL`)
   - Enter **Value** (paste the actual value)
   - Select environments: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

### Via Vercel CLI:

```bash
# Add each variable one by one
vercel env add DATABASE_URL production
# Paste value when prompted

vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste value when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste value when prompted

vercel env add NEXT_PUBLIC_APP_URL production
# Paste value when prompted
```

---

## ⚠️ Important Notes

1. **Never commit these values to Git!** They are secrets.

2. **NEXT_PUBLIC_** prefix makes variables available in browser. Only use for non-sensitive data.

3. **DATABASE_URL** is server-only (no NEXT_PUBLIC_ prefix) - safe for sensitive data.

4. After adding environment variables, **redeploy** your application:
   - Vercel Dashboard → Deployments → Click "..." → Redeploy
   - Or run: `vercel --prod`

5. **Update NEXT_PUBLIC_APP_URL** after first deployment with your actual Vercel URL.

---

## 🔄 Post-Deployment Steps

After adding environment variables and deploying:

1. **Update Supabase Redirect URLs**:
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add: `https://your-vercel-url.vercel.app/**`
   - Add: `https://your-vercel-url.vercel.app/auth/callback`

2. **Test Authentication**:
   - Sign up with a new email
   - Verify email works
   - Login works
   - OAuth (Google) works if enabled

3. **Test Database**:
   - Create a resume
   - Save changes
   - Reload page (data persists)

---

## 🆘 Troubleshooting

### "Database connection failed"
- Check DATABASE_URL is correct
- Use Session/Transaction mode URL (not Pooling)
- Ensure Supabase project is active

### "Invalid API key"
- Double-check NEXT_PUBLIC_SUPABASE_ANON_KEY
- Make sure you copied the full JWT token
- Check for extra spaces or line breaks

### "Authentication redirect error"
- Update Supabase redirect URLs with your Vercel URL
- Ensure NEXT_PUBLIC_APP_URL matches your deployed URL
- Redeploy after updating environment variables

---

## ✅ Ready to Deploy!

Once you have all these values:

1. Add them to Vercel
2. Deploy your project
3. Update NEXT_PUBLIC_APP_URL with actual URL
4. Redeploy
5. Update Supabase redirect URLs
6. Test everything!

🚀 Happy deploying!
