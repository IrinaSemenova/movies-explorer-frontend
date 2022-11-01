import { Link } from "react-router-dom";
import "./SignForm.css";
import logo from "../../images/logo-main.svg";

function SignForm ({
  title,
  submitText,
  children,
  signText,
  link,
  linkText,
  onSubmit,
  isValid,
  isError
}) {

  return (
    <section className="sign">
      <div className="sign__header">
        <Link to="/">
        <img src={logo} alt="Логотип" className="sign__logo"/>
        </Link>
        <h1 className="sign__title">{title}</h1>
      </div>

      <form className="sign__form" name="sign" id="sign" onSubmit={onSubmit} noValidate>
        {children}
        <button
          className={`sign__submit ${
            (!isValid || isError) && "sign__submit_disabled"
          }`}
          disabled={!isValid || isError}
          type="submit"
          id="sign__submit">{submitText}</button>

      </form>

      <div className="sign__block">
        <p className="sign__text">{signText}</p>
        <Link to={link} className="sign__link">{linkText}</Link>
      </div>
    </section>
  )
}

export default SignForm;
