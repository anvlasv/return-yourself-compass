
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";

export const getCheckupResult = (score: number, t: (key: string) => string): EmotionalCheckupResult => {
  if (score >= 22) {
    return {
      title: t('excellentState'),
      message: t('excellentMessage'),
      color: "from-emerald-400 to-green-500",
      suggestion: t('excellentSuggestion')
    };
  } else if (score >= 18) {
    return {
      title: t('goodState'),
      message: t('goodMessage'),
      color: "from-blue-400 to-cyan-500",
      suggestion: t('goodSuggestion')
    };
  } else if (score >= 14) {
    return {
      title: t('moderateState'),
      message: t('moderateMessage'),
      color: "from-yellow-400 to-orange-500",
      suggestion: t('moderateSuggestion')
    };
  } else if (score >= 10) {
    return {
      title: t('difficultState'),
      message: t('difficultMessage'),
      color: "from-orange-500 to-red-500",
      suggestion: t('difficultSuggestion')
    };
  } else {
    return {
      title: t('criticalState'),
      message: t('criticalMessage'),
      color: "from-red-500 to-red-700",
      suggestion: t('criticalSuggestion')
    };
  }
};
