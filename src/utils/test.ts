import stripAnsi from 'strip-ansi'
import isFullwidthCodePoint from 'is-fullwidth-code-point'


// const str: any = '        我今年三十七岁。现在，我正坐在波'
// console.log('print', str.length)

// for (let i in str) {

//   const s = str[i]
//   const stripAnsiStr = stripAnsi(s)
//   // console.log('print', s)
//   const code = stripAnsiStr.charCodeAt(0)
//   console.log('print', code)
//   console.log(isFullwidthCodePoint(code))
// }

console.log('print', '\u201C')
