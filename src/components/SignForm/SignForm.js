import { Link } from "react-router-dom";
import "./SignForm.css";
import logo from "../../images/logo-main.svg";


function SignForm ({title, submitText, children, signText, link, linkText}) {

  return (
    <section className="sign">
      <div className="sign__header">
        <img src={logo} alt="Логотип" className="sign__logo"/>
        <h1 className="sign__title">{title}</h1>
      </div>

      <form className="sign__form" name="sign" id="sign">
        {children}
        <button className="sign__submit" type="submit" id="sign__submit">{submitText}</button>
      </form>

      <div className="sign__block">
        <p className="sign__text">{signText}</p>
        <Link to={link} className="sign__link">{linkText}</Link>
      </div>
    </section>

  )
}

export default SignForm;
