import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { Header as HeaderComp, Silde } from '../../../components'
import { useHeaderHeight } from '@react-navigation/stack'

export interface IHeaderProps {
  isShowSetting: boolean
}

const Header: React.SFC<IHeaderProps> = observer(({
  isShowSetting,
}) => {
  const headerHeight = useHeaderHeight()
  return (
    <View style={styles.root}>
      <Silde isSilde={isShowSetting} distance={headerHeight} >
        <HeaderComp>
        </HeaderComp>
      </Silde>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    zIndex: 1,
  },
})

export default Header