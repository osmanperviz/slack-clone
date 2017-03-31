import express from 'express';
import RoomController from './controllers/roomController'

const router = express.Router();

/** Rooms routes **/
debugger;

router.route('/rooms')
  /** GET /api/rooms - Get list of chat rooms */
  .get(RoomController.index)
  /** POST /api/rooms - Create new room */
  .post(RoomController.create)
  /** POST /api/rooms/:roomId/join - User join to new room */
  //.post(RoomController.join)

router.route('/rooms/:roomsId')
  /** GET /api/rooms/:roomId - Get single room */
  .get(RoomController.show)


/** Messages routes**/

/** User routes**/

export default router
