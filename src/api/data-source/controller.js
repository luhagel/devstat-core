import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { DataSource } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  DataSource.create(body)
    .then((dataSource) => dataSource.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DataSource.find(query, select, cursor)
    .then((dataSources) => dataSources.map((dataSource) => dataSource.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DataSource.findById(params.id)
    .then(notFound(res))
    .then((dataSource) => dataSource ? dataSource.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  DataSource.findById(params.id)
    .then(notFound(res))
    .then((dataSource) => dataSource ? _.merge(dataSource, body).save() : null)
    .then((dataSource) => dataSource ? dataSource.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  DataSource.findById(params.id)
    .then(notFound(res))
    .then((dataSource) => dataSource ? dataSource.remove() : null)
    .then(success(res, 204))
    .catch(next)
