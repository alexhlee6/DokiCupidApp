import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(type) {
    return (e) => this.setState({ [type]: e.currentTarget.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  componentWillUnmount() {
    this.props.dismissSessionErrors();
  }

  render() {
    const { formType, errors } = this.props;
    let err = <ul className="session-errors">
      <span className="arrow-up"></span>
      {errors.map((error, i) => {
        return <li key={i}>* {error}</li>
      })}
    </ul>

    if (errors.length === 0) {
      err = "";
    } else {
      // this.props.dismissSessionErrors();
    }

    return (
      <div className="session-form-main">
        
        <form onSubmit={this.handleSubmit} className="session-form">
          <p className="session-form-title">{formType}</p>
          <label htmlFor="username">Username</label>
          
          <input id="username" type="text" onChange={this.update('username')} value={this.state.username} />
          
          
          <label htmlFor="password">Password</label>
          
          <input id="password" type="text" onChange={this.update('password')} value={this.state.password} />
          
          <br />
          <button onClick={this.handleSubmit}>{formType}</button>
          <div>{err}</div>
        </form>

        

      </div>
    )
  }
}


export default SessionForm;