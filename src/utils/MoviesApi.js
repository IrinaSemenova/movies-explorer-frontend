import { MOVIE_API_URL } from "./constant";

class MovieApi {
  constructor(options) {
      this._url =  options.url;
      this._headers = options.headers;
  }
    _response(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }
  getListCards() {
    return fetch(this._url, {
      method: "GET",
    })
    .then(this._response);
  }

}

const api = new MovieApi(MOVIE_API_URL);
export default api;
