import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.owner._id === currentUser._id;
    const isLiked = props.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = (`element__group-title-like ${isLiked ? 'element__group-title-like_active' : ''}`);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handelLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        console.log(props.card)
        props.onCardDelete(props.card);
    }

    return (
        <div className="element">
            <div className="element__image-button">
                {isOwn && <button className='element__group-title-delete' onClick={handleDeleteClick} />}
                <img className="element__image"
                    src={(`${props.card.link}`)} alt={`${props.card.name}`}
                    onClick={handleCardClick} />
            </div>
            <div className="element__group-title">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__group-title-like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handelLikeClick}></button>
                    <p className="element__group-title-like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}