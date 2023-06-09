import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../auth';


function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);

  const [isInfoTooltipData, setInfoTooltipData] = useState({});

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);

  const [userEmail, setUserEmail] = useState({});

  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  function handleApi() {
    Promise.all([
      api.getProfileData(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard({})
    setInfoTooltip(false)
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);


    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        console.log(newCard)
        setCards(cards.filter(function item(c) { if (c._id !== card._id) { return c } }))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleUpdateUser(data) {
    api.setProfileData(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleUpdateAvatar(data) {
    api.setProfileAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleAddPlaceSubmit(data) {
    api.setNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleRegister(formValue) {
    auth.register(formValue)
      .then((res) => {
        setInfoTooltipData(res)
        setInfoTooltip(true)
        navigate('/sign-in', { replace: true });
      }
      )
      .catch(err => {
        setInfoTooltipData(err)
        setInfoTooltip(true)
      });
  }

  function handleLogin(formValue) {
    auth.authorize(formValue)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          handleTokenCheck();
          setFormValue({ password: '', email: '' });
          setLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      auth.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          handleApi()
          navigate("/react-mesto-auth/main", { replace: true })
          setUserEmail(res.data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
  }


  React.useEffect(() => {
    handleTokenCheck()
  }, [])

  const handleLogout = () => {
    setLoggedIn(false);
  }

  function handleNavBarLogin() {
    setIsActive(true)
  }

  function handleNavBarReg() {
    setIsActive(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">
          <Header
            userEmail={userEmail}
            isActive={isActive}
            navBarLog={handleNavBarLogin}
            navBarReg={handleNavBarReg}
            loggedIn={loggedIn}
            loggedOut={handleLogout} />


          <Routes>
            <Route path="/*" element={loggedIn ? <Navigate to="/react-mesto-auth/main" replace /> : <Navigate to="/react-mesto-auth/sign-in" replace />} />
            <Route path="/react-mesto-auth" element={loggedIn ? <Navigate to="/react-mesto-auth/main" replace /> : <Navigate to="/react-mesto-auth/sign-in" replace />} />

            <Route path="/react-mesto-auth/sign-up" element={<Register
              handleRegister={handleRegister}
              navBarLog={handleNavBarLogin}
              formValue={formValue}
              setFormValue={setFormValue}
            />} />
            <Route path="/react-mesto-auth/sign-in" element={<Login
              handleLogin={handleLogin}
              navBarReg={handleNavBarReg}
              formValue={formValue}
              setFormValue={setFormValue} />} />

            <Route path="/react-mesto-auth/main" element={<ProtectedRouteElement element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn} />} />
          </Routes>
          {loggedIn && <ImagePopup
            cardData={selectedCard}
            onClose={closeAllPopups}
          />}

          {loggedIn && <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />}

          {loggedIn && <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />}

          {loggedIn && <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            handleApi={handleApi}
          />}

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            infoTooltipData={isInfoTooltipData}
          />

          <Footer />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

