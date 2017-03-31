import mongoose from 'mongoose';

/**
 * User Schema
 */

 const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required'
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

 export default mongoose.model('User', UserSchema);
