// компонент с информацией о студенте
import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe () {
  return (
    <>
      <section className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__line" />
        <div className="about-me__info">
          <div className="about-me__info-block">
            <p className="about-me__info-title">Ирина</p>
            <p className="about-me__info-subtitle">Фронтенд-разработчик</p>
            <p className="about-me__info-description">
              Я родилась в Карелии. Закончила факультет социальных и политических наук ПетрГУ
              по специальности Социология. Сейчас живу и работаю в Москве. Работала HR в подборе
              персонала, маркетлогом-аналитиком в автомобильном бизнесе, а последние 6 лет работаю
              в телекоммуникационной компании Менеджером по продуктам корпоротивного рынка.
              У меня маленькая дочька, с которой на данный момент нахожусь в декрете.
              Чтобы не зачахнуть в декрете начала кодить и пошла на курсы для получения новых знаний.
              После того, как пройду курс по веб-разработке, планирую заниматься фриланс-заказами и
              поменять работу после выхода из декретного отпуска.</p>
            <a className="about-me__link" href="https://github.com/IrinaSemenova" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img src={photo} alt="Фото студента" className="about-me__photo"/>
        </div>
      </section>
    </>
  )
};

export default AboutMe;
