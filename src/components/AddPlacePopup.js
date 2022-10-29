import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setname] = useState('');
  function handleChangeName(e) {
    setname(e.target.value);
  }
  const newCardUrlRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      url: newCardUrlRef.current.value
    })
    setname('');
    newCardUrlRef.current.value = '';
  }
  return (
    <PopupWithForm onClose={props.onClose} name="card" title="Новое место" isOpen={props.isOpen} buttonText="Создать" onSubmit={handleSubmit}>
      <>
        <div className="popup__field">
          <input type="text" className="popup__name popup__input" value={name} onChange={handleChangeName} name="name" id="inputTitle" placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__span-error inputTitle-error"></span>
        </div>
        <div className="popup__field">
          <input className="popup__occupation popup__input" ref={newCardUrlRef} defaultValue="" type="url" name="link" id="inpitLink" placeholder="Ссылка на картинку" required />
          <span className="popup__span-error inpitLink-error"></span>
        </div>
      </>
    </PopupWithForm>
  )
}
export default AddPlacePopup;