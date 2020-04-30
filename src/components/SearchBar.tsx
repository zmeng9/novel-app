import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { Input, IInputProps } from './Input'
import { goBack } from '../utils'
import { Icon } from './Icon'

export interface ISearchBarProps extends IInputProps {

}

export const SearchBar: React.SFC<ISearchBarProps> = observer(({
  ...inputProps
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name='ios-search' size={24} />
        </View>
        <Input
          {...inputProps}
          type='input'
          placeholder='搜索'
          clearButtonMode='while-editing'
          returnKeyType='search'
          autoFocus
        />
      </View>
      <TouchableOpacity onPress={goBack} >
        <Text style={styles.text}>取消</Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: `center`,
    flexDirection: `row`,
  },
  inputContainer: {
    flex: 1,
    justifyContent: `center`,
    position: `relative`,
  },
  iconContainer: {
    position: `absolute`,
    left: 10,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: `#333`,
    marginRight: 10,
  },
})