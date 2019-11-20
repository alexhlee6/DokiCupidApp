import { connect } from 'react-redux';
import ProfileShow from './profile_show';
import { getProfile } from '../../actions/profile_actions';
import { getCurrentUser } from '../../actions/user_actions';
import { getMatch, getMatches, createMatch } from '../../actions/match_actions';

const mSTP = (state, ownProps) => {
  let currentUser = state.entities.users[state.session.id];

  return {
    currentUser,
    currentUserId: state.session.id,
    currentUserMatches: state.entities.matches,
    profileId: ownProps.match.params.profileId,
    currentUserMatches: currentUser.matches || {},
    profile: state.entities.profiles[ownProps.match.params.profileId] || {},
    currentUserZipcode: currentUser.zipcode || ""
  }
}

const mDTP = (dispatch) => {
  return {
    getProfile: (profileId) => dispatch(getProfile(profileId)),
    createMatch: (match) => dispatch(createMatch(match)),
    getCurrentUser: (currentUserId) => getCurrentUser(currentUserId)
  } 
}



export default connect(mSTP, mDTP)(ProfileShow);