
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";
import { ContentItem } from "@/data/readListenContent";
import { useState } from "react";

interface TelegraphArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem;
}

export const TelegraphArticleModal = ({ isOpen, onClose, item }: TelegraphArticleModalProps) => {
  const [showIframe, setShowIframe] = useState(false);
  
  // Mock Telegraph URL - в реальном приложении это будет получаться из базы данных
  const telegraphUrl = `https://telegra.ph/${item.title.toLowerCase().replace(/\s+/g, '-')}-${item.id}`;

  const openInTelegraph = () => {
    window.open(telegraphUrl, '_blank');
  };

  const showArticleInModal = () => {
    setShowIframe(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            {item.title}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!showIframe ? (
            <>
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
                  Выберите способ чтения статьи:
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={showArticleInModal}
                    className="bg-blue-500 hover:bg-blue-600 flex-1"
                  >
                    Читать здесь
                  </Button>
                  
                  <Button
                    onClick={openInTelegraph}
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-700 flex-1"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Открыть в Telegraph
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[70vh]">
              <div className="mb-4 flex justify-between items-center">
                <Button
                  onClick={() => setShowIframe(false)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  ← Назад к описанию
                </Button>
                
                <Button
                  onClick={openInTelegraph}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Открыть в новой вкладке
                </Button>
              </div>
              
              <iframe
                src={telegraphUrl}
                className="w-full h-full border-0 rounded-lg bg-white"
                title={item.title}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
