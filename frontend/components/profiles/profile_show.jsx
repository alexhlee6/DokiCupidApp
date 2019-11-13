import React from 'react';

class ProfileShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
  }

  componentDidMount() {
    this.props.getProfile(this.props.profileId);
  }

  render() {
    let photoLis;
    if (this.props.profile.photo_urls) {
      photoLis = this.props.profile.photo_urls.map((photo, i) => {
        return <li key={i}><img src={photo.url} className="profile-show-photo" /></li>
      })
    }
    
    console.log(this.props.profile);
    return (
      
      <div className="profile-show-main">
        <h1>Name: {this.props.profile.fname || "not specified"}</h1>
        <h2>Identifies as: {this.props.profile.identify_as || "not specified"}</h2>
        <h2>Looking for: {this.props.profile.looking_for || "not specified"}</h2>
        <h3>Location: {this.props.profile.zipcode || "not specified"}</h3>
        <p>Bio: {this.props.profile.bio || "not specified"}</p>
        <p>Compatibility Answers: {this.props.profile.compatibility_answers || "not specified"}</p>

        <h2>Photos:</h2>
        <ul>
          {photoLis}
        </ul>


      </div>
    )
  }
}

export default ProfileShow;