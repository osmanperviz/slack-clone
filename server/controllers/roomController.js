"use strict"
import Room from '../models/room'
import User from '../models/user'
import APIError from '../helpers/apiError';
import { ObjectId } from 'mongodb'


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

  create (req, res, next) {
    const { room } = req.body
    const newRoom = new Room({name: room.name})
    newRoom.users.push(ObjectId(room.userId))

    newRoom.save((err, newRoom) => {
      if(err) return next(err)

      User.findOneAndUpdate({_id: room.userId},
          {$push: { rooms: newRoom._id} },
          (err, user) => {
            if (err) return next(err)
            console.log(user)
            res.status(200).json(newRoom)
          });
    })
  }

/**
 * Get rooms/:roomId
 * @returns {Room[Message]}
 */
  show (req, res, next) {
    const { roomsId } = req.params
    Room.getRoomWithMessages(roomsId)
        .then((room) => res.status(200).json(room))
        .catch(e => next(e));
  }

  delete (req, res) {

  }


}

const roomController = new RoomController
export default roomController
