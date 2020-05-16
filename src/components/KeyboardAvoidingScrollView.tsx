import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'

export interface IKeyboardAvoidingScrollViewProps {
  children: React.ReactNode
  hasHeader?: boolean
  centerContent?: boolean
  paddingHorizontal?: number
}

export const KeyboardAvoidingScrollView: React.SFC<IKeyboardAvoidingScrollViewProps> = observer(({
  children,
  hasHeader = false,
  centerContent = false,
  paddingHorizontal = 0,
}) => {
  const headerHeight = useHeaderHeight()

  return (
    <KeyboardAvoidingView
      style={styles.root}
      keyboardVerticalOffset={hasHeader ? headerHeight + 20 : 20}
      behavior='padding'
    >
      <ScrollView
        contentContainerStyle={[
          styles.container, 
          centerContent && styles.centerContent,
          {
            paddingHorizontal,
          },
        ]}
        keyboardShouldPersistTaps='handled'
        alwaysBounceVertical={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  centerContent: {
    justifyContent: `center`,
  },
})