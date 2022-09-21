import {useState} from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function Navigation () {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function handleClickOpenBurgerMenu() {
    setIsBurgerOpen(true);
  }

  function handleClickCloseBurgerMenu() {
    setIsBurgerOpen(false);
  }

  return (
    <>
       <div className="navigation">
        <nav className="navigation__menu">
          <Link to="/movies" className="navigation__link navigation__link_type_movies">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__link navigation__link_type_saved-movies">Сохранённые фильмы</Link>
        </nav>
        <div className="navigation__account">
          <Link to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</Link>
          <div className="navigation__icon" />
        </div>
        <>
          <button className="navigation__burger-icon" type="button" onClick={handleClickOpenBurgerMenu}></button>
          <BurgerMenu
                  isBurgerOpen={isBurgerOpen}
                  onClose={handleClickCloseBurgerMenu}
          />
        </>
      </div>
    </>
  )
  }

export default Navigation;
