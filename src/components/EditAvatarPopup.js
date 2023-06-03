import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const [avatar, setAvatar] = React.useState([])

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);


  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */
    });
    event.target.reset();
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      btnAriaLabel="Изменить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <input
          className="form__item"
          type="url"
          name="avatar"
          ref={avatarRef}
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required />
        <span className="form__item-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;