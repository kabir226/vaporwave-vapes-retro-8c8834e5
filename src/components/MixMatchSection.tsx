import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useHomepageSettings } from '@/hooks/useHomepageSettings';
const MixMatchSection: React.FC = () => {
  const {
    getSetting
  } = useHomepageSettings('mix_match');
  const settings = getSetting('mix_match');
  return <section className="w-full py-16 px-4 bg-card">
      
    </section>;
};
export default MixMatchSection;