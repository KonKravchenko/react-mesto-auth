import React from 'react';
import { ReactComponent as HeaderLogo } from '../images/__logo_white.svg';

function Header() {
  return (
    <header className="header">
      <HeaderLogo className="header__logo" />
      {/* <img className="header__logo" src={<HeaderLogo />} /> */}
    </header>
  );
}

export default Header;