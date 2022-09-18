import React from 'react';
import { findCompatibility } from '../../util/match_util';

class Doubletake extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profiles: this.props.profiles,
      loading: true,
      currentProfileIndex: null
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleProfileLink = this.handleProfileLink.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles().then(() => {
      this.props.getCurrentUser(this.props.currentUser.id);
      this.setState({loading: true});
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ 
        profiles: this.props.profiles, 
        loading: false, currentUser: this.props.currentUser, 
        currentUserCompatibility: this.props.currentUserCompatibility})
    }
  }

  handleImageClick(index) {
    this.setState({currentProfileIndex: index});
  }

  handleProfileLink(profileId) {
    this.props.history.push(`/profiles/${profileId}`);
  }


  render() {

    if (this.state.loading) {
      return (<div className="doubletake-main">
        <div className="page-header">
          <div className="page-title">
              Doubletake
          </div>
        </div>
        <div className="page-header doubletake-profiles-preview">
          <ul className="doubletake-users-preview-list">
            <li className="doubletake-scroll-shadow"></li>
            <li className="doubletake-scroll-shadow"></li>
          </ul>
        </div>

        <div className="doubletake-main-profile-view">
        </div> 
      </div>)
      // return <div className="lds-heart page"><div></div></div>
      return null;
    }

    let usersPreview;

    let hiddenProfiles = [];

    if (this.state.profiles instanceof Array && this.state.currentUser && this.state.currentUser.matches) {
      usersPreview = this.state.profiles.map((profile, i) => {
        if (this.props.currentUser.matches.matched_user_ids.includes(profile.user_id)) {
          hiddenProfiles.push(profile.id);
          return;
        } else if (this.props.currentUser.profileId === profile.id) {
          hiddenProfiles.push(profile.id);
          return;
        } else if (profile.fname === "DemoUser") {
          hiddenProfiles.push(profile.id);
          return;
        }
        return (
          <li className="doubletake-users-preview-item" key={profile.id}>
            <div className="doubletake-users-preview-photo-container" onClick={() => this.handleImageClick(i)}>
              <img className="doubletake-users-preview-photo" src={profile.photo_url} />
            </div>
          </li>
        )
      })
    }

    let currentProfile;
    if (this.state.profiles instanceof Array && this.state.currentUser) {
      if (!this.state.currentProfileIndex) {
        for (let i = 0; i < this.state.profiles.length; i++) {
          if (!hiddenProfiles.includes(this.state.profiles[i].id)) {
            currentProfile = this.state.profiles[i];
            break;
          }
        }
      } else {
        currentProfile = this.state.profiles[this.state.currentProfileIndex];
      }
    }

    let currentProfilePhotos;
    let profileShow;
    let compatibilityTags;
    if (currentProfile) {

      currentProfilePhotos = currentProfile.photo_urls.map((photo, i) => {
        return (
          <li key={`photo-${i}`} className="doubletake-current-profile-photo-item">
            <img className="doubletake-current-profile-photo" src={photo.url} />
          </li>
        )
      })
      
      if (this.props.currentUserProfileId) {
        compatibilityTags = currentProfile.compatibility_answers.split("/").map((word, i) => {
          if (this.state.currentUserCompatibility.split("/").includes(word)) {
            return (
              <li key={i}
                className="doubletake-current-profile-common-traits-item">
                {word}
              </li>
            )
          }
        }) 
      } else {
        compatibilityTags = (
          <li
            className="doubletake-current-profile-common-traits missing">
            Create a profile to see your shared tags!
          </li>
        )
         
      }

      let compatibilityPercentage = (
        findCompatibility(
          this.state.currentUserCompatibility,
          currentProfile.compatibility_answers
        )
      )
      if (compatibilityPercentage) {
        compatibilityPercentage = (
          <div className="doubletake-current-profile-top-info-compatibility">
            {compatibilityPercentage}% Match
          </div>
        )
      } else {
        compatibilityPercentage = (
          <div className="doubletake-current-profile-top-info-compatibility missing">
            Create a profile to see your compatibility!
          </div>
        )
      }
      


      profileShow = (

        <div className="doubletake-current-profile-show"> 
          <div className="doubletake-current-profile-top-main">
          <div className="doubletake-current-profile-top-info">
            <div className="doubletake-current-profile-top-info-name">
              {currentProfile.fname} 
            </div>
            <i className="fas fa-star"></i>
            <div className="doubletake-current-profile-top-info-identify">
              { currentProfile.identify_as }
            </div>
            <i className="fas fa-star"></i>
            { compatibilityPercentage }
          </div>
          <div className="doubletake-current-profile-top-info-link" 
            onClick={() => this.handleProfileLink(currentProfile.id)}>
            Go to { currentProfile.fname }'s Profile
          </div>

          </div>
          <ul className="doubletake-current-profile-photo-list">
            {currentProfilePhotos}
          </ul>
          <div className="doubletake-current-profile-bottom-info">
            
            <div className="doubletake-current-profile-bottom-info-item">  
              <div className="doubletake-current-profile-bottom-info-title">
                <i className="fas fa-star"></i> { currentProfile.fname } is looking for:
              </div>  
              <div className="doubletake-profile-response">
                { currentProfile.looking_for }
              </div>
            </div>

            <div className="doubletake-current-profile-bottom-info-item">
              <div className="doubletake-current-profile-bottom-info-title">
                <i className="fas fa-star"></i> {currentProfile.fname}'s Bio: 
              </div>
              <div className="doubletake-profile-response">
                { currentProfile.bio }
              </div>
            </div>
            <div className="doubletake-current-profile-common-traits-list">
              <div className="doubletake-current-profile-common-traits-description">
                <i className="fas fa-star"></i> Shared Traits: 
                {/* <i className="fas fa-star"></i> You and { currentProfile.fname } have these things in common: */}
              </div>
              <ul>
                { compatibilityTags }
              </ul>
            </div>
            
          </div>
        </div>

      )
    }



    return (
      <div className="doubletake-main">
        <div className="page-header">
          <div className="page-title">
              Doubletake
          </div>
        </div>
        <div className="page-header doubletake-profiles-preview">
          <ul className="doubletake-users-preview-list">
            <li className="doubletake-scroll-shadow"></li>
            {usersPreview}
            <li className="doubletake-scroll-shadow"></li>
          </ul>
        </div>

        <div className="doubletake-main-profile-view">
          { profileShow}
        </div> 
      </div>
    )
  }
}

export default Doubletake;