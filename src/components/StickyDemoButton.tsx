'use client'

import { useState, useEffect } from 'react'

export default function StickyDemoButton() {
  const [isVisible, setIsVisible] = useState(true) // Always visible initially
  const [isInVideoSection, setIsInVideoSection] = useState(false)

  useEffect(() => {
    const checkVideoSection = () => {
      const videoSection = document.querySelector('#video-demo')
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect()
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0
        setIsInVideoSection(isInView)
        
        // Hide button when video is in view, show otherwise
        setIsVisible(!isInView)
      }
    }

    // Check immediately and on scroll
    checkVideoSection()
    window.addEventListener('scroll', checkVideoSection)
    return () => window.removeEventListener('scroll', checkVideoSection)
  }, [])

  const scrollToDemo = () => {
    const videoSection = document.querySelector('#video-demo')
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }

    // Track demo button click
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('video-interaction', {
        detail: { action: 'sticky_button_click' }
      }))
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToDemo}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center space-x-2 animate-pulse"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <span className="hidden sm:inline font-bold">Watch Demo</span>
    </button>
  )
}