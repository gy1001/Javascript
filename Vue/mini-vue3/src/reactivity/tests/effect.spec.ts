import { effect, stop } from '../effect'
import { reactive } from '../reactive'

describe('effect', () => {
  test('happy path', () => {
    const user = reactive({
      age: 10,
    })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    // update
    user.age++
    expect(nextAge).toBe(12)
  })

  it('should return the runner when called effect', () => {
    let food = 10
    const runner = effect(() => {
      food++
      return 'foo'
    })
    expect(food).toBe(11)
    let result = runner()
    expect(food).toBe(12)
    expect(result).toBe('foo')
  })

  // 1. 通过 effect 的第二个参数给定的一个 scheduler 的 fn
  // 2. effect 第一次执行的时候，还会执行 fn 函数
  // 3. 当响应式对象 set update 不会执行 fn, 而是执行 scheduler
  // 4. 只有当 runner 执行的时候，才会再次执行 fn
  it('scheduler', () => {
    let dummy
    let run: any
    const scheduler = jest.fn(() => {
      run = runner
    })
    const obj = reactive({ foo: 1 })
    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler },
    )

    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })

  it('effect stop', () => {
    let dummy
    const obj = reactive({ prop: 1 })
    const runner = effect(() => {
      dummy = obj.prop
    })
    obj.prop = 2
    expect(dummy).toBe(2)
    stop(runner)
    // obj.prop = 3 这里只会触发 set 操作
    // obj.prop++ 这里会先触发get 操作，收益依赖，然后 set 操作触发更新，stop 会执行，需要特殊处理
    obj.prop++
    expect(dummy).toBe(2)
    runner()
    expect(dummy).toBe(3)
  })

  it('onStop', () => {
    const obj = reactive({ prop: 1 })
    const onStop = jest.fn()
    let dummy
    const runner = effect(
      () => {
        dummy = obj.prop
      },
      {
        onStop,
      },
    )
    stop(runner)
    expect(onStop).toHaveBeenCalledTimes(1)
  })
})

//输出
