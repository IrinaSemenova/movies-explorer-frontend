import "./Register.css";
import SignForm from "../SignForm/SignForm";
import Validation from "../../utils/Validation";

function Register ({ onSubmit}) {

  const { values, handleChange, errors, isValid } = Validation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  return (
    <>
      <SignForm
      title="Добро пожаловать!"
      signText="Уже зарегистрированы?"
      submitText="Зарегистрироваться"
      link="/signin"
      linkText="Войти"
      onSubmit={handleSubmit}
      errors={errors}
      isValid={isValid}
      >

          <label className="register__label" htmlFor="name">Имя</label>
            <input className="register__input register__input_name"
                  id="name"
                  name="name"
                  type="text"
                  minLength="2"
                  maxLength="30"
                  pattern="^[A-Za-zА-Яа-я\s]{1,}$"
                  onChange={handleChange}
                  value={values.name || ""}
                  required />
            <span className="register__error">{errors.name}</span>
            <label className="register__label" htmlFor="email">E-mail</label>
            <input className="register__input register__input_email"
                  id="email"
                  name="email"
                  type="email"
                  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                  onChange={handleChange}
                  value={values.email || ""}
                  required />
            <span className="register__error">{errors.email}</span>
            <label className="register__label" htmlFor="password">Пароль</label>
            <input className="register__input register__input_password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password || ""}
                  required />
            <span className="register__error">{errors.password}</span>

      </SignForm>
    </>
  )
};

export default Register;

