import { Methods } from '../types/index'

function getRequstMethod(method: Methods) {
  return function (path: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
      descriptor.enumerable = true
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', method, target, key)
    }
  }
}
export const get = getRequstMethod(Methods.GET)
export const post = getRequstMethod(Methods.POST)
export const put = getRequstMethod(Methods.PUT)
export const del = getRequstMethod(Methods.DELETE)
