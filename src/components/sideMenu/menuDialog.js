import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';


class MenuDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      open: true,

    }
  }

  _handleChanelSubmit = (event) => {
    event.preventDefault();
    this.props.handleChanelSubmit(this.state.value)
    this.setState({
      value: '',
      open: false
    });
  }

  _handlePrivateRoomSubmit = (event) => {
    event.preventDefault();
  }

  _handleChange = (event, value) => {
    this.setState({ value: value });
  }

  _selectUser = (value) => {
    this.props.selectUser(value)
  }


  render() {
    const { users } = this.props
    const title = this.props.roomType === 'chanel' ? "Create Chanel" : "Create Private Room"
    const autoCompleteConfig = { text: 'username', value: '_id' };

    const cancelButton = <FlatButton
                             label="Cancel"
                             primary={true}
                             onClick={this.props.handleClose}
                           />
    return (
      <Dialog
        title={title}
        actions={cancelButton}
        modal={true}
        open={this.props.open && this.state.open}
        handleClose={this.props.handleClose}
        roomType={this.props.roomType}
      >
        { this.props.roomType === 'chanel' ?
              (
                <form onSubmit={this._handleChanelSubmit}>
                    <TextField
                      hintText="Chanel Name"
                      fullWidth={true}
                      value={this.state.value}
                      onChange={this._handleChange}
                    />
                </form>
              )
                :
              (
                 <form onSubmit={this._handlePrivateRoomSubmit}>
                  {/* <TextField
                      ref='name'
                      type='chanel name'
                      floatingLabelText='Username'
                      hintText='some username'
                      autoFocus
                  /> */}
                  <AutoComplete
                     hintText="Find user"
                     dataSource={users}
                     floatingLabelText="Full width"
                     fullWidth={true}
                     dataSourceConfig={autoCompleteConfig}
                     onNewRequest={this._selectUser}
                   />
               </form>
              )
          }
      </Dialog>
    );
  }

}

MenuDialog.propTypes = {
  handleClose: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  users: React.PropTypes.array.isRequired,
  roomType: React.PropTypes.string.isRequired,
  handlePrivateRoomSubmit: React.PropTypes.func.isRequired,
  handleChanelSubmit: React.PropTypes.func.isRequired,
  selectUser: React.PropTypes.func.isRequired,
};

export default MenuDialog
