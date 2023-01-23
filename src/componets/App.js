import React from 'react';
import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
//new import 
import dataApi from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import CardsContext from '../contexts/CardsContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [currentUserContext, setCurrentUser] = useState({})
  const [cardsContext, setCard] = useState([])

  useEffect(() => {
    dataApi.getInfoUser().then((data) => {
      setCurrentUser(data)
    })
  }, [])

  useEffect(() => {
    dataApi.getTasks().then((data) => {
      setCard(data.slice(0, 8))
    })
  }, [])

  // функция добавление и удаление лайка
  function handleCardLike(card) {

    const isLiked = card.likes.some((i) => {
      return i._id === currentUserContext._id
    });
    if (isLiked) {
      dataApi.deleteLike(card._id).then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    } else {
      dataApi.addLike(card._id).then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
    }
  }
  // функция  удаление карточки
  function handleCardDelete(card) {

    dataApi.deleteCard(card._id).then((deletcard) => {
      setCard((state) => {
        const res = state.filter((item) => {
          if (item._id !== card._id) {
            return state
          }
        })
        return res
      })
    })
  }
  //обновляем дынные пользователя 
  function handleUpdateUser(infoUser) {
    dataApi.saveInfoUser(infoUser.name, infoUser.about).then((data) => {
      setCurrentUser(data)
    })
  }
  // добавление аватарки 
  function handleUpdateAvatar(data) {
    dataApi.updateAvatar(data.avatar).then((data) => {
      setCurrentUser(data)
    })
  }
  //добавление фоторграфии
  function handleAddPlaceSubmit(data) {

    dataApi.creatCard(data.name, data.link).then((newCard) => {
      setCard([newCard, ...cardsContext])
    })
  }



  //last code
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })


  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({ name: '' })
  }

  return (

    <div className="App">
      <CardsContext.Provider value={cardsContext}>
        <CurrentUserContext.Provider value={currentUserContext}>
          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Footer />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        </CurrentUserContext.Provider>
      </CardsContext.Provider>
    </div>
  );
}

export default App;
