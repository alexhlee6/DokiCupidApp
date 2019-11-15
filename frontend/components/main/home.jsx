import React from 'react';
// import { Route } from 'react-router-dom';
// import { ProtectedRoute } from '../../util/route_util';

class Home extends React.Component {


  render () {
    return (
      <div>
        <h1>Testing /home</h1>
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