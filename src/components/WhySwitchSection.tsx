import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Leaf, Lock, Heart } from 'lucide-react';
import BenefitPreviewDialog from './BenefitPreviewDialog';
import VideoPreviewDialog from './VideoPreviewDialog';
import whySwitchBg from '@/assets/why-switch-background.jpg';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
import OptimizedImage from '@/components/ui/optimized-image';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  previewTitle: string;
  previewDescription: string;
  imageUrl?: string;
  id: string;
}

const WhySwitchSection: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { settings } = useHomepageSettings();

  const mainSettings = settings.find(s => s.section_name === 'why_switch');
  
  const defaultBenefits: Benefit[] = [
    {
      id: 'why_switch_safer',
      icon: <Leaf className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Alternative plus sûre',
      previewTitle: 'Alternative plus sûre',
      previewDescription: 'Les sachets de nicotine offrent une alternative plus sûre au tabagisme traditionnel. Sans combustion, sans goudron et sans fumée, vous pouvez profiter de la nicotine sans vous exposer aux produits chimiques nocifs présents dans les cigarettes. Vos poumons vous remercieront d\'avoir opté pour une option plus propre.'
    },
    {
      id: 'why_switch_discreet',
      icon: <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Discret',
      previewTitle: 'Subtil et caché',
      previewDescription: 'Avec les sachets de nicotine, vous pouvez consommer de la nicotine discrètement, où que vous soyez, même dans les endroits où fumer n\'est pas autorisé, comme dans un avion ou au travail. Les sachets sont petits, invisibles et discrets, vous permettant de satisfaire vos envies en privé, sans attirer l\'attention.'
    },
    {
      id: 'why_switch_smokeless',
      icon: <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />,
      title: 'Sans fumée',
      previewTitle: 'Sans fumée',
      previewDescription: 'Profitez de la nicotine sans fumée, odeur ou cendre. Les sachets de nicotine sont complètement sans fumée, ce qui les rend parfaits pour une utilisation n\'importe où, n\'importe quand. Pas besoin de sortir ou de vous inquiéter de déranger les autres avec de la fumée ou des odeurs. C\'est une façon propre et moderne de consommer de la nicotine.'
    }
  ];

  const benefits = defaultBenefits.map(benefit => {
    const setting = settings.find(s => s.section_name === benefit.id);
    return {
      ...benefit,
      previewTitle: setting?.title || benefit.previewTitle,
      previewDescription: setting?.description || benefit.previewDescription,
      imageUrl: setting?.image_url
    };
  });

  return (
    <>
      <section className="w-full py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {mainSettings?.title || 'Pourquoi passer des produits du tabac ?'}
          </h2>
          
          <p className="text-center text-base md:text-lg text-foreground mb-8 max-w-3xl mx-auto">
            {mainSettings?.subtitle || "Passer aux sachets de nicotine n'est pas qu'un simple changement. C'est un engagement vers un mode de vie plus sain et plus sûr, que vos poumons apprécieront !"}
          </p>

          <div className="flex justify-center mb-12">
            <Button 
              variant="ghost" 
              className="gap-2 text-foreground hover:text-primary"
              onClick={() => setIsVideoOpen(true)}
            >
              <PlayCircle className="w-6 h-6" />
              <span className="underline">Voir comment utiliser</span>
            </Button>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-8">
            {/* Background Image */}
            <OptimizedImage 
              src={mainSettings?.image_url || whySwitchBg} 
              alt="Why Switch Background" 
              className="absolute inset-0 w-full h-full"
              containerClassName="absolute inset-0 w-full h-full"
              objectFit="cover"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Safer Alternative - Top Left */}
            <button
              onClick={() => setSelectedBenefit(benefits[0])}
              className="absolute top-8 left-8 md:top-16 md:left-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[0].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[0].title}
              </p>
            </button>

            {/* Discreet - Top Right */}
            <button
              onClick={() => setSelectedBenefit(benefits[1])}
              className="absolute top-8 right-8 md:top-16 md:right-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[1].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[1].title}
              </p>
            </button>

            {/* Smokeless - Bottom Right */}
            <button
              onClick={() => setSelectedBenefit(benefits[2])}
              className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="relative">
                {/* Sound wave animations */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.4s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.2s' }} />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-sound-wave" style={{ animationDelay: '1.6s' }} />
                
                {/* Icon circle */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {benefits[2].icon}
                </div>
              </div>
              
              {/* Benefit title */}
              <p className="mt-2 font-bold text-xs md:text-sm text-white drop-shadow-lg">
                {benefits[2].title}
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Preview Dialogs */}
      {selectedBenefit && (
        <BenefitPreviewDialog
          isOpen={!!selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
          title={selectedBenefit.previewTitle}
          description={selectedBenefit.previewDescription}
          imageUrl={selectedBenefit.imageUrl}
          imagePlaceholder="Lifestyle image placeholder"
        />
      )}
      
      <VideoPreviewDialog
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl="/videos/how-to-use.mp4"
        title="Comment utiliser"
      />
    </>
  );
};

export default WhySwitchSection;