
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmotionalCheckupQuestion } from "@/types/emotionalCheckup";

interface CheckupQuestionProps {
  question: EmotionalCheckupQuestion;
  onAnswer: (value: number) => void;
}

export const CheckupQuestion = ({ question, onAnswer }: CheckupQuestionProps) => {
  return (
    <Card className="p-6 bg-slate-800 border-slate-700 mb-6">
      <h3 className="text-xl font-semibold text-white text-center mb-8">
        {question.question}
      </h3>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option.value)}
            variant="outline"
            className="w-full p-6 h-auto border-slate-600 bg-slate-700 hover:bg-slate-600 text-white justify-start"
          >
            <span className="text-2xl mr-4">{option.emoji}</span>
            <span className="text-lg">{option.text}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
