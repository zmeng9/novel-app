import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { Header, Icon, Silde } from '../../../components'
import { useHeaderHeight } from '@react-navigation/stack'

export interface IFooterProps {
  isShowSetting: boolean
  openDir: () => void
}

const Footer: React.SFC<IFooterProps> = observer(({
  isShowSetting,
  openDir,
}) => {
  const headerHeight = useHeaderHeight()

  return (
    <View style={styles.root}>
      <Silde direction='bottom' isSilde={isShowSetting} distance={headerHeight}>
        <Header type='footer'>
          <Icon name='ios-menu' handle={openDir} />
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

export default Footer