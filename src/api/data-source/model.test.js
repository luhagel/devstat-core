import { DataSource } from '.'

let dataSource

beforeEach(async () => {
  dataSource = await DataSource.create({ type: 'test', data: {commits: 20} })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = dataSource.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dataSource.id)
    expect(view.type).toBe(dataSource.type)
    expect(view.data).toBe(dataSource.data)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = dataSource.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(dataSource.id)
    expect(view.type).toBe(dataSource.type)
    expect(view.data).toBe(dataSource.data)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
