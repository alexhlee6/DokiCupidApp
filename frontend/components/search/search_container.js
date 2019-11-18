import { connect } from 'react-redux';
import Search from './search';
import { getProfiles } from '../../actions/profile_actions';


const mSTP = (state) => {
  return {
    profiles: state.entities.profiles,
    currentUserId: state.session.id,
    currentUserProfileId: parseInt(state.entities.users[state.session.id].profileId) || null
  }
}

const mDTP = (dispatch) => {
  return {
    getProfiles: () => dispatch(getProfiles()),
  }
}




export default connect(mSTP, mDTP)(Search);