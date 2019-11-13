import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileEditContainer } from './profile_form_container';

class ProfileShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.formType = null;
  }

  componentDidMount() {
    this.props.getProfile(this.props.profileId);
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  render() {
    let photoLis;
    let ownProfileLinks;

    if (this.props.profile.photo_urls) {
      photoLis = this.props.profile.photo_urls.map((photo, i) => {
        return <li className="profile-show-photos-item" key={i}><img src={photo.url} className="profile-show-photo" /></li>
      })
    }
    
    if (this.props.currentUserId === this.props.profile.user_id) {
      ownProfileLinks = (
        <div className="own-profile-links">
          <Link to={`/profiles/${this.props.currentUserId}/edit`}>Edit Profile</Link>
        </div>
      )
    }


    return (
      <div className="profile-show-main">
        
        <ul className="profile-show-photos-list">
          {photoLis}
        </ul>

        <ul className="profile-show-info-list">
          <li className="profile-show-info-item"><div id="profile-show-name">{this.props.profile.fname || "profile doesn't exist yet!"}</div></li>
          <li className="profile-show-info-item"><div className="profile-show-info-description">Identifies as:</div> <div className="profile-show-info-response">{this.props.profile.identify_as || "n/a"}</div></li>
            <div className="profile-show-info-divider"></div>
          <li className="profile-show-info-item"><div className="profile-show-info-description">Looking for:</div> <div className="profile-show-info-response">{this.props.profile.looking_for || "n/a"}</div></li>
            <div className="profile-show-info-divider"></div> 
          <li className="profile-show-info-item"><div className="profile-show-info-description">Location:</div> <div className="profile-show-info-response">{this.props.profile.zipcode || "n/a"}</div></li>
            <div className="profile-show-info-divider"></div>
          <li className="profile-show-info-item"><div className="profile-show-info-description">Bio:</div> <div className="profile-show-info-response">{this.props.profile.bio || "n/a"}</div></li>
            <div className="profile-show-info-divider"></div>
          <li className="profile-show-info-item"><div className="profile-show-info-description">Compatibility Answers:</div> <div className="profile-show-info-response">{this.props.profile.compatibility_answers || "n/a"}</div></li>
        </ul>

      </div>
    )
  }
}

export default ProfileShow;