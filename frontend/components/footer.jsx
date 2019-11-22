import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-left">
        Created by: Alex Lee
      </span>
      <ul className="footer-right">
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/about">About</Link></li> */}
        <li></li>
      </ul>
    </footer>
  )
}

export default Footer;