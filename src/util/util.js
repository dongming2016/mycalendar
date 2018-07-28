const OBJECT_TYPE = '[object Object]'
const ARRAY_TYPE = '[object Array]'
const STRING_TYPE = '[object String]'
const FUNCTION_TYPE = '[object Function]'

export const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === OBJECT_TYPE
}

export const isArray = obj => {
  return Object.prototype.toString.call(obj) === ARRAY_TYPE
}

export const isString = obj => {
  return Object.prototype.toString.call(obj) === STRING_TYPE
}

export const isEmpty = obj => {
  return Object.prototype.toString.call(obj) === ARRAY_TYPE && obj.length === 0
}

export const isFunction = obj => {
  return Object.prototype.toString.call(obj) === FUNCTION_TYPE
}

export const cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj))
}
