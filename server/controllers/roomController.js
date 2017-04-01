"use strict"
import Room from '../models/room'
import User from '../models/user'
import APIError from '../helpers/apiError';


class RoomController {
/**
 * Get rooms
 * @returns {Room[]}
 */
  index (req,res) {
    Room.all()
        .then(rooms => res.status(200).json(rooms))
        .catch(e => next(e));
  }


  create (req, res) {
  }

/**
 * Get rooms/:roomId
 * @returns {Room}
 */
  show (req, res) {

  }

  delete (req, res) {

  }


}

const roomController = new RoomController
export default roomController
