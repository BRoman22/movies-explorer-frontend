import { useState } from 'react';
import './SearchForm.css';
import useResaize from '../../../hooks/useResaize';
import useLocationState from '../../../hooks/useLocationState';
import { LOCAL_STORAGE_CONFIG } from '../../../utils/constants';

export default function SearchForm({
  handleSearchMovies,
  handleSearchSavedMovies,
  isLoading,
}) {
  const { mobileScreen } = useResaize();
  const { moviesRoute } = useLocationState();

  const [queryInput, setQueryInput] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.QUERY_INPUT)) &&
      moviesRoute
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.QUERY_INPUT))
      : null,
  );

  const [checkboxInput, setCheckboxInput] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.CHECKBOX_INPUT)) &&
      moviesRoute
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONFIG.CHECKBOX_INPUT))
      : false,
  );

  function handleQueryChannge(e) {
    setQueryInput(e.target.value);
  }

  function handleCheckboxChange(e) {
    setCheckboxInput(e.target.checked);
    if (moviesRoute) {
      return handleSearchMovies(queryInput, e.target.checked);
    }
    return handleSearchSavedMovies(queryInput, e.target.checked);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (moviesRoute) {
      return handleSearchMovies(queryInput, checkboxInput);
    }
    return handleSearchSavedMovies(queryInput, checkboxInput);
  }

  return (
    <section className='search-form'>
      <form onSubmit={onSubmit}>
        <fieldset className='search-form__fieldset search-form__fieldset_input'>
          <label
            aria-label='Поиск фильма'
            className='search-form__label search-form__label_input'
          >
            {!mobileScreen && <span className='search-form__logo'></span>}
            <input
              autoComplete='off'
              name='query'
              type='text'
              placeholder='Фильм'
              className='search-form__input'
              value={queryInput ?? ''}
              onChange={handleQueryChannge}
              disabled={isLoading}
            />
          </label>
          <button
            type='submit'
            aria-label='Найти'
            className='search-form__button'
            disabled={isLoading}
          />
        </fieldset>
        <fieldset className='search-form__fieldset search-form__fieldset_checkbox'>
          <label className='search-form__label search-form__label_checkbox'>
            <input
              name='checkbox'
              type='checkbox'
              className='search-form__checkbox'
              checked={checkboxInput ?? ''}
              onChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <span className='search-form__text'>Короткометражки</span>
          </label>
        </fieldset>
      </form>
    </section>
  );
}
