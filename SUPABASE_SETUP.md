# Supabase Setup Guide

## Step 1: Create Supabase Account and Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or create an account
4. Create a new project:
   - Choose organization
   - Enter project name: `signup-page` or similar
   - Choose database password (save this!)
   - Select region closest to your users
   - Click "Create new project"

## Step 2: Create Database Tables

Once your project is created:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run these SQL commands to create the required tables:

### Create Signups Table
```sql
-- Create signups table
CREATE TABLE signups (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX idx_signups_email ON signups(email);
CREATE INDEX idx_signups_created_at ON signups(created_at);
```

### Create Analytics Table
```sql
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

-- Create indexes for analytics
CREATE INDEX idx_analytics_event ON analytics(event);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
```

## Step 3: Get API Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL**: `https://[your-project-id].supabase.co`
   - **anon public key**: `eyJ...` (long string)

## Step 4: Configure Environment Variables

1. Update your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. For Vercel deployment, add these as Environment Variables in your Vercel dashboard:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add both variables with their values

## Step 5: Test the Setup

1. Start your local development server:
```bash
npm run dev
```

2. Test signup form on your landing page
3. Check data in Supabase dashboard:
   - Go to **Table Editor**
   - View `signups` and `analytics` tables
   - Verify data is being stored

## Step 6: View Your Data

### Via Supabase Dashboard
- **Table Editor**: Visual interface to see all signups
- **SQL Editor**: Run custom queries
- **Real-time**: See data updates live

### Via API Endpoints
- **View signups**: `http://localhost:3001/api/signup`
- **View analytics**: `http://localhost:3001/api/analytics`

## Security Notes

- The `anon` key is safe to use in client-side code
- Supabase handles authentication and security automatically
- Row Level Security (RLS) can be enabled for additional protection

## Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Restart your dev server after adding them
2. **Table doesn't exist**: Make sure you ran the SQL commands above
3. **Network error**: Check your Supabase URL and keys are correct

### Support:
- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- Community: [community.supabase.com](https://community.supabase.com)

## Free Tier Limits

Supabase free tier includes:
- 500MB database storage
- 50,000 monthly active users
- 2GB bandwidth
- Perfect for your waitlist landing page!

Your signup data will now persist across all deployments and be accessible from anywhere! 🚀