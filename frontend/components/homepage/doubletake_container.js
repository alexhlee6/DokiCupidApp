import { connect } from 'react-redux';
import Doubletake from './doubletake';
import { getProfiles } from '../../actions/profile_actions';
import { getCurrentUser } from '../../actions/user_actions';

const mSTP = (state) => {
  let currentUser = state.entities.users[state.session.id]
  let currentUserCompatibility;
  if (state.entities.profiles instanceof Array && currentUser.profileId !== "") {
    state.entities.profiles.forEach(profile => {
      if (profile.user_id === currentUser.id) {
        currentUserCompatibility = profile.compatibility_answers;
      }
    })
  } 

  return {
    currentUser,
    currentUserProfileId: parseInt(state.entities.users[state.session.id].profileId) || null,
    profiles: state.entities.profiles,
    currentUserCompatibility
  }
}

const mDTP = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
    getCurrentUser: (currentUserId) => getCurrentUser(currentUserId)
  }
}


export default connect(mSTP, mDTP)(Doubletake);