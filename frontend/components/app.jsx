import React from "react";
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import MainContainer from './main_container';

const App = () => {
  return (
    <div>
      <Navbar />
      <MainContainer />
      <Footer />
    </div>
  )
};

export default App;