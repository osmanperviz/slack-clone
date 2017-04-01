import Room from '../models/room'
import User from '../models/user'
import APIError from '../helpers/apiError';
import { ObjectId } from 'mongodb'
import { defaultRoom } from '../config/constants'

class UserController {
  /**
   * POST register
   * @returns {User}
   */
    register (req, res, next) {
      const newUser = new User(req.body)
      newUser.save()
        .then((newUser) => {
          return Room.findOneAndUpdate({name: defaultRoom}, {new: true}, { $push: { users: newUser._id } })
        })
        .then((room) => {
          newUser.rooms = room._id
          return newUser.save()
        })
        .then((newUser) => {
          res.status(200).json(newUser)
        })
        .catch((err) => next(err))
    }
}

const userController = new UserController
export default userController
