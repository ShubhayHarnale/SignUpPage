# Deployment Guide

## Quick Start with Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts and your site will be live in minutes!

## Alternative: Deploy via Vercel Website

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

## Environment Variables (Optional)

For production, you can add these environment variables in Vercel dashboard:

- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL for analytics

## Post-Deployment

1. **Test the signup form** - Make sure emails are being collected
2. **Check analytics** - Visit `/api/analytics` to see event tracking
3. **View signups** - Visit `/api/signup` to see signup data
4. **Mobile testing** - Test on various devices

## Data Access

Your signup and analytics data will be stored in JSON files on the server:
- Signups: `/data/signups.json`
- Analytics: `/data/analytics.json`

For a production app, consider migrating to a proper database like:
- Supabase (free tier)
- PlanetScale (free tier)
- MongoDB Atlas (free tier)

## Custom Domain

1. In Vercel dashboard, go to your project
2. Go to Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed

Your VoiceToSocial landing page is now live! 🚀