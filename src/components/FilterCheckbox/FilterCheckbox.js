import "./FilterCheckbox.css";

function FilterCheckbox () {
  return (
    <>
      <div className="checkbox">
        <input className="checkbox__input" type="checkbox" id="checkbox" />
        <label className="checkbox__label" htmlFor="checkbox">Короткометражки</label>
      </div>
    </>
  )
};

export default FilterCheckbox;
