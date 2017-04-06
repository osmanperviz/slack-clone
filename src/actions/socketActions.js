  import * as types from './types'

export function setRooms(rooms) {
  return {
    type: types.SET_ROOMS,
    rooms
  }
}

export function setUsers(users) {
  return {
    type: types.SET_USERS,
    users
  }
}
export function newRoomCreated(room) {
 return {
    type: types.NEW_ROOM_CREATED,
    room
  }
}
export function setNewRoom(newRoom) {
  return {
    type: types.ROOM_CHANGED,
    newRoom
  }
}


export function addNewRoom(type, participant, text) {
  return {
    type: types.ADD_NEW_ROOM,
    type,
    participant,
    text
  }
}

export function setSocket(socket) {
  return {
    type: types.SET_SOCKET,
    socket
  }
}

export function userRegister(user) {
  return {
    type: types.USER_REGISTER,
    user
  }
}

export function updateMessages(roomId, message) {
  return {
    type: types.SET_MESSAGE,
    message,
    roomId
  }
}

export function updateMessage(roomId, message) {
  return {
    type: types.UPDATE_MESSAGE,
    message,
    roomId
  }
}

export function setUser(user) {
  return {
    type: types.SET_USER,
    user
  }
}

export function newUser(user) {
  return {
    type: types.NEW_USER,
    user
  }
}
