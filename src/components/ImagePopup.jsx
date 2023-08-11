export default function ImagePopup(props) {

    return (
        <div className={`popup popup-images" ${props.card ? `popup_opened` : ""} `} >
            <div className="popup__images-card">
                <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                <h2 className="popup__image-title">{props.card?.name}</h2>
                <button className="popup__container-close popup__container-close-images" type="button" onClick={props.onClose}>
                </button>
            </div>
        </div>
    )
}