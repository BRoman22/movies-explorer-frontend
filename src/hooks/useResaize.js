import { useState, useEffect } from 'react';
import { screenWidth } from '../utils/constants.js';

export default function useResaize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    desktopScreen: width > screenWidth.desktopScreen,
    mobileScreen: width <= screenWidth.mobileScreen,
  };
}
