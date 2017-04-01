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

/**
 * POST /rooms
 * @returns {Room}
 */

  create (req, res, next) {
    const newRoom = new Room({name: req.body.name})
    newRoom.users.push(ObjectId(req.current_user))

    newRoom.save()
      .then((newRoom) => {
        return User.findOneAndUpdate({_id: req.current_user}, {$push: { rooms: newRoom._id} }).exec()
      })
      .then( res.status(200).json(newRoom) )
      .catch((err) => next(err))
  }
/**
 * GET rooms/:roomId/join
 * @returns {message}
 */

  join (req, res, next) {
    const { roomsId } = req.params
    Room.findById(roomsId).exec().then((room) => {
      room.users.push(ObjectId(req.current_user))
      return room.save()
    }).then((updatedRoom) => {
      return User.findOneAndUpdate({_id: req.current_user}, {$push: { rooms: updatedRoom._id} }).exec()
    }).then((updatedUser) => {
      res.status(200).json({message: 'Successfully assigned'})
    })
    .catch((err) => next(err))
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

/**
 * DELETE rooms/:roomId
 * @returns {}
 */

  delete (req, res, next) {
    const { room: { roomId } } = req.body
    Room.findOne({ _id: ObjectId(roomId) }, (err, room) => {
      if(err) return next(err)

      room.remove((err) => {
        if(err) return next(err)

        res.status(200).json({})
      })
    })
  }

}

const roomController = new RoomController
export default roomController
