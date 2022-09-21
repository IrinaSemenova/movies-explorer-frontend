import "./Register.css";
import SignForm from "../SignForm/SignForm";

function Register () {
  return (
    <>
      <SignForm
      title="Добро пожаловать!"
      submitText="Зарегистрироваться"
      signText="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      >
          <label className="register__label" htmlFor="name">Имя</label>
          <input className="register__input register__input_name"
                id="name"
                name="name"
                type="text"
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                required />
          <span className="register__error" />
          <label className="register__label" htmlFor="email">E-mail</label>
          <input className="register__input register__input_email"
                id="email"
                name="email"
                type="email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                required />
          <span className="register__error" />
          <label className="register__label" htmlFor="password">Пароль</label>
          <input className="register__input register__input_password"
                id="password"
                name="password"
                type="password"
                required />
          <span className="register__error" />

      </SignForm>
    </>
  )
};

export default Register;

