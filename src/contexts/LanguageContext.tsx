import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    hello: "Hello",
    welcome: "Welcome",
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    // Hero Section
    heroTitle: "Your Mental Well-being is Our Priority",
    heroSubtitle: "Discover resources and support to help you thrive.",
    getStarted: "Get Started",
    // Footer
    copyright: "© 2024 Mental Health App. All rights reserved.",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    howCanWeHelp: "How can we help you today?",
    chooseWhatFeels: "Choose what feels right for you",
    bookSession: "Book a Session",
    bookSessionDesc: "Schedule a consultation with a specialist",
    emotionalCheckup: "Emotional Check-up",
    emotionalCheckupDesc: "Quick assessment of your emotional state",
    readListen: "Read & Listen",
    readListenDesc: "Helpful articles and audio content",
    sosTools: "SOS Tools",
    sosToolsDesc: "Immediate help when you're overwhelmed",
    emergencyContact: "Emergency Contact",
    emergencyContactDesc: "Quick access to crisis support",
    yourProgress: "Your Progress",
    yourProgressDesc: "Track your journey and achievements",
    urgent: "URGENT",
    userName: "User Name",
    userEmail: "user@example.com",
    settings: "Settings",
    logout: "Logout",
    backToMenu: "Back to Menu",
    howAreYouSleeping: "How are you sleeping lately?",
    sleepingWell: "I'm sleeping well",
    someDifficulty: "Some difficulty falling asleep",
    veryPoorly: "Very poorly, constant insomnia",
    howOftenThinkAboutHer: "How often do you think about her?",
    rarely: "Rarely",
    sometimes: "Sometimes",
    constantly: "Constantly",
    howIsEnergyLevel: "How is your energy level?",
    goodEnergy: "Good energy",
    lowEnergy: "Low energy",
    exhausted: "Completely exhausted",
    takingCareOfYourself: "Are you taking care of yourself?",
    yesRegularly: "Yes, regularly",
    notReally: "Not really",
    howFeelAboutFuture: "How do you feel about the future?",
    hopeful: "Hopeful",
    uncertain: "Uncertain",
    hopeless: "Hopeless",
    managingWell: "You're managing well!",
    managingWellMessage: "You show good emotional resilience. Keep taking care of yourself.",
    workingThrough: "You're working through it",
    workingThroughMessage: "You're experiencing some challenges but showing strength in coping.",
    struggling: "You're struggling right now",
    strugglingMessage: "It's okay to not be okay. Professional support can really help.",
    tryTechnique: "Try SOS Techniques",
    bookingFeature: "Booking feature coming soon!",
    greatProgress: "Great progress!"
  },
  ru: {
    hello: "Привет",
    welcome: "Добро пожаловать",
     // Navigation
     home: "Главная",
     about: "О нас",
     services: "Услуги",
     contact: "Контакт",
     // Hero Section
     heroTitle: "Ваше психическое здоровье - наш приоритет",
     heroSubtitle: "Откройте для себя ресурсы и поддержку, которые помогут вам процветать.",
     getStarted: "Начать",
     // Footer
     copyright: "© 2024 Mental Health App. Все права защищены.",
     termsOfService: "Условия использования",
     privacyPolicy: "Политика конфиденциальности",
    howCanWeHelp: "Как мы можем помочь вам сегодня?",
    chooseWhatFeels: "Выберите то, что подходит именно вам",
    bookSession: "Записаться на сессию",
    bookSessionDesc: "Запланировать консультацию со специалистом",
    emotionalCheckup: "Эмоциональная диагностика",
    emotionalCheckupDesc: "Быстрая оценка вашего эмоционального состояния",
    readListen: "Читать и слушать",
    readListenDesc: "Полезные статьи и аудиоконтент",
    sosTools: "SOS Инструменты",
    sosToolsDesc: "Немедленная помощь в трудные моменты",
    emergencyContact: "Экстренная связь",
    emergencyContactDesc: "Быстрый доступ к кризисной поддержке",
    yourProgress: "Твой прогресс",
    yourProgressDesc: "Отслеживай свой путь и достижения",
    urgent: "СРОЧНО",
    userName: "Имя пользователя",
    userEmail: "user@example.com",
    settings: "Настройки",
    logout: "Выйти",
    backToMenu: "Назад в меню",
    howAreYouSleeping: "Как вы спите в последнее время?",
    sleepingWell: "Я сплю хорошо",
    someDifficulty: "Есть трудности с засыпанием",
    veryPoorly: "Очень плохо, постоянная бессонница",
    howOftenThinkAboutHer: "Как часто вы думаете о ней?",
    rarely: "Редко",
    sometimes: "Иногда",
    constantly: "Постоянно",
    howIsEnergyLevel: "Какой у вас уровень энергии?",
    goodEnergy: "Хорошая энергия",
    lowEnergy: "Низкая энергия",
    exhausted: "Полностью истощен",
    takingCareOfYourself: "Заботитесь ли вы о себе?",
    yesRegularly: "Да, регулярно",
    notReally: "Не особо",
    howFeelAboutFuture: "Как вы относитесь к будущему?",
    hopeful: "С надеждой",
    uncertain: "Неуверенно",
    hopeless: "Безнадежно",
    managingWell: "Вы хорошо справляетесь!",
    managingWellMessage: "Вы проявляете хорошую эмоциональную устойчивость. Продолжайте заботиться о себе.",
    workingThrough: "Вы работаете над этим",
    workingThroughMessage: "Вы переживаете некоторые трудности, но проявляете силу в их преодолении.",
    struggling: "Вам сейчас трудно",
    strugglingMessage: "Это нормально - чувствовать себя не очень хорошо. Профессиональная поддержка может действительно помочь.",
    tryTechnique: "Попробовать SOS техники",
    bookingFeature: "Функция записи скоро появится!",
    greatProgress: "Отличный прогресс!",
    // SOS Tools translations
    sosToolsTitle: "SOS Инструменты",
    quickReliefOverwhelmed: "Быстрая помощь, когда вы перегружены",
    breathingExercise478: "Дыхательное упражнение 4-7-8",
    breathingExerciseDesc: "Успокаивающая техника дыхания для снятия тревоги",
    startBreathing: "Начать дыхание",
    grounding5432: "Заземление 5-4-3-2-1",
    groundingDesc: "Техника осознанности для возвращения в настоящий момент",
    beginGrounding: "Начать заземление",
    thoughtRelease: "Освобождение мыслей",
    thoughtReleaseDesc: "Запишите свои мысли, чтобы освободить разум",
    startWriting: "Начать писать",
    quickMovement: "Быстрое движение",
    quickMovementDesc: "Простые упражнения для сброса стресса",
    getMoving: "Начать движение",
    stopExercise: "Остановить упражнение",
    breatheIn: "Вдох",
    hold: "Задержите",
    breatheOut: "Выдох",
    fillLungsSlowly: "Медленно наполните легкие воздухом",
    holdBreathCalm: "Задержите дыхание, оставайтесь спокойными",
    releaseAllTension: "Выпустите все напряжение",
    imFeelingBetter: "Мне стало лучше",
    backToTools: "Назад к инструментам",
    groundingExerciseTitle: "Упражнение заземления 5-4-3-2-1",
    groundingStep1: "5 вещей, которые вы ВИДИТЕ вокруг себя",
    groundingStep2: "4 вещи, которые вы можете ПОТРОГАТЬ",
    groundingStep3: "3 звука, которые вы СЛЫШИТЕ",
    groundingStep4: "2 запаха, которые вы ЧУВСТВУЕТЕ",
    groundingStep5: "1 вкус во рту",
    imMoreGrounded: "Я чувствую себя более заземленным",
    crisisHelplineWarning: "Если вы чувствуете, что находитесь в кризисе, немедленно обратитесь на горячую линию помощи: 8-800-2000-122",
    // Emergency Contact translations
    emergencyContactTitle: "Экстренная связь",
    whenYouNeedHelp: "Когда вам нужна немедленная помощь",
    crisisHotline: "Кризисная горячая линия",
    crisisHotlineDesc: "Круглосуточная поддержка в кризисных ситуациях",
    callNow: "Позвонить сейчас",
    textSupport: "Поддержка через SMS",
    textSupportDesc: "Анонимная помощь через текстовые сообщения",
    startChat: "Начать чат",
    onlineSupport: "Онлайн поддержка",
    onlineSupportDesc: "Мгновенная помощь через интернет",
    getHelp: "Получить помощь",
    localResources: "Местные ресурсы",
    localResourcesDesc: "Найти помощь в вашем регионе",
    findResources: "Найти ресурсы",
    rememberNotAlone: "Помните: вы не одни. Помощь всегда доступна.",
    // Progress translations
    yourProgressTitle: "Ваш прогресс",
    trackingYourJourney: "Отслеживание вашего пути к благополучию",
    emotionalWellbeing: "Эмоциональное благополучие",
    thisWeek: "На этой неделе",
    checkupsCompleted: "Диагностик завершено",
    averageScore: "Средний балл",
    sessionsBooked: "Сессий забронировано",
    recentActivity: "Недавняя активность",
    completedCheckup: "Завершена эмоциональная диагностика",
    usedSOSTools: "Использованы SOS инструменты",
    readArticle: "Прочитана статья",
    today: "Сегодня",
    yesterday: "Вчера",
    daysAgo2: "2 дня назад",
    achievements: "Достижения",
    firstCheckup: "Первая диагностика",
    weekStreak: "Неделя активности",
    sosExpert: "Эксперт SOS",
    completedFirst: "Завершили первую эмоциональную диагностику",
    activeForWeek: "Активны в течение недели подряд",
    used5SOSTools: "Использовали 5 различных SOS инструментов",
    viewDetailedReport: "Посмотреть подробный отчет"
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');

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
