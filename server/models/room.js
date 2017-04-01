import mongoose from 'mongoose';
import APIError from '../helpers/apiError';

import Messages from './message'


/**
 * Room Schema
 */

 const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
 })

 /**
 * Statics
 */
RoomSchema.statics = {
  all() {
    return this.find({})
                .select('-messages -users')
                .exec()
  },
  getRoomWithMessages(id) {
    return this.findById({_id: id})
      .select('-users')
      .populate({
        path: 'messages',
        select: 'text _creator',
        populate: {
          path: '_creator',
          select: 'name'
        }
      })
      .exec()
      .then((room) => {
        if (room) return room
        const err = new APIError('No such room exists!',404);
        return Promise.reject(err);
      })
  }
}

 export default mongoose.model('Room', RoomSchema);
