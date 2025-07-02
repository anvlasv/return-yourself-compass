
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface GoogleCalendarAuthProps {
  onAuthSuccess?: () => void;
}

export const GoogleCalendarAuth = ({ onAuthSuccess }: GoogleCalendarAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    // Проверяем, есть ли сохраненный токен
    const token = localStorage.getItem('google_calendar_token');
    const email = localStorage.getItem('google_calendar_email');
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }

    // Обрабатываем возврат из OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleOAuthCallback(code);
    }
  }, []);

  const handleOAuthCallback = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/google-oauth-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('google_calendar_token', data.access_token);
        localStorage.setItem('google_calendar_email', data.email);
        setIsAuthenticated(true);
        setUserEmail(data.email);
        toast("Успешно подключен к Google Calendar!");
        onAuthSuccess?.();
        
        // Очищаем URL от параметров OAuth
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        throw new Error('OAuth callback failed');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      toast("Ошибка при подключении к Google Calendar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/google-oauth-url');
      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        throw new Error('Failed to get auth URL');
      }
    } catch (error) {
      console.error('Google auth error:', error);
      toast("Ошибка при инициализации авторизации");
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('google_calendar_token');
    localStorage.removeItem('google_calendar_email');
    setIsAuthenticated(false);
    setUserEmail("");
    toast("Отключен от Google Calendar");
  };

  if (isAuthenticated) {
    return (
      <Card className="p-4 bg-slate-800 border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-white font-medium">Google Calendar подключен</p>
              <p className="text-slate-400 text-sm">{userEmail}</p>
            </div>
          </div>
          <Button
            onClick={handleDisconnect}
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Отключить
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <div className="text-center">
        <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
        <h3 className="text-white font-medium mb-2">Подключение к Google Calendar</h3>
        <p className="text-slate-400 text-sm mb-4">
          Для синхронизации записей необходимо подключить Google Calendar
        </p>
        <Button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? (
            <>
              <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
              Подключение...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Подключить Google Calendar
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
