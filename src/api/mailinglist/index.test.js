import request from 'supertest-as-promised'
import express from '../../services/express'
import routes, { Mailinglist } from '.'

const app = () => express(routes)

let mailinglist

beforeEach(async () => {
  mailinglist = await Mailinglist.create({})
})

test('POST /mailinglists 201', async () => {
  const { status, body } = await request(app())
    .post('/')
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})
