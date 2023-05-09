import { Router } from 'express'
export const router = Router()
import { Methods } from '../types/index'

export function loginDecorator(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Methods = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    if (path && method && handler) {
      router[method](path, handler)
    }
  }
}

function getRequstMethod(method: Methods) {
  return function (path: string) {
    return function (target: any, key: string, desciptopr: PropertyDescriptor) {
      // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
      desciptopr.enumerable = true
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', method, target, key)
    }
  }
}

export const get = getRequstMethod(Methods.GET)
export const post = getRequstMethod(Methods.POST)
export const put = getRequstMethod(Methods.PUT)
export const del = getRequstMethod(Methods.DELETE)

// export function get(path: string) {
//   return function (target: any, key: string, desciptopr: PropertyDescriptor) {
//     // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
//     desciptopr.enumerable = true
//     Reflect.defineMetadata('path', path, target, key)
//     Reflect.defineMetadata('method', 'get', target, key)
//   }
// }

// export function post(path: string) {
//   return function (target: any, key: string, desciptopr: PropertyDescriptor) {
//     desciptopr.enumerable = true
//     Reflect.defineMetadata('path', path, target, key)
//     Reflect.defineMetadata('method', 'post', target, key)
//   }
// }
