import { BASE_URL } from "./constant";
import {linkValidate, defaultURL, imageURL} from "./constant"

export const response = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(response);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(response);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

  }).then(response);
};

export const editUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),

  }).then(response);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response);
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then(response)
    .then(data => data)
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      credentials: "include",
  })
      .then(response);
}

export const createMovie = (movie) => {
        return fetch(`${BASE_URL}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                country: movie.country || "",
                director: movie.director || "",
                duration: movie.duration || "",
                year: movie.year|| "",
                description: movie.description || "",
                image: `${imageURL}${movie.image.url}`,
                trailerLink: linkValidate.test(movie.trailerLink) ? movie.trailerLink : defaultURL || "",
                thumbnail: `${imageURL}${movie.image.url}`,
                movieId: movie._id ? movie.movieId : movie.id,
                nameRU: movie.nameRU || movie.nameEN,
                nameEN: movie.nameEN || movie.nameRU,
            })
        })
            .then(response);
    }

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      },
      credentials: "include",
  })
      .then(response);
}



