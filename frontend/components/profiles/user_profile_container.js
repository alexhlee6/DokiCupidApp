import { connect } from 'react-redux';
import UserProfile from './user_profile';


const mSTP = (state, ownProps) => ({
  currentUserId: ownProps.currentUserId,
});

export default connect(mSTP)(UserProfile);