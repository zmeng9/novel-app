import React, { useCallback } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useHeaderHeight } from '@react-navigation/stack'
import Modal from 'react-native-modal'
import { useWindowSize, useTheme } from '@/hooks'
import { ColorfulText } from '@/components'


const { height } = useWindowSize()

export interface IDirProps {
  dir: Array<any>
  isShowDir: boolean
  closeDir: () => void
  switchChapter: (chapterId: number) => void
}

export const Dir: React.FC<IDirProps> = observer(({
  isShowDir,
  closeDir,
  dir,
  switchChapter,
}) => {
  const { paper } = useTheme()
  const headerHeight = useHeaderHeight()

  const keyExtractor = useCallback((item: any) => {
    return String(item.id)
  }, [])

  const renderItem = useCallback(({ item }: any) => {
    const { id, chapterTitle } = item

    const handle = () => {
      closeDir()
      setTimeout(() => {
        switchChapter(id)
      }, 300)
    }

    return (
      <TouchableOpacity style={styles.listItem} onPress={handle}>
        <ColorfulText text={chapterTitle} fontSize={18} />
      </TouchableOpacity>
    )
  }, [])

  const renderHeader = useCallback(() => (
    <ColorfulText text='目录' fontSize={20} marginTop={20} marginBottom={20} fontWeight='bold' />
  ), [])

  return (
    <Modal
      isVisible={isShowDir}
      animationInTiming={700}
      animationOutTiming={700}
      onBackdropPress={closeDir}
      onSwipeComplete={closeDir}
      swipeDirection={['down']}
      propagateSwipe={true}
      useNativeDriver={true}
      style={styles.root}
    >
      <View style={[
        styles.scrollContainer,
        {
          height: height - headerHeight,
          backgroundColor: paper,
        }
      ]}>
        <FlatList
          ListHeaderComponent={renderHeader()}
          data={dir}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    fontWeight: `bold`,
    fontSize: 20,
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: `#aaa`,
  },
  text: {
    fontSize: 18,
    color: `#333`,
  },
})