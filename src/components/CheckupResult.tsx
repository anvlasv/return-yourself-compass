
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";
import type { AppScreen } from "@/pages/Index";

interface CheckupResultProps {
  result: EmotionalCheckupResult;
  onNavigate?: (screen: AppScreen) => void;
}

export const CheckupResult = ({ result, onNavigate }: CheckupResultProps) => {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleSOSClick = () => {
    if (onNavigate) {
      onNavigate("sos");
    }
  };

  const handleBookingClick = () => {
    setIsBookingOpen(true);
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
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleBookingClick}
                className="w-full bg-white/20 hover:bg-white/30"
              >
                {t('bookSession')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">{t('bookingFeature')}</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p className="text-slate-300 text-center">
                  {t('bookingFeature')}
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleSOSClick}
            className="w-full bg-slate-800 text-white hover:bg-slate-700 border-2 border-white/20"
          >
            {t('sosTools')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
