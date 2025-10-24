# ✅ Vercel Deployment Checklist

## Pre-Deployment
- [x] Build successful (`npm run build` ✅)
- [x] Code pushed to GitHub
- [ ] Supabase project created
- [ ] Environment variables ready

## Deployment Steps

### 1. Import to Vercel
- [ ] Go to https://vercel.com/new
- [ ] Select GitHub repository: `aditya-poojary/Resume-Builder`
- [ ] Click "Import"

### 2. Add Environment Variables
- [ ] `DATABASE_URL` (from Supabase → Settings → Database)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (from Supabase → Settings → API)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase → Settings → API)
- [ ] `NEXT_PUBLIC_APP_URL` (use Vercel URL after deployment)

### 3. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Copy your Vercel URL

### 4. Update Configuration
- [ ] Update `NEXT_PUBLIC_APP_URL` in Vercel with actual URL
- [ ] Add Vercel URL to Supabase redirect URLs
- [ ] Redeploy application

### 5. Test Deployment
- [ ] Homepage loads
- [ ] Sign up works
- [ ] Email verification works
- [ ] Login works
- [ ] Create resume works
- [ ] Edit resume works
- [ ] Save resume works
- [ ] Download PDF works
- [ ] Logout works

## Post-Deployment
- [ ] Custom domain configured (optional)
- [ ] DNS settings updated (if custom domain)
- [ ] Environment variables updated for custom domain
- [ ] Monitoring set up in Vercel
- [ ] Database backups enabled in Supabase

## 🎉 Deployment Complete!

Your app is live at: `https://_______________________.vercel.app`

---

## Quick Commands

```bash
# Push changes
git add .
git commit -m "Update"
git push origin main

# Deploy via CLI
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

## Need Help?

📖 Check `DEPLOYMENT_GUIDE.md` for detailed instructions  
🔑 Check `VERCEL_ENV_VARIABLES.md` for environment variable setup  
🌐 Vercel Dashboard: https://vercel.com/dashboard  
🗄️ Supabase Dashboard: https://app.supabase.com
