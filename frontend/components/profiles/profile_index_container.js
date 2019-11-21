import React from 'react';
import { connect } from 'react-redux';
import ProfileIndex from './profile_index';
import { getProfiles } from '../../actions/profile_actions';

const mSTP = (state) => {
  let currentUserProfile;
  if (state.entities.profiles instanceof Array) {
    for (let i = 0; i < state.entities.profiles.length; i++) {
      if (state.entities.profiles[i].user_id === state.session.id) {
        currentUserProfile = state.entities.profiles[i];
      } 
    }
  }

  return {
    profiles: state.entities.profiles,
    currentUserId: state.session.id,
    currentUserProfileId: parseInt(state.entities.users[state.session.id].profileId) || null,
    currentUserProfile 
  }
}

const mDTP = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  }
}


export default connect(mSTP, mDTP)(ProfileIndex);