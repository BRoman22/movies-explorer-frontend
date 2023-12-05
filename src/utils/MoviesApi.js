import { ApiUrls } from './constants.js';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());

export function getAllFilms() {
  return fetch(`${ApiUrls.beatFilm}/beatfilm-movies`).then(checkResponse);
}

export function filterMoviesProps(items) {
  return items.map((item) => {
    const {
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    } = item;
    const filteredMovies = {
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    };
    filteredMovies.image = `${ApiUrls.beatFilm}${item.image.url}`;
    filteredMovies.movieId = item.id;
    filteredMovies.thumbnail = `${ApiUrls.beatFilm}${item.image.formats.thumbnail.url}`;
    return filteredMovies;
  });
}
