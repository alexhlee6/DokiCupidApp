import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import CreateProfileFormContainer from '../profiles/create_profile_form_container';
import ProfileShowContainer from '../profiles/profile_show_container';

class Greeting extends React.Component {

  constructor(props) {
    super(props);
    this.displayPhotoForm = this.displayPhotoForm.bind(this);
    this.state = {
      displayingPhotoForm: false,
      photoUrl: null,
      photoFile: null,
      dropdownOpen: false
    }
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.handlePhotoInput = this.handlePhotoInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && prevProps.currentUser) {
      if (prevProps.currentUser.photoUrl !== this.props.currentUser.photoUrl) {
        this.setState({ displayingPhotoForm: false });
      }
    }
  }

  displayPhotoForm() {
    if (this.state.displayingPhotoForm === false){
      this.setState({ displayingPhotoForm: true })
    } else {
      this.setState({ displayingPhotoForm: false })
    }
  }

  handlePhotoInput(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handlePhotoSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    }
    this.props.updatePhoto(formData, this.props.currentUser.id);
    this.setState({ displayingPhotoForm: false })
  }

  render() {
    const currentUser = this.props.currentUser;
    const logout = this.props.logout;
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} className="user-icon-preview-image"/> : null;
    let photoForm = this.state.displayingPhotoForm ? (
      <div className="user-photo-form">
        <h2 className="user-photo-form-title">Choose a New Icon Photo!</h2>
        <div className="user-photo-form-arrow"></div>
        <form onSubmit={this.handlePhotoSubmit}>
          <input type="file"
            onChange={this.handlePhotoInput} 
            accept="image/jpg, image/jpeg, image/png"
          />
          <div className="user-icon-preview-container">{preview}</div>
          <button>Set Icon Photo</button>
        </form>
        
      </div>
    ) : (
      <div></div>
    );

    const dropdown = (
      <div className="header-dropdown" id="header-dropdown">
        <Link to="/demo-login">Demo Login</Link>
        <Link to="/signup" id="dropdown-signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    );
    const hamburger = (
      <i 
        className="fas fa-bars"
        onClick={() => {
          if (this.state.dropdownOpen) {
            document.getElementById("header-dropdown").style.height = "0px";
            this.setState({ dropdownOpen: false });
          } else {
            document.getElementById("header-dropdown").style.height = "200px";
            this.setState({ dropdownOpen: true });
          }
        }}
      ></i>
    )


    const display = currentUser ? (
      <div className="navbar-greeting">

        <div className="navbar-greeting-photo-container">
          <img className="navbar-greeting-photo" src={currentUser.photoUrl} onClick={this.displayPhotoForm} />
        </div>
        {photoForm}

        <Link to={`/profiles/${this.props.currentUserProfileId}`} className="navbar-greeting-username">{currentUser.username}</Link>
        <Route exact path={`/profiles/new`} component={CreateProfileFormContainer} />
        
        <a className="navbar-logout-link" onClick={logout}><i className="fas fa-power-off"></i></a>
      </div>
    ) : (
        // <div>
          <Switch>
            <Route exact path="/login"
              render={() => (
                <div className="header-auth">
                  <Link className="session-link" to="/demo-login">Demo Login</Link>
                  <Link className="session-link" to="/signup">Sign Up</Link>
                  {hamburger}
                  {dropdown}
                </div>
              )} />

            <Route exact path="/signup"
              render={() => (
                <div className="header-auth">
                  <Link className="session-link" to="/demo-login">Demo Login</Link>
                  <Link className="session-link" to="/login">Log In</Link>
                  {hamburger}
                  {dropdown}
                </div>
              )} />

            <Route exact path="/demo-login"
              render={() => (
                <div className="header-auth">
                  <Link className="session-link" to="/signup">Sign Up</Link>
                  <Link className="session-link" to="/login">Log In</Link>
                  {hamburger}
                  {dropdown}
                </div>
              )} />

            <Route exact path="/" render={() => (
              <div className="header-auth">
                <Link className="session-link" to="/demo-login">Demo Login</Link>
                <Link className="session-link" to="/signup">Sign Up</Link>
                <Link className="session-link" to="/login">Log In</Link>
                {hamburger}
                {dropdown}
              </div>
            )} />
          </Switch>
        // </div>
      );

    return display;
  }
}


export default Greeting;
