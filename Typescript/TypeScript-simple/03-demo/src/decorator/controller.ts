import type { RequestHandler } from 'express'
import { Methods } from '../types/index'
import router from '../router'

export function decoratorController(target: new (...args: any[]) => any) {
  for (let key in target.prototype) {
    const path: string = Reflect.getMetadata('path', target.prototype, key)
    const method: Methods = Reflect.getMetadata('method', target.prototype, key)
    const middleware: RequestHandler = Reflect.getMetadata(
      'middleware',
      target.prototype,
      key,
    )
    const handler = target.prototype[key]
    if (path && method && handler) {
      if (middleware) {
        router[method](path, middleware, handler)
      } else {
        router[method](path, handler)
      }
    }
  }
}
