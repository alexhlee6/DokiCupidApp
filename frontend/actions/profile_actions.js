import * as ProfileApiUtil from '../util/profile_util';

export const RECEIVE_PROFILES = "RECEIVE_PROFILES";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

const receiveProfiles = (profiles) => ({
  type: RECEIVE_PROFILES,
  profiles
})

const receiveProfile = (profile) => ({
  type: RECEIVE_PROFILE,
  profile
})

const removeProfile = (profileId) => ({
  type: REMOVE_PROFILE,
  profileId
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
        profile => dispatch(receiveProfile(profile))
        // err => dispatch({type: 404})
        // error => dispatch(receiveProfileErrors(error.responseJSON))
      )
  )
}


export const createProfile = (profile) => dispatch => {
  return ProfileApiUtil.postProfile(profile).then(profile => {
    dispatch(receiveProfile(profile))
  })
}

export const updateProfile = (profile) => dispatch => {
  return ProfileApiUtil.patchProfile(profile).then(profile => {
    dispatch(receiveProfile(profile))
  })
}

export const deleteProfile = (profileId) => dispatch => {
  return ProfileApiUtil.deleteProfile(profileId).then(profileId => {
    dispatch(removeProfile(profileId))
  })
}