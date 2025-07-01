
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { startDate, endDate } = await req.json()
    
    const apiKey = Deno.env.get('GOOGLE_CALENDAR_API_KEY')
    if (!apiKey) {
      throw new Error('Google Calendar API key не настроен')
    }

    const calendarId = 'primary'
    const timeMin = new Date(startDate).toISOString()
    const timeMax = new Date(endDate).toISOString()
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Google Calendar API error:', errorData)
      throw new Error(`Google Calendar API error: ${response.status}`)
    }

    const events = await response.json()
    
    return new Response(
      JSON.stringify({ success: true, events: events.items || [] }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
