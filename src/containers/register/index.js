// import { browserHistory } from 'react-router';
import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

// import { connect } from 'react-redux';
// import { setUser } from '../actions';

import Form from '../../shared/form';


class Register extends Component {


    _handleSubmit(event) {

    }

    render() {
        return (
            <Form heading='Register' onSubmit={this._handleSubmit}>
                <TextField
                    ref='email'
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
        );
    }
}

export default Register
