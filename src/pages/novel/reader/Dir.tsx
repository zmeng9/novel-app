import React, { useCallback } from 'react'
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
  isDarkMode: boolean
  dir: Array<any>
  isShowDir: boolean
  closeDir: () => void
  switchChapter: (chapterId: number) => void
}

export const Dir: React.FC<IDirProps> = observer(({
  isDarkMode,
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
        <Text style={[styles.text, { color: isDarkMode ? `#aaa` : `#fff` }]}>{chapterTitle}</Text>
      </TouchableOpacity>
    )
  }

  const renderHeader = useCallback(() => {
    return <Text style={[styles.title, { color: isDarkMode ? `#aaa` : `#fff` }]}>目录</Text>
  }, [])

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
          backgroundColor: isDarkMode ? `#333` : `#fff`,
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