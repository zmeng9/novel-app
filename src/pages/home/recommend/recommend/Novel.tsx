import React, { useCallback } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card, Img, ViewHeight, IViewHeightProps } from '../../../../components'
import { useWindowSize } from '../../../../hooks'
import { goToIntro } from '../../../../utils'

export interface INovelProps extends IViewHeightProps {
  novel: any
}

const { height, width } = useWindowSize()

export const Novel: React.FC<INovelProps> = observer(({
  novel,
  setHeight,
}) => {
  const {
    id,
    cover,
    title,
    author: { username },
  } = novel

  const handle = useCallback(() => {
    goToIntro(id)
  }, [])

  return (
    <ViewHeight setHeight={setHeight}>
      <Card handle={handle}>
        <View style={styles.root}>
          <Img uri={cover} height={height / 4} width={width} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity>
            <Text style={styles.username}>{username}</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ViewHeight>
  )
})

const styles = StyleSheet.create({
  root: {
    alignItems: `center`,
    paddingTop: 35,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: `300`,
    color: `#333`,
    marginVertical: 10,
  },
})