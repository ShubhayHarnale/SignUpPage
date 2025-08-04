# Deployment Checklist

## Pre-Deployment ✅

### 1. Supabase Setup
- [ ] Supabase project created
- [ ] Database tables created with correct names:
  - [ ] `signups` table (lowercase)
  - [ ] `analytics` table (lowercase)
- [ ] Tables have required columns:
  - [ ] `signups`: `id`, `email`, `created_at`
  - [ ] `analytics`: `id`, `event`, `created_at`
- [ ] Supabase URL and anon key copied

### 2. Local Testing
- [ ] Environment variables set in `.env.local`:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Local development server runs: `npm run dev`
- [ ] Signup form works locally
- [ ] Data appears in Supabase dashboard
- [ ] No console errors

### 3. Code Quality
- [ ] All changes committed to Git
- [ ] Code pushed to main branch
- [ ] Build succeeds locally: `npm run build`
- [ ] No TypeScript errors
- [ ] All API routes use lowercase table names

## Deployment ✅

### 4. Vercel Setup
- [ ] Vercel project created/connected
- [ ] Repository imported correctly
- [ ] Initial deployment successful

### 5. Environment Variables
- [ ] Added in Vercel dashboard:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Applied to all environments (Production, Preview, Development)
- [ ] Project redeployed after adding variables

## Post-Deployment Testing ✅

### 6. Functionality Tests
- [ ] Website loads without errors
- [ ] Signup form visible and styled correctly
- [ ] Email submission works
- [ ] Success message displays
- [ ] Data appears in Supabase `signups` table
- [ ] Analytics tracking works (if implemented)

### 7. Error Monitoring
- [ ] No 500 errors in browser network tab
- [ ] No JavaScript errors in console
- [ ] Vercel function logs show no errors
- [ ] Supabase logs show successful queries

### 8. Cross-Platform Testing
- [ ] Works on desktop
- [ ] Works on mobile devices
- [ ] Works in different browsers
- [ ] Form validation works correctly

## Troubleshooting Checklist ⚠️

### If Getting 500 Errors:
- [ ] Check Vercel function logs: `vercel logs [deployment-url]`
- [ ] Verify environment variables are set correctly
- [ ] Confirm table names are lowercase in code
- [ ] Check Supabase project is active (not paused)
- [ ] Verify database URL and keys are correct

### If Environment Variables Not Working:
- [ ] Double-check variable names (no typos)
- [ ] Ensure variables are applied to production environment
- [ ] Redeploy project: `vercel --prod --force`
- [ ] Check `.env.example` for reference

### If Database Errors:
- [ ] Verify tables exist in Supabase dashboard
- [ ] Check table names match code exactly (case-sensitive)
- [ ] Ensure required columns exist
- [ ] Check Supabase project permissions

## Final Verification ✅

- [ ] **Production URL works**: ________________
- [ ] **Signup form functional**: Email submitted successfully
- [ ] **Data persistence**: Data visible in Supabase dashboard
- [ ] **No errors**: Clean browser console and network tabs
- [ ] **Mobile responsive**: Tested on mobile device

---

## Quick Commands

```bash
# Local testing
npm run dev

# Check build
npm run build

# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs [deployment-url]

# Force redeploy
vercel --prod --force
```

## Environment Variables Template

```bash
# Copy these to Vercel Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**🎉 Deployment Complete!** Your VoiceToSocial landing page is live and collecting signups! 