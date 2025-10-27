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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">You're on the list!</h3>
        <p className="text-green-800 text-lg mb-4">We'll be in touch soon.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-sm text-green-700 hover:text-green-900 underline transition-colors"
        >
          Sign up another email
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
          />
        </div>
        
        {error && (
          <div className="text-red-700 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Joining...' : 'Join Early Access'}
        </button>
        
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          No spam. We'll notify you when we launch.
        </p>
      </form>
    </div>
  )
}