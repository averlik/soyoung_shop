import React from 'react';
import '../css/Navbar.css';
import { observer } from 'mobx-react-lite';

const NavbarClone = observer(() => {
  return (
    <div className="fixed-navbar-clone">
      {/* Этот div будет отображаться под NavBar с фиксированной позицией */}
    </div>
  );
});

export default NavbarClone;
