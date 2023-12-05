export const Endpoints = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signup: '/signup',
  signin: '/signin',
  notFound: '/not-found',
  any: '*',
};

export const MoviesCount = {
  desktopScreen: {
    movies: 12,
    more: 3,
  },
  tabletScreen: {
    movies: 8,
    more: 2,
  },
  mobileScreen: {
    movies: 5,
    more: 2,
  },
};

export const LsConfig = {
  allMovies: 'allMovies',
  movies: 'movies',
  savedMovies: 'savedMovies',
  queryInput: 'queryInput',
  checkboxInput: 'checkboxInput',
  login: 'login',
};

export const Errors = {
  badRequest: 'Нужно ввести ключевое слово',
  notFound: 'Ничего не найдено',
  InternalServerError: 'На сервере произошла ошибка.',
  searchMovie:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
  updateProfile: 'При обновлении профиля произошла ошибка.',
  register: 'При регистрации пользователя произошла ошибка.',
  conflict: 'Пользователь с таким email уже существует.',
  login: 'Вы ввели неправильный логин или пароль.',
};

export const ShortMovie = 40;

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const ApiUrls = {
  beatFilm: 'https://api.nomoreparties.co',
  baseUrl: 'https://api.movies-explorer.nomoredomainsmonster.ru',
  // baseUrl: 'http://localhost:3001', //dev
};

export const ScreenWidth = {
  desktopScreen: 1200,
  mobileScreen: 430,
};
