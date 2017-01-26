import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Member, { schema } from './model'

const router = new Router()
const { name, status, group } = schema.tree

/**
 * @api {post} /members Create member
 * @apiName CreateMember
 * @apiGroup Member
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Member's name.
 * @apiParam status Member's status.
 * @apiParam group Member's group.
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, status, group }),
  create)

/**
 * @api {get} /members Retrieve members
 * @apiName RetrieveMembers
 * @apiGroup Member
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} members List of members.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /members/:id Retrieve member
 * @apiName RetrieveMember
 * @apiGroup Member
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /members/:id Update member
 * @apiName UpdateMember
 * @apiGroup Member
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Member's name.
 * @apiParam status Member's status.
 * @apiParam group Member's group.
 * @apiSuccess {Object} member Member's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Member not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, status, group }),
  update)

/**
 * @api {delete} /members/:id Delete member
 * @apiName DeleteMember
 * @apiGroup Member
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Member not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
