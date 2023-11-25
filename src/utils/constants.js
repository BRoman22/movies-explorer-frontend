import { useLocation } from 'react-router-dom';

export const routes = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signup: '/signup',
  signin: '/signin',
  notFound: '/not-found',
  any: '*',
};

export const screenWidth = {
  desktopScreen: 768,
  mobileScreen: 430,
};

export function ShowHeader() {
  const location = useLocation().pathname;
  const showHeader =
    location === routes.main ||
    location === routes.movies ||
    location === routes.savedMovies ||
    location === routes.profile;
  return showHeader;
}

export function ShowFooter() {
  const location = useLocation().pathname;
  const showFooter =
    location === routes.main ||
    location === routes.movies ||
    location === routes.savedMovies;
  return showFooter;
}
