import { BASE_URL } from "./constant";

const response = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  }).then(response);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
  })
    .then(response);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  })
  .then(response);
}

export const editUserInfo = (token, name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
       Authorization: `Bearer ${token}`,
     },
    credentials: "include",
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then(this._response);
}

export const saveMovie = (token, movie) => {
  return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        ...headers,
         Authorization: `Bearer ${token}`,
       },
      credentials: "include",
      body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: "https://api.nomoreparties.co/" + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.movieId,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
      })
  })
      .then(res => res.json())
      .then(data => data)
}

export const getSavedMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
     ...headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then(response)
    .then(data => data)
};

export const deleteMovie = (token, movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        ...headers,
         Authorization: `Bearer ${token}`,
       },
      credentials: "include",
  })
      .then(res => res.json())
      .then(data => data)
}
