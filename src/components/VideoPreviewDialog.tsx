import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[350px] sm:max-w-4xl p-0 bg-card border-border rounded-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="relative">
          {title && (
            <div className="p-6 pb-4">
              <h3 className="text-2xl font-bold text-center">{title}</h3>
            </div>
          )}
          
          <div className="aspect-video bg-black flex items-center justify-center">
            <video 
              src={videoUrl} 
              controls 
              autoPlay
              className="w-full h-full"
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPreviewDialog;
