import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function NavBar({ userEmail, isActive, navBarLog, navBarReg, loggedIn, loggedOut }) {

  const history = useNavigate();

  function signOut() {
    localStorage.removeItem('token');
    history('/react-mesto-auth/sign-in');
    loggedOut()
  }


  return (

    <nav className="menu">
      {isActive ? (
        !loggedIn && <NavLink to="/react-mesto-auth/sign-in" className="menu__link" onClick={navBarReg}>Войти</NavLink>
      ) : (
        !loggedIn && < NavLink to="/react-mesto-auth/sign-up" className="menu__link" onClick={navBarLog}>Регистрация</NavLink>
      )}
      {loggedIn &&
        <div className="menu__container">
          <p className="menu__item">{`${userEmail.email}`}</p>
          <button type="button" onClick={signOut} className="menu__button">Выйти</button>
        </div>
      }
    </nav >
  );
}

export default NavBar;