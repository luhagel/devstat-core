import { Team } from '.'
import { User } from '../user'

let user, team

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  team = await Team.create({ user, name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = team.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(team.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = team.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(team.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(team.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
