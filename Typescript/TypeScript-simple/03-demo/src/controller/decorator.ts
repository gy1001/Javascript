import { Router } from 'express'
export const router = Router()

export function loginDecorator(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key)
    const handler = target.prototype[key]
    router.get(path, handler)
  }
}

export function get(path: string) {
  return function (target: any, key: string, desciptopr: PropertyDescriptor) {
    // 这里需要设置为可枚举的，类装饰器中的遍历才会能够取得
    desciptopr.enumerable = true
    return Reflect.defineMetadata('path', path, target, key)
  }
}
