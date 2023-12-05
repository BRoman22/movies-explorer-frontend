import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import useLocationState from '../../hooks/useLocationState';
import './Form.css';
import { Endpoints } from '../../utils/constants';

export default function Form({ handleRegister, handleLogin }) {
  const { registerRoute } = useLocationState();
  const { inputs, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    resetForm();
    const { name, email, password } = inputs;
    if (registerRoute) {
      handleRegister(name, email, password);
    } else {
      handleLogin(email, password);
    }
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
                maxLength={30}
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
              name='password'
              className='form__input'
              value={inputs?.password ?? ''}
              onChange={handleChange}
            />
            <span className='form__error'>{errors.password}</span>
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
        to={registerRoute ? Endpoints.signin : Endpoints.signup}
      >
        {registerRoute ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
        <span className='link__text'>
          {registerRoute ? 'Войти' : 'Регистрация'}
        </span>
      </Link>
    </>
  );
}
