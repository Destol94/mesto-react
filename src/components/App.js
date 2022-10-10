import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(null);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm onClose={()=> {closeAllPopups(setIsEditProfilePopupOpen)}} name="profile" title="Редактировать профиль" isOpen = {isEditProfilePopupOpen}  children = {
            <>
            <div className="popup__field">
              <input type="text" className="popup__name popup__input" defaultValue="" name="inputName" id="inputName" placeholder="Имя" required minLength="2" maxLength="40" />
              <span className="popup__span-error inputName-error"></span>
            </div>
            <div className="popup__field">
              <input type="text" className="popup__occupation popup__input" defaultValue="" name="inpitOccupation" placeholder="О себе" id="inpitOccupation" required minLength="2" maxLength="200" />
              <span className="popup__span-error inpitOccupation-error"></span>
            </div>
            </>
          } 
        />
        <PopupWithForm onClose={()=> {closeAllPopups(setIsAddPlacePopupOpen)}} name="card" title="Новое место" isOpen={isAddPlacePopupOpen}  children={
          <>
          <div className="popup__field">
              <input type="text" className="popup__name popup__input" defaultValue="" name="name" id="inputTitle" placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__span-error inputTitle-error"></span>
            </div>
            <div className="popup__field">
              <input className="popup__occupation popup__input" defaultValue="" type="url" name="link" id="inpitLink" placeholder="Ссылка на картинку"  required />
              <span className="popup__span-error inpitLink-error"></span>
            </div></>
        } />
        <PopupWithForm onClose={()=> {closeAllPopups()}} name="confirm" title="Вы уверены?" />
        <PopupWithForm onClose={()=> {closeAllPopups(setIsEditAvatarPopupOpen)}} name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen}  children={
          <>
          <div className="popup__field">
              <input className="popup__occupation popup__input" defaultValue="" type="url" name="link" id="inpitLinkAvatar" placeholder="Ссылка на картинку"  required />
              <span className="popup__span-error inpitLinkAvatar-error"></span>
            </div>
          </>
          } 
        />
        <ImagePopup card={selectedCard} onClose={()=> {closeAllPopups(handleCardClick)}} />
      </div>
    </div>
  );
}

export default App;
