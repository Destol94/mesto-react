import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => { return !(item.owner._id === currentUser._id && card._id === item._id) }));
      })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups(set) {
    set(false);
  }
  function handleUpdateUser({ name, about }) {
    api.patchUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(setIsEditProfilePopupOpen);
      })
  }
  function handleUpdateAvatar({ avatar }) {
    api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups(setIsEditAvatarPopupOpen);
      })
      .catch((error) => { console.log(error) })
  }

  function handleAddPlaceSubmit({ name, url }) {
    api.patchCard(name, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups(setIsAddPlacePopupOpen);
      })
      .catch((error) => { console.log(error) })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main onEditProfile={handleEditProfileClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={() => { closeAllPopups(setIsEditProfilePopupOpen) }} onUpdateUser={handleUpdateUser} />
          {/* <PopupWithForm onClose={() => { closeAllPopups(setIsAddPlacePopupOpen) }} name="card" title="Новое место" isOpen={isAddPlacePopupOpen} buttonText="Создать" >
            <>
              <div className="popup__field">
                <input type="text" className="popup__name popup__input" defaultValue="" name="name" id="inputTitle" placeholder="Название" required minLength="2" maxLength="30" />
                <span className="popup__span-error inputTitle-error"></span>
              </div>
              <div className="popup__field">
                <input className="popup__occupation popup__input" defaultValue="" type="url" name="link" id="inpitLink" placeholder="Ссылка на картинку" required />
                <span className="popup__span-error inpitLink-error"></span>
              </div>
            </>
          </PopupWithForm> */}
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={() => { closeAllPopups(setIsAddPlacePopupOpen) }} onAddPlace={handleAddPlaceSubmit} />
          <PopupWithForm onClose={() => { closeAllPopups() }} name="confirm" title="Вы уверены?" buttonText="Да" />
          {/* <PopupWithForm onClose={() => { closeAllPopups(setIsEditAvatarPopupOpen) }} name="avatar" buttonText="Сохранить" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} >
            <div className="popup__field">
              <input className="popup__occupation popup__input" defaultValue="" type="url" name="link" id="inpitLinkAvatar" placeholder="Ссылка на картинку" required />
              <span className="popup__span-error inpitLinkAvatar-error"></span>
            </div>
          </PopupWithForm> */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={() => { closeAllPopups(setIsEditAvatarPopupOpen) }} onUpdateAvatar={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={() => { closeAllPopups(handleCardClick) }} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
