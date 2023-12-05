import { useState, useEffect } from 'react';
import { ScreenWidth } from '../utils/constants.js';

export default function useResaize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => setWidth(event.target.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    desktopScreen: width > ScreenWidth.desktopScreen,
    mobileScreen: width <= ScreenWidth.mobileScreen,
  };
}
