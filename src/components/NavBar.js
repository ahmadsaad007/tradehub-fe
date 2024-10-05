import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">HomePage</Link></li>
        <li><Link to="/login">Login/SignUp</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/sell">Sell</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;