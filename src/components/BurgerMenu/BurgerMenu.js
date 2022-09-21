import React from "react";
import "./BurgerMenu.css";
import { Link, useRouteMatch } from "react-router-dom";

function BurgerMenu({isBurgerOpen, onClose}) {
  const routeMatch = useRouteMatch();

    return (
      <div className={`burger ${isBurgerOpen === true ? "burger_opened" : ""}`}>
        <div className="burger__overlay">
          <div className="burger__container">
            <button className="burger__close-button" type="button" onClick={onClose}></button>
            <div className="burger__menu">
                <Link to="/" className={routeMatch.path === "/" ? "burger__link_active" : "burger__link"}>Главная</Link>
                <Link to="/movies" className={routeMatch.path === "/movies" ? "burger__link_active" : "burger__link"}>Фильмы</Link>
                <Link to="/saved-movies" className={routeMatch.path === "/saved-movies" ? "burger__link_active" : "burger__link"}>Сохранённые фильмы</Link>
            </div>
            <div className="burger__account">
              <Link to="/profile" className="burger__link burger__link_type_profile">Аккаунт</Link>
              <div className="burger__icon" />
            </div>
          </div>
        </div>
      </div>
    )
}

export default BurgerMenu;
