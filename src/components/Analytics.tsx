'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

export default function Analytics() {
  useEffect(() => {
    // Basic page view tracking
    const trackPageView = () => {
      if (typeof window !== 'undefined') {
        console.log('Page view:', window.location.pathname)
        
        // Send to your analytics service (replace with your actual implementation)
        // Example: Google Analytics, Mixpanel, etc.
        fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'page_view',
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        }).catch(err => console.log('Analytics error:', err))
      }
    }

    trackPageView()

    // Track video interactions
    const trackVideoInteraction = (event: CustomEvent) => {
      console.log('Video interaction:', event.detail)
      
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'video_interaction',
          action: event.detail.action,
          currentTime: event.detail.currentTime,
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.log('Analytics error:', err))
    }

    // Track signup attempts
    const trackSignup = (event: CustomEvent) => {
      console.log('Signup event:', event.detail)
      
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: event.detail.success ? 'signup_success' : 'signup_attempt',
          timestamp: new Date().toISOString(),
        }),
      }).catch(err => console.log('Analytics error:', err))
    }

    // Add event listeners
    window.addEventListener('video-interaction', trackVideoInteraction as EventListener)
    window.addEventListener('signup-event', trackSignup as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener('video-interaction', trackVideoInteraction as EventListener)
      window.removeEventListener('signup-event', trackSignup as EventListener)
    }
  }, [])

  return (
    <>
      {/* You can add Google Analytics or other tracking scripts here */}
      {/* Example Google Analytics (replace GA_MEASUREMENT_ID with your actual ID):
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      */}
    </>
  )
}