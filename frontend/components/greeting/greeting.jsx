import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const display = currentUser ? (
    <div>
      <h2 className="header-greeting">Greetings, {currentUser.username}</h2>
      <button onClick={logout}>logout</button>
    </div>
  ) : (
      <div>
        <Switch>
          <Route exact path="/login" 
            render={() => (
              <div>
                <Link className="session-link" to="/demo-login">Demo Login</Link>
                <Link className="session-link" to="/signup">Sign Up</Link>
              </div>
          )}/>

          <Route exact path="/signup" 
            render={() => (
              <div>
                <Link className="session-link" to="/demo-login">Demo Login</Link>
                <Link className="session-link" to="/login">Log In</Link>
              </div>
          )}/>

          <Route exact path="/demo-login"
            render={() => (
              <div>
                <Link className="session-link" to="/signup">Sign Up</Link>
                <Link className="session-link" to="/login">Log In</Link>
              </div>
            )} />

          <Route exact path="/" render={() => (
            <div>
              <Link className="session-link" to="/demo-login">Demo Login</Link>
              <Link className="session-link" to="/signup">Sign Up</Link> 
              <Link className="session-link" to="/login">Log In</Link>
            </div>
          )} />
        </Switch>
      </div>
    );

  return display;
};

export default Greeting;
