
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";
import type { AppScreen } from "@/pages/Index";

interface CheckupResultProps {
  result: EmotionalCheckupResult;
  onNavigate?: (screen: AppScreen) => void;
}

export const CheckupResult = ({ result, onNavigate }: CheckupResultProps) => {
  const { t } = useLanguage();

  const handleSOSClick = () => {
    if (onNavigate) {
      onNavigate("sos");
    }
  };

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
            onClick={() => {/* TODO: Implement booking modal */}}
            className="w-full bg-white/20 hover:bg-white/30"
          >
            {t('bookSession')}
          </Button>
          {result.color === "from-red-500 to-red-600" && (
            <Button 
              onClick={handleSOSClick}
              className="w-full bg-slate-800 text-white hover:bg-slate-700 border-2 border-white/20"
            >
              {t('tryTechnique')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
