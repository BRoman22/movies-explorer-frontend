import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

export default function SavedMovies() {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}
