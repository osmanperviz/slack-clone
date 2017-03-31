import mongoose from 'mongoose';

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
  }
}

 export default mongoose.model('Room', RoomSchema);
