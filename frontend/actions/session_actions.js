import { postUser, deleteSession, postSession } from '../util/session_api_util';


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const DISMISS_SESSION_ERRORS = "DISMISS_SESSION_ERRORS";


export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});


const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const dismissSessionErrors = () => ({
  type: DISMISS_SESSION_ERRORS,
})

export const signUp = formuser => dispatch => {
  return (
    postUser(formuser)
      .then(user => dispatch(receiveCurrentUser(user)),
        error => dispatch(receiveSessionErrors(error.responseJSON)))
  )
};

export const login = (formUser) => dispatch => (
  postSession(formUser)
    .then(user => dispatch(receiveCurrentUser(user)),
      error => dispatch(receiveSessionErrors(error.responseJSON)))
);

export const logout = () => dispatch => (
  deleteSession().then(() => dispatch(logoutCurrentUser()))
);

