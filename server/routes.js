import express from 'express';
import RoomController from './controllers/roomController'

const router = express.Router();

router.route('/rooms')
  /** GET /api/rooms - Get list of chat rooms */
  .get(RoomController.index)
  /** POST /api/rooms - Create new room */
  .post(RoomController.create)

router.route('/:roomsId')
  /** GET /api/rooms/:roomId - Get single room */
  .get(RoomController.show)


export default router
