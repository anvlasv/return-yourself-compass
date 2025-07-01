
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

export const createCalendarEvent = async (eventData: {
  title: string;
  description: string;
  date: string;
  time: string;
  format: "online" | "offline";
}) => {
  try {
    // Получаем API ключ из Supabase secrets
    const { data, error } = await supabase.functions.invoke('google-calendar-create-event', {
      body: {
        eventData
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
    const { data, error } = await supabase.functions.invoke('google-calendar-get-events', {
      body: {
        startDate,
        endDate
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
