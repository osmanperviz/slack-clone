"use strict"
import Room from '../models/room'
import User from '../models/user'
import Message from '../models/message'
import APIError from '../helpers/apiError';
import { ObjectId } from 'mongodb'

class MessageController {
/**
 * Get rooms
 * @returns {Messages[]}
 */

 create (req, res, next) {
   const { text, userId, roomId } = req.body
   const newMessage = new Message({text, _creator: req.current_user, room: roomId})
   newMessage.save()
      .then((message) => {
        return Room.findOneAndUpdate({_id: message.room}, {$push: { messages: message._id} }).exec()
      }).then((room) => {
        return User.findOneAndUpdate({_id: req.current_user}, {$push: { messages: req.current_user} }).exec()
      }).then((user) => {
        res.status(200).json({message: "You are successfully create message"})
      })
      .catch((err) => next(err))
 }


}

const messageController = new MessageController
export default messageController
