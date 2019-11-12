import { connect } from 'react-redux';
import React from 'react';
import Main from './main';

const msp = (state) => {
  console.log(state)
  return {
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id]
  }
}


export default connect(msp)(Main)