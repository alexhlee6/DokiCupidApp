import React from 'react';
import { Link } from 'react-router-dom';
import { quickSortNums } from "../../util/match_util";

const SearchResults = ({ conditions, currentUserId }) => {
  let displayedProfiles;
  let selectedTags = {};

  if (conditions && conditions.profiles) {
    let profiles = Object.values(conditions.profiles);
    let tagNames = Object.keys(conditions);

    for (let i = 0; i < tagNames.length; i++) {
      if ((tagNames[i] !== "profiles" && tagNames[i] !== "matchPercentages") && conditions[tagNames[i]].length > 0) {
        selectedTags[tagNames[i]] = conditions[tagNames[i]];
      }
    }


    // ORDERING BY DISTANCE:
    let profilesObj = {};
    profiles.forEach(profile => profilesObj[profile.id] = profile);

    if (conditions && conditions.distance.length > 0) {
      let distVals = Object.values(conditions.distances);
      let orderedDist = quickSortNums(distVals);
      if (conditions.distance === "Far to Near") {
        orderedDist = orderedDist.reverse();
      }
      let distOrderedProfiles = new Array(orderedDist.length);
      for (let key in conditions.distances) {
        let val = conditions.distances[key];
        
        let distIdx = orderedDist.indexOf(val);
        if (distIdx !== -1) distOrderedProfiles[distIdx] = profilesObj[key];
      }
      console.log(distOrderedProfiles);
      profiles = distOrderedProfiles;
    }



    // ORDERING BY MATCH PERCENTAGE:
    if (conditions && conditions.match_percentage.length > 0) {
      let scores = Object.values(conditions.matchPercentages);
      if (conditions.match_percentage === "Decreasing") {
        scores = scores.sort().reverse();

        if (scores.includes(100)) {
          let fixedScores = [];
          let hundreds = [];
          for (let i = 0; i < scores.length; i++) {
            if (scores[i] === 100) {
              hundreds.push(scores[i]);
            } else {
              fixedScores.push(scores[i]);
            }
          }
          scores = hundreds.concat(fixedScores);
        }

      } else if (conditions.match_percentage === "Increasing") {
        scores = scores.sort();
        if (scores.includes(100)) {
          let fixedScores = [];
          let hundreds = [];
          for (let i = 0; i < scores.length; i++) {
            if (scores[i] === 100) {
              hundreds.push(scores[i]);
            } else {
              fixedScores.push(scores[i]);
            }
          }
          scores = fixedScores.concat(hundreds);
        }
      }

      let oldProfiles = [...profiles];
      let newProfiles = [];

      while (scores.length > 0) {
        for (let i = 0; i < oldProfiles.length; i++) {
          let profileId = oldProfiles[i].id;
          if (conditions.matchPercentages[profileId] === scores[0]) {
            newProfiles.push(oldProfiles[i]);
            oldProfiles[i] = { id: null };
            scores = scores.slice(1);
            break;
          }
        }
      }
      profiles = newProfiles;
    }
    console.log(selectedTags);

    let selectedTagNames;

    if (Object.keys(selectedTags).length > 0) {
      selectedTagNames = Object.keys(selectedTags);
      displayedProfiles = profiles.map((profile, i) => {
        let profilePersonalityTags = profile.compatibility_answers.split("/");

        for (let j = 0; j < selectedTagNames.length; j++) {
          if (profile.fname === "DemoUser" || profile.user_id === currentUserId) return;
          if (selectedTagNames[j].toString() === "specific_tag") {
            if (!profilePersonalityTags.includes(selectedTags["specific_tag"])) {
              return;
            } else {
              if (j === selectedTagNames.length - 1) {
                let compat;
                if (Object.keys(conditions.matchPercentages > 0)) {
                  compat = conditions.matchPercentages[profile.id].toString() + "% Match";
                }
                return (
                  <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
                    <li key={profile.user_id} className="profile-index-item">

                      <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
                      <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
                        <img className="profile-index-user-photo" src={profile.photo_url} />
                      </div>
                      <div key={`compat-${profile.user_id}`} className="profile-index-user-compatibility">{compat}</div>

                    </li>
                  </Link>
                )
              } else {
                continue;
              }
            }
          } else if (selectedTagNames[j] !== "match_percentage" && profile[selectedTagNames[j]] !== selectedTags[selectedTagNames[j]]) {
            return;
          }
          if (j === selectedTagNames.length - 1) {
            let compat;
            if (Object.keys(conditions.matchPercentages > 0)) {
              compat = conditions.matchPercentages[profile.id].toString() + "% Match";
            }
            return (

              <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
                <li key={profile.user_id} className="profile-index-item">

                  <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
                  <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
                    <img className="profile-index-user-photo" src={profile.photo_url} />
                  </div>
                  <div key={`compat-${profile.user_id}`} className="profile-index-user-compatibility">{compat}</div>
                </li>
              </Link>
            );
          }
        }
      })
    }
  }


  return (
    <ul className="profile-index-list search-results">
      {displayedProfiles}
      <li key="hidden-1" className="profile-index-item-hidden"></li>
      <li key="hidden-2" className="profile-index-item-hidden"></li>
      <li key="hidden-3" className="profile-index-item-hidden"></li>
      <li key="hidden-4" className="profile-index-item-hidden"></li>
    </ul>
  )

}

export default SearchResults;