import { receiveCurrentUser } from './session_actions';

export const updatePhoto = (data, userId) => dispatch => {
  $.ajax({
    method: "PATCH",
    url: `/api/users/${userId}`,
    data: data,
    contentType: false,
    processData: false
  }).then(
    user => dispatch(receiveCurrentUser(user))
  )
}

export const getCurrentUser = (currentUserId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${currentUserId}`
  }).then(
    user => dispatch(receiveCurrentUser(user))
  )
}