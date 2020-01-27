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
        <li><a href="https://www.alexhlee.dev">Portfolio</a></li>
        <li><a href="https://github.com/alex629lee/DokiCupidApp">Github</a></li>
        <li><a href="https://www.linkedin.com/in/alex629lee/">LinkedIn</a></li>
      </ul>
    </footer>
  )
}

export default Footer;