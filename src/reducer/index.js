import { combineReducers } from 'redux'
import messages from './messagesReducer'
import rooms from './roomsReducer'
import users from './usersReducer'
import currentRoom from './currentRoom'
import socket from './socket'
import user from './userReducer'

const reducer = combineReducers(Object.assign({},{
  messages,
  rooms,
  users,
  currentRoom,
  socket,
  user
}));

export default reducer
