import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useHeaderHeight } from '@react-navigation/stack'
import { Header as RnHeader, Silde, Icon } from '../../../components'


export interface IHeaderProps {
  isShowSetting: boolean
  handleAddToCollections: () => void
}

export const Header: React.SFC<IHeaderProps> = observer(({
  isShowSetting,
  handleAddToCollections,
}) => {
  const headerHeight = useHeaderHeight()
  return (
    <View style={styles.root}>
      <Silde isSilde={isShowSetting} distance={headerHeight} >
        <RnHeader>
          <TouchableOpacity onPress={handleAddToCollections }>
            <Icon name='ios-add' size={35} />
          </TouchableOpacity>
        </RnHeader>
      </Silde>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    zIndex: 1,
  },
})