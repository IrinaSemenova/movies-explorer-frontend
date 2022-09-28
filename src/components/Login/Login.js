import { useState, useEffect } from "react";
import "./Login.css";
import SignForm from "../SignForm/SignForm";
import { Validation } from "../../utils/Validation";

function Login ({ onSubmit }) {
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
      title="Рады видеть!"
      submitText="Войти"
      signText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      >
          <label className="login__label" htmlFor="email">E-mail</label>
          <input className="login__input login__input_email"
                id="email"
                name="email"
                type="email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                value={values.email || ''}
                onChange={handleChange}
                required />
          <span className="login__error">{errors.email}</span>
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input login__input_password"
                id="password"
                name="password"
                type="password"
                value={values.password || ''}
                onChange={handleChange}
                required />
          <span className="login__error">{errors.password}</span>

      </SignForm>
    </>
  )
};

export default Login;
