import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Input, IInputProps } from './Input'
import { goBack } from '@/utils'
import { ColorfulText } from './ColorfulText'

export interface ISearchBarProps extends IInputProps {

}

export const SearchBar: React.SFC<ISearchBarProps> = observer(({
  ...inputProps
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.input}>
        <Input
          {...inputProps}
          leftIconName='ios-search'
          type='contain'
          placeholder='搜索'
          clearButtonMode='while-editing'
          returnKeyType='search'
          autoFocus
        />
      </View>
      <ColorfulText text='取消' handle={goBack} marginRight={12} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: `center`,
    flexDirection: `row`,
  },
  input: {
    flex: 1,
  },
})