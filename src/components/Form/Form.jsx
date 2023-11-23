import { Link, useLocation } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import './Form.css';
import { routes } from '../../utils/constants';

export default function Form() {
  const registerRoute = useLocation().pathname === routes.signup;
  const { inputs, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    resetForm();
  }

  return (
    <>
      <form autoComplete='off' className='form form_place' onSubmit={onSubmit}>
        <h1 className='form__title'>
          {registerRoute ? 'Добро пожаловать!' : 'Рады видеть!'}
        </h1>
        <fieldset className='form__fieldset'>
          {registerRoute && (
            <label className='form__label'>
              Имя
              <input
                placeholder='Имя'
                required
                minLength={2}
                maxLength={20}
                name='name'
                type='text'
                className='form__input'
                value={inputs.name ?? ''}
                onChange={handleChange}
              />
              <span className='form__error'>{errors.name}</span>
            </label>
          )}
          <label className='form__label'>
            E-mail
            <input
              required
              placeholder='E-mail'
              maxLength={20}
              name='email'
              type='email'
              className='form__input'
              value={inputs.email ?? ''}
              onChange={handleChange}
            />
            <span className='form__error'>{errors.email}</span>
          </label>
          <label className='form__label'>
            Пароль
            <input
              required
              placeholder='Пароль'
              minLength={6}
              maxLength={20}
              type='password'
              name='pass'
              className='form__input'
              value={inputs?.pass ?? ''}
              onChange={handleChange}
            />
            <span className='form__error'>{errors.pass}</span>
          </label>
        </fieldset>
        <button
          type='submit'
          className='form__button form__button_register'
          disabled={!isValid}
        >
          {registerRoute ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      <Link
        className='link'
        to={registerRoute ? routes.signin : routes.signup}
      >
        {registerRoute ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
        <span className='link__text'>
          {registerRoute ? 'Войти' : 'Регистрация'}
        </span>
      </Link>
    </>
  );
}
