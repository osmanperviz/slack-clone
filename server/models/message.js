import mongoose from 'mongoose';

/**
 * Message Schema
 */

 const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  _creator: {
    type: Number,
    ref: 'User'
  },
  room: {
    type: Number,
    ref: 'Room'
  }
 })

 export default mongoose.model('Message', MessageSchema);
