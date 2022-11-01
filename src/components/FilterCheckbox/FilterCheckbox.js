import "./FilterCheckbox.css";

function FilterCheckbox ({
  isChecked,
  onSubmitCheckbox
}) {
  return (
    <>
      <div className="checkbox">
        <input
          className="checkbox__input"
          type="checkbox"
          id="checkbox"
          checked={isChecked} // || false
          onChange={onSubmitCheckbox}
         />
        <label className="checkbox__label">Короткометражки</label>
      </div>
    </>
  )
};

export default FilterCheckbox;
