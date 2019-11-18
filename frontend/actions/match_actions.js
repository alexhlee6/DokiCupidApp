import * as MatchApiUtil from '../util/match_util';

export const RECEIVE_MATCHES = "RECEIVE_MATCHES";
export const RECEIVE_MATCH = "RECEIVE_MATCH";
export const REMOVE_MATCH = "REMOVE_MATCH";


const receiveMatches = (matches) => ({
  type: RECEIVE_MATCHES,
  matches
})

const receiveMatch = (match) => ({
  type: RECEIVE_MATCH,
  match
})

const removeMatch = (matchId) => ({
  type: REMOVE_MATCH,
  matchId
})


export const getMatches = () => dispatch => {
  return MatchApiUtil.getMatches().then(matches => dispatch(receiveMatches(matches)))
}

export const getMatch = (matchId) => dispatch => {
  return MatchApiUtil.getMatch(matchId).then(match => dispatch(receiveMatch(match)))
}

export const createMatch = (match) => dispatch => {
  return MatchApiUtil.postMatch(match).then(match => dispatch(receiveMatch(match)))
}

export const deleteMatch = (matchId) => dispatch => {
  return MatchApiUtil.deleteMatch(matchId).then(matchId => dispatch(removeMatch(matchId)))
}