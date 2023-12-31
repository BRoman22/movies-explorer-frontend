import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import useLocationState from '../../hooks/useLocationState';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
import {
  ENDPOINT,
  LOCAL_STORAGE_CONFIG,
  ERROR,
  SHORT_MOVIE,
} from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import SideBarPopup from '../SideBarPopup/SideBarPopup';
import InfoTooltipPopup from '../InfoTooltipPopup/InfoTooltipPopup';

export default function App() {
  const navigate = useNavigate();
  const { showHeader, showFooter, location, moviesRoute, savedMoviesRoute } =
    useLocationState();
  const login = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.LOGIN));
  const [loggedIn, setLoggedIn] = useState(login);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const allMovies = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CONFIG.ALL_MOVIES),
  );
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  //logged
  function toggleLoggedIn(state) {
    setLoggedIn(state);
    localStorage.setItem(LOCAL_STORAGE_CONFIG.LOGIN, JSON.stringify(state));
  }

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((userInfo) => {
          toggleLoggedIn(true);
          setCurrentUser(userInfo);
        })
        .catch(() => {
          localStorage.clear();
          toggleLoggedIn(false);
        });
    }
  }, [loggedIn]);

  //устанавливаем фильмы из последнего запроса
  useEffect(() => {
    if (moviesRoute) {
      setMovies(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.MOVIES))
          ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.MOVIES))
          : [],
      );
    }
  }, [moviesRoute]);

  //устанавливаем сохраненные фильмы при переходе на страницу сохраненные фильмы
  useEffect(() => {
    if (loggedIn && savedMoviesRoute) {
      MainApi.getSavedMovies()
        .then(setSavedMovies)
        .catch(() => setErrorMessage(ERROR.SEARCH_MOVIES));
    }
  }, [loggedIn, savedMoviesRoute]);

  //auth
  function handleRegister(name, email, password) {
    setIsLoading(true);
    MainApi.register({ name, email, password })
      .then(() => handleLogin(email, password))
      .catch((err) => {
        if (err.status === 409) {
          return showError(ERROR.CONFLICT);
        }
        return showError(ERROR.REGISTER);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.login({ email, password })
      .then(() => {
        toggleLoggedIn(true);
        navigate(ENDPOINT.MOVIES, { replace: true });
      })
      .catch((err) => {
        if (err.status === 401) {
          return showError(ERROR.LOGIN);
        }
        return showError(ERROR.INTERNAL_SERVER_ERROR);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSignout() {
    MainApi.logout()
      .then(() => {
        localStorage.clear();
        toggleLoggedIn(false);
      })
      .catch(() => showError(ERROR.INTERNAL_SERVER_ERROR));
  }

  //при смене страницы, стираем ошибку
  useEffect(() => {
    setErrorMessage(false);
  }, [location]);

  //показываем ошибку в попапе
  function showError(text) {
    setPopups({ ...popups, infoTooltip: true });
    setErrorMessage(text);
  }

  //апдейт массивов фильмов
  function updateMovies(item) {
    function changeItemInArr(arr, film) {
      return arr.map((movie) =>
        movie.movieId === film.movieId ? film : movie,
      );
    }

    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.ALL_MOVIES,
      JSON.stringify(changeItemInArr(allMovies, item)),
    );

    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.MOVIES,
      JSON.stringify(changeItemInArr(movies, item)),
    );

    setMovies(changeItemInArr(movies, item));
  }

  //удаляем фильм из сохранненых
  function handleUnsaveMovie(item) {
    MainApi.unSaveMovie(item._id)
      .then(() => {
        const movie = item;
        delete movie.owner;
        delete movie._id;

        updateMovies(movie);
        const newSavedMovies = savedMovies.filter(
          (movie) => movie._id !== item._id,
        );
        setSavedMovies(newSavedMovies);
      })
      .catch(() => showError(ERROR.INTERNAL_SERVER_ERROR));
  }

  //сохраняем фильм
  function handleSaveMovie(item) {
    MainApi.saveMovie(item)
      .then((movie) => {
        updateMovies(movie);

        setSavedMovies([...savedMovies, movie]);
      })
      .catch(() => showError(ERROR.INTERNAL_SERVER_ERROR));
  }

  //обновляем профиль юзера
  function handleUpdateUser(name, email) {
    MainApi.updateUserInfo({ name, email })
      .then((userInfo) => {
        showError(ERROR.SUCCESS);
        setCurrentUser(userInfo);
      })
      .catch(() => showError(ERROR.UPDATE_PROFILE));
  }

  //стейт попапа и хендлеры опен/клоуз
  const [popups, setPopups] = useState({
    sidebar: false,
    infoTooltip: false,
  });
  function handleOpenSideBar() {
    setPopups({ ...popups, sidebar: true });
  }
  function handleCloseAllPopups() {
    setPopups({ sidebar: false, infoTooltip: false });
  }

  //фильтр поиска фильмов
  function filterMovies(items, query, checkbox) {
    return items.filter((movie) => {
      const movieNames =
        movie.nameEN.toLowerCase().replace(' ', '') +
        ' ' +
        movie.nameRU.toLowerCase().replace(' ', '');
      const request = query.toLowerCase();

      if (checkbox)
        return movieNames.includes(request) && movie.duration < SHORT_MOVIE;
      return movieNames.includes(request);
    });
  }

  //синхронизируем массивы фильмов с разных серверов
  function sinchronizedMovies(arr1, arr2) {
    const newArr = arr1.reduce((result, movie) => {
      const updatedMovie = arr2.find(
        (savedMovie) => movie.movieId === savedMovie.movieId,
      );
      result.push(updatedMovie ? updatedMovie : movie);
      return result;
    }, []);
    return newArr;
  }

  //получаем 100 фильмов
  function getAllMovies() {
    if (!allMovies) {
      return MoviesApi.getAllFilms().then((movies) =>
        Promise.all(MoviesApi.filterMoviesProps(movies)).then(
          (filteredPropsMovies) => {
            const filteredMovies = sinchronizedMovies(
              filteredPropsMovies,
              savedMovies,
            );
            localStorage.setItem(
              LOCAL_STORAGE_CONFIG.ALL_MOVIES,
              JSON.stringify(filteredMovies),
            );
            return filteredMovies;
          },
        ),
      );
    } else {
      return new Promise((res, err) => res(allMovies));
    }
  }

  //сохраняем запрос инпутов и фильмы в локалСторадж
  function saveMoviesQuery(items, query, checkbox) {
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.QUERY_INPUT,
      JSON.stringify(query),
    );
    localStorage.setItem(
      LOCAL_STORAGE_CONFIG.CHECKBOX_INPUT,
      JSON.stringify(checkbox),
    );
    localStorage.setItem(LOCAL_STORAGE_CONFIG.MOVIES, JSON.stringify(items));
  }

  //сабмит поискового запроса на странице фильмов
  function handleSearchMovies(query, checkbox) {
    if (!query) {
      setMovies([]);
      return setErrorMessage(ERROR.BAD_REQUEST);
    }

    setIsLoading(true);
    getAllMovies()
      .then((films) => {
        setErrorMessage(false);
        const filteredMovies = filterMovies(films, query, checkbox);
        if (filteredMovies.length) {
          saveMoviesQuery(filteredMovies, query, checkbox);
          return setMovies(filteredMovies);
        } else {
          setErrorMessage(ERROR.NOT_FOUND);
          return setMovies([]);
        }
      })
      .catch(() => setErrorMessage(ERROR.SEARCH_MOVIES))
      .finally(() => setIsLoading(false));
  }

  //сабмит поискового запроса на странице сохраненных фильмов
  function handleSearchSavedMovies(query, checkbox) {
    if (!query) {
      setSavedMovies([]);
      return setErrorMessage(ERROR.BAD_REQUEST);
    }

    setIsLoading(true);
    MainApi.getSavedMovies()
      .then((films) => {
        setErrorMessage(false);
        const filteredMovies = filterMovies(films, query, checkbox);
        if (filteredMovies.length) return setSavedMovies(filteredMovies);
        setErrorMessage(ERROR.NOT_FOUND);
        return setSavedMovies([]);
      })
      .catch(() => setErrorMessage(ERROR.SEARCH_MOVIES))
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {showHeader && (
          <Header loggedIn={loggedIn} handleOpenSideBar={handleOpenSideBar} />
        )}
        <Routes>
          <Route exact path={ENDPOINT.MAIN} Component={Main} />
          <Route
            path={ENDPOINT.MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                children={
                  <Movies
                    movies={movies}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    handleSaveMovie={handleSaveMovie}
                    handleUnsaveMovie={handleUnsaveMovie}
                    handleSearchMovies={handleSearchMovies}
                  />
                }
              />
            }
          />
          <Route
            path={ENDPOINT.SAVED_MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                children={
                  <SavedMovies
                    savedMovies={savedMovies}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    handleUnsaveMovie={handleUnsaveMovie}
                    handleSearchSavedMovies={handleSearchSavedMovies}
                  />
                }
              />
            }
          />
          <Route
            path={ENDPOINT.PROFILE}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                children={
                  <Profile
                    handleSignout={handleSignout}
                    handleUpdateUser={handleUpdateUser}
                  />
                }
              />
            }
          />
          <Route
            path={ENDPOINT.SIGNUP}
            element={
              <ProtectedRoute
                loggedIn={!loggedIn}
                children={
                  <Register
                    handleRegister={handleRegister}
                    isLoading={isLoading}
                  />
                }
              />
            }
          />
          <Route
            path={ENDPOINT.SIGNIN}
            element={
              <ProtectedRoute
                loggedIn={!loggedIn}
                children={
                  <Login handleLogin={handleLogin} isLoading={isLoading} />
                }
              />
            }
          />
          <Route path={ENDPOINT.NOT_FOUND} Component={NotFound} />
          <Route
            path={ENDPOINT.ANY}
            element={<Navigate to={ENDPOINT.NOT_FOUND} replace />}
          />
        </Routes>
        {showFooter && <Footer />}
        <SideBarPopup isOpen={popups.sidebar} onClose={handleCloseAllPopups} />
        <InfoTooltipPopup
          isOpen={popups.infoTooltip}
          onClose={handleCloseAllPopups}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
