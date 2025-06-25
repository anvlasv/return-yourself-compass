
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bookmark, Play, Clock } from "lucide-react";
import { toast } from "sonner";

interface ReadListenProps {
  onBack: () => void;
}

const content = [
  {
    id: 1,
    type: "article",
    title: "Understanding the Grief of Lost Love",
    description: "Why breakups feel like death, and that's completely normal",
    readTime: "5 min read",
    category: "Understanding",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    type: "audio",
    title: "Guided Meditation for Heartbreak",
    description: "A 10-minute practice to find peace in the storm",
    readTime: "10 min listen",
    category: "Practice",
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    type: "article",
    title: "Stop Checking Her Social Media",
    description: "Practical strategies to break the obsessive cycle",
    readTime: "7 min read",
    category: "Action",
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 4,
    type: "audio",
    title: "Building Self-Worth After Rejection",
    description: "Rediscovering your value beyond the relationship",
    readTime: "15 min listen",
    category: "Growth",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: 5,
    type: "article",
    title: "When to Reach Out (And When Not To)",
    description: "Making smart decisions about contact",
    readTime: "6 min read",
    category: "Guidance",
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    type: "audio",
    title: "Sleep Stories for the Broken-Hearted",
    description: "Gentle narratives to help you rest",
    readTime: "20 min listen",
    category: "Rest",
    color: "from-indigo-500 to-indigo-600"
  }
];

export const ReadListen = ({ onBack }: ReadListenProps) => {
  const handleContentClick = (item: typeof content[0]) => {
    toast(`Opening "${item.title}"...`);
  };

  const handleBookmark = (item: typeof content[0]) => {
    toast(`Saved "${item.title}" to your reading list`);
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
          <h2 className="text-2xl font-bold text-white mb-2">Read & Listen</h2>
          <p className="text-slate-300">Helpful content for your healing journey</p>
        </div>

        <div className="space-y-4 pb-8">
          {content.map((item) => (
            <Card
              key={item.id}
              className={`p-5 bg-gradient-to-r ${item.color} border-0 cursor-pointer hover:scale-105 transition-all duration-300`}
              onClick={() => handleContentClick(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">
                      {item.type === "article" ? "📖" : "🎧"}
                    </span>
                    <span className="text-xs bg-white/30 px-2 py-1 rounded-full text-white">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/70 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.readTime}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(item);
                      }}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-slate-800 border-slate-700">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">Want More Content?</h3>
            <p className="text-slate-300 text-sm mb-4">
              Get personalized resources based on your progress
            </p>
            <Button 
              onClick={() => toast("Booking feature coming soon!")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Book a Session
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
