export default function InfoTooltip(props) {
    return (
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onClose}>
        <div className="popup__entrance">
          <img src={props.image} alt={props.title} className="popup__entrance-status" />
          <h2 className="popup__entrance-message">{props.title}</h2>
          <button type="button" className="popup__container-close" onClick={props.onClose}></button>
        </div>
      </div>
    );
  }