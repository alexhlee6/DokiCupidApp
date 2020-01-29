import React from 'react';
import { Link } from 'react-router-dom';
import { quickSortNums } from "../../util/match_util";

const SearchResults = ({ conditions, currentUserId }) => {
  if (!conditions || !conditions.profiles) return null;
  // console.log(conditions);
  for (let i = 0; i < conditions.profiles.length; i++) {
    if (conditions.profiles[i].user_id === currentUserId) break;
    if (i === conditions.profiles.length - 1) return (
      <h3 className="search-restricted">
        You need to create a profile to use this feature! <i className="far fa-smile-wink"></i>
      </h3>
    )
  }
  
  const profilesObj = {};
  conditions.profiles.forEach(profile => {
    if (profile.user_id !== parseInt(currentUserId)) {
      profilesObj[profile.id] = profile;
    }
  });

  let tagNames = [
    "identify_as", "looking_for", "specific_tag", "match_percentage", "distance"
  ];
  for (let i = 0; i < 5; i++) {
    if (conditions[tagNames[i]].length > 0) break;
    if (i === 4) return null;
  }

  //===========================================================================

  // FILTERING (Gender, Looking For, Specific Personality Tag):
  if (conditions.identify_as !== "") {
    let selectedGender = conditions.identify_as;
    for (let key in profilesObj) {
      if (profilesObj[key].identify_as !== selectedGender) delete profilesObj[key];
    }
  }
  if (conditions.looking_for !== "") {
    let selectedLookingFor = conditions.looking_for;
    for (let key in profilesObj) {
      if (profilesObj[key].looking_for !== selectedLookingFor) delete profilesObj[key];
    }
  }
  if (conditions.specific_tag !== "") {
    let selectedTag = conditions.specific_tag;
    for (let key in profilesObj) {
      if (!profilesObj[key].compatibility_answers.split("/").includes(selectedTag)) {
        delete profilesObj[key];
      }
    }
  }

  //===========================================================================

  // SORTING (Match Percentage, Distance):
  let profilesArr = [];
  if (conditions.match_percentage === "" && conditions.distance === "") {
    profilesArr = Object.values(profilesObj);
  } else {
    let selectedSortObj = (conditions.distance.length === 0 ? 
      conditions.matchPercentages : conditions.distances
    );
    let unsortedObj = Object.assign({}, selectedSortObj);
    for (let key in unsortedObj) {
      if (!profilesObj[key]) delete unsortedObj[key];
    }
    let unsortedArr = Object.values(unsortedObj);
    let sortedArr = quickSortNums(unsortedArr);
    if (conditions.match_percentage === "Decreasing" || conditions.distance === "Far to Near") {
      sortedArr.reverse();
    }
    let newFillArray = new Array(sortedArr.length);
    for (let key in unsortedObj) {
      let position = sortedArr.indexOf(unsortedObj[key]);
      newFillArray[position] = profilesObj[key];
      sortedArr[position] = null;
    }
    profilesArr = newFillArray;
  }

  let listItems = [];
  profilesArr.forEach(profile => {
    let item = (
      <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
        <li key={profile.user_id} className="profile-index-item">

          <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
          <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
            <img className="profile-index-user-photo" src={profile.photo_url} />
          </div>
          <div key={`compat-${profile.user_id}`} className="profile-index-user-compatibility">
            {conditions.matchPercentages[profile.id]}% Match
          </div>
          <div key={`dist-${profile.zipcode}`} 
            className="profile-index-user-compatibility" style={{"color": "gray"}}
          >
            {conditions.distances[profile.id]} Miles Away
          </div>
        </li>
      </Link>
    );
    listItems.push(item)
  });

  return (
    <ul className="profile-index-list search-results">
      {listItems}
      <li key="hidden-1" className="profile-index-item-hidden"></li>
      <li key="hidden-2" className="profile-index-item-hidden"></li>
      <li key="hidden-3" className="profile-index-item-hidden"></li>
      <li key="hidden-4" className="profile-index-item-hidden"></li>
    </ul>
  )
}

export default SearchResults;