
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SessionBookingModal } from "@/components/SessionBookingModal";
import { ReadListenHeader } from "@/components/ReadListenHeader";
import { ReadListenFooter } from "@/components/ReadListenFooter";
import { ContentCard } from "@/components/ContentCard";
import { contentEn, contentRu, ContentItem } from "@/data/readListenContent";
import { toast } from "sonner";

interface ReadListenProps {
  onBack: () => void;
}

export const ReadListen = ({ onBack }: ReadListenProps) => {
  const { t, language } = useLanguage();
  const content = language === 'ru' ? contentRu : contentEn;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleContentClick = (item: ContentItem) => {
    toast(`Открывается "${item.title}"...`);
  };

  const handleBookmark = (item: ContentItem) => {
    toast(t('savedToReading'));
  };

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-md mx-auto">
        <ReadListenHeader onBack={onBack} />

        <div className="space-y-4 pb-8">
          {content.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onContentClick={handleContentClick}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        <ReadListenFooter onRequestSession={() => setIsBookingModalOpen(true)} />

        <SessionBookingModal 
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </div>
    </div>
  );
};
