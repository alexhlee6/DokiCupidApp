import * as ProfileApiUtil from '../util/profile_util';

export const RECEIVE_PROFILES = "RECEIVE_PROFILES";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
import { receiveCurrentUser } from './session_actions';



const receiveProfiles = (profiles) => ({
  type: RECEIVE_PROFILES,
  profiles
})

const receiveProfile = (profile) => ({
  type: RECEIVE_PROFILE,
  profile
})

const removeProfile = (data) => ({
  type: REMOVE_PROFILE,
  profileId: data.profile.id,
  user: data.user
})

export const getProfiles = () => dispatch => {
  return ProfileApiUtil.getProfiles().then(profiles => {
    dispatch(receiveProfiles(profiles))
  })
}

export const getProfile = (profileId) => dispatch => {
  return (
    ProfileApiUtil.getProfile(profileId)
      .then (
        profile => dispatch(receiveProfile(profile)),
        err => dispatch({type: 404})
      )
  )
}


export const createProfile = (profile) => dispatch => {
  return ProfileApiUtil.postProfile(profile).then(profile => {
    dispatch(receiveProfile(profile))
  })
}

export const updateProfile = (profile, profileId) => dispatch => {
  return ProfileApiUtil.patchProfile(profile, profileId).then(profile => {
    dispatch(receiveProfile(profile))
  })
}

export const deleteProfile = (profileId) => dispatch => {
  return ProfileApiUtil.deleteProfile(profileId).then(data => { //data has user and profile objects
    dispatch(removeProfile(data))
  })
}