import type { RequestHandler } from 'express'

export function useMiddleware(middleware: RequestHandler) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = true
    const middlewares = Reflect.getMetadata('middleware', target, key) || []
    Reflect.defineMetadata(
      'middleware',
      middlewares.concat(middleware),
      target,
      key,
    )
  }
}
