import useFormValidation from '../../hooks/useFormValidation';
import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

export default function Login() {
  const { inputs, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    resetForm();
  }

  return (
    <main className='login'>
      <Logo />
      <Form onSubmit={onSubmit}>
        <fieldset className='form__fieldset'>
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
          className='form__button form__button_login'
          disabled={!isValid}
        >
          Войти
        </button>
      </Form>
    </main>
  );
}
