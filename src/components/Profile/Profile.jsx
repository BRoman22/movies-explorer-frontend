import useFormValidation from '../../hooks/useFormValidation';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);
  const {
    inputs,
    setInputs,
    errors,
    isValid,
    handleChange,
    resetSubmitButton,
  } = useFormValidation();

  const [showSubmitButton, setShowSubmitButton] = useState(false);
  function toggleShowSubmitButton() {
    setShowSubmitButton(!showSubmitButton);
  }

  useEffect(() => {
    setInputs(currentUser);
  }, [currentUser]);

  const inputsValueSameCurrentUserValue =
    inputs.name === currentUser.name || inputs.email === currentUser.email;
  if (inputsValueSameCurrentUserValue && isValid) {
    resetSubmitButton();
  }

  function onSubmit(e) {
    e.preventDefault();
    toggleShowSubmitButton();
  }

  return (
    <main className='profile'>
      <h2 className='profile__title profile__title_place'>
        Привет, {currentUser.name}!
      </h2>
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
              maxLength={20}
              name='name'
              type='text'
              className='profile__input'
              value={inputs.name ?? ''}
              onChange={handleChange}
              disabled={!showSubmitButton}
            />
            <span className='profile__error profile__error_validation'>
              {errors.name}
            </span>
          </label>
        </fieldset>
        <hr className='line line_profile' />
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
              maxLength={20}
              name='email'
              type='email'
              className='profile__input'
              value={inputs.email ?? ''}
              onChange={handleChange}
              disabled={!showSubmitButton}
            />
            <span className='profile__error profile__error_validation'>
              {errors.email}
            </span>
          </label>
        </fieldset>
        <span className='profile__error profile__error_submit'>
          При обновлении профиля произошла ошибка.
        </span>
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
            className='profile__button profile__button_show-submit-button'
            onClick={toggleShowSubmitButton}
          >
            Редактировать
          </button>
          <button className='profile__button profile__button_logout'>
            Выйти из аккаунта
          </button>
        </div>
      )}
    </main>
  );
}
