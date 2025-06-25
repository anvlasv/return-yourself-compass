
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReadListenFooterProps {
  onRequestSession: () => void;
}

export const ReadListenFooter = ({ onRequestSession }: ReadListenFooterProps) => {
  const { t } = useLanguage();

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <div className="text-center">
        <h3 className="text-white font-semibold mb-2">{t('wantMoreContent')}</h3>
        <p className="text-slate-300 text-sm mb-4">
          {t('personalizedResources')}
        </p>
        <Button 
          onClick={onRequestSession}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {t('requestSession')}
        </Button>
      </div>
    </Card>
  );
};
