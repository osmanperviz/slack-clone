import Room from '../models/room'
import User from '../models/user'
import APIError from '../helpers/apiError';
import { ObjectId } from 'mongodb'
import { defaultRoom } from '../config/constants'

class UserController {
  /**
   * POST /users/register
   * @returns {User}
   */
    async register (req, res, next) {
      try {
        const newUser = await User.create({ username: req.body.username})
        const room =  await Room.findOneAndUpdate({name: defaultRoom},{ $push: { users: newUser._id } }).exec()
        newUser.rooms.push(ObjectId(room._id))
        await newUser.save()
        res.status(200).json({id: newUser._id})
      } catch (err) {
        console.log(err)
      }
    }

  /**
   * GET /users/:usersId
   * @returns {User}
   */

  async show (req, res, next) {}
}

const userController = new UserController
export default userController
