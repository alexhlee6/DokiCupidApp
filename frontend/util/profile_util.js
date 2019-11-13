export const getProfiles = () => {
  return $.ajax({
    method: "GET",
    url: "/api/profiles"
  })
}

export const getProfile = (profileId) => {
  return $.ajax({
    method: "GET",
    url: `/api/profiles/${profileId}`
  })
}

export const postProfile = (profile) => {
  return $.ajax({
    method: "POST",
    url: "/api/profiles",
    data: { profile }
  })
}

export const patchProfile = (profile) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/profiles/${profile.id}`,
    data: { profile }
  })
}

export const deleteProfile = (profileId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/profiles/${profileId}`
  })
}