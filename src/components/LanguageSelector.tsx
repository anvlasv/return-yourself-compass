
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-white" />
      <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ru')}>
        <SelectTrigger className="w-20 bg-white/20 border-white/30 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600">
          <SelectItem value="en" className="text-white hover:bg-slate-700">EN</SelectItem>
          <SelectItem value="ru" className="text-white hover:bg-slate-700">RU</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
