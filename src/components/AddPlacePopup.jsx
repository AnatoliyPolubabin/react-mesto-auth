import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  useEffect(() => {
    setPlaceName('')
    setPlaceLink('')
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    })
  }

  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value)
  }

  function handleChangePlaceLink(evt) {
    setPlaceLink(evt.target.value)
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'mesto'}
      container={'-mesto__container-card'}
      title={'Новое место'}
      form={'-mesto'}
      button={'Создать'}
      onSubmit={handleSubmit}
      onClose={props.onClose}>
      <input
        type="text"
        name="nameMesto"
        className="popup__container-input popup__container-input_name_mesto"
        id="nameMesto"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangePlaceName}
        value={placeName || ""}
      />
      <span className="error input-error-nameMesto"></span>
      <input
        type="url"
        name="linkPicture"
        className="popup__container-input popup__container-input_link_picture"
        id="linkPicture"
        placeholder="Ссылка на картинку"
        minLength="2"
        required
        onChange={handleChangePlaceLink}
        value={placeLink || ""}
      />
      <span className="error input-error-linkPicture"></span>
    </PopupWithForm>
  )
}