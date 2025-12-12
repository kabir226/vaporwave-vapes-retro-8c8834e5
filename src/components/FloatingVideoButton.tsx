import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const FloatingVideoButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay au chargement de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleExpand = () => {
    setIsFullscreen(true);
  };

  if (!isVisible && !isFullscreen) return null;

  return (
    <>
      {/* Mini Video Popup - Circular format like reference */}
      {isVisible && !isFullscreen && (
        <div 
          className="fixed bottom-6 left-6 z-50 animate-scale-in cursor-pointer"
          onClick={handleExpand}
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl border-2 border-primary/50 bg-black hover:scale-110 transition-transform">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-150"
              src="/videos/snuspedia-explainer.mp4"
            />
            {/* Close Button */}
            <Button
              size="icon"
              onClick={handleClose}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black/80 hover:bg-black text-white p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Fullscreen Video Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none">
          <div className="relative rounded-xl overflow-hidden">
            <video
              autoPlay
              loop
              controls
              playsInline
              className="w-full max-h-[85vh] object-contain"
              src="/videos/snuspedia-explainer.mp4"
            />
            <Button
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingVideoButton;
