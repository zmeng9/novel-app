import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@/hooks'
import { Icon } from './Icon'
import { goBack } from '@/utils'

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
  const insets = useSafeArea()
  const { paper, divider } = useTheme()
  const headerHeight = useHeaderHeight()
  const isHeader = type === `header`
  const isFooter = type === `footer`
  
  return (
    <View style={[
      styles.root,
      {
        height: headerHeight,
        paddingTop: isHeader ? insets.top : 0,
        paddingBottom: isFooter ? insets.bottom : 0,
        paddingHorizontal: isFooter ? 10 : 0,
        borderBottomWidth: isHeader ? 0.5 : 0,
        borderTopWidth: isFooter ? 0.5 : 0,
        backgroundColor: paper,
        borderBottomColor: divider,
        borderTopColor: divider,
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