import React from 'react'
import VIcon from 'react-native-vector-icons/Ionicons'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export interface IIconProps {
  name: string
  size?: number
  color?: string
  handle?: () => void
}

export const Icon: React.SFC<IIconProps> = ({
  name,
  size = 28,
  color = '#333',
  handle,
}) => {
  return (
    typeof handle === 'function'
      ? (
        <TouchableOpacity style={styles.root} onPress={handle}>
          <VIcon name={name} size={size} color={color} />
        </TouchableOpacity>
      )
      : <VIcon style={styles.root} name={name} size={size} color={color} />
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
})