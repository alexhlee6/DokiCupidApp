import React from 'react';
// import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';
import ProfileShowContainer from '../profiles/profile_show_container';
// import UserProfileContainer from '../profiles/user_profile_container';

class Home extends React.Component {


  render () {
    return (
      <div>
        <h1>Testing /home</h1>
        
        {/* <ProtectedRoute path="/profiles/:profileId" component={ProfileShowContainer} /> */}
      </div>
    )
  }

}

// export default Home;

import { connect } from 'react-redux';
const mSTP = (state) => ({
  currentUserId: state.session.id
})

export default connect(mSTP)(Home);