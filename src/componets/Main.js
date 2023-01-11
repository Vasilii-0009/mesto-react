import avatar from '../images/Avatar.jpg'
import labelEdit from '../images/pencil.svg'
import { useEffect, useState } from 'react'
import dataApi from '../utils/Api'
import Card from './Card'

function Main(props) {
  const [isUserName, setUserName] = useState('jak')
  const [isUserJob, setUserJob] = useState('electric')
  const [userAvatar, setUserAvatar] = useState('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg')

  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([dataApi.getInfoUser(), dataApi.getTasks()]).then(([getInfoUser, getTasks]) => {
      setUserName(getInfoUser.name)
      setUserJob(getInfoUser.about)
      setUserAvatar(getInfoUser.avatar)

      setCards(getTasks)

    }).catch((err) => {
      console.log(`Данные не сохранились на сервере (код ошибки): ${err}`)
    });
  }, [])

  return (
    <main>
      <section className="profile container">
        <div className="profile__container-img" >
          <div style={{ backgroundImage: `url(${userAvatar})` }} alt="Аватарка" className="profile__img"></div>
          <img onClick={props.onEditAvatar} src={labelEdit} alt="Ярлык редактирования" className="profile__img-pencil" />
        </div>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__autor">{isUserName}</h1>
            <button onClick={props.onEditProfile} type="button" className="btn profile__btn-edit"></button>
          </div>
          <p className="profile__text">{isUserJob}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="  profile__add"></button>
      </section>
      <section className="elements container">
        {cards.map((card, index) => {
          return (
            <Card cardInfo={card} onCardClick={props.onCardClick} key={card._id} />
          )
        })}
      </section>
    </main >
  )
}

export default Main