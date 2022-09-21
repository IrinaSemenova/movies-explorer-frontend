import "./Login.css";
import SignForm from "../SignForm/SignForm";

function Login () {
  return (
    <>
    <SignForm
      title="Рады видеть!"
      submitText="Войти"
      signText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      >
          <label className="login__label" htmlFor="email">E-mail</label>
          <input className="login__input login__input_email"
                id="email"
                name="email"
                type="email"
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                required />
          <span className="login__error" />
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input login__input_password"
                id="password"
                name="password"
                type="password"
                required />
          <span className="login__error" />

      </SignForm>
    </>
  )
};

export default Login;
