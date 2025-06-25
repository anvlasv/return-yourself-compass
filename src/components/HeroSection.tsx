
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold text-white">RY</span>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Return Yourself
        </h1>

        {/* Slogan */}
        <p className="text-xl text-blue-200 mb-12 max-w-sm mx-auto leading-relaxed">
          Not chasing her. Reclaiming you.
        </p>

        {/* CTA Button */}
        <Button 
          onClick={onStart}
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Start Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Supportive message */}
        <p className="text-slate-300 mt-8 text-sm max-w-xs mx-auto">
          You're not alone in this journey. Take the first step toward healing.
        </p>
      </div>
    </div>
  );
};
