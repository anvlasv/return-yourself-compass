-- Create function to set app settings for RLS context
CREATE OR REPLACE FUNCTION public.set_app_setting(name text, value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  PERFORM set_config(name, value, false);
END;
$$;