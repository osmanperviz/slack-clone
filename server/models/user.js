import mongoose from 'mongoose';

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

 UserSchema.pre('save', (next, done) => {

 })

 export default mongoose.model('User', UserSchema);
