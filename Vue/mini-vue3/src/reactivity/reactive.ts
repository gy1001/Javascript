import { isObject } from '../shared/index'
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandler'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  RAW = '__v_raw',
}

export function reactive(raw: any) {
  return createActiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers)
}

function createActiveObject(target: any, baseHandlers) {
  if (!isObject(target)) {
    console.warn(`target ${target} must be an object`)
    return target
  }
  return new Proxy(target, baseHandlers)
}

export function isReactive(value) {
  // 获取一个属性，触发 get 操作
  return !!(value && value[ReactiveFlags.IS_REACTIVE])
}

export function isReadonly(value) {
  return !!(value && value[ReactiveFlags.IS_READONLY])
}

export function shallowReadonly(value) {
  return createActiveObject(value, shallowReadonlyHandlers)
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}
