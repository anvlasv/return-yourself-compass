
import { supabase } from "@/integrations/supabase/client";

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

export const getCalendarEvents = async (startDate: string, endDate: string) => {
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

    return data;
  } catch (error) {
    console.error('Ошибка получения событий Google Calendar:', error);
    throw error;
  }
};

export const isGoogleCalendarConnected = (): boolean => {
  return !!getAccessToken();
};
