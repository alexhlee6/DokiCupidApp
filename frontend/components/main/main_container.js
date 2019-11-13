import { connect } from 'react-redux';
import Main from './main';

const msp = (state) => {
  return {
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id]
  }
}


export default connect(msp)(Main)