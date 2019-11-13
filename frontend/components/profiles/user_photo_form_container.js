import { connect } from 'react-redux';
import UserPhotoForm from './user_photo_form';

const mSTP = (state, ownProps) => ({
  currentUserId: ownProps.currentUserId
});

export default connect(mSTP)(UserPhotoForm);