
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEmotionalCheckupQuestions } from "@/data/emotionalCheckupData";
import { CheckupProgress } from "@/components/CheckupProgress";
import { CheckupQuestion } from "@/components/CheckupQuestion";
import { CheckupResult } from "@/components/CheckupResult";
import { getCheckupResult } from "@/utils/emotionalCheckupUtils";
import type { AppScreen } from "@/pages/Index";

interface EmotionalCheckupProps {
  onBack: () => void;
  onNavigate?: (screen: AppScreen) => void;
}

export const EmotionalCheckup = ({ onBack, onNavigate }: EmotionalCheckupProps) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

  const questions = getEmotionalCheckupQuestions(t);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    setHasAnsweredCurrent(true);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setHasAnsweredCurrent(false);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };

  const getTotalScore = () => answers.reduce((sum, score) => sum + score, 0);

  if (showResult) {
    const result = getCheckupResult(getTotalScore(), t);
    return (
      <div className="min-h-screen p-4 pt-6">
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-white/10 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToMenu')}
          </Button>

          <CheckupResult result={result} onNavigate={onNavigate} />
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen p-4 pt-6">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-4 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>

        <CheckupProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length}
          hasAnswered={hasAnsweredCurrent}
        />

        <CheckupQuestion 
          question={question}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};
