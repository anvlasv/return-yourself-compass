
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
    savedToReading: "Saved to your reading list",
    requestSession: "Request Session",
    describeRequest: "Describe your request",
    
    // Emotional Checkup
    howAreYouSleeping: "How are you sleeping?",
    sleepingWell: "Sleeping well",
    someDifficulty: "Some difficulty",
    veryPoorly: "Very poorly",
    howOftenThinkAboutHer: "How often do you think about her?",
    rarely: "Rarely",
    sometimes: "Sometimes",
    constantly: "Constantly",
    howIsEnergyLevel: "How is your energy level?",
    goodEnergy: "Good energy",
    lowEnergy: "Low energy",
    exhausted: "Exhausted",
    takingCareOfYourself: "Are you taking care of yourself?",
    yesRegularly: "Yes, regularly",
    notReally: "Not really",
    howFeelAboutFuture: "How do you feel about the future?",
    hopeful: "Hopeful",
    uncertain: "Uncertain",
    hopeless: "Hopeless",
    managingWell: "You're managing well",
    managingWellMessage: "You seem to be handling things with strength. Keep focusing on your growth.",
    workingThrough: "You're working through it",
    workingThroughMessage: "This is a challenging time, but you're taking steps forward. That takes courage.",
    struggling: "You're struggling right now",
    strugglingMessage: "This is really hard, and it's okay to not be okay. You don't have to go through this alone.",
    tryTechnique: "Try SOS Tools",
    
    // SOS Tools
    sosToolsTitle: "SOS Tools",
    feelingOverwhelmed: "Feeling overwhelmed right now?",
    breathingExercise: "Breathing Exercise",
    breathingDesc: "5-minute guided breathing to calm your mind",
    groundingTechnique: "Grounding Technique",
    groundingDesc: "Connect with the present moment through your senses",
    emergencyWriting: "Emergency Writing",
    emergencyWritingDesc: "Get your thoughts out of your head and onto paper",
    calmingAudio: "Calming Audio",
    calmingAudioDesc: "Soothing sounds to help you relax",
    startExercise: "Start Exercise",
    feelingBetter: "I'm feeling better",
    greatProgress: "Great progress! You took action when you needed it most.",
    
    // Emergency Contact
    emergencyContactTitle: "Emergency Contact",
    hereToHelp: "We're here to help you through this",
    crisisWarning: "If you're having thoughts of self-harm, please call emergency services (911) or crisis helplines immediately.",
    tellUsWhatsGoingOn: "Tell us what's going on",
    feelingOverwhelmedPlaceholder: "I'm feeling overwhelmed because...",
    howShouldWeContact: "How should we contact you?",
    telegram: "Telegram",
    phone: "Phone",
    email: "Email",
    whenNeedResponse: "When do you need a response?",
    within1h: "Within 1h",
    within4h: "Within 4h",
    within12h: "Within 12h",
    sendRequest: "Send Request",
    gotYourMessage: "We've Got Your Message",
    notAloneMessage: "You're not alone in this. Someone will reach out to you within",
    inMeantime: "In the meantime, try some breathing exercises or reach out to a trusted friend.",
    pleaseDescribe: "Please tell us what's going on",
    
    // Progress
    yourProgressTitle: "Your Progress",
    everyStepMatters: "Every step forward matters",
    daysOfProgress: "Days of Progress",
    achievements: "Achievements",
    addProgress: "Add Progress",
    whatProgressDidYouMake: "What progress did you make?",
    progressPlaceholder: "I did something good for myself...",
    addProgressBtn: "Add Progress",
    cancel: "Cancel",
    yourJourney: "Your Journey",
    makingProgress: "You're Making Progress",
    recoveryMessage: "Recovery isn't linear, but every step counts. Keep going.",
    progressAdded: "Progress added! Great work.",
    pleaseDescribeProgress: "Please describe your progress",
    
    // Sample progress items
    didntCheckSocial: "Didn't check her social media",
    wentToGym: "Went to the gym",
    dinnerWithFriends: "Had dinner with friends",
    completedCheckup: "Completed emotional check-up",
    startedApp: "Started using Return Yourself app",
    today: "Today",
    yesterday: "Yesterday",
    daysAgo2: "2 days ago",
    daysAgo3: "3 days ago",
    weekAgo: "1 week ago",
    
    // Profile
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    userName: "User Name",
    userEmail: "user@example.com"
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
    savedToReading: "Сохранено в список для чтения",
    requestSession: "Записаться на сессию",
    describeRequest: "Опиши свой запрос",
    
    // Emotional Checkup
    howAreYouSleeping: "Как ты спишь?",
    sleepingWell: "Сплю хорошо",
    someDifficulty: "Есть трудности",
    veryPoorly: "Очень плохо",
    howOftenThinkAboutHer: "Как часто ты думаешь о ней?",
    rarely: "Редко",
    sometimes: "Иногда",
    constantly: "Постоянно",
    howIsEnergyLevel: "Как твой уровень энергии?",
    goodEnergy: "Хорошая энергия",
    lowEnergy: "Мало энергии",
    exhausted: "Истощен",
    takingCareOfYourself: "Заботишься ли ты о себе?",
    yesRegularly: "Да, регулярно",
    notReally: "Не особо",
    howFeelAboutFuture: "Что ты чувствуешь по поводу будущего?",
    hopeful: "Надежду",
    uncertain: "Неопределенность",
    hopeless: "Безнадежность",
    managingWell: "Ты хорошо справляешься",
    managingWellMessage: "Кажется, ты справляешься с ситуацией с силой. Продолжай фокусироваться на своем росте.",
    workingThrough: "Ты прорабатываешь это",
    workingThroughMessage: "Это сложное время, но ты делаешь шаги вперед. Это требует мужества.",
    struggling: "Тебе сейчас трудно",
    strugglingMessage: "Это действительно тяжело, и это нормально - не быть в порядке. Тебе не нужно проходить через это в одиночку.",
    tryTechnique: "Попробовать SOS инструменты",
    
    // SOS Tools
    sosToolsTitle: "SOS Инструменты",
    feelingOverwhelmed: "Чувствуешь себя подавленным прямо сейчас?",
    breathingExercise: "Дыхательное упражнение",
    breathingDesc: "5-минутное управляемое дыхание для успокоения разума",
    groundingTechnique: "Техника заземления",
    groundingDesc: "Соединись с настоящим моментом через свои чувства",
    emergencyWriting: "Экстренное письмо",
    emergencyWritingDesc: "Выплесни свои мысли из головы на бумагу",
    calmingAudio: "Успокаивающий аудио",
    calmingAudioDesc: "Расслабляющие звуки, которые помогут тебе расслабиться",
    startExercise: "Начать упражнение",
    feelingBetter: "Мне лучше",
    greatProgress: "Отличный прогресс! Ты предпринял действие, когда это было нужнее всего.",
    
    // Emergency Contact
    emergencyContactTitle: "Экстренная связь",
    hereToHelp: "Мы здесь, чтобы помочь тебе пройти через это",
    crisisWarning: "Если у тебя есть мысли о самоповреждении, пожалуйста, звони в службу экстренного реагирования или на горячие линии кризисной помощи немедленно.",
    tellUsWhatsGoingOn: "Расскажи нам, что происходит",
    feelingOverwhelmedPlaceholder: "Я чувствую себя подавленным, потому что...",
    howShouldWeContact: "Как нам с тобой связаться?",
    telegram: "Telegram",
    phone: "Телефон",
    email: "Электронная почта",
    whenNeedResponse: "Когда тебе нужен ответ?",
    within1h: "В течение 1 часа",
    within4h: "В течение 4 часов",
    within12h: "В течение 12 часов",
    sendRequest: "Отправить запрос",
    gotYourMessage: "Мы получили твое сообщение",
    notAloneMessage: "Ты не один в этом. Кто-то свяжется с тобой в течение",
    inMeantime: "А пока попробуй дыхательные упражнения или обратись к проверенному другу.",
    pleaseDescribe: "Пожалуйста, расскажи нам, что происходит",
    
    // Progress
    yourProgressTitle: "Твой прогресс",
    everyStepMatters: "Каждый шаг вперед важен",
    daysOfProgress: "Дней прогресса",
    achievements: "Достижения",
    addProgress: "Добавить прогресс",
    whatProgressDidYouMake: "Какой прогресс ты сделал?",
    progressPlaceholder: "Я сделал что-то хорошее для себя...",
    addProgressBtn: "Добавить прогресс",
    cancel: "Отмена",
    yourJourney: "Твой путь",
    makingProgress: "Ты делаешь прогресс",
    recoveryMessage: "Восстановление не линейно, но каждый шаг важен. Продолжай.",
    progressAdded: "Прогресс добавлен! Отличная работа.",
    pleaseDescribeProgress: "Пожалуйста, опиши свой прогресс",
    
    // Sample progress items
    didntCheckSocial: "Не проверял её соцсети",
    wentToGym: "Ходил в спортзал",
    dinnerWithFriends: "Ужинал с друзьями",
    completedCheckup: "Прошел эмоциональную диагностику",
    startedApp: "Начал использовать приложение Верни Себя",
    today: "Сегодня",
    yesterday: "Вчера",
    daysAgo2: "2 дня назад",
    daysAgo3: "3 дня назад",
    weekAgo: "1 неделю назад",
    
    // Profile
    profile: "Профиль",
    settings: "Настройки",
    logout: "Выход",
    userName: "Имя пользователя",
    userEmail: "user@example.com"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ru');

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
