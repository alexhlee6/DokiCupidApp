import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';


class ProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(property) {
    return (e) => { this.setState({ [property]: e.currentTarget.value  }) }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.action(this.state);
  }

  render() {


    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{ this.props.formType[0].toUpperCase() + this.props.formType.slice(1)} Profile</h1> 
        
        <PhotoForm formType={this.props.formType} />



        <label htmlFor="fname">First Name:</label>
        <input id="fname" type="text" value={this.state.fname} onChange={this.handleInput("fname")} />

        <label htmlFor="zipcode">Zipcode:</label>
        <input id="zipcode" type="text" value={this.state.zipcode} onChange={this.handleInput("zipcode")} />

        <label htmlFor="bio">Bio:</label>
        <input id="bio" type="text" value={this.state.bio} onChange={this.handleInput("bio")} />

        <label htmlFor="identify_as">Gender Identification:</label>
        <input id="identify_as" type="text" value={this.state.identify_as} onChange={this.handleInput("identify_as")} />

        <label htmlFor="looking_for">Looking for:</label>
        <input id="looking_for" type="text" value={this.state.looking_for} onChange={this.handleInput("looking_for")} />

        <label htmlFor="compatibility_answers">Compatibility Answers:</label>
        <input id="compatibility_answers" type="text" value={this.state.compatibility_answers} onChange={this.handleInput("compatibility_answers")} />

      <button>{this.props.formType} My Profile!</button>
      </form>
    )
  }
}

export default ProfileForm;







//=============================PHOTO FORM===============================

class PhotoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photoFile: null,
      photoUrl: null
    }
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({photoFile: file, photoUrl: fileReader.result})
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append('profile[photos]', this.state.photoFile);
    }
    this.state.formType === "Create" ? (
      $.ajax({
        url: '/api/profiles',
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false
      }).then(
        (response) => console.log(response.message),
        (response) => {
          console.log(response.responseJSON)
        }
      )
    ) : (
      $.ajax({
        url: `/api/profiles/${this.props.profile.id}`,
        method: 'PATCH',
        data: formData,
        contentType: false,
        processData: false
      }).then(
        (response) => console.log(response.message),
        (response) => {
          console.log(response.responseJSON)
        }
      )
    )
  }

  render() {
    console.log(this.state);
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="file"
          onChange={this.handleFile.bind(this)} />

        <h3>Image preview </h3>
        {preview}

        <button>Make a new Post!</button>
      </form>
    );
  }
}