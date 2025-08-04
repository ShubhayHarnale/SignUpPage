'use client'

import { useState } from 'react'
import SignupForm from '@/components/SignupForm'
import VideoPlayer from '@/components/VideoPlayer'
import StickyDemoButton from '@/components/StickyDemoButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Waitlist Alert */}
          <div className="text-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">🚀 Sign up for the waitlist now to be the first one to get access!</p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Turn Any Voice Recording Into{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Weeks of Social Media Content
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Upload a webinar, seminar, or coaching session. Get LinkedIn posts, Instagram captions, 
                Twitter threads, and more - all optimized for each platform.
              </p>
            </div>

            {/* Video Player - Moved Above Everything */}
            <div id="video-demo" className="w-full">
              <VideoPlayer />
            </div>

            {/* 3-Step Process */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Upload your audio/video recording</h3>
                    <p className="text-gray-600">Drag and drop your webinar, podcast, or any speaking content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI transcribes and analyzes your content</h3>
                    <p className="text-gray-600">Our AI extracts key insights, quotes, and actionable content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Get ready-to-post content for 8+ platforms instantly</h3>
                    <p className="text-gray-600">Receive optimized posts for LinkedIn, Instagram, Twitter, and more</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <SignupForm />
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Contact: <a href="mailto:shubhayharnale@gmail.com" className="text-blue-600 hover:text-blue-800 underline">shubhayharnale@gmail.com</a>
          </p>
        </div>

      </div>
      
      {/* Sticky Demo Button */}
      <StickyDemoButton />
    </div>
  )
}