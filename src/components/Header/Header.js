//компонент, который отрисовывает шапку сайта на страницу.
import "./Header.css";
import logo from "../../images/logo-main.svg";
import Navigation from "../Navigation/Navigation";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

function Header () {
  const routeMatch = useRouteMatch();

  return (
    <>
      <header className={routeMatch.path === "/" ? "header" : "header__gray"}>
        <Link to='/'>
          <img src={logo} alt="Логотип" className="header__logo"/>
        </Link>
        <Switch>
                <Route exact path="/">
                    <div className="header__menu">
                      <Link className="header__link" to="/signup">Регистрация</Link>
                      <Link to="/signin">
                        <button className="header__button">Войти</button>
                      </Link>
                    </div>
                </Route>
                <Route path="/movies">
                    <Navigation />
                </Route>
                <Route path="/saved-movies">
                    <Navigation />
                </Route>
                <Route path="/profile">
                    <Navigation />
                </Route>
        </Switch>
      </header>
    </>
  )
}

export default Header;
