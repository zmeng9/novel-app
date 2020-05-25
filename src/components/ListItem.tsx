import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card } from './Card'
import { Icon } from './Icon'
import { ColorfulText } from './ColorfulText'
import { IBaseColorType } from '@/themes'

export interface IListItemProps {
  children?: React.ReactNode
  type?: `space-between` | `center`
  colorfulTextType?: keyof IBaseColorType
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
    <Card handle={handle} startShouldSetResponderCapture>
      {
        type === `center`
          ? (text && <ColorfulText text={text} color={colorfulTextType} textAlign='center' handle={() => console.log(`hi`)} />)
          : (
            <View style={styles.root}>
              {children || (!!leftText && <ColorfulText text={leftText} color={colorfulTextType} />)}
              <View style={styles.rightContainer}>
                {!!rightText && <ColorfulText text={rightText} color={colorfulTextType} />}
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