function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="elements__element">
      <div onClick={handleClick} style={{ backgroundImage: `url(${props.cardInfo.link})` }}
        className="elements__img" ></div>
      <div className="elements__box">
        <h2 className="elements__title">{props.cardInfo.name}</h2>
        <div className="elements__box-like">
          <button type="button" className="elements__like">
          </button>
          <p className="elements__number">{props.cardInfo.likes.length}</p>
        </div>

      </div>
      <button type="button" className="elements__basket"></button>
    </div>
  )
}

export default Card