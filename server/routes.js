import express from 'express';
import UserController from './controllers/userController'

const router = express.Router();

/** User routes **/
router.route('/users/:usersId')
/** GET /api/users/:usersId - Get user details*/
  .get(UserController.show)

router.route('/users/register')
/** POST /api/users/register - Register on app */
  .post(UserController.register)

export default router
