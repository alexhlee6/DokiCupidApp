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
        <li><a href="https://github.com/alex629lee/DokiCupidApp">Github</a></li>
        <li><a href="https://www.linkedin.com/in/alex-lee-b09a7310a/">LinkedIn</a></li>
      </ul>
    </footer>
  )
}

export default Footer;