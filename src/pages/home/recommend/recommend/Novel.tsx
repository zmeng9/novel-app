import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Img, ViewSize, IViewSizeProps, ColorfulText } from '@/components'
import { useWindowSize } from '@/hooks'
import { goToIntro } from '@/utils'

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

  // console.log(`render novel`, id)

  const handle = useCallback(() => {
    goToIntro(id)
  }, [])

  return (
    <ViewSize setSize={setSize}>
      <View style={styles.root}>
        <Card handle={handle}>
          <View style={styles.container}>
            <Img uri={cover} height={height / 4} width={width / 2} />
            <ColorfulText text={title} fontSize={20} marginTop={20} />
            <ColorfulText text={username} color='secondary' fontWeight='300' marginLeft={10} marginRight={10} />
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
})