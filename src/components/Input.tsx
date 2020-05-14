import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import { StyleSheet, TextInput } from 'react-native'
import { observer } from 'mobx-react-lite'

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
  const isDarkMode = useDarkMode()
  return (
    <TextInput
      style={[
        styles.root,
        styles[type],
        styles[size],
        { backgroundColor: isDarkMode ? `#555` : `#eee` },
        { color: isDarkMode ? `#fff` : `#333` },
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