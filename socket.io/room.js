import * as SocketEvents from '../socket.io/events'
import { ObjectId } from 'mongodb'
import { directMessages, channel } from '../server/config/constants'

import Room from '../server/models/room'
import User from '../server/models/user'
import Message from '../server/models/message'
/**
 * Event listeners for messages.
 *
 * @param {Object} io     - The io.
 * @param {Object} socket - The socket.
 */

export default async function (io, socket) {

/**
   * User change room from client.
   */
  socket.on(SocketEvents.ROOM_CHANGED, async (newRoomId) => {
    try {
      socket.leave(socket.room);
      const newRoom = await Room.getRoomWithMessages(newRoomId)
      // trow error if no newRoom

      socket.join(newRoom._id);

      socket.emit(SocketEvents.ROOM_CHANGED, newRoom)

    } catch(err) {
      console.log(err)
    }
  })

/**
   * Creation channel room from client.
   */
  socket.on(SocketEvents.ADD_ROOM, async (newRoom) => {
    const { name, userId } = newRoom

    try {
      const newRoom = await Room.create({name: name, _creator: userId})
      await Room.findByIdAndUpdate(ObjectId(newRoom._id), {$push: { users: ObjectId(userId) } }).exec()

      socket.join(newRoom._id);
      socket.emit(SocketEvents.NEW_ROOM_CREATED, newRoom)

    } catch(err) {
      console.log(err)
    }
  })

/**
   * Creation direct message room from client.
   */
  socket.on(SocketEvents.DIRECT_MESSAGE_ROOM, async (newRoom) => {
    const { name, participantId, creator } = newRoom

    try {
      const newDirectRoom = await Room.create({name: name, type: directMessages, _creator: ObjectId(creator)})
      newDirectRoom.users.push(ObjectId(participantId), ObjectId(creator))
      newDirectRoom.save()

      socket.join(newDirectRoom._id);

      //I know not best solution :)
      [io.sockets.sockets[creator], io.sockets.sockets[participantId]].forEach((reciver) =>{
        socket.to(reciver).emit(SocketEvents.NEW_ROOM_CREATED, newDirectRoom)
      })

    } catch(err) {
      console.log(err)
    }
  })
 }
