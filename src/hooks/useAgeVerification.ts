
import { useState, useEffect } from 'react';

export const useAgeVerification = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
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
  }, []);

  const confirmAge = () => {
    const today = new Date().toDateString();
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('ageVerificationDate', today);
    setIsAgeVerified(true);
    setShowAgeModal(false);
  };

  const denyAge = () => {
    window.location.href = 'https://www.google.com';
  };

  return {
    isAgeVerified,
    showAgeModal,
    confirmAge,
    denyAge
  };
};
