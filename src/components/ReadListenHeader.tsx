
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
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-white mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('backToMenu')}
      </Button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{t('readListen')}</h2>
        <p className="text-slate-300">{t('helpfulContent')}</p>
      </div>
    </>
  );
};
