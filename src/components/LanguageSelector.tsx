
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-white/10 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          language === 'en' 
            ? 'bg-white text-blue-600' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          language === 'ru' 
            ? 'bg-white text-blue-600' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        RU
      </button>
    </div>
  );
};
