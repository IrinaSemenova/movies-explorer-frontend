import {useState} from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function Navigation ({isLoggedIn}) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const location = useLocation().pathname;

  function handleClickOpenBurgerMenu() {
    setIsBurgerOpen(true);
  }

  function handleClickCloseBurgerMenu() {
    setIsBurgerOpen(false);
  }

  return (

       <div className="navigation">
       {isLoggedIn ? (
                <>
          <nav className="navigation__menu">
            <NavLink
                to="/movies"
                className={location === "/movies" ?
                "navigation__link_active navigation__link_type_movies" :
                "navigation__link navigation__link_type_movies"}
                >
                  Фильмы
                </NavLink>
           <NavLink
                to="/saved-movies"
                className={location === "/saved-movies" ?
                "navigation__link_active navigation__link_type_saved-movies" :
                "navigation__link navigation__link_type_saved-movies"}
                >
                  Сохранённые фильмы
                </NavLink>
          </nav>
          <div className="navigation__account">
            <NavLink
                to="/profile"
                className={location === "/profile" ?
                "navigation__link_active navigation__link_type_profile" :
                "navigation__link navigation__link_type_profile"}
                >
                  Аккаунт
                </NavLink>
          <div className="navigation__icon" />
          </div>
          <button
              className="navigation__burger-icon"
              type="button"
              onClick={handleClickOpenBurgerMenu}>
          </button>

          <BurgerMenu
                  isBurgerOpen={isBurgerOpen}
                  onClose={handleClickCloseBurgerMenu}
          />
          </>
          ):(
          <>
          <div className="header__menu">
            <NavLink className="header__link" to="/signup">Регистрация</NavLink>
              <NavLink to="/signin">
                  <button className="header__button">Войти</button>
              </NavLink>
          </div>
          </>
          )
       }
      </div>

  )
  }

export default Navigation;
