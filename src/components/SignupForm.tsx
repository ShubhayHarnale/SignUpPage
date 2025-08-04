'use client'

import { useState } from 'react'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Signup attempt - analytics handled by Vercel

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setEmail('')
        
        // Successful signup - analytics handled by Vercel
      } else {
        const data = await response.json()
        setError(data.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-800">Welcome to the waitlist!</h3>
            <p className="text-green-700">We'll notify you as soon as VoiceToSocial is ready.</p>
          </div>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
        >
          Sign up another email
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Early Access</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
        
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isSubmitting ? 'Joining...' : 'Join Early Access'}
        </button>
      </form>
      
      <p className="text-sm text-gray-500 mt-3 text-center">
        No spam, ever. Unsubscribe with one click.
      </p>
    </div>
  )
}