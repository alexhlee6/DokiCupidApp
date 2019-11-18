import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ conditions, currentUserId }) => {

  let displayedProfiles;
  let selectedTags = {};

  if (conditions && conditions.profiles) {
    let profiles = Object.values(conditions.profiles);

    let tagNames = Object.keys(conditions);

    for (let i = 0; i < tagNames.length; i++) {
      if (tagNames[i] !== "profiles" && conditions[tagNames[i]].length > 0 ) {
        selectedTags[tagNames[i]] = conditions[tagNames[i]];
      }
    }
    
    let selectedTagNames;

    if (Object.keys(selectedTags).length > 0) {
      selectedTagNames = Object.keys(selectedTags);

      displayedProfiles = profiles.map((profile, i) => {
        let profilePersonalityTags = profile.compatibility_answers.split("/");
        
        for (let j = 0; j < selectedTagNames.length; j++) {
          if (profile.fname === "DemoUser" || profile.user_id === currentUserId) {
            return;
          }
          if (selectedTagNames[j].toString() === "specific_tag") {
            if (!profilePersonalityTags.includes(selectedTags["specific_tag"])) {
              return;
            } else {
              if (j === selectedTagNames.length - 1) {
                return (
                  <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
                    <li key={profile.user_id} className="profile-index-item">

                      <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
                      <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
                        <img className="profile-index-user-photo" src={profile.photo_url} />
                      </div>
                    </li>
                  </Link>
                )
              } else {
                continue;
              }
            }
          } else if (profile[selectedTagNames[j]] !== selectedTags[selectedTagNames[j]]) {
            return;
          } 
          if (j === selectedTagNames.length - 1) {
            return (
              <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
                <li key={profile.user_id} className="profile-index-item">

                  <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
                  <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
                    <img className="profile-index-user-photo" src={profile.photo_url} />
                  </div>
                  {/* <div key={`zipcode-${profile.user_id}`} className="profile-index-user-zipcode">{profile.zipcode}</div> */}
                </li>
              </Link>
            );
          }
        }
      })
    }
  }
  
  
  return (
    <ul className="search-results-list">
      {displayedProfiles}
    </ul>
  )

}

export default SearchResults;