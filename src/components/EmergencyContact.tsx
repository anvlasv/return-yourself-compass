
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock } from "lucide-react";
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
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="p-8 bg-gradient-to-r from-green-500 to-green-600 border-0 text-white text-center">
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold mb-4">{t('weGotYourMessage')}</h2>
            <p className="text-lg mb-6">
              {t('youreNotAlone')} {responseTime}.
            </p>
            <p className="text-sm bg-white/20 p-4 rounded-lg mb-6">
              {t('inTheMeantime')}
            </p>
            <Button 
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30"
            >
              {t('backToMenu')}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{t('emergencyContactTitle')}</h2>
          <p className="text-slate-300">{t('hereToHelpYou')}</p>
        </div>

        {/* Crisis Warning */}
        <Card className="p-4 bg-red-500/20 border border-red-500/30 mb-6">
          <p className="text-red-200 text-sm text-center">
            {t('crisisWarningMessage')}
          </p>
        </Card>

        {/* Message Input */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('tellUsWhatsHappening')}</h3>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('feelingOverwhelmedBecause')}
            className="min-h-[120px] bg-slate-800 border-slate-600 text-white resize-none"
          />
        </div>

        {/* Contact Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">{t('howToContactYou')}</h3>
          <div className="grid grid-cols-3 gap-2">
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
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "border-slate-600 text-white hover:bg-slate-700"
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
          <div className="grid grid-cols-3 gap-2">
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
                    ? time.urgent ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                    : "border-slate-600 text-white hover:bg-slate-700"
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
          disabled={!message.trim()}
        >
          <Send className="mr-2 h-4 w-4" />
          {t('sendRequest')}
        </Button>
      </div>
    </div>
  );
};
