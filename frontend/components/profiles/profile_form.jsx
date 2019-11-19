import React from 'react';
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom';


class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.state.selectedGender = this.props.profile.identify_as || "";
    this.state.compatibility_answers = (
      this.props.profile.compatibility_answers.split("/") || ["", "", "", "", "", "", "", ""]
    )
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
    this.handleProfileDelete = this.handleProfileDelete.bind(this);
    this.handleCompatibilityChange = this.handleCompatibilityChange.bind(this);
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
      if (this.props.profile.compatibility_answers) {
        this.setState({compatibility_answers: this.props.profile.compatibility_answers.split("/")})
      } 
      // else {

      // }
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

  handleCompatibilityChange(id) {
    return (e) => {
      let oldCompat = [...this.state.compatibility_answers];
      oldCompat[id] = e.currentTarget.value;
      this.setState({ compatibility_answers: oldCompat });
    }
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
    formData.append('profile[compatibility_answers]', this.state.compatibility_answers.join("/"));

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
            <div className="profile-form-gender-inputs">
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Male" 
                  checked={this.state.selectedGender === "Male" ? true : false} 
                /> <p>Male</p>
              </div>
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Female" 
                  checked={this.state.selectedGender === "Female" ? true : false}
                /> <p>Female</p>
              </div>
              <div>
                <input 
                  id="identify_as" type="radio" 
                  onChange={this.handleGenderChange}
                  name="gender" value="Other" 
                  checked={this.state.selectedGender === "Other" ? true : false}
                /> <p>Other</p>
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
                <option value="True Love">True Love / Long Term</option>
              </select>
            </div>


            <div className="profile-form-compatibility-questions-main">
              <label>Which of these words describes you best?:</label>
              {/* <input id="compatibility_answers" type="text" value={this.state.compatibility_answers || ""} onChange={this.handleInput("compatibility_answers")} /> */}

              <div className="profile-form-compatibility-question option-0">
                <div>
                  <input
                    id="compat_0" type="radio"
                    onChange={this.handleCompatibilityChange(0)}
                    name="compat_0" value="Introverted"
                    checked={this.state.compatibility_answers[0] === "Introverted" ? true : false}
                  />
                  <p>Introverted</p>
                </div>
                <div>
                  <input
                    id="compat_0" type="radio"
                    onChange={this.handleCompatibilityChange(0)}
                    name="compat_0" value="Extroverted"
                    checked={this.state.compatibility_answers[0] === "Extroverted" ? true : false}
                  /> Extroverted
                </div>
              </div>

              <div className="profile-form-compatibility-question option-1">
                <div>
                  <input
                    id="compat_1" type="radio"
                    onChange={this.handleCompatibilityChange(1)}
                    name="compat_1" value="Dog Person"
                    checked={this.state.compatibility_answers[1] === "Dog Person" ? true : false}
                  /> Dog Person
                </div>
                <div>
                  <input
                      id="compat_1" type="radio"
                      onChange={this.handleCompatibilityChange(1)}
                      name="compat_1" value="Cat Person"
                      checked={this.state.compatibility_answers[1] === "Cat Person" ? true : false}
                    /> Cat Person
                </div>
              </div>

              <div className="profile-form-compatibility-question option-2">
                <div>
                  <input
                    id="compat_2" type="radio"
                    onChange={this.handleCompatibilityChange(2)}
                    name="compat_2" value="Creative"
                    checked={this.state.compatibility_answers[2] === "Creative" ? true : false}
                  /> Creative
                </div>
                <div>
                  <input
                      id="compat_2" type="radio"
                      onChange={this.handleCompatibilityChange(2)}
                      name="compat_2" value="Methodical"
                      checked={this.state.compatibility_answers[2] === "Methodical" ? true : false}
                    /> Methodical
                </div>
              </div>

              <div className="profile-form-compatibility-question option-3">
                <div>
                  <input
                    id="compat_3" type="radio"
                    onChange={this.handleCompatibilityChange(3)}
                    name="compat_3" value="Organized"
                    checked={this.state.compatibility_answers[3] === "Organized" ? true : false}
                  /> Organized
                </div>
                <div>
                  <input
                      id="compat_3" type="radio"
                      onChange={this.handleCompatibilityChange(3)}
                      name="compat_3" value="Carefree"
                      checked={this.state.compatibility_answers[3] === "Carefree" ? true : false}
                    /> Carefree
                </div>
              </div>

              <div className="profile-form-compatibility-question option-4">
                <div>
                  <input
                    id="compat_4" type="radio"
                    onChange={this.handleCompatibilityChange(4)}
                    name="compat_4" value="Adventurous"
                    checked={this.state.compatibility_answers[4] === "Adventurous" ? true : false}
                  /> Adventurous
                </div>
                <div>
                  <input
                      id="compat_4" type="radio"
                      onChange={this.handleCompatibilityChange(4)}
                      name="compat_4" value="Reserved"
                      checked={this.state.compatibility_answers[4] === "Reserved" ? true : false}
                  /> Reserved
                </div>
              </div>

              <div className="profile-form-compatibility-question option-5">
                <div>
                  <input
                    id="compat_5" type="radio"
                    onChange={this.handleCompatibilityChange(5)}
                    name="compat_5" value="Independent"
                    checked={this.state.compatibility_answers[5] === "Independent" ? true : false}
                  /> Independent
                </div>
                <div>
                  <input
                      id="compat_5" type="radio"
                      onChange={this.handleCompatibilityChange(5)}
                      name="compat_5" value="Cooperative"
                      checked={this.state.compatibility_answers[5] === "Cooperative" ? true : false}
                  /> Cooperative
                </div>
              </div>

              <div className="profile-form-compatibility-question option-6">
                <div>
                  <input
                    id="compat_6" type="radio"
                    onChange={this.handleCompatibilityChange(6)}
                    name="compat_6" value="Sensitive"
                    checked={this.state.compatibility_answers[6] === "Sensitive" ? true : false}
                  /> Sensitive
                </div>
                <div>
                  <input
                      id="compat_6" type="radio"
                      onChange={this.handleCompatibilityChange(6)}
                      name="compat_6" value="Head-strong"
                      checked={this.state.compatibility_answers[6] === "Head-strong" ? true : false}
                  /> Head-strong
                </div>
              </div>

              <div className="profile-form-compatibility-question option-7">
                <div>
                  <input
                    id="compat_7" type="radio"
                    onChange={this.handleCompatibilityChange(7)}
                    name="compat_7" value="Task-oriented"
                    checked={this.state.compatibility_answers[7] === "Task-oriented" ? true : false}
                  /> Task-oriented
                </div>
                <div>
                  <input
                      id="compat_7" type="radio"
                      onChange={this.handleCompatibilityChange(7)}
                      name="compat_7" value="Laid-back"
                      checked={this.state.compatibility_answers[7] === "Laid-back" ? true : false}
                  /> Laid-back
                </div>
              </div>


            </div>



            <button className="profile-form-submit-button">Submit My Profile!</button>

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



