
import { EmotionalCheckupQuestion } from "@/types/emotionalCheckup";

export const getEmotionalCheckupQuestions = (t: (key: string) => string): EmotionalCheckupQuestion[] => [
  {
    id: 1,
    question: t('howAreYouSleeping'),
    options: [
      { text: t('sleepingWell'), value: 3, emoji: "😴" },
      { text: t('someDifficulty'), value: 2, emoji: "😪" },
      { text: t('veryPoorly'), value: 1, emoji: "😵" }
    ]
  },
  {
    id: 2,
    question: t('howOftenThinkAboutHer'),
    options: [
      { text: t('rarely'), value: 3, emoji: "🙂" },
      { text: t('sometimes'), value: 2, emoji: "😔" },
      { text: t('constantly'), value: 1, emoji: "😰" }
    ]
  },
  {
    id: 3,
    question: t('howIsEnergyLevel'),
    options: [
      { text: t('goodEnergy'), value: 3, emoji: "⚡" },
      { text: t('lowEnergy'), value: 2, emoji: "🔋" },
      { text: t('exhausted'), value: 1, emoji: "😴" }
    ]
  },
  {
    id: 4,
    question: t('takingCareOfYourself'),
    options: [
      { text: t('yesRegularly'), value: 3, emoji: "💪" },
      { text: t('sometimes'), value: 2, emoji: "🤷" },
      { text: t('notReally'), value: 1, emoji: "😞" }
    ]
  },
  {
    id: 5,
    question: t('howFeelAboutFuture'),
    options: [
      { text: t('hopeful'), value: 3, emoji: "🌅" },
      { text: t('uncertain'), value: 2, emoji: "🤔" },
      { text: t('hopeless'), value: 1, emoji: "🌧️" }
    ]
  }
];
