export default function PopupWithForm(props) {

  return(
      <div className={`popup popup-${props.name} ${props.isOpen ? `popup_opened` : ""} `} >
      <div className={`popup${props.container}`}>
          <h3 className="popup__container-title">{props.title}</h3>
          <form name={props.form} className={`form form-${props.form}`} onSubmit={props.onSubmit}>
              {props.children}
              <button type="submit" className="popup__container-button">{props.button}</button>
          </form>
      <button type="button" className="popup__container-close" onClick={props.onClose}></button>
      </div>
  </div>
  )
}