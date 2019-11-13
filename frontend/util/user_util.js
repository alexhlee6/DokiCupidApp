export const getUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}



// BACKEND NOT COMPLETED: 

export const patchUser = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  })
}

export const getUsers = (currentUserId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users`,
    data: { current_user_id: currentUserId }
  })
}