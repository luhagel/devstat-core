import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { DataSource } from '.'

const app = () => express(routes)

let userSession, dataSource

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  dataSource = await DataSource.create({})
})

test('POST /data-sources 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, type: 'test', data: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual('test')
  expect(body.data).toEqual('test')
})

test('POST /data-sources 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /data-sources 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /data-sources 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /data-sources/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${dataSource.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dataSource.id)
})

test('GET /data-sources/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${dataSource.id}`)
  expect(status).toBe(401)
})

test('GET /data-sources/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /data-sources/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${dataSource.id}`)
    .send({ access_token: userSession, type: 'test', data: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(dataSource.id)
  expect(body.type).toEqual('test')
  expect(body.data).toEqual('test')
})

test('PUT /data-sources/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${dataSource.id}`)
  expect(status).toBe(401)
})

test('PUT /data-sources/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, type: 'test', data: 'test' })
  expect(status).toBe(404)
})

test('DELETE /data-sources/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${dataSource.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /data-sources/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${dataSource.id}`)
  expect(status).toBe(401)
})

test('DELETE /data-sources/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
