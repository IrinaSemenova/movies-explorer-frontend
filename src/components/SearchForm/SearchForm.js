// форма поиска
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm ({
  onSearch,
  onSubmitCheckbox,
  keyWord,
  checkboxStatus
}) {

  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [textFilterError, setTextFilterError] = useState("");

  useEffect(() => {
    setInputValue(keyWord);
    setIsChecked(checkboxStatus);
  }, [checkboxStatus, keyWord]);

  function handleInputChange(evt) {
    setInputValue(evt.target.value);

    if (setInputValue.length === 0) {
      setTextFilterError("Нужно ввести ключевое слово");
  } else {
      setTextFilterError("")
  }
  }

  function handleSubmitSearch(evt) {
    evt.preventDefault();
    if (!inputValue) {
      setTextFilterError("Нужно ввести ключевое слово");
    } else {
    onSearch(inputValue, isChecked); }
  }

  function handleChangeCheckbox() {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onSubmitCheckbox(newValue);
  }

  return (

      <section className="search">
          <>
          <form
              className="search__form"
              onSubmit={handleSubmitSearch}
              noValidate>
          <div className="search__section">
              <input
                className="search__input"
                name="search"
                type="text"
                placeholder="Фильм"
                value={inputValue}
                onChange={handleInputChange}
                required />
              <button className="search__button" type="submit" >Найти</button>
          </div>

          <span className="search__error search__error_active">{textFilterError}</span>

          <FilterCheckbox
            isChecked={isChecked}
            onSubmitCheckbox={handleChangeCheckbox}
          />
        </form>
      <div className="search__line" />

      </>
    </section>
  )}

export default SearchForm;
