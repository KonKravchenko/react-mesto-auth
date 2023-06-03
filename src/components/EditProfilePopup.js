import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState([])
  const [description, setDescription] = React.useState([])
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }


  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, about: description });
  }


  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      btnAriaLabel="Cохранить данные профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <input
          className="form__item"
          type="text"
          name="name"
          placeholder="Имя"
          autoComplete="off"
          required
          minLength="2"
          maxLength="40"
          
          value={name ?? ''} onChange={handleNameChange}/>

        <span className="form__item-error"></span>
      </div>

      <div className="form__input">
        <input
          className="form__item form__item_bottom"
          type="text" name="about"
          placeholder="О себе"
          autoComplete="off"
          required minLength="2"
          maxLength="200"
          
          value={description ?? ''} onChange={handleDescriptionChange}/>

        <span className="form__item-error"></span>
      </div>
    </PopupWithForm>

  )

}

export default EditProfilePopup;