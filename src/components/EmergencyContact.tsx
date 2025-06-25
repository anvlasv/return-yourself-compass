
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { toast } from "sonner";

interface EmergencyContactProps {
  onBack: () => void;
}

export const EmergencyContact = ({ onBack }: EmergencyContactProps) => {
  const [message, setMessage] = useState("");
  const [contactMethod, setContactMethod] = useState<"telegram" | "phone" | "email">("telegram");
  const [responseTime, setResponseTime] = useState<"1h" | "4h" | "12h">("1h");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) {
      toast("Please tell us what's going on");
      return;
    }

    // In a real app, this would send to Supabase or an API
    console.log("Emergency request:", { message, contactMethod, responseTime });
    
    setIsSubmitted(true);
    toast("Your message has been sent. Help is on the way.");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto pt-8">
          <Card className="p-8 bg-gradient-to-r from-green-500 to-green-600 border-0 text-white text-center">
            <div className="text-6xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold mb-4">We've Got Your Message</h2>
            <p className="text-lg mb-6">
              You're not alone in this. Someone will reach out to you within {responseTime}.
            </p>
            <p className="text-sm bg-white/20 p-4 rounded-lg mb-6">
              In the meantime, try some breathing exercises or reach out to a trusted friend.
            </p>
            <Button 
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30"
            >
              Back to Menu
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
          Back to Menu
        </Button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Emergency Contact</h2>
          <p className="text-slate-300">We're here to help you through this</p>
        </div>

        {/* Crisis Warning */}
        <Card className="p-4 bg-red-500/20 border border-red-500/30 mb-6">
          <p className="text-red-200 text-sm text-center">
            If you're having thoughts of self-harm, please call emergency services (911) or crisis helplines immediately.
          </p>
        </Card>

        {/* Message Input */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tell us what's going on</h3>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm feeling overwhelmed because..."
            className="min-h-[120px] bg-slate-800 border-slate-600 text-white resize-none"
          />
        </div>

        {/* Contact Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">How should we contact you?</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "telegram", label: "Telegram", icon: "💬" },
              { id: "phone", label: "Phone", icon: "📞" },
              { id: "email", label: "Email", icon: "📧" }
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
          <h3 className="text-lg font-semibold text-white mb-4">When do you need a response?</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "1h", label: "Within 1h", urgent: true },
              { id: "4h", label: "Within 4h", urgent: false },
              { id: "12h", label: "Within 12h", urgent: false }
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
          Send Request
        </Button>
      </div>
    </div>
  );
};
