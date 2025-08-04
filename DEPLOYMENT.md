# Deployment Guide

## Vercel Deployment

### Prerequisites

1. **Supabase Setup**: Complete the Supabase setup first (see `SUPABASE_SETUP.md`)
2. **Environment Variables**: Have your Supabase URL and anon key ready

### Step-by-Step Deployment

#### 1. Prepare Your Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy to Vercel

**Option A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Choose your Git repository
# - Confirm build settings
```

**Option B: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings (auto-detected for Next.js)

#### 3. Configure Environment Variables

**Critical Step**: Add your Supabase environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
   ```
4. Apply to: **Production**, **Preview**, and **Development**
5. **Redeploy** your project after adding variables

#### 4. Verify Database Tables

Ensure your Supabase tables exist with correct names:
- `signups` (lowercase) - NOT `SignUps`
- `analytics` (lowercase)

Run this SQL in your Supabase SQL Editor if tables don't exist:
```sql
-- Create signups table
CREATE TABLE signups (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table  
CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  event VARCHAR(100) NOT NULL,
  action VARCHAR(100),
  platform VARCHAR(50),
  current_time DECIMAL,
  page VARCHAR(500),
  user_agent TEXT,
  referrer VARCHAR(1000),
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Troubleshooting Deployment Issues

#### 500 Error on API Routes

**Symptoms**: API calls return 500 status code, "Failed to load resource" errors

**Common Causes & Solutions**:

1. **Missing Environment Variables**
   ```bash
   # Check Vercel function logs
   vercel logs your-deployment-url
   ```
   - Verify environment variables are set in Vercel dashboard
   - Ensure no typos in variable names
   - Redeploy after adding variables

2. **Table Name Case Sensitivity**
   - Supabase table names are case-sensitive
   - Use lowercase: `signups`, `analytics`
   - NOT: `SignUps`, `Analytics`

3. **Database Connection Issues**
   - Verify Supabase URL is correct (https://your-project-id.supabase.co)
   - Check anon key is the full key (starts with `eyJ...`)
   - Ensure Supabase project is active (not paused)

4. **Build Errors**
   ```bash
   # Test build locally
   npm run build
   ```
   - Fix any TypeScript errors
   - Ensure all imports are correct

#### Environment Variables Not Loading

```bash
# Force redeploy with new environment variables
vercel --prod --force
```

#### Database Table Issues

1. Check table exists in Supabase dashboard
2. Verify table name spelling and case
3. Ensure required columns exist:
   - `signups`: `id`, `email`, `created_at`
   - `analytics`: `id`, `event`, `created_at`

### Testing Deployment

1. **Visit your deployed URL**
2. **Test signup form** - enter an email
3. **Check Supabase dashboard** - verify data appears in `signups` table
4. **Check browser console** - look for any JavaScript errors

### Monitoring

- **Vercel Functions**: Monitor API performance in Vercel dashboard
- **Supabase Logs**: Check database query logs in Supabase dashboard
- **Browser DevTools**: Monitor network requests and console errors

### Common Next.js + Supabase + Vercel Issues

1. **Environment Variables**: Always redeploy after adding/changing env vars
2. **Case Sensitivity**: Database table names must match exactly
3. **Client vs Server**: Ensure environment variables are prefixed correctly
4. **Build Cache**: Clear Vercel build cache if issues persist

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

## Alternative Deployment Options

### Netlify
1. Similar process to Vercel
2. Add environment variables in site settings
3. Enable Edge Functions for API routes

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Railway auto-detects Next.js apps

### Self-Hosted
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx)
4. Set environment variables on server

---

**Need help?** Check the troubleshooting section above or create an issue in the repository.