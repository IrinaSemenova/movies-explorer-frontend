// форма поиска
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
  return (
    <>
      <section className="search">
        <form className="search__form">
          <div className="search__section">
              <input className="search__input" name="search" type="text" placeholder="Фильм" required />
              <button className="search__button" type="submit">Найти</button>
          </div>
          <span className="search__error">Введите название фильма для поиска</span>
        </form>

        <FilterCheckbox/>

      <div className="search__line" />
    </section>
    </>
  )
};

export default SearchForm;
