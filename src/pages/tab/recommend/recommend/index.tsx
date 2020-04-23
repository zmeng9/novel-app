import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { useStores } from '../../../../hooks'
import { getNovels } from '../../../../services'
import { FlatList } from '../../../../components'
import Novel from './Novel'

const Recommend: React.FC = observer(() => {
  const { recommendStore } = useStores()

  const renderItem = useCallback((item: any) => (
    <Novel novel={item} />
  ), [])

  return (
    <View style={styles.root}>
      <FlatList
        store={recommendStore}
        service={getNovels}
        renderItem={renderItem}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  container: {
    minHeight: `100%`,
    padding: 5,
  },
})

export default Recommend