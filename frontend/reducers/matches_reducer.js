import { RECEIVE_MATCHES, RECEIVE_MATCH, REMOVE_MATCH } from '../actions/match_actions';

const matchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MATCHES:
      return action.matches;
    case RECEIVE_MATCH: 
      let withMatch = Object.assign({}, state, { [action.match.id]: action.match });
      return withMatch;
    case REMOVE_MATCH: 
      let removedMatchState = Object.assign({}, state);
      delete removedMatchState[action.matchId];
      return removedMatchState;
    default: 
      return state;
  }
}

export default matchesReducer;