import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CurrentMovieContext } from '../../contexts/CurrentMovieContext';

import './App.css';
import { routes, ShowHeader, ShowFooter } from '../../utils/constants';
//времянка для верстки
import { userInfo } from '../../utils/userInfo';
import { movies } from '../../utils/movies';
//

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
import Popup from '../Popup/Popup';

export default function App() {
  const [currentUser, setCurrentUser] = useState(userInfo);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  function handleTogglePopup() {
    setIsOpen(!isOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentMovieContext.Provider value={movies}>
        <div className='page'>
          {ShowHeader() && (
            <Header loggedIn={loggedIn} handleTogglePopup={handleTogglePopup} />
          )}
          <Routes>
            <Route exact path={routes.main} Component={Main} />
            <Route
              path={routes.movies}
              element={
                <ProtectedRoute loggedIn={loggedIn} children={<Movies />} />
              }
            />
            <Route
              path={routes.savedMovies}
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  children={<SavedMovies />}
                />
              }
            />
            <Route
              path={routes.profile}
              element={
                <ProtectedRoute loggedIn={loggedIn} children={<Profile />} />
              }
            />
            <Route
              path={routes.signup}
              element={
                <ProtectedRoute loggedIn={!loggedIn} children={<Register />} />
              }
            />
            <Route
              path={routes.signin}
              element={
                <ProtectedRoute loggedIn={!loggedIn} children={<Login />} />
              }
            />
            <Route path={routes.notFound} Component={NotFound} />
            <Route
              path={routes.any}
              element={<Navigate to={routes.notFound} replace />}
            />
          </Routes>
          {ShowFooter() && <Footer />}
          <Popup isOpen={isOpen} handleTogglePopup={handleTogglePopup} />
        </div>
      </CurrentMovieContext.Provider>
    </CurrentUserContext.Provider>
  );
}
