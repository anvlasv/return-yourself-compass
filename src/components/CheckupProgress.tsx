
interface CheckupProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const CheckupProgress = ({ currentQuestion, totalQuestions }: CheckupProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 text-sm">Вопрос {currentQuestion + 1} из {totalQuestions}</span>
        <span className="text-slate-300 text-sm">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
