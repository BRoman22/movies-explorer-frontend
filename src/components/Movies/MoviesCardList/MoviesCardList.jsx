import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentMovieContext } from '../../../contexts/CurrentMovieContext';
import useResaize from '../../../hooks/useResaize';
import './MoviesCardList.css';
import { routes } from '../../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  const { desktopScreen, mobileScreen } = useResaize();
  const showMoreButton = useLocation().pathname === routes.movies;
  const movies = useContext(CurrentMovieContext);

  function showCountFromScreen(items) {
    if (!showMoreButton) return items.slice(0, 3); //времянка для saved-movies
    if (desktopScreen) return items.slice(0, 12);
    if (mobileScreen) return items.slice(0, 5);
    return items.slice(0, 8);
  }

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__cards-list'>
        {showCountFromScreen(movies)?.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
      {showMoreButton && (
        <button className='movies-card-list__more-button movies-card-list__more-button_place'>
          Ещё
        </button>
      )}
    </section>
  );
}
