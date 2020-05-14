import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useHeaderHeight } from '@react-navigation/stack'
import Modal from 'react-native-modal'
import { Slider } from '../../../components'

export interface ISettingBarProps {
  isDarkMode: boolean
  isShowSettingBar: boolean
  closeSettingBar: () => void
  fontSize: number
  setFontSize: (fontSize: number) => void
}

const fontSizeRange = [15, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30]
const minFontSize = fontSizeRange[0]
const maxFontSize = fontSizeRange.slice(-1)[0]
const step = 1

export const SettingBar: React.FC<ISettingBarProps> = observer(({
  isDarkMode,
  isShowSettingBar,
  closeSettingBar,
  fontSize,
  setFontSize,
}) => {


  const headerHeight = useHeaderHeight()

  const handleFontSize = (value: number) => {
    setFontSize(fontSizeRange[value])
  }

  return (
    <Modal
      isVisible={isShowSettingBar}
      animationInTiming={500}
      animationOutTiming={1000}
      backdropOpacity={0}
      onBackdropPress={closeSettingBar}
      onSwipeComplete={closeSettingBar}
      swipeDirection={['down']}
      propagateSwipe={true}
      useNativeDriver={true}
      style={styles.root}
    >
      <View style={[
        styles.container,
        {
          paddingBottom: headerHeight,
          backgroundColor: isDarkMode ? `#333` : `#fff`,
          borderColor: isDarkMode? `#555` : `#ddd`,
        }
      ]}>
        <View style={styles.sliderContainer}>
          <Text style={[styles.minFontSizeText, { color: isDarkMode? `#aaa` : `#000` }]}>A</Text>
          <Slider
            minimumValue={0}
            maximumValue={fontSizeRange.length - 1}
            step={step}
            value={fontSizeRange.indexOf(fontSize)}
            onChange={handleFontSize}
          />
          <Text style={[styles.maxFontSizeText, { color: isDarkMode? `#aaa` : `#000` }]}>A</Text>
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
    paddingHorizontal: 20,
    alignItems: `center`,
    justifyContent: `center`,
    paddingTop: 30,
    borderWidth: 0.5,
  },
  sliderContainer: {
    flexDirection: `row`,
    alignItems: `center`,
    margin: 10,
  },
  minFontSizeText: {
    fontSize: minFontSize,
    marginRight: 5,
  },
  maxFontSizeText: {
    fontSize: maxFontSize,
    marginLeft: 5,
  },
})