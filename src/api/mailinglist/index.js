import { Router } from 'express'
import { create } from './controller'
export Mailinglist, { schema } from './model'

const router = new Router()

/**
 * @api {post} /mailinglists Create mailinglist
 * @apiName CreateMailinglist
 * @apiGroup Mailinglist
 * @apiSuccess {Object} mailinglist Mailinglist's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mailinglist not found.
 */
router.post('/',
  create)

export default router
