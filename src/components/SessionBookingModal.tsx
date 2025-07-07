
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Video, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { createCalendarEvent, getCalendarEvents } from "@/utils/googleCalendarApi";

interface SessionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionBookingModal = ({ isOpen, onClose }: SessionBookingModalProps) => {
  const { t } = useLanguage();
  const [description, setDescription] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<"online" | "offline" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        const bookedTimes = data.events.map((event: any) => {
          if (event.start && event.start.dateTime) {
            const eventDate = new Date(event.start.dateTime);
            return eventDate.toLocaleTimeString('ru-RU', { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
          }
          return null;
        }).filter(Boolean);
        
        setBookedSlots(bookedTimes);
      }
    } catch (error) {
      console.error("Ошибка при загрузке забронированных слотов:", error);
      // Используем статические забронированные слоты как fallback
      setBookedSlots(["10:00", "14:00", "16:00"]);
    }
  };

  const sendToTelegram = async (bookingData: any) => {
    // Имитация отправки в Telegram
    console.log("Отправка в Telegram:", bookingData);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleConfirm = async () => {
    if (!description.trim() || !selectedFormat || !selectedDate || !selectedTime) {
      toast(t('pleaseSelect'));
      return;
    }

    const isConnected = localStorage.getItem('google_calendar_token');
    if (!isConnected) {
      toast("Необходимо подключить Google Calendar в панели администратора");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        title: `Консультация психолога (${selectedFormat === 'online' ? 'онлайн' : 'очно'})`,
        description: description.trim(),
        format: selectedFormat,
        date: selectedDate,
        time: selectedTime,
        timestamp: new Date().toISOString()
      };

      // Отправка данных в Telegram психологу
      await sendToTelegram(bookingData);
      
      // Добавление записи в Google Calendar
      await createCalendarEvent(bookingData);
      
      toast(t('sessionBooked'));
      onClose();
      
      // Сброс формы
      setDescription("");
      setSelectedFormat(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Ошибка при бронировании:", error);
      toast("Произошла ошибка при бронировании. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-center">{t('requestSession')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Описание запроса */}
          <div>
            <h3 className="text-white font-medium mb-3">{t('describeRequest')}</h3>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('feelingOverwhelmedPlaceholder')}
              className="bg-slate-700 border-slate-600 text-white resize-none"
              rows={3}
            />
          </div>

          {/* Выбор формата */}
          <div>
            <h3 className="text-white font-medium mb-3">{t('chooseFormat')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card
                className={`p-3 cursor-pointer transition-all border-2 ${
                  selectedFormat === "online" 
                    ? "border-blue-500 bg-blue-500/20" 
                    : "border-slate-600 bg-slate-700"
                }`}
                onClick={() => setSelectedFormat("online")}
              >
                <div className="text-center">
                  <Video className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <h4 className="font-medium text-white text-sm">{t('online')}</h4>
                </div>
              </Card>
              
              <Card
                className={`p-3 cursor-pointer transition-all border-2 ${
                  selectedFormat === "offline" 
                    ? "border-blue-500 bg-blue-500/20" 
                    : "border-slate-600 bg-slate-700"
                }`}
                onClick={() => setSelectedFormat("offline")}
              >
                <div className="text-center">
                  <MapPin className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                  <h4 className="font-medium text-white text-sm">{t('inPerson')}</h4>
                </div>
              </Card>
            </div>
          </div>

          {/* Выбор даты */}
          <div>
            <h3 className="text-white font-medium mb-3">{t('selectDate')}</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>

          {/* Выбор времени */}
          <div>
            <h3 className="text-white font-medium mb-3">{t('selectTime')}</h3>
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
                          : "border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
                    }
                  >
                    {time}
                    {isBooked && <span className="ml-1 text-xs">✕</span>}
                  </Button>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 mt-2">✕ - уже забронировано</p>
          </div>

          {/* Кнопки */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleConfirm}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              disabled={!description.trim() || !selectedFormat || !selectedDate || !selectedTime || isSubmitting}
            >
              {isSubmitting ? "Отправка..." : t('confirm')}
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-slate-600 text-slate-300 bg-slate-700 hover:bg-slate-600 hover:text-white"
              disabled={isSubmitting}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
