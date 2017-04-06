
import React, { Component } from 'react';

import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import { NEW_MESSAGE } from '../../actions/types';

import {
    formHeight,
    gutter,
    sidebarWidth
} from '../../shared/styles';

const formStyle = {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    marginLeft: sidebarWidth,
    height: formHeight
};

const lineStyle = {
    marginBottom: gutter
};

const containerStyle = {
    position: 'relative',
    margin: `0 ${gutter}px`
};

const buttonStyle = {
    position: 'absolute',
    left: 0
};

const inputStyle = {
    position: 'absolute',
    right: 0,
    left: 100
};

class Form extends Component {

    constructor(props) {
      super(props);
      this.state = {
          value: ''
      };
    }

    componentDidUpdate(prevProps) {
      const { input } = this.refs;

      if (input && prevProps.activeRoomId !== this.props.activeRoomId) {
          input.focus();
      }
    }

    _handleChange = (event, value) => {
      this.setState({ value: value });
    }


    _handleSubmit = (event) => {
        event.preventDefault();
        const { socket, activeRoomId } = this.props
        socket.emit(NEW_MESSAGE, {
            roomId: activeRoomId,
            userId: sessionStorage.getItem('id'),
            text: this.state.value
        });
        this.setState({ value: '' });
    }

    render() {
        return (
            <form onSubmit={this._handleSubmit} style={formStyle}>
                <Divider style={lineStyle} />
                <div style={containerStyle}>
                    <div style={buttonStyle}>
                        <IconButton
                            iconClassName='material-icons'
                            type='submit'>
                            add
                        </IconButton>
                    </div>

                    <div style={inputStyle}>
                        <TextField
                            ref='input'
                            fullWidth={true}
                            hintText='Message'
                            onChange={this._handleChange}
                            value={this.state.value}
                            autoComplete={false}
                            autoCorrect={false}
                            spellCheck={true}
                            autoFocus
                        />
                    </div>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    activeRoomId: React.PropTypes.string,
    socket: React.PropTypes.object,
};

export default Form
