import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import useLocationState from '../../../hooks/useLocationState';
import useResaize from '../../../hooks/useResaize';
import { Endpoints } from '../../../utils/constants';
import Hamburger from '../Hamburger/Hamburger';
import Logo from '../../Logo/Logo';

export default function Navigation({ loggedIn, handleOpenSideBar }) {
  const { desktopScreen } = useResaize();
  const { mainRoute } = useLocationState();

  const navLinkClasslist = `navigation__link navigation__link_movies ${
    !mainRoute ? 'navigation__link_black' : ''
  }`;

  const ulClasslist = `navigation__list ${
    loggedIn
      ? desktopScreen
        ? 'navigation__list_auth'
        : 'navigation__list_hamburger'
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
                  <NavLink to={Endpoints.movies} className={navLinkClasslist}>
                    Фильмы
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={Endpoints.savedMovies}
                    className={navLinkClasslist}
                  >
                    Сохранённые фильмы
                  </NavLink>
                </li>
                <li>
                  <Link
                    to={Endpoints.profile}
                    className={`navigation__link navigation__link_account ${
                      !mainRoute ? 'navigation__link_black' : ''
                    }`}
                  >
                    <h2 className='navigation__text'>Аккаунт</h2>
                    <div
                      className={`navigation__logo ${
                        !mainRoute ? 'navigation__logo_grey' : ''
                      }`}
                    />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Hamburger handleOpenSideBar={handleOpenSideBar} />
                </li>
              </>
            )}
          </>
        ) : (
          <>
            <li className='navigation__item navigation__item-register'>
              <Link
                to={Endpoints.signup}
                className='navigation__link navigation__link_sign'
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to={Endpoints.signin}
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
