import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useResaize from './useResaize.js';
import { MOVIES_COUNT, ENDPOINT } from '../utils/constants.js';

export default function useAmountMovies(movies) {
  const moviesRoute = useLocation().pathname === ENDPOINT.MOVIES;
  const { desktopScreen, tabletScreen, mobileScreen } = useResaize();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [amount, setAmount] = useState({});

  useEffect(() => {
    if (moviesRoute) {
      if (desktopScreen) {
        return setAmount({
          movies:
            amount.movies > MOVIES_COUNT.DESKTOP_SCREEN.MOVIES
              ? amount.movies
              : MOVIES_COUNT.DESKTOP_SCREEN.MOVIES,
          more: MOVIES_COUNT.DESKTOP_SCREEN.MORE,
        });
      } else if (tabletScreen) {
        return setAmount({
          movies:
            amount.movies > MOVIES_COUNT.TABLET_SCREEN.MOVIES
              ? amount.movies
              : MOVIES_COUNT.TABLET_SCREEN.MOVIES,
          more: MOVIES_COUNT.TABLET_SCREEN.MORE,
        });
      } else if (mobileScreen) {
        return setAmount({
          movies:
            amount.movies > MOVIES_COUNT.MOBILE_SCREEN.MOVIES
              ? amount.movies
              : MOVIES_COUNT.MOBILE_SCREEN.MOVIES,
          more: MOVIES_COUNT.MOBILE_SCREEN.MORE,
        });
      }
    }
  }, [desktopScreen, tabletScreen, mobileScreen]);

  useEffect(() => {
    if (moviesRoute) {
      if (movies?.length <= amount.movies) {
        setShowMoreButton(false);
      } else setShowMoreButton(true);
    }
  }, [amount, movies]);

  function showMoreMoviesHandler() {
    setAmount({ ...amount, movies: amount.movies + amount.more });
  }

  function showAmountMovies() {
    return movies?.slice(0, amount.movies);
  }

  return {
    showMoreButton,
    showAmountMovies,
    showMoreMoviesHandler,
  };
}
