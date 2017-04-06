import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as SocketEvents from '../../actions/types'
import { browserHistory } from 'react-router'

import RegistrationForm from './registrationForm'
import  { setUser, setNewRoom, setRooms } from '../../actions/socketActions'


class Register extends Component {

  componentDidMount() {
    const { socket, setUser, setNewRoom } = this.props

    socket.on(SocketEvents.USER_REGISTER, (initialInfo) => {
     const { currentUser, currentRoom } = initialInfo
     setUser(currentUser)
     setNewRoom(currentRoom)
     setRooms({rooms: currentRoom})
     sessionStorage.setItem('id', currentUser._id);
     browserHistory.push('/messages')
    });

  }


  _userRegistration = (username) => {
    this.props.socket.emit(SocketEvents.USER_REGISTRATION, {username})
  }

  render() {
      return (
        <RegistrationForm userRegistration={this._userRegistration }/>
      );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
    setNewRoom: (newRoom) => {
      dispatch(setNewRoom(newRoom));
    },
    setRooms: (newRoom) => {
      dispatch(setRooms(newRoom));
    },

  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
