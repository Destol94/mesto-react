
import trashCan from '../images/trashcan.svg';

function Card(props) {
  function imgClick() {
    props.onCardClick(props.card);
  }  
  return (
    <div className="element" >
      <img src={props.card.link} alt={props.card.name} className="element__img" onClick={imgClick} />
      <div className="element__footer">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__box-like">
          <button className="element__btn-heart button" type="button"></button>
          <p className="element__number-of-likes">{props.card.likes.length}</p>
        </div>
        <button className="element__trashcan button"><img src={trashCan} alt="кнопка удаления карточки" /></button>
      </div>
    </div>
  )
}
export default Card;