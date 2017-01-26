import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Member } from '.'

const app = () => express(routes)

let userSession, member

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  member = await Member.create({})
})

test('POST /members 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, name: 'test', status: 'test', group: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.group).toEqual('test')
})

test('POST /members 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /members 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /members 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /members/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${member.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(member.id)
})

test('GET /members/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${member.id}`)
  expect(status).toBe(401)
})

test('GET /members/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /members/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${member.id}`)
    .send({ access_token: userSession, name: 'test', status: 'test', group: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(member.id)
  expect(body.name).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.group).toEqual('test')
})

test('PUT /members/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${member.id}`)
  expect(status).toBe(401)
})

test('PUT /members/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', status: 'test', group: 'test' })
  expect(status).toBe(404)
})

test('DELETE /members/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${member.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /members/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${member.id}`)
  expect(status).toBe(401)
})

test('DELETE /members/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
