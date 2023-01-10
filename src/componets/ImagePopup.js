function ImagePopup(props) {
  return (
    <div className={` popup popup-photo  ${props.card && 'popup_opened'}`} >
      <div className="popup-container popup-photo__container">
        <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
          className="popup-photo__img" alt="" />
        <p className="popup-photo__text"></p>
        <button onClick={props.onClose} type="button" className="popup__close popup-photo__btn"></button>
      </div>
    </div>
  )
}

export default ImagePopup