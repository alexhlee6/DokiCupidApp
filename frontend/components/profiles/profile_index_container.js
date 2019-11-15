import React from 'react';
import { connect } from 'react-redux';
import ProfileIndex from './profile_index';
import { getProfiles } from '../../actions/profile_actions';

const mSTP = (state) => {
  console.log(state);

  return {
    profiles: state.entities.profiles,
    currentUserId: state.session.id
  }
}

const mDTP = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),

  }
}


export default connect(mSTP, mDTP)(ProfileIndex);