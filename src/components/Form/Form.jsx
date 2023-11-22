import { Link, useLocation } from 'react-router-dom';
import './Form.css';
import { routes } from '../../utils/constants';

export default function Form({ onSubmit, children }) {
  const registerRoute = useLocation().pathname === routes.signup;

  return (
    <>
      <form autoComplete='off' className='form form_place' onSubmit={onSubmit}>
        <h2 className='form__title'>
          {registerRoute ? 'Добро пожаловать!' : 'Рады видеть!'}
        </h2>
        {children}
      </form>
      <Link
        className='form__link'
        to={registerRoute ? routes.signin : routes.signup}
      >
        {registerRoute ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
        <span className='form__text'>
          {registerRoute ? 'Войти' : 'Регистрация'}
        </span>
      </Link>
    </>
  );
}
