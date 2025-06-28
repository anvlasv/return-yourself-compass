
import { useLanguage } from "@/contexts/LanguageContext";

interface CheckupProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswered?: boolean;
}

export const CheckupProgress = ({ currentQuestion, totalQuestions, hasAnswered = false }: CheckupProgressProps) => {
  const { t } = useLanguage();
  
  // Логика прогресса: 0% в начале, увеличивается после каждого ответа
  const progress = hasAnswered 
    ? ((currentQuestion + 1) / totalQuestions) * 100 
    : (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-white/80 text-sm font-medium">
          {currentQuestion + 1} / {totalQuestions}
        </span>
        <span className="text-white/80 text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
