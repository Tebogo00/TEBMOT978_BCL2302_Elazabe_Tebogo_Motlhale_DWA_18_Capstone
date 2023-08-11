// Importing necessary modules and components from external libraries
import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js/dist/module'

// Creating a Supabase client instance using the provided URL and access token
export const supabase = createClient(
  // Supabase URL
  'https://nlgshemmrqhtxccavpvr.supabase.co',
  // Your actual access token
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ3NoZW1tcnFodHhjY2F2cHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzU4MjEsImV4cCI6MjAwNjU1MTgyMX0.OCxtbwoPMNyBrZIzRA3ZGcQonMnjr9dmKjUw86H5yHo',
)

// The main functional component Supa
export default function Supa() {
  return (
    <>
      {/* Rendering the Auth component for authentication and user management */}
      <Auth
        supabaseClient={supabase} // Passing the Supabase client instance
        appearance={{ theme: ThemeSupa }} // Passing the Supabase client instance
        theme="dark"  // Setting the dark theme
      />

    </>
  )


}