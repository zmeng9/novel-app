import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Header, Icon, Silde } from '../../../components'
import { useHeaderHeight } from '@react-navigation/stack'

export interface IFooterProps {
  isShowSetting: boolean
  switchDir: () => void
  switchSettingBar: () => void
}

export const Footer: React.SFC<IFooterProps> = observer(({
  isShowSetting,
  switchDir,
  switchSettingBar,
}) => {
  

  const headerHeight = useHeaderHeight()

  return (
    <View style={styles.root}>
      <Silde direction='bottom' isSilde={isShowSetting} distance={headerHeight}>
        <Header type='footer'>
          <Icon name='ios-menu' handle={switchDir} />
          <Icon name='ios-options' handle={switchSettingBar} />
        </Header>
      </Silde>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    zIndex: 99,
  },
})