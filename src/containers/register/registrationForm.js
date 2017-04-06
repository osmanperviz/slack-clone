import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Form from '../../shared/form';

class RegistrationForm extends Component{

  _handleSubmit = (event) => {
    event.preventDefault();
    this.props.userRegistration(this.refs.username.input.value)
  }
  render() {
    return (
      <Form heading='Register' onSubmit={this._handleSubmit}>
          <TextField
              ref='username'
              type='username'
              floatingLabelText='Username'
              hintText='some username'
              autoFocus
          />
          <br />
          <br />
          <RaisedButton
              type='submit'
              label='Register'
              primary={true}
          />
          <br />
          <br />
      </Form>
    )
  }
}

RegistrationForm.propTypes = {
  userRegistration: React.PropTypes.func.isRequired
}

export default RegistrationForm
