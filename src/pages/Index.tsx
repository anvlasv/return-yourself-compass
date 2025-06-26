
import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { MainMenu } from "@/components/MainMenu";
import { EmotionalCheckup } from "@/components/EmotionalCheckup";
import { SOSTools } from "@/components/SOSTools";
import { BookSession } from "@/components/BookSession";
import { EmergencyContact } from "@/components/EmergencyContact";
import { ReadListen } from "@/components/ReadListen";
import { Progress } from "@/components/Progress";
import { Header } from "@/components/Header";

export type AppScreen = "hero" | "menu" | "book" | "checkup" | "read" | "sos" | "emergency" | "progress";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");

  const handleStart = () => {
    setCurrentScreen("menu");
  };

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen("menu");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "hero":
        return <HeroSection onStart={handleStart} />;
      case "menu":
        return <MainMenu onNavigate={handleNavigate} />;
      case "book":
        return <BookSession onBack={handleBack} />;
      case "checkup":
        return <EmotionalCheckup onBack={handleBack} />;
      case "read":
        return <ReadListen onBack={handleBack} />;
      case "sos":
        return <SOSTools onBack={handleBack} />;
      case "emergency":
        return <EmergencyContact onBack={handleBack} />;
      case "progress":
        return <Progress onBack={handleBack} />;
      default:
        return <HeroSection onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {currentScreen !== "hero" && <Header />}
      <div className={currentScreen !== "hero" ? "pt-14" : ""}>
        {renderScreen()}
      </div>
    </div>
  );
};

export default Index;
