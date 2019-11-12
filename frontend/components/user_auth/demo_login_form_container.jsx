import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';


const mapStateToProps = (state) => ({
  formType: "Demo Login"
})

const mapDispatchToProps = (dispatch) => ({
  processForm: (formUser) => (dispatch(login(formUser)))
})


//------------------------------------------------------------------------------


class DemoSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  componentDidMount() {
    setTimeout(() => {
      this.startInterval();
    }, 600);
  }

  startInterval() {
    this.letterInterval = setInterval(() => {
      if (this.state.username !== "demo_user") {
        this.addLetter()
      } 
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.letterInterval);
  }

  addLetter() {
    let keyword="demo_user";
    for(let i=0; i < keyword.length; i++) {
      if (this.state.username[i] !== keyword[i]) {
        let newWord = this.state.username + keyword[i];
        if (newWord === keyword) {
          this.simulateSubmit();
          this.setState({ username: newWord, password: newWord });
        }
        this.setState({ username: newWord, password: newWord });
        return;
      }
    }
  }

  simulateSubmit() {
    setTimeout(() => {
      document.getElementById("demo-button").classList.add("clicked");
      setTimeout(() => {
        document.getElementById("demo-button").classList.remove("clicked");
        setTimeout(() => {
          this.handleSubmit();
        }, 300);
      }, 500);
    }, 900);
  }

  render() {
    const { formType } = this.props;

    return (
      <div>
      <div className="modal">
          <div class="lds-heart"><div></div></div>
      </div>
      <div className="demo-session-form-main">
        <form onSubmit={this.handleSubmit} className="demo-session-form">
          <p className="session-form-title">{formType}</p>

          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={this.state.username} disabled />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={this.state.password} disabled />

          <br />
          <button id="demo-button" disabled>{formType}</button>
        </form>
      </div>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DemoSessionForm);