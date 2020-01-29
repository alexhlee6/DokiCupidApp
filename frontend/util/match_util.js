export const getMatches = () => {
  return $.ajax({
    method: "GET",
    url: "/api/matches"
  })
}


export const findCompatibility = (userAnswers, otherAnswers) => {
  if (!userAnswers || userAnswers === "") {
    return null;
  }

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


export const quickSortNums = (nums) => {
  if (nums.length < 2) return nums; 
  let pivot = nums.shift();

  let left = []
  let right = [];
  nums.forEach(num => {
    if (num < pivot) {
      left.push(num);
    } else {
      right.push(num);
    }
  });
  return quickSortNums(left).concat([pivot]).concat(quickSortNums(right));
}