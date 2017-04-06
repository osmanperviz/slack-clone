import * as socketTypes from '../actions/types'


function roomsReducer(state = [], action) {
  switch (action.type) {

    case socketTypes.SET_ROOMS:
      return [...state, ...action.rooms.rooms ]
      break;

    case socketTypes.SET_NEW_ROOM:
      if (state[1]._creator === action.room._creator) {
        return [...state, ...action.room]
      }
      return state
     break;

    case socketTypes.NEW_ROOM_CREATED:
      return state.concat(action.room)
      break;

    case socketTypes.USER_REGISTER:
      return [...state, ...action.rooms ]
      break;

    default:
      return state;
  }
}
export default roomsReducer
