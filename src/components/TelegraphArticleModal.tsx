
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ContentItem } from "@/data/readListenContent";

interface TelegraphArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem;
}

export const TelegraphArticleModal = ({ isOpen, onClose, item }: TelegraphArticleModalProps) => {
  // Mock Telegraph URL - in real app, this would be dynamically generated
  const telegraphUrl = `https://telegra.ph/${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`;

  const openInTelegraph = () => {
    window.open(telegraphUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg bg-gradient-to-r ${item.color}`}>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">📖</span>
              <span className="text-xs bg-white/30 px-2 py-1 rounded-full text-white">
                {item.category}
              </span>
            </div>
            <p className="text-white/80 text-sm mb-3">{item.description}</p>
            <p className="text-white/70 text-xs">{item.readTime}</p>
          </div>

          <div className="text-center space-y-3">
            <p className="text-slate-300 text-sm">
              Статья откроется в Telegraph - удобном редакторе для чтения
            </p>
            
            <Button
              onClick={openInTelegraph}
              className="bg-blue-500 hover:bg-blue-600 w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Открыть в Telegraph
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
