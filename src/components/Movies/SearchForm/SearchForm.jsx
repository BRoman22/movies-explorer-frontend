import './SearchForm.css';
import useResaize from '../../../hooks/useResaize';

export default function SearchForm() {
  const { mobileScreen } = useResaize();

  return (
    <section className='search-form'>
      <form>
        <fieldset className='search-form__fieldset search-form__fieldset_input'>
          <label aria-label='Поиск фильма' className='search-form__label search-form__label_input'>
            {!mobileScreen && <span className='search-form__logo'></span>}
            <input
              type='text'
              placeholder='Фильм'
              className='search-form__input'
            />
          </label>
          <button aria-label='Найти' className='search-form__button'></button>
        </fieldset>
        <fieldset className='search-form__fieldset search-form__fieldset_checkbox'>
          <label className='search-form__label search-form__label_checkbox'>
            <input type='checkbox' className='search-form__checkbox' />
            <span className='search-form__text'>Короткометражки</span>
          </label>
        </fieldset>
      </form>
    </section>
  );
}
