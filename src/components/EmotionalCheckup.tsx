
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEmotionalCheckupQuestions } from "@/data/emotionalCheckupData";
import { CheckupProgress } from "@/components/CheckupProgress";
import { CheckupQuestion } from "@/components/CheckupQuestion";
import { CheckupResult } from "@/components/CheckupResult";
import { getCheckupResult } from "@/utils/emotionalCheckupUtils";

interface EmotionalCheckupProps {
  onBack: () => void;
}

export const EmotionalCheckup = ({ onBack }: EmotionalCheckupProps) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = getEmotionalCheckupQuestions(t);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTotalScore = () => answers.reduce((sum, score) => sum + score, 0);

  if (showResult) {
    const result = getCheckupResult(getTotalScore(), t);
    return (
      <div className="min-h-screen p-4 pt-20">
        <div className="max-w-md mx-auto">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToMenu')}
          </Button>

          <CheckupResult result={result} />
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>

        <CheckupProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length}
        />

        <CheckupQuestion 
          question={question}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};
