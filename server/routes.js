import express from 'express';
import RoomController from './controllers/roomController'

const router = express.Router();

/** Rooms routes **/

router.route('/rooms')
  /** GET /api/rooms - Get list of chat rooms */
  .get(RoomController.index)
  /** POST /api/rooms - Create new room */
  .post(RoomController.create)
  /** DELETE /api/rooms/:roomId - Delete room */
  .delete(RoomController.delete)

router.route('/rooms/:roomsId')
/** GET /api/rooms/:roomId - Get single room */
  .get(RoomController.show)

router.route('/rooms/:roomsId/join')
/** GET /api/rooms/:roomId/join- Join user to the room */
  .post(RoomController.join)


/** Messages routes **/

/** User routes **/

export default router
