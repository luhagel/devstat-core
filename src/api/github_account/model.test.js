import { GithubAccount } from '.'

let githubAccount

beforeEach(async () => {
  githubAccount = await GithubAccount.create({ login: 'test', commits: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = githubAccount.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(githubAccount.id)
    expect(view.login).toBe(githubAccount.login)
    expect(view.commits).toBe(githubAccount.commits)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = githubAccount.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(githubAccount.id)
    expect(view.login).toBe(githubAccount.login)
    expect(view.commits).toBe(githubAccount.commits)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
