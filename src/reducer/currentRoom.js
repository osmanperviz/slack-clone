import * as socketTypes from '../actions/types'

function currentRoom(state = {}, action) {
  switch (action.type) {
    case socketTypes.SET_ROOMS:
      return { ...state, ...action.rooms.currentRoom }
      break;

    case socketTypes.SET_MESSAGE:
      if (action.message.room === state._id) {
        const messages = state.messages.concat(action.message)
        return {...state, messages  }
      }
      break;

    case socketTypes.ROOM_CHANGED:
      return {...state, ...action.newRoom  }
      break;

    case socketTypes.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((message) => message._id === action.message._id ?
        { ...message, text: action.message.text } :
        message
      )}
      break;
    default:
      return state
  }
}
export default currentRoom
