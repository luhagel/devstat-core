import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export DataSource, { schema } from './model'

const router = new Router()
const { type, data } = schema.tree

/**
 * @api {post} /data-sources Create data source
 * @apiName CreateDataSource
 * @apiGroup DataSource
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam type Data source's type.
 * @apiParam data Data source's data.
 * @apiSuccess {Object} dataSource Data source's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data source not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ type, data }),
  create)

/**
 * @api {get} /data-sources Retrieve data sources
 * @apiName RetrieveDataSources
 * @apiGroup DataSource
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} dataSources List of data sources.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /data-sources/:id Retrieve data source
 * @apiName RetrieveDataSource
 * @apiGroup DataSource
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} dataSource Data source's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data source not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /data-sources/:id Update data source
 * @apiName UpdateDataSource
 * @apiGroup DataSource
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam type Data source's type.
 * @apiParam data Data source's data.
 * @apiSuccess {Object} dataSource Data source's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data source not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ type, data }),
  update)

/**
 * @api {delete} /data-sources/:id Delete data source
 * @apiName DeleteDataSource
 * @apiGroup DataSource
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Data source not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
