import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmergencyContactProps {
  onBack: () => void;
}

export const EmergencyContact = ({ onBack }: EmergencyContactProps) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState<"telegram" | "phone" | "email">("telegram");
  const [responseTime, setResponseTime] = useState<"1h" | "4h" | "12h">("1h");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) {
      toast(t('pleaseDescribeWhatsHappening'));
      return;
    }

    // In a real app, this would send to Supabase or an API
    console.log("Emergency request:", { message, contactMethod, responseTime });
    
    setIsSubmitted(true);
    toast(t('yourMessageSent'));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900 pt-6">
        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-gradient-to-br from-emerald-500 to-green-600 border-0 text-white text-center shadow-2xl">
            <div className="text-6xl mb-6">🤝</div>
            <h2 className="text-2xl font-bold mb-4">{t('weGotYourMessage')}</h2>
            <p className="text-lg mb-6 opacity-95">
              {t('youreNotAlone')} {responseTime === '1h' ? t('within1Hour') : responseTime === '4h' ? t('within4Hours') : t('within12Hours')}.
            </p>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-6">
              <p className="text-sm leading-relaxed">
                {t('inTheMeantime')}
              </p>
            </div>
            <Button 
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
              variant="outline"
            >
              {t('backToMenu')}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-900 to-blue-900">
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

      <div className="pt-16 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{t('emergencyContactTitle')}</h2>
            <p className="text-white/80">{t('needImmediateHelp')}</p>
          </div>

          {/* Crisis Warning */}
          <Card className="p-4 bg-red-500/20 border border-red-500/40 backdrop-blur-sm mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm leading-relaxed">
                {t('crisisWarningMessage')}
              </p>
            </div>
          </Card>

          {/* Message Input */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('tellUsWhatsHappening')}</h3>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('feelingOverwhelmedBecause')}
              className="min-h-[120px] bg-white/10 border-white/30 text-white placeholder:text-white/60 resize-none backdrop-blur-sm"
            />
          </div>

          {/* Contact Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('howToContactYou')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "telegram", label: t('telegram'), icon: "💬" },
                { id: "phone", label: t('phone'), icon: "📞" },
                { id: "email", label: t('email'), icon: "📧" }
              ].map((method) => (
                <Button
                  key={method.id}
                  variant={contactMethod === method.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setContactMethod(method.id as any)}
                  className={
                    contactMethod === method.id 
                      ? "bg-blue-500 hover:bg-blue-600 text-white" 
                      : "border-white/30 bg-white/5 text-white hover:bg-white/15 backdrop-blur-sm"
                  }
                >
                  <span className="mr-1">{method.icon}</span>
                  {method.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{t('whenNeedResponse')}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "1h", label: t('within1Hour'), urgent: true },
                { id: "4h", label: t('within4Hours'), urgent: false },
                { id: "12h", label: t('within12Hours'), urgent: false }
              ].map((time) => (
                <Button
                  key={time.id}
                  variant={responseTime === time.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setResponseTime(time.id as any)}
                  className={
                    responseTime === time.id 
                      ? time.urgent ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-white/30 bg-white/5 text-white hover:bg-white/15 backdrop-blur-sm"
                  }
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {time.label}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 text-lg transition-all duration-200 hover:scale-[1.02]"
            disabled={!message.trim()}
          >
            <Send className="mr-2 h-5 w-5" />
            {t('sendRequest')}
          </Button>
        </div>
      </div>
    </div>
  );
};
