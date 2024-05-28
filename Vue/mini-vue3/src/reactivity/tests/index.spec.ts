// import { add } from '../reactivity/index'
// it('init', () => {
//   expect(1 + 1).toBe(2)
// })

// it('add', () => {
//   expect(add(1, 2)).toBe(3)
// })

import { reactive } from '../reactive'
import { effect } from '../effect'

describe('reactivity', () => {
  it('happy path', () => {
    const user = reactive({ age: 10 })
    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)
    // user.age++
    // expect(nextAge).toBe(12)
  })
})
