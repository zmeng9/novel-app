import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Icon } from './Icon'
import { useTheme } from '@/hooks'

export interface IInputProps {
  value: string
  type?: `contain` | `outline`
  size?: `large` | `small`
  leftIconName?: string
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
  leftIconName,
  placeholder = ``,
  secureTextEntry = false,
  autoFocus = false,
  clearButtonMode = `never`,
  returnKeyType = `done`,
  onChangeText,
  onSubmitEditing,
}) => {
  const { input, divider, text } = useTheme()
  const isSmall = size === `small`
  const isOutline = type === `outline`

  return (
    <View style={styles.root}>
      {
        leftIconName && (
          <View style={styles.iconContainer}>
            <Icon name={leftIconName} size={isSmall ? 24 : 30} />
          </View>
        )
      }
      <TextInput
        style={[
          styles.root,
          styles[size],
          {
            borderWidth: isOutline ? 0.7 : 0,
            borderColor: divider,
            backgroundColor: input[type],
            paddingLeft: leftIconName ? 40 : 10,
            color: text.info,
          },
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
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: `center`,
    position: `relative`,
  },
  large: {
    padding: 10,
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
  iconContainer: {
    position: `absolute`,
    left: 10,
    zIndex: 1,
  },
})