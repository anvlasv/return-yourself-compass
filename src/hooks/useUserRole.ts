import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTelegram } from '@/contexts/TelegramContext';

export type UserRole = 'admin' | 'user' | null;

export const useUserRole = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useTelegram();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isAuthenticated || !user) {
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        // Устанавливаем контекст для RLS
        await supabase.rpc('set_app_setting', {
          name: 'app.current_user_telegram_id',
          value: user.telegram_id.toString()
        });

        // Получаем роль пользователя
        const { data, error } = await supabase.rpc('get_current_user_role');
        
        if (error) {
          console.error('Ошибка получения роли:', error);
          setRole('user'); // По умолчанию пользователь
        } else {
          setRole(data || 'user');
        }
      } catch (error) {
        console.error('Ошибка получения роли:', error);
        setRole('user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user, isAuthenticated]);

  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return {
    role,
    isAdmin,
    isUser,
    isLoading
  };
};