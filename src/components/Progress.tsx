
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ProgressProps {
  onBack: () => void;
}

const sampleProgress = [
  {
    id: 1,
    date: "Today",
    achievement: "Didn't check her social media",
    type: "milestone",
    icon: "🏆"
  },
  {
    id: 2,
    date: "Yesterday",
    achievement: "Went to the gym",
    type: "activity",
    icon: "💪"
  },
  {
    id: 3,
    date: "2 days ago",
    achievement: "Had dinner with friends",
    type: "social",
    icon: "👥"
  },
  {
    id: 4,
    date: "3 days ago",
    achievement: "Completed emotional check-up",
    type: "growth",
    icon: "🧠"
  },
  {
    id: 5,
    date: "1 week ago",
    achievement: "Started using Return Yourself app",
    type: "milestone",
    icon: "🌱"
  }
];

export const Progress = ({ onBack }: ProgressProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProgress, setNewProgress] = useState("");

  const handleAddProgress = () => {
    if (!newProgress.trim()) {
      toast("Please describe your progress");
      return;
    }
    
    toast("Progress added! Great work.");
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
          <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
          <p className="text-slate-300">Every step forward matters</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-center">
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-emerald-100 text-sm">Days of Progress</div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-center">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-blue-100 text-sm">Achievements</div>
          </Card>
        </div>

        {/* Add Progress Button */}
        {!showAddForm && (
          <Button 
            onClick={() => setShowAddForm(true)}
            className="w-full mb-6 bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Progress
          </Button>
        )}

        {/* Add Progress Form */}
        {showAddForm && (
          <Card className="p-4 bg-slate-800 border-slate-700 mb-6">
            <h3 className="text-white font-semibold mb-4">What progress did you make?</h3>
            <input
              type="text"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
              placeholder="I did something good for myself..."
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white mb-4"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleAddProgress}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                Add Progress
              </Button>
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Progress Timeline */}
        <div className="space-y-4 pb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Your Journey
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
          <h3 className="text-white font-bold mb-2">You're Making Progress</h3>
          <p className="text-purple-100 text-sm">
            Recovery isn't linear, but every step counts. Keep going.
          </p>
        </Card>
      </div>
    </div>
  );
};
