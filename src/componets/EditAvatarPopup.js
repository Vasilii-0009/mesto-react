import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  const [avatar, setAvatar] = useState('')

  function handleChange(e) {
    setAvatar(e.target.value)
  }

  useEffect(() => {
    setAvatar('')
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='avatar' title='Обновить аватра' textBtn='Сохранить'>
      <div className="popup__form-container">
        <input value={avatar} onChange={handleChange} ref={avatarRef} id="ulrAvatar-input" type="url" name="inputAvatar" placeholder="Ссылка на картинку"
          className="popup__input  popup-avatar__input popup-avatar__input_value_prof" required />
        <span className="ulrAvatar-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup