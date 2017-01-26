import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { GithubAccount } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  GithubAccount.create(body)
    .then((githubAccount) => githubAccount.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  GithubAccount.find(query, select, cursor)
    .then((githubAccounts) => githubAccounts.map((githubAccount) => githubAccount.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  GithubAccount.findById(params.id)
    .then(notFound(res))
    .then((githubAccount) => githubAccount ? githubAccount.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  GithubAccount.findById(params.id)
    .then(notFound(res))
    .then((githubAccount) => githubAccount ? _.merge(githubAccount, body).save() : null)
    .then((githubAccount) => githubAccount ? githubAccount.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  GithubAccount.findById(params.id)
    .then(notFound(res))
    .then((githubAccount) => githubAccount ? githubAccount.remove() : null)
    .then(success(res, 204))
    .catch(next)
