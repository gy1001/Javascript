import { hasChanged, isObject } from '../shared'
import { isTracking, trackEffect, triggerEffect } from './effect'
import { reactive } from './reactive'

class RefImpl {
  private _value: any
  public dep
  private _rawValue
  private __v_isRef = true
  constructor(value) {
    this._rawValue = value
    // 判断 value 是否是 object类型
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    // 依赖收集
    trackRefValue(this)
    return this._value
  }

  set value(newValue) {
    // 判断新旧值是否相等
    //  对比的时候就需要做判断，因为可能是对象类型，如果是 对象类型，this._value 就是一个 proxy对象，所以需要做处理

    if (hasChanged(newValue, this._rawValue)) {
      this._value = convert(newValue)
      this._rawValue = newValue
      triggerEffect(this.dep)
    }
  }
}

export function ref(value) {
  return new RefImpl(value)
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

export function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep)
  }
}

export function isRef(value) {
  return !!value.__v_isRef
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      const result = Reflect.get(target, key)
      return unRef(result)
    },
    set(target, key, value) {
      // set => ref  .value
      if (isRef(target[key]) && !isRef(value)) {
        target[key].value = value
        return true
      }
      return Reflect.set(target, key, value)
    },
  })
}
