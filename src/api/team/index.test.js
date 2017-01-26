import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Team } from '.'

const app = () => express(routes)

let userSession, anotherSession, team

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  team = await Team.create({ user })
})

test('POST /teams 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, name: 'test', members: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.members).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /teams 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /teams 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /teams 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /teams/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${team.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /teams/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${team.id}`)
  expect(status).toBe(401)
})

test('GET /teams/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /teams/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${team.id}`)
    .send({ access_token: userSession, name: 'test', members: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(team.id)
  expect(body.name).toEqual('test')
  expect(body.members).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /teams/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${team.id}`)
    .send({ access_token: anotherSession, name: 'test', createdAt: 'test', updatedAt: 'test', members: 'test' })
  expect(status).toBe(401)
})

test('PUT /teams/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${team.id}`)
  expect(status).toBe(401)
})

test('PUT /teams/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', createdAt: 'test', updatedAt: 'test', members: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teams/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${team.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /teams/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${team.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /teams/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${team.id}`)
  expect(status).toBe(401)
})

test('DELETE /teams/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
