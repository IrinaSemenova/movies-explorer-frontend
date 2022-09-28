import { useState, useEffect } from "react";
import "./Register.css";
import SignForm from "../SignForm/SignForm";
import { Validation } from "../../utils/Validation";

function Register ({ onSubmit }) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { values, handleChange, errors, resetForm, isValid } = Validation();

  useEffect(() => {
    resetForm();
    setIsSubmitDisabled(true);
  }, [resetForm]);

  useEffect(() => {
    setIsSubmitDisabled(!isValid);
  }, [isValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitDisabled(true);
    onSubmit(values);
    resetForm();
  };

  return (
    <>
      <SignForm
      title="Добро пожаловать!"
      signText="Уже зарегистрированы?"
      submitText="Зарегистрироваться"
      link="/signin"
      linkText="Войти"
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      >

          <label className="register__label" htmlFor="name">Имя</label>
            <input className="register__input register__input_name"
                  id="name"
                  name="name"
                  type="text"
                  minLength="2"
                  maxLength="30"
                  pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                  value={values.name || ''}
                  onChange={handleChange}
                  required />
            <span className="register__error">{errors.name}</span>
            <label className="register__label" htmlFor="email">E-mail</label>
            <input className="register__input register__input_email"
                  id="email"
                  name="email"
                  type="email"
                  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                  value={values.email || ''}
                  onChange={handleChange}
                  required />
            <span className="register__error">{errors.email}</span>
            <label className="register__label" htmlFor="password">Пароль</label>
            <input className="register__input register__input_password"
                  id="password"
                  name="password"
                  type="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  required />
            <span className="register__error">{errors.password}</span>

      </SignForm>
    </>
  )
};

export default Register;

