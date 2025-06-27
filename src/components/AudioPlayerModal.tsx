
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { ContentItem } from "@/data/readListenContent";

interface AudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem;
}

export const AudioPlayerModal = ({ isOpen, onClose, item }: AudioPlayerModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock audio URL - in real app, this would come from your audio content
  const audioUrl = `https://www.soundjay.com/misc/sounds/bell-ringing-05.wav`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">{item?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {item && (
            <div className={`p-4 rounded-lg bg-gradient-to-r ${item.color}`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🎧</span>
                <span className="text-xs bg-white/30 px-2 py-1 rounded-full text-white">
                  {item.category}
                </span>
              </div>
              <p className="text-white/80 text-sm">{item.description}</p>
            </div>
          )}

          <div className="space-y-4">
            <audio ref={audioRef} preload="metadata">
              <source src={audioUrl} type="audio/wav" />
              Ваш браузер не поддерживает аудио элемент.
            </audio>

            <div className="flex items-center space-x-4">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:w-4 
                    [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-500 
                    [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
