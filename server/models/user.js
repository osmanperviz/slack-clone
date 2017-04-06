import mongoose from 'mongoose';
import APIError from '../helpers/apiError';

/**
 * User Schema
 */

 const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
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
    getAll() {
      return this
              .find({})
              .select('-rooms -messages')
              .exec()
    }

 }


 export default mongoose.model('User', UserSchema);
