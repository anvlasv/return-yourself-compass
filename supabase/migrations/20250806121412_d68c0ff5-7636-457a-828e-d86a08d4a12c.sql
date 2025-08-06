-- Create superuser with telegram_id 185129717
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.telegram_users
WHERE telegram_id = 185129717
ON CONFLICT (user_id, role) DO NOTHING;