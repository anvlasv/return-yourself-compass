
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Bookmark } from "lucide-react";
import { ContentItem } from "@/data/readListenContent";

interface ContentCardProps {
  item: ContentItem;
  onContentClick: (item: ContentItem) => void;
  onBookmark: (item: ContentItem) => void;
}

export const ContentCard = ({ item, onContentClick, onBookmark }: ContentCardProps) => {
  console.log('ContentCard rendered:', item);
  
  return (
    <Card
      className={`p-5 bg-gradient-to-r ${item.color} border-0 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg`}
      onClick={() => onContentClick(item)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">
              {item.type === "article" ? "📖" : "🎧"}
            </span>
            <span className="text-xs bg-white/30 px-2 py-1 rounded-full text-white font-medium">
              {item.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 leading-tight">
            {item.title}
          </h3>
          
          <p className="text-white/80 text-sm mb-3 leading-relaxed">
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
                onBookmark(item);
              }}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
