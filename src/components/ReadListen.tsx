
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SessionBookingModal } from "@/components/SessionBookingModal";
import { ReadListenHeader } from "@/components/ReadListenHeader";
import { ReadListenFooter } from "@/components/ReadListenFooter";
import { ContentCard } from "@/components/ContentCard";
import { AudioPlayerModal } from "@/components/AudioPlayerModal";
import { TelegraphArticleModal } from "@/components/TelegraphArticleModal";
import { contentEn, contentRu, ContentItem } from "@/data/readListenContent";
import { toast } from "sonner";

interface ReadListenProps {
  onBack: () => void;
}

export const ReadListen = ({ onBack }: ReadListenProps) => {
  const { t, language } = useLanguage();
  const content = language === 'ru' ? contentRu : contentEn;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedAudioItem, setSelectedAudioItem] = useState<ContentItem | null>(null);
  const [selectedArticleItem, setSelectedArticleItem] = useState<ContentItem | null>(null);

  console.log('ReadListen rendered, content:', content);
  console.log('Language:', language);

  const handleContentClick = (item: ContentItem) => {
    console.log('Content clicked:', item);
    if (item.type === 'audio') {
      setSelectedAudioItem(item);
      toast(`Загружается аудио "${item.title}"...`);
    } else if (item.type === 'article') {
      setSelectedArticleItem(item);
      toast(`Подготавливается статья "${item.title}"...`);
    }
  };

  const handleBookmark = (item: ContentItem) => {
    toast(t('savedToReading'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pb-20">
      <ReadListenHeader onBack={onBack} />

      <div className="p-4 pt-2">
        <div className="max-w-md mx-auto">
          <div className="space-y-4 pb-8">
            {content && content.length > 0 ? (
              content.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onContentClick={handleContentClick}
                  onBookmark={handleBookmark}
                />
              ))
            ) : (
              <div className="text-white text-center py-8">
                <p>Контент загружается...</p>
              </div>
            )}
          </div>

          <ReadListenFooter onRequestSession={() => setIsBookingModalOpen(true)} />

          <SessionBookingModal 
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
          />

          {selectedAudioItem && (
            <AudioPlayerModal
              isOpen={!!selectedAudioItem}
              onClose={() => setSelectedAudioItem(null)}
              item={selectedAudioItem}
            />
          )}

          {selectedArticleItem && (
            <TelegraphArticleModal
              isOpen={!!selectedArticleItem}
              onClose={() => setSelectedArticleItem(null)}
              item={selectedArticleItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};
