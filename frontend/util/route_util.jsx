import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//-------------------------------------------------------------------------

//AUTH ROUTE:

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mspAuth = state => {
  return { loggedIn: Boolean(state.session.id) };
};

export const AuthRoute = withRouter(
  connect(
    mspAuth,
    null
  )(Auth)
);



//-------------------------------------------------------------------------

//PROTECTED ROUTE


const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mspProtected = state => {
  return { loggedIn: Boolean(state.session.id) };
};

export const ProtectedRoute = withRouter(
  connect(
    mspProtected,
    null
  )(Protected)
);