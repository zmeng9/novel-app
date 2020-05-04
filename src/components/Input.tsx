import React from 'react'
import {
  StyleSheet,
  TextInput,
} from 'react-native'
import { observer } from 'mobx-react'

export interface IInputProps {
  value: string
  type?: `outline` | `input`
  size?: `large` | `small`
  placeholder?: string
  secureTextEntry?: boolean
  autoFocus?: boolean
  clearButtonMode?: `never` | `while-editing`
  returnKeyType?: `done` | `search` | `go`
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
}

export const Input: React.SFC<IInputProps> = observer(({
  value,
  type = `outline`,
  size = `small`,
  placeholder = ``,
  secureTextEntry = false,
  autoFocus = false,
  clearButtonMode = `never`,
  returnKeyType = `done`,
  onChangeText,
  onSubmitEditing,
}) => {

  return (
    <TextInput
      style={[
        styles.root,
        styles[type],
        styles[size],
      ]}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autoFocus}
      placeholder={placeholder}
      clearButtonMode={clearButtonMode}
      enablesReturnKeyAutomatically
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
  outline: {
    borderWidth: 0.7,
    borderColor: `#ccc`,
    backgroundColor: `#fff`,
  },
  input: {
    paddingLeft: 40,
    backgroundColor: `#eee`,
  },
  large: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 18,
    borderRadius: 15,
  },
  small: {
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 16,
    borderRadius: 8,
  },
})