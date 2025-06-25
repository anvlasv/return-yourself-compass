
import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MainMenu } from "@/components/MainMenu";
import { EmotionalCheckup } from "@/components/EmotionalCheckup";
import { BookSession } from "@/components/BookSession";
import { SOSTools } from "@/components/SOSTools";
import { EmergencyContact } from "@/components/EmergencyContact";
import { ReadListen } from "@/components/ReadListen";
import { Progress } from "@/components/Progress";

export type AppScreen = 
  | "hero" 
  | "menu" 
  | "checkup" 
  | "book" 
  | "sos" 
  | "emergency" 
  | "read" 
  | "progress";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");

  const renderScreen = () => {
    switch (currentScreen) {
      case "hero":
        return <HeroSection onStart={() => setCurrentScreen("menu")} />;
      case "menu":
        return <MainMenu onNavigate={setCurrentScreen} />;
      case "checkup":
        return <EmotionalCheckup onBack={() => setCurrentScreen("menu")} />;
      case "book":
        return <BookSession onBack={() => setCurrentScreen("menu")} />;
      case "sos":
        return <SOSTools onBack={() => setCurrentScreen("menu")} />;
      case "emergency":
        return <EmergencyContact onBack={() => setCurrentScreen("menu")} />;
      case "read":
        return <ReadListen onBack={() => setCurrentScreen("menu")} />;
      case "progress":
        return <Progress onBack={() => setCurrentScreen("menu")} />;
      default:
        return <HeroSection onStart={() => setCurrentScreen("menu")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {renderScreen()}
    </div>
  );
};

export default Index;
