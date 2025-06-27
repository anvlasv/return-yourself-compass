
import { EmotionalCheckupQuestion } from "@/types/emotionalCheckup";

export const getEmotionalCheckupQuestions = (t: (key: string) => string): EmotionalCheckupQuestion[] => [
  {
    id: 1,
    question: t('howAreYouToday'),
    options: [
      { text: t('feelGreat'), value: 5, emoji: "😊" },
      { text: t('feelGood'), value: 4, emoji: "🙂" },
      { text: t('feelOkay'), value: 3, emoji: "😐" },
      { text: t('feelBad'), value: 2, emoji: "😔" },
      { text: t('feelTerrible'), value: 1, emoji: "😰" }
    ]
  },
  {
    id: 2,
    question: t('howIsYourSleep'),
    options: [
      { text: t('sleepWell'), value: 5, emoji: "😴" },
      { text: t('sleepOkay'), value: 4, emoji: "😌" },
      { text: t('sleepPoor'), value: 2, emoji: "😪" },
      { text: t('sleepBad'), value: 1, emoji: "😵" }
    ]
  },
  {
    id: 3,
    question: t('stressLevel'),
    options: [
      { text: t('noStress'), value: 5, emoji: "😌" },
      { text: t('lightStress'), value: 4, emoji: "🤔" },
      { text: t('moderateStress'), value: 3, emoji: "😟" },
      { text: t('highStress'), value: 2, emoji: "😰" },
      { text: t('extremeStress'), value: 1, emoji: "🥵" }
    ]
  },
  {
    id: 4,
    question: t('socialConnections'),
    options: [
      { text: t('goodConnections'), value: 5, emoji: "🤝" },
      { text: t('someConnections'), value: 4, emoji: "👋" },
      { text: t('limitedConnections'), value: 2, emoji: "😐" },
      { text: t('noConnections'), value: 1, emoji: "😞" }
    ]
  },
  {
    id: 5,
    question: t('copingAbility'),
    options: [
      { text: t('copingWell'), value: 5, emoji: "💪" },
      { text: t('copingOkay'), value: 4, emoji: "👌" },
      { text: t('copingPoor'), value: 2, emoji: "🤷" },
      { text: t('notCoping'), value: 1, emoji: "😓" }
    ]
  }
];
