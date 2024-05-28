import { isReadonly, shallowReadonly } from '../reactive'

describe('shallowReadonly', () => {
  test('should make nested values mutable', () => {
    const props = shallowReadonly({ foo: 1, nested: { bar: 2 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.nested)).toBe(false)
  })

  it('warn then call set', () => {
    const user = shallowReadonly({ age: 10 })
    console.warn = jest.fn()
    user.age = 11
    expect(console.warn).toHaveBeenCalled()
  })
})
