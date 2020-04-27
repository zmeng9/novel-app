import React from 'react'
import {
  StyleSheet,
} from 'react-native'
import { observer } from 'mobx-react'
import RnSlider from '@react-native-community/slider'
import { useWindowSize } from '../hooks'
import { themeColor } from '../utils'

export interface ISliderProps {
  minimumValue?: number
  maximumValue?: number
  step?: number
  value: number
  onChange: (value: number) => void
}

const { width } = useWindowSize()

export const Slider: React.SFC<ISliderProps> = observer(({
  minimumValue = 0,
  maximumValue = 1,
  step,
  value,
  onChange,
}) => {
  return (
    <RnSlider
      style={styles.root}
      step={step}
      value={value}
      onValueChange={onChange}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      minimumTrackTintColor={themeColor.primary}
      maximumTrackTintColor={themeColor.primary}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    width: width - 100, 
    height: 40,
    margin: 5,
  },
})