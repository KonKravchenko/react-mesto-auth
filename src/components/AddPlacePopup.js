import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CardContext } from '../contexts/CardContext';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState([])
  const [link, setLink] = React.useState([])

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function resetInput(event) {
    setName(event.target.reset())
    setLink(event.target.reset())
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({ name, link });
    resetInput(event)
  }

  // Подписка на контекст
  const currentCard = React.useContext(CardContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentCard.name);
    setLink(currentCard.link);
  }, [currentCard]);

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      btnAriaLabel="Создать новую карточку"
      isOpen={isOpen}
      onClose={onClose}
      onReset={resetInput}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <input
          className="form__item"
          type="text"
          name="name"
          placeholder="Название"
          autoComplete="off"
          required
          minLength="2"
          maxLength="30"

          value={name ?? ''} onChange={handleNameChange} />
        <span className="form__item-error"></span>
      </div>

      <div className="form__input">
        <input
          className="form__item form__item_bottom"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required

          value={link ?? ''} onChange={handleLinkChange} />
        <span className="form__item-error"></span>
      </div>
    </PopupWithForm>

  )
}

export default AddPlacePopup
