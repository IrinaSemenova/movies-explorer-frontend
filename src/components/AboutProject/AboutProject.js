// компонент с описанием дипломного проекта
import "./AboutProject.css";

function AboutProject () {
  return (
    <>
      <section className="about">
        <h2 className="about__title">О проекте</h2>
        <div className="about__line" />
        <div className="about__info">
          <div className="about__info-block">
            <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__info-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about__info-block">
            <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__info-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about__steps">
          <div className="about__steps-time">
            <div className="about__backend">1 неделя</div>
            <div className="about__frontend">4 недели</div>
          </div>
          <div className="about__steps-text">
            <div className="about__backend-text">Back-end</div>
            <div className="about__frontend-text">Front-end</div>
          </div>
        </div>
    </section>
    </>
  )
};

export default AboutProject;
