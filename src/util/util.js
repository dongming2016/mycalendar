const OBJECT_TYPE = '[object Object]'
const ARRAY_TYPE = '[object Array]'
const STRING_TYPE = '[object String]'

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
