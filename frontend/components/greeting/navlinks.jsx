import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const NavLinks = ({ currentUser }) => {

  const display = currentUser ? (

    <div>
      <ul className="navlinks">
        <li>
          <Link to="/home">
            <i className="fas fa-home"></i>
            <span className="navlink-description">Doubletake</span>
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <i className="fas fa-compass"></i>
            <span className="navlink-description">Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/search">
            <i className="fas fa-search"></i>
            <span className="navlink-description">Search</span>
          </Link>
        </li>
        <li>
          <Link to="/matches/my-matches">
            <i className="fas fa-heart"></i>
            <span className="navlink-description">Matches</span>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <i className="fas fa-comment"></i>
            <span className="navlink-description">Messages</span>
          </Link>
        </li>
      </ul>
    </div>

  ) : (
    <div>
    </div>
  );

  return display;

}

export default NavLinks;