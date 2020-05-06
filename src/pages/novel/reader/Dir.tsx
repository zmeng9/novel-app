import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { useHeaderHeight } from '@react-navigation/stack'
import Modal from 'react-native-modal'
import { useWindowSize } from '../../../hooks'

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
  

  const headerHeight = useHeaderHeight()

  const keyExtractor = (item: any) => {
    return String(item.id)
  }

  const renderItem = ({ item }: any) => {
    const { id, chapterTitle } = item

    const handle = () => {
      closeDir()
      setTimeout(() => {
        switchChapter(id)
      }, 300)
    }

    return (
      <TouchableOpacity style={styles.listItem} onPress={handle}>
        <Text style={styles.text}>{chapterTitle}</Text>
      </TouchableOpacity>
    )
  }

  const renderHeader = () => {
    return <Text style={styles.title}>目录</Text>
  }

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
      <View style={[styles.scrollContainer, { height: height - headerHeight }]}>
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
    backgroundColor: `#fff`,
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