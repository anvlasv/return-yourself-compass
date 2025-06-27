
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { SessionBookingModal } from "@/components/SessionBookingModal";
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";
import type { AppScreen } from "@/pages/Index";

interface CheckupResultProps {
  result: EmotionalCheckupResult;
  onNavigate?: (screen: AppScreen) => void;
}

export const CheckupResult = ({ result, onNavigate }: CheckupResultProps) => {
  const { t } = useLanguage();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleSOSClick = () => {
    if (onNavigate) {
      onNavigate("sos");
    }
  };

  return (
    <div className="space-y-6">
      <Card className={`p-8 bg-gradient-to-br ${result.color} border-0 text-white shadow-2xl`}>
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold mb-4">{result.title}</h3>
          <p className="text-lg leading-relaxed opacity-95">
            {result.message}
          </p>
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <p className="text-sm leading-relaxed">
              {result.suggestion}
            </p>
          </div>
        </div>
      </Card>
      
      <div className="grid gap-3">
        <Button 
          onClick={() => setIsBookingModalOpen(true)}
          className="w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 transition-all duration-200 hover:scale-[1.02]"
          variant="outline"
        >
          <span className="text-lg mr-2">📅</span>
          {t('bookSession')}
        </Button>

        <Button 
          onClick={handleSOSClick}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transition-all duration-200 hover:scale-[1.02]"
        >
          <span className="text-lg mr-2">🆘</span>
          {t('sosTools')}
        </Button>
      </div>

      <SessionBookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
