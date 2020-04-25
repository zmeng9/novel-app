import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

export interface IViewHeightProps {
  children?: React.ReactNode
  setHeight: (height: number) => void
}

export const ViewHeight: React.FC<IViewHeightProps> = observer(({
  children,
  setHeight,
}) => {
  return (
    <View
      onLayout={(e: any) => {
        const { height } = e.nativeEvent.layout
        setHeight(height)
      }}
    >
      {children}
    </View>
  )
})