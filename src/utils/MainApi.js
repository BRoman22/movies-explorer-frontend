import { ApiUrls } from './constants.js';

const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

const request = (path, method, data) =>
  fetch(`${ApiUrls.baseUrl}/${path}`, {
    method: method,
    credentials: 'include',
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

//movie
export const getSavedMovies = () => request('movies');

export const saveMovie = (data) => request('movies', 'POST', data);

export const unSaveMovie = (id) => request(`movies/${id}`, 'DELETE');

//user
export const getUserInfo = () => request('users/me');

export const updateUserInfo = (data) => request('users/me', 'PATCH', data);

//auth
export const register = (data) => request('signup', 'POST', data);

export const login = (data) => request('signin', 'POST', data);

export const logout = () => request('signout', 'POST');
