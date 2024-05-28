import { reactive, isReactive, isProxy } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const originalUser = {
      age: 10,
    }
    const user = reactive(originalUser)
    expect(user).not.toBe(originalUser)
    expect(user.age).toBe(10)
    expect(isReactive(user)).toBe(true)
    expect(isReactive(originalUser)).toBe(false)

    expect(isProxy(user)).toBe(true)
  })

  it('nested reactive', () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    // 嵌套的数组也是响应式的
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
