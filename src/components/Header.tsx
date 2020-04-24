import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { observer } from 'mobx-react'
import { Icon } from './Icon'
import { goBack } from '../utils'

export interface IHeaderProps {
  children?: React.ReactNode
  type?: `header` | `footer`
  isEmpty?: boolean
}

const { width } = Dimensions.get('window')

export const Header: React.SFC<IHeaderProps> = observer(({
  children,
  type = `header`,
  isEmpty = false,
}) => {
  const headerHeight = useHeaderHeight()
  const statusBarHeight = getStatusBarHeight()
  const isHeader = type === `header`
  const isFooter = type === `footer`
  return (
    <View style={[
      styles.root,
      {
        height: headerHeight,
        paddingTop: isHeader ? statusBarHeight : 0,
        paddingBottom: isFooter ? 20 : 0,
      }
    ]}>
      {(isHeader && !isEmpty) && <Icon name='ios-arrow-back' handle={goBack} size={32} />}
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width,
    backgroundColor: `#fff`,
    flexDirection: 'row',
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})