import * as SocketEvents from '../socket.io/events'
import { ObjectId } from 'mongodb'
import { defaultRoom } from '../server/config/constants'

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
  socket.on(SocketEvents.USER_REGISTRATION, async (user) => {
    const { username } = user
    
    try {
      const currentUser = await User.create({ username: username})
      const room =  await Room.findOneAndUpdate({name: defaultRoom},{ $push: { users: currentUser._id } }).exec()
      currentUser.rooms.push(ObjectId(room._id))
      await currentUser.save()

      io.sockets.sockets[currentUser._id] = socket.id;

      const currentRoom = await Room.getInitialRoom()

      socket.join(currentRoom._id)
      socket.emit(SocketEvents.USER_REGISTER, { currentUser, currentRoom })

      const users = await User.getAll()
      socket.emit(SocketEvents.USERS, users )

    } catch (err) {
      console.log(err)
    }
  })

 }
