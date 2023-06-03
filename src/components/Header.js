import React from 'react';
import headerLogo from '../images/__logo_white.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} />
    </header>
  );
}

export default Header;