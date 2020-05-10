/*
 * Encapsulation of the colorful "console.log", usage:
*/

export const consoleTheme = {
  normal: '',
  testing: 'color: darkcyan; font-style: italic;',
  important: 'color: green; font-style: normal; font-weight: bold;',
  fail: 'color: #e67e22; font-style: normal; font-weight: normal;',
  warn: 'color: #fdcb6e; font-style: normal; font-weight: normal;',
  error: 'color: red; font-style: normal; font-weight: bold;',
}

const debug = (
  objRef: Object | string,
  methodName: string,
  msg: string,
  displayFormat: string,
  data?: any
) => {
  const className = objRef instanceof Object ? objRef.constructor.name : objRef

  const messageToPrint = displayFormat
    ? `%c${className} ${methodName} ${msg}`
    : `${className} ${methodName} ${msg}`

  if (displayFormat) {
    if (data)
      console.log(messageToPrint, displayFormat, data) // tslint:disable-line no-console
    else
      console.log(messageToPrint, displayFormat) // tslint:disable-line no-console
  } else {
    if (data)
      console.log(messageToPrint, data) // tslint:disable-line no-console
    else
      console.log(messageToPrint) // tslint:disable-line no-console
  }
}

export const logger = {
  debug
}