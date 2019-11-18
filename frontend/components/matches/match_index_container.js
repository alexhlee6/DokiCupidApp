import { connect } from 'react-redux';
import { getMatches, getMatch, createMatch, deleteMatch } from '../../actions/match_actions';
import MatchIndex from './match_index';

const mSTP = (state) => {
  return {
    matches: state.entities.matches
  }
}

const mDTP = (dispatch) => {
  return {
    getMatches: () => dispatch(getMatches()),
    getMatch: (matchId) => dispatch(getMatch(matchId)),
    createMatch: (match) => dispatch(createMatch(match)),
    deleteMatch: (matchId) => dispatch(deleteMatch(matchId))
  }
}

export default connect(mSTP, mDTP)(MatchIndex);