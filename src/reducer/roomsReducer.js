import * as socketTypes from '../actions/types'


function roomsReducer(state = [], action) {
  switch (action.type) {

    case socketTypes.SET_ROOMS:
    debugger
      return [...state, ...action.rooms.rooms ]
      break;

    case socketTypes.SET_NEW_ROOM:
    debugger
      if (state[1]._creator === action.room._creator) {
        return [...state, ...action.room]
      }
     break;

    case socketTypes.NEW_ROOM_CREATED:
      return state.concat(action.room)
      break;

    default:
      return state;
  }
}
export default roomsReducer
