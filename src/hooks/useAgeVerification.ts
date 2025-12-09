import { useState, useEffect } from 'react';

// Détecte si on est dans un environnement de pré-rendu (react-snap, SSR)
const isPrerendering = () => {
  if (typeof window === 'undefined') return true;
  if (typeof navigator === 'undefined') return true;
  // react-snap utilise un user-agent spécifique
  if (navigator.userAgent.includes('ReactSnap')) return true;
  // Détection des bots/crawlers courants
  const botPatterns = /bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|pinterest|whatsapp/i;
  if (botPatterns.test(navigator.userAgent)) return true;
  return false;
};

export const useAgeVerification = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marquer qu'on est côté client
    setIsClient(true);
    
    // Si c'est un bot/crawler/prerender, on simule une vérification d'âge validée
    // pour permettre l'indexation du contenu
    if (isPrerendering()) {
      setIsAgeVerified(true);
      setShowAgeModal(false);
      return;
    }

    // Logique normale pour les vrais utilisateurs
    try {
      const verified = localStorage.getItem('ageVerified');
      const verificationDate = localStorage.getItem('ageVerificationDate');
      const today = new Date().toDateString();
      
      if (verified === 'true' && verificationDate === today) {
        setIsAgeVerified(true);
        setShowAgeModal(false);
      } else {
        localStorage.removeItem('ageVerified');
        localStorage.removeItem('ageVerificationDate');
        setIsAgeVerified(false);
        setShowAgeModal(true);
      }
    } catch (e) {
      // localStorage non disponible (mode privé, etc.)
      setIsAgeVerified(false);
      setShowAgeModal(true);
    }
  }, []);

  const confirmAge = () => {
    try {
      const today = new Date().toDateString();
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('ageVerificationDate', today);
    } catch (e) {
      // Ignore localStorage errors
    }
    setIsAgeVerified(true);
    setShowAgeModal(false);
  };

  const denyAge = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.google.com';
    }
  };

  return {
    isAgeVerified,
    showAgeModal,
    confirmAge,
    denyAge,
    isClient // Utile pour savoir si on est côté client
  };
};
