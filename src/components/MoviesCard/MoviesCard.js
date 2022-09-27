import "./MoviesCard.css";
import moviepic from "../../images/pic.svg";
import { useRouteMatch } from "react-router-dom";

function MoviesCard() {
  const routeMatch = useRouteMatch();

  return (
    <li className="movies__item">
      <img className="movies__image" src={moviepic} alt="Обложка фильма"/>
      <div className="movies__content">
        <h2 className="movies__name">33 слова о дизайне 33 слова о дизайне</h2>
        <p className="movies__duration">1ч 47м</p>
      </div>
        <button className={routeMatch.path === "/movies" ? "movies__save" : "movies__delete"} type="button" />

    </li>
  );
}

export default MoviesCard;
