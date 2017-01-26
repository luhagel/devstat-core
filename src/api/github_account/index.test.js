import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { GithubAccount } from '.'

const app = () => express(routes)

let userSession, githubAccount

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  githubAccount = await GithubAccount.create({})
})

test('POST /github_accounts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, login: 'test', commits: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.login).toEqual('test')
  expect(body.commits).toEqual('test')
})

test('POST /github_accounts 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /github_accounts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /github_accounts 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /github_accounts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${githubAccount.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(githubAccount.id)
})

test('GET /github_accounts/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${githubAccount.id}`)
  expect(status).toBe(401)
})

test('GET /github_accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /github_accounts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${githubAccount.id}`)
    .send({ access_token: userSession, login: 'test', commits: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(githubAccount.id)
  expect(body.login).toEqual('test')
  expect(body.commits).toEqual('test')
})

test('PUT /github_accounts/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${githubAccount.id}`)
  expect(status).toBe(401)
})

test('PUT /github_accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: userSession, login: 'test', commits: 'test' })
  expect(status).toBe(404)
})

test('DELETE /github_accounts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${githubAccount.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /github_accounts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${githubAccount.id}`)
  expect(status).toBe(401)
})

test('DELETE /github_accounts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
