// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList () {
  return (
    <>
      <section className="movies">
        <ul className="movies__list">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
        <button className="movies__button" type="button">Ещё</button>
      </section>
    </>
  )
};

export default MoviesCardList;
