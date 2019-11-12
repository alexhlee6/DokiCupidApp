import React from 'react';
import GreetingContainer from "./greeting/greeting_container";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className="header-navbar">
        <span className="header-logo">
          <Link to="/">
            <span className="header-logo-inner">doki</span>cupid
          </Link>
        </span>
        
        <GreetingContainer />
      </nav>
    </header>
  )
}

export default Navbar