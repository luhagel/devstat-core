import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Team, { schema } from './model'

const router = new Router()
const { name, members } = schema.tree

/**
 * @api {post} /teams Create team
 * @apiName CreateTeam
 * @apiGroup Team
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Team's name.
 * @apiParam members Team's members.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, members }),
  create)

/**
 * @api {get} /teams Retrieve teams
 * @apiName RetrieveTeams
 * @apiGroup Team
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} teams List of teams.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /teams/:id Retrieve team
 * @apiName RetrieveTeam
 * @apiGroup Team
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /teams/:id Update team
 * @apiName UpdateTeam
 * @apiGroup Team
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Team's name.
 * @apiParam members Team's members.
 * @apiSuccess {Object} team Team's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Team not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, members }),
  update)

/**
 * @api {delete} /teams/:id Delete team
 * @apiName DeleteTeam
 * @apiGroup Team
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Team not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
