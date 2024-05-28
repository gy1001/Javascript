import { camelize, toHandlerKey } from '../shared/index'

export function emit(instance, event, ...rest) {
  //  instance.props
  const { props } = instance
  // TPP 开发技巧
  // 先写一个特定的行为 =》 再写一个通用的行为
  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...rest)
}
