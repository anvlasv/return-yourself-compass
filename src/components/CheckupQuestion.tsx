
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmotionalCheckupQuestion } from "@/types/emotionalCheckup";

interface CheckupQuestionProps {
  question: EmotionalCheckupQuestion;
  onAnswer: (value: number) => void;
}

export const CheckupQuestion = ({ question, onAnswer }: CheckupQuestionProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 border">
        <h3 className="text-xl font-semibold text-white text-center leading-relaxed">
          {question.question}
        </h3>
      </Card>
      
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option.value)}
            variant="outline"
            className="w-full p-4 h-auto border-white/30 bg-white/5 hover:bg-white/15 text-white justify-start transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-2xl mr-3 flex-shrink-0">{option.emoji}</span>
            <span className="text-base text-left leading-relaxed">{option.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
