import { connect } from 'react-redux';
import ProfileForm from './profile_form';
import { createProfile, getProfile } from '../../actions/profile_actions';

const mSTP = (state, ownProps) => {
  let currentUserId = state.entities.users[state.session.id];

  let foundProfile = null;

  if (Object.values(state.entities.profiles).length > 0) {
    let profiles = Object.values(state.entities.profiles);
    
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i].user_id === currentUserId) {
        foundProfile = profiles[i];
      }
    }
  }
  let currentUser = state.entities.users[state.session.id];
  return {
    currentUser,
    profile: state.entities.profiles[currentUser.profileId] || { 
      user_id: state.session.id, 
      fname: "", zipcode: "", bio: "", 
      identify_as: "", looking_for: "", 
      compatibility_answers: ""
    },
    formType: "Create",
    foundProfile
  }
}

const mDTP = (dispatch) => {
  return {
    action: (profile) => dispatch(createProfile(profile)),
    getProfile: (profileId) => dispatch(getProfile(profileId))
  }
}

export default connect(mSTP, mDTP)(ProfileForm);