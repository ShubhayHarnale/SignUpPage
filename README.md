# VoiceToSocial Landing Page

A modern, responsive landing page for collecting early access signups for an AI tool that converts voice recordings into social media content.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎯 **Conversion Focused**: Clean, modern design optimized for email signups
- 🎮 **Interactive Demo**: Live preview of the app with platform-specific content
- 📊 **Analytics Ready**: Built-in event tracking and analytics
- 💾 **Simple Storage**: JSON-based email and analytics storage
- ⚡ **Fast Deployment**: Ready for Vercel deployment

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

The app will be deployed with automatic serverless functions for the API routes.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Features

### Email Signup
- Email validation
- Duplicate prevention
- Success/error states
- Simple JSON storage

### Interactive Demo
- 6 social media platforms
- Auto-playing demo mode
- Realistic sample content
- Platform-specific styling

### Analytics
- Page view tracking
- Demo interaction tracking
- Signup conversion tracking
- Basic analytics dashboard at `/api/analytics`

## API Endpoints

- `POST /api/signup` - Submit email signup
- `GET /api/signup` - View signup statistics
- `POST /api/analytics` - Track events
- `GET /api/analytics` - View analytics summary

## Data Storage

Data is stored in JSON files in the `/data` directory:
- `signups.json` - Email signups
- `analytics.json` - Event tracking data

## Customization

### Content
- Update headlines and copy in `src/app/page.tsx`
- Modify demo content in `src/components/InteractiveDemo.tsx`
- Change company info in layout metadata

### Styling
- Tailwind CSS for all styling
- Gradient backgrounds and modern design
- Fully customizable color scheme

### Analytics
- Built-in event tracking
- Ready for Google Analytics integration
- Custom analytics endpoint

## License

MIT License - feel free to use for your own projects!