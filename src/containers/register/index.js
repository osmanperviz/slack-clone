import React, { Component } from 'react';
import { connect } from 'react-redux'

import RegistrationForm from './registrationForm'
import  { userRegistration } from './actions'

class Register extends Component {

  render() {
      return (
        <RegistrationForm userRegistration={this.props.userRegistration }/>
      );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    userRegistration: (username) => {
      dispatch(userRegistration(username));
    }
  }
}

export default connect(null, mapDispatchToProps)(Register)
