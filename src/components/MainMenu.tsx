
import { Card } from "@/components/ui/card";
import { Calendar, Heart, BookOpen, Shield, Phone, TrendingUp } from "lucide-react";
import type { AppScreen } from "@/pages/Index";

interface MainMenuProps {
  onNavigate: (screen: AppScreen) => void;
}

const menuItems = [
  {
    id: "book" as AppScreen,
    title: "Book a Session",
    description: "Professional support when you need it",
    icon: Calendar,
    color: "from-blue-500 to-blue-600",
    urgent: false
  },
  {
    id: "checkup" as AppScreen,
    title: "Emotional Check-Up",
    description: "Understanding where you are right now",
    icon: Heart,
    color: "from-emerald-500 to-emerald-600",
    urgent: false
  },
  {
    id: "read" as AppScreen,
    title: "Read / Listen",
    description: "Helpful content for your journey",
    icon: BookOpen,
    color: "from-purple-500 to-purple-600",
    urgent: false
  },
  {
    id: "sos" as AppScreen,
    title: "SOS Tools",
    description: "Immediate help when overwhelmed",
    icon: Shield,
    color: "from-orange-500 to-orange-600",
    urgent: true
  },
  {
    id: "emergency" as AppScreen,
    title: "Emergency Contact",
    description: "Reach out for urgent support",
    icon: Phone,
    color: "from-red-500 to-red-600",
    urgent: true
  },
  {
    id: "progress" as AppScreen,
    title: "Your Progress",
    description: "Track your healing journey",
    icon: TrendingUp,
    color: "from-teal-500 to-teal-600",
    urgent: false
  }
];

export const MainMenu = ({ onNavigate }: MainMenuProps) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h2 className="text-2xl font-bold text-white mb-2">How can we help?</h2>
          <p className="text-slate-300">Choose what feels right for you now</p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-4 pb-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={item.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r ${item.color} border-0 ${
                  item.urgent ? 'ring-2 ring-white/20' : ''
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {item.title}
                      {item.urgent && <span className="ml-2 text-xs bg-white/30 px-2 py-1 rounded-full">URGENT</span>}
                    </h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
