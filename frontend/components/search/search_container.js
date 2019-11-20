import { connect } from 'react-redux';
import Search from './search';
import { getProfiles } from '../../actions/profile_actions';


const mSTP = (state) => {
  let currentUserProfileId = parseInt(state.entities.users[state.session.id].profileId);
  let currentUserProfile;

  if (state.entities.profiles instanceof Array) {
    state.entities.profiles.forEach(profile => {
      if (profile.id === currentUserProfileId) {
        currentUserProfile = profile;
      }
    })
  }

  return {
    profiles: state.entities.profiles,
    currentUserId: state.session.id,
    currentUserProfileId,
    currentUserProfile
  }
}

const mDTP = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  }
}




export default connect(mSTP, mDTP)(Search);