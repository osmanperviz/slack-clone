
/**
 * Module dependencies.
 */

 import { defaultRoom } from '../config/constants'
import Room from '../models/room'

 /**
  * Create default channel (if applicable).
  */
  export default function() {
    Room.findOne({name: defaultRoom}, (err, room) => {
        if (err) return next(err);
        if (!room) {
            new Room({
                name: defaultRoom,
                users: [],
                messages: []
            }).save();
        }
    });
  }
