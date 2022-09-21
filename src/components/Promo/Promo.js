// компонент с вёрсткой баннера страницы «О проекте».
import "./Promo.css";
import landing from "../../images/landing-logo.svg";

function Promo () {
  return (
    <>
      <section className="promo">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__logo" src={landing} alt="Логотип Промо." />
      </section>
    </>
  )
};

export default Promo;
