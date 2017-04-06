import * as SocketEvents from '../socket.io/events'
import { ObjectId } from 'mongodb'
import Room from '../server/models/room'
import User from '../server/models/user'

/**
 * Initial actions when client connects.
 *
 * @param {Object} io     - The io.
 * @param {Object} socket - The socket.
 */

export default async function (io, socket) {

    //I know not nice, but don't have time for fancy stuff :)
    //this should be saved in session or redis
    socket.on('userData', async (id) => {
       io.sockets.sockets[id] = socket.id;

       try {
         const rooms = await Room.find({}).where('users').in([ ObjectId(id)]).exec()
         const currentRoom = await Room.getInitialRoom()

         socket.join(currentRoom._id)
         socket.emit(SocketEvents.ROOMS, { rooms, currentRoom })

         const users = await User.getAll()
         socket.emit(SocketEvents.USERS, users )

       } catch(err) {
         console.log(err)
       }
    })

}
