import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const display = currentUser ? (
    <div>
      <h2 className="header-greeting">Greetings, {currentUser.username}</h2>
      <button onClick={logout}>logout</button>
    </div>
  ) : (
      <div>
        <Link className="session-link" to="/signup">Sign Up</Link>
        <Link className="session-link" to="/login">Log In</Link>
      </div>
    );

  return display;
};

export default Greeting;
