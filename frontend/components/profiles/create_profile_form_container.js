import { connect } from 'react-redux';
import ProfileForm from './profile_form';
import { createProfile, getProfile } from '../../actions/profile_actions';

const mSTP = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    profile: { 
      user_id: state.session.id, 
      fname: "", zipcode: "", bio: "", 
      identify_as: "", looking_for: "", 
      compatibility_answers: ""
    },
    formType: "Create"
  }
}

const mDTP = (dispatch) => {
  return {
    action: (profile) => dispatch(createProfile(profile)),
    getProfile: (profileId) => dispatch(getProfile(profileId))
  }
}

export default connect(mSTP, mDTP)(ProfileForm);