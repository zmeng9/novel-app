import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { useHeaderHeight } from '@react-navigation/stack'
import Modal from 'react-native-modal'
import { Slider } from '../../../components'

export interface ISettingBarProps {
  isShowSettingBar: boolean
  closeSettingBar: () => void
  fontSize: number
  handleFontSize: (fontSize: number) => void
}

export const SettingBar: React.FC<ISettingBarProps> = observer(({
  isShowSettingBar,
  closeSettingBar,
  fontSize,
  handleFontSize,
}) => {
  const headerHeight = useHeaderHeight()
  const maxFontSize = 30
  const minFontSize = 16
  const step = 2

  return (
    <Modal
      isVisible={isShowSettingBar}
      animationInTiming={300}
      animationOutTiming={300}
      onBackdropPress={closeSettingBar}
      onSwipeComplete={closeSettingBar}
      swipeDirection={['down']}
      propagateSwipe={true}
      useNativeDriver={true}
      style={styles.root}
    >
      <View style={[styles.container, { paddingBottom: headerHeight }]}>
        <View style={styles.sliderContainer}>
          <Text style={styles.minFontSizeText}>A</Text>
          <Slider
            maximumValue={maxFontSize}
            minimumValue={minFontSize}
            step={step}
            value={fontSize}
            onChange={handleFontSize}
          />
          <Text style={styles.maxFontSizeText}>A</Text>
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: `#fff`,
    paddingHorizontal: 20,
    alignItems: `center`,
    justifyContent: `center`,
    paddingTop: 30,
  },
  sliderContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    margin: 10,
  },
  minFontSizeText: {
    fontSize: 16,
    marginRight: 5,
  },
  maxFontSizeText: {
    fontSize: 30,
    marginLeft: 5,
  },
  text: {
    fontSize: 18,
    color: `#333`,
  },
})