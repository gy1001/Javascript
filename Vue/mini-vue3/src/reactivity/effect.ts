import { extend } from '../shared/index'
let currentActiveEffect
let shouldTrack

export class ReactiveEffect {
  private _fn: any
  public scheduler?: any
  public deps = []
  activeFlag = true
  onStop?: () => void
  constructor(fn, scheduler?) {
    this._fn = fn
    this.scheduler = scheduler
  }
  run() {
    if (!this.activeFlag) {
      return this._fn()
    }
    shouldTrack = true
    currentActiveEffect = this
    const result = this._fn()
    shouldTrack = false
    return result
  }
  stop() {
    // 如果没有清空过，才进行处理清空
    if (this.activeFlag) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.activeFlag = false
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
}

export function effect(fn, options: any = {}) {
  const { scheduler } = options
  const _effect = new ReactiveEffect(fn, scheduler)
  // _effect.onStop = onStop
  // Object.assign(_effect, options)
  extend(_effect, options)
  _effect.run()
  const runner: any = _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}

export function isTracking() {
  return shouldTrack && currentActiveEffect !== undefined
}

const targetMap = new Map()
export function track(target, key) {
  // 这里针对 stop 的操作需要做处理，不收集依赖
  if (!isTracking()) {
    return
  }
  // target -> key -> dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key) //  可以去重
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  trackEffect(dep)
}

export function trackEffect(dep) {
  if (dep.has(currentActiveEffect)) {
    return
  }
  dep.add(currentActiveEffect)
  currentActiveEffect.deps.push(dep)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  triggerEffect(deps)
}

export function triggerEffect(deps) {
  for (const effect of deps) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}

export function stop(runner) {
  runner.effect.stop()
}
