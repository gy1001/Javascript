import type { RequestHandler } from 'express'

export function useMiddleware(middleware: RequestHandler) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = true
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}
