import useAmountMovies from '../../../hooks/useAmoutMovies';
import useLocationState from '../../../hooks/useLocationState';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  handleSaveMovie,
  handleUnsaveMovie,
}) {
  const { moviesRoute } = useLocationState();
  const { showMoreButton, showAmountMovies, showMoreMoviesHandler } =
    useAmountMovies(movies);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__cards-list'>
        {showAmountMovies()?.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            handleSaveMovie={handleSaveMovie}
            handleUnsaveMovie={handleUnsaveMovie}
          />
        ))}
      </ul>
      {moviesRoute && showMoreButton && (
        <button
          type='button'
          className='movies-card-list__more-button movies-card-list__more-button_place'
          onClick={showMoreMoviesHandler}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
