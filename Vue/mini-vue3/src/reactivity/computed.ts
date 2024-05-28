import { ReactiveEffect } from './effect'

class ComputedRefImpl {
  _getter: any
  private _dirty: boolean = true
  private _value: any
  private _effect: ReactiveEffect
  constructor(getter) {
    this._getter = getter
    this._effect = new ReactiveEffect(getter, () => {
      this._dirty = this._dirty || true
    })
  }

  get value() {
    // 当依赖的响应式对象的值发生改变的时候，需要把 _dirty 设置为 true，下次访问的时候会重新计算
    // effect
    if (this._dirty) {
      this._dirty = false
      this._value = this._effect.run() // 执行getter
    }
    return this._value
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter)
}
