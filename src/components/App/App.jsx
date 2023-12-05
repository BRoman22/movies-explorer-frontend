import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import { Endpoints, LsConfig, Errors, ShortMovie } from '../../utils/constants';
import useLocationState from '../../hooks/useLocationState';
import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';
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
  const { showHeader, showFooter, location, moviesRoute } = useLocationState();
  const login = JSON.parse(localStorage.getItem(LsConfig.login));
  const [loggedIn, setLoggedIn] = useState(login);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const allMovies = JSON.parse(localStorage.getItem(LsConfig.allMovies));
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  //logged
  function toggleLoggedIn() {
    setLoggedIn(!loggedIn);
    localStorage.setItem(LsConfig.login, JSON.stringify(!login));
  }

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then(setCurrentUser)
        .catch(() => showError(Errors.InternalServerError));

      MainApi.getSavedMovies()
        .then(setSavedMovies)
        .catch(() => showError(Errors.InternalServerError));
    }
  }, [loggedIn]);

  //устанавливаем фильмы из последнего запроса
  useEffect(() => {
    if (moviesRoute) {
      setMovies(
        JSON.parse(localStorage.getItem(LsConfig.movies))
          ? JSON.parse(localStorage.getItem(LsConfig.movies))
          : [],
      );
    }
  }, [moviesRoute]);

  //auth
  function handleRegister(name, email, password) {
    MainApi.register({ name, email, password })
      .then(() => handleLogin(email, password))
      .catch((err) => {
        if (err.status === 409) {
          return showError(Errors.conflict);
        }
        return showError(Errors.register);
      });
  }

  function handleLogin(email, password) {
    MainApi.login({ email, password })
      .then(() => {
        toggleLoggedIn();
        navigate(Endpoints.movies, { replace: true });
      })
      .catch((err) => {
        if (err.status === 401) {
          return showError(Errors.login);
        }
        return showError(Errors.InternalServerError);
      });
  }

  function handleSignout() {
    MainApi.logout()
      .then(() => {
        localStorage.clear();
        setMovies([]);
        setSavedMovies([]);
        toggleLoggedIn();
      })
      .catch(() => showError(Errors.InternalServerError));
  }

  //при смене страницы, стираем ошибку
  useEffect(() => {
    setErrorMessage(false);
  }, [location]);

  //показываем ошибку в попапе
  function showError(err) {
    setPopups({ ...popups, infoTooltip: true });
    setErrorMessage(err);
  }

  //апдейт массивов фильмов
  function updateMovies(item) {
    function changeItemInArr(arr, film) {
      return arr.map((movie) =>
        movie.movieId === film.movieId ? film : movie,
      );
    }

    localStorage.setItem(
      LsConfig.allMovies,
      JSON.stringify(changeItemInArr(allMovies, item)),
    );

    localStorage.setItem(
      LsConfig.movies,
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
      .catch(() => showError(Errors.InternalServerError));
  }

  //сохраняем фильм
  function handleSaveMovie(item) {
    MainApi.saveMovie(item)
      .then((movie) => {
        updateMovies(movie);

        setSavedMovies([...savedMovies, movie]);
      })
      .catch(() => showError(Errors.InternalServerError));
  }

  //обновляем профиль юзера
  function handleUpdateUser(name, email) {
    MainApi.updateUserInfo({ name, email })
      .then(setCurrentUser)
      .catch(() => showError(Errors.updateProfile));
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
        return movieNames.includes(request) && movie.duration < ShortMovie;
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
      setIsLoading(true);
      return MoviesApi.getAllFilms().then((movies) =>
        Promise.all(MoviesApi.filterMoviesProps(movies)).then(
          (filteredPropsMovies) => {
            const filteredMovies = sinchronizedMovies(
              filteredPropsMovies,
              savedMovies,
            );
            localStorage.setItem(
              LsConfig.allMovies,
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

  //сохраняем запрос инпутов в локалСторадж
  function saveMoviesQuery(items, query, checkbox) {
    localStorage.setItem(LsConfig.queryInput, JSON.stringify(query));
    localStorage.setItem(LsConfig.checkboxInput, JSON.stringify(checkbox));
    localStorage.setItem(LsConfig.movies, JSON.stringify(items));
  }

  //сабмит поискового запроса на странице фильмов
  function handleSearchMovies(query, checkbox) {
    setErrorMessage(false);
    if (!query) {
      setMovies([]);
      return setErrorMessage(Errors.badRequest);
    }

    getAllMovies()
      .then((films) => {
        const filteredMovies = filterMovies(films, query, checkbox);
        if (filteredMovies.length) {
          saveMoviesQuery(filteredMovies, query, checkbox);
          return setMovies(filteredMovies);
        } else {
          setErrorMessage(Errors.notFound);
          return setMovies([]);
        }
      })
      .catch(() => setErrorMessage(Errors.searchMovie))
      .finally(() => setIsLoading(false));
  }

  //сабмит поискового запроса на странице сохраненных фильмов
  function handleSearchSavedMovies(query, checkbox) {
    setErrorMessage(false);
    if (!query) {
      setSavedMovies([]);
      return setErrorMessage(Errors.badRequest);
    }

    setIsLoading(true);
    MainApi.getSavedMovies()
      .then((movies) => {
        const filteredMovies = filterMovies(movies, query, checkbox);
        if (filteredMovies.length) return setSavedMovies(filteredMovies);
        setErrorMessage(Errors.notFound);
        return setSavedMovies([]);
      })
      .catch(() => {
        setErrorMessage(Errors.searchMovie);
        setMovies([]);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {showHeader && (
          <Header loggedIn={loggedIn} handleOpenSideBar={handleOpenSideBar} />
        )}
        <Routes>
          <Route exact path={Endpoints.main} Component={Main} />
          <Route
            path={Endpoints.movies}
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
            path={Endpoints.savedMovies}
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
            path={Endpoints.profile}
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
            path={Endpoints.signup}
            element={
              <ProtectedRoute
                loggedIn={!loggedIn}
                children={<Register handleRegister={handleRegister} />}
              />
            }
          />
          <Route
            path={Endpoints.signin}
            element={
              <ProtectedRoute
                loggedIn={!loggedIn}
                children={<Login handleLogin={handleLogin} />}
              />
            }
          />
          <Route path={Endpoints.notFound} Component={NotFound} />
          <Route
            path={Endpoints.any}
            element={<Navigate to={Endpoints.notFound} replace />}
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
