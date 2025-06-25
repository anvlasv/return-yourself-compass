
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Video, MapPin } from "lucide-react";
import { toast } from "sonner";

interface BookSessionProps {
  onBack: () => void;
}

export const BookSession = ({ onBack }: BookSessionProps) => {
  const [selectedFormat, setSelectedFormat] = useState<"online" | "offline" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleBooking = () => {
    if (!selectedFormat || !selectedDate || !selectedTime) {
      toast("Please select format, date and time");
      return;
    }
    
    toast("Session booked! You'll receive a confirmation via Telegram.");
    onBack();
  };

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
          <h2 className="text-2xl font-bold text-white mb-2">Book a Session</h2>
          <p className="text-slate-300">Professional support when you need it</p>
        </div>

        {/* First Free Session Offer */}
        <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 border-0 mb-6">
          <div className="text-center text-white">
            <h3 className="font-semibold mb-1">First Session Free</h3>
            <p className="text-sm text-green-100">
              Get started with a complimentary 30-minute consultation
            </p>
          </div>
        </Card>

        {/* Format Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Choose Format</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedFormat === "online" 
                  ? "border-blue-500 bg-blue-500/20" 
                  : "border-slate-600 bg-slate-800"
              }`}
              onClick={() => setSelectedFormat("online")}
            >
              <div className="text-center">
                <Video className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">Online</h4>
                <p className="text-xs text-slate-300">Video call</p>
              </div>
            </Card>
            
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedFormat === "offline" 
                  ? "border-blue-500 bg-blue-500/20" 
                  : "border-slate-600 bg-slate-800"
              }`}
              onClick={() => setSelectedFormat("offline")}
            >
              <div className="text-center">
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white">In-Person</h4>
                <p className="text-xs text-slate-300">Office visit</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Select Date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white"
          />
        </div>

        {/* Time Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Select Time</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className={
                  selectedTime === time 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "border-slate-600 text-white hover:bg-slate-700"
                }
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        <Button 
          onClick={handleBooking}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
          disabled={!selectedFormat || !selectedDate || !selectedTime}
        >
          Book Session
        </Button>

        <p className="text-xs text-slate-400 text-center mt-4">
          You'll receive a confirmation and meeting details via Telegram
        </p>
      </div>
    </div>
  );
};
