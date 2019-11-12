import LoginFormContainer from './user_auth/login_form_container';
import SignupFormContainer from './user_auth/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home  from './home';
import Splash from './splash';

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-component">
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute exact path="/" component={Splash} />

        <Route
          exact
          path="/"
          render={() => (this.props.currentUser ? <Redirect to="/home" /> : <Redirect to="/" />)}
        />

        <ProtectedRoute exact path="/home" component={Home} />
      </div>
    )
  }
}


export default Main;