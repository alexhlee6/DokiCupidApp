import React from 'react';
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom';


class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.state.selectedGender = this.props.profile.identify_as || "";
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
    this.handleProfileDelete = this.handleProfileDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.getProfile) {
      this.props.getProfile(this.props.profileId);
    } 
     if (this.props.formType === "Create") {
      this.setState({isCreated: false});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(this.props.profile);
    }
    if (this.props.formType === "Create" && this.state.isCreated) {
      this.props.history.push(`/profiles/${this.props.profile.id}`)
    }
  }

  handleInput(property) {
    return (e) => { this.setState({ [property]: e.currentTarget.value })}
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

  handleGenderChange(changeEvent) {
    this.setState({selectedGender: changeEvent.target.value})
  }

  handlePhotoDelete(photoId) {
    return () => {
      $.ajax({
      method: "DELETE",
      url: `/api/photos/${photoId}`
      }).then( () => this.props.getProfile(this.props.profileId))
    }
  }

  handleProfileDelete(e) {
    e.preventDefault();
    this.props.deleteProfile(this.props.profileId).then(() => {
      this.props.history.push(`/home`);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile[user_id]', this.state.user_id);
    formData.append('profile[fname]', this.state.fname);
    formData.append('profile[zipcode]', this.state.zipcode);
    formData.append('profile[bio]', this.state.bio);
    formData.append('profile[identify_as]', this.state.selectedGender);
    formData.append('profile[looking_for]', this.state.looking_for);
    formData.append('profile[compatibility_answers]', this.state.compatibility_answers);

    if (this.state.photoFile) {
      formData.append('profile[photos][]', this.state.photoFile);
    }
    if (this.props.formType === "Edit") {
      this.props.action(formData, this.props.profileId);
    } else {
      this.props.action(formData).then( () => this.setState({isCreated: true}) ) 
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
    
    let allPhotosPreview;

    let allPhotosList;
    if (this.props.formType !== "Create" && this.props.profile.photo_urls) {
      if (this.state.photo_urls.length > 0) {
        allPhotosPreview = this.props.profile.photo_urls.map(photo => {
          return (
            <li className="profile-form-preview-photos-item"
              key={photo.photo_id}>
              <div className="edit-profile-existing-photo-container">
                <img className="edit-profile-existing-photo" src={photo.url} />
              </div>
              <div className="edit-profile-delete-photo-link" onClick={this.handlePhotoDelete(photo.photo_id)}>Delete Photo</div>
            </li>
          )
        })
      }
      allPhotosList = (
        <ul className="profile-form-preview-photos-list">
          { allPhotosPreview }
        </ul>
      )
    }
    

    let deleteButton;
    if (this.props.profileId) {
      deleteButton = <div className="profile-form-delete-button" onClick={this.handleProfileDelete}>Delete Profile</div>
    }

    const preview = this.state.photoUrl ? <img className="profile-form-photo-preview" src={this.state.photoUrl} /> : null;
    return (
      <div className="profile-form-main">
        <div className="profile-form-content">
          <div className="profile-form-link-container">
            <Link to={ backPath } className="profile-form-back-link">x</Link>
          </div>
          <h1 className="profile-form-title">{this.props.formType} Profile</h1> 

          
          <form className="profile-info-form" onSubmit={this.handleSubmit}>
            { allPhotosList }
            
            <div className="profile-photo-form">
              <h3 className="profile-photo-input-title">Add a New Photo!</h3> 
              <input type="file"
                onChange={this.handleFile} />
              <div className="profile-photo-preview-container">
                {preview}
              </div>
            </div>
    
          <div className="profile-form-info-section">
            <div>
              <label htmlFor="fname">First Name:</label>
              <input id="fname" type="text" value={this.state.fname || ""} onChange={this.handleInput("fname")} />
            </div>

            <div>
              <label htmlFor="zipcode">Zipcode:</label>
              <input id="zipcode" type="text" value={this.state.zipcode || ""} onChange={this.handleInput("zipcode")} />
            </div>

            <div>
              <label htmlFor="bio">Bio:</label>
              <textarea id="bio" value={this.state.bio || ""} onChange={this.handleInput("bio")} />
            </div>

            <div>
            <label htmlFor="identify_as">Gender Identification:</label>
            <div className="profile-form-gender-inputs" >
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Male" 
                  checked={this.state.selectedGender === "Male" ? true : false} 
                /> Male
              </div>
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Female" 
                  checked={this.state.selectedGender === "Female" ? true : false}
                /> Female
              </div>
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Other" 
                  checked={this.state.selectedGender === "Other" ? true : false}
                /> Other
              </div>
            </div>
            </div>

            <div>
              <label htmlFor="looking_for">Looking for:</label>
              
              <select value={this.state.looking_for} onChange={this.handleInput("looking_for")}>
                {/* <option value="" selected={ this.state.looking_for === "" ? "true" : "false" } disabled>Please Select One:</option> */}
                <option value="" defaultValue={this.state.looking_for === "" ? "true" : "false"} disabled>Please Select One:</option>
                <option value="Friends">Friends</option>
                <option value="Nothing Serious">Casual Fling / Nothing Serious</option>
                <option value="Relationship">Relationship</option>
                <option value="True Love">True Love / Long Term Relationship</option>
              </select>
            </div>

            <div>
              <label htmlFor="compatibility_answers">Compatibility Answers:</label>
              <input id="compatibility_answers" type="text" value={this.state.compatibility_answers || ""} onChange={this.handleInput("compatibility_answers")} />
            </div>
            <button className="profile-form-submit-button">{this.props.formType} My Profile!</button>

            <div className="profile-form-delete-button-container">
              { deleteButton }
            </div>

            
          </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileForm);



