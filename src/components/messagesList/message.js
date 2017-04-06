import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import ListItem from 'material-ui/List/ListItem';
import { grey500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { messagePadding } from '../../shared/styles';


const styles = {
    container: {
        margin: messagePadding,
        paddingTop: messagePadding,
        paddingBottom: messagePadding
    },
    username: {
        fontWeight: 'bold',
        marginRight: 8
    },
    time: {
        fontSize: 12,
        color: grey500
    },
    text: {
        lineHeight: 1.5
    },
    avatar: {
        top: 'initial'
    }
};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Edit"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);



export default class Message extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  _handlesubmit = (event) => {
    event.preventDefault();
    this.props.updateMessage(this.state.editMessage, this.props._id)
    this.setState({
      modalOpen: false,
      editMessage: ''
    })
  }

  _handleEdit = (text) => {
    this.setState({
      modalOpen: true,
      editMessage: text
    })
  }

  _handleChange = (event, value) => {
    this.setState({
      editMessage: value
    })
  }

  render() {
    const {
        created_at,
        _id,
        text,
        _creator
    } = this.props;

    const leftAvatar = (
        <Avatar
            style={styles.avatar}
            icon={
                <FontIcon className='material-icons'>
                    face
                </FontIcon>
            }
        />
    );

    const primaryText = (
        <div>
            <strong style={styles.username}>
                { _creator.username }
            </strong>
            <span style={styles.time}>
                {created_at}
            </span>
            <div style={styles.text}>
                {text}
            </div>
        </div>
    );

    const rightIconMenu = (
        <IconMenu  iconButtonElement={iconButtonElement}>
          <MenuItem>Reply</MenuItem>
          <MenuItem>Forward</MenuItem>
          <MenuItem>Delete</MenuItem>
        </IconMenu>

    );
    return (
        <div id={_id}>
            <ListItem
                leftAvatar={leftAvatar}
                primaryText={primaryText}
                style={styles.container}
                disabled={true}
                rightIconButton={rightIconMenu}
                onClick={() => { this._handleEdit(text) }}

            />
            <Dialog
              title="Update Message"
              modal={this.state.modalOpen}
              open={this.state.modalOpen}
            >
              <form onSubmit={this._handlesubmit} >
                <TextField
                  value={this.state.editMessage}
                  fullWidth={true}
                  onChange={this._handleChange}
                />
              </form>
            </Dialog>
        </div>
    );
  }
}

Message.propTypes = {
    created: React.PropTypes.instanceOf(Date),
    _id: React.PropTypes.string,
    text: React.PropTypes.string,
    username: React.PropTypes.string,
    updateMessage: React.PropTypes.func.isRequired
};
