/* 
 * 1. The params is `this` of object,  and array of state
 * 2. Merge the multiple objects of state
 * 3. Foreach the key of object and set `attribute of objects to attribute of this`
 */

export const resetObj = (self: any, array: Array<Object>) => {
  const obj: Object = Object.assign(...array as [Array<Object>]);
  (Object.keys(obj) as Array<keyof typeof obj>).forEach(key => {
    (self[key] as any) = obj[key]
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

export const unique = (array: Array<any>, key: string) => {
  let cleanArray: Array<any> = []
  for (let item of array) {
    const isExist = cleanArray.find(i => i[key] === item[key])
    if (!isExist)
      cleanArray.push(item)
  }
  return cleanArray
}

export const debounce = (
  func: () => void,
  wait: number,
  immedate: boolean,
) => {
  let timeout: any
  return function () {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immedate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args as any)
      }
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args as any)
      }, wait)
    }
  }
}