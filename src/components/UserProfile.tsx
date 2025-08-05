import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTelegram } from "@/contexts/TelegramContext";
import { Edit3, Save, X, LogOut, User, Mail, Star } from "lucide-react";
import { toast } from "sonner";

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useTelegram();
  const [isEditing, setIsEditing] = useState(false);
  const [userDescription, setUserDescription] = useState("");

  useEffect(() => {
    if (user) {
      setUserDescription("Иногда чувствую тревогу и нужна поддержка в преодолении стрессовых ситуаций на работе.");
    }
  }, [user]);

  const handleSaveDescription = () => {
    // Здесь бы было сохранение в БД
    setIsEditing(false);
    toast("Описание сохранено");
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="flex flex-col space-y-6 py-6">
      {/* Заголовок с кнопкой закрытия */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Профиль</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Аватар и основная информация */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24 border-4 border-slate-600">
          <AvatarImage src={user?.photo_url || ""} alt={user?.first_name || "User"} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
            {user ? (user.first_name?.[0] || user.username?.[0] || 'У') : t('userName').charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">
            {user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || 'Пользователь' : t('userName')}
          </h3>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <User className="h-4 w-4" />
              <span className="text-sm">@{user?.username || 'пользователь'}</span>
            </div>
            {user?.is_premium && (
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <Star className="h-4 w-4" />
                <span className="text-sm">Telegram Premium</span>
              </div>
            )}
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <span className="text-sm">Язык: {user?.language_code || 'ru'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Описание проблемы */}
      <Card className="p-4 bg-slate-750 border-slate-600">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">О ваших потребностях</h4>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-white hover:bg-slate-600 p-1"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
               <Textarea
                value={userDescription}
                onChange={(e) => setUserDescription(e.target.value)}
                placeholder="Расскажите о том, с чем вам нужна помощь..."
                className="bg-slate-700 border-slate-600 text-white resize-none min-h-[100px]"
                rows={4}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={handleSaveDescription}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setUserDescription("");
                  }}
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Отмена
                </Button>
              </div>
            </div>
           ) : (
            <p className="text-slate-300 text-sm leading-relaxed">
              {userDescription || "Иногда чувствую тревогу и нужна поддержка в преодолении стрессовых ситуаций на работе."}
            </p>
           )}
        </div>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 bg-slate-750 border-slate-600 text-center">
          <div className="text-lg font-bold text-blue-400">5</div>
          <div className="text-xs text-slate-400">Чекапов</div>
        </Card>
        <Card className="p-3 bg-slate-750 border-slate-600 text-center">
          <div className="text-lg font-bold text-green-400">3</div>
          <div className="text-xs text-slate-400">Сессий</div>
        </Card>
        <Card className="p-3 bg-slate-750 border-slate-600 text-center">
          <div className="text-lg font-bold text-purple-400">12</div>
          <div className="text-xs text-slate-400">Дней</div>
        </Card>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col space-y-3 pt-2">
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
};