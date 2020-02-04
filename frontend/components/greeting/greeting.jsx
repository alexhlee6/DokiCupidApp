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
      dropdownOpen: false,
      userDropdownOpen: false
    }
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.handlePhotoInput = this.handlePhotoInput.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && !prevProps.currentUser) {
      this.setState({dropdownOpen: false, userDropdownOpen: false});
    }
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

  handleDropdownMenu() {
    if (this.state.dropdownOpen) {
      document.getElementById("nav-session-dropdown").style.height = "0px";
      this.setState({dropdownOpen: false});
    } else {
      let dropdown = document.getElementById("nav-session-dropdown");
      dropdown.style.height = "220px";
      this.setState({dropdownOpen: true});
    }
  }

  handleUserDropdown() { //when logged in
    if (this.state.userDropdownOpen) {
      document.getElementById("nav-user-dropdown").style.height = "0px";
      this.setState({userDropdownOpen: false});
    } else {
      document.getElementById("nav-user-dropdown").style.height = "380px";
      this.setState({userDropdownOpen: true});
    }
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

    const navSessionLinks = (
        <div className="nav-session-dropdown" id="nav-session-dropdown">
          <li>
            <Link className="dropdown-session-link" to="/demo-login"
              onClick={() => this.handleDropdownMenu()}
            >Demo Login</Link>
          </li>
          <li>
            <Link className="dropdown-session-link" to="/signup"
              onClick={() => this.handleDropdownMenu()}
            >Sign Up</Link>
          </li>
          <li>
            <Link className="dropdown-session-link" to="/login"
              onClick={() => this.handleDropdownMenu()}
            >Log In</Link>
          </li>
        </div>
    );

    const navUserLinks = (
      <ul className="nav-session-dropdown" id="nav-user-dropdown">
        <li>
          <Link to="/home" onClick={() => this.handleUserDropdown()}>
            <i className="fas fa-home"></i>
            <span className="navlink-description">Doubletake</span>
          </Link>
        </li>
        <li>
          <Link to="/explore" onClick={() => this.handleUserDropdown()}>
            <i className="fas fa-compass"></i>
            <span className="navlink-description">Explore</span>
          </Link>
        </li>
        <li>
          <Link to="/search" onClick={() => this.handleUserDropdown()}>
            <i className="fas fa-search"></i>
            <span className="navlink-description">Search</span>
          </Link>
        </li>
        <li>
          <Link to="/matches/my-matches" onClick={() => this.handleUserDropdown()}>
            <i className="fas fa-heart"></i>
            <span className="navlink-description">Matches</span>
          </Link>
        </li>
        <li>
          <Link to="/messages" onClick={() => this.handleUserDropdown()}>
            <i className="fas fa-comment"></i>
            <span className="navlink-description">Messages</span>
          </Link>
        </li>
        <li>
          <a onClick={logout}>
          <i className="fas fa-power-off"></i>
          <span className="navlink-description">Logout</span>
          </a>
        </li>
      </ul>
    );

    const display = currentUser ? (
      <div className="navbar-greeting">

        <div className="navbar-greeting-photo-container">
          <img className="navbar-greeting-photo" src={currentUser.photoUrl} onClick={this.displayPhotoForm} />
        </div>
        {photoForm}

        <Link to={`/profiles/${this.props.currentUserProfileId}`} className="navbar-greeting-username">{currentUser.username}</Link>
        <Route exact path={`/profiles/new`} component={CreateProfileFormContainer} />
        
        <a className="navbar-logout-link" onClick={logout}><i className="fas fa-power-off"></i></a>

        {navUserLinks}
        <Link className="navbar-greeting-photo-container" id="current-user-photo-mobile" to={`/profiles/${this.props.currentUserProfileId}`}>
          <img className="navbar-greeting-photo" src={currentUser.photoUrl} />
        </Link>
        <i className={this.state.userDropdownOpen ? "fas fa-times" : "fas fa-bars"} onClick={() => this.handleUserDropdown()}/>
      </div>
    ) : (
        // <div>
          <Switch>
            <Route exact path="/login"
              render={() => (
                <div className="nav-session-links">
                  <i className="fas fa-bars" onClick={() => this.handleDropdownMenu()}></i>
                  {navSessionLinks}
                  <Link className="session-link" to="/demo-login">Demo Login</Link>
                  <Link className="session-link" to="/signup">Sign Up</Link>
                </div>
              )} />

            <Route exact path="/signup"
              render={() => (
                <div className="nav-session-links">
                  <i className="fas fa-bars" onClick={() => this.handleDropdownMenu()}></i>
                  {navSessionLinks}
                  <Link className="session-link" to="/demo-login">Demo Login</Link>
                  <Link className="session-link" to="/login">Log In</Link>
                </div>
              )} />

            <Route exact path="/demo-login"
              render={() => (
                <div className="nav-session-links">
                  <i className="fas fa-bars" onClick={() => this.handleDropdownMenu()}></i>
                  {navSessionLinks}
                  <Link className="session-link" to="/signup">Sign Up</Link>
                  <Link className="session-link" to="/login">Log In</Link>
                </div>
              )} />

            <Route exact path="/" render={() => (
              <div className="nav-session-links">
                <i className={this.state.dropdownOpen ? "fas fa-times" : "fas fa-bars"} onClick={() => this.handleDropdownMenu()}></i>
                {navSessionLinks}
                <Link className="session-link" to="/demo-login">Demo Login</Link>
                <Link className="session-link" to="/signup">Sign Up</Link>
                <Link className="session-link" to="/login">Log In</Link>
              </div>
            )} />
          </Switch>
        // </div>
      );

    return display;
  }
}


export default Greeting;
