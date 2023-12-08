import { useLocation } from 'react-router-dom';
import { ENDPOINT } from '../utils/constants.js';

export default function useLocationState() {
  const location = useLocation().pathname;

  const showHeader =
    location === ENDPOINT.MAIN ||
    location === ENDPOINT.MOVIES ||
    location === ENDPOINT.SAVED_MOVIES ||
    location === ENDPOINT.PROFILE;

  const showFooter =
    location === ENDPOINT.MAIN ||
    location === ENDPOINT.MOVIES ||
    location === ENDPOINT.SAVED_MOVIES;

  const mainRoute = location === ENDPOINT.MAIN;

  const registerRoute = location === ENDPOINT.SIGNUP;

  const moviesRoute = location === ENDPOINT.MOVIES;

  const savedMoviesRoute = location === ENDPOINT.SAVED_MOVIES;

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
