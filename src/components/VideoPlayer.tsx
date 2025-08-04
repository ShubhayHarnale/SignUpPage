'use client'

import { useState, useRef, useEffect } from 'react'

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasVideo, setHasVideo] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    
    // Video interaction tracked by Vercel analytics
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
    
    // Video seeking tracked by Vercel analytics
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Check for video file and set up video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      setHasVideo(true)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      console.log('Video load error - check if MeetingMind.mov exists in /public/videos/')
      // Keep hasVideo as true to always show the video player
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <div className="w-full mx-auto">
      {/* Video Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
        {/* Video Element */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="metadata"
            controls={false}
            playsInline
            muted={false}
            onClick={handlePlayPause}
          >
            <source src="/videos/MeetingMind.mov" type="video/quicktime" />
            <source src="/videos/MeetingMind.mov" type="video/mp4" />
            <p className="text-white p-4">Your browser does not support the video tag. Please try a different browser or download the video.</p>
          </video>

          {/* Play/Pause Button Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            onClick={handlePlayPause}
          >
            <div className={`w-24 h-24 bg-white/95 hover:bg-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl transform group-hover:scale-110 transition-all duration-300 ${!isPlaying ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100'}`}>
              {isPlaying ? (
                <svg className="w-10 h-10 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4v16h4V4H6zm8 0v16h4V4h-4z"/>
                </svg>
              ) : (
                <svg className="w-10 h-10 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </div>
          </div>

          {/* Progress Bar Overlay */}
          {duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
              <div className="flex items-center space-x-3 text-white text-xs">
                <span>{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all duration-300"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Description */}
      <div className="mt-6 text-center space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Watch MeetingMind in Action</h3>
        <p className="text-gray-600 max-w-lg mx-auto">
          See how we transform a 30-minute webinar into weeks of optimized social media content 
          across 8+ platforms in just minutes.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Real-time processing</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Platform optimization</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Ready to post</span>
          </div>
        </div>
      </div>
    </div>
  )
}