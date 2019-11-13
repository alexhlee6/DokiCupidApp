import { connect } from 'react-redux';
import ProfileForm from './profile_form';


const mSTP = (state, ownProps) => {
  return {
    // currentUser: state.entities.users[state.session.id],
    // profileId: ownProps.match.params.profileId
  }
}

const mDTP = (dispatch) => {
  return {

  }
}

export default connect(mSTP, mDTP)(ProfileForm);