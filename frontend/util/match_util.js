export const getMatches = () => {
  return $.ajax({
    method: "GET",
    url: "/api/matches"
  })
}


export const findCompatibility = (userAnswers, otherAnswers) => {
  let currentUserAnswers = userAnswers.split("/");
  otherAnswers = otherAnswers.split("/");
  
  let count = 0;
  for (let j = 0; j < 8; j++) {
    if (currentUserAnswers[j] === otherAnswers[j]) {
      count += 1;
    }
  }
  return Math.floor((count / 8) * 100)
}


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
    data: {match}
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

const zipcodes = require("zipcodes");

export const findDistance = (zipcode1, zipcode2) => {
  return zipcodes.distance(zipcode1, zipcode2);
}