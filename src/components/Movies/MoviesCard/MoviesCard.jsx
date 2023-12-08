import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useContext } from 'react';
import './MoviesCard.css';
import useLocationState from '../../../hooks/useLocationState';

export default function MoviesCard({
  movie,
  handleSaveMovie,
  handleUnsaveMovie,
}) {
  const { savedMoviesRoute } = useLocationState();
  const currentUser = useContext(CurrentUserContext);
  const isSaved = typeof movie?.owner === 'string' && typeof currentUser?._id === 'string';

  const saveButtonClass = `movies-card__button ${
    savedMoviesRoute
      ? 'movies-card__button_delete-icon'
      : isSaved && 'movies-card__button_saved-icon'
  }`;

  function toggleSavedMovie() {
    if (isSaved) return handleUnsaveMovie(movie);
    return handleSaveMovie(movie);
  }

  function getTime() {
    const { duration } = movie;
    const m = duration % 60;
    const h = (duration - m) / 60;
    if (h < 1) return `${m}м`;
    if (m === 0) return `${h}ч`;
    return `${h}ч ${m}м`;
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__container'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <span className='movies-card__subtitle'>{getTime()}</span>
        <button
          type='button'
          aria-label='Сохранить'
          className={saveButtonClass}
          onClick={toggleSavedMovie}
        ></button>
      </div>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img
          src={movie.image}
          alt={movie.nameRU}
          className='movies-card__image'
        />
      </a>
    </li>
  );
}
