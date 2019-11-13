import React from 'react';
import UserPhotoFormContainer from './user_photo_form_container';

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: {} }; 
    // want this.state = { id: 1, username: alexlee, photoUrl: "/something/smth.jpg" }
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser () {
    console.log(this.props);
    $.ajax({
      method: "GET",
      url: `/api/users/${this.props.currentUserId}`
    }).then(user => {
      console.log(user);
      this.setState({ user })
    })
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    this.state.user ? console.log(this.state.user) : console.log("nope");
    return (
      
      <div>
        <img src={this.state.user.photoUrl} className="photo-test" />
        <UserPhotoFormContainer currentUserId={this.props.currentUserId} />
        <h1>{this.state.user.username}</h1>
      </div>
    )
  }
}

export default UserProfile;