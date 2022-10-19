// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route } from "react-router-dom";


import {
    SCREEN_WIDTH_1280,
    SCREEN_WIDTH_1101,
    SCREEN_WIDTH_625,
    SCREEN_WIDTH_320,
    ADD_MOVIES_MAX,
    ADD_MOVIES_MIN,
    MOVIES_AMOUNT_1101,
    MOVIES_AMOUNT_625,
    MOVIES_AMOUNT_320,
    MOVIES_AMOUNT_DEF,
} from "../../utils/constant";

function MoviesCardList ({
  foundMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) {

    const [maxMovies, setmaxMovies] = useState(MOVIES_AMOUNT_DEF);
    const [movieDisplay, setMovieDisplay] = useState([]);
    const [screenWidth, setScreenWidth] = useState(SCREEN_WIDTH_1280);

    useEffect(() => {
      let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < maxMovies) {
                movies.push(item);
            }
        });
        setMovieDisplay(movies);
  }, [maxMovies]);

      useEffect(() => {
        if (screenWidth >= SCREEN_WIDTH_1101) {
          setFoundMovies(MOVIES_AMOUNT_1101); // 1280px — 12 по 3
      } else if (screenWidth >= SCREEN_WIDTH_625) {
          setFoundMovies(MOVIES_AMOUNT_625); // 768px — 8 по 2
      } else if (screenWidth >= SCREEN_WIDTH_320) {
          setFoundMovies(MOVIES_AMOUNT_320); // 320px - 480px — 5 по 1
      }
      }, [screenWidth, foundMovies]);


    useEffect(() => {
      window.addEventListener("resize", setScreenWidth(window.innerWidth));
        return () => window.removeEventListener("resize", setScreenWidth(window.innerWidth));;
    }, [screenWidth ]);

    function setFoundMovies(count) {
        setmaxMovies(count);
        let movies = [];
        foundMovies.forEach((item, i) => {
          if (i < count) { movies.push(item) }
        });
        setMovieDisplay(movies);
    }

    function handleAddButtonClick() {
        if (screenWidth >= SCREEN_WIDTH_1101) {
            setmaxMovies(maxMovies + ADD_MOVIES_MAX); // // 1280px — 12 по 3 + 3
        } else if (screenWidth >= SCREEN_WIDTH_625) {
            setmaxMovies(maxMovies + ADD_MOVIES_MIN); //// 768px — 8 по 2 + 2
        } else if (screenWidth >= SCREEN_WIDTH_320) {
            setmaxMovies(maxMovies + ADD_MOVIES_MIN); // 320px - 480px — 5 по 1 + 2
        }
    }

  return (
    <>
      <section className="movies">

        <ul className="movies__list">
          {movieDisplay.map((item) => (
                        <MoviesCard
                        movie={item}
                        key={item.id || item._id}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
                        savedMovies={savedMovies}
                        />
                    ))}
        </ul>

        {foundMovies.length !== movieDisplay.length ? (
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

