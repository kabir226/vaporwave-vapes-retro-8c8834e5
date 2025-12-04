import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Loader2 } from 'lucide-react';

interface VideoPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

const VideoPreviewDialog: React.FC<VideoPreviewDialogProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsLoading(true);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-[90vw] max-h-[90vh] w-auto flex justify-center items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-xl">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}
        
        <video 
          src={videoUrl} 
          controls 
          autoPlay
          preload="auto"
          playsInline
          onCanPlay={() => setIsLoading(false)}
          onLoadedData={() => setIsLoading(false)}
          className={`rounded-xl max-h-[85vh] w-auto object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPreviewDialog;
