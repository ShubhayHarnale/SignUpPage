'use client'

import { useState, useEffect } from 'react'

const platforms = [
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600' },
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-600' },
  { id: 'twitter', name: 'Twitter', color: 'bg-sky-500' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-700' },
  { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
  { id: 'youtube', name: 'YouTube', color: 'bg-red-600' }
]

const sampleContent = {
  linkedin: {
    title: "3 Key Strategies That Transform Your Business",
    content: `🚀 Just wrapped up an incredible session on business transformation!

Here are the 3 game-changing strategies we covered:

1️⃣ FOCUS ON VALUE DELIVERY
Stop chasing every opportunity. Focus on delivering exceptional value to your core audience.

2️⃣ AUTOMATE THE ROUTINE
Free up your time by automating repetitive tasks. Your energy should go toward strategy, not busy work.

3️⃣ BUILD AUTHENTIC RELATIONSHIPS
People buy from people they trust. Invest in genuine connections over transactional interactions.

Which strategy resonates most with you? 👇

#BusinessGrowth #Entrepreneurship #Leadership`,
    engagement: "127 likes • 23 comments • 8 shares"
  },
  instagram: {
    title: "Transform Your Business Mindset 💪",
    content: `✨ SWIPE for the 3 strategies that will transform your business ➡️

From today's coaching session:
💡 Value over volume
⚡ Automation saves time  
🤝 Relationships = revenue

Which one will you implement first? Drop a 🔥 in the comments!

#BusinessTips #EntrepreneurLife #CoachingSession #BusinessGrowth #Mindset`,
    engagement: "89 likes • 12 comments"
  },
  twitter: {
    title: "Business Transformation Thread",
    content: `🧵 3 strategies that transform businesses (from today's session):

1/ Stop chasing every opportunity
Focus on delivering exceptional value to your core audience instead

2/ Automate the routine tasks
Your energy should go toward strategy, not busy work

3/ Build authentic relationships
People buy from people they trust

Which strategy will you implement first? 👇

#BusinessGrowth #Entrepreneurship`,
    engagement: "45 retweets • 78 likes • 12 replies"
  },
  facebook: {
    title: "Business Transformation Insights",
    content: `Just finished an amazing coaching session on business transformation! 🚀

The three key takeaways that everyone should know:

🎯 Focus on Value Delivery
Instead of chasing every opportunity, focus on delivering exceptional value to your core audience. Quality over quantity always wins.

⚡ Automate the Routine
Free up your precious time by automating repetitive tasks. Your energy should be spent on strategy and growth, not busy work.

🤝 Build Authentic Relationships  
People buy from people they trust. Invest time in building genuine connections rather than just transactional interactions.

What's your biggest business challenge right now? Let me know in the comments - I love helping fellow entrepreneurs! 💪

#BusinessGrowth #Entrepreneurship #CoachingTips`,
    engagement: "23 reactions • 8 comments • 4 shares"
  },
  tiktok: {
    title: "3 Business Secrets Revealed",
    content: `3 secrets that transform ANY business 🤫

✅ Value over volume (stop chasing everything!)
✅ Automate the boring stuff  
✅ Build real relationships

Which secret surprised you most? 👀

Follow for more business tips! 

#BusinessTips #Entrepreneur #Success #BusinessSecrets #CoachingTips`,
    engagement: "1.2K views • 89 likes • 23 comments"
  },
  youtube: {
    title: "3 Game-Changing Business Strategies",
    content: `🎯 DESCRIPTION:
In this video, I share the 3 key strategies from my latest coaching session that can transform any business:

1. Focus on Value Delivery (2:15)
2. Automate Routine Tasks (5:30) 
3. Build Authentic Relationships (8:45)

These strategies have helped hundreds of my clients scale their businesses. Which one will you implement first?

⏰ TIMESTAMPS:
0:00 - Introduction
2:15 - Strategy #1: Value Delivery
5:30 - Strategy #2: Smart Automation  
8:45 - Strategy #3: Relationship Building
12:00 - Action Steps & Wrap-up

💬 Let me know in the comments which strategy resonates most with you!

#BusinessGrowth #Entrepreneurship #BusinessCoaching`,
    engagement: "234 views • 18 likes • 5 comments"
  }
}

export default function InteractiveDemo() {
  const [activePlatform, setActivePlatform] = useState('linkedin')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % platforms.length
          setActivePlatform(platforms[nextIndex].id)
          return nextIndex
        })
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const currentContent = sampleContent[activePlatform as keyof typeof sampleContent]

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border lg:sticky lg:top-8">
      {/* Demo Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Demo Preview</h3>
          <button
            onClick={() => {
              setIsPlaying(!isPlaying)
              
              // Track demo interaction
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('demo-interaction', {
                  detail: { action: isPlaying ? 'pause_demo' : 'play_demo' }
                }))
              }
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isPlaying 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isPlaying ? '⏸ Pause Demo' : '▶ Play Demo'}
          </button>
        </div>
      </div>

      {/* Upload Area Mockup */}
      <div className="p-6 border-b bg-gray-50">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">business-webinar.mp4</span> uploaded
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => {
                setActivePlatform(platform.id)
                setIsPlaying(false)
                
                // Track demo interaction
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('demo-interaction', {
                    detail: { action: 'platform_click', platform: platform.id }
                  }))
                }
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                activePlatform === platform.id
                  ? `${platform.color} text-white shadow-md`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Preview */}
      <div className="p-6 space-y-4 min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${platforms.find(p => p.id === activePlatform)?.color} flex items-center justify-center text-white font-semibold text-sm`}>
            {platforms.find(p => p.id === activePlatform)?.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{currentContent.title}</p>
            <p className="text-sm text-gray-500">Generated content</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
            {currentContent.content}
          </pre>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t">
          <span>{currentContent.engagement}</span>
          <span className="text-xs">Generated in 2.3s</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
            📋 Copy
          </button>
          <button className="flex-1 bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
            ✏️ Edit
          </button>
          <button className="flex-1 bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
            📤 Schedule
          </button>
        </div>
      </div>
    </div>
  )
}