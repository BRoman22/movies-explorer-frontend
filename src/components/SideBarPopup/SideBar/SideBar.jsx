import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { ENDPOINT } from '../../../utils/constants';

export default function SideBar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen && 'sidebar_opened'}`}>
      <button
        type='button'
        aria-label='Закрыть'
        className='sidebar__close'
        onClick={onClose}
      />
      <nav>
        <ul className='sidebar__list'>
          <li>
            <NavLink
              className='sidebar__link'
              to={ENDPOINT.MAIN}
              onClick={onClose}
            >
              Главная
            </NavLink>
          </li>
          <li className='sidebar__item'>
            <NavLink
              className='sidebar__link'
              to={ENDPOINT.MOVIES}
              onClick={onClose}
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className='sidebar__link'
              to={ENDPOINT.SAVED_MOVIES}
              onClick={onClose}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='sidebar__account'>
            <NavLink
              className='sidebar__link sidebar__link_account'
              to={ENDPOINT.PROFILE}
              onClick={onClose}
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
