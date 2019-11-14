import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileEditContainer } from './create_profile_form_container';

class ProfileShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.getProfile(this.props.profileId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props ) {
      this.setState({loading: false})
    }
  }

  render() {
    let photoLis;
    let ownProfileLink;
    console.log(this.props);


    if (this.props.profile.photo_urls) {
      photoLis = this.props.profile.photo_urls.map((photo, i) => {
        return <li className="profile-show-photos-item" key={i}><img src={photo.url} className="profile-show-photo" /></li>
      })
    }
    

    if (this.props.currentUserId === this.props.profile.user_id) {
      ownProfileLink = (
        <div className="own-profile-link">
          <Link to={`/profiles/${this.props.currentUserId}/edit`}>Edit Profile</Link>
        </div>
      )
    } else if (this.props.currentUserId.toString() === this.props.profileId && !this.state.loading) {
      ownProfileLink = (
        <div className="own-profile-link">
          <Link to={`/profiles/${this.props.currentUserId}/create`}>Create Profile</Link>
        </div>
      )
    }


    let infoListItems;
    if (!this.state.loading) {
      infoListItems = [
        <li className="profile-show-info-item"><div id="profile-show-name">{this.props.profile.fname || "404 Not Found"}</div></li>,
        <li className="profile-show-info-item"><div className="profile-show-info-description">Identifies as:</div> <div className="profile-show-info-response">{this.props.profile.identify_as || ""}</div></li>,
        <div className="profile-show-info-divider"></div>,
        <li className="profile-show-info-item"><div className="profile-show-info-description">Looking for:</div> <div className="profile-show-info-response">{this.props.profile.looking_for || ""}</div></li>,
        <div className="profile-show-info-divider"></div>,
        <li className="profile-show-info-item"><div className="profile-show-info-description">Location:</div> <div className="profile-show-info-response">{this.props.profile.zipcode || ""}</div></li>,
        <div className="profile-show-info-divider"></div>,
        <li className="profile-show-info-item"><div className="profile-show-info-description">Bio:</div> <div className="profile-show-info-response">{this.props.profile.bio || ""}</div></li>,
        <div className="profile-show-info-divider"></div>,
        <li className="profile-show-info-item"><div className="profile-show-info-description">Compatibility Answers:</div> <div className="profile-show-info-response">{this.props.profile.compatibility_answers || ""}</div></li>
      ]
    } else {
      infoListItems = ""
    }

    return (
      <div className="profile-show-main">
        {ownProfileLink}
        <ul className="profile-show-photos-list">
          {photoLis}
        </ul>

        
        <ul className="profile-show-info-list">
          { infoListItems }
        </ul>
      </div>
    )
  }
}

export default ProfileShow;