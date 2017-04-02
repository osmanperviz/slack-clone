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
      ref: 'User',
      required: true
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
 })

 export default mongoose.model('Message', MessageSchema);
