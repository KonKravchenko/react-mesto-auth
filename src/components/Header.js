import React from 'react';
import { ReactComponent as HeaderLogo } from '../images/__logo_white.svg';
import NavBar from './NavBar';

function Header({ userEmail, isActive, navBarLog, navBarReg, loggedIn, loggedOut }) {
  return (
    <header className="header">
      <HeaderLogo className="header__logo" />
      <NavBar
        userEmail={userEmail}
        isActive={isActive}
        navBarLog={navBarLog}
        navBarReg={navBarReg}
        loggedIn={loggedIn}
        loggedOut={loggedOut} />
    </header>
  );
}

export default Header;