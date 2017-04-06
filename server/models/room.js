import mongoose from 'mongoose';
import APIError from '../helpers/apiError';

import Messages from './message'
const Schema = mongoose.Schema;
import { channel, defaultRoom } from '../config/constants'

/**
 * Room Schema
 */

 const RoomSchema = new Schema({
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
    }],
    type: {
      type: String,
      default: channel
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
 })

 /**
 * Statics
 */
RoomSchema.statics = {

  getRoomWithMessages(id) {
    return this.findById({_id: id})
      .select('-users')
      .populate({
        path: 'messages',
        select: 'text created_at _creator',
        options: { limit: 25 },
        populate: {
          path: '_creator',
          select: 'username'
        }
      })
      .exec()
  },

  getInitialRoom() {
    return this.findOne({name: defaultRoom})
              .select('-users')
              .populate('messages')
              .populate({
                path: 'messages',
                select: 'text created_at _creator',
                options: { limit: 25 },
                populate: {
                  path: '_creator',
                  select: 'username'
                }
              })
  }
}

/** Remove all ref to this room **/
RoomSchema.pre('remove', function(next) {
  this.model('User').update(
    {_id: {$in: this.users}},
    {$pull: {rooms: this._id}},
    {multi: true},
    next
  )
})


 export default mongoose.model('Room', RoomSchema);
