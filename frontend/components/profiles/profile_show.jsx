import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import EditProfileFormContainer from './edit_profile_form_container';
import CreateProfileFormContainer from './create_profile_form_container';


class ProfileShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true, 
      currentPhoto: 0 
    };
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  // UNSAFE_componentWillMount() {
  //   this.setState({ loading: true })
  // }
 
  componentDidMount() {
    if (this.props.profileId !== "new" && this.props.profileId) {
      this.props.getProfile(this.props.profileId).then(() => this.setState({ loading: false }))
    }
  }

  conponentWillUnmount() {
    this.setState({loading: true})
  }

  componentDidUpdate(prevProps) {
    if (this.props.profileId && prevProps.profileId !== this.props.profileId && this.props.profileId != "new") {
      this.props.getProfile(this.props.profileId).then(() => this.setState({ loading: false }))
    }
  }

  handleLeft() {
    if (this.state.currentPhoto === 0) {
      this.setState({currentPhoto: this.props.profile.photo_urls.length - 1});
    } else {
      this.setState({ currentPhoto: this.state.currentPhoto - 1 });
    }
  }

  handleRight() {
    if (this.state.currentPhoto === this.props.profile.photo_urls.length - 1) {
      this.setState({currentPhoto: 0});
    } else {
      this.setState({currentPhoto: this.state.currentPhoto + 1})
    }
  }

  render() {
    let photoLis;
    let ownProfileLink;
    
    if (this.state.loading) {
      return null;
    }

    if (this.props.profile.photo_urls) {
      photoLis = this.props.profile.photo_urls.map((photo, i) => {
        if (i !== this.state.currentPhoto) {
          return <li className="profile-show-photos-item hidden" key={i}><img src={photo.url} className="profile-show-photo" /></li>
        } else {
          return <li className="profile-show-photos-item showing" key={i}><img src={photo.url} className="profile-show-photo" /></li>
        }
      })
    }
    

    if (this.props.currentUserId === this.props.profile.user_id) {
      ownProfileLink = (
        <div className="own-profile-link">
          <NavLink to={`/profiles/${this.props.profileId}/edit`}>Edit Profile</NavLink>

          <Route exact path={`/profiles/${this.props.profileId}/edit`} component={EditProfileFormContainer} />
        </div>
      )
    }
    // } else if (this.props.currentUserId.toString() === this.props.profileId && !this.state.loading) {
    //   // ownProfileLink = (
    //   //   <div className="own-profile-link">
    //   //     <NavLink to={`/profiles/${this.props.profileId}/create`}>Create Profile</NavLink>

    //   //     <Route exact path={`/profiles/${this.props.profileId}/create`} component={CreateProfileFormContainer} />
    //   //   </div>
    //   // )
    // }



    let infoListItems;
    if (!this.state.loading) {
      infoListItems = [
        <li key={0} className="profile-show-info-item"><div key="label0" id="profile-show-name">{this.props.profile.fname || ""}</div></li>,
        <li key={1} className="profile-show-info-item"><div key="label1" className="profile-show-info-description">Identifies as:</div> <div key="div1" className="profile-show-info-response">{this.props.profile.identify_as || ""}</div></li>,
          <div key="divider-1" className="profile-show-info-divider"></div>,
        <li key={2} className="profile-show-info-item"><div key="label2" className="profile-show-info-description">Looking for:</div> <div key="div2" className="profile-show-info-response">{this.props.profile.looking_for || ""}</div></li>,
          <div key="divider-2" className="profile-show-info-divider"></div>,
        <li key={3} className="profile-show-info-item"><div key="label3" className="profile-show-info-description">Location:</div> <div key="div3" className="profile-show-info-response">{this.props.profile.zipcode || ""}</div></li>,
          <div key="divider-3" className="profile-show-info-divider"></div>,
        <li key={4} className="profile-show-info-item"><div key="label4" className="profile-show-info-description">Bio:</div> <div key="div4" className="profile-show-info-response">{this.props.profile.bio || ""}</div></li>,
          <div key="divider-4" className="profile-show-info-divider"></div>,
        <li key={5} className="profile-show-info-item"><div key="label5" className="profile-show-info-description">Compatibility Answers:</div> <div key="div5" className="profile-show-info-response">{this.props.profile.compatibility_answers || ""}</div></li>
      ]
    } else {
      infoListItems = ""
    }

    let leftArr;
    let rightArr;
    if (this.props.profile.photo_urls && this.props.profile.photo_urls.length > 1) {
      leftArr = <div className="profile-show-arrow left" onClick={this.handleLeft}><i className="fas fa-chevron-left"></i></div>
      rightArr = <div className="profile-show-arrow right" onClick={this.handleRight}><i className="fas fa-chevron-right"></i></div>
    }

    return (
      <div className="profile-show-main">
        {ownProfileLink}
        <ul className="profile-show-photos-list">
          {leftArr}
            {photoLis}
          {rightArr}
        </ul>

        
        <ul className="profile-show-info-list">
          { infoListItems }           
        </ul>
      </div>
    )
  }
}

export default ProfileShow;