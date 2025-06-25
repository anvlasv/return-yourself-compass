
import { EmotionalCheckupResult } from "@/types/emotionalCheckup";

export const getCheckupResult = (score: number, t: (key: string) => string): EmotionalCheckupResult => {
  if (score >= 12) {
    return {
      title: t('managingWell'),
      message: t('managingWellMessage'),
      color: "from-emerald-500 to-emerald-600",
      suggestion: t('bookSession')
    };
  } else if (score >= 8) {
    return {
      title: t('workingThrough'),
      message: t('workingThroughMessage'),
      color: "from-orange-500 to-orange-600",
      suggestion: t('tryTechnique')
    };
  } else {
    return {
      title: t('struggling'),
      message: t('strugglingMessage'),
      color: "from-red-500 to-red-600",
      suggestion: t('emergencyContact')
    };
  }
};
