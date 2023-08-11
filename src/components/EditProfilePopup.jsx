import React, { useState, useEffect } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [about, setDescription] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: about,
    })
  }

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value)
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'profile'}
      container={'__container'}
      title={'Редактировать профиль'}
      form={'-profile'}
      button={'Сохранить'}
      onSubmit={handleSubmit}
      onClose={props.onClose}>
      <input
        type="text"
        name="name"
        className="popup__container-input popup__container-input_name_first"
        id="name"
        required
        placeholder='Имя'
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="error input-error-name"></span>
      <input
        type="text"
        name="about"
        className="popup__container-input popup__container-input_about_you"
        id="about"
        required
        placeholder='О себе'
        minLength="2"
        maxLength="200"
        onChange={handleChangeAbout}
        value={about || ""}
      />
      <span className="error input-error-about"></span>
    </PopupWithForm>
  )

}