
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface EmotionalCheckupProps {
  onBack: () => void;
}

export const EmotionalCheckup = ({ onBack }: EmotionalCheckupProps) => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
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
  
  const getResult = () => {
    const score = getTotalScore();
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

  if (showResult) {
    const result = getResult();
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

          <Card className={`p-6 bg-gradient-to-r ${result.color} border-0 text-white`}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{result.title}</h3>
              <p className="text-lg mb-6 leading-relaxed">{result.message}</p>
              <p className="text-sm bg-white/20 p-4 rounded-lg mb-6">
                {result.suggestion}
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => toast(t('bookingFeature'))}
                  className="w-full bg-white/20 hover:bg-white/30"
                >
                  {t('bookSession')}
                </Button>
                <Button 
                  onClick={() => toast(t('greatProgress'))}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  {t('tryTechnique')}
                </Button>
              </div>
            </div>
          </Card>
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

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm">Вопрос {currentQuestion + 1} из {questions.length}</span>
            <span className="text-slate-300 text-sm">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6 bg-slate-800 border-slate-700 mb-6">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            {question.question}
          </h3>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full p-6 h-auto border-slate-600 bg-slate-700 hover:bg-slate-600 text-white justify-start"
              >
                <span className="text-2xl mr-4">{option.emoji}</span>
                <span className="text-lg">{option.text}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
