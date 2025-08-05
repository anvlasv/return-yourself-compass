-- Создаем таблицу для пользователей Telegram
CREATE TABLE public.telegram_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  photo_url TEXT,
  language_code TEXT DEFAULT 'ru',
  is_bot BOOLEAN DEFAULT false,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем RLS для безопасности
ALTER TABLE public.telegram_users ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи могут видеть только свои данные
CREATE POLICY "Users can view their own data" 
  ON public.telegram_users 
  FOR SELECT 
  USING (telegram_id::TEXT = current_setting('app.current_user_telegram_id', true));

-- Политика: пользователи могут обновлять только свои данные
CREATE POLICY "Users can update their own data" 
  ON public.telegram_users 
  FOR UPDATE 
  USING (telegram_id::TEXT = current_setting('app.current_user_telegram_id', true));

-- Функция для upsert пользователя (создание или обновление)
CREATE OR REPLACE FUNCTION public.upsert_telegram_user(
  p_telegram_id BIGINT,
  p_username TEXT DEFAULT NULL,
  p_first_name TEXT DEFAULT NULL,
  p_last_name TEXT DEFAULT NULL,
  p_photo_url TEXT DEFAULT NULL,
  p_language_code TEXT DEFAULT 'ru',
  p_is_bot BOOLEAN DEFAULT false,
  p_is_premium BOOLEAN DEFAULT false
)
RETURNS public.telegram_users
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result public.telegram_users;
BEGIN
  INSERT INTO public.telegram_users (
    telegram_id, username, first_name, last_name, 
    photo_url, language_code, is_bot, is_premium
  )
  VALUES (
    p_telegram_id, p_username, p_first_name, p_last_name,
    p_photo_url, p_language_code, p_is_bot, p_is_premium
  )
  ON CONFLICT (telegram_id)
  DO UPDATE SET
    username = EXCLUDED.username,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    photo_url = EXCLUDED.photo_url,
    language_code = EXCLUDED.language_code,
    is_bot = EXCLUDED.is_bot,
    is_premium = EXCLUDED.is_premium,
    updated_at = now()
  RETURNING * INTO result;
  
  RETURN result;
END;
$$;