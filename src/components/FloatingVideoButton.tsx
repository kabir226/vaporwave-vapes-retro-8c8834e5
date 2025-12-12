import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingVideoButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsPlaying(false);
    } else {
      setIsExpanded(true);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isExpanded ? (
        <div className="relative animate-scale-in">
          {/* Video Container */}
          <div className="relative w-64 md:w-80 rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
              src="/videos/snuspedia-explainer.mp4"
            />
            {/* Close Button */}
            <Button
              size="icon"
              onClick={handleToggle}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleToggle}
          size="icon"
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all hover:scale-110 animate-pulse"
          aria-label="Voir la vidéo"
        >
          <Play className="h-6 w-6 text-white ml-1" />
        </Button>
      )}
    </div>
  );
};

export default FloatingVideoButton;
