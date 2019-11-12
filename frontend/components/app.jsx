import React from "react";
// import GreetingContainer from "./greeting/greeting_container";
import { Route } from 'react-router-dom';
// import LoginFormContainer from './user_auth/login_form_container';
// import SignupFormContainer from './user_auth/signup_form_container';
// import { AuthRoute } from '../util/route_util';
import Navbar from './navbar';
import Footer from './footer';
import MainContainer from './main_container';

const App = () => {
  return (
    <div>
      <Navbar />
      <MainContainer />
    {/* <AuthRoute path="/login" component={LoginFormContainer} />
    <AuthRoute path="/signup" component={SignupFormContainer} /> */}
    {/* <Route exact path="/" component={Splash} /> */}
      <Footer />
    {/* <Route exact path="/" component={SearchContainer} /> */}
    </div>
  )
};

export default App;