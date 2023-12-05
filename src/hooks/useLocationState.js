import { useLocation } from 'react-router-dom';
import { Endpoints } from '../utils/constants.js';

export default function useLocationState() {
  const location = useLocation().pathname;

  const showHeader =
    location === Endpoints.main ||
    location === Endpoints.movies ||
    location === Endpoints.savedMovies ||
    location === Endpoints.profile;

  const showFooter =
    location === Endpoints.main ||
    location === Endpoints.movies ||
    location === Endpoints.savedMovies;

  const mainRoute = location === Endpoints.main;

  const registerRoute = location === Endpoints.signup;

  const moviesRoute = location === Endpoints.movies;

  const savedMoviesRoute = location === Endpoints.savedMovies;

  return {
    location,
    mainRoute,
    registerRoute,
    moviesRoute,
    savedMoviesRoute,
    showHeader,
    showFooter,
  };
}
