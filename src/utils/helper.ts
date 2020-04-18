/* 
 * 1. The params is `this` of object,  and array of state
 * 2. Merge the multiple objects of state
 * 3. Foreach the key of object and set `attribute of objects to attribute of this`
 */

export const resetObj = (fn: Object, array: Array<Object>) => {
  const obj: Object = Object.assign(...array as [Array<Object>]);
  (Object.keys(obj) as Array<keyof typeof obj>).forEach(key => {
    (fn[key] as any) = obj[key]
  })
}

export const isUpper = (code: string) => {
  return /[A-Z]/.test(code)
}

export const isLower = (code: string) => {
  return /[a-z]/.test(code)
}

export const isLorI = (code: string) => {
  return /l|i|I/.test(code)
}

export const isThinCode = (code: string) => {
  return /f|t|r/.test(code)
}