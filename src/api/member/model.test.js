import { Member } from '.'

let member

beforeEach(async () => {
  member = await Member.create({ name: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = member.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(member.id)
    expect(view.name).toBe(member.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = member.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(member.id)
    expect(view.name).toBe(member.name)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
