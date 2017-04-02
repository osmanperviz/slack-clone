import mongoose from 'mongoose';
import APIError from '../helpers/apiError';

import Messages from './message'
const Schema = mongoose.Schema;
import { channel } from '../config/constants'



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
    }
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
