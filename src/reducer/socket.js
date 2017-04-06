import * as socketTypes from '../actions/types'

function socketReducer(state = {}, action) {
    const { type, socket } = action;
    switch (type) {
        case socketTypes.SET_SOCKET:
            if (typeof socket === 'object' &&
                typeof socket.emit === 'function' &&
                typeof socket.on === 'function') {
                return socket;
            }
            return state;

        default:
            return state;
    }
}

export default socketReducer
