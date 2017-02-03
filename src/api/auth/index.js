import { Router } from 'express'
import { login } from './controller'
import { password } from '../../services/passport'

const router = new Router()

/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission public
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 */
router.post('/',
  password(),
  login)

export default router
