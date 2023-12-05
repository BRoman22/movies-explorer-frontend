import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Preloader from '../Movies/Preloader/Preloader';

export default function SavedMovies({
  savedMovies,
  isLoading,
  errorMessage,
  handleUnsaveMovie,
  handleSearchSavedMovies,
}) {
  return (
    <main className='saved-movies'>
      <SearchForm handleSearchSavedMovies={handleSearchSavedMovies} />
      {errorMessage && <p className='movies__error'>{errorMessage}</p>}
      {isLoading ? (
        <Preloader />
      ) : (
        savedMovies?.length !== 0 && (
          <MoviesCardList
            movies={savedMovies}
            handleUnsaveMovie={handleUnsaveMovie}
          />
        )
      )}
    </main>
  );
}
