import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
interface BenefitPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl?: string;
  imagePlaceholder?: string;
}
const BenefitPreviewDialog: React.FC<BenefitPreviewDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
  imagePlaceholder
}) => {
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-card border-border rounded-3xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors" aria-label="Close">
          <X className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="relative">
          <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
            {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-scale-down" /> : imagePlaceholder ? <p className="text-muted-foreground text-center px-8">{imagePlaceholder}</p> : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />}
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed text-center">
              {description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default BenefitPreviewDialog;