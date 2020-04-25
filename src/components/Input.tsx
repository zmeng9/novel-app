import React from 'react'
import {
  StyleSheet,
  TextInput,
} from 'react-native'
import { observer } from 'mobx-react'

export interface IInputProps {
  value: string
  type?: `outline` | `input`
  placeholder?: string
  autoFocus?: boolean
  clearButtonMode?: `never` | `while-editing`
  returnKeyType?: `done` | `search` | `go`
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
}

export const Input: React.SFC<IInputProps> = observer(({
  value,
  type = `outline`,
  placeholder = ``,
  autoFocus = false,
  clearButtonMode = `never`,
  returnKeyType = `done`,
  onChangeText,
  onSubmitEditing,
}) => {

  return (
    <TextInput
      style={[styles.root, styles[type]]}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autoFocus}
      placeholder={placeholder}
      clearButtonMode={clearButtonMode}
      enablesReturnKeyAutomatically
      returnKeyType={returnKeyType}
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