import _ from 'lodash'
import signUp from '../../core/mailchimp'
import { success } from '../../services/response/'
import { Mailinglist } from '.'

export const create = ({ body }, res, next) =>
  Mailinglist.create(body)
    .then(signUp(body.email, body.name))
    .then(success(res, 201))
    .catch(next)
