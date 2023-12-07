import { API } from './constants.js';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject());

export function getAllFilms() {
  return fetch(`${API.BEATFILM}/beatfilm-movies`).then(checkResponse);
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
    filteredMovies.image = `${API.BEATFILM}${item.image.url}`;
    filteredMovies.movieId = item.id;
    filteredMovies.thumbnail = `${API.BEATFILM}${item.image.formats.thumbnail.url}`;
    return filteredMovies;
  });
}
