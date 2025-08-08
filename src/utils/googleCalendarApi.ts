
import { supabase } from "@/integrations/supabase/client";

export type GoogleCalendarEvent = {
  start?: { dateTime?: string; timeZone?: string };
  end?: { dateTime?: string; timeZone?: string };
  summary?: string;
  description?: string;
};

export interface GoogleCalendarEventsResponse {
  success: boolean;
  events: GoogleCalendarEvent[];
}

interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

const getAccessToken = (): string | null => {
  return localStorage.getItem('google_calendar_token');
};

export const createCalendarEvent = async (eventData: {
  title: string;
  description: string;
  date: string;
  time: string;
  format: "online" | "offline";
}) => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('Google Calendar не подключен. Необходимо авторизоваться.');
    }

    const { data, error } = await supabase.functions.invoke('google-calendar-create-event', {
      body: {
        eventData,
        accessToken
      }
    });

    if (error) {
      console.error('Ошибка при создании события в календаре:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Ошибка Google Calendar API:', error);
    throw error;
  }
};

export const getCalendarEvents = async (startDate: string, endDate: string): Promise<GoogleCalendarEventsResponse> => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.warn('Google Calendar не подключен');
      return { success: true, events: [] };
    }

    const { data, error } = await supabase.functions.invoke('google-calendar-get-events', {
      body: {
        startDate,
        endDate,
        accessToken
      }
    });

    if (error) {
      console.error('Ошибка при получении событий из календаря:', error);
      throw error;
    }

    return data as GoogleCalendarEventsResponse;
  } catch (error) {
    console.error('Ошибка получения событий Google Calendar:', error);
    throw error;
  }
};

export const isGoogleCalendarConnected = (): boolean => {
  return !!getAccessToken();
};

export const getGoogleAuthUrl = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('google-oauth-url');
    
    if (error) {
      throw error;
    }
    
    return data.authUrl;
  } catch (error) {
    console.error('Ошибка получения URL авторизации:', error);
    throw error;
  }
};

export const handleGoogleOAuthCallback = async (code: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('google-oauth-callback', {
      body: { code }
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Ошибка OAuth callback:', error);
    throw error;
  }
};
