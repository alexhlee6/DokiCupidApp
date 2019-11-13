import { connect } from 'react-redux';
import ProfileShow from './profile_show';
import { getProfile } from '../../actions/profile_actions';

const mSTP = (state, ownProps) => {
  return {
    profileId: ownProps.match.params.profileId,
    profile: state.entities.profiles[ownProps.match.params.profileId] || {}
  }
}

const mDTP = (dispatch) => {
  return {
    getProfile: (profileId) => dispatch(getProfile(profileId))
  } 
}



export default connect(mSTP, mDTP)(ProfileShow);