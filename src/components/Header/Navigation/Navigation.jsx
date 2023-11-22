import { useLocation } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';

import './Navigation.css';
import useResaize from '../../../hooks/useResaize';
import { routes } from '../../../utils/constants';

import Hamburger from '../Hamburger/Hamburger';
import Logo from '../../Logo/Logo';

export default function Navigation({ loggedIn, handleTogglePopup }) {
  const { desktopScreen } = useResaize();
  const notMainRoute = useLocation().pathname !== routes.main;

  const navLinkClasslist = `navigation__link navigation__link_movies ${
    notMainRoute && 'navigation__link_black'
  }`;

  const ulClasslist = `navigation__list ${
    loggedIn ? 
    (desktopScreen ? 'navigation__list_auth' : 'navigation__list_hamburger') 
    : 'navigation__list_no-auth'
  }`;

  return (
    <nav className='navigation'>
      <ul className={ulClasslist}>
        <li>
          <Logo />
        </li>
        {loggedIn ? (
          <>
            {desktopScreen ? (
              <>
                <li className='navigation__item navigation__item-movies'>
                  <NavLink to={routes.movies} className={navLinkClasslist}>
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.savedMovies} className={navLinkClasslist}>
                    Сохранённые фильмы
                  </NavLink>
                </li>
                <li>
                  <Link
                    to={routes.profile}
                    className={`navigation__link navigation__link_account ${
                      notMainRoute && 'navigation__link_black'
                    }`}
                  >
                    <h2 className='navigation__text'>Аккаунт</h2>
                    <div
                      className={`navigation__logo ${
                        notMainRoute && 'navigation__logo_grey'
                      }`}
                    />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Hamburger handleTogglePopup={handleTogglePopup} />
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li className='navigation__item navigation__item-register'>
              <Link
                to={routes.signup}
                className='navigation__link navigation__link_sign'
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={routes.signin}
                className='navigation__link navigation__link_login'
              >
                Войти
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
