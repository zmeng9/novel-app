import React from 'react'
import { useDarkMode } from 'react-native-dark-mode'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { observer } from 'mobx-react-lite'
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
  const isDarkMode = useDarkMode()
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
        paddingHorizontal: isFooter ? 10 : 0,
        borderBottomWidth: isHeader ? 0.5 : 0,
        borderTopWidth: isFooter ? 0.5 : 0,
        backgroundColor: isDarkMode ? `#333` : `#fff`,
        borderBottomColor: isDarkMode ? `#333` : `#ddd`,
        borderTopColor: isDarkMode ? `#333` : `#ddd`,
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
    flexDirection: 'row',
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})