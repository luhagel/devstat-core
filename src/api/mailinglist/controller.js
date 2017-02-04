import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Mailinglist } from '.'

export const create = ({ body }, res, next) =>
  Mailinglist.create(body)
    .then((mailinglist) => mailinglist.view(true))
    .then(success(res, 201))
    .catch(next)
