import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
  const display = currentUser ? (
    <div className="navbar-greeting">
      <Link to="/profile" className="navbar-greeting-username">{currentUser.username}</Link>
      {/* <button className="navbar-logout-button" onClick={logout}>logout</button> */}
      <a className="navbar-logout-link" onClick={logout}><i class="fas fa-power-off"></i></a>
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
