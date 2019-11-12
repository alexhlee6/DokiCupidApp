import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signUp } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  formType: "Sign up"
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  processForm: (formUser) => (dispatch(signUp(formUser)))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
