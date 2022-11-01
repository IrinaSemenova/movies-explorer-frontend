import "./NotFoundPage.css";
import { useHistory } from "react-router-dom";

function NotFoundPage() {

  const history = useHistory();
  const handleBack = () => history.goBack();

    return (
      <div className="not-found-page">
        <div className="not-found-page__info">
            <h2 className="not-found-page__title">404</h2>
            <p className="not-found-page__subtitle">Страница не найдена</p>
        </div>
        <button className="not-found-page__link" onClick={handleBack}>Назад</button>
      </div>
    )
}

export default NotFoundPage;
