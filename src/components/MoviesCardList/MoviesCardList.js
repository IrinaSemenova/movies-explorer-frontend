// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route } from "react-router-dom";


import {
    SCREEN_WIDTH_1280,
    SCREEN_WIDTH_768,
    SCREEN_WIDTH_320,
    ADD_MOVIES_MAX,
    ADD_MOVIES_MIN,
    MOVIES_AMOUNT_1280,
    MOVIES_AMOUNT_768,
    MOVIES_AMOUNT_320,
} from "../../utils/constant";

function MoviesCardList ({
  foundMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) {
  const [windowSize, setWindowSize] = useState(SCREEN_WIDTH_1280);
  const [moviesCard, setMoviesCard] = useState(12);
  const [displayedMovies, setDisplayedMovies] = useState([]);

  useEffect(() => {
    setMovies();
}, [moviesCard]);

  function setMovies() {
    let movies = [];
    foundMovies.forEach((item, i) => {if (i < moviesCard) {movies.push(item)}});
    setDisplayedMovies(movies);
  }

  // Количество найденных фильмов
  function countMovies(count) {
    setMoviesCard(count);
    let movies = [];
    foundMovies.forEach((item, i) => {if (i < count) {movies.push(item)}});
    setDisplayedMovies(movies);
  }

  useEffect(() => {
    if (windowSize >= SCREEN_WIDTH_1280) {
      countMovies(MOVIES_AMOUNT_1280);// 12 по 3
  } else if (windowSize >= SCREEN_WIDTH_768) {
      countMovies(MOVIES_AMOUNT_768);// 8 по 2
  } else if (windowSize >= SCREEN_WIDTH_320) {
      countMovies(MOVIES_AMOUNT_320);// 5 по 1
  }
  }, [windowSize, foundMovies]);


  function handleAddButtonClick() {
    if (windowSize >= SCREEN_WIDTH_1280) {
        setMoviesCard(moviesCard + ADD_MOVIES_MAX); // + 3
    } else if (windowSize >= SCREEN_WIDTH_768) {
        setMoviesCard(moviesCard + ADD_MOVIES_MIN); // +2
    } else if (windowSize >= SCREEN_WIDTH_320) {
        setMoviesCard(moviesCard + ADD_MOVIES_MIN); // +2
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);;
  }, [windowSize]);

  function handleResize() {
    setWindowSize(window.innerWidth);
  }

  return (
    <>
      <section className="movies">

        <ul className="movies__list">
          {displayedMovies.map((item) => (
                        <MoviesCard
                        movie={item}
                        key={item.id || item._id}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                        savedMovies={savedMovies}
                        />
                    ))}
        </ul>

        {foundMovies.length !== displayedMovies.length ? (
           <Route path="/movies">
                      <button
                        className="movies__button"
                        type="button"
                        onClick={handleAddButtonClick}
                      >
                        Ещё
                      </button>
           </Route>
        ) : (
            ""
        )}
      </section>
    </>
  )
};
export default MoviesCardList;

