import "./InfoTooltip.css";

const InfoTooltip = ({ text, isOpen }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
