import useFormValidation from '../../hooks/useFormValidation';
import './Register.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

export default function Register() {
  const { inputs, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    resetForm();
  }

  return (
    <main className='register'>
      <Logo />
      <Form
        onSubmit={onSubmit}
        children={
          <>
            <fieldset className='form__fieldset'>
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
              Зарегистрироваться
            </button>
          </>
        }
      />
    </main>
  );
}
