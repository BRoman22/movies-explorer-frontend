import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';

export default function Movies({
  movies,
  isLoading,
  errorMessage,
  handleSaveMovie,
  handleUnsaveMovie,
  handleSearchMovies,
}) {
  return (
    <main className='movies'>
      <SearchForm handleSearchMovies={handleSearchMovies} />
      {errorMessage && <p className='movies__error'>{errorMessage}</p>}
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          handleSaveMovie={handleSaveMovie}
          handleUnsaveMovie={handleUnsaveMovie}
        />
      )}
    </main>
  );
}
