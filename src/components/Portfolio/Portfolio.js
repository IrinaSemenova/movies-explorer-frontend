// компонент со ссылками на другие проекты
import "./Portfolio.css";

function Portfolio () {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__links">
            <li className="portfolio__links-item">
                <a className="portfolio__link" href="https://github.com/IrinaSemenova/how-to-learn/" target="_blank" rel="noreferrer">Статичный сайт</a>
            </li>
            <div className="profile__line" />
            <li className="portfolio__links-item">
                <a className="portfolio__link" href="https://github.com/IrinaSemenova/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a>
            </li>
            <div className="profile__line" />
            <li className="portfolio__links-item">
                <a className="portfolio__link" href="https://domainfrontmesto.students.nomoredomains.sbs" target="_blank" rel="noreferrer">Одностраничное приложение</a>
            </li>
        </ul>
      </section>

    </>
  )
};

export default Portfolio;
