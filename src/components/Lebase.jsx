import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import {ThemeSupa,} from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js/dist/module'

export const supabase = createClient(
  'https://nlgshemmrqhtxccavpvr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ3NoZW1tcnFodHhjY2F2cHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5NzU4MjEsImV4cCI6MjAwNjU1MTgyMX0.OCxtbwoPMNyBrZIzRA3ZGcQonMnjr9dmKjUw86H5yHo',
  
)




export default function Supa() {

  return (
    <>
    <p>TEBOGO</p>

      <Auth
       supabaseClient={supabase}
       appearance={{ theme: ThemeSupa }}
       theme="dark"
     />
    
    </>
  )


}


    
// )