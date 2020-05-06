import React, { useCallback } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Img, ViewSize, IViewSizeProps } from '../../../../components'
import { useWindowSize } from '../../../../hooks'
import { goToIntro } from '../../../../utils'

export interface INovelProps extends IViewSizeProps {
  novel: any
}

const { height, width } = useWindowSize()

export const Novel: React.FC<INovelProps> = observer(({
  novel,
  setSize,
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
    <ViewSize setSize={setSize}>
      <View style={styles.root}>
        <Card handle={handle}>
          <View style={styles.container}>
            <Img uri={cover} height={height / 4} width={width} />
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity>
              <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ViewSize>
  )
})

const styles = StyleSheet.create({
  root: {
    width: width - 30,
    marginVertical: 5,
  },
  container: {
    alignItems: `center`,
    paddingTop: 35,
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  username: {
    fontSize: 15,
    fontWeight: `300`,
    color: `#333`,
    marginVertical: 10,
  },
})