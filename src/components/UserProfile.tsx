import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Edit3, Save, X, Settings, LogOut, User, Mail } from "lucide-react";
import { toast } from "sonner";

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userDescription, setUserDescription] = useState("");
  
  // Mock user data - в реальном приложении это будет из контекста/API
  const [userData] = useState({
    name: t('userName'),
    email: t('userEmail'),
    username: '@username',
    avatar: '', // пустая строка означает что аватар не загружен
    description: "Иногда чувствую тревогу и нужна поддержка в преодолении стрессовых ситуаций на работе."
  });

  const handleSaveDescription = () => {
    // Здесь бы было сохранение в БД
    setIsEditing(false);
    toast("Описание сохранено");
  };

  const handleLogout = () => {
    // Здесь будет логика выхода
    toast("Выход из аккаунта");
    onClose();
  };

  const handleSettings = () => {
    // Здесь будет переход к настройкам
    toast("Открытие настроек");
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
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
            {userData.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold text-white">{userData.name}</h3>
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <User className="h-4 w-4" />
              <span className="text-sm">{userData.username}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{userData.email}</span>
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
                value={userDescription || userData.description}
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
              {userDescription || userData.description}
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
          onClick={handleSettings}
          variant="outline"
          className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 transition-colors"
        >
          <Settings className="mr-2 h-4 w-4" />
          {t('settings')}
        </Button>
        
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