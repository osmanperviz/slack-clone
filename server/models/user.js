import mongoose from 'mongoose';
import APIError from '../helpers/apiError';

/**
 * User Schema
 */

 const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      // unique: true
    },
    rooms: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
 })

 /**
 * Statics
 */
 UserSchema.statics = {
   getUserWithRooms(id) {
     return this.findById({_id: id})
       .select('-messages')
       .populate({
         path:'rooms',
         select: '_id name type'
       })
       .exec()
       .then((user) => {
         if (user) return user
         const err = new APIError('No such user exists!', 404);
         return Promise.reject(err);
       })
    }
 }


 export default mongoose.model('User', UserSchema);
