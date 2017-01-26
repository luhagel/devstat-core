import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Team } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Team.create({ ...body, user })
    .then((team) => team.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Team.find(query, select, cursor)
    .populate('user')
    .then((teams) => teams.map((team) => team.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Team.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((team) => team ? team.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Team.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((team) => team ? _.merge(team, body).save() : null)
    .then((team) => team ? team.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Team.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((team) => team ? team.remove() : null)
    .then(success(res, 204))
    .catch(next)
