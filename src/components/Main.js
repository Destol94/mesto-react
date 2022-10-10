import plus from '../images/Vector.svg';
import React from 'react';
import pencil from '../images/pencil.svg';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(error => console.log(error));
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <img src={userAvatar} onClick={props.onEditAvatar} alt="Фотография Жак-Ив Кусто" className="profile__avatar" />
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button button" onClick={props.onEditProfile} type="button"><img className="profile__edit-button-img" src={pencil} alt="кнопка изменить" /></button>
            </div>
            <p className="profile__occupation">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button button" onClick={props.onAddPlace} type="button"><img src={plus} alt="добавить" className="profile__add-button-img" /></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card card={item} key={item._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  )
}
export default Main;