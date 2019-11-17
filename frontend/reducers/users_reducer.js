import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { REMOVE_PROFILE, RECEIVE_PROFILE } from '../actions/profile_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log(state);
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    case REMOVE_PROFILE: 
      let newUsersState = Object.assign({}, state, {[action.user.id]: action.user} );
      return newUsersState;
    case RECEIVE_PROFILE: 
      let receivedState = Object.assign({}, state);
      let userId = action.profile.user_id;
      if (receivedState[userId]) {
        if (receivedState[userId].profileId === "") {
          receivedState[userId].profileId = action.profile.id;
        }
      }
      return receivedState;
    default:
      return state;
  }
}

export default usersReducer;