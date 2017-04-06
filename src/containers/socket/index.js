import React, { Component } from 'react';
import { connect } from 'react-redux'

import MessageList from '../../components/messagesList/'
import * as SocketEvents from '../../actions/types'
import { sidebarWidth } from '../../shared/styles';


import Form  from '../../components/chat/form'
import SideMenu from '../../components/sideMenu'

import { setRooms,
        setUsers,
        setSocket,
        updateMessages,
        setNewRoom,
        addNewRoom,
        updateMessage,
        newRoomCreated
      } from '../../actions/socketActions'


// const socket = io.connect('http://localhost:4000')

const styles = {
    container: {
        height: '100%'
    },
    content: {
        position: 'relative',
        marginLeft: sidebarWidth,
        height: '100%'
    }
};

class Socket extends Component {


  componentDidMount() {
    const { socket } = this.props
    const { setRooms,
          setUsers,
          updateMessages,
          setNewRoom,
          newRoomCreated,
          updateMessage,
          setSocket
        } = this.props;

     const events = [];


    /**
     * Listen for chat messages.
     */
    socket.on('connect', () => {
      socket.emit('userData', sessionStorage.getItem('id'))
    })

    socket.on(SocketEvents.ROOMS, (rooms) => {
      setRooms(rooms)
    });
    events.push(SocketEvents.ROOMS)

    socket.on(SocketEvents.USERS, (users) => {
      setUsers(users)
    });
    events.push(SocketEvents.USERS)

    socket.on(SocketEvents.ROOM_CHANGED, (newRoom) => {
      setNewRoom(newRoom)
    });
    events.push(SocketEvents.ROOM_CHANGED)

    socket.on(SocketEvents.NEW_ROOM_CREATED, (newRoom) => {
      newRoomCreated(newRoom)
    });
    events.push(SocketEvents.NEW_ROOM_CREATED)

    socket.on(SocketEvents.MESSAGES, (roomId, message) => {
        if (roomId && message) {
          updateMessages(roomId, message);
        }
    });
    events.push(SocketEvents.MESSAGES);

    socket.on(SocketEvents.UPDATE_MESSAGE, (roomId, message) => {
        updateMessage(roomId, message)
    });
    events.push(SocketEvents.MESSAGES);

    this.events = events;
  }

  /**
     * Remove event listeners and disconnect from this.props.socket.
     */
    componentWillUnmount() {
        const { events } = this;
        events.forEach((eventName) => {
            this.props.socket.off(eventName);
        });
        this.props.socket.disconnect();
    }

    _changeRoom = (roomId) => {
      this.props.socket.emit(SocketEvents.ROOM_CHANGED, roomId)
    }

    _addNewRoom = (name) => {
      this.props.socket.emit(SocketEvents.ADD_ROOM, {
        name,
        userId: sessionStorage.getItem('id')
      })
    }

    _handlePrivateRoomSubmit = (participant) => {
      this.props.socket.emit(SocketEvents.DIRECT_MESSAGE_ROOM, {
        name: participant.username,
        creator: sessionStorage.getItem('id'),
        participantId: participant._id
      })
    }

    _updateMessage = (editedMessage, messageId) => {
      const { currentRoom } = this.props
      this.props.socket.emit(SocketEvents.UPDATE_MESSAGE, {
        editedMessage,
        messageId,
        currentRoomId: currentRoom._id,
        userId: sessionStorage.getItem('id')
      })
    }

  render() {
      const { currentRoom, rooms, users } = this.props
      return (
        <div style={styles.container}>
          <div style={{width: 224, float: 'left'}}>
            <SideMenu rooms={rooms}
                      users={users}
                      changeRoom={this._changeRoom}
                      addNewRoom={this._addNewRoom}
                      handlePrivateRoomSubmit={this._handlePrivateRoomSubmit}
                      handleChanelSubmit={this._addNewRoom}
                    />
          </div>
            <div style={styles.content}>
              <MessageList updateMessage={this._updateMessage}/>

              <Form socket={this.props.socket} activeRoomId={currentRoom._id} />
            </div>
        </div>
      );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setRooms: (rooms) => {
      dispatch(setRooms(rooms));
    },
    setUsers: (users) => {
      dispatch(setUsers(users));
    },
    setNewRoom: (roomId, message) => {
      dispatch(setNewRoom(roomId, message));
    },
    newRoomCreated: (newRoom) => {
      dispatch(newRoomCreated(newRoom));
    },
    updateMessages: (roomId, message) => {
      dispatch(updateMessages(roomId, message));
    },
    updateMessage: (roomId, message) => {
      dispatch(updateMessage(roomId, message));
    }
  }
}

function mapStateToProps(state) {
  return {
    currentRoom: state.currentRoom,
    rooms: state.rooms,
    users: state.users,
    messages: state.messages,
    socket: state.socket
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socket)
