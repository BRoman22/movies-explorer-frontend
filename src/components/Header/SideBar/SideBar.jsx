import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { routes } from '../../../utils/constants';

export default function SideBar({ isOpen, handleTogglePopup }) {
  return (
    <div className={`sidebar ${isOpen && 'sidebar_opened'}`}>
      <button
        type='button'
        aria-label='Закрыть'
        className='sidebar__close'
        onClick={handleTogglePopup}
      />
      <nav>
        <ul className='sidebar__list'>
          <li>
            <NavLink
              className='sidebar__link'
              to={routes.main}
              onClick={handleTogglePopup}
            >
              Главная
            </NavLink>
          </li>
          <li className='sidebar__item'>
            <NavLink
              className='sidebar__link'
              to={routes.movies}
              onClick={handleTogglePopup}
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className='sidebar__link'
              to={routes.savedMovies}
              onClick={handleTogglePopup}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='sidebar__account'>
            <NavLink
              className='sidebar__link sidebar__link_account'
              to={routes.profile}
              onClick={handleTogglePopup}
            >
              <h2 className='sidebar__text'>Аккаунт</h2>
              <div className='sidebar__logo' />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
