
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface EmotionalCheckupProps {
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    question: "How are you sleeping?",
    options: [
      { text: "Sleeping well", value: 3, emoji: "😴" },
      { text: "Some difficulty", value: 2, emoji: "😪" },
      { text: "Very poorly", value: 1, emoji: "😵" }
    ]
  },
  {
    id: 2,
    question: "How often do you think about her?",
    options: [
      { text: "Rarely", value: 3, emoji: "🙂" },
      { text: "Sometimes", value: 2, emoji: "😔" },
      { text: "Constantly", value: 1, emoji: "😰" }
    ]
  },
  {
    id: 3,
    question: "How is your energy level?",
    options: [
      { text: "Good energy", value: 3, emoji: "⚡" },
      { text: "Low energy", value: 2, emoji: "🔋" },
      { text: "Exhausted", value: 1, emoji: "😴" }
    ]
  },
  {
    id: 4,
    question: "Are you taking care of yourself?",
    options: [
      { text: "Yes, regularly", value: 3, emoji: "💪" },
      { text: "Sometimes", value: 2, emoji: "🤷" },
      { text: "Not really", value: 1, emoji: "😞" }
    ]
  },
  {
    id: 5,
    question: "How do you feel about the future?",
    options: [
      { text: "Hopeful", value: 3, emoji: "🌅" },
      { text: "Uncertain", value: 2, emoji: "🤔" },
      { text: "Hopeless", value: 1, emoji: "🌧️" }
    ]
  }
];

export const EmotionalCheckup = ({ onBack }: EmotionalCheckupProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

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
        title: "You're managing well",
        message: "You seem to be handling things with strength. Keep focusing on your growth.",
        color: "from-emerald-500 to-emerald-600",
        suggestion: "Consider booking a session to maintain your progress"
      };
    } else if (score >= 8) {
      return {
        title: "You're working through it",
        message: "This is a challenging time, but you're taking steps forward. That takes courage.",
        color: "from-orange-500 to-orange-600",
        suggestion: "Try our SOS tools or book a session for additional support"
      };
    } else {
      return {
        title: "You're struggling right now",
        message: "This is really hard, and it's okay to not be okay. You don't have to go through this alone.",
        color: "from-red-500 to-red-600",
        suggestion: "We recommend reaching out for immediate support"
      };
    }
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
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
                  onClick={() => toast("Booking feature coming soon!")}
                  className="w-full bg-white/20 hover:bg-white/30"
                >
                  Book a Session
                </Button>
                <Button 
                  onClick={() => toast("SOS tools activated!")}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                >
                  Try SOS Tools
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
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-slate-300 text-sm">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
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
                className="w-full p-6 h-auto border-slate-600 hover:bg-slate-700 text-white justify-start"
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
