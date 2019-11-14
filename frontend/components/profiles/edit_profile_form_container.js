import { connect } from 'react-redux';
import ProfileForm from './profile_form';
import { updateProfile, getProfile } from '../../actions/profile_actions';

const mSTP = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  let profile;

  profile = (state.entities.profiles[parseInt(currentUser.profileId)]) ? (
    state.entities.profiles[parseInt(currentUser.profileId)]
  ) : (
    {
      user_id: state.session.id,
      fname: "", zipcode: "", bio: "",
      identify_as: "", looking_for: "",
      compatibility_answers: ""
    }
  )

  return {
    currentUser,
    profile,
    profileId: currentUser.profileId,
    formType: "Edit"
  }
}

const mDTP = (dispatch) => {
  return {
    getProfile: (profileId) => dispatch(getProfile(profileId)),
    action: (profile) => dispatch(updateProfile(profile))
  }
}

export default connect(mSTP, mDTP)(ProfileForm);