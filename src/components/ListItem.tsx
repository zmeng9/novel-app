import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card } from './Card'
import { Icon } from './Icon'
import { ColorfulText } from './ColorfulText'
import { IIhemeColorColor } from '../utils'

export interface IListItemProps {
  children?: React.ReactNode
  type?: `space-between` | `center`
  colorfulTextType?: IIhemeColorColor
  text?: string
  isNavigator?: boolean
  leftText?: string
  rightText?: string
  handle?: () => void
}

export const ListItem: React.SFC<IListItemProps> = observer(({
  children,
  type = `space-between`,
  colorfulTextType,
  isNavigator = false,
  text,
  leftText,
  rightText,
  handle,
}) => {
  return (
    <Card handle={handle}>
      {
        type === `center`
          ? (text && <ColorfulText text={text} type={colorfulTextType} />)
          : (
            <View style={styles.root}>
              {children || (!!leftText && <ColorfulText text={leftText} type={colorfulTextType} />)}
              <View style={styles.rightContainer}>
                {!!rightText && <ColorfulText text={rightText} type={colorfulTextType} />}
                {isNavigator && <Icon name='ios-arrow-forward' size={24} />}
              </View>
            </View>
          )
      }
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  rightContainer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})