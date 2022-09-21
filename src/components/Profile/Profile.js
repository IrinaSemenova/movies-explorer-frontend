import "./Profile.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import {useState} from "react";

function Profile (props) {
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  function handleEditProfileClick(e) {
      e.preventDefault();
      setIsFormDisabled(false);
  }

  return (
    <>
        <Header />
        <section className="profile">
          <h1 className="profile__title">Привет!</h1>
          <form className="profile__form" name="profile" id="profile">
              <div className="profile__section">
                <label className="profile__label">Имя</label>
                <input className="profile__input profile__input_name"
                      id="name"
                      name="name"
                      type="text"
                      minLength="2"
                      maxLength="30"
                      pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                      required
                      disabled={isFormDisabled}
                      />
              </div>
              <span className="profile__error">Ошибка...</span>
              <div className="profile__line" />
              <div className="profile__section">
                <label className="profile__label">E-mail</label>
                <input className="profile__input profile__input_email"
                      id="email"
                      name="email"
                      type="email"
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                      required
                      disabled={isFormDisabled}/>
              </div>
              <span className="profile__error">Ошибка...</span>
          </form>
          <div className="profile__button">
            <span className={isFormDisabled ? "profile__error_update_nonactive" : "profile__error_update"}>При обновлении профиля произошла ошибка.</span>

            {isFormDisabled ? <button className="profile__edit" type="button" onClick={handleEditProfileClick}>Редактировать</button> :
            <button className="profile__submit" type="submit" >Сохранить</button>}

            <Link to="/signup" className={isFormDisabled ? "profile__logout" : "profile__logout_nonactive"}>Выйти из аккаунта</Link>
          </div>
        </section>
    </>
  )
  }

export default Profile;
