// import avatar from '../images/Avatar.svg';
import pen from '../images/Vector.svg';
import plus from '../images/Vector1.svg';
import React from 'react';
// import { useState, useEffect } from 'react';
import Card from './Card.jsx'
import CurrentUserContext from '../contexts/CurrentUserContext'


export default function Main(props) {
    //const [{name, about, avatar }, setUser] = useState({});
    //const [cards, setCards] = useState([]);

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__items">
                    <div className="profile__avatar">
                        <img className="profile__avatar-images" src={currentUser.avatar} alt={currentUser.name} />
                        <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info__title-group">
                            <h1 className="profile-info__title" >{currentUser.name}</h1>
                            <button className="profile-info__edit-button" type="button">
                                <img src={pen} className="profile-info__images" alt="Редактировать" onClick={props.onEditProfile} />
                            </button>
                        </div>
                        <p className="profile-info__subtitle" >{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    <img src={plus} className="profile__add-button-images" alt="Добавить" />
                </button>
            </section>
            <section className="elements">
                {props.cards?.map((card) => (
                    <Card
                        card={card}
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes}
                        owner={card.owner}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))
                }
            </section>
        </main>
    )
}