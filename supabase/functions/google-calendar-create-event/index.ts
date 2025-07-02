
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
    const { eventData, accessToken } = await req.json()
    
    if (!accessToken) {
      throw new Error('Access token не предоставлен')
    }

    // Формируем дату и время для события
    const startDateTime = new Date(`${eventData.date}T${eventData.time}:00`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // +1 час

    const calendarEvent = {
      summary: `Консультация психолога (${eventData.format === 'online' ? 'онлайн' : 'очно'})`,
      description: eventData.description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/Moscow'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/Moscow'
      }
    }

    const calendarId = 'primary'
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendarEvent)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Google Calendar API error:', errorData)
      throw new Error(`Google Calendar API error: ${response.status}`)
    }

    const createdEvent = await response.json()
    
    return new Response(
      JSON.stringify({ success: true, event: createdEvent }),
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
