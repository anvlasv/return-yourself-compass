
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";

interface CheckupResultProps {
  result: EmotionalCheckupResult;
}

export const CheckupResult = ({ result }: CheckupResultProps) => {
  const { t } = useLanguage();

  return (
    <Card className={`p-6 bg-gradient-to-r ${result.color} border-0 text-white`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">{result.title}</h3>
        <p className="text-lg mb-6 leading-relaxed">{result.message}</p>
        <p className="text-sm bg-white/20 p-4 rounded-lg mb-6">
          {result.suggestion}
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => toast(t('bookingFeature'))}
            className="w-full bg-white/20 hover:bg-white/30"
          >
            {t('bookSession')}
          </Button>
          <Button 
            onClick={() => toast(t('greatProgress'))}
            variant="outline"
            className="w-full border-white text-white hover:bg-white/10"
          >
            {t('tryTechnique')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
