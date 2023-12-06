import useFormValidation from '../../hooks/useFormValidation';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ handleSignout, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const {
    inputs,
    setInputs,
    errors,
    isValid,
    handleChange,
    resetSubmitButton,
  } = useFormValidation();
  const inputsValueSameCurrentUserValue =
    inputs?.name === currentUser?.name && inputs?.email === currentUser?.email;

  useEffect(() => {
    setInputs(currentUser);
  }, [currentUser]);

  if (inputsValueSameCurrentUserValue && isValid) {
    resetSubmitButton();
  }

  function toggleShowSubmitButton() {
    setShowSubmitButton(!showSubmitButton);
  }

  function onSubmit(e) {
    const { name, email } = inputs;
    e.preventDefault();
    handleUpdateUser(name, email);
    toggleShowSubmitButton();
  }

  return (
    <main className='profile'>
      <h1 className='profile__title profile__title_place'>
        Привет, {currentUser?.name}!
      </h1>
      <form className='profile__form' onSubmit={onSubmit} autoComplete='off'>
        <fieldset className='profile__fieldset'>
          <label
            className={`profile__label ${
              !showSubmitButton && 'profile__label_disabled'
            }`}
          >
            Имя
            <input
              required
              placeholder='Имя'
              minLength={2}
              maxLength={30}
              name='name'
              type='text'
              className='profile__input'
              value={inputs?.name ?? ''}
              onChange={handleChange}
              disabled={!showSubmitButton}
            />
            <span className='profile__error profile__error_validation'>
              {errors.name}
            </span>
          </label>
        </fieldset>
        <fieldset className='profile__fieldset'>
          <label
            className={`profile__label ${
              !showSubmitButton && 'profile__label_disabled'
            }`}
          >
            E-mail
            <input
              required
              placeholder='E-mail'
              name='email'
              type='email'
              className='profile__input'
              value={inputs?.email ?? ''}
              onChange={handleChange}
              disabled={!showSubmitButton}
            />
            <span className='profile__error profile__error_validation'>
              {errors.email}
            </span>
          </label>
        </fieldset>
        <span className='profile__error profile__error_submit'></span>
        {showSubmitButton && (
          <button
            type='submit'
            className='profile__form-button'
            disabled={!isValid}
          >
            Сохранить
          </button>
        )}
      </form>
      {!showSubmitButton && (
        <div className='profile__container'>
          <button
            type='button'
            className='profile__button profile__button_show-submit-button'
            onClick={toggleShowSubmitButton}
          >
            Редактировать
          </button>
          <button
            type='button'
            className='profile__button profile__button_logout'
            onClick={handleSignout}
          >
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  );
}
