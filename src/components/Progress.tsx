
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgressProps {
  onBack: () => void;
}

export const Progress = ({ onBack }: ProgressProps) => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProgress, setNewProgress] = useState("");

  const sampleProgress = [
    {
      id: 1,
      date: t('today'),
      achievement: t('didntCheckSocialMedia'),
      type: "milestone",
      icon: "🏆"
    },
    {
      id: 2,
      date: t('yesterday'),
      achievement: t('wentToGym'),
      type: "activity",
      icon: "💪"
    },
    {
      id: 3,
      date: t('twoDaysAgo'),
      achievement: t('hadDinnerWithFriends'),
      type: "social",
      icon: "👥"
    },
    {
      id: 4,
      date: t('threeDaysAgo'),
      achievement: t('completedEmotionalCheckup'),
      type: "growth",
      icon: "🧠"
    },
    {
      id: 5,
      date: t('oneWeekAgo'),
      achievement: t('startedUsingApp'),
      type: "milestone",
      icon: "🌱"
    }
  ];

  const handleAddProgress = () => {
    if (!newProgress.trim()) {
      toast(t('pleaseDescribeYourProgress'));
      return;
    }
    
    toast(t('progressAddedGreat'));
    setNewProgress("");
    setShowAddForm(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "milestone": return "from-yellow-500 to-yellow-600";
      case "activity": return "from-green-500 to-green-600";
      case "social": return "from-blue-500 to-blue-600";
      case "growth": return "from-purple-500 to-purple-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Fixed back button */}
      <div className="fixed top-14 left-0 right-0 z-30 p-4">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white border border-white/20 hover:bg-white/10 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToMenu')}
        </Button>
      </div>

      <div className="pt-20 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{t('yourProgressTitle')}</h2>
            <p className="text-slate-300">{t('everyStepForwardMatters')}</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-center">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-emerald-100 text-sm">{t('daysOfProgress')}</div>
            </Card>
            <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-blue-100 text-sm">{t('achievements')}</div>
            </Card>
          </div>

          {/* Add Progress Button */}
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full mb-6 bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('addProgress')}
            </Button>
          )}

          {/* Add Progress Form */}
          {showAddForm && (
            <Card className="p-4 bg-slate-800 border-slate-700 mb-6">
              <h3 className="text-white font-semibold mb-4">{t('whatProgressMade')}</h3>
              <input
                type="text"
                value={newProgress}
                onChange={(e) => setNewProgress(e.target.value)}
                placeholder={t('progressPlaceholder')}
                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white mb-4"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddProgress}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {t('addProgressBtn')}
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  {t('cancel')}
                </Button>
              </div>
            </Card>
          )}

          {/* Progress Timeline */}
          <div className="space-y-4 pb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              {t('yourJourney')}
            </h3>
            
            {sampleProgress.map((item, index) => (
              <Card 
                key={item.id}
                className={`p-4 bg-gradient-to-r ${getTypeColor(item.type)} border-0`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">
                      {item.achievement}
                    </div>
                    <div className="text-white/70 text-sm flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Encouragement Card */}
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 border-0 text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="text-white font-bold mb-2">{t('youMakingProgress')}</h3>
            <p className="text-purple-100 text-sm">
              {t('recoveryNotLinear')}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
