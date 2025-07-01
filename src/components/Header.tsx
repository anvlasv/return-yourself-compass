
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export const Header = () => {
  const { t } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSettings = () => {
    // Закрываем модальное окно профиля
    setIsProfileOpen(false);
    // Здесь можно добавить логику открытия окна настроек
    console.log("Открытие настроек");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-3 h-14">
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-blue-500 text-white text-sm">U</AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-medium hidden sm:block">{t('userName')}</span>
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-blue-500 text-white text-2xl">U</AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{t('userName')}</h3>
                <p className="text-slate-400 text-sm">@{t('userName').toLowerCase()}</p>
                <p className="text-slate-400 text-sm">{t('userEmail')}</p>
              </div>
              
              <div className="flex flex-col space-y-2 w-full">
                <Button 
                  className="bg-slate-600 hover:bg-slate-500 text-white border border-slate-500"
                  onClick={handleSettings}
                >
                  {t('settings')}
                </Button>
                <Button className="bg-red-600 hover:bg-red-500 text-white border border-red-500">
                  {t('logout')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <LanguageSelector />
      </div>
    </header>
  );
};
