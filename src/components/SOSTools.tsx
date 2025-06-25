
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";

interface SOSToolsProps {
  onBack: () => void;
}

export const SOSTools = ({ onBack }: SOSToolsProps) => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingStep, setBreathingStep] = useState("inhale");
  const [breathingCount, setBreathingCount] = useState(4);

  const exercises = [
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      description: "Calm your nervous system with controlled breathing",
      icon: "🫁",
      action: "Start Breathing"
    },
    {
      id: "grounding",
      title: "5-4-3-2-1 Grounding",
      description: "Connect with your present moment",
      icon: "🧘",
      action: "Begin Grounding"
    },
    {
      id: "writing",
      title: "Thought Release",
      description: "Write down what's overwhelming you",
      icon: "✍️",
      action: "Start Writing"
    },
    {
      id: "movement",
      title: "Quick Movement",
      description: "Release tension with simple exercises",
      icon: "🏃",
      action: "Get Moving"
    }
  ];

  const startBreathing = () => {
    setActiveExercise("breathing");
    setIsBreathingActive(true);
    setBreathingStep("inhale");
    setBreathingCount(4);
    
    const cycle = () => {
      // Inhale for 4
      setBreathingStep("inhale");
      setBreathingCount(4);
      
      setTimeout(() => {
        // Hold for 7
        setBreathingStep("hold");
        setBreathingCount(7);
        
        setTimeout(() => {
          // Exhale for 8
          setBreathingStep("exhale");
          setBreathingCount(8);
          
          setTimeout(() => {
            if (isBreathingActive) cycle();
          }, 8000);
        }, 7000);
      }, 4000);
    };
    
    cycle();
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setActiveExercise(null);
  };

  if (activeExercise === "breathing") {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-md mx-auto pt-8">
          <Button 
            variant="ghost" 
            onClick={stopBreathing}
            className="text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Stop Exercise
          </Button>

          <div className="text-center">
            <div className="mb-8">
              <div 
                className={`w-32 h-32 mx-auto rounded-full border-4 border-blue-400 flex items-center justify-center text-white text-6xl transition-all duration-1000 ${
                  breathingStep === "inhale" ? "scale-110 bg-blue-500/30" :
                  breathingStep === "hold" ? "scale-105 bg-yellow-500/30" :
                  "scale-95 bg-green-500/30"
                }`}
              >
                🫁
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {breathingStep === "inhale" ? "Breathe In" :
               breathingStep === "hold" ? "Hold" :
               "Breathe Out"}
            </h3>
            
            <div className="text-4xl font-bold text-blue-400 mb-8">
              {breathingCount}
            </div>

            <p className="text-slate-300 mb-8">
              {breathingStep === "inhale" ? "Fill your lungs slowly and deeply" :
               breathingStep === "hold" ? "Hold your breath, stay calm" :
               "Release all the tension and stress"}
            </p>

            <Button 
              onClick={stopBreathing}
              className="bg-red-500 hover:bg-red-600"
            >
              <Pause className="mr-2 h-4 w-4" />
              I'm Feeling Better
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (activeExercise === "grounding") {
    const groundingSteps = [
      "Look around and name 5 things you can see",
      "Notice 4 things you can touch or feel",
      "Listen for 3 different sounds",
      "Identify 2 things you can smell",
      "Think of 1 thing you can taste"
    ];

    return (
      <div className="min-h-screen p-4">
        <div className="max-w-md mx-auto pt-8">
          <Button 
            variant="ghost" 
            onClick={() => setActiveExercise(null)}
            className="text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              5-4-3-2-1 Grounding Exercise
            </h3>
            
            <div className="space-y-4">
              {groundingSteps.map((step, index) => (
                <div key={index} className="p-4 bg-slate-700 rounded-lg">
                  <p className="text-white text-lg">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => setActiveExercise(null)}
                className="bg-green-500 hover:bg-green-600"
              >
                I'm More Grounded Now
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">SOS Tools</h2>
          <p className="text-slate-300">Quick relief when you're overwhelmed</p>
        </div>

        <div className="space-y-4">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              className="p-6 bg-slate-800 border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              onClick={() => {
                if (exercise.id === "breathing") {
                  startBreathing();
                } else if (exercise.id === "grounding") {
                  setActiveExercise("grounding");
                } else {
                  // For writing and movement, show coming soon
                  setActiveExercise(exercise.id);
                }
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{exercise.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {exercise.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-3">
                    {exercise.description}
                  </p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    {exercise.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
          <p className="text-orange-200 text-sm text-center">
            If you're having thoughts of self-harm, please reach out immediately to emergency services or crisis helplines.
          </p>
        </div>
      </div>
    </div>
  );
};
