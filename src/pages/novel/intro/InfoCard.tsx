import React, { useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { observer } from 'mobx-react'
import { Card, Icon, Img, Btn } from '../../../components'
import { goToReader } from '../../../utils'

export interface IInfoCardProps {
  novel: any
}

export const InfoCard: React.SFC<IInfoCardProps> = observer(({
  novel,
}) => {
  const {
    id = -1,
    cover = '',
    title = '',
    author: { username = '' },
    type: { name = '' },
    clickNum = 0,
  } = novel

  const handleGoToReader = useCallback(() => {
    return goToReader(id)
  }, [])

  return (
    <Card>
      <View style={styles.root}>
        <View style={styles.leftContainer}>
          <Img uri={cover} height={200} width={150} />
          <View>
            <Btn text='点击阅读' handle={handleGoToReader} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.line}>
            <Icon name='ios-book' size={20} />
            <Text style={styles.text}>{title}</Text>
          </View>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-person' size={20} />
            <Text style={styles.text}>{username}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.line}>
            <Icon name='ios-pricetag' size={20} />
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
          <View style={styles.line}>
            <Icon name='ios-color-wand' size={20} />
            <Text style={styles.text}>{clickNum}</Text>
          </View>
        </View>
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 5,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  leftContainer: {
    justifyContent: `center`,
    alignItems: `center`,
  },
  rightContainer: {
    justifyContent: `flex-end`,
  },
  line: {
    margin: 5,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
  },
  text: {
    fontSize: 15,
    color: `#555`,
  },
})