import React from 'react';
import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditProfileAvatar(props) {
  const avatarValue = useRef();

  useEffect(() => {
    avatarValue.current.value = '';
  }, [props.isOpen]
  )

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarValue.current.value
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      name={'avatar'}
      container={'__container'}
      title={'Обновить аватар'}
      form={'-avatar'}
      button={'Сохранить'}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        type="url"
        name="avatar"
        className="popup__container-input popup__container-input_type_avatar"
        id="avatar"
        required
        placeholder='Ссылка на аватар'
        ref={avatarValue}
      />
      <span className="error input-error-avatar"></span>
    </PopupWithForm>
  )
}