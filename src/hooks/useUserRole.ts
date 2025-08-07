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
      console.log('fetchUserRole called', { isAuthenticated, user });
      
      if (!isAuthenticated || !user) {
        console.log('Not authenticated or no user');
        setRole(null);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Setting app setting for telegram_id:', user.telegram_id);
        
        // Устанавливаем контекст для RLS
        await supabase.rpc('set_app_setting', {
          name: 'app.current_user_telegram_id',
          value: user.telegram_id.toString()
        });

        console.log('Getting current user role...');
        // Получаем роль пользователя
        const { data, error } = await supabase.rpc('get_current_user_role');
        
        console.log('Role response:', { data, error });
        
        if (error) {
          console.error('Ошибка получения роли:', error);
          setRole('user'); // По умолчанию пользователь
        } else {
          console.log('Setting role to:', data || 'user');
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