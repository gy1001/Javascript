import { computed } from '../computed'
import { reactive } from '../reactive'

describe('computed', () => {
  it('happy path', () => {
    const user = reactive({
      age: 1,
    })
    // computed 接受一个 getter 函数，返回一个只读的响应式 ref 对象。
    const age = computed(() => {
      return user.age
    })
    expect(age.value).toBe(1)
  })

  it('should computed lazy', () => {
    const value = reactive({
      foo: 1,
    })
    const getter = jest.fn(() => {
      return value.foo
    })
    const cValue = computed(getter)
    // lazy
    expect(getter).not.toHaveBeenCalled()

    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    // // should not compute again
    cValue.value // get
    expect(getter).toHaveBeenCalledTimes(1)

    value.foo = 2
    // 改变数据后，computed 并不会立即执行
    expect(getter).toHaveBeenCalledTimes(1)

    expect(cValue.value).toBe(2)
    expect(getter).toHaveBeenCalledTimes(2)
  })
})
