import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TelegramUser {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  language_code?: string;
  is_bot?: boolean;
  is_premium?: boolean;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
      photo_url?: string;
    };
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: any;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramContextType {
  user: TelegramUser | null;
  webApp: TelegramWebApp | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setWebApp(tg);
      tg.ready();
      tg.expand();

      // Проверяем есть ли данные пользователя от Telegram
      if (tg.initDataUnsafe?.user) {
        authenticateUser(tg.initDataUnsafe.user);
      } else {
        setIsLoading(false);
      }
    } else {
      // Для разработки без Telegram
      console.log('Telegram WebApp API не найден. Используем демо данные.');
      setIsLoading(false);
    }
  }, []);

  const authenticateUser = async (telegramUser: any) => {
    try {
      setIsLoading(true);
      
      // Сохраняем или обновляем пользователя в базе данных
      const { data, error } = await supabase.rpc('upsert_telegram_user', {
        p_telegram_id: telegramUser.id,
        p_username: telegramUser.username || null,
        p_first_name: telegramUser.first_name || null,
        p_last_name: telegramUser.last_name || null,
        p_photo_url: telegramUser.photo_url || null,
        p_language_code: telegramUser.language_code || 'ru',
        p_is_premium: telegramUser.is_premium || false
      });

      if (error) {
        console.error('Ошибка авторизации:', error);
        toast.error('Ошибка авторизации');
        return;
      }

      // Устанавливаем настройку для RLS (это будет сделано через SQL функцию)

      setUser(data);
      setIsAuthenticated(true);
      toast.success('Добро пожаловать!');
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      toast.error('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (webApp?.initDataUnsafe?.user) {
      await authenticateUser(webApp.initDataUnsafe.user);
    } else {
      toast.error('Telegram данные недоступны');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('telegram_user');
    toast.success('Вы вышли из системы');
  };

  const value: TelegramContextType = {
    user,
    webApp,
    isLoading,
    isAuthenticated,
    login,
    logout
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};