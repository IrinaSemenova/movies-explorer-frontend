//компонент, который отрисовывает шапку сайта на страницу.
import "./Header.css";
import logo from "../../images/logo-main.svg";
import Navigation from "../Navigation/Navigation";
import { Link, useRouteMatch } from "react-router-dom";

function Header ({
  isLoggedIn,
  isMovies,
  isSavedMovies,
  isMain
}) {
  const routeMatch = useRouteMatch();

  return (
    <>
      <header className={routeMatch.path === "/" ? "header" : "header__gray"}>
        <Link to="/">
          <img src={logo} alt="Логотип" className="header__logo"/>
        </Link>
        <Navigation
                isLoggedIn={isLoggedIn}
                isMovies={isMovies}
                isSavedMovies={isSavedMovies}
                isMain={isMain}
        />
      </header>
    </>
  )
}

export default Header;
