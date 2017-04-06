import React, { Component } from 'react'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import MenuDialog from './menuDialog'

const styles = {
  marginLeft: 150
};

class SideMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      roomRequest: 'chanel'
    }
  }

  _handleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  _handleClick = (roomId) => {
    this.props.changeRoom(roomId)
  }

  _addChanel = () => {
    this.setState({
      modalOpen: true,
      roomRequest: 'chanel'
    })
  }

  _addPrivateRoom = () => {
      this.setState({
        modalOpen: true,
        roomRequest: 'directMessages'
      })
  }

  _channelSubmit = (value) => {
    this.props.handleChanelSubmit(value)
    this.setState({
      modalOpen: false
    });
  }

  _selectUser = (value) => {
    this.props.handlePrivateRoomSubmit(value)
    this.setState({
      modalOpen: false
    });
  }


  render() {
    const { rooms  } = this.props
    const chanels = rooms.filter(room => room.type === 'channel')
    const dirrecMessages = rooms.filter(room => room.type === 'directMessages')

    return (
      <div>
        <FloatingActionButton mini={true} style={styles} onClick={this._addChanel}>
          <ContentAdd />
        </FloatingActionButton>
        <ListItem primaryText="Chanels" />
        <Divider />

        <List>
          { chanels.map(room => <ListItem primaryText={room.name} key={room._id}  onClick={() => this._handleClick(room._id)}/> ) }
        </List>
        <br/>
        <br/>
        <br/>

        <FloatingActionButton mini={true} style={styles} onClick={this._addPrivateRoom}>
          <ContentAdd />
        </FloatingActionButton>

        <h3>Dirrect messages</h3>
        <Divider />

        <List>
          { dirrecMessages.map(room => <ListItem primaryText={room.name} key={room._id} onClick={() => this._handleClick(room._id)}/> ) }
        </List>

        <MenuDialog
          handleClose={this._handleModalClose}
          open={this.state.modalOpen}
          users={this.props.users}
          roomType={this.state.roomRequest}
          handleChanelSubmit={this.props.handleChanelSubmit}
          handlePrivateRoomSubmit={this.props.handlePrivateRoomSubmit}
          selectUser={this._selectUser}
          channelSubmit={this._channelSubmit}
        />
      </div>
    )
  }
}

SideMenu.propTypes = {
  rooms: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  changeRoom: React.PropTypes.func.isRequired,
  addNewRoom: React.PropTypes.func.isRequired,
  handlePrivateRoomSubmit: React.PropTypes.func.isRequired,
  handleChanelSubmit: React.PropTypes.func.isRequired,
  selectUser: React.PropTypes.func.isRequired
}

export default SideMenu
