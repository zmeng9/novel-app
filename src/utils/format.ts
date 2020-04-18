import stripAnsi from 'strip-ansi'
import isFullwidthCodePoint from 'is-fullwidth-code-point'
import { isUpper, isLower, isLorI, isThinCode } from './helper'


export const formatContent = (str: string) => {
  str = str.replace(/^"/, '“').replace(/"$/, '”')
  str = str.replace(/^'/, '‘').replace(/'$/, '’')
  return str
}


// Clean the line and set two indentions
const indentText = (str: string): any => {
  let lines = str.split('\n')

  const newLines: Array<string> = []

  lines.forEach(line => {
    const cleanLine = line.trim()
    if (cleanLine.length > 0)
      newLines.push(`\u3000\u3000${cleanLine}`)
  })

  return newLines.join('\n')
}

// Computed the width of string
const stringWidth = (str: string) => {
  if (typeof str !== 'string' || str.length === 0)
    return 0

  // These numbers represent these `“” ——(8213)`
  const stringMap: any = {
    8213: 2,
    8220: 1,
    8221: 1,
  }

  let width = 0

  const stripAnsiStr = stripAnsi(str)

  const code = stripAnsiStr.charCodeAt(0)

  if (stringMap[code])
    return stringMap[code]
  else if (isLorI(stripAnsiStr))
    width = 0.5
  else if (isThinCode(stripAnsiStr))
    width = 0.80
  else if (isLower(stripAnsiStr))
    width = 1.05
  else if (isUpper(stripAnsiStr))
    width = 1.5
  else if (isFullwidthCodePoint(code))
    width = 2
  else
    width = 0.5

  return width
}

export const parseContent = (str: string, width: number) => {
  if (!str || str.trim() === '' || typeof str !== 'string')
    return []

  // Two indent 
  const cleanStr = indentText(str)

  let lines = []
  let currentLine = ''
  let currentLineWidth = 0

  for (let i in cleanStr) {
    try {
      const s = cleanStr[i]
      let code = s.charCodeAt()

      // Push the current line when meet the `\n` or `\r`
      if (code === 10 || code === 13) {
        lines.push(currentLine)
        currentLine = ''
        currentLineWidth = 0
        continue
      }

      // Computed the width of the word
      const sWidth = stringWidth(s)

      // Push the current line when width of current line will wider then line width
      if (currentLineWidth + sWidth > width) {
        lines.push(currentLine)
        currentLine = ''
        currentLineWidth = 0
      }

      currentLine += s
      currentLineWidth += sWidth
    } catch (error) {
      console.log(error)
    }
  }

  // Push the end line 
  lines.push(currentLine)

  return lines
}

