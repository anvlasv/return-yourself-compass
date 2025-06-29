
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReadListenHeaderProps {
  onBack: () => void;
}

export const ReadListenHeader = ({ onBack }: ReadListenHeaderProps) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Fixed back button */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>
      </div>

      <div className="pt-16 pb-4 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{t('readListen')}</h2>
          <p className="text-slate-300">{t('helpfulContent')}</p>
        </div>
      </div>
    </>
  );
};
