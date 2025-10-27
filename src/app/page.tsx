'use client'

import SignupForm from '@/components/SignupForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Grow Your Brand.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Empower Influencers.
              </span>{' '}
              Scale Smarter.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              ChartUpp connects small businesses with the right micro-influencers to drive exposure, conversions, and measurable ROI.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Automated influencer discovery</h3>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Campaign analytics and reporting</h3>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Secure monthly subscription deals</h3>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">Performance-based insights</h3>
              </div>
            </div>
          </div>

          {/* Trust Message */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12 text-center">
            <p className="text-gray-700 leading-relaxed">
              We're onboarding our first businesses and influencers now. Your signup helps shape the platform.
            </p>
          </div>

          {/* Signup Form */}
          <SignupForm />

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions? Reach out:{' '}
              <a 
                href="mailto:shubhayharnale@gmail.com" 
                className="text-blue-600 hover:text-blue-700 underline transition-colors"
              >
                shubhayharnale@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}