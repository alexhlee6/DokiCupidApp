import { connect } from 'react-redux';
import NavLinks from './navlinks';

const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.id]
});

// const mDTP = (dispatch) => ({
//   logout: () => dispatch(logout())
// });

export default connect(mSTP)(NavLinks);