import React from 'react';
import { Link } from 'react-router-dom';

class ProfileIndex extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
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

  render() {
    let profileItems = this.randomizeOrder(this.state.profiles);

    if (profileItems.length > 0) {
      profileItems = this.state.profiles.map((profile, i) => {
        if (profile.user_id === this.props.currentUserId) {
          return "";
        } else {
          return (
            <Link to={`/profiles/${profile.id}`} className="profile-index-item-link">
              <li key={profile.user_id} className="profile-index-item">

                <div className="profile-index-user-fname">{profile.fname}</div>
                <div className="profile-index-user-photo-container">
                  <img className="profile-index-user-photo" src={profile.photo_url} />
                </div>
                <div className="profile-index-user-zipcode">{profile.zipcode}</div>
                <div className="profile-index-user-compatibility">{profile.compatibility_answers}</div>
              </li>
            </Link>
          )
        }
      })
    }


    return (
      <div className="profile-index-main">
        <h1 className="profile-index-title">Explore</h1>

        <ul className="profile-index-list">
          {profileItems}
        </ul>

      </div>
    )
  }

}

export default ProfileIndex