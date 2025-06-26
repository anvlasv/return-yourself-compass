
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-white/70" />
      <div className="flex items-center bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            language === 'en' 
              ? 'bg-white text-blue-600' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ru')}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            language === 'ru' 
              ? 'bg-white text-blue-600' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          RU
        </button>
      </div>
    </div>
  );
};
