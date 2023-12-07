export const ENDPOINT = {
  MAIN: '/',
  MOVIES: '/movies',
  SAVED_MOVIES: '/saved-movies',
  PROFILE: '/profile',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  NOT_FOUND: '/not-found',
  ANY: '*',
};

export const MOVIES_COUNT = {
  DESKTOP_SCREEN: {
    MOVIES: 12,
    MORE: 3,
  },
  TABLET_SCREEN: {
    MOVIES: 8,
    MORE: 2,
  },
  MOBILE_SCREEN: {
    MOVIES: 5,
    MORE: 2,
  },
};

export const LOCAL_STORAGE_CONFIG = {
  ALL_MOVIES: 'allMovies',
  MOVIES: 'movies',
  QUERY_INPUT: 'queryInput',
  CHECKBOX_INPUT: 'checkboxInput',
  LOGIN: 'login',
};

export const ERROR = {
  BAD_REQUEST: 'Нужно ввести ключевое слово',
  NOT_FOUND: 'Ничего не найдено',
  INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка.',
  SEARCH_MOVIES:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  UPDATE_PROFILE: 'При обновлении профиля произошла ошибка.',
  REGISTER: 'При регистрации пользователя произошла ошибка.',
  CONFLICT: 'Пользователь с таким email уже существует.',
  LOGIN: 'Вы ввели неправильный логин или пароль.',
  SUCCESS: 'Успех',
};

export const SHORT_MOVIE = 40;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const API = {
  BEATFILM: 'https://api.nomoreparties.co',
  // BASE_URL: 'https://api.movies-explorer.nomoredomainsmonster.ru',
  BASE_URL: 'http://localhost:3001', //dev
};

export const SCREEN_WIDTH = {
  DESKTOP_SCREEN: 1200,
  MOBILE_SCREEN: 650,
};
