import { useState } from 'react';

export const useBannerManagement = (currentUser: any) => {
  const [isCropping, setIsCropping] = useState(false);

  const handleBannerAdjust = () => {
    setIsCropping(true);
  };

  return {
    isCropping,
    setIsCropping,
    handleBannerAdjust
  };
};