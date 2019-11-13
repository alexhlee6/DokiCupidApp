import React from "react";
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import MainContainer from './main/main_container';

const App = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrap">
        <MainContainer />
      </div>
      <Footer />
    </div>
  )
};

export default App;