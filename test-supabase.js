// Test Supabase connection
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

console.log('Environment Variables:');
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing Supabase connection...');
    
    // Test connection by checking the SignUps table
    const { data, error } = await supabase
      .from('SignUps')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Test insert
    console.log('\n🔍 Testing insert to SignUps table...');
    const testEmail = `test-${Date.now()}@example.com`;
    
    const { data: insertData, error: insertError } = await supabase
      .from('SignUps')
      .insert([{ email: testEmail }])
      .select();
    
    if (insertError) {
      console.error('❌ Insert error:', insertError);
      return false;
    }
    
    console.log('✅ Insert successful:', insertData);
    
    // Clean up test data
    await supabase
      .from('SignUps')
      .delete()
      .eq('email', testEmail);
    
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    return false;
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n🎉 All tests passed! Supabase is working correctly.');
  } else {
    console.log('\n💥 Tests failed. Check your Supabase configuration.');
  }
  process.exit(success ? 0 : 1);
});