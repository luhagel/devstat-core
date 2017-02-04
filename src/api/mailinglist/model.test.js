import { Mailinglist } from '.'

let mailinglist

beforeEach(async () => {
  mailinglist = await Mailinglist.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = mailinglist.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mailinglist.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = mailinglist.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mailinglist.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
