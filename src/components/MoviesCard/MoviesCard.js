import "./MoviesCard.css";
import { Route } from "react-router-dom";
import { imageURL, hourTime, linkValidate, defaultURL } from "../../utils/constant";


function MoviesCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
  savedMovies
}
) {
  const isSaved = savedMovies.some((item) => item.movieId === movie.id);

  function handleSaveMovie() {
      if (!isSaved) {
          onSaveMovie(movie);
      } else {
          onDeleteMovie(savedMovies.find((item) => item.movieId === movie.id));
      }
  }

  function handleDeleteMovie() {
      onDeleteMovie(movie);
  }

function movieTime(duration) {
    const hours = Math.trunc(duration / hourTime);
    const minutes = duration % hourTime;

    if (hours === 0) {
        return `${minutes}м`;
    } else {
        return `${hours}ч ${minutes}м`;
    }
}

  return (
    <li className="movies__item">
      <a href={linkValidate.test(movie.trailerLink) ? movie.trailerLink : defaultURL || ""} target="_blank" rel="noreferrer">
        <img
          className="movies__image"
          src={movie.image.url ? `${imageURL}/${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className="movies__content">
        <h2 className="movies__name">{movie.nameRU}</h2>
        <p className="movies__duration">{movieTime(movie.duration)}</p>
      </div>

      <div className="movies__buton">
          <Route path="/movies">
              <button
                className={isSaved ? "movies__save_active" : "movies__save"}
                type="button"
                onClick={handleSaveMovie}
                />
          </Route>
          <Route path="/saved-movies">
              <button
                className="movies__delete"
                type="button"
                onClick={handleDeleteMovie}
              />
          </Route>
        </div>
    </li>
  );
}

export default MoviesCard;


