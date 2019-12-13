export const getUser = (userId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}


export const getUsers = (currentUserId) => {
  return $.ajax({
    method: "GET",
    url: `/api/users`,
    data: { current_user_id: currentUserId }
  })
}