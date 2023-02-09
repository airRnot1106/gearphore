import { useMedia as useMediaLib } from 'use-media';

export const useMedia = () => {
  const isDesktop = useMediaLib({ minWidth: '768px' });
  return { isDesktop };
};
