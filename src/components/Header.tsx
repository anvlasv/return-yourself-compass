
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { UserProfile } from "@/components/UserProfile";
import { useTelegram } from "@/contexts/TelegramContext";

export const Header = () => {
  const { t } = useLanguage();
  const { user } = useTelegram();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-3 h-14">
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center space-x-3 hover:bg-white/10 rounded-lg p-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photo_url || ""} alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                  {user ? (user.first_name?.[0] || user.username?.[0] || 'У') : t('userName').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-medium hidden sm:block">
                {user ? (user.first_name || user.username || t('userName')) : t('userName')}
              </span>
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
            <UserProfile onClose={() => setIsProfileOpen(false)} />
          </DialogContent>
        </Dialog>

        <LanguageSelector />
      </div>
    </header>
  );
};
