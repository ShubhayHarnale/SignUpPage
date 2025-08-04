import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🐛 DEBUG: Headers:', Object.fromEntries(request.headers.entries()))
    
    const rawBody = await request.text()
    console.log('🐛 DEBUG: Raw body:', rawBody)
    console.log('🐛 DEBUG: Body length:', rawBody.length)
    
    let parsedBody
    try {
      parsedBody = JSON.parse(rawBody)
      console.log('🐛 DEBUG: Parsed JSON:', parsedBody)
    } catch (e) {
      console.log('🐛 DEBUG: JSON parse error:', e)
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    
    console.log('🐛 DEBUG: Email field:', parsedBody.email)
    console.log('🐛 DEBUG: Email type:', typeof parsedBody.email)
    console.log('🐛 DEBUG: All keys:', Object.keys(parsedBody))
    
    return NextResponse.json({ 
      debug: true, 
      received: parsedBody,
      headers: Object.fromEntries(request.headers.entries())
    })
  } catch (error) {
    console.error('🐛 DEBUG ERROR:', error)
    return NextResponse.json({ error: 'Debug endpoint error' }, { status: 500 })
  }
}