
import { Card } from "@/components/ui/card";
import { Calendar, Heart, BookOpen, Shield, Phone, TrendingUp, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import type { AppScreen } from "@/pages/Index";

interface MainMenuProps {
  onNavigate: (screen: AppScreen) => void;
}

export const MainMenu = ({ onNavigate }: MainMenuProps) => {
  const { t } = useLanguage();
  const { isAdmin, isLoading } = useUserRole();

  const menuItems = [
    {
      id: "book" as AppScreen,
      titleKey: "bookSession",
      descriptionKey: "bookSessionDesc",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      urgent: false
    },
    {
      id: "checkup" as AppScreen,
      titleKey: "emotionalCheckup",
      descriptionKey: "emotionalCheckupDesc",
      icon: Heart,
      color: "from-emerald-500 to-emerald-600",
      urgent: false
    },
    {
      id: "read" as AppScreen,
      titleKey: "readListen",
      descriptionKey: "readListenDesc",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      urgent: false
    },
    {
      id: "sos" as AppScreen,
      titleKey: "sosTools",
      descriptionKey: "sosToolsDesc",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
      urgent: true
    },
    {
      id: "emergency" as AppScreen,
      titleKey: "emergencyContact",
      descriptionKey: "emergencyContactDesc",
      icon: Phone,
      color: "from-red-500 to-red-600",
      urgent: true
    },
    {
      id: "progress" as AppScreen,
      titleKey: "yourProgress",
      descriptionKey: "yourProgressDesc",
      icon: TrendingUp,
      color: "from-teal-500 to-teal-600",
      urgent: false
    }
  ];

  // Добавляем админ-панель только для администраторов
  if (isAdmin && !isLoading) {
    menuItems.push({
      id: "admin" as AppScreen,
      titleKey: "adminPanel",
      descriptionKey: "adminPanelDesc",
      icon: Settings,
      color: "from-slate-600 to-slate-700",
      urgent: false
    });
  }

  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t('howCanWeHelp')}</h2>
          <p className="text-slate-300">{t('chooseWhatFeels')}</p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 gap-4 pb-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                className={`h-24 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r ${item.color} border-0 ${
                  item.urgent ? 'ring-2 ring-white/20' : ''
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <div className="h-full flex items-center p-4">
                  <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 ml-4 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 flex items-center">
                      <span className="truncate">
                        {item.id === 'admin' ? 'Панель администратора' : t(item.titleKey)}
                      </span>
                      {item.urgent && <span className="ml-2 text-xs bg-white/30 px-2 py-1 rounded-full flex-shrink-0">{t('urgent')}</span>}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {item.id === 'admin' ? 'Управление контентом и настройками' : t(item.descriptionKey)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
