import type { RequestHandler } from 'express'
import { Methods } from '../types/index'
import router from '../router'

export function decoratorController(rootPath: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      const fullPath = rootPath === '/' ? path : rootPath + path
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key,
      )
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middleware',
        target.prototype,
        key,
      )
      const handler = target.prototype[key]
      if (fullPath && method && handler) {
        if (middlewares) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
