import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

export interface ISzie {
  width: number
  height: number
}

export interface IViewSizeProps {
  children?: React.ReactNode
  setSize: ({ width, height }: ISzie) => void
}

export const ViewSize: React.FC<IViewSizeProps> = observer(({
  children,
  setSize,
}) => {
  return (
    <View
      onLayout={(e: any) => {
        const { width = 0, height = 0 } = e.nativeEvent.layout
        setSize({ width, height })
      }}
    >
      {children}
    </View>
  )
})