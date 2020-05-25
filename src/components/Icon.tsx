import React from 'react'
import VIcon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/hooks'
import { IBaseColorType } from '@/themes'

export interface IIconProps {
  name: string
  size?: number
  color?: keyof IBaseColorType
  handle?: () => void
}

export const Icon: React.SFC<IIconProps> = ({
  name,
  size = 28,
  color = `info`,
  handle,
}) => {
  const theme = useTheme()

  return (
    typeof handle === `function`
      ? (
        <TouchableOpacity style={styles.root} onPress={handle}>
          <VIcon name={name} size={size} color={theme[color]} />
        </TouchableOpacity>
      )
      : <VIcon style={styles.root} name={name} size={size} color={theme[color]} />
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
})