
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero Section
    appName: "Return Yourself",
    slogan: "Not chasing her. Reclaiming you.",
    startNow: "Start Now",
    supportMessage: "You're not alone in this journey. Take the first step toward healing.",
    
    // Main Menu
    howCanWeHelp: "How can we help?",
    chooseWhatFeels: "Choose what feels right for you now",
    bookSession: "Book a Session",
    bookSessionDesc: "Professional support when you need it",
    emotionalCheckup: "Emotional Check-Up",
    emotionalCheckupDesc: "Understanding where you are right now",
    readListen: "Read / Listen",
    readListenDesc: "Helpful content for your journey",
    sosTools: "SOS Tools",
    sosToolsDesc: "Immediate help when overwhelmed",
    emergencyContact: "Emergency Contact",
    emergencyContactDesc: "Reach out for urgent support",
    yourProgress: "Your Progress",
    yourProgressDesc: "Track your healing journey",
    urgent: "URGENT",
    language: "Language",
    
    // Book Session
    backToMenu: "Back to Menu",
    professionalSupport: "Professional support when you need it",
    firstSessionFree: "First Session Free",
    freeConsultation: "Get started with a complimentary 30-minute consultation",
    chooseFormat: "Choose Format",
    online: "Online",
    videoCall: "Video call",
    inPerson: "In-Person",
    officeVisit: "Office visit",
    selectDate: "Select Date",
    selectTime: "Select Time",
    bookSessionBtn: "Book Session",
    confirmationMessage: "You'll receive a confirmation and meeting details via Telegram",
    sessionBooked: "Session booked! You'll receive a confirmation via Telegram.",
    pleaseSelect: "Please select format, date and time",
    
    // Read Listen
    helpfulContent: "Helpful content for your healing journey",
    understanding: "Understanding",
    practice: "Practice",
    action: "Action",
    growth: "Growth",
    guidance: "Guidance",
    rest: "Rest",
    wantMoreContent: "Want More Content?",
    personalizedResources: "Get personalized resources based on your progress",
    bookingFeature: "Booking feature coming soon!",
    savedToReading: "Saved to your reading list"
  },
  ru: {
    // Hero Section
    appName: "Верни Себя",
    slogan: "Не гонишься за ней. Возвращаешь себя.",
    startNow: "Начать",
    supportMessage: "Ты не один в этом пути. Сделай первый шаг к исцелению.",
    
    // Main Menu
    howCanWeHelp: "Как мы можем помочь?",
    chooseWhatFeels: "Выбери то, что сейчас подходит тебе",
    bookSession: "Записаться на сессию",
    bookSessionDesc: "Профессиональная поддержка когда нужна",
    emotionalCheckup: "Эмоциональная диагностика",
    emotionalCheckupDesc: "Понимание того, где ты сейчас находишься",
    readListen: "Читать / Слушать",
    readListenDesc: "Полезный контент для твоего пути",
    sosTools: "SOS Инструменты",
    sosToolsDesc: "Немедленная помощь при перегрузке",
    emergencyContact: "Экстренная связь",
    emergencyContactDesc: "Обратиться за срочной поддержкой",
    yourProgress: "Твой прогресс",
    yourProgressDesc: "Отслеживай свой путь исцеления",
    urgent: "СРОЧНО",
    language: "Язык",
    
    // Book Session
    backToMenu: "Назад в меню",
    professionalSupport: "Профессиональная поддержка когда нужна",
    firstSessionFree: "Первая сессия бесплатно",
    freeConsultation: "Начни с бесплатной 30-минутной консультации",
    chooseFormat: "Выбери формат",
    online: "Онлайн",
    videoCall: "Видео звонок",
    inPerson: "Очно",
    officeVisit: "Визит в офис",
    selectDate: "Выбери дату",
    selectTime: "Выбери время",
    bookSessionBtn: "Записаться",
    confirmationMessage: "Ты получишь подтверждение и детали встречи в Telegram",
    sessionBooked: "Сессия забронирована! Ты получишь подтверждение в Telegram.",
    pleaseSelect: "Пожалуйста, выбери формат, дату и время",
    
    // Read Listen
    helpfulContent: "Полезный контент для твоего пути исцеления",
    understanding: "Понимание",
    practice: "Практика",
    action: "Действие",
    growth: "Рост",
    guidance: "Руководство",
    rest: "Отдых",
    wantMoreContent: "Хочешь больше контента?",
    personalizedResources: "Получи персонализированные ресурсы на основе твоего прогресса",
    bookingFeature: "Функция записи скоро появится!",
    savedToReading: "Сохранено в список для чтения"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
