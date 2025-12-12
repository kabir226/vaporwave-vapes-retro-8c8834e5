import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  return (
    <a
      href="whatsapp://send?phone=22605145905"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Contacter sur WhatsApp"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg transition-transform hover:scale-110"
        aria-label="Ouvrir WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" aria-hidden="true" />
      </Button>
    </a>
  );
};

export default WhatsAppButton;
