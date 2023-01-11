import { useState } from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  function EditProfilePopup() {
    return (
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} name='edit' title='Редактировать профиль' textBtn='Сохранить' >
        <div className="popup__form-container">

          <input type="text" name="inputName" placeholder="Имя" id="email-input"
            className="popup__input popup-edit__input popup__input_value_autor" minLength="2" maxLength="40" required />
          <span className="email-input-error popup__input-error"></span>
        </div>

        <div className="popup__form-container">
          <input type="text" name="inputProf" placeholder="О себе"
            className="popup__input popup-edit__input popup__input_value_prof" id="text-input" minLength="2"
            maxLength="200" required />
          <span className="text-input-error popup__input-error"></span>
        </div>

      </PopupWithForm>
    )
  }
  function AddImagePopup() {
    return (
      <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} name='add' title='Новое место' textBtn='Создать'>
        <div className="popup__form-container">
          <input id="textplus-input" type="text" name="name" placeholder="Название"
            className="popup__input popup-add__input popup-add__input_value_autor" minLength="2" maxLength="30" required />
          <span className="textplus-input-error popup__input-error"></span>
        </div>
        <div className="popup__form-container">
          <input id="ulrplus-input" type="url" name="link" placeholder="Ссылка на картинку"
            className="popup__input  popup-add__input popup-add__input_value_prof" required />
          <span className="ulrplus-input-error popup__input-error"></span>
        </div>
      </PopupWithForm>


    )
  }
  function EditAvatarPopup() {
    return (
      <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} name='avatar' title='Обновить аватра' textBtn='Сохранить'>
        <div className="popup__form-container">
          <input id="ulrAvatar-input" type="url" name="inputAvatar" placeholder="Ссылка на картинку"
            className="popup__input  popup-avatar__input popup-avatar__input_value_prof" required />
          <span className="ulrAvatar-input-error popup__input-error"></span>
        </div>
      </PopupWithForm>

    )
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick() {
    setSelectedCard(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="App">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />

      <EditProfilePopup />
      <AddImagePopup />
      <EditAvatarPopup />

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
