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
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
 })

 export default mongoose.model('Message', MessageSchema);
