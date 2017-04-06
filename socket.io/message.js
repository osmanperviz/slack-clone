import * as SocketEvents from '../socket.io/events'
import { ObjectId } from 'mongodb'

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
     * New message from client.
     */
    socket.on(SocketEvents.NEW_MESSAGE, async (message) => {
        try {
          const { userId, roomId, text } = message
          const newMessage = await Message.create({text: text, _creator: ObjectId(userId), room: ObjectId(roomId)})
          const messageWithCreator = await Message.findById(newMessage.id).populate('_creator', 'username') // :(

          //send message to room
          io.to(roomId).emit(SocketEvents.MESSAGES, roomId, messageWithCreator);

          await Room.findByIdAndUpdate(newMessage.room, {$push: { messages: ObjectId(newMessage._id)} }).exec()
          await User.findByIdAndUpdate(ObjectId(userId), {$push: { messages: ObjectId(newMessage._id)} }).exec()


        } catch(err) {
          console.log(err)
        }
    })

/**
   * Updare message from client.
   */
    socket.on(SocketEvents.UPDATE_MESSAGE, async (messageInfo) => {
        const { editedMessage, messageId, currentRoomId, userId } = messageInfo
        try {
          const updatedMessage = await Message.findOneAndUpdate({ _id: messageId }, {$set:{text: editedMessage}}, { "new": true}).exec()
          // trow error if no message

          io.to(updatedMessage.room).emit(SocketEvents.UPDATE_MESSAGE, updatedMessage.room, updatedMessage);

        } catch(err) {
          console.log(err)
        }
    })

}
