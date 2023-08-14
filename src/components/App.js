import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import * as auth from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import EditProfileAvatar from './EditProfileAvatar';
import AddPlacePopup from "./AddPlacePopup";
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';


function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mailName, setMailName] = useState(null);
  const [popupImage, setPopupImage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [infoTooltip, setInfoTooltip] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setMailName(res.data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }, []);

  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setPopupImage(success);
        setPopupTitle('Вы успешно зарегистрировались!');
        navigate('/signin');
      })
      .catch(() => {
        setPopupImage(unsuccess);
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setMailName(email);
        navigate('/', { replace: true });
      })
      .catch(() => {
        setPopupImage(unsuccess);
        setPopupTitle('Что-то пошло не так! Попробуйте ещё раз.');
        handleInfoTooltip();
      });
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([userData, card]) => {
          setCurrentUser(userData);
          setCards(card);
          console.log(card);
        }).catch(err => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        return setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setMailName(null);
    navigate('/signin');
    localStorage.removeItem('jwt');
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(card._id)
      console.log(newCard)
      setCards((state) => {
        return state.map((c) => c._id === card._id ? newCard : c)
      });
    })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }
  function handleUpdateUser(newUserInfo) {
    api.editProfile(newUserInfo)
      .then((data) => {
        console.log(newUserInfo)
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateAvatar(newAvatar) {
    api.editProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            mail={mailName}
            onClick={onSignOut}
            isLogged={isLoggedIn}
          />
          <Routes>
            <Route
              path='/signin'
              element={<Login onLogin={onLogin} />}
            />

            <Route
              path='/signup'
              element={<Register onRegister={onRegister} />}
            />

            <Route
              path='/'
              element={
                <>
                  <ProtectedRouteElement
                    element={Main}
                    isLogged={isLoggedIn}
                    cards={cards}
                    onCardClick={handleCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                  <Footer />
                </>
              }
            />

            <Route
              path='*'
              element={<Navigate to={isLoggedIn ? '/' : '/signin'} />}
            />
          </Routes>
          {/* <Main
          cards={cards} 
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        /> */}
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <EditProfileAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            image={popupImage}
            title={popupTitle}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;