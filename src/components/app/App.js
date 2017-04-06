import React, { Component } from 'react';
import { connect } from 'react-redux'
import io from 'socket.io-client'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { setSocket } from '../../actions/socketActions'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    const socket = io.connect('http://localhost:4000')
    this.props.setSocket(socket);
  }

  render() {
    return (
      <MuiThemeProvider>
        { this.props.children }
      </MuiThemeProvider>
    )
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setSocket: (socket) => {
      dispatch(setSocket(socket));
    }
  }
}


export default connect(null, mapDispatchToProps)(App)
