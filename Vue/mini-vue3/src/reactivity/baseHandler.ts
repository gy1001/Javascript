import { extend, isObject } from '../shared'
import { track, trigger } from './effect'
import { ReactiveFlags, reactive, readonly } from './reactive'

const get = createGetter()
const set = createSetter()
const readOnlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadOnly: boolean = false, shallow = false) {
  return function get(target, key, receiver) {
    // ...
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadOnly
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadOnly
    }
    const result = Reflect.get(target, key, receiver)
    // 如果是浅表的，就不用处理深层次的对象
    if (shallow) {
      return result
    }
    // reactive 是支持嵌套的，即内部对象也是响应式的额
    if (isObject(result)) {
      return isReadOnly ? readonly(result) : reactive(result)
    }

    if (!isReadOnly) {
      track(target, key)
    }

    return result
  }
}

function createSetter(isReadOnly: boolean = false) {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    if (!isReadOnly) {
      trigger(target, key)
    }
    return result
  }
}

export const mutableHandlers = {
  get: get,
  set: set,
}

export const readonlyHandlers = {
  get: readOnlyGet,
  set(target, key) {
    console.warn(`key: ${key} set failed`, target)
    return true
  },
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
})
