import { RECEIVE_PROFILES, RECEIVE_PROFILE, REMOVE_PROFILE } from '../actions/profile_actions';

const profilesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_PROFILES: 
      return action.profiles;
    case RECEIVE_PROFILE: 
      let newState = Object.assign({}, state);
      newState[action.profile.id] = action.profile;
      return newState;
    case REMOVE_PROFILE: 
      let removedState = Object.assign({}, state);
      delete removedState[action.profileId];
      return removedState;
    default: 
      return state;
  }
}

export default profilesReducer;