import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckupProgress } from "@/components/CheckupProgress";

interface SOSToolsProps {
  onBack: () => void;
}

export const SOSTools = ({ onBack }: SOSToolsProps) => {
  const { t } = useLanguage();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingStep, setBreathingStep] = useState("inhale");
  const [breathingCount, setBreathingCount] = useState(4);
  const [thoughtText, setThoughtText] = useState("");
  const [movementStep, setMovementStep] = useState(0);

  const exercises = [
    {
      id: "breathing",
      title: t('breathingExercise478'),
      description: t('breathingExerciseDesc'),
      icon: "🫁",
      action: t('startBreathing')
    },
    {
      id: "grounding",
      title: t('grounding5432'),
      description: t('groundingDesc'),
      icon: "🧘",
      action: t('beginGrounding')
    },
    {
      id: "writing",
      title: t('thoughtRelease'),
      description: t('thoughtReleaseDesc'),
      icon: "✍️",
      action: t('startWriting')
    },
    {
      id: "movement",
      title: t('quickMovement'),
      description: t('quickMovementDesc'),
      icon: "🏃",
      action: t('getMoving')
    }
  ];

  const movementExercises = [
    t('movementStep1'),
    t('movementStep2'),
    t('movementStep3'),
    t('movementStep4'),
    t('movementStep5')
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
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900 pt-6">
        <div className="max-w-md mx-auto">
          <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
            <Button 
              variant="ghost" 
              onClick={stopBreathing}
              className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('stopExercise')}
            </Button>
          </div>

          <div className="pt-20 text-center">
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
              {breathingStep === "inhale" ? t('breatheIn') :
               breathingStep === "hold" ? t('hold') :
               t('breatheOut')}
            </h3>
            
            <div className="text-4xl font-bold text-blue-400 mb-8">
              {breathingCount}
            </div>

            <p className="text-slate-300 mb-8">
              {breathingStep === "inhale" ? t('fillLungsSlowly') :
               breathingStep === "hold" ? t('holdBreathCalm') :
               t('releaseAllTension')}
            </p>

            <Button 
              onClick={stopBreathing}
              className="bg-red-500 hover:bg-red-600"
            >
              <Pause className="mr-2 h-4 w-4" />
              {t('imFeelingBetter')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (activeExercise === "grounding") {
    const groundingSteps = [
      t('groundingStep1'),
      t('groundingStep2'),
      t('groundingStep3'),
      t('groundingStep4'),
      t('groundingStep5')
    ];

    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900 pt-6">
        <div className="max-w-md mx-auto">
          <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
            <Button 
              variant="ghost" 
              onClick={() => setActiveExercise(null)}
              className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToTools')}
            </Button>
          </div>

          <div className="pt-20">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-xl font-bold text-white text-center mb-6">
                {t('groundingExerciseTitle')}
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
                  {t('imMoreGrounded')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeExercise === "writing") {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900 pt-6">
        <div className="max-w-md mx-auto">
          <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
            <Button 
              variant="ghost" 
              onClick={() => setActiveExercise(null)}
              className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToTools')}
            </Button>
          </div>

          <div className="pt-20">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">✍️</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('thoughtRelease')}
                </h3>
                <p className="text-slate-300">
                  {t('writeDownThoughts')}
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={thoughtText}
                  onChange={(e) => setThoughtText(e.target.value)}
                  placeholder={t('thoughtPlaceholder')}
                  className="w-full h-40 p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="text-sm text-slate-400 text-center">
                  {t('writingPrivate')}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button 
                  onClick={() => setThoughtText("")}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  {t('clearText')}
                </Button>
                <Button 
                  onClick={() => setActiveExercise(null)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {t('feelingBetter')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (activeExercise === "movement") {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-slate-900 to-blue-900 pt-6">
        <div className="max-w-md mx-auto">
          <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
            <Button 
              variant="ghost" 
              onClick={() => setActiveExercise(null)}
              className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToTools')}
            </Button>
          </div>

          <div className="pt-20">
            <Card className="p-6 bg-slate-800 border-slate-700">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏃</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('quickMovement')}
                </h3>
                <p className="text-slate-300">
                  {t('movementInstructions')}
                </p>
              </div>

              <CheckupProgress 
                currentQuestion={movementStep} 
                totalQuestions={movementExercises.length}
                hasAnswered={false}
              />

              <div className="space-y-4">
                <div className="p-6 bg-slate-700 rounded-lg text-center">
                  <p className="text-white text-lg font-medium">
                    {movementExercises[movementStep]}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {movementStep > 0 && (
                  <Button 
                    onClick={() => setMovementStep(movementStep - 1)}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    {t('previous')}
                  </Button>
                )}
                
                {movementStep < movementExercises.length - 1 ? (
                  <Button 
                    onClick={() => setMovementStep(movementStep + 1)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    {t('next')}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setActiveExercise(null)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    {t('complete')}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="fixed top-14 left-0 right-0 z-30 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 h-16">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>
      </div>

      <div className="pt-16 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{t('sosToolsTitle')}</h2>
            <p className="text-slate-300">{t('quickReliefOverwhelmed')}</p>
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
                  } else if (exercise.id === "writing") {
                    setActiveExercise("writing");
                    setThoughtText("");
                  } else if (exercise.id === "movement") {
                    setActiveExercise("movement");
                    setMovementStep(0);
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
              {t('crisisHelplineWarning')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
