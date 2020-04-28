import stripAnsi from 'strip-ansi'
import isFullwidthCodePoint from 'is-fullwidth-code-point'


const str: any = '\u3000！'

for (let i in str) {

  const s = str[i]
  const stripAnsiStr = stripAnsi(s)
  // console.log('print', s)
  const code = stripAnsiStr.charCodeAt(0)
  console.log('print', code)
  console.log(isFullwidthCodePoint(code))
}

// console.log('print', '\u201C')
