import React from 'react';
import { Link } from 'react-router-dom';

class ProfileIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      locations: {}
    }
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({profiles: this.props.profiles})
    }
  }

  randomizeOrder(users) {
    for (let i = users.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }
    return users;
  }

  findCompatibility(otherAnswers) {
    let currentUserAnswers;
    otherAnswers = otherAnswers.split("/");
    for (let i = 0; i < this.props.profiles.length; i++) {
      if ( this.props.profiles[i].user_id === this.props.currentUserId ) {
        currentUserAnswers = this.props.profiles[i].compatibility_answers.split("/")
      }
    }
    let count = 0;
    for (let j = 0; j < 8; j++) {
      if (currentUserAnswers[j] === otherAnswers[j]) {
        count += 1;
      }
    }
    return Math.floor( (count / 8) * 100 )
  }

  render() {
    let profileItems = this.randomizeOrder(this.state.profiles);

    if (profileItems.length > 0) {
      profileItems = this.state.profiles.map((profile, i) => {
        if (profile.user_id === this.props.currentUserId || profile.fname === "DemoUser") {
          return "";
        } else {
          let newCompatibilityNum;
          let newCompatibility;
          if (this.props.currentUserProfileId) {
            newCompatibilityNum = this.findCompatibility(profile.compatibility_answers);
            newCompatibility = <div key={`compat-${i}`} className="profile-index-user-compatibility">{newCompatibilityNum}% Match</div>
          } else {
            newCompatibility = <div key={`compat-${i}`} className="profile-index-user-compatibility-missing">Create a profile to see your match percentage!</div>
          }
    
          return (
            <Link key={`item-${profile.user_id}`} to={`/profiles/${profile.id}`} className="profile-index-item-link">
              <li key={profile.user_id} className="profile-index-item">

                <div key={`fname-${profile.user_id}`} className="profile-index-user-fname">{profile.fname}</div>
                <div key={`photocontainer-${profile.user_id}`} className="profile-index-user-photo-container">
                  <img className="profile-index-user-photo" src={profile.photo_url} />
                </div>
                <div key={`zipcode-${profile.user_id}`} className="profile-index-user-zipcode">{profile.zipcode}</div>
                { newCompatibility }
              </li>
            </Link>
          )
        }
      })
    }


    return (
      <div className="profile-index-main">
        <div className="page-header">
          <h1 className="page-title">Explore</h1>
        </div>
        <ul className="profile-index-list">
          {profileItems}
          <li className="profile-index-item-hidden" key="item-hidden-1"></li>
          <li className="profile-index-item-hidden" key="item-hidden-2"></li>
          <li className="profile-index-item-hidden" key="item-hidden-3"></li>
          <li className="profile-index-item-hidden" key="item-hidden-4"></li>
        </ul>

      </div>
    )
  }

}

export default ProfileIndex