export const extend = Object.assign

export * from './toDisplayString'

export function isObject(arr) {
  return typeof arr === 'object' && arr !== null
}

export function isString(value) {
  return typeof value === 'string'
}

export function hasChanged(newValue, value) {
  return !Object.is(newValue, value)
}

export const hasOwn = (value, key) =>
  Object.prototype.hasOwnProperty.call(value, key)

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : ''
  })
}
export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}

export const EMPTY_OBJ = Object.freeze({})
