import React from 'react';
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom';


class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    if (this.props.getProfile) {
      this.props.getProfile(this.props.profileId)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.profile);
    }
  }

  handleInput(property) {
    return (e) => { this.setState({ [property]: e.currentTarget.value  }) }
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result })
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile[user_id]', this.state.user_id);
    formData.append('profile[fname]', this.state.fname);
    formData.append('profile[zipcode]', this.state.zipcode);
    formData.append('profile[bio]', this.state.bio);
    formData.append('profile[identify_as]', this.state.identify_as);
    formData.append('profile[looking_for]', this.state.looking_for);
    formData.append('profile[compatibility_answers]', this.state.compatibility_answers);

    if (this.state.photoFile) {
      formData.append('profile[photos][]', this.state.photoFile);
    }
 
    console.log(formData);
    
    if (this.props.formType === "Edit") {
      this.props.action(formData, this.props.profileId);
    } else {
      this.props.action(formData);
    }

    if (this.props.profile.id) {
      this.props.history.push(`/profiles/${this.props.profile.id}`)
    }
  }


  render() {
    let backPath = (this.props.currentUser.profileId.length >= 1) ? (
      `/profiles/${this.props.currentUser.profileId}`
    ) : (
      "/home"
    )

    const preview = this.state.photoUrl ? <img className="profile-form-photo-preview" src={this.state.photoUrl} /> : null;
    return (
      <div className="profile-form-main">
        <div className="profile-form-content">
          <div className="profile-form-link-container">
            <Link to={ backPath } className="profile-form-back-link">x</Link>
          </div>
          <h1 className="profile-form-title">{this.props.formType} Profile</h1> 

          
          <form className="profile-info-form" onSubmit={this.handleSubmit}>
            <div className="profile-photo-form">
              <input type="file"
                onChange={this.handleFile} />

              <h3 className="profile-photo-preview-title">Image Preview: </h3>
              <div className="profile-photo-preview-container">
                {preview}
              </div>
            </div>
    
            <label htmlFor="fname">First Name:</label>
            <input id="fname" type="text" value={this.state.fname || ""} onChange={this.handleInput("fname")} />

            <label htmlFor="zipcode">Zipcode:</label>
            <input id="zipcode" type="text" value={this.state.zipcode || ""} onChange={this.handleInput("zipcode")} />

            <label htmlFor="bio">Bio:</label>
            <input id="bio" type="text" value={this.state.bio || ""} onChange={this.handleInput("bio")} />

            <label htmlFor="identify_as">Gender Identification:</label>
            <input id="identify_as" type="text" value={this.state.identify_as || ""} onChange={this.handleInput("identify_as")} />

            <label htmlFor="looking_for">Looking for:</label>
            <input id="looking_for" type="text" value={this.state.looking_for || ""} onChange={this.handleInput("looking_for")} />

            <label htmlFor="compatibility_answers">Compatibility Answers:</label>
            <input id="compatibility_answers" type="text" value={this.state.compatibility_answers || ""} onChange={this.handleInput("compatibility_answers")} />

            <button>{this.props.formType} My Profile!</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileForm);



