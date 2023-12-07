import { useState, useEffect } from 'react';
import { SCREEN_WIDTH } from '../utils/constants.js';

export default function useResaize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => setWidth(event.target.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    desktopScreen: width > SCREEN_WIDTH.DESKTOP_SCREEN,
    tabletScreen: width < SCREEN_WIDTH.DESKTOP_SCREEN && width > SCREEN_WIDTH.MOBILE_SCREEN,
    mobileScreen: width <= SCREEN_WIDTH.MOBILE_SCREEN,
  };
}
