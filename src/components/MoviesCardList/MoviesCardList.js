// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route } from "react-router-dom";


import {
    SCREEN_WIDTH_1101,
    SCREEN_WIDTH_625,
    SCREEN_WIDTH_320,
    ADD_MOVIES_MAX,
    ADD_MOVIES_MIN,
    MOVIES_AMOUNT_1101,
    MOVIES_AMOUNT_625,
    MOVIES_AMOUNT_320,
} from "../../utils/constant";

function MoviesCardList ({
  foundMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) {

  const [moviesCard, setMoviesCard] = useState(() => {
    const windowSize = window.innerWidth;
    if (windowSize >= SCREEN_WIDTH_1101) {
       return MOVIES_AMOUNT_1101; // 12 по 3
    } else if (windowSize >= SCREEN_WIDTH_625) {
       return MOVIES_AMOUNT_625; // 8 по 2
    } else if (windowSize >= SCREEN_WIDTH_320) {
      return MOVIES_AMOUNT_320; // 5 по 1
    }
  });

  const displayedMovies = foundMovies.slice(0, moviesCard);

  const [addMovies, setAddMovies] = useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize >= SCREEN_WIDTH_1101) {
        return ADD_MOVIES_MAX; // + 3
    } else if(windowSize >= SCREEN_WIDTH_625) {
        return ADD_MOVIES_MIN; // + 2
    } else if(windowSize >= SCREEN_WIDTH_320) {
        return ADD_MOVIES_MIN; // +2
    }
  });

  function handleScreen () {
    const windowSize = window.innerWidth;
    if (windowSize >= SCREEN_WIDTH_1101) {
      setMoviesCard(MOVIES_AMOUNT_1101);
    } else if (windowSize >= SCREEN_WIDTH_625) {
      setMoviesCard(MOVIES_AMOUNT_625);
    } else if (windowSize >= SCREEN_WIDTH_320) {
      setMoviesCard(MOVIES_AMOUNT_320);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreen);
  }, []);

  function handleAddButtonClick() {
          setMoviesCard(prevState => {return prevState + addMovies});
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

