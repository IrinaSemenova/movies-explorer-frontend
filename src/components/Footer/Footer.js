import "./Footer.css";

function Footer () {
  return (
    <>
      <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__line" />
        <div className="footer__nav">
          <p className="footer__copyright">© 2022</p>
          <ul className="footer__links">
              <li className="footer__links-item">
                  <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
              </li>
              <li className="footer__links-item">
                  <a className="footer__link" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
              </li>
          </ul>
        </div>
      </footer>
    </>
  )
};

export default Footer;
