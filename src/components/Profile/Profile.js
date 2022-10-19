import "./Profile.css";
import Header from "../Header/Header";
import {useEffect, useContext, useState} from "react";
import Validation from "../../utils/Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile ({
  handleUpdateUser,
  onLogout,
  isError,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const { values, handleChange, errors, isValid, setValues } = Validation();

  useEffect(() => {
    setValues({ "name": currentUser.name, "email": currentUser.email });
  }, [setValues, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleUpdateUser(values);
    if (!errors) {
      setIsFormDisabled(true);
    } else {
      setIsFormDisabled(false);
    }
  }

  function handleEditProfileClick(e) {
      e.preventDefault();
      setIsFormDisabled(false);
  }

  function handleCLickLogout () {
    onLogout();
  };

  const isValueSameAsWas = values.name === currentUser.name && values.email === currentUser.email;

  return (
    <>
        <Header isLoggedIn={true}/>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" name="profile" id="profile" onSubmit={handleSubmit}>
              <div className="profile__section">
                <label className="profile__label">Имя</label>
                <input className="profile__input profile__input_name"
                      id="name"
                      name="name"
                      type="text"
                      minLength="2"
                      maxLength="30"
                      pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                      onChange={handleChange}
                      value={values.name || ""}
                      required
                      disabled={isFormDisabled}
                      />
              </div>
              <span className="profile__error">{errors.name}</span>
              <div className="profile__line" />
              <div className="profile__section">
                <label className="profile__label">E-mail</label>
                <input className="profile__input profile__input_email"
                      id="email"
                      name="email"
                      type="email"
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                      onChange={handleChange}
                      value={values.email || ""}
                      required
                      disabled={isFormDisabled}
                      />
              </div>
              <span className="profile__error">{errors.email}</span>


          {values.name === currentUser.name && values.email === currentUser.email ? (
            <div className="profile__button">
                  <button
                    className={`profile__edit ${
                      isFormDisabled ? "" : "profile__edit-btn_error"
                    }`}
                    type="button"
                    onClick={handleEditProfileClick}>
                      Редактировать
                  </button>
              </div>
              ) : (
              <div className="profile__submit-button">
                  <button
                    className={`profile__submit ${
                      (!isValid || isError) && "profile__submit_disabled"
                    }`}
                    disabled={!isValid || isError}
                    type="submit" >Сохранить</button>
              </div>
              )}
           </form>
           <button className={`profile__logout ${!isValueSameAsWas ? "profile__logout_nonactive" : ""}`} onClick={handleCLickLogout}>Выйти из аккаунта</button>
        </section>
    </>
  )
  }

export default Profile;

