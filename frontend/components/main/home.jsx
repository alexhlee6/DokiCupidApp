import React from 'react';
import UserProfileContainer from '../profiles/user_profile_container';
class Home extends React.Component {


  render () {
    console.log("HERE");
    console.log(this.props);
    return (
      <div>
        <h1>Testing /home</h1>
        <UserProfileContainer currentUserId={this.props.currentUserId} />
      </div>
    )
  }

}

// export default Home;

import { connect } from 'react-redux';
const mSTP = state => ({
  currentUserId: state.session.id
})

export default connect(mSTP)(Home);