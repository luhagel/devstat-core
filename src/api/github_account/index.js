import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export GithubAccount, { schema } from './model'

const router = new Router()
const { login, commits } = schema.tree

/**
 * @api {post} /github_accounts Create github account
 * @apiName CreateGithubAccount
 * @apiGroup GithubAccount
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam login Github account's login.
 * @apiParam commits Github account's commits.
 * @apiSuccess {Object} githubAccount Github account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Github account not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ login, commits }),
  create)

/**
 * @api {get} /github_accounts Retrieve github accounts
 * @apiName RetrieveGithubAccounts
 * @apiGroup GithubAccount
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} githubAccounts List of github accounts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /github_accounts/:id Retrieve github account
 * @apiName RetrieveGithubAccount
 * @apiGroup GithubAccount
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} githubAccount Github account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Github account not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /github_accounts/:id Update github account
 * @apiName UpdateGithubAccount
 * @apiGroup GithubAccount
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam login Github account's login.
 * @apiParam commits Github account's commits.
 * @apiSuccess {Object} githubAccount Github account's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Github account not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ login, commits }),
  update)

/**
 * @api {delete} /github_accounts/:id Delete github account
 * @apiName DeleteGithubAccount
 * @apiGroup GithubAccount
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Github account not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
