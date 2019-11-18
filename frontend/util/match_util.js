export const getMatches = () => {
  return $.ajax({
    method: "GET",
    url: "/api/matches"
  })
}

// THIS WORKED FOR GETMATCHES:
// $.ajax({
//   method: "GET",
//   url: "/api/matches",
//   data: {
//     match: {
//       request_type: "getMatchRequests"
//     }
//   }
// })

export const getMatch = (matchId) => {
  return $.ajax({
    method: "GET",
    url: `/api/matches/${matchId}`
  })
}



export const postMatch = (match) => {
  return $.ajax({
    method: "POST",
    url: "/api/matches",
    data: match
  })
}

// THIS WORKED FOR POST MATCH:
// $.ajax({
//   method: "POST",
//   url: "/api/matches",
//   data: {
//     match: {
//       user_id: 2,
//       requested_user_id: 8
//     }
//   }
// })
// RETURNED: 
// 1: {
//   id: 1
//   is_matched: false
//   matched_user_id: 8
//   user_id: 2
// }
// SECOND POSTMATCH => is_matched = true:
// $.ajax({
//   method: "POST",
//   url: "/api/matches",
//   data: {
//     match: {
//       user_id: 8,
//       requested_user_id: 2
//     }
//   }
// })



export const deleteMatch = (matchId) => {
  return $.ajax({
    method: "GET",
    url: `/api/matches/${matchId}`
  })
}