import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
} from 'react-native'
import { observer } from 'mobx-react'
import { useInput } from '../hooks'

export interface IInputProps {
  type?: `outline` | `input`
  placeholder?: string
  autoFocus?: boolean
}

export const Input: React.SFC<IInputProps> = observer(({
  type = `outline`,
  placeholder = ``,
  autoFocus = false,
}) => {
  const input = useInput('')

  return (
    <TextInput
      autoFocus={autoFocus}
      placeholder={placeholder}
      style={[styles.root, styles[type]]}
      {...input}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 8,
    fontSize: 16,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  outline: {
    borderWidth: 0.7,
  },
  input: {
    paddingLeft: 40,
    backgroundColor: `#eee`,
  },
})