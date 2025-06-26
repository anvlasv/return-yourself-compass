
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Globe className="h-4 w-4 mr-2" />
          {language === 'en' ? 'EN' : 'RU'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`text-white hover:bg-slate-700 cursor-pointer ${
            language === 'en' ? 'bg-slate-700' : ''
          }`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('ru')}
          className={`text-white hover:bg-slate-700 cursor-pointer ${
            language === 'ru' ? 'bg-slate-700' : ''
          }`}
        >
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
