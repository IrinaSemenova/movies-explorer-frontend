import { MOVIE_API_URL } from "./constant";

export const response = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getAllMovies = () => {
  return fetch(`${MOVIE_API_URL}/beatfilm-movies`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response)

}
