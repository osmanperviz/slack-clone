import React, { Component } from 'react';
import { connect } from 'react-redux'
import Message from './message'

class MessageList extends Component {

  render(){
    const { currentRoom } = this.props
    return(
      <div>
        <h3> #{currentRoom.name} </h3>
        {
          Object.keys(currentRoom).length > 0 ?
            currentRoom.messages.map((message) => <Message key={message._id} {...message} updateMessage={this.props.updateMessage} />) : 'No messages'
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    currentRoom: state.currentRoom
  }
}


export default connect(mapStateToProps, null)(MessageList)
