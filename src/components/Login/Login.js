import "./Login.css";
import SignForm from "../SignForm/SignForm";
import Validation from "../../utils/Validation";

const Login = ({onSubmit  }) => {

  const { values, handleChange, errors, isValid } = Validation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  return (
    <>
    <SignForm
      title="Рады видеть!"
      submitText="Войти"
      signText="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={handleSubmit}
      errors={errors}
      isValid={isValid}
      >
          <label className="login__label" htmlFor="email">E-mail</label>
          <input className="login__input login__input_email"
                id="email"
                name="email"
                type="email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                onChange={handleChange}
                value={values.email || ""}
                required />
          <span className="login__error">{errors.email}</span>
          <label className="login__label" htmlFor="password">Пароль</label>
          <input className="login__input login__input_password"
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password || ""}
                required />
          <span className="login__error">{errors.password}</span>

      </SignForm>
    </>
  )
};

export default Login;
