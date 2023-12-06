import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useResaize from './useResaize.js';
import { MoviesCount, Endpoints } from '../utils/constants.js';

export default function useAmountMovies(movies) {
  const moviesRoute = useLocation().pathname === Endpoints.movies;
  const { desktopScreen, tabletScreen, mobileScreen } = useResaize();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [amount, setAmount] = useState({});

  useEffect(() => {
    if (moviesRoute) {
      if (desktopScreen) {
        return setAmount({
          movies:
            amount.movies > MoviesCount.desktopScreen.movies
              ? amount.movies
              : MoviesCount.desktopScreen.movies,
          more: MoviesCount.desktopScreen.more,
        });
      } else if (tabletScreen) {
        return setAmount({
          movies:
            amount.movies > MoviesCount.tabletScreen.movies
              ? amount.movies
              : MoviesCount.tabletScreen.movies,
          more: MoviesCount.tabletScreen.more,
        });
      } else if (mobileScreen) {
        return setAmount({
          movies:
            amount.movies > MoviesCount.mobileScreen.movies
              ? amount.movies
              : MoviesCount.mobileScreen.movies,
          more: MoviesCount.mobileScreen.more,
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
