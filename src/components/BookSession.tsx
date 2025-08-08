
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Video, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { createCalendarEvent, getCalendarEvents, type GoogleCalendarEvent } from "@/utils/googleCalendarApi";

interface BookSessionProps {
  onBack: () => void;
}

export const BookSession = ({ onBack }: BookSessionProps) => {
  const { t } = useLanguage();
  const [selectedFormat, setSelectedFormat] = useState<"online" | "offline" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  // Загружаем забронированные слоты при изменении даты
  useEffect(() => {
    if (selectedDate) {
      loadBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadBookedSlots = async (date: string) => {
    try {
      const startDate = `${date}T00:00:00Z`;
      const endDate = `${date}T23:59:59Z`;
      
      const data = await getCalendarEvents(startDate, endDate);
      
      if (data.success && data.events) {
        const bookedTimes = data.events
          .map((event: GoogleCalendarEvent) => {
            if (event.start && event.start.dateTime) {
              const eventDate = new Date(event.start.dateTime);
              return eventDate.toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              });
            }
            return null;
          })
          .filter((t): t is string => Boolean(t));
        
        setBookedSlots(bookedTimes);
      }
    } catch (error) {
      console.error("Ошибка при загрузке забронированных слотов:", error);
      // Используем статические забронированные слоты как fallback
      setBookedSlots(["10:00", "14:00", "16:00"]);
    }
  };

  const handleBooking = async () => {
    if (!selectedFormat || !selectedDate || !selectedTime) {
      toast(t('pleaseSelect'));
      return;
    }

    const isConnected = localStorage.getItem('google_calendar_token');
    if (!isConnected) {
      toast("Необходимо подключить Google Calendar в панели администратора");
      return;
    }
    
    try {
      const bookingData = {
        title: `Консультация психолога (${selectedFormat === 'online' ? 'онлайн' : 'очно'})`,
        description: `Запись на консультацию через Telegram Mini App`,
        format: selectedFormat,
        date: selectedDate,
        time: selectedTime
      };

      await createCalendarEvent(bookingData);
      toast(t('sessionBooked'));
      onBack();
    } catch (error) {
      console.error("Ошибка при бронировании:", error);
      toast("Произошла ошибка при бронировании. Попробуйте еще раз.");
    }
  };

  return (
    <div className="min-h-screen pb-20">
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
            <h2 className="text-2xl font-bold text-white mb-2">{t('bookSession')}</h2>
            <p className="text-slate-300">Запишитесь на консультацию с психологом</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('chooseFormat')}</h3>
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
                  <h4 className="font-semibold text-white">{t('online')}</h4>
                  <p className="text-xs text-slate-300">{t('videoCall')}</p>
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
                  <h4 className="font-semibold text-white">{t('inPerson')}</h4>
                  <p className="text-xs text-slate-300">{t('officeVisit')}</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('selectDate')}</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{t('selectTime')}</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isBooked = bookedSlots.includes(time);
                const isSelected = selectedTime === time;
                
                return (
                  <Button
                    key={time}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={
                      isBooked
                        ? "border-slate-600 bg-slate-900 text-slate-500 cursor-not-allowed"
                        : isSelected 
                          ? "bg-blue-500 hover:bg-blue-600 text-white" 
                          : "border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
                    }
                  >
                    {time}
                    {isBooked && <span className="ml-1 text-xs">✕</span>}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 mt-2">✕ - уже забронировано из Google Calendar</p>
          </div>

          <Button 
            onClick={handleBooking}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
            disabled={!selectedFormat || !selectedDate || !selectedTime}
          >
            {t('bookSessionBtn')}
          </Button>

          <p className="text-xs text-slate-400 text-center mt-4">
            После бронирования событие будет сохранено в Google Calendar
          </p>
        </div>
      </div>
    </div>
  );
};
